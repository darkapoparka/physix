import test from 'node:test';
import assert from 'node:assert/strict';
import {appointmentBucket, appointmentCalendar, appointmentLabels, appointmentStatus, appointmentSummary, appointmentView, bookAgainHref, canCancelAppointment, sortedAppointments} from '../../src/shared/physix/appointments.ts';
import {careLoginHref, isCarePath, safeCareReturn} from '../../src/shared/physix/navigation.ts';
const now = Date.parse('2026-09-20T12:00:00Z');
const id = '50000000-0000-4000-8000-000000000001';
const item = (changes = {}) => ({id, offer_id:'60000000-0000-4000-8000-000000000001', service_name:'Sample physiotherapy', mode:'in_clinic', state:'confirmed', starts_at:'2026-09-21T09:00:00Z', ends_at:'2026-09-21T09:45:00Z', timezone:'UTC', patient_id:'private-patient', payment_state:'not_required_local', ...changes});
test('appointment bucket is based on end time, not a guessed attendance state', () => {
  assert.equal(appointmentBucket(item(), now), 'upcoming');
  assert.equal(appointmentBucket(item({starts_at:'2026-09-20T11:45:00Z',ends_at:'2026-09-20T12:30:00Z'}),now),'upcoming');
  assert.equal(appointmentStatus(item({starts_at:'2026-09-20T11:45:00Z',ends_at:'2026-09-20T12:30:00Z'}),now),'Scheduled now');
  assert.equal(appointmentStatus(item({ends_at:'2026-09-20T12:00:00Z'}),now),'Past visit');
});
test('cancelled appointments never appear upcoming even with future dates', () => assert.equal(appointmentBucket(item({state:'cancelled'}),now),'cancelled'));
test('upcoming sorts earliest first without mutating source', () => {
  const list=[item({id:'later',starts_at:'2026-09-23T09:00:00Z',ends_at:'2026-09-23T09:45:00Z'}),item()];
  assert.equal(sortedAppointments(list,'upcoming',now)[0].id,id); assert.equal(list[0].id,'later');
});
test('past visits sort newest first and cancellation remains a separate view', () => {
  const list=[item({id:'old',starts_at:'2026-09-18T09:00:00Z',ends_at:'2026-09-18T09:45:00Z'}),item({id:'new',starts_at:'2026-09-19T09:00:00Z',ends_at:'2026-09-19T09:45:00Z'}),item({state:'cancelled'})];
  assert.deepEqual(sortedAppointments(list,'past',now).map(a=>a.id),['new','old']);
});
test('cancel controls are not offered for past, started or cancelled visits', () => {
  assert.equal(canCancelAppointment(item(),now),true);
  for(const changes of [{state:'cancelled'},{starts_at:'2026-09-20T12:00:00Z'},{starts_at:'invalid'}]) assert.equal(canCancelAppointment(item(changes),now),false);
});
test('unknown appointment filters have a safe default', () => {
  assert.equal(appointmentView('cancelled'),'cancelled'); assert.equal(appointmentView('past'),'past'); assert.equal(appointmentView('unknown'),'upcoming');
});
test('Home receives no patient identifiers or payment payload', () => {
  const summary=appointmentSummary([item()],now);
  assert.equal(summary.id,id); assert.equal('patient_id' in summary,false); assert.equal('payment_state' in summary,false);
  assert.equal(appointmentSummary([item({state:'cancelled'})],now),null);
});
test('date labels include the full year, duration and explicit timezone', () => {
  const labels=appointmentLabels(item()); assert.match(labels.date,/21 September 2026/); assert.equal(labels.range,'09:00 – 09:45'); assert.equal(labels.duration,45); assert.equal(labels.zone,'UTC');
});
test('invalid timestamps and zone values have honest display fallbacks', () => {
  assert.equal(appointmentLabels(item({starts_at:'bad'})).date,'—'); assert.equal(appointmentLabels(item({timezone:'invalid'})).zone,'UTC');
});
test('book again carries only public offer and mode, never an old time or patient', () => {
  const href=bookAgainHref(item()); assert.match(href,/mode=in_clinic/); assert.doesNotMatch(href,/starts_at|patient|2026|private/);
});
test('calendar file has correct UTC instants and does not export treatment or identity', () => {
  const ics=appointmentCalendar(item({service_name:'private-treatment\r\nATTENDEE:outside@example.test'}),new Date(now));
  assert.match(ics,/DTSTART:20260921T090000Z/); assert.match(ics,/DTEND:20260921T094500Z/);
  assert.match(ics,/BEGIN:VCALENDAR\r\n/); assert.doesNotMatch(ics,/private-treatment|patient|ATTENDEE/);
});
test('cancelled or malformed appointments cannot be exported as active calendar entries', () => {
  assert.throws(()=>appointmentCalendar(item({state:'cancelled'}),new Date(now)));
  assert.throws(()=>appointmentCalendar(item({ends_at:'bad'}),new Date(now)));
});
test('appointment detail has an allowlisted sign-in continuation', () => {
  const href='/care/appointments/'+id; assert.equal(isCarePath(href),true); assert.equal(safeCareReturn(href),href);
  assert.equal(careLoginHref(href),'/login?returnTo='+encodeURIComponent(href));
  for(const route of [href+'/edit','/care/appointments/not-an-id','//outside.test','/care/appointments/../profile']) assert.equal(safeCareReturn(route),'/care');
});
