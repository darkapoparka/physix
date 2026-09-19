# Saved local care and booking — verification

Date: 19 September 2026. Repository: M:\physix-app, main. Entry revision: e05fc20e5c17ee18e4f95f5bf079147b9c8496e5. Source revision will be recorded after the verified local checkpoint.

## Runtime and scope

Start: npm run dev. Patient entry: http://127.0.0.1:3217/login -> Open patient app. Saved patient routes: /app, /app/plans, /app/sessions/:id, /app/progress, /app/check-ins, /app/appointments. Saved test booking: /book and /app/book. Staff: /practitioner, /practitioner/patients, /practitioner/plans. The older /dev/demo remains memory-only.

At final inspection, Next listened on loopback 3217 with PID 37476; the original Fidelity on 3216 remained PID 23036. Verify PIDs on the next session. One local PostgreSQL process owns .artifacts/physix-local/pgdata. Synthetic test identities and records only. No donor environment, cloud provisioning, real clinic appointments, messages, purchases, charges or deployment.

The first four retained care migrations are unchanged. The source donor's eight-file dirty patch still hashes to 7e56d53bd1ba09c1be9053677df83c29668e875341a32a7b3da840ea24917b2f. New booking allocation SQL is explicitly local test infrastructure, not a published provider migration.

## Checks actually run

| Command | Result | Evidence |
|---|---|---|
| npm run typecheck | exit 0 | typecheck.log; final-exits.json |
| npm run lint | exit 0; two existing warnings in legacy coach.tsx | lint.log; final-exits.json |
| npm run test:unit | 74 passed | unit.log |
| npm run test:local-db | 31 passed | database-checks.json and database-checks.log |
| npm run build | exit 0 | build.log and build-final.log |
| npm run test:auth | 5 inherited isolated HTTP fixtures passed | http-contracts.log |
| node scripts/physix-production-check.mjs | 36 requests passed | production-isolation.json |
| npm run test:local-browser | 26 checks, 28 responsive captures passed | browser/results.json |
| node scripts/physix-local/layout-check.mjs | focused time/review at four widths, narrow statistics and persisted cancellation passed | booking-layout/results-with-cancellation.json; latest results.json |

The production test deliberately supplied both demo/local flags and still got SETUP_REQUIRED for the local APIs, no local login cookie and no local chooser. The HTTP fixture results do not prove real Supabase Auth or Stripe acceptance.

Database checks use separately named disposable stores and actual SQL, not mocks of successful writes. Tested: identity/ownership, direct table RLS denial, same-command retries, changed-payload conflicts, set records, pause/revision, close/reopen persistence, immutable completed history, distinct repeated attempts, shared check-ins, restricted public fields, UTC windows, overlapping reservations and cancellation/revocation. Local concurrent requests are serialized by one PGlite connection; multi-connection hosted concurrency remains untested.

## Browser evidence

The core saved journeys used a real page reload and checked performance.timeOrigin changed, not an assumed keyboard shortcut. A blocked save request remained dirty and did not increment saved records; retry succeeded. Tests completed reps/time/resistance, pause/resume, stored history/check-in, persisted booking, second-patient denial, practitioner review and assignment to the other patient. No uncaught errors or patient localStorage/sessionStorage.

Responsive captures cover 320x740, 390x844, 768x1000 and 1440x1000 for patient Home/plans/progress/appointments/check-ins/public booking and completed session. Additional focused time/review captures are under booking-layout (mobile height 844, desktop/tablet 1000). Test cancellation remains recorded, not deleted. Some sample accounts now contain the exercises and assignments performed by these checks.

A real time-step overflow discovered during screenshot review was corrected with minmax(0,1fr)/min-width:0 and an independently scrollable date rail. The mobile task action is visible without an overlapping dock. At 390px, the dock is now 348x64, from 358x68, with original Fidelity translucency/spacing. At 320px the percentage text fits and the account icon keeps its accessible name.

The 3216 browser navigation timed out and one stale screenshot was identified and moved to ignored debug storage. It is NOT Fidelity evidence. Restored navigation values come from the actual donor CSS. Exact visual parity or owner approval is not claimed.

## Not delivered or verified

No real verified patient Auth, MFA/recovery/role lifecycle, clinical approval, licensed final media/video library, complete practitioner authoring UI, guest claim/verification, configurable clinic availability/policies, holds/rescheduling, outside calendar conflict integration, notification outbox/reminders, real payment fulfilment or private messaging. The local test engine does not replace the separate proposed Supabase staging/production system. Real mobile devices, Bulgarian/200% text and full privacy/security/production acceptance remain outstanding. No release authorization.
