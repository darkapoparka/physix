import test from 'node:test';
import assert from 'node:assert/strict';
import {bookingHref} from '../../src/shared/physix/booking-link.ts';

const physio = {id: 'physiotherapy', modes: ['in_clinic', 'online']};
const sports = {id: 'sports-rehabilitation', modes: ['in_clinic']};

test('Default entry opens the public service picker', () => {
  assert.equal(bookingHref(), '/book');
});
test('Online discovery retains mode without guessing a service', () => {
  assert.equal(bookingHref({mode: 'online'}), '/book?mode=online');
});
test('An eligible selected online service opens its time step', () => {
  assert.equal(bookingHref({service: physio, mode: 'online', step: 'time'}),
    '/book?service=physiotherapy&mode=online&step=time');
});
test('A clinic-only service can open times without inventing an online mode', () => {
  assert.equal(bookingHref({service: sports, step: 'time'}),
    '/book?service=sports-rehabilitation&step=time');
});
test('A clinic-only service rejects an online booking entry', () => {
  assert.throws(() => bookingHref({service: sports, mode: 'online'}), RangeError);
});
test('A time step requires a selected service', () => {
  assert.throws(() => bookingHref({step: 'time'}), RangeError);
});
test('Unknown modes and steps are rejected at runtime', () => {
  assert.throws(() => bookingHref({mode: 'home_visit'}), RangeError);
  assert.throws(() => bookingHref({service: physio, step: 'confirm'}), RangeError);
});
test('Private fields and arbitrary return URLs are not serialized', () => {
  assert.equal(bookingHref({mode: 'online', patient: 'private', returnTo: 'https://example.invalid'}),
    '/book?mode=online');
});
test('Service input is not mutated and query values cannot escape their parameter', () => {
  const original = structuredClone(physio);
  bookingHref({service: physio, mode: 'online', step: 'time'});
  assert.deepEqual(physio, original);
  const href = bookingHref({service: {...physio, id: 'x&returnTo=https://example.invalid'}});
  const parsed = new URL(href, 'http://127.0.0.1:3217');
  assert.equal(parsed.pathname, '/book');
  assert.equal(parsed.searchParams.size, 1);
  assert.equal(parsed.searchParams.get('service'), 'x&returnTo=https://example.invalid');
});
