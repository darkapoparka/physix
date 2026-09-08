import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { safeRelative, validateInventory, parseGitlink, localMarkdownLinks, verifyUpstream } from '../../scripts/handoff-lib.mjs';

const sha = 'a'.repeat(40);
const sample = () => ({ schemaVersion: 1, repository: 'darkapoparka/gymaf', url: 'https://github.com/darkapoparka/gymaf.git', path: 'vendor/gymaf', commit: sha, entries: [{ sourcePath: 'src/example.ts', sourceBlob: 'b'.repeat(40), destination: 'src/domain/example.ts', disposition: 'adapt-logic', status: 'planned' }] });

test('accepts safe source paths', () => assert.equal(safeRelative('src/app/[lang]/page.tsx'), true));
test('rejects traversal, absolute, windows and wildcard paths', () => {
  for (const value of ['../x', '/x', 'C:/x', 'a/../b', 'a\\b', 'src/*', '', 'a//b']) assert.equal(safeRelative(value), false, value);
});
test('accepts valid planned inventory', () => assert.equal(validateInventory(sample()).commit, sha));
test('rejects missing or moving commit refs', () => { const data = sample(); data.commit = 'main'; assert.throws(() => validateInventory(data)); });
test('rejects substituted repository URL', () => { const data = sample(); data.url = 'https://example.invalid/repo.git'; assert.throws(() => validateInventory(data)); });
test('rejects duplicate source entries', () => { const data = sample(); data.entries.push({ ...data.entries[0] }); assert.throws(() => validateInventory(data)); });
test('rejects vendor extraction target', () => { const data = sample(); data.entries[0].destination = 'vendor/gymaf/src/x.ts'; assert.throws(() => validateInventory(data)); });
test('requires evidence for adapted code', () => { const data = sample(); data.entries[0].status = 'adapted'; assert.throws(() => validateInventory(data)); data.entries[0].evidence = 'Reviewed test record'; assert.doesNotThrow(() => validateInventory(data)); });
test('parses exact stage-zero gitlink', () => assert.equal(parseGitlink(`160000 ${sha} 0\tvendor/gymaf\n`), sha));
test('rejects regular-file or conflicted gitlink', () => {
  assert.throws(() => parseGitlink(`100644 ${sha} 0\tvendor/gymaf`));
  assert.throws(() => parseGitlink(`160000 ${sha} 2\tvendor/gymaf`));
});
test('finds local doc/image links and skips remote links', () => assert.deepEqual(localMarkdownLinks('[Doc](a.md#x) ![I](images/a.svg) [Web](https://example.com/a) [Here](#heading)'), ['a.md', 'images/a.svg']));
test('ignores fenced examples', () => assert.deepEqual(localMarkdownLinks('```text\n[Fake](missing.md)\n```\n[Real](README.md)'), ['README.md']));
test('verifies metadata using a real local git index; fails safely without checkout', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'physix-handoff-'));
  try {
    const run = args => execFileSync('git', ['-C', root, ...args], { stdio: 'pipe' });
    run(['init', '--quiet']);
    fs.mkdirSync(path.join(root, 'docs/reuse'), { recursive: true });
    fs.writeFileSync(path.join(root, 'docs/reuse/inventory.json'), JSON.stringify(sample()));
    fs.writeFileSync(path.join(root, '.gitmodules'), '[submodule "gymaf"]\npath = vendor/gymaf\nurl = https://github.com/darkapoparka/gymaf.git\nupdate = checkout\n');
    run(['update-index', '--add', '--cacheinfo', `160000,${sha},vendor/gymaf`]);
    assert.equal(verifyUpstream(root).checkoutVerified, false);
    assert.throws(() => verifyUpstream(root, true), /not initialized/);
    run(['update-index', '--cacheinfo', `160000,${'c'.repeat(40)},vendor/gymaf`]);
    assert.throws(() => verifyUpstream(root), /differ/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
