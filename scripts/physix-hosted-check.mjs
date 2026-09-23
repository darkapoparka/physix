// Isolated in-memory PostgreSQL only. Never connects to either hosted project or saved local data.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';
import {pgcrypto} from '@electric-sql/pglite/contrib/pgcrypto';
import {btree_gist} from '@electric-sql/pglite/contrib/btree_gist';
const db=await PGlite.create({extensions:{pgcrypto,btree_gist}});
try {
 for(const file of ['tests/db/bootstrap.sql',...['schema','integrity','commands','queries'].map((s,i)=>`supabase/migrations/20260905000${i+1}_gymaf_${s}.sql`),'supabase/migrations/20260923152906_physix_hosted_booking.sql','supabase/migrations/20260923153618_physix_hosted_api_scope.sql'])await db.exec(readFileSync(file,'utf8'));
 const alice={id:randomUUID(),session:randomUUID()},bob={id:randomUUID(),session:randomUUID()},practitioner=randomUUID();
 for(const actor of [alice,bob,{id:practitioner,session:randomUUID()}]){await db.query('insert into auth.users values($1,$2,now())',[actor.id,actor.id+'@example.test']);await db.query('insert into auth.sessions values($1,$2)',[actor.session,actor.id]);await db.query('insert into public.app_users(id) values($1)',[actor.id]);}
 async function as(actor,fn){return db.transaction(async tx=>{await tx.exec('set local role '+(actor?'authenticated':'anon'));if(actor){await tx.query("select set_config('request.jwt.claims',$1,true)",[JSON.stringify({sub:actor.id,session_id:actor.session,role:'authenticated',aal:'aal1'})]);await tx.query('select public.gymaf_register_session()');}return fn(tx);});}
 const offer=(await db.query("select id from public.physix_offers where slug='physiotherapy'")).rows[0].id;
 const tomorrow=new Date(Date.now()+86400000*3).toISOString().slice(0,10);
 assert.deepEqual((await as(null,tx=>tx.query('select public.physix_slots($1,$2,$3) as slots',[offer,'in_clinic',tomorrow]))).rows[0].slots,[]);
 await db.query("update public.physix_offers set practitioner_id=$1,duration_minutes=45,price_minor=5000,currency='EUR',policy_version='test-v1',policy_text='Synthetic test policy',minimum_notice_minutes=0,cancellation_notice_minutes=0,buffer_minutes=15,booking_enabled=true where id=$2",[practitioner,offer]);
 await db.query("insert into public.physix_availability(practitioner_id,starts_at,ends_at) values($1,$2::date+interval '9 hours',$2::date+interval '12 hours')",[practitioner,tomorrow]);
 const slots=(await as(null,tx=>tx.query('select public.physix_slots($1,$2,$3) as slots',[offer,'in_clinic',tomorrow]))).rows[0].slots;
 assert.ok(slots.length);assert.equal(slots[0].timezone,'Europe/Sofia');
 const command=randomUUID(),payload={offerId:offer,mode:'in_clinic',startsAt:slots[0].startsAt,policyVersion:'test-v1'};
 const reserve=(actor,key=command,p=payload)=>as(actor,tx=>tx.query("select public.physix_booking_command('reserve',$1,$2) as result",[key,p]));
 const saved=(await reserve(alice)).rows[0].result;
 assert.deepEqual((await reserve(alice)).rows[0].result,saved);
 await db.query('update public.physix_offers set booking_enabled=false where id=$1',[offer]);
 assert.deepEqual((await reserve(alice)).rows[0].result,saved);
 await db.query('update public.physix_offers set booking_enabled=true where id=$1',[offer]);
 await assert.rejects(reserve(alice,command,{...payload,startsAt:slots[1].startsAt}),e=>e.code==='40001');
 await assert.rejects(reserve(bob,randomUUID()),e=>e.code==='23P01');
 await assert.rejects(reserve(bob,randomUUID(),{...payload,policyVersion:'wrong'}));
 assert.equal((await as(bob,tx=>tx.query('select * from public.physix_appointments'))).rows.length,0);
 const account=(await as(alice,tx=>tx.query('select public.physix_account() as data'))).rows[0].data;
 assert.equal(account.environment,'hosted');assert.equal(account.appointments.length,1);assert.equal(account.account.local_mode,false);
 await assert.rejects(as(bob,tx=>tx.query("select public.physix_booking_command('cancel',$1,$2)",[randomUUID(),{id:saved.id}])));
 await assert.rejects(as(null,tx=>tx.query('select * from public.physix_appointments')));
 const cancellation=randomUUID();const cancel=()=>as(alice,tx=>tx.query("select public.physix_booking_command('cancel',$1,$2) as result",[cancellation,{id:saved.id}]));assert.deepEqual((await cancel()).rows,(await cancel()).rows);
 await reserve(bob,randomUUID());
 console.log('PASS: unpublished availability, real timezone, persisted reservation, replay, changed-payload denial, overlap denial, policy validation, other-patient isolation, anonymous denial, cancellation/retry and slot release. No hosted records created.');
}finally{await db.close();}
