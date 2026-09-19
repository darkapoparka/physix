import {PGlite} from '@electric-sql/pglite';
import {pgcrypto} from '@electric-sql/pglite/contrib/pgcrypto';
import {btree_gist} from '@electric-sql/pglite/contrib/btree_gist';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createHash,randomBytes,randomUUID} from 'node:crypto';
import {validateCommand,uuid,dateOnly,instant,object,text} from '../../src/shared/gymaf/validation.ts';
const root=fileURLToPath(new URL('../../',import.meta.url));
const source=p=>readFileSync(root+p,'utf8');
const hash=value=>createHash('sha256').update(value).digest('hex');
export const ids={patient:'10000000-0000-4000-8000-000000000001',other:'10000000-0000-4000-8000-000000000002',practitioner:'10000000-0000-4000-8000-000000000003',workspace:'20000000-0000-4000-8000-000000000001',relationship:'30000000-0000-4000-8000-000000000001',otherRelationship:'30000000-0000-4000-8000-000000000002'};
const migrations=['202609050001_gymaf_schema.sql','202609050002_gymaf_integrity.sql','202609050003_gymaf_commands.sql','202609050004_gymaf_queries.sql'].map(n=>'supabase/migrations/'+n).concat('db/physix/local-booking.sql');
export async function openDatabase(dataDir){
 const pg=await PGlite.create(dataDir,{extensions:{pgcrypto,btree_gist},relaxedDurability:false});
 try{
  await pg.exec("set time zone 'UTC'");
  await pg.exec('create schema if not exists physix_local; revoke all on schema physix_local from public; create table if not exists physix_local.migrations(name text primary key,sha256 text not null);');
  const applied=(await pg.query('select * from physix_local.migrations')).rows;
  for(const name of ['tests/db/bootstrap.sql',...migrations]){
   const sql=source(name),digest=hash(sql),prior=applied.find(m=>m.name===name);
   if(prior){if(prior.sha256!==digest)throw Error('Applied SQL changed: '+name);continue;}
   // Migrations are copied unchanged; a partial bootstrap stops rather than resetting data.
   await pg.exec(sql);
   await pg.query('insert into physix_local.migrations values($1,$2)',[name,digest]);
  }
  await pg.exec('create table if not exists physix_local.tokens(hash text primary key,user_id uuid not null references auth.users(id),session_id uuid not null references auth.sessions(id),expires_at timestamptz not null);');
  await seed(pg);
  return pg;
 }catch(error){await pg.close();throw error;}
}
async function seed(pg){
 if((await pg.query('select id from public.app_users where id=$1',[ids.patient])).rows.length)return;
 await pg.transaction(async tx=>{
  for(const [key,label] of [['patient','Test patient'],['other','Second test patient'],['practitioner','Test practitioner']]){
   await tx.query('insert into auth.users values($1,$2,now())',[ids[key],key+'@physix.example.test']);
   await tx.query("insert into public.app_users(id,display_name,locale,timezone)values($1,$2,'en','UTC')",[ids[key],label]);
  }
  await tx.query("insert into public.workspaces(id,name,slug,public_name)values($1,'Local test clinic','physix-local','Local test clinic')",[ids.workspace]);
  await tx.query("insert into public.workspace_memberships(workspace_id,user_id,role)values($1,$2,'owner')",[ids.workspace,ids.practitioner]);
  for(const [relationship,patient] of [[ids.relationship,ids.patient],[ids.otherRelationship,ids.other]]){
   await tx.query('insert into public.coaching_relationships(id,workspace_id,client_user_id,coach_user_id)values($1,$2,$3,$4)',[relationship,ids.workspace,patient,ids.practitioner]);
   await tx.query("insert into public.service_entitlements(workspace_id,relationship_id,source,starts_at,ends_at)values($1,$2,'complimentary',now(),now()+interval '1 year')",[ids.workspace,relationship]);
  }
  // Only this explicitly local fixture enables the inherited synthetic MFA test switch.
  await tx.exec('update gymaf_private.runtime set synthetic_local=true;');
  const programId=randomUUID(),versionId=randomUUID(),assignmentId=randomUUID();
  const plan={workouts:[0,2,4].map((dayOffset,n)=>({id:randomUUID(),title:['Movement practice','Strength practice','Mobility practice'][n],dayOffset,exercises:[
   {id:randomUUID(),name:'Repetition exercise',instructions:'Sample content for testing the exercise log. Not a clinical instruction.',sets:[1,2].map(()=>({reps:8,loadKg:null,durationSeconds:null,distanceM:null,restSeconds:30}))},
   {id:randomUUID(),name:'Timed exercise',instructions:'Sample duration-based entry. Your practitioner supplies actual exercise instructions.',sets:[{reps:null,loadKg:null,durationSeconds:20,distanceM:null,restSeconds:30}]},
   {id:randomUUID(),name:'Resistance exercise',instructions:'Sample repetition and resistance fields, not a prescription.',sets:[{reps:6,loadKg:2,durationSeconds:null,distanceM:null,restSeconds:30}]}
  ]}))};
  await tx.query('insert into public.programs(id,workspace_id,title,draft)values($1,$2,$3,$4)',[programId,ids.workspace,'Your movement plan',plan]);
  await tx.query('insert into public.program_versions(id,workspace_id,program_id,title,version,plan)values($1,$2,$3,$4,1,$5)',[versionId,ids.workspace,programId,'Your movement plan',plan]);
  for(const w of plan.workouts)await tx.query("insert into public.scheduled_workouts(workspace_id,relationship_id,assignment_id,version_id,workout_id,prescription,scheduled_date,timezone)values($1,$2,$3,$4,$5,$6,current_date+$7::int,'UTC')",[ids.workspace,ids.relationship,assignmentId,versionId,w.id,w,w.dayOffset]);
  for(const [index,name,modes] of [[1,'Physiotherapy',['in_clinic','online']],[2,'Sports rehabilitation',['in_clinic']],[3,'Movement & mobility',['in_clinic','online']]])await tx.query('insert into public.physix_offers values($1,$2,$3,$4,45,true)',['40000000-0000-4000-8000-00000000000'+index,name,ids.practitioner,modes]);
 });
}
export async function refreshTestWindows(pg){
 // Test configuration only. Never assert these are actual clinic hours.
 // Correct the initial test-window timezone without changing any saved appointment.
 await pg.query("update public.physix_availability set starts_at=((starts_at at time zone 'UTC')::date+time '09:00') at time zone 'UTC',ends_at=((starts_at at time zone 'UTC')::date+time '16:00') at time zone 'UTC' where practitioner_id=$1 and extract(hour from starts_at at time zone 'UTC')<>9",[ids.practitioner]);
 await pg.query("insert into public.physix_availability(practitioner_id,starts_at,ends_at)select $1,d+interval '9 hours',d+interval '16 hours' from generate_series(current_date+1,current_date+14,interval '1 day') d on conflict(practitioner_id,starts_at)do nothing",[ids.practitioner]);
}
export async function login(pg,persona){
 if(!['patient','other','practitioner'].includes(persona))throw Object.assign(Error('Unknown local test account'),{code:'22023'});
 const token=randomBytes(32).toString('hex'),sessionId=randomUUID(),userId=ids[persona];
 await pg.transaction(async tx=>{
  await tx.query('insert into auth.sessions values($1,$2)',[sessionId,userId]);
  await tx.query("insert into physix_local.tokens values($1,$2,$3,now()+interval '8 hours')",[hash(token),userId,sessionId]);
  await tx.exec('set local role authenticated');
  await tx.query("select set_config('request.jwt.claims',$1,true)",[JSON.stringify({sub:userId,session_id:sessionId,role:'authenticated',aal:'aal1'})]);
  await tx.query('select public.gymaf_register_session()');
 });
 return {token,persona};
}
export async function actorTransaction(pg,token,callback){
 if(typeof token!=='string'||!/^[a-f0-9]{64}$/.test(token))throw Object.assign(Error('Sign in to the local test account'),{code:'28000'});
 return pg.transaction(async tx=>{
  const actor=(await tx.query('select user_id,session_id from physix_local.tokens where hash=$1 and expires_at>now()',[hash(token)])).rows[0];
  if(!actor)throw Object.assign(Error('Local session expired'),{code:'28000'});
  await tx.exec('set local role authenticated');
  await tx.query("select set_config('request.jwt.claims',$1,true)",[JSON.stringify({sub:actor.user_id,session_id:actor.session_id,role:'authenticated',aal:'aal1'})]);
  return callback(tx,actor);
 });
}
const actionMap={'care.start':'session.start','care.save-set':'session.save-set','care.transition':'session.transition','care.check-in':'checkin.submit','care.publish':'program.publish','care.assign':'program.assign'};
export async function dispatch(pg,token,operation,input={}){
 const p=object(input);
 if(operation==='offers')return pg.transaction(async tx=>{await tx.exec('set local role anon');return (await tx.query('select id,name,modes,duration_minutes from public.physix_offers order by id')).rows;});
 if(operation==='slots')return pg.transaction(async tx=>{await tx.exec('set local role anon');return (await tx.query('select public.physix_slots($1,$2,$3)as data',[uuid(p.offerId),text(p.mode,'Mode',16,1),dateOnly(p.day)])).rows[0].data;});
 return actorTransaction(pg,token,async(tx)=>{
  if(operation==='logout'){await tx.query('select public.gymaf_revoke_session()');return {signedOut:true};}
  if(operation==='me'){
   const account=(await tx.query("select public.gymaf_query('bootstrap')as data")).rows[0].data;
   const relationship=account.relationships[0]?(await tx.query("select public.gymaf_query('relationship',$1)as data",[account.relationships[0].id])).rows[0].data:null;
   const appointments=(await tx.query('select * from public.physix_appointments order by starts_at limit 200')).rows;
   // Read the published identity under the same authenticated role/RLS as the owned schedule.
   const programmes=relationship?.workouts.length ? (await tx.query(
    'select sw.assignment_id as id, sw.relationship_id as "relationshipId", sw.version_id as "versionId", v.title, v.version, array_agg(sw.id order by sw.scheduled_date,sw.id) as "scheduledIds" from public.scheduled_workouts sw join public.program_versions v on v.id=sw.version_id where sw.relationship_id=$1 and sw.id=any($2::uuid[]) group by sw.assignment_id,sw.relationship_id,sw.version_id,v.title,v.version order by min(sw.scheduled_date),sw.assignment_id',
    [relationship.relationship.id,relationship.workouts.map(w=>w.id)])).rows : [];
   return {account,relationship,appointments,programmes,environment:'local-test'};
  }
  if(operation==='session')return (await tx.query("select public.gymaf_query('session',$1)as data",[uuid(p.id)])).rows[0].data;
  if(operation==='workspace')return (await tx.query("select public.gymaf_query('workspace',$1)as data",[uuid(p.id)])).rows[0].data;
  if(operation==='relationship')return (await tx.query("select public.gymaf_query('relationship',$1)as data",[uuid(p.id)])).rows[0].data;
  if(operation==='command'){
   if(Object.keys(p).some(k=>!['action','commandId','payload'].includes(k)))throw Object.assign(Error('Unexpected command fields'),{code:'22023'});
   const commandId=uuid(p.commandId),action=text(p.action,'Action',40,1),payload=object(p.payload);
   if(action==='booking.reserve'||action==='booking.cancel'){
    if(action==='booking.reserve'){uuid(payload.offerId);instant(payload.startsAt);}
    else uuid(payload.id);
    return (await tx.query('select public.physix_booking_command($1,$2,$3)as data',[action.split('.')[1],commandId,payload])).rows[0].data;
   }
   const legacy=actionMap[action];if(!legacy)throw Object.assign(Error('Command not available'),{code:'42501'});
   // Sharing is deliberate at the new boundary; old private/fitness commands are not exposed.
   if(action==='care.check-in'&&p.payload.shared!==true)throw Object.assign(Error('Confirm sharing the check-in'),{code:'22023'});
   const clean={...payload};if(action==='care.check-in')delete clean.shared;
   const command=validateCommand({action:legacy,commandId,payload:clean});
   return (await tx.query('select public.gymaf_command($1,$2,$3)as data',[command.action,commandId,command.payload])).rows[0].data;
  }
  throw Object.assign(Error('Unknown operation'),{code:'22023'});
 });
}
