import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdirSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';

const base = 'http://127.0.0.1:3217';
const bin = process.env.AGENT_BROWSER_BIN || 'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session = process.env.PHYSIX_BROWSER_SESSION || 'physix-home-' + Date.now();
const output = resolve(process.env.PHYSIX_EVIDENCE_DIR || resolve(tmpdir(), session));
mkdirSync(output, {recursive: true});
const checks = [], captures = [];
let failure = null;
function run(...args) {
  const response = JSON.parse(execFileSync(bin, ['--session', session, '--json', ...args], {encoding: 'utf8', timeout: 45000, windowsHide: true}));
  if (!response.success) throw new Error(response.error);
  return response.data;
}
const evaluate = fn => run('eval', '-b', Buffer.from('(' + fn.toString() + ')()').toString('base64')).result;
function wait(fn) {
  for (let i = 0; i < 80; i++) {
    if (evaluate(fn)) return;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }
  throw new Error('Timed out: ' + fn);
}
function pass(name) { checks.push(name); console.log('PASS', name); }
function home() { run('open', base + '/'); run('wait', '[data-design-system="physix-v2"]'); }
function click(selector) { run('eval', 'document.querySelector(' + JSON.stringify(selector) + ').scrollIntoView({block:"center",inline:"nearest",behavior:"instant"})'); run('click', selector); }
function capture(name, full = true) { run('screenshot', resolve(output, name + '.png'), ...(full ? ['--full'] : [])); captures.push(name); }
const logout = () => evaluate(() => fetch('/api/physix/v1/auth/logout', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: '{}'}).then(r => r.status));
try {
  home();
  assert.equal(run('errors').errors.length, 0, 'Start with a fresh QA browser');
  assert.ok([200, 401].includes(logout())); home();
  assert.equal(evaluate(() => document.querySelector('[data-home-care]').dataset.homeCare), 'guest');
  assert.equal(evaluate(() => document.querySelector('[data-home-care] progress')), null);
  pass('Guest care has no invented programme or progress');
  assert.equal(evaluate(() => document.querySelectorAll('[data-home-booking]').length), 2);
  assert.equal(evaluate(() => document.querySelectorAll('[data-home-visit]').length), 0);
  assert.equal(evaluate(() => document.querySelectorAll('[data-home-collection] p').length), 0);
  pass('One clinic/online booking pair; no repeated visit cards or filler captions');
  assert.equal(evaluate(() => [...document.querySelectorAll('[data-design-system] *')].some(e => getComputedStyle(e).backgroundImage.includes('gradient'))), false);
  assert.equal(evaluate(() => [...document.images].some(i => decodeURIComponent(i.currentSrc).includes('/target-home/'))), false);
  pass('No image fades, screenshot crops or gradient surfaces on Home');
  for (const [width, height] of [[320,740], [390,844], [430,932], [768,1000], [1440,1000]]) {
    run('set', 'viewport', String(width), String(height)); home();
    wait(() => [...document.images].every(i => i.complete && i.naturalWidth > 0));
    assert.equal(evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, width + ': document overflow');
    assert.equal(evaluate(() => document.querySelectorAll('h1').length), 1);
    assert.equal(evaluate(() => document.querySelectorAll('[data-home-collection]>a').length), 3);
    assert.equal(evaluate(() => document.querySelector('.px-topbar').getBoundingClientRect().bottom <= document.querySelector('[data-home-masthead]').getBoundingClientRect().top + 1), true);
    assert.ok(evaluate(() => parseFloat(getComputedStyle(document.querySelector('#home-search')).fontSize)) >= 16);
    assert.equal(evaluate(() => [...document.querySelectorAll('[data-home-booking] span')].every(e => e.getBoundingClientRect().height <= parseFloat(getComputedStyle(e).lineHeight) + 1)), true, width + ': normal action wraps');
    if (width < 600) assert.equal(evaluate(() => document.querySelector('#home-search').getBoundingClientRect().top < innerHeight * .35), true, width + ': search too low');
    const small = evaluate(() => [...document.querySelectorAll('.px-topbar a,.px-topbar button,[data-design-system] a,[data-design-system] button')].filter(e => e.getClientRects().length).map(e => ({text: e.textContent.trim(), w: e.getBoundingClientRect().width, h: e.getBoundingClientRect().height})).filter(e => e.w < 43.5 || e.h < 43.5));
    assert.deepEqual(small, [], width + ': small touch target');
    capture('home-' + width);
    if (width === 390) capture('home-390-viewport', false);
    pass('Layout, loaded imagery, readable actions and targets at ' + width);
  }
  run('set', 'viewport', '320', '740'); home();
  evaluate(() => { document.querySelector('[data-home-collection]').focus(); return true; });
  run('press', 'ArrowRight'); wait(() => document.querySelector('[data-home-collection]').scrollLeft > 0);
  evaluate(() => { document.querySelector('[data-media-tile=mobility]').focus(); return true; });
  wait(() => document.querySelector('[data-media-tile=mobility]').getBoundingClientRect().right <= innerWidth + 1);
  pass('Keyboard scrolling and focus reveal off-screen services');
  for (const kind of ['in_clinic', 'online']) {
    const selector = '[data-home-info=' + kind + ']'; click(selector); run('wait', 'dialog[open]');
    assert.equal(evaluate(() => document.querySelector('dialog').contains(document.activeElement)), true);
    assert.equal(evaluate(() => document.querySelectorAll('dialog iframe,dialog a[href*="maps"]').length), 0);
    if (kind === 'in_clinic') assert.equal(evaluate(() => document.querySelector('dialog').textContent.includes('Awaiting clinic confirmation')), true);
    else assert.equal(evaluate(() => document.querySelector('dialog').textContent.includes('do not create a video meeting')), true);
    run('press', 'Escape');
    assert.equal(run('eval', 'document.activeElement === document.querySelector(' + JSON.stringify(selector) + ')').result, true);
  }
  pass('Clinic and online information sheets preserve focus and do not invent clinic facts');
  click('nav[aria-label="Clinic information"] button:first-child'); run('wait', 'dialog[open]');
  assert.equal(evaluate(() => document.querySelector('dialog').textContent.includes('Getting started')), true);
  run('press', 'Escape'); pass('First-visit information remains available without repeated booking panels');
  for (const [marker, id] of [['assessment','physiotherapy'], ['sports','sports-rehabilitation'], ['mobility','movement']]) {
    home(); click('[data-media-tile=' + marker + ']');
    wait(() => document.querySelectorAll('.px-booking-times button').length > 0);
    assert.equal(evaluate(() => new URLSearchParams(location.search).get('service')), id);
    run('back'); wait(() => location.pathname === '/' && !!document.querySelector('#home-search'));
  }
  pass('Every service opens its own time picker and browser Back returns Home');
  for (const mode of ['in_clinic', 'online']) {
    home(); click('[data-home-booking=' + mode + ']');
    wait(() => location.pathname === '/book' && document.querySelectorAll('.px-service-choice').length > 0);
    assert.equal(evaluate(() => new URLSearchParams(location.search).get('mode')), mode);
  }
  pass('Both public booking entries retain the selected appointment mode');
  home(); run('fill', '#home-search', 'sports');
  assert.equal(evaluate(() => document.querySelector('.px-dock').hidden), true);
  click('button[aria-label="Search services"]');
  wait(() => location.pathname === '/book' && document.querySelectorAll('.px-service-choice').length === 1);
  pass('Search filters the catalogue and the dock gets out of the way during typing');
  home(); click('[data-home-care] a[href="/plans"]');
  wait(() => location.pathname === '/plans'); pass('Programme discovery is separate from online appointments');
  for (const width of [320, 390, 768]) {
    run('set', 'viewport', String(width), '1000'); home();
    evaluate(() => { document.documentElement.style.fontSize = '200%'; return true; });
    assert.equal(evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, '200% type at ' + width);
    assert.equal(evaluate(() => {
      const card = document.querySelector('[data-home-care]');
      const boundary = card.getBoundingClientRect();
      return [...card.querySelectorAll('h2,p,a span')].every(element => {
        const range = document.createRange(); range.selectNodeContents(element);
        return [...range.getClientRects()].every(rect => rect.left >= boundary.left && rect.right <= boundary.right);
      });
    }), true, 'Large care text escaped its panel at ' + width);
    capture('home-type-200-' + width);
  }
  pass('Layout reflows with doubled root text size at three widths');
  run('set', 'viewport', '390', '844'); home();
  evaluate(() => { const labels = [...document.querySelectorAll('[data-home-booking] span')]; labels[0].textContent = 'Запази час за консултация'; labels[1].textContent = 'Онлайн консултация'; return true; });
  assert.equal(evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
  capture('home-long-labels-390'); pass('Synthetic long labels reflow without shrinking type');
  home(); click('[data-home-care] a[href="/care/programmes"]');
  wait(() => location.pathname === '/login');
  assert.equal(evaluate(() => new URLSearchParams(location.search).get('returnTo')), '/care/programmes');
  click('.px-account-gate>.button.primary');
  wait(() => location.pathname === '/care/programmes'); home();
  wait(() => document.querySelector('[data-home-care]')?.dataset.homeCare === 'assigned');
  const proof = evaluate(() => fetch('/api/physix/v1/me').then(r => r.json()).then(({data}) => {
    const panel = document.querySelector('[data-home-care]');
    return {owned: data.programmes.some(p => panel.textContent.includes(p.title)), privateNotesAbsent: data.relationship.check_ins.filter(c => c.body).every(c => !document.body.textContent.includes(c.body)), href: panel.querySelector('a').getAttribute('href')};
  }));
  assert.equal(proof.owned, true); assert.equal(proof.privateNotesAbsent, true);
  assert.match(proof.href, /^\/care\/(programmes|workouts|sessions)\//);
  assert.equal(evaluate(() => !!(document.querySelector('[data-home-care]').compareDocumentPosition(document.querySelector('[data-home-collection]')) & Node.DOCUMENT_POSITION_FOLLOWING)), true);
  capture('home-returning-390'); pass('Authorized care precedes discovery and links to its real programme or session');
  const cache = evaluate(() => fetch('/', {cache:'no-store'}).then(r => r.headers.get('cache-control')));
  assert.match(cache, /no-store|no-cache/); assert.doesNotMatch(cache, /public|s-maxage/);
  pass('Personal Home is not shared-cacheable and excludes check-in contents');
  assert.equal(logout(), 200);
  evaluate(() => { const channel = new BroadcastChannel('physix-local-identity'); channel.postMessage('changed'); channel.close(); return true; });
  wait(() => document.querySelector('[data-home-care]')?.dataset.homeCare === 'guest');
  assert.equal(evaluate(() => document.querySelector('[data-home-care] progress')), null);
  pass('Cross-tab sign-out clears private care and progress');
  assert.equal(evaluate(() => localStorage.length + sessionStorage.length), 0);
  assert.equal(run('errors').errors.length, 0);
  pass('No private browser storage or uncaught browser errors');
} catch (error) {
  failure = String(error.stack || error);
  process.exitCode = 1;
  console.error(failure);
} finally {
  writeFileSync(resolve(output, 'home-results.json'), JSON.stringify({passed: failure === null, checks, captures, failure,
    limits: ['Local Chromium, not a physical-device certification', 'Synthetic language stress, not shipped localization', 'Real clinic content and providers remain separate']}, null, 2) + '\n');
  try { run('close'); } catch (error) { console.error('Own QA session close failed:', String(error)); }
  console.log('HOME_CHECKS', checks.length, 'Evidence:', output);
}
