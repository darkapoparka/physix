import type {Appointment} from './contracts';

export type AppointmentSummary = Pick<Appointment, 'id' | 'service_name' | 'starts_at' | 'ends_at' | 'timezone' | 'mode' | 'state' | 'offer_id'>;
export type AppointmentView = 'upcoming' | 'past' | 'cancelled';
export function appointmentView(value: unknown): AppointmentView {
  return value === 'past' || value === 'cancelled' ? value : 'upcoming';
}
export function appointmentBucket(item: AppointmentSummary, now: number): AppointmentView {
  if (item.state === 'cancelled') return 'cancelled';
  return Number.isFinite(Date.parse(item.ends_at)) && Date.parse(item.ends_at) > now ? 'upcoming' : 'past';
}
export function sortedAppointments<T extends AppointmentSummary>(items: readonly T[], view: AppointmentView, now: number): T[] {
  return items.filter(item => appointmentBucket(item, now) === view).sort((a,b) => {
    const delta = Date.parse(a.starts_at) - Date.parse(b.starts_at);
    return (Number.isFinite(delta) && delta !== 0 ? (view === 'upcoming' ? delta : -delta) : a.id.localeCompare(b.id));
  });
}
/** UI eligibility for the local pilot, not the clinic's unconfirmed cancellation policy. */
export function canCancelAppointment(item: AppointmentSummary, now: number): boolean {
  return item.state === 'confirmed' && Date.parse(item.starts_at) > now;
}
export function appointmentStatus(item: AppointmentSummary, now: number): string {
  if (item.state === 'cancelled') return 'Cancelled';
  if (appointmentBucket(item, now) === 'past') return 'Past visit';
  return Date.parse(item.starts_at) <= now ? 'Scheduled now' : 'Reserved';
}
export function appointmentSummary(items: readonly Appointment[], now: number): AppointmentSummary | null {
  const next = sortedAppointments(items, 'upcoming', now)[0];
  if (!next) return null;
  const {id, service_name, starts_at, ends_at, timezone, mode, state, offer_id} = next;
  return {id, service_name, starts_at, ends_at, timezone, mode, state, offer_id};
}
export function appointmentLabels(item: AppointmentSummary) {
  let zone = item.timezone;
  try {new Intl.DateTimeFormat('en-GB', {timeZone: zone}).format();} catch {zone = 'UTC';}
  const start = new Date(item.starts_at), end = new Date(item.ends_at);
  const valid = Number.isFinite(start.getTime()) && Number.isFinite(end.getTime());
  const format = (date: Date, options: Intl.DateTimeFormatOptions) => valid ? new Intl.DateTimeFormat('en-GB', {...options, timeZone: zone}).format(date) : '—';
  return {
    day: format(start, {day: 'numeric'}), month: format(start, {month: 'short'}),
    date: format(start, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}),
    shortDate: format(start, {weekday: 'short', day: 'numeric', month: 'short'}),
    time: format(start, {hour: '2-digit', minute: '2-digit'}),
    range: format(start, {hour: '2-digit', minute: '2-digit'}) + ' – ' + format(end, {hour: '2-digit', minute: '2-digit'}),
    duration: valid ? Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000)) : 0,
    zone, mode: item.mode === 'online' ? 'Online' : 'In clinic',
  };
}
export function bookAgainHref(item: AppointmentSummary): string {
  return '/book?' + new URLSearchParams({service: item.offer_id, mode: item.mode, step: 'time'});
}
/** Calendar exports intentionally omit service names, notes, patient identity and private links. */
export function appointmentCalendar(item: AppointmentSummary, now: Date): string {
  if (item.state !== 'confirmed' || !Number.isFinite(Date.parse(item.starts_at)) || !Number.isFinite(Date.parse(item.ends_at)) || Date.parse(item.ends_at) <= Date.parse(item.starts_at)) throw new Error('Appointment cannot be exported.');
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const uid = item.id.replace(/[^a-zA-Z0-9-]/g, '');
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//PhysiX//Local appointments//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',
    'UID:' + uid + '@physix.local','DTSTAMP:' + stamp(now),'DTSTART:' + stamp(new Date(item.starts_at)),
    'DTEND:' + stamp(new Date(item.ends_at)),'SUMMARY:PhysiX appointment (local test)',
    'DESCRIPTION:Local test reservation. Not a real clinic appointment.','END:VEVENT','END:VCALENDAR',''].join('\r\n');
}
