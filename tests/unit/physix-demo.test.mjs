import test from 'node:test';
import assert from 'node:assert/strict';
import {newAttempt,elapsedMs,transition,recordDemoSet,matchesSearch,demoEnabled} from '../../src/shared/physix/demo.ts';
import {legacyContractsEnabled} from '../../src/server/physix/legacy-boundary.ts';
test('demo requires development AND explicit opt-in',()=>{
 assert.equal(demoEnabled({NODE_ENV:'development',PHYSIX_DEMO:'1'}),true);
 for(const NODE_ENV of ['production','test',undefined])assert.equal(demoEnabled({NODE_ENV,PHYSIX_DEMO:'1'}),false);
 assert.equal(demoEnabled({NODE_ENV:'development'}),false);
});
test('Fidelity-style elapsed clock excludes paused time and tolerates clock reversal',()=>{
 let a=transition(newAttempt('a'),'active',1000);assert.equal(elapsedMs(a,4000),3000);
 a=transition(a,'paused',4000);assert.equal(elapsedMs(a,100000),3000);
 a=transition(a,'active',110000);assert.equal(elapsedMs(a,112000),5000);
 assert.equal(elapsedMs(a,100000),3000);
});
test('unchanged set retry is idempotent and completed history stays immutable',()=>{
 let a=transition(newAttempt('a'),'active',1);a=recordDemoSet(a,'exercise-1:1',8,'same-command');
 assert.strictEqual(recordDemoSet(a,'exercise-1:1',8,'same-command'),a);
 a=transition(a,'finished',1000);assert.equal(a.status,'finished');assert.strictEqual(transition(a,'active',2000),a);
 assert.throws(()=>recordDemoSet(a,'exercise-1:2',8,'new-command'));
});
test('empty and zero-only attempts cannot pretend to be performed sessions',()=>{
 let a=transition(newAttempt('a'),'active',1);assert.throws(()=>transition(a,'finished',10));
 a=recordDemoSet(a,'exercise-1:1',0,'zero');assert.equal(a.actuals['exercise-1:1'],0);assert.throws(()=>transition(a,'finished',10));
});
test('actuals reject invalid dosage, unknown exercise and paused writes',()=>{
 const a=transition(newAttempt('a'),'active',1);
 for(const n of [-1,1.5,1000,NaN,Infinity])assert.throws(()=>recordDemoSet(a,'exercise-1:1',n,'command'));
 assert.throws(()=>recordDemoSet(a,'exercise-9:1',8,'command'));
 assert.throws(()=>recordDemoSet(transition(a,'paused',2),'exercise-1:1',8,'command'));
});
test('service matching preserves Unicode and requires every search term',()=>{
 assert.equal(matchesSearch('Back pain Physiotherapy','  BACK pain '),true);
 assert.equal(matchesSearch('Movement & mobility','sports'),false);
 assert.equal(matchesSearch('Физиотерапия и движение','физиотерапия'),true);
 assert.equal(matchesSearch('Movement',''),true);
});
test('legacy provider boundary fails closed without explicit isolated environment',()=>{
 const old={...process.env};
 try{delete process.env.PHYSIX_ISOLATED_CONTRACT_TESTS;assert.equal(legacyContractsEnabled(),false);
 process.env.PHYSIX_ISOLATED_CONTRACT_TESTS='1';process.env.APP_ORIGIN='http://127.0.0.1:3217';process.env.SUPABASE_URL='https://old-gymaf.supabase.co';assert.equal(legacyContractsEnabled(),false);
 process.env.SUPABASE_URL='http://127.0.0.1:54321';delete process.env.STRIPE_SECRET_KEY;assert.equal(legacyContractsEnabled(),true);
 process.env.STRIPE_SECRET_KEY='sk_live_forbidden';assert.equal(legacyContractsEnabled(),false);
 }finally{for(const key of ['PHYSIX_ISOLATED_CONTRACT_TESTS','APP_ORIGIN','SUPABASE_URL','STRIPE_SECRET_KEY']){if(old[key]===undefined)delete process.env[key];else process.env[key]=old[key];}}
});