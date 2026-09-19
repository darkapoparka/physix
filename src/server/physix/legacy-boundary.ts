/** The inherited backend is a reference adapter, not a configured PhysiX backend.
 * It can only run against explicit loopback contract fixtures. No hosted Gymaf access. */
export function legacyContractsEnabled():boolean {
 if(process.env.PHYSIX_ISOLATED_CONTRACT_TESTS!=='1')return false;
 try {
  const api=new URL(process.env.SUPABASE_URL||'');
  const origin=new URL(process.env.APP_ORIGIN||'');
  const loopback=(u:URL)=>['localhost','127.0.0.1','[::1]'].includes(u.hostname)&&u.protocol==='http:'&&!u.username&&!u.password;
  return loopback(api)&&loopback(origin)&&(!process.env.STRIPE_SECRET_KEY||process.env.STRIPE_SECRET_KEY==='sk_test_synthetic');
 }catch{return false;}
}