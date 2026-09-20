import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const bin=process.env.AGENT_BROWSER_BIN || 'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session=process.env.PHYSIX_BROWSER_SESSION || 'physix-centre-home-check';
const out=resolve(process.env.PHYSIX_EVIDENCE_DIR || 'docs/physix/evidence/centre-home-latest');
mkdirSync(out,{recursive:true});
const checks=[],captures=[];
function run(...args) {
  const result=JSON.parse(execFileSync(bin,['--session',session,'--json',...args],{encoding:'utf8',timeout:35000,windowsHide:true}));
  if(!result.success)throw Error(result.error);return result.data;
}
const evaluate=fn=>run('eval','-b',Buffer.from('('+fn.toString()+')()').toString('base64')).result;
function wait(fn) {for(let i=0;i<60;i++){if(evaluate(fn))return;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}throw Error('Timed out: '+fn);}
function pass(name) {checks.push({name,passed:true});console.log('PASS',name);}
function openHome(){run('open','http://127.0.0.1:3217/');run('wait','#home-title');}
function click(selector){run('wait',selector);run('click',selector);}
try {
  run('set','viewport','390','844');openHome();assert.equal(run('errors').errors.length,0);
  assert.equal(evaluate(()=>document.querySelectorAll('[data-home-visit]').length),2);
  assert.deepEqual(evaluate(()=>[...document.querySelectorAll('[data-home-visit]')].map(e=>e.dataset.homeVisit)),['in_clinic','online']);
  pass('Two visit options use the same component, with explicit modalities');
  evaluate(()=>{document.querySelector('[data-home-collection]').focus();return true;});run('press','ArrowRight');
  wait(()=>document.querySelector('[data-home-collection]').scrollLeft>0);pass('Horizontal service rail scrolls with the keyboard');
  evaluate(()=>{document.querySelector('[data-care-card=mobility]').focus();return true;});
  wait(()=>document.querySelector('[data-care-card=mobility]').getBoundingClientRect().right<=innerWidth+1);
  pass('Focusing the last service brings it into view');
  click('[data-home-visit=in_clinic] button');run('wait','dialog[open]');
  assert.equal(evaluate(()=>document.querySelector('dialog').contains(document.activeElement)),true);
  assert.equal(evaluate(()=>document.querySelector('dialog').textContent.includes('Awaiting clinic confirmation')),true);
  assert.equal(evaluate(()=>document.querySelectorAll('dialog iframe, dialog a[href*="maps"]').length),0);
  pass('Visit details expose missing location honestly, without a fictional map');
  run('press','Escape');wait(()=>document.activeElement===document.querySelector('[data-home-visit=in_clinic] button'));
  pass('Location sheet closes with Escape and restores trigger focus');
  click('[data-home-visit=in_clinic] a');wait(()=>location.pathname==='/book'&&document.querySelectorAll('.px-service-choice').length>0);
  assert.equal(evaluate(()=>new URLSearchParams(location.search).get('mode')),'in_clinic');
  pass('In-clinic entry opens the existing public booking flow with the correct mode');
  openHome();click('[data-home-visit=online] button');run('wait','dialog[open]');
  assert.equal(evaluate(()=>document.querySelector('dialog').textContent.includes('do not create a video meeting')),true);
  run('press','Escape');wait(()=>!document.querySelector('dialog[open]'));
  click('[data-home-visit=online] a');wait(()=>document.querySelectorAll('.px-booking-times button').length>0);
  assert.equal(evaluate(()=>new URLSearchParams(location.search).get('mode')),'online');
  pass('Online entry opens available test times, not a programme purchase or fake call');
  openHome();evaluate(()=>{document.querySelector('details summary').focus();return true;});run('press','Enter');
  wait(()=>document.querySelector('details').open);pass('First-visit questions work with native keyboard disclosure');
  assert.equal(evaluate(()=>document.querySelector('a[aria-label="Open my programmes"]').getAttribute('href')),'/care/programmes');
  pass('Ongoing care leads directly to the saved programme library');
  for(const [width,height] of [[320,740],[390,844],[768,1000],[1440,1000]]) {
    run('set','viewport',String(width),String(height));openHome();wait(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
    assert.equal(evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
    const layout=evaluate(()=>{const cards=[...document.querySelectorAll('[data-home-visit]')].map(e=>e.getBoundingClientRect());return {stacked:cards[1].top>=cards[0].bottom,aligned:Math.abs(cards[0].top-cards[1].top)<1};});
    assert.equal(width<700?layout.stacked:layout.aligned,true);
    run('screenshot',resolve(out,'home-'+width+'.png'),'--full');captures.push({width,height,...layout});
  }
  pass('Visits stack on mobile and pair on desktop without horizontal page overflow');
  assert.equal(run('errors').errors.length,0);pass('No uncaught browser errors');
  writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:true,checks,captures},null,2));console.log('CENTRE_HOME_PASSED',checks.length);
} catch(error) {writeFileSync(resolve(out,'results.json'),JSON.stringify({passed:false,checks,captures,error:String(error.stack)},null,2));console.error(error);process.exitCode=1;}
