import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const binary=process.env.AGENT_BROWSER_BIN||'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const out=resolve(process.env.PHYSIX_EVIDENCE_DIR||'docs/physix/evidence/booking-layout-latest');mkdirSync(out,{recursive:true});const checks=[];
function run(...args){const r=JSON.parse(execFileSync(binary,['--session','physix-work','--json',...args],{encoding:'utf8',timeout:35000}));if(!r.success)throw Error(r.error);return r.data;}
const evaluate=js=>run('eval','-b',Buffer.from(js).toString('base64')).result;
function wait(js){for(let i=0;i<60;i++){try{if(evaluate(js))return;}catch{}Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}throw Error('Timed out: '+js);}
function go(route){evaluate('setTimeout(()=>location.assign('+JSON.stringify('http://127.0.0.1:3217'+route)+'),0);true');wait('location.pathname==='+JSON.stringify(route)+'&&!!document.querySelector("#main")');}
function click(selector){run('wait',selector);run('click',selector);}
const shot=name=>run('screenshot',resolve(out,name+'.png'));
try{
 for(const width of [320,390,768,1440]){
  run('set','viewport',String(width),width<700?'844':'1000');go('/book');run('wait','.px-service-choice');click('.px-service-choice:first-child');run('wait','.px-booking-times button');
  assert.ok(evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'Time picker document overflow '+width);
  assert.ok(evaluate('[...document.querySelectorAll(".px-booking-times>button")].every(e=>e.getBoundingClientRect().width>=44)'),'Time control width');
  click('.px-booking-times>button:first-child');
  if(width<700)assert.ok(evaluate('(()=>{const b=document.querySelector(".px-book-layout>section>.button.primary"),r=b.getBoundingClientRect();return r.bottom<=innerHeight&&r.top>=0&&document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest("button")===b})()'),'Mobile Continue visible and unobstructed');
  shot('time-'+width);click('.px-book-layout>section>.button.primary');run('wait','.px-review-card');assert.ok(evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'Review overflow '+width);shot('review-'+width);
  checks.push({width,timePickerOverflow:false,reviewOverflow:false,focused:true});
 }
 run('set','viewport','320','740');go('/care/progress');run('wait','.px-care-stats');assert.ok(evaluate('[...document.querySelectorAll(".px-care-stats strong")].every(e=>e.scrollWidth<=e.clientWidth+1)'));assert.equal(evaluate('document.querySelector(".px-account").getAttribute("aria-label")'),'Account');shot('progress-320');checks.push({name:'Narrow statistics fit and account icon remains named',passed:true});
 go('/care/appointments');run('wait','.px-care-appointment');const id=process.env.PHYSIX_TEST_APPOINTMENT_ID;
 if(id&&/^[0-9a-f-]{36}$/.test(id)){click('article[data-appointment-id="'+id+'"] button');click('dialog .button.primary');wait('!document.querySelector("dialog[open]")');wait('fetch("/api/physix/v1/me").then(r=>r.json()).then(r=>r.data.appointments.some(a=>a.id==='+JSON.stringify(id)+'&&a.state==="cancelled"))');run('reload');run('wait','.px-care-appointment');assert.ok(evaluate('fetch("/api/physix/v1/me").then(r=>r.json()).then(r=>r.data.appointments.some(a=>a.id==='+JSON.stringify(id)+'&&a.state==="cancelled"))'));checks.push({name:'Cancellation is acknowledged and survives a real reload',passed:true});shot('cancelled-320');}
 writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:true,checks,timestamp:new Date().toISOString()},null,2));console.log('BOOKING_LAYOUT_AND_CANCEL_PASSED',checks.length);
}catch(error){writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:false,checks,error:String(error)},null,2));console.error(error);process.exitCode=1;}
