export type VisitMode = 'in_clinic' | 'online';

type ServiceChoice = {id: string; modes: readonly VisitMode[]};
type BookingEntry = {service?: ServiceChoice; mode?: VisitMode; step?: 'time'};

/** Only public discovery state is serialized, never patient fields or arbitrary return URLs. */
export function bookingHref({service, mode, step}: BookingEntry = {}): string {
  if (mode && !['in_clinic', 'online'].includes(mode)) {
    throw new RangeError('Unknown visit mode');
  }
  if (step && step !== 'time') {
    throw new RangeError('Unsupported booking entry step');
  }
  if (service && mode && !service.modes.includes(mode)) {
    throw new RangeError('Service does not support this mode');
  }
  if (step && !service) {
    throw new RangeError('Select a service before its times');
  }
  const query = new URLSearchParams();
  if (service) query.set('service', service.id);
  if (mode) query.set('mode', mode);
  if (step) query.set('step', step);
  return query.size ? '/book?' + query.toString() : '/book';
}
