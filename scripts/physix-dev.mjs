import {spawn} from 'node:child_process';
// Explicit local-only visual demonstration, with no copied provider environment.
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1','--port','3217'],{stdio:'inherit',env:{...process.env,PHYSIX_DEMO:'1',NEXT_TELEMETRY_DISABLED:'1'}});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('error',error=>{console.error(error.message);process.exitCode=1;});
child.on('exit',code=>{process.exitCode=code??1;});