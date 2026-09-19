import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import sharp from 'sharp';

// Verify the checked-in generated set without regenerating or altering originals.
const root = process.cwd();
const manifest = JSON.parse(readFileSync(resolve(root, 'docs/physix/assets/illustrations-v1/manifest.json'), 'utf8'));
const expected = ['assessment', 'back', 'neck', 'sports', 'mobility', 'online'];
assert.deepEqual(manifest.map(item => item.slug), expected);
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const rows = [];
for (const item of manifest) {
  assert.equal(item.sourcePath, `docs/physix/assets/illustrations-v1/${item.slug}.png`);
  assert.equal(item.assetPath, `public/physix/illustrations/${item.slug}.webp`);
  const original = readFileSync(resolve(root, item.sourcePath));
  const asset = readFileSync(resolve(root, item.assetPath));
  assert.equal(digest(original), item.sourceSha256, `${item.slug}: original changed`);
  assert.equal(digest(asset), item.sha256, `${item.slug}: derivative changed`);
  assert.equal(asset.length, item.bytes);
  const source = await sharp(original).metadata();
  const metadata = await sharp(asset).metadata();
  assert.deepEqual([source.width, source.height], item.sourceDimensions);
  assert.deepEqual([metadata.width, metadata.height], [800, 800]);
  assert.equal(metadata.format, 'webp');
  assert.equal(metadata.hasAlpha, true);
  const stats = await sharp(asset).stats();
  assert.equal(stats.channels[3].min, 0, `${item.slug}: transparent margin missing`);
  assert.equal(stats.channels[3].max, 255, `${item.slug}: subject unexpectedly translucent`);
  rows.push({name: item.slug, width: metadata.width, height: metadata.height, bytes: asset.length, sha256: item.sha256, transparent: true});
  console.log('PASS', item.slug, asset.length, 'bytes');
}
assert.equal(new Set(rows.map(item => item.sha256)).size, 6, 'Assets must be distinct');
const bytes = rows.reduce((sum, item) => sum + item.bytes, 0);
assert.ok(bytes < 600000, 'Discovery asset budget exceeded');
const directory = resolve(process.env.PHYSIX_EVIDENCE_DIR || 'docs/physix/evidence/assets-latest');
mkdirSync(directory, {recursive: true});
writeFileSync(resolve(directory, 'asset-integrity.json'), JSON.stringify({checkedAt: new Date().toISOString(), passed: true, count: rows.length, bytes, assets: rows}, null, 2));
console.log('ASSET_INTEGRITY_PASSED', rows.length, 'assets;', bytes, 'total bytes');
