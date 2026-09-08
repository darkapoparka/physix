import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyUpstream } from './handoff-lib.mjs';
const args = process.argv.slice(2);
if (args.some(a => a !== '--require-checkout') || args.length > 1) {
  console.error('Usage: node scripts/verify-upstream.mjs [--require-checkout]');
  process.exitCode = 1;
} else {
  try {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const result = verifyUpstream(root, args.includes('--require-checkout'));
    console.log(JSON.stringify(result, null, 2));
    console.log('Source pin verification only; no application or provider tests were run.');
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
