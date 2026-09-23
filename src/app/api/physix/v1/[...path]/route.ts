import {hostedBackendEnabled} from '@/server/physix/hosted-config';
import {hostedHandler} from '@/server/physix/hosted-backend';
import {NextRequest,NextResponse} from 'next/server';
import {localBackendEnabled,localCookie,localRpc} from '@/server/physix/local-backend';
export const runtime='nodejs';
export const dynamic='force-dynamic';
type Context={params:Promise<{path:string[]}>};
const reply=(status:number,code:string,message:string)=>NextResponse.json({error:{code,message}},{status,headers:{'Cache-Control':'private, no-store'}});
async function body(request:NextRequest):Promise<Record<string,unknown>>{
 const reader=request.body?.getReader();if(!reader)return {};
 const chunks:Uint8Array[]=[];let size=0;
 while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>70000){await reader.cancel();throw Error('BODY_LIMIT');}chunks.push(value);}
 const data=JSON.parse(Buffer.concat(chunks).toString('utf8'));
 if(!data||typeof data!=='object'||Array.isArray(data))throw Error('INVALID_BODY');return data;
}
async function handler(request:NextRequest,context:Context){
 if(hostedBackendEnabled())return hostedHandler(request,(await context.params).path.join('/'));
 if(!localBackendEnabled())return reply(503,'SETUP_REQUIRED','The PhysiX backend is not configured.');
 const origin=process.env.PHYSIX_APP_ORIGIN;
 if(!origin||request.headers.get('host')!==new URL(origin).host)return reply(403,'FORBIDDEN','Invalid local host.');
 if(request.method==='POST'&&request.headers.get('origin')!==origin)return reply(403,'FORBIDDEN','Invalid request origin.');
 if(request.method==='POST'&&!request.headers.get('content-type')?.startsWith('application/json'))return reply(415,'INVALID_BODY','JSON is required.');
 const segments=(await context.params).path,path=segments.join('/'),token=request.cookies.get(localCookie)?.value||'';
 try{
  let operation='',input:unknown={};
  if(request.method==='GET'){
   if(['me','offers'].includes(path))operation=path;
   else if(path==='slots'){operation='slots';input=Object.fromEntries(['offerId','mode','day'].map(k=>[k,request.nextUrl.searchParams.get(k)]));}
   else if(segments.length===2&&['sessions','workspace','relationships'].includes(segments[0])){operation=segments[0]==='sessions'?'session':segments[0]==='relationships'?'relationship':'workspace';input={id:segments[1]};}
  }else if(path==='commands'){operation='command';input=await body(request);}
  else if(path==='auth/local'){
   const data=await body(request);
   if(Object.keys(data).some(k=>k!=='persona')||!['patient','other','practitioner'].includes(String(data.persona)))return reply(422,'INVALID_INPUT','Choose a local test account.');
   operation='login';input=data;
  }else if(path==='auth/logout')operation='logout';
  if(!operation)return reply(404,'NOT_FOUND','Unknown resource.');
  const result=await localRpc(operation,input,token),payload=await result.json();
  if(operation==='login'&&result.ok){
   if(token)await localRpc('logout',{},token).catch(()=>undefined);
   const response=NextResponse.json({data:{persona:payload.data.persona,environment:'local-test'}},{headers:{'Cache-Control':'private, no-store'}});
   response.cookies.set(localCookie,payload.data.token,{httpOnly:true,sameSite:'strict',secure:false,path:'/',maxAge:28800});return response;
  }
  const response=NextResponse.json(payload,{status:result.status,headers:{'Cache-Control':'private, no-store'}});
  if(operation==='logout')response.cookies.set(localCookie,'',{httpOnly:true,sameSite:'strict',path:'/',maxAge:0});
  return response;
 }catch(error){if(error instanceof SyntaxError||(error instanceof Error&&error.message==='INVALID_BODY'))return reply(422,'INVALID_INPUT','A JSON object is required.');if(error instanceof Error&&error.message==='BODY_LIMIT')return reply(413,'BODY_LIMIT','Request is too large.');return reply(503,'TEMPORARY_UNAVAILABLE','Could not reach the local database. Your work has not been marked saved. Retry.');}
}
export const GET=handler;
export const POST=handler;
