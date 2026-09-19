/** Local synthetic booking model. No availability provider, storage or reservations. */
export type PreviewVisitMode = 'in_clinic' | 'online';
export type BookingDraft = {
  serviceId: string;
  mode: PreviewVisitMode;
  slotId: string | null;
  acknowledged: boolean;
};
export type PreviewSlot = {
  id: string;
  day: string;
  startsAt: string;
  endsAt: string;
  available: boolean;
};
export type BookingReceipt = {
  kind: 'booking_preview';
  status: 'not_reserved';
  commandId: string;
  serviceId: string;
  mode: PreviewVisitMode;
  slot: PreviewSlot;
};
export const previewPatient = {
  name: 'Demo patient',
  email: 'patient@example.test',
} as const;
export const previewDays = ['2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25'] as const;
export const previewTimezone = 'UTC';
export const previewSlots: readonly PreviewSlot[] = previewDays.flatMap((day, dayIndex) =>
  ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time, timeIndex) => ({
    id: 'sample-' + day + '-' + time.replace(':', ''),
    day,
    startsAt: day + 'T' + time + ':00Z',
    endsAt: day + 'T' + time.slice(0, 2) + ':45:00Z',
    available: (dayIndex + timeIndex) % 4 !== 1,
  })),
);
export function newBookingDraft(): BookingDraft {
  return { serviceId: '', mode: 'in_clinic', slotId: null, acknowledged: false };
}
export function previewSlot(id: string | null): PreviewSlot | undefined {
  return previewSlots.find(slot => slot.id === id);
}
export function previewTime(instant: string): string {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: previewTimezone }).format(new Date(instant));
}
export function previewDate(instant: string, short = false): string {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: short ? 'short' : 'long', day: 'numeric', month: short ? 'short' : 'long',
    ...(short ? {} : { year: 'numeric' as const }), timeZone: previewTimezone,
  }).format(new Date(instant));
}
export function completeBookingPreview(
  draft: BookingDraft,
  service: { id: string; modes: readonly string[] } | undefined,
  commandId: string,
  prior: BookingReceipt | null = null,
): BookingReceipt {
  if (!service || service.id !== draft.serviceId || !service.modes.includes(draft.mode)) {
    throw new Error('Choose a service available for this appointment type.');
  }
  const slot = previewSlot(draft.slotId);
  if (!slot?.available) throw new Error('Choose an available example time.');
  if (!draft.acknowledged) throw new Error('Acknowledge that this is a demonstration first.');
  if (!commandId.trim()) throw new Error('A preview command identity is required.');
  if (prior?.commandId === commandId) {
    if (prior.serviceId !== draft.serviceId || prior.mode !== draft.mode || prior.slot.id !== slot.id) {
      throw new Error('This command has already been used for another selection.');
    }
    return prior;
  }
  return { kind: 'booking_preview', status: 'not_reserved', commandId, serviceId: service.id, mode: draft.mode, slot };
}
