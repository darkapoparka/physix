-- The imported core is code reuse, not a connection to the donor database.
-- Do not expose unrelated coaching or fitness commands on the hosted booking release.
revoke execute on function public.gymaf_public_coach(text) from anon,authenticated;
revoke execute on function public.gymaf_command(text,uuid,jsonb) from authenticated;
-- Availability rows are private. Guests receive only computed free instants from physix_slots.
comment on table public.physix_availability is 'Intentional default-deny RLS. No direct public reads or writes; availability is projected through the bounded physix_slots RPC.';
comment on function public.physix_slots(uuid,text,date) is 'Intentional public definer projection: published offer, eligible mode, booking-enabled flag, bounded horizon, configured windows and conflict exclusion. Returns free times only, no patient data.';
