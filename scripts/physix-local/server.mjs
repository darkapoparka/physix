import {createServer} from 'node:http';
import {timingSafeEqual} from 'node:crypto';
import {resolve} from 'node:path';
import {mkdirSync,openSync,writeFileSync,closeSync,unlinkSync,readFileSync,existsSync} from 'node:fs';
import {openDatabase,refreshTestWindows,login,dispatch} from './database.mjs';
if(process.env.NODE_ENV!=='development'||process.env.PHYSIX_LOCAL_BACKEND!=='1')throw Error('Local database service is development-only.');
const secret=process.env.PHYSIX_LOCAL_RPC_SECRET||'';
if(!/^[a-f0-9]{64}$/.test(secret))throw Error('Missing local RPC secret.');
const directory=resolve('.artifacts/physix-local'),lock=resolve(directory,'writer.lock');
mkdirSync(directory,{recursive:true});
if(existsSync(lock)){
 const pid=Number(readFileSync(lock,'utf8'));let alive=true;
 try{process.kill(pid,0);}catch(error){if(error.code==='ESRCH')alive=false;else throw error;}
 if(alive)throw Error('Another PhysiX local data writer is active.');
 unlinkSync(lock);
}
const handle=openSync(lock,'wx');writeFileSync(handle,String(process.pid));closeSync(handle);
let pg,server;
async function stop(code=0){server?.close();if(pg)await pg.close();if(existsSync(lock)&&readFileSync(lock,'utf8')===String(process.pid))unlinkSync(lock);process.exit(code);}
try{
 pg=await openDatabase(resolve(directory,'pgdata'));await refreshTestWindows(pg);
 server=createServer(async(req,res)=>{
  const reply=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
  const candidate=(req.headers.authorization||'').replace(/^Bearer /,'');
  if(candidate.length!==secret.length||!timingSafeEqual(Buffer.from(candidate),Buffer.from(secret)))return reply(403,{error:{code:'FORBIDDEN',message:'Forbidden'}});
  if(req.method!=='POST'||req.url!=='/rpc')return reply(404,{error:{code:'NOT_FOUND',message:'Not found'}});
  try{
   let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>70000)throw Object.assign(Error('Request too large'),{code:'22023'});}
   const {operation,token,input}=JSON.parse(raw);
   const data=operation==='login'?await login(pg,input?.persona):await dispatch(pg,token,operation,input);
   reply(200,{data});
  }catch(error){
   const code=error.name==='InputError'?'22023':error.code;
   const status=code==='28000'?401:['42501','P0002'].includes(code)?403:['23505','23P01','40001','GY409'].includes(code)?409:code==='22023'||error instanceof SyntaxError?422:500;
   // Do not echo SQL, request bodies, symptom answers or provider errors.
   reply(status,{error:{code:status===409?'CONFLICT':status===401?'SESSION_EXPIRED':status===403?'FORBIDDEN':status===422?'INVALID_INPUT':'UNAVAILABLE',message:status===409?'The record or time changed. Refresh and try again.':status===401?'Your local session expired. Sign in again.':status===403?'This record is not available to this account.':status===422?'Check the entered values.':'The local database could not complete this request.'}});
   if(status===500)console.error('Local operation failed:',operationLabel(req),code||error.name);
  }
 });
 server.listen(0,'127.0.0.1',()=>{const port=server.address().port;process.send?.({ready:true,port});console.log('PhysiX local test database ready on loopback.');});
}catch(error){console.error('Local database startup failed:',error.message);await stop(1);}
function operationLabel(){return 'rpc';}
process.on('SIGTERM',()=>void stop());process.on('SIGINT',()=>void stop());process.on('disconnect',()=>void stop());
