import test from 'node:test';
import assert from 'node:assert/strict';
import { completeBookingPreview, newBookingDraft, previewSlots, previewSlot, previewDate, previewTime, previewPatient } from '../../src/shared/physix/booking-preview.ts';
const service = { id: 'physiotherapy', modes: ['in_clinic', 'online'] };
const available = previewSlots.find(slot => slot.available);
const draft = () => ({ ...newBookingDraft(), serviceId: service.id, slotId: available.id, acknowledged: true });
test('booking preview is explicitly not a reservation and carries no entered personal data', () => {
  const receipt = completeBookingPreview(draft(), service, 'test-command');
  assert.equal(receipt.kind, 'booking_preview');
  assert.equal(receipt.status, 'not_reserved');
  assert.equal('patient' in receipt, false);
  assert.equal(previewPatient.email, 'patient@example.test');
});
test('preview rejects unknown services and unavailable modalities', () => {
  assert.throws(() => completeBookingPreview(draft(), undefined, 'command'));
  assert.throws(() => completeBookingPreview(draft(), { ...service, id: 'other' }, 'command'));
  assert.throws(() => completeBookingPreview({ ...draft(), mode: 'online' }, { ...service, modes: ['in_clinic'] }, 'command'));
});
test('preview rejects absent, invented and unavailable times', () => {
  for (const slotId of [null, 'invented', previewSlots.find(slot => !slot.available).id]) {
    assert.throws(() => completeBookingPreview({ ...draft(), slotId }, service, 'command'));
  }
});
test('acknowledgement and command identity are required', () => {
  assert.throws(() => completeBookingPreview({ ...draft(), acknowledged: false }, service, 'command'));
  assert.throws(() => completeBookingPreview(draft(), service, ''));
});
test('unchanged preview retries return the original result and changed payloads conflict', () => {
  const first = completeBookingPreview(draft(), service, 'same');
  assert.strictEqual(completeBookingPreview(draft(), service, 'same', first), first);
  const other = previewSlots.find(slot => slot.available && slot.id !== available.id);
  assert.throws(() => completeBookingPreview({ ...draft(), slotId: other.id }, service, 'same', first));
});
test('example slots have distinct identities, full instants, and a 45-minute sample duration', () => {
  assert.equal(new Set(previewSlots.map(slot => slot.id)).size, previewSlots.length);
  for (const slot of previewSlots) {
    assert.equal(new Date(slot.endsAt) - new Date(slot.startsAt), 45 * 60 * 1000);
    assert.equal(slot.startsAt.endsWith('Z'), true);
    assert.strictEqual(previewSlot(slot.id), slot);
  }
});
test('date and time formatting uses explicit UTC, not the browser timezone', () => {
  assert.equal(previewTime('2026-09-21T09:00:00Z'), '09:00');
  assert.match(previewDate('2026-09-21T09:00:00Z'), /Monday, 21 September 2026/);
  assert.equal(previewSlot('missing'), undefined);
});
