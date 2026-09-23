// Dedicated PhysiX project. Never fall back to the donor's environment or database.
export const physixProjectRef = 'wcqibswrmtunjfopzabh';
export function hostedConfig(env:Record<string,string|undefined>=process.env) {
 if(env.PHYSIX_HOSTED_BACKEND!=='1')return null;
 const key=env.PHYSIX_SUPABASE_PUBLISHABLE_KEY;
 if(env.PHYSIX_SUPABASE_URL!==`https://${physixProjectRef}.supabase.co`||!key?.startsWith('sb_publishable_'))return null;
 try {const origin=new URL(env.PHYSIX_APP_ORIGIN||'');
  if(origin.protocol!=='https:'||origin.pathname!=='/'||origin.search||origin.hash||origin.username||origin.password)return null;
  return {url:env.PHYSIX_SUPABASE_URL,key,origin:origin.origin};
 }catch{return null;}
}
export const hostedBackendEnabled=()=>!!hostedConfig();
