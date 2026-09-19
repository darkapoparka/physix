-- Local pilot extension to the retained care schema. Not an applied hosted migration.
-- One capacity-one practitioner, UTC sample windows, no payment or external calendar.
create extension if not exists btree_gist with schema extensions;
create table public.physix_offers (
 id uuid primary key, name text not null, practitioner_id uuid not null references public.app_users(id),
 modes text[] not null, duration_minutes integer not null check(duration_minutes between 15 and 120),
 published boolean not null default false
);
create table public.physix_availability (
 id uuid primary key default gen_random_uuid(), practitioner_id uuid not null references public.app_users(id),
 starts_at timestamptz not null, ends_at timestamptz not null, check(ends_at>starts_at), unique(practitioner_id,starts_at)
);
create table public.physix_appointments (
 id uuid primary key default gen_random_uuid(), patient_id uuid not null references public.app_users(id),
 practitioner_id uuid not null references public.app_users(id), offer_id uuid not null references public.physix_offers(id),
 service_name text not null, mode text not null check(mode in ('in_clinic','online')),
 starts_at timestamptz not null, ends_at timestamptz not null, timezone text not null default 'UTC',
 state text not null default 'confirmed' check(state in ('confirmed','cancelled')),
 payment_state text not null default 'not_required_local' check(payment_state='not_required_local'),
 created_at timestamptz not null default now(), cancelled_at timestamptz, check(ends_at>starts_at),
 exclude using gist (practitioner_id with =, tstzrange(starts_at,ends_at,'[)') with &&) where (state='confirmed'),
 exclude using gist (patient_id with =, tstzrange(starts_at,ends_at,'[)') with &&) where (state='confirmed')
);
alter table public.physix_offers enable row level security;
alter table public.physix_availability enable row level security;
alter table public.physix_appointments enable row level security;
revoke all on public.physix_offers,public.physix_availability,public.physix_appointments from public,anon,authenticated;
grant select on public.physix_offers to anon,authenticated;
grant select on public.physix_appointments to authenticated;
create policy offers_public on public.physix_offers for select to anon,authenticated using(published);
create policy appointments_owned on public.physix_appointments for select to authenticated using(
 patient_id=gymaf_private.active_actor() or practitioner_id=gymaf_private.active_actor()
);
create function public.physix_slots(p_offer uuid,p_mode text,p_day date) returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare offer public.physix_offers;
begin
 select * into offer from public.physix_offers where id=p_offer and published and p_mode=any(modes);
 if not found or p_day<current_date or p_day>current_date+14 then raise exception 'Offer or date unavailable' using errcode='22023';end if;
 return coalesce((select jsonb_agg(jsonb_build_object('startsAt',t,'endsAt',t+make_interval(mins=>offer.duration_minutes),'timezone','UTC') order by t)
 from public.physix_availability a cross join lateral generate_series(a.starts_at,a.ends_at-make_interval(mins=>offer.duration_minutes),interval '15 minutes') t
 where a.practitioner_id=offer.practitioner_id and (t at time zone 'UTC')::date=p_day and t>now()
 and not exists(select 1 from public.physix_appointments b where b.practitioner_id=a.practitioner_id and b.state='confirmed'
 and tstzrange(b.starts_at,b.ends_at,'[)') && tstzrange(t,t+make_interval(mins=>offer.duration_minutes),'[)'))),'[]'::jsonb);
end $$;
revoke all on function public.physix_slots(uuid,text,date) from public;
grant execute on function public.physix_slots(uuid,text,date) to anon,authenticated;
create function public.physix_booking_command(p_action text,p_command_id uuid,p jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare actor uuid:=gymaf_private.active_actor(); offer public.physix_offers; appointment public.physix_appointments;
 previous gymaf_private.commands; fingerprint text; first_at timestamptz; last_at timestamptz; result jsonb; ident uuid;
begin
 if actor is null then raise exception 'Session expired' using errcode='28000';end if;
 if p_command_id is null or jsonb_typeof(p) is distinct from 'object' then raise exception 'Invalid command' using errcode='22023';end if;
 if p_action='reserve' then
  if not(p ?& array['offerId','mode','startsAt']) or (p-array['offerId','mode','startsAt'])<>'{}'::jsonb then raise exception 'Invalid booking fields' using errcode='22023';end if;
  select * into offer from public.physix_offers where id=(p->>'offerId')::uuid and published and p->>'mode'=any(modes);
  if not found then raise exception 'Offer unavailable' using errcode='42501';end if;
 elsif p_action='cancel' then
  if not(p ? 'id') or (p-'id')<>'{}'::jsonb then raise exception 'Invalid cancel fields' using errcode='22023';end if;
  select * into appointment from public.physix_appointments where id=(p->>'id')::uuid for update;
  if not found or (appointment.patient_id<>actor and appointment.practitioner_id<>actor) then raise exception 'Appointment unavailable' using errcode='42501';end if;
 else raise exception 'Unknown booking command' using errcode='22023';end if;
 perform pg_advisory_xact_lock(hashtextextended(actor::text||p_command_id::text,0));
 fingerprint:=encode(extensions.digest('physix.'||p_action||p::text,'sha256'),'hex');
 select * into previous from gymaf_private.commands where actor_id=actor and command_id=p_command_id;
 if found then
  if previous.request_hash<>fingerprint then raise exception 'Idempotency conflict' using errcode='40001';end if;
  return previous.result;
 end if;
 if p_action='reserve' then
  if p->>'startsAt' !~ '(Z|[+-][0-9]{2}:[0-9]{2})$' then raise exception 'Timezone required' using errcode='22023';end if;
  first_at:=(p->>'startsAt')::timestamptz;last_at:=first_at+make_interval(mins=>offer.duration_minutes);
  if not isfinite(first_at) or first_at<=now() or first_at>now()+interval '14 days'
   or extract(epoch from first_at)::bigint%900<>0 then raise exception 'Time unavailable' using errcode='22023';end if;
  if not exists(select 1 from public.physix_availability where practitioner_id=offer.practitioner_id and starts_at<=first_at and ends_at>=last_at) then raise exception 'Time unavailable' using errcode='22023';end if;
  insert into public.physix_appointments(patient_id,practitioner_id,offer_id,service_name,mode,starts_at,ends_at)
   values(actor,offer.practitioner_id,offer.id,offer.name,p->>'mode',first_at,last_at) returning id into ident;
 else
  ident:=appointment.id;
  update public.physix_appointments set state='cancelled',cancelled_at=coalesce(cancelled_at,now()) where id=ident;
 end if;
 result:=jsonb_build_object('id',ident);
 insert into gymaf_private.commands(actor_id,command_id,action,request_hash,result) values(actor,p_command_id,'physix.'||p_action,fingerprint,result);
 insert into gymaf_private.audit_events(actor_id,action,resource_id,command_id) values(actor,'physix.'||p_action,ident,p_command_id);
 return result;
end $$;
revoke all on function public.physix_booking_command(text,uuid,jsonb) from public,anon;
grant execute on function public.physix_booking_command(text,uuid,jsonb) to authenticated;
