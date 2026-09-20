import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const bin=process.env.AGENT_BROWSER_BIN||'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session=process.env.PHYSIX_BROWSER_SESSION||'physix-navigation-check';
const base='http://127.0.0.1:3217';
const out=resolve(process.env.PHYSIX_EVIDENCE_DIR||'docs/physix/evidence/navigation-latest');
mkdirSync(out,{recursive:true});
const checks=[],captures=[];
function run(...args){const r=JSON.parse(execFileSync(bin,['--session',session,'--json',...args],{encoding:'utf8',timeout:60000,windowsHide:true}));if(!r.success)throw Error(r.error);return r.data;}
const evaluate=js=>run('eval','-b',Buffer.from(js).toString('base64')).result;
function wait(js){for(let i=0;i<70;i++){if(evaluate(js))return;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}throw Error('Timed out: '+js);}
function check(name,js){wait(js);checks.push({name,passed:true});console.log('PASS',name);}
function click(selector){run('wait',selector);run('click',selector);}
function open(route){run('open',base+route);run('wait','#main');}
const me=()=>evaluate('fetch("/api/physix/v1/me").then(r=>r.json()).then(r=>r.data)');
function contract(){return evaluate('({items:[...document.querySelectorAll(".px-dock > *")].map(e=>({label:e.getAttribute("aria-label"),href:e.getAttribute("href"),x:e.getBoundingClientRect().x,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})),logo:document.querySelector(".px-brand").getAttribute("href"),account:document.querySelector(".px-account").getAttribute("href")})');}
const snapshot=name=>run('screenshot',resolve(out,name+'.png'));
try{
 run('network','unroute');run('errors','--clear');run('set','viewport','390','844');open('/');assert.equal(run('errors').errors.length,0,'Begin with a fresh browser error buffer');
 await evaluate('fetch("/api/physix/v1/auth/logout",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"}).then(r=>r.status)');
 open('/');
 const home=contract();assert.deepEqual(home.items.map(x=>[x.label,x.href]),[['Home','/'],['Book','/book'],['My care','/care'],['Menu',null]]);
 checks.push({name:'Public dock has the four fixed destinations',passed:true});
 assert.equal(evaluate('[...document.links].find(a=>a.getAttribute("aria-label")==="Open my programmes")?.getAttribute("href")'),'/care/programmes');checks.push({name:'Home programme entry targets the library directly',passed:true});
 click('.px-dock a[href="/book"]');check('Booking is public and reachable without sign-in','location.pathname==="/book"&&document.querySelectorAll(".px-service-choice").length>0');assert.deepEqual(contract(),home);
 click('.px-dock a[href="/care"]');check('My care requires sign-in without changing the dock','location.pathname==="/login"&&new URLSearchParams(location.search).get("returnTo")==="/care"');assert.deepEqual(contract(),home);
 click('.px-account-gate>.button.primary');check('Sign-in returns to My care','location.pathname==="/care"&&!!document.querySelector(".px-patient-grid")');assert.deepEqual(contract(),home);
 const before=me(),programme=before.programmes[0];assert.ok(programme);
 const initial = evaluate("fetch(\"/care/programmes\",{cache:\"no-store\"}).then(async r=>({html:await r.text(),cache:r.headers.get(\"cache-control\")})).then(r=>{const doc=new DOMParser().parseFromString(r.html,\"text/html\");return {heading:doc.querySelector(\"h1\")?.textContent,count:[...doc.links].filter(e=>e.getAttribute(\"aria-label\")?.startsWith(\"Open programme:\")).length,cache:r.cache,loading:doc.querySelector(\"main\")?.textContent.includes(\"Loading your care\")}})");
 assert.equal(initial.heading,'My programmes');assert.equal(initial.count,before.programmes.length);assert.equal(initial.loading,false);assert.match(initial.cache||'',/no-cache|no-store/);assert.doesNotMatch(initial.cache||'',/public|s-maxage/);checks.push({name:'Authorized care renders immediately; development response requires revalidation',passed:true});
 for(const route of ['/care/programmes','/care/schedule','/care/progress','/care/profile','/care/appointments','/plans','/']){
  open(route);wait('location.pathname==='+JSON.stringify(route)+'&&!document.querySelector("[aria-busy=true]")');assert.deepEqual(contract(),home,route);
  assert.equal(evaluate('[...document.links].filter(a=>a.getAttribute("href")?.startsWith("/app")).length'),0,'No old app links '+route);
  checks.push({name:'Stable dock, logo and account destination at '+route,passed:true});
 }
 open('/care/programmes');click('.px-dock a[href="/"]');check('Home always returns to public Home, not Today','location.pathname==="/"&&!!document.querySelector("#home-search")');
 click('.px-dock button');run('wait','dialog[open]');const menu=evaluate('[...document.querySelectorAll("dialog a")].map(a=>a.getAttribute("href"))');assert.equal(new Set(menu).size,menu.length);
 run('press','Escape');check('Menu closes and returns keyboard focus','!document.querySelector("dialog[open]")&&document.activeElement.getAttribute("aria-label")==="Menu"');
 open('/care/profile');click('.px-account-gate>button');check('Sign-out revokes this test session','location.pathname==="/login"');assert.equal(evaluate('fetch("/api/physix/v1/me").then(r=>r.status)'),401);
 const signedOutHtml = evaluate('fetch("/care/programmes",{cache:"no-store"}).then(async r=>({url:r.url,html:await r.text()}))');
 assert.ok(new URL(signedOutHtml.url).pathname==='/login');assert.equal(signedOutHtml.html.includes(programme.title),false);checks.push({name:'Signed-out requests cannot receive the private initial programme snapshot',passed:true});
 open('/app/plans/'+programme.id);check('Legacy bookmark preserves its intended programme through sign-in','location.pathname==="/login"&&new URLSearchParams(location.search).get("returnTo")==='+JSON.stringify('/care/programmes/'+programme.id));
 click('.px-account-gate>.button.primary');check('Programme deep link resumes after sign-in','location.pathname==='+JSON.stringify('/care/programmes/'+programme.id)+'&&!!document.querySelector("progress")');
 assert.equal(evaluate('document.querySelectorAll("h1").length'),1);assert.deepEqual(contract(),home);
 click('.row-group a[href^="/care/workouts/"]');check('Session overview retains primary navigation','location.pathname.startsWith("/care/workouts/")&&!!document.querySelector(".px-plan-detail")');assert.deepEqual(contract(),home);
 const routes=[['home','/'],['book','/book'],['today','/care'],['programmes','/care/programmes'],['programme','/care/programmes/'+programme.id],['schedule','/care/schedule'],['progress','/care/progress']];
 for(const [width,height] of [[320,740],[390,844],[768,1000],[1440,1000]]){
  run('set','viewport',String(width),String(height));let geometry;
  for(const [name,route] of routes){open(route);wait('!!document.querySelector("h1")&&!document.querySelector("[aria-busy=true]")');wait('[...document.images].every(i=>i.complete&&i.naturalWidth>0)');
   assert.ok(evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'Overflow '+route+' at '+width);
   if(width<1000){const current=contract();if(!geometry)geometry=current;assert.deepEqual(current,geometry,'Navigation moved at '+route);}
   else {assert.equal(evaluate('getComputedStyle(document.querySelector(".px-dock")).display'),'none');assert.deepEqual(evaluate('[...document.querySelectorAll(".px-desktop-nav>a")].map(e=>e.getAttribute("href"))'),['/','/book','/care']);}
   snapshot(name+'-'+width);captures.push({route,width,height});
  }
 }
 assert.deepEqual(me().relationship.sessions.map(x=>x.id).sort(),before.relationship.sessions.map(x=>x.id).sort());
 checks.push({name:'Navigation and sign-in preserve saved workout attempts',passed:true});
 assert.equal(evaluate('localStorage.length+sessionStorage.length'),0);checks.push({name:'No private browser storage introduced',passed:true});
 assert.equal(run('errors').errors.length,0);checks.push({name:'No uncaught browser errors',passed:true});
 writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:true,checks,captures},null,2));console.log('NAVIGATION_BROWSER_PASSED',checks.length,checks.length+' checks;',captures.length+' captures');
}catch(error){writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:false,checks,captures,error:String(error.stack)},null,2));console.error(error);process.exitCode=1;}
