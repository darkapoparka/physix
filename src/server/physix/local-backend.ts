import {hostedAccount} from './hosted-backend';
import {hostedBackendEnabled} from './hosted-config';
import {cookies} from 'next/headers';
import type {LocalAccount} from '@/shared/physix/contracts';
export const localCookie='physix_local_session';
export function localBackendEnabled():boolean {
 return process.env.NODE_ENV==='development'&&process.env.PHYSIX_LOCAL_BACKEND==='1'&&/^[a-f0-9]{64}$/.test(process.env.PHYSIX_LOCAL_RPC_SECRET||'')&&/^\d{1,5}$/.test(process.env.PHYSIX_LOCAL_RPC_PORT||'');
}
export async function localRpc(operation:string,input:unknown={},token=''):Promise<Response> {
 if(!localBackendEnabled())return Response.json({error:{code:'SETUP_REQUIRED',message:'The PhysiX backend is not configured.'}},{status:503});
 return fetch('http://127.0.0.1:'+process.env.PHYSIX_LOCAL_RPC_PORT+'/rpc',{method:'POST',cache:'no-store',headers:{Authorization:'Bearer '+process.env.PHYSIX_LOCAL_RPC_SECRET,'Content-Type':'application/json'},body:JSON.stringify({operation,input,token}),signal:AbortSignal.timeout(15000)});
}
export async function localAccount():Promise<LocalAccount|null>{
 if(hostedBackendEnabled())return hostedAccount();
 if(!localBackendEnabled())return null;
 const token=(await cookies()).get(localCookie)?.value;
 if(!token)return null;
 try{const response=await localRpc('me',{},token);if(!response.ok)return null;return (await response.json()).data as LocalAccount;}catch{return null;}
}
