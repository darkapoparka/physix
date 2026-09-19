# Recovery and booking-preview verification — 19 September 2026

## Source and runtime

Canonical checkout: M:\physix-app, branch main. Recovery-entry HEAD: 5e7c6a1ab121d3e214d8904e3ef63691a102a831. Imported donor source: M:\gym-fidelity, review/mobbin-fidelity, 60582a5f3037375782e450fcd09f5d8aaf7ce94e. The entry checkpoint already preserved the eight-file source correction patch, independently verified byte-for-byte against the current donor diff. See source-check.json.

This session recovered an already-existing independent checkout and four-screen adaptation, not an empty planning folder. It then implemented the in-memory booking preview and repaired navigation, mobile dock obstruction and menu dismissal. Before editing, current files were backed up under ignored .artifacts/recovery-start-20260919. No donor checkout was written, reset, staged or committed.

Existing development server retained: npm run dev → node scripts/physix-dev.mjs → Next dev, hostname 127.0.0.1, port 3217, listener PID 38400 at inspection. Explicit PHYSIX_DEMO=1. Node v24.21.0 / npm 11.19.0. Original Fidelity on 3216, PID 23036, was left intact.

Tested source checkpoint: **05e84daff0839440e1d36fef466efc466354b828** — feat: adapt Fidelity into PhysiX with isolated booking and care previews. The follow-up commit records this source SHA and changes verification documentation only. Both are local; no push was performed. The existing bootstrap used the synthetic identity PhysiX Local Agent <physix-local@localhost>; the same identity was applied using command-scoped git -c options because this new repository had no configured author. No global or repository identity configuration was changed.

## Commands actually run during recovery

| Command | Exit / result | Evidence |
|---|---|---|
| npm run lint (entry baseline) | 0; two legacy warnings | terminal baseline; lint-after.txt and final log |
| npm run typecheck (entry baseline) | 0 | terminal baseline |
| npm run test:unit (entry baseline) | 0; 61/61 | baseline-unit.txt |
| npm run lint (final) | 0; two unchanged warnings in legacy features/gymaf/coach.tsx lines 34 and 62 | lint-final.log |
| npm run typecheck (final) | 0 | typecheck-final.log |
| npm run test:unit (final) | 0; 68/68 | unit-final.log |
| npm run build | 0 | build-final.log |
| npm run test:auth | 0; 5/5 isolated loopback HTTP contract tests | http-final.log |
| node scripts/physix-production-check.mjs | 0; 27 production HTTP checks with PHYSIX_DEMO deliberately set to 1 | production-isolation.json, production-final.log |
| node scripts/physix-booking-browser-check.mjs | 0; 53 checks, 20 route/viewport captures | booking-browser-results.json, booking-console.json |
| node scripts/physix-browser-check.mjs | 0; 21 checks, 21 route/viewport captures plus state screenshots | core/browser-results.json, core/browser-console.json |

The core browser run set PHYSIX_BROWSER_SESSION=physix-core-recovery and PHYSIX_EVIDENCE_DIR=docs/physix/evidence/recovery-20260919/core. The production run set PHYSIX_PRODUCTION_EVIDENCE=docs/physix/evidence/recovery-20260919/production-isolation.json. The dedicated agent-browser session was opened before invoking each synchronous test on Windows.

npm ci was NOT rerun during recovery; the existing installation and lockfile were preserved. Earlier install logs in foundation-20260919 are historical evidence. No database integration/reset/seed command was run. The five HTTP tests use local synthetic provider fixtures, not hosted Supabase/Stripe or real patient identities.

## Browser routes, viewports and states

Booking journey at 390×844, 320×740, 768×1024 and 1440×1000:
/dev/demo/book → /dev/demo/book/time → /dev/demo/book/details → /dev/demo/book/review → /dev/demo/book/complete → /dev/demo.

Each width captured booking-time, booking-details, booking-review, booking-complete and patient-with-booking-preview. Filenames end in -390.png, -320.png, -768.png or -1440.png. Exact mappings are in booking-browser-results.json. State: a synthetic Physiotherapy example, Monday 21 September 2026, initial 09:00 changed to 11:00 UTC, fixed patient@example.test contact. These are fixture values, not actual clinic availability or patient details.

Core captures at 390×844, 320×740 and 1440×1000 cover /, /book, /plans, /dev/demo, /dev/demo/plans, /dev/demo/plans/demo-plan and /dev/demo/sessions/demo-session. Extra snapshots cover unavailable live booking, failed demo save, and empty/pending/purchased accounts. See core/browser-results.json and individual screenshot names.

Verified: service filtering; disabled unavailable sample times; selected state; full date/time/UTC review; Back preserves selection; time change resets acknowledgement; no editable personal contact data; fixed synthetic details; preview result never claims reservation; chosen example appears on patient Home; menu sheet dismisses on link navigation; exercise state survives Book navigation; fresh deep links recover honestly after memory reset; dialog focus/Escape restoration; demo retry and pause; real account/staff routes never show fixtures. Document overflow and broken images were checked at the recorded widths. Both suites recorded zero uncaught browser errors.

The screenshots of mobile booking time, narrow review, patient Home, session and desktop Home/time were also visually inspected. Technical checking is not owner visual approval or exact Fidelity parity. The fresh attempt to open the donor on 3216 timed out; process ownership was verified, but no new donor visual comparison is claimed.

## Failures caught and corrected

Early browser runs found the dock covering Continue; focused booking steps now suppress it. Review links were separated from service text. Menu row links now close their sheet. The deep-link reset test now pauses/leaves the exercise player instead of dismissing its intended unsaved-work protection. Initial test-script selector quoting and a Windows daemon first-launch pipe timeout were corrected. booking-browser-failure.txt preserves an earlier failed run for diagnosis; the final booking-browser-results.json and both zero exits are the authoritative rerun results.

## Explicit limits

All appointment and exercise activity is synthetic, development-only and scoped to memory. Booking uses no provider API and no persistence. It does not create an appointment, charge, confirmation email, calendar reservation or clinical record. Real patient sign-in, practitioner authorization, live availability, concurrency, durable saved exercise history, approved media/instructions, payments and messages are not connected by this work.

Production rejects every demo booking route even with PHYSIX_DEMO=1. This proves the tested route boundary, not a full security audit or cleanup of all inherited public reference assets. Candidate media/identity/font rights and final content remain release gates. No Bulgarian, 200% text, real mobile-device, real-provider, database concurrency, clinical/legal or deployment acceptance is claimed. There was no push, hosted provisioning, live payment or deployment.
