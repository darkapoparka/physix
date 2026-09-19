# Delivery plan, acceptance and operations

## Current checkpoint — 19 September 2026

The independent source and local visual implementation now exist. Current status is in TASKS.md and SOURCE_PROVENANCE.md; the original all-NOT-STARTED backlog below is a historical planning baseline, not the present filesystem state.

Recovery verification: lint exit 0 (two unchanged legacy coach navigation warnings); typecheck exit 0; 68/68 unit tests; production build exit 0; 5/5 isolated loopback HTTP contract tests; 27 production isolation requests. Browser automation passed 53 booking checks at 320/390/768/1440 widths and 21 core checks with 21 route/viewport captures at 320/390/1440. See evidence/recovery-20260919/README.md for commands, artifacts and limits.

The new booking journey is development-only and explicitly not a reservation. No real provider, database concurrency, clinical content, payment, real-device, Bulgarian or 200% text acceptance is claimed. Technical verification is not owner visual approval.

## Delivery strategy

Work in vertical slices: one visible outcome, the state/data contract behind it, and the checks that prove it. Do not finish every marketing page before testing the patient experience. Do not call a labelled mock journey a working clinic system.

**Milestone 0 — visual foundation:** independent source bootstrap, explicit synthetic demo, approved Home/Book/My Plan/session design set. No real patient data or provider writes.

**Milestone 1 — connected clinic pilot:** actual authenticated patient/staff boundaries, configured approved services, working booking and patient appointment management, clinician-assigned plan and saved exercise session. The clinic can operate its essential workflow. No paid digital launch is implied.

**Milestone 2 — paid programmes and connected care:** real sandbox checkout/fulfilment, appropriate programme activation or assignment-pending state, private tracking/messages, staff review and operational recovery. This completes the central website-plus-purchased-plan product before launch gates.

**Later only when justified:** subscriptions, appointment-credit packages, two-way external calendar sync, progress uploads, installable/offline capabilities, native apps and broader staff analytics. None blocks designing a coherent initial product.

## Backlog

All implementation rows are **NOT STARTED for PhysiX** at this checkpoint. Donor code may reduce effort after inspection; it does not automatically mark a row complete.

| ID | Slice and dependency | Definition of done |
|---|---|---|
| PX00 | Bootstrap; next explicit implementation request | Independent canonical checkout, donor work preserved, selected patch accounted for, secrets excluded, provenance recorded, baseline checks reported |
| PX01 | Fidelity → PhysiX visual proof; PX00 | Current baseline captured; four coherent adapted screens plus empty state; loaded/rights-reviewed font choice; owner review recorded |
| PX02 | Public/auth/demo separation; PX00 | Public Home/Book/Plans accessible without auth, private routes enforced, explicit demo cannot call real providers, loading/error/auth recovery tested |
| PX03 | Clinic catalogue and staff availability; PX02 | Approved content/config, simple staff schedule editor, timezone/buffers/exceptions and no public private-calendar leakage |
| PX04 | Real booking + patient appointments; PX03 | Guest/account booking, atomic conflict tests, persisted confirmation, safe claim/manage flow, staff visibility, reschedule/cancel, delivery outbox |
| PX05 | Versioned care assignment + session; PX02 | Practitioner publishes/assigns reviewed plan; patient sees it, saves/resumes/completes an attempt; immutable history and other-patient denial |
| PX06 | Programme storefront + one-time purchase; PX05 | Approved offers, correct purchaser identity, sandbox checkout, webhook/reconciliation, exactly-one entitlement, pending assignment when appropriate |
| PX07 | Tracking + private text messages; PX05 | Clinician-approved check-ins, truthful history/adherence, authorized messages, retry/no-fake-success and ended-relationship tests |
| PX08 | Staff operations and account lifecycle; PX04–07 | Staff can operate offerings/assignments/reviews without SQL; scoped roles, audit, export/request workflow, payment exceptions and support recovery |
| PX09 | Responsive/accessibility/localization finish; continuous, final after PX08 | Required widths/text/languages and keyboard/device checks; bounded visual owner acceptance per primary screen |
| PX10 | Production readiness and controlled pilot; PX04–09 | Clinic/legal/content sign-off, isolated production configuration, backup/restore, monitoring, provider acceptance and explicit release approval |

Use a small synthetic scenario: one clinic, one practitioner, two patients (one as the negative-access case), two service modes and one reviewed-placeholder programme. It is test data, not published clinical content. Add more accounts/resources only to cover a concrete edge case.

## Baseline checks

Observed donor scripts: `npm run lint`, `npm run typecheck`, `npm run test:unit`, `npm run test:auth`, `npm run build`, `npm run test:integration`. Verify the actual scripts after bootstrap. `npm ci` is the lockfile install path. Provider/integration scripts may have environment preconditions; inspect them before running.

Do not rerun destructive local database scripts or seed commands against an unknown connection. Use disposable synthetic tests with target assertions. Historical donor test counts are not current PhysiX evidence. This planning session ran no application build, unit tests, browser mutation journey or database suite.

## Acceptance matrix

| Area | Mandatory evidence |
|---|---|
| UI | 320px, primary ~390px mobile, tablet and ~1440px desktop; no document overflow; real font/media load; readable 200% text; EN/BG long-label check |
| Keyboard/device | Visible focus, correct labels, sheet focus/return, Escape/Back, on-screen keyboard clearance, reduced motion; real mobile browser verification before release |
| Auth | Fresh sign-in, expired session/link, logout/account switch, refresh failure and revoked role; finite loading and recoverable errors |
| Booking | Server persistence, concurrent last-slot attempts, varied duration/buffers, DST, expired hold, retry, reschedule preserving original on failure |
| Commerce | Signed provider event, sandbox success/failure/pending, duplicate/out-of-order delivery, wrong amount/owner/environment denial, exact entitlement, refund/expiry isolation |
| Care | Published-version pinning, assignment ownership, prescribed/actual separation, interrupted save, resume/new attempt distinction, explicit shared check-in visibility |
| Privacy | Patient A/B and unrelated clinician tests via API/database/storage/cache/export; no health data in analytics, emails or raw logs; demo production exclusion |
| Operations | Outbox retry/replay, hold cleanup, payment exception reconciliation, backup restoration and a named support/incident path |

Store evidence under a single bounded `docs/physix/evidence/<slice>-<date>/` or ignored local artifact location with a small checked-in summary. Include source SHA/dirty-diff identity, exact command and result, viewport/route/mode, provider environment and known limitations. Screenshots alone do not prove persistence; mock HTTP tests do not prove real provider delivery.

## Feature-completion rules

A feature can be specified, source-implemented, locally tested, provider-verified, visually approved and release-approved at different times. Record those separately. “Not run” is different from “failed” and both are different from “blocked by missing clinic facts.”

No slice is done while its main action is a placeholder, its API falls back to demo success, its critical negative case is untested, or its saved state disappears after reload. Exact pixel fidelity is not claimed merely because code compiles.

## Release checklist and operational ownership

Before a real-patient pilot, verify the legal clinic identity, services, clinical content/media approval, notices/policies, lawful processing design, role matrix and patient eligibility. Confirm the actual merchant account, currency/tax/invoice/refund treatment and response expectations with the clinic and appropriate advisers.

Assign a clinic operator to daily schedule/payment exceptions and a technical operator to outages, outbox failures and backups. Alerts contain minimal operational identifiers, not symptom content. Provide safe retry/reconciliation procedures that do not duplicate bookings, grants or charges.

Test backup and restoration on a non-production target; agree recovery objectives with the owner rather than inventing them. Review data retention and deletion/export procedures, restore-time access controls, secrets management, staff MFA/recovery, release rollback and dependency/security checks.

Deploy only with explicit authorization, real environment separation and a release record. A Git commit, successful build or preview URL is not clinic approval or permission to process real health data. No deployment budget or delivery date is promised by this plan; estimate after the bootstrap and first connected slice reveal actual reuse quality.


## Saved local workflow checkpoint — 19 September 2026

The local-test app now persists assigned sessions, actuals/history, shared sample check-ins and test bookings in PostgreSQL on this PC. Practitioner review and assigning an existing published sample version are browser-tested. Current results: 74 unit tests, 31 local database checks, 26 browser checks with 28 responsive route captures, focused four-width booking/cancellation checks, five inherited HTTP fixtures and 36 production-exclusion requests. Typecheck, lint and build pass; two pre-existing coach navigation warnings remain. See evidence/persistence-20260919/README.md and result files.

These results advance local implementation only. PX03–08 remain partial against the full clinic contracts; provider identity, clinic configuration, operational booking, clinical content, commerce and messaging are not released. Do not count an in-memory demo or a local account chooser as verified clinic delivery.
