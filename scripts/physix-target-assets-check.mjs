import assert from 'node:assert/strict';
import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import sharp from 'sharp';

const manifest = JSON.parse(readFileSync('docs/physix/targets/imagegen-home-20260920/assets.json', 'utf8'));
assert.deepEqual(manifest.assets.map(a => a.name), ['hero','service-physiotherapy','service-sports','service-mobility','visit-centre','visit-online','care-cover']);
const results = [];
for (const asset of manifest.assets) {
  assert.equal(asset.path, 'public/physix/target-home/' + asset.name + '.webp');
  const bytes = readFileSync(asset.path);
  const meta = await sharp(bytes).metadata();
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.name);
  assert.equal(bytes.length, asset.bytes);
  assert.equal(meta.format, 'webp');
  assert.deepEqual([meta.width, meta.height], [asset.width, asset.height]);
  results.push({name: asset.name, passed: true, bytes: bytes.length});
}
const out = resolve(process.env.PHYSIX_EVIDENCE_DIR || 'docs/physix/evidence/target-assets-latest');
mkdirSync(out, {recursive: true});
writeFileSync(resolve(out, 'target-assets.json'), JSON.stringify({passed: true, assets: results}, null, 2));
console.log('TARGET_ASSETS_PASSED', results.length);
