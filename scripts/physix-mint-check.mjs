import {execFileSync} from 'node:child_process';
import {mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const binary = process.env.AGENT_BROWSER_BIN || 'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session = process.env.PHYSIX_BROWSER_SESSION || 'physix-mint';
const base = 'http://127.0.0.1:3217';
const out = resolve(process.env.PHYSIX_EVIDENCE_DIR || 'docs/physix/evidence/mint-refresh-20260919');
mkdirSync(out, {recursive: true});
const checks = [], captures = [];
let createdBooking = null;
function run(...args) {
  const raw = execFileSync(binary, ['--session', session, '--json', ...args], {encoding: 'utf8', timeout: 35000, windowsHide: true});
  const result = JSON.parse(raw.trim());
  if (!result.success) throw Error(result.error);
  return result.data;
}
const evaluate = code => run('eval', '-b', Buffer.from(code).toString('base64')).result;
function wait(code) {
  for (let i = 0; i < 70; i++) { try { if (evaluate(code)) return; } catch {} Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100); }
  throw Error('Timed out: ' + code);
}
function check(name, code) { wait(code); checks.push({name, passed: true}); console.log('PASS', name); }
function click(selector) {
  run('wait', selector);
  // Pointer automation does not reveal a clipped rail card; scroll it into view as a visitor would.
  if (selector.startsWith('[data-media-tile=')) {
    evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({behavior:"instant",block:"center",inline:"center"});true');
    wait('(()=>{const e=document.querySelector('+JSON.stringify(selector)+'),r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1})()');
  }
  run('click', selector);
}
function open(route) { run('open', base + route); run('wait', '#main'); }
function shot(name) { run('screenshot', resolve(out, name + '.png')); }
const me = () => evaluate('fetch("/api/physix/v1/me").then(r=>r.json()).then(r=>r.data)');
function save() { writeFileSync(resolve(out, 'browser-results.json'), JSON.stringify({timestamp: new Date().toISOString(), checks, captures}, null, 2)); }
try {
  run('network', 'unroute'); run('errors', '--clear'); run('set', 'viewport', '390', '844');
  open('/');
  check('Home shows one service collection rather than mixed discovery blocks', 'document.querySelectorAll("[data-home-collection]").length===1&&document.querySelectorAll("[data-home-collection=services]>a").length===3&&[...document.images].every(i=>i.complete&&i.naturalWidth>0)');
  check('Home search is immediately below the short heading', 'document.querySelector("#home-search").getBoundingClientRect().top<innerHeight*.35');
  check('Public capsule dock shows four named destinations', 'document.querySelector(".px-dock").getBoundingClientRect().width===366 && [...document.querySelector(".px-dock").children].every(e=>e.getBoundingClientRect().height===49&&e.getAttribute("aria-label"))');
  check('White canvas has no tinted background gradient', 'getComputedStyle(document.querySelector(".px-theme")).backgroundColor==="rgb(255, 255, 255)"&&getComputedStyle(document.querySelector(".px-theme")).backgroundImage==="none"');
  check('Selected service artwork shares a crop and caption frame', '(()=>{const cards=[...document.querySelectorAll("[data-home-collection]>a")];const r=cards[0].children[0].getBoundingClientRect();return cards.length===3&&cards.every(e=>Math.abs(e.children[0].getBoundingClientRect().width-r.width)<1&&Math.abs(e.children[0].getBoundingClientRect().height-r.height)<1&&getComputedStyle(e.children[1]).backgroundColor==="rgba(0, 0, 0, 0)"&&e.querySelector("img").currentSrc.includes("target-home"))})()');
  check('Search input uses readable 16px type', 'getComputedStyle(document.querySelector("#home-search")).fontSize==="16px"');
  shot('home-390');
  check('No category switch or hidden discovery view remains', '![...document.querySelectorAll("nav")].find(e=>e.getAttribute("aria-label")==="Browse care")&&!document.body.innerText.includes("Find your focus")');
  check("Narrow phones keep readable cards in a swipeable rail", "(()=>{const rail=document.querySelector(\"[data-home-collection]\"),cards=[...rail.children].map(e=>e.getBoundingClientRect());return cards.length===3&&cards.every(c=>Math.abs(c.top-cards[0].top)<1)&&rail.scrollWidth>rail.clientWidth&&cards[0].left>=0&&cards[1].left<innerWidth&&getComputedStyle(rail.querySelector(\"h3\")).fontSize===\"15px\"})()");
  check('Service headings sit under the discovery heading', 'document.querySelectorAll("[data-home-collection] h3").length===3&&document.querySelectorAll("[data-home-collection] h2").length===0');
  for(const [art,service,mode] of [['assessment','physiotherapy','in_clinic'],['sports','sports-rehabilitation','in_clinic'],['mobility','movement','in_clinic']]) {
    open('/'); click('[data-media-tile='+art+']');
    check(art+' card opens its existing booking time picker', 'location.pathname==="/book"&&new URLSearchParams(location.search).get("service")==='+JSON.stringify(service)+'&&(new URLSearchParams(location.search).get("mode")||"in_clinic")==='+JSON.stringify(mode)+'&&document.querySelectorAll(".px-booking-times button").length>0');
    evaluate('history.back();true');check(art+' booking Back returns to the unfiltered Home', 'location.pathname==="/"&&document.querySelectorAll("[data-home-collection]>a").length===3');
  }
  for(const word of ['back','neck']) {open('/');run('fill','#home-search',word);click('button[aria-label="Search services"]');check(word+' remains discoverable without an area picker','location.pathname==="/book"&&document.querySelectorAll(".px-service-choice").length===1');}
  open('/?browse=areas');check('Obsolete area bookmarks do not restore the rejected interface','document.querySelectorAll("[data-home-collection]>a").length===3&&![...document.querySelectorAll("nav")].find(e=>e.getAttribute("aria-label")==="Browse care")');
  const htmlCards=evaluate('fetch("/").then(r=>r.text()).then(html=>new DOMParser().parseFromString(html,"text/html").querySelectorAll("[data-home-collection]>a h3").length)');assert.equal(htmlCards,3);checks.push({name:'Every service is present in server HTML without a filter or scripting',passed:true});
  open('/');evaluate('document.querySelector("[data-media-tile=assessment]").focus();true');run('press','Enter');check('Service cards open with keyboard Enter','location.pathname==="/book"&&!!document.querySelector(".px-booking-times button")');
  open('/');
  run('fill', '#home-search', 'sports');
  check('Dock hides during text entry', 'document.querySelector(".px-dock").hidden');
  click('button[aria-label="Search services"]');
  check('Home search preserves matching service discovery', 'location.pathname==="/book"&&document.querySelectorAll(".px-service-choice").length===1');
  click('.px-service-choice');
  check('A single service tap opens live local times', 'document.querySelector("h1")?.textContent==="Choose a time"&&document.querySelectorAll(".px-booking-times button").length>0');
  check('Time-step heading receives focus; there is no blocking dock', 'document.activeElement===document.querySelector("h1")&&!document.querySelector(".px-dock")');
  evaluate('history.back();true');
  check('Native browser Back returns to service selection', 'document.querySelector("h1")?.textContent==="Book a visit"');
  evaluate('history.forward();true');
  check('Native Forward restores selected service and times', 'document.querySelector("h1")?.textContent==="Choose a time"&&document.querySelectorAll(".px-booking-times button").length>0');
  open('/'); click('[data-media-tile=assessment]');
  check('Home artwork card enters times directly', 'new URLSearchParams(location.search).get("service")==="physiotherapy"&&document.querySelectorAll(".px-booking-times button").length>0');
  click('.px-booking-times button:first-child');
  const picked = evaluate('document.querySelector(".px-booking-times [aria-pressed=true]").textContent.trim()');
  click('.px-book-layout>section>.button.primary');
  check('Review shows selected time and UTC', 'document.querySelector(".px-review-card")?.textContent.includes('+JSON.stringify(picked)+')&&document.querySelector(".px-review-card").textContent.includes("UTC")');
  evaluate('history.back();true');
  check('Back from review keeps the selected slot', 'document.querySelector(".px-booking-times [aria-pressed=true]")?.textContent.trim()==='+JSON.stringify(picked));
  click('.px-book-layout>section>.button.primary');
  wait('!!document.querySelector(".px-review-card")');
  if (evaluate('document.querySelector(".px-book-layout>section>.button.primary")?.textContent.includes("Use local test patient")')) {
    click('.px-book-layout>section>.button.primary');
    check('Local identity entry keeps service and time in review', 'document.querySelector("h1")?.textContent==="Review your visit"&&document.querySelector(".px-book-layout>section>.button.primary")?.textContent.includes("Reserve test visit")');
  }
  const before = me(), beforeIds = before.appointments.map(a=>a.id), sessionsBefore = before.relationship.sessions.map(s=>s.id).sort();
  run('network', 'route', base + '/api/physix/v1/commands', '--abort');
  click('.px-book-layout>section>.button.primary');
  check('Failed reservation stays unconfirmed with a recoverable error', '!!document.querySelector("[role=alert]")&&document.querySelector("h1").textContent==="Review your visit"');
  run('network', 'unroute', base + '/api/physix/v1/commands');
  click('.px-book-layout>section>.button.primary');
  check('Reservation success follows server acknowledgement', 'document.querySelector("h1")?.textContent==="Test visit reserved."');
  createdBooking = me().appointments.find(a=>!beforeIds.includes(a.id))?.id;
  assert.ok(createdBooking, 'Database returns a new stored appointment');
  checks.push({name:'A distinct local appointment is persisted',passed:true});shot('booking-confirmed-390');
  click('.px-booking-result>.button.primary'); wait('location.pathname==="/care/appointments"&&!!document.querySelector(".px-care-appointment")'); run('reload'); run('wait','.px-care-appointment');
  assert.ok(me().appointments.some(a=>a.id===createdBooking));checks.push({name:'New appointment survives page reload',passed:true});
  // Clean up only this run's synthetic appointment; retain its cancellation history.
  const canceled = evaluate('fetch("/api/physix/v1/commands",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"booking.cancel",commandId:crypto.randomUUID(),payload:{id:'+JSON.stringify(createdBooking)+'}})}).then(r=>r.ok)');
  assert.equal(canceled,true);checks.push({name:'Only the newly created test appointment is canceled',passed:true});createdBooking=null;
  open('/care');run('wait','.px-today-card');
  check('Patient capsule matches the public dock and four destinations', 'document.querySelector(".px-dock").getBoundingClientRect().width===366&&document.querySelector(".px-dock").getBoundingClientRect().height===64&&document.querySelectorAll(".px-dock>[aria-label]").length===4');
  click('.px-dock>button');run('wait','dialog[open]');run('press','Escape');
  check('Menu Escape restores focus to icon button', '!document.querySelector("dialog[open]")&&document.activeElement.getAttribute("aria-label")==="Menu"');
  const plan = me().relationship.workouts[0];
  const routes = [['home','/'],['book','/book'],['patient','/care'],['plans','/care/programmes'],['progress','/care/progress'],['plan-detail','/care/workouts/'+plan.id]];
  for (const [width,height] of [[320,740],[390,844],[768,1000],[1440,1000]]) {
    run('set','viewport',String(width),String(height));
    for (const [name,route] of routes) {
      open(route);wait('!!document.querySelector("h1")&&!document.querySelector("[aria-busy=true]")');wait('[...document.images].every(i=>i.complete&&i.naturalWidth>0)');
      const geometry=evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth,heading:document.querySelector("h1").textContent,overlay:!!document.querySelector("[data-nextjs-dialog]")})');
      assert.ok(geometry.scroll<=width+1,'Overflow '+route+' '+width);assert.equal(geometry.overlay,false);shot(name+'-'+width);captures.push({route,width,height,...geometry});
    }
    open('/book?service=physiotherapy&step=time');run('wait','.px-booking-times button');click('.px-booking-times button:first-child');
    assert.ok(evaluate('document.documentElement.scrollWidth<=innerWidth+1'));shot('time-'+width);
    click('.px-book-layout>section>.button.primary');run('wait','.px-review-card');assert.ok(evaluate('document.documentElement.scrollWidth<=innerWidth+1'));shot('review-'+width);
    captures.push({route:'booking time and review',width,height});save();
  }
  assert.deepEqual(me().relationship.sessions.map(s=>s.id).sort(),sessionsBefore);checks.push({name:'Saved workout history was preserved throughout the UI change',passed:true});
  // Bounded computed-font stress, not a claim of real-device text-zoom certification.
  for (const width of [320,390,768]) {
    run('set','viewport',String(width),'844'); open('/');
    evaluate(`(()=>{const nodes=[...document.querySelectorAll('body *')].filter(e=>!e.classList.contains('sr-only')&&([...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())||e.matches('input,textarea')));const values=nodes.map(e=>[e,getComputedStyle(e).fontSize,getComputedStyle(e).lineHeight]);for(const [e,size,line] of values){e.style.fontSize=parseFloat(size)*2+'px';if(line!=='normal')e.style.lineHeight=parseFloat(line)*2+'px';}return true;})()`);
    assert.ok(evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'Enlarged Home text overflow at '+width);
    assert.ok(evaluate(`[...document.querySelectorAll('[data-home-collection]>a')].every(card=>{const copy=card.children[1],r=copy.getBoundingClientRect();return [...copy.querySelectorAll('h3,p')].filter(s=>s.textContent.trim()).every(s=>{const range=document.createRange();range.selectNodeContents(s);return [...range.getClientRects()].every(t=>t.right<=r.right+1&&t.left>=r.left-1);});})`),'Enlarged card labels overlap illustrations at '+width);
    evaluate('window.scrollTo(0,document.querySelector("[data-media-tile]").getBoundingClientRect().top+scrollY-20);true');shot('large-text-'+width);
    checks.push({name:'Home labels reflow with doubled computed text at '+width,passed:true});
  }
  open('/');
  assert.equal(evaluate('localStorage.length+sessionStorage.length'),0);checks.push({name:'No private browser storage introduced',passed:true});
  assert.equal(run('errors').errors.length,0);checks.push({name:'No uncaught browser errors',passed:true});save();console.log('CARE_UI_BROWSER_PASSED',checks.length,'checks',captures.length,'route/viewport records');
} catch(error) { save();writeFileSync(resolve(out,'browser-failure.txt'),String(error.stack));console.error(error);process.exitCode=1; }
finally { try { run('network','unroute'); } catch {} if(createdBooking) console.log('Unfinished test appointment retained for review:',createdBooking); }
