import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const binary=process.env.AGENT_BROWSER_BIN||'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session=process.env.PHYSIX_BROWSER_SESSION||'physix-work',base='http://127.0.0.1:3217';
const out=resolve(process.env.PHYSIX_EVIDENCE_DIR||'docs/physix/evidence/saved-workflow-latest');mkdirSync(out,{recursive:true});
const checks=[],captures=[];
function run(...args){const raw=execFileSync(binary,['--session',session,'--json',...args],{encoding:'utf8',timeout:35000,windowsHide:true});const result=JSON.parse(raw.trim());if(!result.success)throw Error(result.error);return result.data;}
const evaluate=js=>run('eval','-b',Buffer.from(js).toString('base64')).result;
function wait(js){for(let i=0;i<70;i++){try{if(evaluate(js))return;}catch{}Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}throw Error('Timed out: '+js);}
function check(name,js){wait(js);checks.push({name,passed:true});console.log('PASS',name);}
function click(selector){run('wait',selector);run('click',selector);}
function navigate(route){evaluate('setTimeout(()=>location.assign('+JSON.stringify(base+route)+'),0);true');wait('location.pathname==='+JSON.stringify(route)+' && !!document.querySelector("#main")');}
function reload(){const previous=evaluate('performance.timeOrigin');run('reload');wait('performance.timeOrigin!=='+previous+' && !!document.querySelector("#main")');}
function me(){return evaluate('fetch("/api/physix/v1/me").then(r=>r.json()).then(r=>r.data)');}
function shot(name){run('screenshot',resolve(out,name+'.png'));}
function enter(persona){navigate('/login');click(persona==='patient'?'.px-account-gate>.button.primary':persona==='other'?'.px-account-gate>button:nth-of-type(3)':'.px-account-gate>button:nth-of-type(2)');wait('location.pathname==='+JSON.stringify(persona==='practitioner'?'/practitioner':'/care')+' && !!document.querySelector(".px-care-heading")');}
function save(){writeFileSync(resolve(out,'results.json'),JSON.stringify({timestamp:new Date().toISOString(),checks,captures},null,2));}
try{
 run('network','unroute');run('errors','--clear');run('set','viewport','390','844');enter('patient');
 const before=me(),historyBefore=before.relationship.sessions.filter(s=>s.state==='completed').length;
 check('Icon-only patient dock is 200 by 44 at 390px', '(()=>{const r=document.querySelector(".px-dock").getBoundingClientRect();return r.width===200&&r.height===44})()');shot('patient-390');
 check('Start session is visible and not covered by the dock','(()=>{const b=document.querySelector(".px-patient-grid>section>.button.primary"),r=b.getBoundingClientRect();return r.top>=0&&r.bottom<innerHeight-72&&document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest("button")===b})()');
 click('.px-patient-grid>section>.button.primary');run('wait','.px-actual-set');const attemptPath=evaluate('location.pathname');
 check('Session starts with a durable ID and no dock','/^\\/care\\/sessions\\/[0-9a-f-]{36}$/.test(location.pathname)&&!document.querySelector(".px-dock")');
 run('fill','.px-actual-set:first-of-type input[type=number]','9');run('fill','.px-actual-set:first-of-type input[type=number]','8');
 run('network','route',base+'/api/physix/v1/commands','--abort');click('.px-actual-set:first-of-type .button');
 check('Failed save keeps the input dirty and does not claim success','!!document.querySelector(".px-actual-set [role=alert]")&&document.querySelector(".px-actual-set").textContent.includes("Not saved yet")');shot('save-failure-390');
 run('network','unroute',base+'/api/physix/v1/commands');click('.px-actual-set:first-of-type .button');
 check('Retry records exactly one first set','document.querySelector("[role=progressbar]").getAttribute("aria-valuenow")==="1"&&document.querySelector(".px-actual-set legend").textContent.includes("Saved")');
 reload();run('wait','.px-actual-set legend span');check('Reload preserves the same attempt and saved repetitions','location.pathname==='+JSON.stringify(attemptPath)+'&&document.querySelector(".px-actual-set input[type=number]").value==="8"');
 click('.px-player-top>button:last-child');check('Pause is acknowledged by the server','document.querySelector(".px-player-top>button:last-child").getAttribute("aria-label")==="Resume session"');
 const paused=evaluate('document.querySelector(".px-timer>span").textContent');await new Promise(r=>setTimeout(r,1400));assert.equal(evaluate('document.querySelector(".px-timer>span").textContent'),paused);checks.push({name:'Paused clock does not accumulate time',passed:true});
 click('.px-player-top>button:first-child');click('dialog .button.primary');wait('location.pathname==="/care"&&!!document.querySelector(".px-patient-grid")');click('.px-patient-grid>section>.button.primary');
 check('Pause and return resumes the existing attempt','location.pathname==='+JSON.stringify(attemptPath)+'&&!!document.querySelector(".px-actual-set")');
 click('.px-player-top>button:last-child');wait('document.querySelector(".px-player-top>button:last-child").getAttribute("aria-label")==="Pause session"');
 run('fill','.px-actual-set:nth-of-type(2) input[type=number]','8');click('.px-actual-set:nth-of-type(2) .button');wait('document.querySelector("[role=progressbar]").getAttribute("aria-valuenow")==="2"');
 click('.px-player-actions>button:last-child');run('fill','.px-actual-set input[type=number]','20');click('.px-actual-set .button');wait('document.querySelector("[role=progressbar]").getAttribute("aria-valuenow")==="3"');
 click('.px-player-actions>button:last-child');run('fill','.px-actual-fields>label:first-child input','6');run('fill','.px-actual-fields>label:last-child input','2');click('.px-actual-set .button');
 check('Repetition, duration and resistance actuals are all saved','document.querySelector("[role=progressbar]").getAttribute("aria-valuenow")==="4"');shot('exercise-saved-390');
 click('.px-exercise-panel>.px-text-link');click('dialog .button.primary');check('Completion renders only after acknowledgement','document.querySelector("h1")?.textContent==="Session finished."');
 click('.px-main>.button.primary');run('wait','.px-care-stats');assert.equal(me().relationship.sessions.filter(s=>s.state==='completed').length,historyBefore+1);checks.push({name:'Completed history contains a distinct saved attempt',passed:true});reload();run('wait','.px-care-stats');shot('progress-390');
 navigate('/care/check-ins');wait('!!document.querySelector(".px-care-form")||!!document.querySelector(".px-care-appointment")');
 if(evaluate('!!document.querySelector(".px-care-form")')){run('fill','.px-care-form input[type=number]','4');run('fill','.px-care-form textarea','Synthetic browser check-in');check('Sharing acknowledgement is required','document.querySelector(".px-care-form .button.primary").disabled');run('check','.px-care-form input[type=checkbox]');click('.px-care-form .button.primary');}
 check('Shared check-in is persisted','document.querySelector(".px-care-appointment")?.textContent.includes("Check-in saved")');reload();run('wait','.px-care-appointment');shot('check-in-390');
 navigate('/book');run('wait','.px-service-choice');click('.px-service-choice:first-child');run('wait','.px-booking-times button');shot('booking-times-390');
 check('Booking is focused and no dock covers Continue','!document.querySelector(".px-dock")');const priorIds=me().appointments.map(a=>a.id);click('.px-booking-times>button:first-child');click('.px-book-layout>section>.button.primary');run('wait','.px-review-card');shot('booking-review-390');click('.px-book-layout>section>.button.primary');
 check('Booking waits for a stored test reservation','document.querySelector("h1")?.textContent==="Test visit reserved."');const booking=me().appointments.find(a=>!priorIds.includes(a.id));assert.ok(booking);shot('booking-reserved-390');click('.px-booking-result>.button.primary');run('wait','.px-care-appointment');reload();run('wait','.px-care-appointment');assert.ok(me().appointments.some(a=>a.id===booking.id));checks.push({name:'Appointment survives page reload',passed:true});
 enter('other');const other=me();if(!other.relationship.workouts.length)check('Second account has an honest empty plan','document.body.innerText.includes("No plan assigned yet")');assert.equal(other.appointments.some(a=>a.id===booking.id),false);
 assert.equal(evaluate('fetch("/api/physix/v1/sessions/'+attemptPath.split('/').pop()+'").then(r=>r.status)'),403);checks.push({name:'Second browser identity cannot access first patient records',passed:true});
 enter('practitioner');run('wait','.px-care-appointment');check('Practitioner calendar displays the stored visit','document.body.innerText.includes("Physiotherapy")');shot('practitioner-390');click('.px-staff-nav>a:nth-child(2)');run('wait','.row-group .row');click('.row-group .row:first-child');run('wait','.px-section-title');check('Practitioner sees shared patient check-ins','document.body.innerText.includes("Self-reported difficulty")');shot('practitioner-patient-390');
 click('.px-staff-nav>a:nth-child(3)');run('wait','.px-care-form select');run('select','.px-care-form>label:nth-of-type(1) select','30000000-0000-4000-8000-000000000002');const version=evaluate('document.querySelector(".px-care-form>label:nth-of-type(2) option:nth-child(2)").value');run('select','.px-care-form>label:nth-of-type(2) select',version);click('.px-care-form>.button.primary');check('Practitioner assignment is acknowledged','document.querySelector("[role=status]")?.textContent.includes("Plan assigned and saved")');
 enter('other');check('Assigned version appears in the intended patient account','!!document.querySelector(".px-today-card")');assert.ok(me().relationship.workouts.length>=3);checks.push({name:'Assignment persists under the second patient identity',passed:true});
 enter('patient');assert.ok(me().appointments.some(a=>a.id===booking.id));checks.push({name:'Account switching preserves separate saved records',passed:true});
 const routes=[['home','/care'],['plans','/care/programmes'],['progress','/care/progress'],['appointments','/care/appointments'],['check-in','/care/check-ins'],['book','/book'],['completed-session',attemptPath]];
 for(const [width,height] of [[320,740],[390,844],[768,1000],[1440,1000]]){
  run('set','viewport',String(width),String(height));
  for(const [name,route] of routes){navigate(route);wait('!!document.querySelector("h1")&&!document.querySelector("[aria-busy=true]")');
   const dimensions=evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,overlay:!!document.querySelector("[data-nextjs-dialog]")})');assert.ok(dimensions.scroll<=width+1,'Overflow '+route+' '+width);assert.equal(dimensions.overlay,false);wait('[...document.images].every(i=>i.complete&&i.naturalWidth>0)');shot(name+'-'+width);captures.push({route,width,height,...dimensions});save();}
 }
 assert.equal(evaluate('localStorage.length'),0);assert.equal(evaluate('sessionStorage.length'),0);checks.push({name:'No patient data stored in localStorage or sessionStorage',passed:true});
 const errors=run('errors').errors;assert.equal(errors.length,0,'No uncaught browser errors');checks.push({name:'No uncaught browser errors during saved journeys',passed:true});save();console.log('SAVED_BROWSER_PASSED',checks.length,'checks',captures.length,'responsive captures');
}catch(error){save();writeFileSync(resolve(out,'failure.txt'),String(error.stack));console.error(error);process.exitCode=1;}
finally{try{run('network','unroute');}catch{}}
