import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const bin=process.env.AGENT_BROWSER_BIN||'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session=process.env.PHYSIX_BROWSER_SESSION||'physix-home-composition';
const out=resolve(process.env.PHYSIX_EVIDENCE_DIR||'docs/physix/evidence/home-composition-latest');
mkdirSync(out,{recursive:true});
const checks=[],captures=[];
function run(...args){const r=JSON.parse(execFileSync(bin,['--session',session,'--json',...args],{encoding:'utf8',timeout:45000,windowsHide:true}));if(!r.success)throw Error(r.error);return r.data;}
const evaluate=fn=>run('eval','('+fn.toString()+')()').result;
function wait(fn){for(let i=0;i<70;i++){if(evaluate(fn))return;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}throw Error('Timed out: '+fn);}
function pass(name){checks.push({name,passed:true});console.log('PASS',name);}
function home(){run('open','http://127.0.0.1:3217/');run('wait','#home-title');}
function click(s){run('wait',s);run('eval','document.querySelector('+JSON.stringify(s)+').scrollIntoView({block:"center",inline:"nearest",behavior:"instant"})');run('click',s);}
const logout=()=>evaluate(()=>fetch('/api/physix/v1/auth/logout',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}).then(r=>r.status));
try{
 run('set','viewport','390','844');home();assert.equal(run('errors').errors.length,0);
 assert.ok([200,401].includes(logout()));home();
 assert.equal(evaluate(()=>document.querySelector('[data-home-care]').dataset.homeCare),'guest');
 assert.equal(evaluate(()=>document.querySelector('[data-home-care] progress')),null);pass('Guest Home has no invented patient programme or progress');
 assert.equal(evaluate(()=>{const h=document.querySelector('.px-topbar').getBoundingClientRect(),m=document.querySelector('[data-home-masthead]').getBoundingClientRect();return h.top>=m.top&&h.bottom<m.bottom&&document.querySelectorAll('h1').length===1;}),true);pass('Header and single headline belong to one continuous masthead');
 assert.equal(evaluate(()=>document.querySelector('#home-search').getBoundingClientRect().top<innerHeight*.35),true);pass('Search stays inside the first third of the viewport');
 assert.equal(evaluate(()=>document.querySelectorAll('[data-brand-mark] svg').length),1);pass('Brand is vector and live text, not an enlarged logo bitmap');
 assert.equal(evaluate(()=>document.querySelector('[data-home-reference]').dataset.homeReference),'imagegen-20260920');pass('Selected Image Gen reference is explicit in the Home surface');
 assert.equal(evaluate(()=>[...document.images].some(i=>/reference|nike-|gymaf-/.test(i.src))),false);pass('No reference screens or third-party identities are rendered');
 run('set','viewport','320','740');home();
 evaluate(()=>{document.querySelector('[data-home-collection]').focus();return true;});run('press','ArrowRight');wait(()=>document.querySelector('[data-home-collection]').scrollLeft>0);pass('Service rail scrolls with the keyboard');
 evaluate(()=>{document.querySelector('[data-media-tile=mobility]').focus();return true;});wait(()=>document.querySelector('[data-media-tile=mobility]').getBoundingClientRect().right<=innerWidth+1);pass('Keyboard focus reveals the last service');
 click('[data-home-visit=in_clinic] button');run('wait','dialog[open]');assert.equal(evaluate(()=>document.querySelector('dialog').contains(document.activeElement)),true);
 assert.equal(evaluate(()=>document.querySelector('dialog').textContent.includes('Awaiting clinic confirmation')),true);assert.equal(evaluate(()=>document.querySelectorAll('dialog iframe,dialog a[href*="maps"]').length),0);pass('Location sheet contains focus and does not invent an address');
 run('press','Escape');wait(()=>document.activeElement===document.querySelector('[data-home-visit=in_clinic] button'));pass('Location sheet returns focus to its trigger');
 click('[data-home-visit=in_clinic] a');wait(()=>location.pathname==='/book'&&document.querySelectorAll('.px-service-choice').length>0);assert.equal(evaluate(()=>new URLSearchParams(location.search).get('mode')),'in_clinic');pass('Clinic entry opens public booking'); home();click('[data-home-visit=online] button');run('wait','dialog[open]');assert.equal(evaluate(()=>document.querySelector('dialog').textContent.includes('do not create a video meeting')),true);run('press','Escape');
 click('[data-home-visit=online] a');wait(()=>document.querySelectorAll('.px-booking-times button').length>0);assert.equal(evaluate(()=>new URLSearchParams(location.search).get('mode')),'online');pass('Online entry opens times without creating a fake call');
 home();evaluate(()=>{document.querySelector('nav[aria-label="Clinic information"] button').focus();return true;});run('press','Enter');run('wait','dialog[open]');assert.equal(evaluate(()=>document.querySelector('dialog').textContent.includes('Getting started')),true);run('press','Escape');pass('First-visit information opens by keyboard and closes with Escape');
 for(const [width,height] of [[320,740],[390,844],[430,932],[768,1000],[1440,1000]]){
  run('set','viewport',String(width),String(height));home();wait(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  assert.equal(evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.equal(evaluate(()=>document.querySelectorAll('[data-home-collection]>a').length),3);
  const boxes=evaluate(()=>[...document.querySelectorAll('[data-home-visit]')].map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));
  assert.ok(Math.abs(boxes[1].y-boxes[0].y)<1); assert.ok(boxes[1].x>boxes[0].x);
  run('screenshot',resolve(out,'home-'+width+'.png'),'--full');captures.push({width,height});
 }
 pass('Guest layout inspected at five mobile, tablet and desktop sizes');
 run('set','viewport','390','844');run('open','http://127.0.0.1:3217/login');click('.px-account-gate>.button.primary');wait(()=>location.pathname==='/care');home();
 wait(()=>document.querySelector('[data-home-care]')?.dataset.homeCare==='assigned');
 assert.equal(evaluate(()=>Boolean(document.querySelector('[data-home-care]').compareDocumentPosition(document.querySelector('[data-home-collection]')) & Node.DOCUMENT_POSITION_FOLLOWING)),true);pass('Authorized returning care precedes service discovery in DOM order');
 const proof=evaluate(()=>fetch('/api/physix/v1/me').then(r=>r.json()).then(({data})=>{const panel=document.querySelector('[data-home-care]');return {hasActualTitle:data.programmes.some(p=>panel.textContent.includes(p.title)),noCheckInBody:data.relationship.check_ins.filter(c=>c.body).every(c=>!document.body.textContent.includes(c.body)),href:panel.querySelector('a').getAttribute('href')};}));
 assert.equal(proof.hasActualTitle,true);assert.equal(proof.noCheckInBody,true);assert.match(proof.href,/^\/care\/(programmes|workouts|sessions)\//);pass('Returning Home uses the owned plan and excludes check-in contents');
 const response=evaluate(()=>fetch('/',{cache:'no-store'}).then(r=>r.headers.get('cache-control')));assert.match(response,/no-store|no-cache/);assert.doesNotMatch(response,/public|s-maxage/);pass('Personal Home is not shared-cacheable');
 run('screenshot',resolve(out,'home-returning-390.png'),'--full');
 assert.equal(logout(),200);evaluate(()=>{const c=new BroadcastChannel('physix-local-identity');c.postMessage('changed');c.close();return true;});
 wait(()=>document.querySelector('[data-home-care]')?.dataset.homeCare==='guest');assert.equal(evaluate(()=>document.querySelector('[data-home-care] progress')),null);pass('Cross-tab sign-out clears the Home programme before re-rendering');
 assert.equal(evaluate(()=>localStorage.length+sessionStorage.length),0);pass('No private browser storage added');
 assert.equal(run('errors').errors.length,0);pass('No uncaught browser errors');
 writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:true,checks,captures},null,2));console.log('HOME_COMPOSITION_PASSED',checks.length);
}catch(error){writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:false,checks,captures,error:String(error.stack)},null,2));console.error(error);process.exitCode=1;}
