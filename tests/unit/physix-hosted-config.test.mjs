import test from 'node:test';
import assert from 'node:assert/strict';
import {hostedConfig,physixProjectRef} from '../../src/server/physix/hosted-config.ts';
test('hosted PhysiX configuration rejects the donor, privileged keys and malformed origins',()=>{
 const valid={PHYSIX_HOSTED_BACKEND:'1',PHYSIX_SUPABASE_URL:`https://${physixProjectRef}.supabase.co`,PHYSIX_SUPABASE_PUBLISHABLE_KEY:'sb_publishable_test',PHYSIX_APP_ORIGIN:'https://physix.example'};
 assert.equal(hostedConfig(valid).origin,'https://physix.example');
 for(const overrides of [{PHYSIX_HOSTED_BACKEND:'0'},{PHYSIX_SUPABASE_URL:'https://crhcgcqanoeoddmwaqhb.supabase.co'},{PHYSIX_SUPABASE_PUBLISHABLE_KEY:'sb_secret_test'},{PHYSIX_APP_ORIGIN:'https://physix.example/path'},{PHYSIX_APP_ORIGIN:'https://user:pass@physix.example'},{PHYSIX_APP_ORIGIN:'http://physix.example'}])assert.equal(hostedConfig({...valid,...overrides}),null);
 assert.equal(hostedConfig({SUPABASE_URL:valid.PHYSIX_SUPABASE_URL}),null);
});
