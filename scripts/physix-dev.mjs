import {fork,spawn} from 'node:child_process';
import {randomBytes} from 'node:crypto';
// One disk-backed Postgres test process. No donor secrets, hosted credentials or paid services.
const secret=randomBytes(32).toString('hex');
const env={...process.env,NODE_ENV:'development',PHYSIX_DEMO:'1',PHYSIX_LOCAL_BACKEND:'1',PHYSIX_LOCAL_RPC_SECRET:secret,PHYSIX_APP_ORIGIN:'http://127.0.0.1:3217',NEXT_TELEMETRY_DISABLED:'1'};
const backend=fork('scripts/physix-local/server.mjs',[],{env,stdio:['ignore','inherit','inherit','ipc']});
let web,stopping=false;
const stop=()=>{if(stopping)return;stopping=true;web?.kill();backend.kill();};
backend.on('message',message=>{
 if(!message.ready||web)return;
 web=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1','--port','3217'],{stdio:'inherit',env:{...env,PHYSIX_LOCAL_RPC_PORT:String(message.port)}});
 web.on('error',error=>{console.error(error.message);stop();process.exitCode=1;});
 web.on('exit',code=>{stop();process.exitCode=code??0;});
});
backend.on('exit',code=>{if(!stopping){stop();process.exitCode=code||1;}});
backend.on('error',error=>{console.error(error.message);stop();process.exitCode=1;});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,stop);
