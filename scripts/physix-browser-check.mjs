import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const binary=process.env.AGENT_BROWSER_BIN||'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session=process.env.PHYSIX_BROWSER_SESSION||'physix-review',base='http://127.0.0.1:3217',out=path.resolve(process.env.PHYSIX_EVIDENCE_DIR||'docs/physix/evidence/first-slice-20260919');
mkdirSync(out,{recursive:true});const checks=[],captures=[];
function run(...args){if(['click','fill','check','uncheck'].includes(args[0]))run('wait',args[1]);const raw=execFileSync(binary,['--session',session,'--json',...args],{encoding:'utf8',timeout:45000,windowsHide:true});const result=JSON.parse(raw.trim());if(!result.success)throw Error(JSON.stringify(result.error));return result.data;}
function evaluate(js){return run('eval','-b',Buffer.from(js).toString('base64')).result;}
function check(name,js){let result=false;for(let i=0;i<40;i++){result=evaluate("(()=>{try{return ("+js+")}catch{return false}})()");if(result===true)break;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}assert.equal(result,true,name);checks.push({name,passed:true});console.log('PASS',name);}
function shot(name){run('screenshot',path.join(out,name+'.png'));}
function save(){writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({timestamp:new Date().toISOString(),checks,captures},null,2));}
try{
 run('console','--clear');run('errors','--clear');run('set','viewport','390','844');
 run('open',base+'/');run('fill','#home-search','sports');run('click','button[aria-label="Search services"]');
 check('Home search navigates to matching services',`location.pathname==='/book'&&document.querySelectorAll('.px-service-choice').length===1&&document.body.innerText.includes('Sports rehabilitation')`);
 run('fill','#service-search','No matching service');check('Search no-results is honest',`document.body.innerText.includes('No matching services')`);
 run('click','.px-empty .button');run('click','.px-segment button:nth-child(2)');check('Online excludes clinic-only service',`document.querySelectorAll('.px-service-choice').length===2&&!document.querySelector('.px-service-list').textContent.includes('Sports rehabilitation')`);
 run('click','.px-service-choice:first-child');run('click','.px-book-summary .button');check('Availability is explicitly unconnected, not confirmed',`document.querySelector('dialog[open]').textContent.includes('Live times aren’t connected yet.')`);
 shot('booking-availability-390');run('press','Tab');check('Modal keyboard focus is contained',`document.querySelector('dialog[open]').contains(document.activeElement)`);run('press','Escape');check('Escape closes and restores availability trigger focus',`!document.querySelector('dialog[open]')&&document.activeElement.textContent.includes('View availability')`);
 run('click','.px-dock button');check('Menu opens',`!!document.querySelector('dialog[open]')`);run('press','Escape');check('Menu restores focus on close',`document.activeElement.textContent.includes('Menu')`);
 run('open',base+'/dev/demo');run('click','.px-today-card');run('click','.px-plan-detail .button.primary');
 check('Plan starts a distinct focused exercise attempt',`location.pathname==='/dev/demo/sessions/demo-session'&&document.body.innerText.includes('Record set')&&!document.querySelector('.px-dock')`);
 run('click','.px-test-controls summary');run('check','.px-test-controls input[type=checkbox]');run('click','.px-exercise-panel>.button.primary');
 check('Simulated failure never records success',`document.body.innerText.includes('Simulated save failure')&&document.querySelector('[role=progressbar]').getAttribute('aria-valuenow')==='0'`);
 shot('session-save-failure-390');run('click','.px-exercise-panel>.button.primary');check('Retry records exactly one set',`document.querySelector('[role=progressbar]').getAttribute('aria-valuenow')==='1'&&!document.querySelector('[role=alert]')`);
 run('click','button[aria-label="Pause demonstration"]');const paused=evaluate(`document.querySelector('.px-timer>span').textContent`);await new Promise(r=>setTimeout(r,1300));assert.equal(evaluate(`document.querySelector('.px-timer>span').textContent`),paused);checks.push({name:'Pause stops elapsed clock',passed:true});
 run('click','button[aria-label="Resume demonstration"]');run('click','.px-test-controls>button');run('click','dialog .button.primary');
 check('Finish remains labelled demo activity',`document.body.innerText.includes('Demonstration finished.')`);run('click','.px-demo-complete .button');check('Session activity survives client navigation',`document.querySelector('.px-stat-card>strong').textContent==='1'`);
 run('click','button[aria-label="Change demo state"]');run('click','dialog .row:nth-child(4)');run('click','.px-dock a[href="/dev/demo/plans"]');check('Empty account has no synthetic assignment',`document.body.innerText.includes('A fresh start.')&&!document.querySelector('.px-today-card')`);shot('empty-plan-390');
 run('click','button[aria-label="Change demo state"]');run('click','dialog .row:nth-child(3)');check('Paid personal plan waits for assignment',`document.body.innerText.includes('Your personal plan is on its way.')&&!document.querySelector('.px-today-card')`);shot('pending-plan-390');
 run('click','button[aria-label="Change demo state"]');run('click','dialog .row:nth-child(2)');check('Purchased plan is distinguished from clinic assignment',`document.body.innerText.includes('Purchased programme')`);shot('purchased-plan-390');
 check('Demo uses no browser persistence',`localStorage.length===0&&sessionStorage.length===0`);
 run('open',base+'/app/plans');check('Real patient routes do not use fixtures',`location.pathname==='/login'&&!document.querySelector('.px-today-card')&&document.body.innerText.includes('Patient sign-in is not connected yet.')`);
 run('open',base+'/practitioner/patients');check('Unconfigured practitioner area fails closed',`location.pathname==='/login'`);
 const routes=[['home','/'],['book','/book'],['plans','/plans'],['patient','/dev/demo'],['my-plan','/dev/demo/plans'],['plan-detail','/dev/demo/plans/demo-plan'],['session','/dev/demo/sessions/demo-session']];
 for(const [w,h] of [[390,844],[320,740],[1440,1000]]){
  run('set','viewport',String(w),String(h));for(const [name,route] of routes){run('open',base+route);const state=evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),fontStatus:[...document.fonts].filter(f=>['sans','serif'].includes(f.family)).map(f=>f.status),heading:document.querySelector('h1')?.textContent})`);assert.ok(state.scrollWidth<=state.width+1,'Overflow '+route+' '+w);assert.equal(state.broken.length,0,'Broken media '+route+' '+w);assert.ok(state.fontStatus.every(s=>s==='loaded'),'Font loading '+route);shot(name+'-'+w);captures.push({route,width:w,height:h,...state,file:name+'-'+w+'.png'});console.log('CAPTURE',route,w);save();}
 }
 const errors=run('errors').errors;assert.equal(errors.length,0,'Uncaught browser errors');checks.push({name:'No uncaught browser errors',passed:true});writeFileSync(path.join(out,'browser-console.json'),JSON.stringify(run('console'),null,2));
 save();console.log('BROWSER_ACCEPTANCE_PASSED',checks.length,'checks',captures.length,'captures');
}catch(error){save();writeFileSync(path.join(out,'browser-failure.txt'),String(error.stack));console.error(error);process.exitCode=1;}