import {cookies} from 'next/headers';
import {NextRequest,NextResponse} from 'next/server';
import {HttpError,readBody,success,failure} from '@/server/gymaf/http';
import {email,uuid,object,text,dateOnly} from '@/shared/gymaf/validation';
import {createPkce,validVerifier} from '@/server/gymaf/pkce';
import {safeCareReturn} from '@/shared/physix/navigation';
import type {LocalAccount} from '@/shared/physix/contracts';
import {hostedConfig} from './hosted-config';

const names={access:'__Host-physix-access',refresh:'__Host-physix-refresh',pkce:'__Host-physix-pkce',returnTo:'__Host-physix-return'};
const cookieOptions={httpOnly:true,secure:true,sameSite:'lax' as const,path:'/'};
async function provider(path:string,body?:unknown,token?:string) {
 const c=hostedConfig();if(!c)throw new HttpError(503,'SETUP_REQUIRED','Booking service is not configured.');
 let response:Response;try {response=await fetch(c.url+path,{method:body===undefined?'GET':'POST',headers:{apikey:c.key,...(token?{Authorization:'Bearer '+token}:{}),'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)}),cache:'no-store',signal:AbortSignal.timeout(15000)});}catch{throw new HttpError(503,'TEMPORARY_UNAVAILABLE','Could not reach the service. Retry your request.');}
 const result=await response.json().catch(()=>null);
 if(response.ok)return result;
 const code=result?.code;
 if(response.status===429)throw new HttpError(429,'RATE_LIMITED','Please wait before requesting another sign-in email.');
 if(response.status===401||code==='28000'||code==='PGRST301')throw new HttpError(401,'SIGN_IN_REQUIRED','Please sign in again.');
 if(['23505','23P01','40001'].includes(code))throw new HttpError(409,'CONFLICT','That time is no longer available, or the request changed. Choose another time.');
 if(response.status===403||code==='42501')throw new HttpError(403,'FORBIDDEN','This record is unavailable for your account.');
 if(['22023','22P02','22007','23514'].includes(code))throw new HttpError(422,'INVALID_INPUT','The service, time or booking policy has changed. Review your selection.');
 if(path.startsWith('/auth/')&&response.status<500)throw new HttpError(400,'AUTH_FAILED','The sign-in request failed or the code expired. Try again.');
 throw new HttpError(503,'TEMPORARY_UNAVAILABLE','The service is temporarily unavailable. Retry.');
}
const rpc=(name:string,args:unknown,token?:string)=>provider('/rest/v1/rpc/'+name,args,token);
function tokenFor(request:NextRequest) {const token=request.cookies.get(names.access)?.value;if(!token)throw new HttpError(401,'SIGN_IN_REQUIRED','Please sign in.');return token;}
function tokens(response:NextResponse,raw:unknown) {const t=object(raw);if(typeof t.access_token!=='string'||typeof t.refresh_token!=='string'||typeof t.expires_in!=='number')throw new HttpError(503,'AUTH_FAILED','Could not open your account.');response.cookies.set(names.access,t.access_token,{...cookieOptions,maxAge:Math.min(t.expires_in,86400)});response.cookies.set(names.refresh,t.refresh_token,{...cookieOptions,maxAge:1209600});return response;}
async function register(raw:unknown) {const t=object(raw);if(typeof t.access_token!=='string')throw new HttpError(401,'AUTH_FAILED','Please sign in again.');const user=await provider('/auth/v1/user',undefined,t.access_token);if(!user.email_confirmed_at)throw new HttpError(401,'VERIFY_EMAIL','Verify your email first.');await rpc('gymaf_register_session',{},t.access_token);return t;}
export async function hostedAccount():Promise<LocalAccount|null> {if(!hostedConfig())return null;const token=(await cookies()).get(names.access)?.value;if(!token)return null;try{return await rpc('physix_account',{},token);}catch(error){if(error instanceof HttpError&&error.status===401)return null;throw error;}}

/** Only this explicit compatibility adapter calls retained care RPCs in PhysiX's own database. */
export async function hostedHandler(request:NextRequest,path:string) {
 try {
  if(!hostedConfig())throw new HttpError(503,'SETUP_REQUIRED','The service is not configured.');
  if(request.method==='GET') {
   if(path==='offers')return success(await provider('/rest/v1/physix_offers?select=id,slug,name,modes,duration_minutes,timezone,booking_enabled,price_minor,currency,policy_version,policy_text&order=slug'));
   if(path==='slots')return success(await rpc('physix_slots',{p_offer:uuid(request.nextUrl.searchParams.get('offerId')),p_mode:text(request.nextUrl.searchParams.get('mode'),'Mode',16,1),p_day:dateOnly(request.nextUrl.searchParams.get('day'))}));
   if(path==='me')return success(await rpc('physix_account',{},tokenFor(request)));
   const match=/^(sessions|relationships)\/([0-9a-f-]{36})$/i.exec(path);
   if(match)return success(await rpc('gymaf_query',{p_kind:match[1]==='sessions'?'session':'relationship',p_id:uuid(match[2])},tokenFor(request)));
   throw new HttpError(404,'NOT_FOUND','Unknown resource.');
  }
  if(request.headers.get('origin')!==hostedConfig()!.origin||request.headers.get('sec-fetch-site')==='cross-site')throw new HttpError(403,'FORBIDDEN','Invalid request origin.');
  const body=await readBody(request);
  if(path.startsWith('auth/')&&path!=='auth/logout'&&process.env.PHYSIX_AUTH_READY!=='1')throw new HttpError(503,'AUTH_SETUP_REQUIRED','Email sign-in is being configured. Please try again later.');
  if(path==='auth/request-link') {const {verifier,challenge}=createPkce();await provider('/auth/v1/otp?redirect_to='+encodeURIComponent(hostedConfig()!.origin+'/auth/callback'),{email:email(body.email),create_user:true,code_challenge:challenge,code_challenge_method:'s256'});const response=success({requested:true});response.cookies.set(names.pkce,verifier,{...cookieOptions,maxAge:3600});response.cookies.set(names.returnTo,safeCareReturn(body.returnTo),{...cookieOptions,maxAge:3600});return response;}
  if(path==='auth/verify-code') {const code=text(body.code,'Code',10,6);if(!/^\d{6,10}$/.test(code))throw new HttpError(422,'INVALID_INPUT','Enter the code from your email.');return tokens(success({signedIn:true}),await register(await provider('/auth/v1/verify',{email:email(body.email),token:code,type:'email'})));}
  if(path==='auth/refresh') {const refresh=request.cookies.get(names.refresh)?.value;if(!refresh)throw new HttpError(401,'SIGN_IN_REQUIRED','Please sign in.');return tokens(success({signedIn:true}),await register(await provider('/auth/v1/token?grant_type=refresh_token',{refresh_token:refresh})));}
  if(path==='auth/logout') {const token=request.cookies.get(names.access)?.value;if(token)await rpc('gymaf_revoke_session',{},token);const response=success({signedOut:true});for(const name of Object.values(names))response.cookies.set(name,'',{...cookieOptions,maxAge:0});return response;}
  if(path==='commands') {const token=tokenFor(request);const action=text(body.action,'Action',40,1),commandId=uuid(body.commandId),payload=object(body.payload);if(Object.keys(body).some(k=>!['action','commandId','payload'].includes(k)))throw new HttpError(422,'INVALID_INPUT','Unexpected command fields.');
   if(action==='booking.reserve'||action==='booking.cancel')return success(await rpc('physix_booking_command',{p_action:action.split('.')[1],p_command_id:commandId,p:payload},token));
   throw new HttpError(403,'FORBIDDEN','This action is not available.');
  }
  throw new HttpError(404,'NOT_FOUND','Unknown resource.');
 }catch(error){return failure(error);}
}
export async function hostedCallback(request:NextRequest) {
 const c=hostedConfig();if(!c)return NextResponse.json({error:'Sign-in is not configured.'},{status:503});
 const redirect=(path:string)=>{const response=NextResponse.redirect(new URL(path,c.origin),303);response.headers.set('Cache-Control','private, no-store');response.headers.set('Referrer-Policy','no-referrer');return response;};
 try {const code=request.nextUrl.searchParams.get('code'),verifier=request.cookies.get(names.pkce)?.value;if(!code||!validVerifier(verifier))throw new Error('Invalid link');const result=await register(await provider('/auth/v1/token?grant_type=pkce',{auth_code:code,code_verifier:verifier}));const response=tokens(redirect(safeCareReturn(request.cookies.get(names.returnTo)?.value)),result);for(const name of [names.pkce,names.returnTo])response.cookies.set(name,'',{...cookieOptions,maxAge:0});return response;}catch{return redirect('/login?error=invalid-link');}
}
