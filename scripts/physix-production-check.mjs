import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {once} from 'node:events';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const reservation=createServer();reservation.listen(0,'127.0.0.1');await once(reservation,'listening');const port=reservation.address().port;await new Promise(r=>reservation.close(r));
const env={...process.env,PHYSIX_DEMO:'1',NEXT_TELEMETRY_DISABLED:'1'};for(const key of ['PHYSIX_ISOLATED_CONTRACT_TESTS','SUPABASE_URL','SUPABASE_PUBLISHABLE_KEY','SUPABASE_ANON_KEY','STRIPE_SECRET_KEY'])delete env[key];
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env,stdio:'ignore',windowsHide:true});
const base='http://127.0.0.1:'+port;const checks=[];
async function expect(route,status,options={}){const r=await fetch(base+route,{...options,redirect:'manual',signal:AbortSignal.timeout(10000)});assert.equal(r.status,status,route);checks.push({route,status,method:options.method||'GET'});return r;}
try{
 let ready=false;for(let i=0;i<100;i++){try{ready=(await fetch(base,{signal:AbortSignal.timeout(1000)})).ok;}catch{}if(ready)break;await new Promise(r=>setTimeout(r,100));}assert.ok(ready,'Production app starts');
 for(const route of ['/','/book','/plans','/login'])await expect(route,200);
 for(const route of ['/dev/demo/book','/dev/demo/book/time','/dev/demo/book/details','/dev/demo/book/review','/dev/demo/book/complete','/dev/demo','/dev/demo/plans','/dev/demo/sessions/demo-session','/dev/demo/progress','/coach','/coaches/example','/preview','/review','/design-review','/friends'])await expect(route,404);
 for(const route of ['/app','/app/plans','/practitioner','/practitioner/patients']){const r=await expect(route,307);assert.equal(r.headers.get('location'),'/login');}
 for(const route of ['/api/v1/me','/api/v1/me/export'])await expect(route,503);
 for(const route of ['/api/v1/commands','/api/v1/billing/webhook'])await expect(route,503,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
 const html=await (await fetch(base)).text();for(const forbidden of ['Synthetic patient demo','Assigned in care','/physix/movement.jpg','GYMAF_REFERENCE_PREVIEW'])assert.equal(html.includes(forbidden),false,forbidden+' not rendered in production');
 writeFileSync(process.env.PHYSIX_PRODUCTION_EVIDENCE||'docs/physix/evidence/first-slice-20260919/production-isolation.json',JSON.stringify({port,PHYSIX_DEMO:'1',NODE_ENV:'production',checks,passed:true},null,2));console.log('PRODUCTION_ISOLATION_PASSED',checks.length,'requests; demo flag cannot enable production fixtures.');
}finally{child.kill();await once(child,'exit');}