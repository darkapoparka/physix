import {fork, spawn} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import {mkdirSync, openSync, writeFileSync} from 'node:fs';
import {createServer} from 'node:net';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

// Keep the one saved database separate from Next's replaceable development process.
process.chdir(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const directory = resolve('.artifacts/physix-local');
mkdirSync(directory, {recursive: true});
const logPath = resolve(directory, 'dev.log');
const log = openSync(logPath, 'a');
const statusPath = resolve(directory, 'runtime.json');
const origin = 'http://127.0.0.1:3217';
const probe = createServer();
await new Promise((ok, fail) => {
  probe.once('error', fail);
  probe.listen(3217, '127.0.0.1', () => probe.close(ok));
}).catch(error => { throw Error('Port 3217 is already in use. Check its owner before restarting.', {cause: error}); });
const env = {...process.env, NODE_ENV: 'development', PHYSIX_DEMO: '1', PHYSIX_LOCAL_BACKEND: '1', PHYSIX_LOCAL_RPC_SECRET: randomBytes(32).toString('hex'), PHYSIX_APP_ORIGIN: origin, NEXT_TELEMETRY_DISABLED: '1'};
const backend = fork('scripts/physix-local/server.mjs', [], {env, stdio: ['ignore', log, log, 'ipc']});
let web, stopping = false;
function status(state) {
  writeFileSync(statusPath, JSON.stringify({state, origin, supervisorPid: process.pid, backendPid: backend.pid, webPid: web?.pid, logPath, updatedAt: new Date().toISOString()}, null, 2));
}
status('starting');
console.log('Starting PhysiX on ' + origin + '\nRuntime log: ' + logPath);
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;
  status('stopping');
  if (web && web.exitCode === null) {
    if (process.platform === 'win32') spawn('taskkill', ['/PID', String(web.pid), '/T', '/F'], {stdio: 'ignore', windowsHide: true});
    else web.kill('SIGTERM');
  }
  if (backend.connected) backend.send({type: 'shutdown'});
}
backend.on('message', message => {
  if (!message?.ready || web || stopping) return;
  web = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3217'], {stdio: ['ignore', log, log], env: {...env, PHYSIX_LOCAL_RPC_PORT: String(message.port)}});
  status('warming');
  web.on('error', error => { console.error(error.message); stop(1); });
  web.on('exit', code => { if (!stopping) stop(code ?? 1); });
  void (async () => {
    for (let n = 0; n < 30 && !stopping; n++) {
      try { const r = await fetch(origin + '/api/physix/v1/offers', {signal: AbortSignal.timeout(3000)}); if (r.ok) { status('ready'); console.log('PhysiX ready: ' + origin + ' — saved local-test database connected.'); return; } } catch { /* Compilation may still be starting. */ }
      await new Promise(done => setTimeout(done, 1000));
    }
    if (!stopping) { status('unready'); console.error('PhysiX did not become ready. Inspect ' + logPath); }
  })();
});
backend.on('exit', code => { if (!stopping) stop(code || 1); status('stopped'); });
backend.on('error', error => { console.error(error.message); stop(1); });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => stop());
