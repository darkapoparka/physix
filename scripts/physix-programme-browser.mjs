import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const binary=process.env.AGENT_BROWSER_BIN||'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session=process.env.PHYSIX_BROWSER_SESSION||'physix-unified',base='http://127.0.0.1:3217';
const out=resolve(process.env.PHYSIX_EVIDENCE_DIR||'docs/physix/evidence/programmes-latest');mkdirSync(out,{recursive:true});
const checks=[],captures=[];
function run(...args){const raw=execFileSync(binary,['--session',session,'--json',...args],{encoding:'utf8',timeout:35000});const r=JSON.parse(raw);if(!r.success)throw Error(r.error);return r.data;}
const evaluate=js=>run('eval','-b',Buffer.from(js).toString('base64')).result;
function wait(js){for(let i=0;i<70;i++){try{if(evaluate(js))return;}catch{}Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}throw Error('Timed out: '+js);}
const click=s=>{run('wait',s);run('click',s);};
function open(route){run('open',base+route);run('wait','#main');}
function check(name,js){wait(js);checks.push({name,passed:true});console.log('PASS',name);}
const me=()=>evaluate('fetch("/api/physix/v1/me").then(r=>r.json()).then(r=>r.data)');
const shot=name=>run('screenshot',resolve(out,name+'.png'));
try{
 run('network','unroute');run('errors','--clear');run('set','viewport','390','844');
 open('/login');click('.px-account-gate>.button.primary');wait('location.pathname==="/care"&&!!document.querySelector(".px-patient-grid")');
 const before=me(),programme=before.programmes[0];assert.ok(programme);
 check('Today exposes one shared care navigation', 'document.querySelectorAll("nav[aria-label=\\\"Your care views\\\"]").length===1');
 click('nav[aria-label="Your care views"] a[href="/care/programmes"]');
 wait('location.pathname==="/care/programmes"&&document.querySelector("h1")?.textContent==="My programmes"&&!!document.querySelector("input[type=search]")&&[...document.querySelectorAll("a[aria-label]")].some(e=>e.getAttribute("aria-label").startsWith("Open programme:"))');
 assert.equal(evaluate('document.querySelectorAll("a[aria-label^=\\\"Open programme:\\\"]").length'),before.programmes.length);checks.push({name:'One library entry per assignment, not one per workout',passed:true});
 run('fill','input[type=search]','__no_programme_match__');check('Library has a useful no-match state','document.body.innerText.includes("No matching programmes.")');
 click('.px-empty .button');check('Clearing filters restores programme records','!!document.querySelector("a[aria-label^=\\\"Open programme:\\\"]")');
 click('a[aria-label^="Open programme:"]');run('wait','section[aria-label="Programme summary"]');
 assert.ok(evaluate('location.pathname.endsWith('+JSON.stringify(programme.id)+')'));checks.push({name:'Programme detail uses actual assignment ID',passed:true});
 assert.equal(evaluate('document.querySelectorAll(".row-group a[href^=\\\"/care/workouts/\\\"]").length'),programme.scheduledIds.length);checks.push({name:'Programme detail contains its own sessions',passed:true});
 run('reload');run('wait','section[aria-label="Programme summary"]');assert.ok(evaluate('document.querySelector("h1").textContent==='+JSON.stringify(programme.title)));checks.push({name:'Programme deep link survives reload',passed:true});
 click('.row-group a[href^="/care/workouts/"]');run('wait','.px-plan-detail');check('Session overview links back to its programme','document.querySelector(".px-care-heading a").getAttribute("href")==='+JSON.stringify('/care/programmes/'+programme.id));
 open('/care/schedule');run('wait','button[aria-label="Next week"]');
 const week=evaluate('document.querySelector("button[aria-label=\\\"Next week\\\"]").parentElement.parentElement.querySelector("h2").textContent');
 click('button[aria-label="Next week"]');check('Next week updates calendar dates','document.querySelector("button[aria-label=\\\"Next week\\\"]").parentElement.parentElement.querySelector("h2").textContent!=='+JSON.stringify(week));
 click('button[aria-label="Previous week"]');check('Previous week returns to original range','document.querySelector("button[aria-label=\\\"Next week\\\"]").parentElement.parentElement.querySelector("h2").textContent==='+JSON.stringify(week));
 const chosen=before.relationship.workouts[0].scheduled_date;
 const dateName=new Date(chosen+'T12:00:00Z').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'});
 const daySelector='[aria-label^='+JSON.stringify(dateName+',')+']';
 for(let i=0;i<8&&!evaluate('!!document.querySelector('+JSON.stringify(daySelector)+')');i++)click(chosen<new Date().toISOString().slice(0,10)?'button[aria-label="Previous week"]':'button[aria-label="Next week"]');
 click(daySelector);check('Selecting a scheduled day shows its exercise records','document.querySelectorAll("[data-kind=exercise]").length>0');
 open('/care/progress');run('wait','.px-care-stats');
 assert.equal(evaluate('document.querySelectorAll("[aria-label=\\\"Recorded activity\\\"] button").length'),7);checks.push({name:'Seven-day view renders seven actual date buckets',passed:true});
 click('[aria-label="Activity period"] button:last-child');check('28-day activity calendar is interactive','document.querySelectorAll("[aria-label=\\\"Recorded activity\\\"] button").length===28');
 click('[aria-label="Recorded activity"] button:first-child');check('Date selection filters visible history','[...document.querySelectorAll("h2")].some(e=>e.textContent.startsWith("History ·"))');
 run('select','select[aria-label="Programme activity"]',programme.id);check('Programme filter does not fabricate completion','!!document.querySelector(".px-care-stats")&&!document.body.innerText.includes("NaN")');
 const routes=[['home','/'],['today','/care'],['library','/care/programmes'],['programme','/care/programmes/'+programme.id],['session-overview','/care/workouts/'+programme.scheduledIds[0]],['schedule','/care/schedule'],['progress','/care/progress']];
 for(const [width,height] of [[320,740],[390,844],[768,1000],[1440,1000]]){
  run('set','viewport',String(width),String(height));
  for(const [name,route] of routes){open(route);wait('!!document.querySelector("h1")&&!document.querySelector("[aria-busy=true]")');wait('[...document.images].every(i=>i.complete&&i.naturalWidth>0)');
   const geometry=evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth,canvas:getComputedStyle(document.querySelector(location.pathname === "/" ? ".px-main" : ".px-theme")).backgroundColor,errors:!!document.querySelector("[data-nextjs-dialog]")})');assert.ok(geometry.scroll<=width+1,name+' overflow');assert.equal(geometry.errors,false);assert.equal(geometry.canvas,'rgb(255, 255, 255)');shot(name+'-'+width);captures.push({route,width,height,...geometry});
  }
 }
 assert.deepEqual(me().relationship.sessions.map(s=>s.id).sort(),before.relationship.sessions.map(s=>s.id).sort());checks.push({name:'Browsing programme and schedule views never mutates saved attempts',passed:true});
 assert.equal(run('errors').errors.length,0);checks.push({name:'No uncaught browser errors',passed:true});
 writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:true,checks,captures},null,2));console.log('PROGRAMME_BROWSER_PASSED',checks.length,'checks',captures.length,'captures');
}catch(error){writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:false,checks,captures,error:String(error.stack)},null,2));console.error(error);process.exitCode=1;}
