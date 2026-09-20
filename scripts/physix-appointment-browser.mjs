import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const bin=process.env.AGENT_BROWSER_BIN||'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session=process.env.PHYSIX_BROWSER_SESSION||'physix-appointments-'+Date.now(),base='http://127.0.0.1:3217';
const out=resolve(process.env.PHYSIX_EVIDENCE_DIR||'docs/physix/evidence/appointments-latest');mkdirSync(out,{recursive:true});
const checks=[],captures=[];let created=null;
function run(...args){const r=JSON.parse(execFileSync(bin,['--session',session,'--json',...args],{encoding:'utf8',timeout:45000,windowsHide:true}));if(!r.success)throw Error(r.error);return r.data;}
const evaluate=code=>run('eval','-b',Buffer.from(code).toString('base64')).result;
function wait(code){for(let i=0;i<70;i++){if(evaluate(code))return;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}throw Error('Timeout: '+code);}
function pass(name){checks.push({name,passed:true});console.log('PASS',name);}
function open(route){run('open',base+route);run('wait','#main');}
function click(selector){run('wait',selector);evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"center",inline:"nearest",behavior:"instant"});true');run('click',selector);}
const me=()=>evaluate('fetch("/api/physix/v1/me",{cache:"no-store"}).then(r=>r.json()).then(r=>r.data)');
const shot=name=>run('screenshot',resolve(out,name+'.png'));
const dock=()=>evaluate('[...document.querySelectorAll(".px-dock>*")].map(e=>({label:e.getAttribute("aria-label"),href:e.getAttribute("href"),x:e.getBoundingClientRect().x,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))');
try{
 run('set','viewport','390','844');open('/');assert.equal(run('errors').errors.length,0);
 const logout=evaluate('fetch("/api/physix/v1/auth/logout",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"}).then(r=>r.status)');assert.ok([200,401].includes(logout));open('/');const originalDock=dock();
 assert.equal(evaluate('document.querySelector(".px-topbar").checkVisibility()'),true);
 open('/book');run('wait','.px-service-choice');assert.equal(evaluate('document.querySelector(".px-topbar").checkVisibility()'),false);
 assert.equal(evaluate('document.querySelectorAll("h1").length'),1);assert.deepEqual(dock(),originalDock);pass('Book has one contextual header and the same bottom destinations as Home');shot('book-390');
 click('[data-context-header] a[href="/care/appointments"]');wait('location.pathname==="/login"');assert.equal(evaluate('new URLSearchParams(location.search).get("returnTo")'),'/care/appointments');
 click('.px-account-gate>.button.primary');wait('location.pathname==="/care/appointments"');pass('My visits signs in directly to appointments, without a dashboard detour');
 const before=me(),ids=before.appointments.map(a=>a.id);
 open('/book');run('wait','.px-service-choice');click('.px-service-choice:first-child');run('wait','.px-booking-times button');
 assert.equal(evaluate('document.querySelector("[data-booking-next]").disabled'),true);click('.px-booking-times button:first-child');
 const picked=evaluate('document.querySelector(".px-booking-times [aria-pressed=true]").textContent.trim()');
 assert.equal(evaluate('document.querySelector("[data-booking-footer]").textContent.includes('+JSON.stringify(picked)+')'),true);pass('Selected time is visible beside the only primary booking action');shot('choose-time-390');
 click('button[aria-label="Close booking"]');run('wait','dialog[open]');click('dialog .button.primary');wait('!document.querySelector("dialog[open]")');
 assert.equal(evaluate('document.querySelector(".px-booking-times [aria-pressed=true]").textContent.trim()'),picked);pass('Keep booking preserves the chosen time');
 click('[data-booking-next]');run('wait','.px-review-card');shot('review-390');evaluate('history.back();true');wait('!!document.querySelector(".px-booking-times [aria-pressed=true]")');
 assert.equal(evaluate('document.querySelector(".px-booking-times [aria-pressed=true]").textContent.trim()'),picked);pass('Browser Back preserves the selected time');
 click('[data-booking-next]');run('wait','.px-review-card');run('network','route',base+'/api/physix/v1/commands','--abort');click('[data-booking-next]');wait('!!document.querySelector("[role=alert]")');
 assert.equal(evaluate('location.pathname'),'/book');assert.equal(me().appointments.length,ids.length);pass('Failed reservation never produces a confirmation or a record');
 run('network','unroute',base+'/api/physix/v1/commands');click('[data-booking-next]');wait('!!document.querySelector("[data-appointment-detail]")');
 created=evaluate('document.querySelector("[data-appointment-detail]").dataset.appointmentId');assert.ok(!ids.includes(created));assert.equal(evaluate('document.querySelector("h1").textContent'),'Test visit reserved.');
 const detail='/care/appointments/'+created;assert.equal(evaluate('location.pathname'),detail);run('reload');run('wait','[data-appointment-detail]');assert.equal(evaluate('document.querySelector("[data-appointment-detail]").dataset.appointmentId'),created);pass('Confirmation is an authorized saved detail route that survives reload');
 open(detail);run('wait','[data-cancel-appointment]');shot('appointment-390');assert.deepEqual(dock(),originalDock);
 // Inspect the calendar payload without writing a file to the user's Downloads folder.
 evaluate('window.__calendarText=null;window.__createUrl=URL.createObjectURL;URL.createObjectURL=function(blob){window.__calendarText=blob.text();return window.__createUrl.call(URL,blob)};window.__anchorClick=HTMLAnchorElement.prototype.click;HTMLAnchorElement.prototype.click=function(){if(!this.download)return window.__anchorClick.call(this)};true');
 click('[aria-label="Appointment actions"] .button.primary');const calendar=evaluate('window.__calendarText');assert.match(calendar,/BEGIN:VCALENDAR/);assert.doesNotMatch(calendar,/patient_id|Sample physiotherapy/);pass('Calendar control produces a minimal local reminder file');
 evaluate('URL.createObjectURL=window.__createUrl;HTMLAnchorElement.prototype.click=window.__anchorClick;true');
 click('[data-cancel-appointment]');run('wait','dialog[open]');assert.equal(evaluate('document.activeElement.textContent'),'Keep appointment');shot('cancel-review-390');run('press','Escape');wait('!document.querySelector("dialog[open]")');
 assert.equal(evaluate('document.activeElement.hasAttribute("data-cancel-appointment")'),true);assert.equal(me().appointments.find(a=>a.id===created).state,'confirmed');pass('Cancellation defaults to Keep; Escape restores focus without cancelling');
 evaluate('window.__fetch=window.fetch;window.__holdCancel=true;window.__cancelIds=[];window.fetch=async function(input,options){if(typeof input==="string"&&input.endsWith("/commands")&&options?.body){const body=JSON.parse(options.body);if(body.action==="booking.cancel"){window.__cancelIds.push(body.commandId);if(window.__holdCancel)await new Promise(resolve=>window.__releaseCancel=resolve)}}return window.__fetch(input,options)};true');
 click('[data-cancel-appointment]');run('wait','dialog[open]');run('network','route',base+'/api/physix/v1/commands','--abort');click('[data-confirm-cancel]');wait('typeof window.__releaseCancel==="function"');
 assert.equal(evaluate('document.querySelector("[data-confirm-cancel]").disabled'),true);run('press','Escape');assert.equal(evaluate('!!document.querySelector("dialog[open]")'),true);pass('Pending cancellation cannot be submitted twice or dismissed accidentally');
 evaluate('window.__holdCancel=false;window.__releaseCancel();true');wait('!!document.querySelector("dialog [role=alert]")');assert.equal(me().appointments.find(a=>a.id===created).state,'confirmed');pass('Failed cancellation keeps the reservation and offers retry');shot('cancel-error-390');
 run('network','unroute',base+'/api/physix/v1/commands');click('[data-confirm-cancel]');wait('!!document.querySelector("[data-appointment-detail] [data-state=cancelled]")');
 assert.equal(evaluate('new Set(window.__cancelIds).size'),1);evaluate('window.fetch=window.__fetch;true');assert.equal(me().appointments.find(a=>a.id===created).state,'cancelled');
 run('reload');run('wait','[data-appointment-detail]');assert.equal(evaluate('!!document.querySelector("[data-cancel-appointment]")'),false);pass('Retry uses one command identity; saved cancellation survives reload');shot('cancelled-390');
 open('/care/appointments?view=cancelled');run('wait','[aria-label="Appointment views"]');assert.equal(evaluate('[...document.querySelectorAll("[data-appointment-id]")].filter(e=>e.dataset.appointmentId==='+JSON.stringify(created)+').length'),1);
 click('[aria-label="Appointment views"] button:first-child');wait('new URLSearchParams(location.search).get("view")==="upcoming"');assert.equal(evaluate('[...document.querySelectorAll("[data-appointment-id]")].some(e=>e.dataset.appointmentId==='+JSON.stringify(created)+')'),false);
 evaluate('history.back();true');wait('new URLSearchParams(location.search).get("view")==="cancelled"');pass('Upcoming and cancelled records are separated; filter history works');
 open(detail);run('wait','[data-appointment-detail]');click('[aria-label="Appointment actions"] a.button.primary');wait('!!document.querySelector(".px-booking-times")');assert.equal(evaluate('new URLSearchParams(location.search).get("mode")'),'in_clinic');pass('Book again keeps the service and mode, not the old time');
 open('/');wait('!!document.querySelector("#home-title")');assert.equal(evaluate('[...document.querySelectorAll("[data-home-appointment] [data-appointment-id]")].some(e=>e.dataset.appointmentId==='+JSON.stringify(created)+')'),false);pass('Home no longer advertises the cancelled appointment');
 open('/login');click('.px-account-gate>button:nth-of-type(3)');wait('location.pathname==="/care"');
 const denied=evaluate('fetch('+JSON.stringify(detail)+',{cache:"no-store"}).then(async r=>({status:r.status,html:await r.text()}))');assert.equal(denied.status,404);assert.equal(denied.html.includes('data-appointment-detail'),false);
 const forbidden=evaluate('fetch("/api/physix/v1/commands",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"booking.cancel",commandId:crypto.randomUUID(),payload:{id:'+JSON.stringify(created)+'}})}).then(r=>r.status)');assert.equal(forbidden,403);pass('Another patient cannot view or cancel the appointment by changing its ID');
 open('/login');click('.px-account-gate>.button.primary');wait('location.pathname==="/care"');
 const routes=[['book','/book'],['appointments','/care/appointments'],['detail',detail],['today','/care'],['programmes','/care/programmes']];
 for(const [width,height] of [[320,740],[390,844],[430,932],[768,1000],[1440,1000]]){
   run('set','viewport',String(width),String(height));
   for(const [name,route] of routes){open(route);wait('!!document.querySelector("h1")&&!document.querySelector("[aria-busy=true]")');
     wait('[...document.images].every(i=>i.complete&&i.naturalWidth>0)');assert.ok(evaluate('document.documentElement.scrollWidth<=innerWidth+1'),name+' overflow '+width);
     assert.equal(evaluate('document.querySelectorAll("h1").length'),1);assert.equal(evaluate('document.querySelector(".px-topbar").checkVisibility()'),width>=1000);
     if(name==='appointments')assert.ok(evaluate('(()=>{const h=document.querySelector("h1");return h.getBoundingClientRect().height<=parseFloat(getComputedStyle(h).lineHeight)+2})()'),'Appointment title wraps at normal text size '+width);
     shot(name+'-'+width);captures.push({route,width,height});
   }
 }
 pass('Contextual mobile headers, desktop navigation and appointment layouts checked at five widths');
 run('set','viewport','320','740');open('/care/appointments');
 evaluate('(()=>{const nodes=[...document.querySelectorAll("main *")].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()));const sizes=nodes.map(e=>[e,getComputedStyle(e).fontSize]);for(const [e,size] of sizes)e.style.fontSize=parseFloat(size)*2+"px";return true;})()');
 assert.ok(evaluate('document.documentElement.scrollWidth<=innerWidth+1'));shot('appointments-large-text');pass('Appointment list reflows with doubled computed text at 320px');
 assert.equal(evaluate('localStorage.length+sessionStorage.length'),0);assert.equal(run('errors').errors.length,0);pass('No private browser storage or uncaught browser errors introduced');
 writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:true,checks,captures,createdAndCancelled:created},null,2));console.log('APPOINTMENT_BROWSER_PASSED',checks.length);created=null;
}catch(error){writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:false,checks,captures,error:String(error.stack)},null,2));console.error(error);process.exitCode=1;}
finally{try{run('network','unroute');}catch{}if(created)console.log('Review this run\'s synthetic appointment:',created);}
