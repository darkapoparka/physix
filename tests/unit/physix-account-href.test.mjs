import test from 'node:test';
import assert from 'node:assert/strict';
import { accountHref } from '../../src/features/physix/account-href.ts';

test('account home and deep links retain relationship, capture and fragment context', () => {
  assert.equal(accountHref('/'), '/account');
  assert.equal(accountHref('/workouts/w1/session?relationship=r1&capture=c1#sets'), '/account/workouts/w1/session?relationship=r1&capture=c1#sets');
  assert.equal(accountHref('/account/profile?relationship=r1'), '/account/profile?relationship=r1');
});

test('public, staff, provider, external and same-page links keep their boundaries', () => {
  for (const href of ['/bg', '/en/book', '/api/v1/me', '/auth/callback?code=x', '/coach/clients/1', '/app/coaches', '/login', '/review', 'https://example.com', '//example.com/path', '#sets', '/\\example.com']) {
    assert.equal(accountHref(href), href);
  }
});
