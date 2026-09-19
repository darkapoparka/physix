"use client";
import {useCallback,useEffect,useRef,useState} from 'react';
export class LocalApiError extends Error {constructor(public status:number,message:string){super(message);}}
export async function localApi<T>(path:string,options:{body?:unknown;signal?:AbortSignal}={}):Promise<T>{
 const response=await fetch('/api/physix/v1/'+path,{method:options.body===undefined?'GET':'POST',credentials:'same-origin',cache:'no-store',signal:options.signal?AbortSignal.any([options.signal,AbortSignal.timeout(16000)]):AbortSignal.timeout(16000),...(options.body===undefined?{}:{headers:{'Content-Type':'application/json'},body:JSON.stringify(options.body)})});
 const result=await response.json();if(!response.ok)throw new LocalApiError(response.status,result.error?.message||'The request failed. Retry.');return result.data as T;
}
export function useSavedResource<T>(path:string|null){
 const [state,setState]=useState<{key:string|null;data:T|null;error:string;loading:boolean}>({key:path,data:null,error:'',loading:!!path});
 const [revision,setRevision]=useState(0);const reload=useCallback(()=>setRevision(n=>n+1),[]);
 useEffect(()=>{
  if(!path)return;
  const controller=new AbortController();let alive=true;
  Promise.resolve().then(()=>{if(alive)setState(s=>({key:path,data:s.key===path?s.data:null,loading:true,error:''}));});
  void localApi<T>(path,{signal:controller.signal}).then(data=>{if(alive)setState({key:path,data,error:'',loading:false});}).catch(error=>{if(alive)setState({key:path,data:null,error:error instanceof Error?error.message:'Could not load.',loading:false});});
  return()=>{alive=false;controller.abort();};
 },[path,revision]);
 useEffect(()=>{if(typeof BroadcastChannel==='undefined')return;const channel=new BroadcastChannel('physix-local-identity');channel.onmessage=()=>{setState({key:null,data:null,error:'',loading:true});reload();};return()=>channel.close();},[reload]);
 return {...(state.key===path?state:{data:null,error:'',loading:!!path}),reload};
}
export function announceIdentity(){if(typeof BroadcastChannel==='undefined')return;const channel=new BroadcastChannel('physix-local-identity');channel.postMessage('changed');channel.close();}
export function useSavedCommand(){
 const pending=useRef<{signature:string;commandId:string}|null>(null),locked=useRef(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 async function run(action:string,payload:Record<string,unknown>):Promise<{id:string;revision?:number}|null>{
  if(locked.current)return null;locked.current=true;setBusy(true);setError('');
  const signature=JSON.stringify({action,payload});
  if(pending.current?.signature!==signature)pending.current={signature,commandId:crypto.randomUUID()};
  try{const result=await localApi<{id:string;revision?:number}>('commands',{body:{action,payload,commandId:pending.current.commandId}});pending.current=null;return result;}
  catch(failure){setError(failure instanceof Error?failure.message:'Not saved. Retry.');return null;}
  finally{locked.current=false;setBusy(false);}
 }
 return {run,busy,error};
}
