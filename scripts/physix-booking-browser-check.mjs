import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const binary = process.env.AGENT_BROWSER_BIN || 'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session = 'physix-work';
const base = 'http://127.0.0.1:3217';
const out = path.resolve('docs/physix/evidence/recovery-20260919');
mkdirSync(out, { recursive: true });
const checks = [], captures = [];
function run(...args) {
  let raw;
  try {
    raw = execFileSync(binary, ['--session', session, '--json', ...args], { encoding: 'utf8', timeout: 45000, windowsHide: true });
  } catch (error) {
    // Windows daemon launch may inherit the pipe after returning valid JSON.
    // Accept only an explicit CLI acknowledgement; absent/failed output still fails.
    if (error.code !== 'ETIMEDOUT' || !error.stdout) throw error;
    raw = error.stdout;
    console.warn('CLI pipe timeout after response:', args[0]);
  }
  const result = JSON.parse(raw.trim());
  if (!result.success) throw new Error(JSON.stringify(result.error));
  return result.data;
}
function evaluate(js) { return run('eval', '-b', Buffer.from(js).toString('base64')).result; }
function check(name, js) {
  let result = false;
  for (let i = 0; i < 45; i++) {
    result = evaluate('(()=>{try{return (' + js + ')}catch{return false}})()');
    if (result === true) break;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }
  assert.equal(result, true, name); checks.push({ name, passed: true }); console.log('PASS', name);
}
function click(selector) { run('wait', selector); run('click', selector); }
function open(route) { run('open', base + route); run('snapshot', '-i'); }
function save() { writeFileSync(path.join(out, 'booking-browser-results.json'), JSON.stringify({ timestamp: new Date().toISOString(), checks, captures }, null, 2)); }
function capture(name, width, height) {
  const state = evaluate('(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));return {route:location.pathname,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>i.naturalWidth===0).map(i=>i.src),heading:document.querySelector("h1")?.textContent}})()');
  assert.ok(state.scrollWidth <= width + 1, 'No horizontal overflow: ' + name + ' ' + width);
  assert.equal(state.broken.length, 0, 'No broken images: ' + name);
  const file = name + '-' + width + '.png'; run('screenshot', path.join(out, file), '--full');
  captures.push({ ...state, width, height, file }); save();
}
try {
  run('console', '--clear'); run('errors', '--clear');
  for (const [width, height] of [[390, 844], [320, 740], [768, 1024], [1440, 1000]]) {
    run('set', 'viewport', String(width), String(height));
    open('/dev/demo/book');
    click('.px-service-choice:first-child'); click('.px-book-summary .button.primary');
    check('Service advances to time at ' + width, 'location.pathname === "/dev/demo/book/time" && document.querySelector("h1")?.textContent === "Choose a time"');
    check('Unavailable time is disabled at ' + width, '[...document.querySelectorAll("button")].find(b=>b.getAttribute("aria-label")==="10:00 UTC, unavailable")?.disabled === true');
    check('Step heading receives focus at ' + width, 'document.activeElement === document.querySelector("h1")');
    click('button[aria-label="09:00 UTC"]'); capture('booking-time', width, height);
    click('main .button.primary.full');
    check('Contact step contains only fixed synthetic data at ' + width, 'location.pathname === "/dev/demo/book/details" && document.querySelector("#preview-email")?.readOnly && document.querySelector("#preview-email").value === "patient@example.test"');
    check('Acknowledgement is required at ' + width, 'document.querySelector("#preview-ack").required && !document.querySelector("#preview-ack").checked');
    run('check', '#preview-ack'); capture('booking-details', width, height); click('form button[type="submit"]');
    check('Review carries full date and explicit timezone at ' + width, 'location.pathname === "/dev/demo/book/review" && document.body.innerText.includes("Monday, 21 September 2026") && document.body.innerText.includes("09:00–09:45 UTC")');
    click('a[href="/dev/demo/book/time"]');
    check('Back/change time preserves original selection at ' + width, '[...document.querySelectorAll("button")].find(b=>b.getAttribute("aria-label")==="09:00 UTC")?.getAttribute("aria-pressed") === "true"');
    click('button[aria-label="11:00 UTC"]'); click('main .button.primary.full');
    check('Changing time requires a fresh acknowledgement at ' + width, 'document.querySelector("#preview-ack")?.checked === false');
    run('check', '#preview-ack'); click('form button[type="submit"]');
    check('Changed time reaches review at ' + width, 'location.pathname === "/dev/demo/book/review" && document.body.innerText.includes("11:00–11:45 UTC")');
    capture('booking-review', width, height); click('main .button.primary.full');
    check('Preview never claims a real reservation at ' + width, 'location.pathname === "/dev/demo/book/complete" && document.body.innerText.includes("No appointment was reserved.")');
    capture('booking-complete', width, height); click('main a[href="/dev/demo"]');
    check('Patient home reflects preview selection at ' + width, 'document.querySelector("[data-preview-appointment]")?.textContent.includes("11:00 UTC") && document.querySelector("[data-preview-appointment]").textContent.includes("not reserved")');
    capture('patient-with-booking-preview', width, height);
    check('No provider mutation or browser persistence at ' + width, 'localStorage.length === 0 && sessionStorage.length === 0 && !performance.getEntriesByType("resource").some(r => r.name.includes("/api/"))');
  }
  run('set', 'viewport', '390', '844');
  click('.px-dock button'); click('dialog a[href="/dev/demo/plans"]');
  check('Menu link navigation closes its sheet', '!document.querySelector("dialog[open]") && location.pathname === "/dev/demo/plans"');
  click('.px-today-card'); click('.px-plan-detail .button.primary');
  click('.px-exercise-panel > .button.primary');
  click('button[aria-label="Leave session"]'); click('dialog .button.primary');
  click('.px-dock a[href="/dev/demo/book"]');
  check('Patient Book remains inside the memory-scoped demo', 'location.pathname === "/dev/demo/book"');
  click('.px-dock a[href="/dev/demo/plans"]'); click('.px-today-card'); click('.px-plan-detail .button.primary');
  check('Exercise activity survives navigating through Book', 'document.querySelector("[role=progressbar]")?.getAttribute("aria-valuenow") === "1"');
  click('button[aria-label="Leave session"]'); click('dialog .button.primary');
  open('/dev/demo/book/review');
  check('Reloaded deep link cannot imply a stored booking', 'document.querySelector("h1")?.textContent === "Start with a service."');
  const errors = run('errors').errors; assert.equal(errors.length, 0, 'No uncaught browser errors');
  checks.push({ name: 'No uncaught browser errors', passed: true });
  writeFileSync(path.join(out, 'booking-console.json'), JSON.stringify(run('console'), null, 2));
  save(); console.log('BOOKING_BROWSER_PASSED', checks.length, 'checks', captures.length, 'captures');
} catch (error) {
  save(); writeFileSync(path.join(out, 'booking-browser-failure.txt'), String(error.stack)); console.error(error); process.exitCode = 1;
} finally { try { run('close'); } catch {} }
