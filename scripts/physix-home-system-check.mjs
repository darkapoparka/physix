import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';

// Deliberately local-only. This suite must not target a live clinic or another browser session.
const base = 'http://127.0.0.1:3217';
const bin = process.env.AGENT_BROWSER_BIN ||
  'C:/Users/radev/AppData/Local/nvm/v24.21.0/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
assert.ok(existsSync(bin), 'Set AGENT_BROWSER_BIN to the installed agent-browser executable');
const session = process.env.PHYSIX_BROWSER_SESSION || 'physix-home-system-check-' + process.pid + '-' + Date.now();
const output = resolve(process.env.PHYSIX_EVIDENCE_DIR ||
  resolve(tmpdir(), 'physix-home-system-check-' + Date.now()));
mkdirSync(output, {recursive: true});
const checks = [], captures = [];
let failure = null;
function run(...args) {
  const response = JSON.parse(execFileSync(bin, ['--session', session, '--json', ...args],
    {encoding: 'utf8', timeout: 45000, windowsHide: true}));
  if (!response.success) throw new Error(response.error);
  return response.data;
}
const evaluate = fn => run('eval', '(' + fn.toString() + ')()').result;
function wait(fn) {
  for (let attempt = 0; attempt < 80; attempt++) {
    if (evaluate(fn)) return;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }
  throw new Error('Timed out: ' + fn);
}
function pass(name) { checks.push(name); console.log('PASS', name); }
function home() {
  run('open', base + '/');
  run('wait', '[data-design-system="physix-v1"]');
}
function noOverflow() {
  return evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
}
try {
  run('set', 'viewport', '390', '844');
  home();
  const logout = evaluate(() => fetch('/api/physix/v1/auth/logout', {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: '{}',
  }).then(response => response.status));
  assert.ok([200, 401].includes(logout));
  home();
  assert.equal(evaluate(() => document.querySelector('[data-home-care]')?.dataset.homeCare), 'guest');
  assert.equal(evaluate(() => document.querySelector('[data-home-care] progress')), null);
  pass('Guest has no fabricated programme progress');
  for (const [width, height] of [[320, 740], [390, 844], [430, 932], [768, 1000], [1440, 1000]]) {
    run('set', 'viewport', String(width), String(height));
    home();
    wait(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
    assert.equal(noOverflow(), true, width + ': horizontal document overflow');
    assert.equal(evaluate(() => document.querySelectorAll('h1').length), 1);
    assert.equal(evaluate(() => document.querySelectorAll('[data-home-collection]>a').length), 3);
    const smallTargets = evaluate(() => [...document.querySelectorAll(
      '.px-topbar a,.px-topbar button,[data-design-system] a,[data-design-system] button'
    )].filter(element => element.getClientRects().length).map(element => {
      const rect = element.getBoundingClientRect();
      return {label: element.getAttribute('aria-label') || element.textContent.trim(), width: rect.width, height: rect.height};
    }).filter(rect => rect.width < 43.5 || rect.height < 43.5));
    assert.deepEqual(smallTargets, [], width + ': undersized Home controls');
    const wrappedActions = evaluate(() => [...document.querySelectorAll('[data-home-masthead] a span')].filter(element => element.getBoundingClientRect().height > parseFloat(getComputedStyle(element).lineHeight) + 1).map(element => element.textContent));
    assert.deepEqual(wrappedActions, [], width + ': primary labels wrap at normal text size');
    assert.ok(evaluate(() => parseFloat(getComputedStyle(document.querySelector('#home-search')).fontSize)) >= 16);
    if (width < 600) {
      assert.equal(evaluate(() => document.querySelector('#home-search').getBoundingClientRect().top < innerHeight * .35), true);
    }
    run('screenshot', resolve(output, 'home-' + width + '.png'), '--full');
    captures.push({width, height, file: 'home-' + width + '.png'});
    pass('Layout, images, type and targets at ' + width);
  }
  run('set', 'viewport', '320', '740');
  home();
  evaluate(() => {document.querySelector('[data-home-collection]').focus(); return true;});
  run('press', 'ArrowRight');
  wait(() => document.querySelector('[data-home-collection]').scrollLeft > 0);
  pass('Service rail is keyboard-scrollable');
  evaluate(() => {document.querySelector('[data-home-visit="in_clinic"] button').scrollIntoView({block: 'center'}); return true;});
  run('click', '[data-home-visit="in_clinic"] button');
  run('wait', 'dialog[open]');
  assert.equal(evaluate(() => document.querySelector('dialog[open]').contains(document.activeElement)), true);
  run('press', 'Escape');
  wait(() => document.activeElement === document.querySelector('[data-home-visit="in_clinic"] button'));
  pass('Visit sheet keeps and restores focus');

  home();
  evaluate(() => {
    const measurements = [...document.querySelectorAll('[data-design-system] *, .px-topbar *')]
      .map(element => [element, parseFloat(getComputedStyle(element).fontSize)]);
    measurements.forEach(([element, size]) => {
      if (element instanceof HTMLElement && Number.isFinite(size)) element.style.fontSize = (size * 2) + 'px';
    });
    return true;
  });
  assert.equal(noOverflow(), true, 'Doubled Home text overflows the document');
  run('screenshot', resolve(output, 'home-text-200-320.png'), '--full');
  pass('Bounded Home text-size stress has no document overflow');

  run('set', 'viewport', '390', '844');
  home();
  evaluate(() => {
    const labels = [...document.querySelectorAll('[data-home-masthead] a span')];
    if (labels[0]) labels[0].textContent = 'Запази час за консултация';
    if (labels[1]) labels[1].textContent = 'Онлайн консултация';
    return true;
  });
  assert.equal(noOverflow(), true, 'Synthetic long labels overflow');
  run('screenshot', resolve(output, 'home-long-label-stress-390.png'), '--full');
  pass('Synthetic long labels reflow; this is not a shipped translation');
  home();
  assert.equal(evaluate(() => localStorage.length + sessionStorage.length), 0);
  assert.equal(run('errors').errors.length, 0);
  pass('No new browser storage or uncaught browser errors');
} catch (error) {
  failure = String(error.stack || error);
  process.exitCode = 1;
  console.error(failure);
} finally {
  writeFileSync(resolve(output, 'home-system-results.json'), JSON.stringify({
    passed: failure === null, checks, captures, failure,
    limitations: ['Not full accessibility certification', 'Inspect captured images manually',
      'Run existing Home/navigation/saved-care suites separately', 'Physical Safari/device testing remains separate'],
  }, null, 2) + '\n');
  try {run('close');} catch (error) {console.error('Own QA session could not close:', String(error));}
  console.log('Evidence:', output);
}
