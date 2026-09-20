import assert from 'node:assert/strict';
import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const read = path => readFileSync(resolve(path), 'utf8');
const css = read('src/styles/physix-tokens.css');
const root = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1];
assert.ok(root, 'Expected the authored :root token block');
const declarations = [...root.matchAll(/^\s*(--[\w-]+):\s*(.+?);\s*$/gm)];
const tokens = new Map(declarations.map(([, key, value]) => [key, value]));
assert.equal(tokens.size, declarations.length, 'Duplicate base token');
const externalFonts = new Set(['--font-native', '--font-season']);

function resolveToken(name, stack = []) {
  if (externalFonts.has(name)) return 'var(' + name + ')';
  assert.ok(tokens.has(name), 'Undefined token: ' + name);
  assert.ok(!stack.includes(name), 'Circular alias: ' + [...stack, name].join(' -> '));
  return tokens.get(name).replace(/var\((--[\w-]+)\)/g, (_, ref) =>
    resolveToken(ref, [...stack, name]));
}
for (const name of tokens.keys()) resolveToken(name);
for (const [, name] of css.matchAll(/var\((--[\w-]+)\)/g)) resolveToken(name);

const migrated = [
  'src/features/physix/home.module.css',
  'src/features/physix/shell.module.css',
];
for (const file of migrated) {
  const source = read(file).replace(/\/\*[\s\S]*?\*\//g, '');
  assert.doesNotMatch(source, /:\s*[^;{}]*#[0-9a-f]{3,8}\b/i,
    file + ': put color values in semantic tokens');
  assert.doesNotMatch(source, /\bfont(?:-size|-weight)?\s*:\s*(?!var\()[^;{}]*\b\d+(?:\.\d+)?px\b/i,
    file + ': use named type roles');
  for (const [, name] of source.matchAll(/var\((--[\w-]+)\)/g)) resolveToken(name);
}

const layout = read('src/app/layout.tsx');
const tokenImport = layout.indexOf("import '../styles/physix-tokens.css'");
const baseImport = layout.indexOf("import './physix.css'");
assert.ok(tokenImport >= 0 && baseImport > tokenImport, 'Import tokens before the global primitives');

// Existing role values are fixtures: migration must not silently restyle saved care/booking.
const baseline = {
  '--canvas': '#ffffff', '--surface': '#f5f7f6', '--forest': '#173f35',
  '--jade': '#24785f', '--mint': '#73d1ad', '--mint-soft': '#d8ecdf',
  '--ink': '#202b26', '--muted': '#626f68', '--line': '#e1e7e3',
  '--error': '#9b3a2a', '--error-bg': '#f8e6de',
};
for (const [name, expected] of Object.entries(baseline)) {
  assert.equal(resolveToken(name).toLowerCase(), expected, name + ': unexpected legacy role change');
}

function luminance(hex) {
  assert.match(hex, /^#[0-9a-f]{6}$/i, 'Contrast fixtures must resolve to opaque sRGB colors');
  const rgb = [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
const pairs = [
  ['--px-color-text', '--px-color-canvas', 4.5],
  ['--px-color-muted', '--px-color-canvas', 4.5],
  ['--px-color-muted', '--px-color-surface', 4.5],
  ['--px-color-action', '--px-color-canvas', 4.5],
  ['--px-color-on-brand', '--px-color-brand', 4.5],
  ['--px-color-on-brand-muted', '--px-color-brand', 4.5],
  ['--px-color-danger', '--px-color-danger-surface', 4.5],
  ['--px-color-focus', '--px-color-canvas', 3],
];
const contrast = pairs.map(([foreground, background, minimum]) => {
  const a = luminance(resolveToken(foreground)), b = luminance(resolveToken(background));
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  assert.ok(ratio >= minimum, foreground + ' on ' + background + ' fails contrast: ' + ratio);
  return {foreground, background, minimum, ratio: Number(ratio.toFixed(3))};
});
assert.doesNotMatch(read('src/features/physix/home-content.ts'), /serviceCandidates\s*\[\s*0\s*\]/,
  'An online default must be named configuration, not catalogue position');
const report = {passed: true, tokens: tokens.size, migrated, legacyRoles: Object.keys(baseline).length, contrast,
  limits: 'Source contract only; photo composites, browser layout and accessibility still need inspection.'};
if (process.env.PHYSIX_EVIDENCE_DIR) {
  mkdirSync(process.env.PHYSIX_EVIDENCE_DIR, {recursive: true});
  writeFileSync(resolve(process.env.PHYSIX_EVIDENCE_DIR, 'design-contract.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify(report, null, 2));
