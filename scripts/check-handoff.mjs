import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyDocs, verifyUpstream } from './handoff-lib.mjs';
try {
  if (process.argv.length > 2) throw new Error('Usage: node scripts/check-handoff.mjs');
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const pin = verifyUpstream(root);
  const docs = verifyDocs(root);
  console.log(JSON.stringify({ ...docs, pinnedSource: pin.commit }, null, 2));
  console.log('Handoff checks passed. This does not certify an application, deployment or clinical service.');
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
