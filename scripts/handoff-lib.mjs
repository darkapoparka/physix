import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

export function git(root, args) {
  return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}
export function safeRelative(value) {
  return typeof value === 'string' && value.length > 0 &&
    !/[\\\x00-\x1f:*?]/.test(value) && !value.startsWith('/') &&
    !value.startsWith('~') && value.split('/').every(s => s && s !== '.' && s !== '..');
}
export function validateInventory(data) {
  if (data?.schemaVersion !== 1 || data.repository !== 'darkapoparka/gymaf' ||
      data.url !== 'https://github.com/darkapoparka/gymaf.git' || data.path !== 'vendor/gymaf' ||
      !/^[a-f0-9]{40}$/.test(data.commit ?? '') || !Array.isArray(data.entries) || !data.entries.length) {
    throw new Error('Invalid upstream inventory metadata.');
  }
  const seen = new Set();
  for (const entry of data.entries) {
    if (!safeRelative(entry.sourcePath) || seen.has(entry.sourcePath) ||
        !/^[a-f0-9]{40}$/.test(entry.sourceBlob ?? '') ||
        !['adapt-ui', 'adapt-logic', 'reference-only', 'excluded'].includes(entry.disposition) ||
        !['planned', 'adapted', 'rejected'].includes(entry.status)) throw new Error('Invalid or duplicate inventory entry.');
    seen.add(entry.sourcePath);
    if (entry.destination !== null && (!safeRelative(entry.destination) || !entry.destination.startsWith('src/'))) {
      throw new Error('Extraction destination must be a safe PhysiX src/ path.');
    }
    if (entry.status === 'adapted' && (!entry.destination || typeof entry.evidence !== 'string' || !entry.evidence.trim())) {
      throw new Error('Adapted entries require an owned destination and evidence.');
    }
  }
  return data;
}
export function parseGitlink(text) {
  const match = /^160000 ([a-f0-9]{40}) 0\tvendor\/gymaf$/.exec(text.trim());
  if (!match) throw new Error('Expected one stage-0 vendor/gymaf Git submodule entry.');
  return match[1];
}
export function verifyUpstream(root, requireCheckout = false) {
  const data = validateInventory(JSON.parse(fs.readFileSync(path.join(root, 'docs/reuse/inventory.json'), 'utf8')));
  for (const [key, expected] of [['path', data.path], ['url', data.url], ['update', 'checkout']]) {
    const actual = git(root, ['config', '--file', '.gitmodules', '--get', `submodule.gymaf.${key}`]);
    if (actual !== expected) throw new Error(`Unexpected submodule ${key}.`);
  }
  if (parseGitlink(git(root, ['ls-files', '--stage', '--', data.path])) !== data.commit) throw new Error('Gitlink and inventory commit differ.');
  if (!requireCheckout) return { commit: data.commit, entries: data.entries.length, checkoutVerified: false };
  const upstream = path.join(root, data.path);
  if (!fs.existsSync(path.join(upstream, '.git'))) throw new Error('Submodule is not initialized. Run the documented submodule update first.');
  const actualRoot = fs.realpathSync(git(upstream, ['rev-parse', '--show-toplevel']));
  if (actualRoot !== fs.realpathSync(upstream)) throw new Error('Unexpected upstream repository root.');
  if (git(upstream, ['rev-parse', 'HEAD']) !== data.commit) throw new Error('Upstream HEAD differs from the recorded pin; preserve changes and review.');
  if (git(upstream, ['status', '--porcelain', '--untracked-files=normal'])) throw new Error('Upstream checkout has changes; do not reset or overwrite them.');
  for (const entry of data.entries) {
    const filename = path.join(upstream, entry.sourcePath);
    const resolved = fs.realpathSync(filename);
    const relative = path.relative(actualRoot, resolved);
    if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.lstatSync(filename).isFile()) throw new Error(`Unsafe source path: ${entry.sourcePath}`);
    if (git(upstream, ['rev-parse', `HEAD:${entry.sourcePath}`]) !== entry.sourceBlob) throw new Error(`Source blob mismatch: ${entry.sourcePath}`);
  }
  return { commit: data.commit, entries: data.entries.length, checkoutVerified: true };
}
export function localMarkdownLinks(text) {
  let fence = null;
  const prose = text.split(/\r?\n/).filter(line => {
    const opening = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
    if (opening) {
      if (!fence) fence = opening[1];
      else if (opening[1][0] === fence[0] && opening[1].length >= fence.length) fence = null;
      return false;
    }
    return fence === null;
  }).join('\n');
  const links = [];
  for (const match of prose.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) continue;
    const local = target.split(/[?#]/)[0];
    if (local) links.push(decodeURIComponent(local));
  }
  return links;
}
export function verifyDocs(root) {
  const files = git(root, ['ls-files', '-z']).split('\0').filter(Boolean);
  const docs = files.filter(f => f.endsWith('.md') && !f.startsWith('vendor/gymaf/'));
  const errors = [];
  for (const file of docs) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    for (const target of localMarkdownLinks(text)) {
      const absolute = path.resolve(path.dirname(path.join(root, file)), target);
      const relative = path.relative(root, absolute);
      if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(absolute)) errors.push(`${file}: missing/unsafe link ${target}`);
    }
  }
  const active = ['bootstrap', 'architecture', 'auth-security', 'integrations', 'components', 'testing', 'tasks', 'handoff', 'prd', 'versions'];
  const obsolete = /SvelteKit|sv@latest|svelte-check|Bits UI|\bPUBLIC_SUPABASE_/;
  for (const name of active) {
    const file = `docs/${name}.md`;
    if (obsolete.test(fs.readFileSync(path.join(root, file), 'utf8'))) errors.push(`${file}: obsolete active framework instruction`);
  }
  for (const file of files.filter(f => /^src\/.*\.(?:[cm]?[jt]sx?|css)$/.test(f))) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    if (/(?:from\s*|import\s*\(|@import\s*)['"][^'"]*vendor\//.test(text)) errors.push(`${file}: forbidden vendor runtime import`);
  }
  if (errors.length) throw new Error(errors.join('\n'));
  return { documents: docs.length, applicationPresent: fs.existsSync(path.join(root, 'package.json')) };
}
