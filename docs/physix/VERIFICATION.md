# Verification and completion contract

Tests must prove behavior at the layer that owns it. Historical Gymaf checks describe their original commit and environment; they do not certify Physix. Start with the task acceptance criteria in [tasks.md](../../tasks.md), then use the relevant checks below.

## Evidence levels

| Level | What it proves | What it cannot establish alone |
|---|---|---|
| Source inspection | Actual routes, implementation, schema and missing pieces | Executed behavior |
| Unit/contract | Pure policy, calculations, DTOs and error semantics | Database isolation, provider delivery or rendered UX |
| Database integration | Constraints, transactions, migrations, policies and history | Real provider auth/session behavior |
| Browser with isolated backend | Rendered workflows and persisted outcomes for tested actors | Production configuration or all devices |
| Dedicated provider environment | Actual auth, private storage, notification/payment sandbox behavior | Live release approval |
| Exact release candidate | Hosted configuration, smoke journeys, migration and recovery rehearsal | Clinic content/policy acceptance |
| Clinic acceptance and release observation | Approved workflows on the approved candidate and observed launch | A guarantee of zero future defects |

Label results PASS, FAIL, BLOCKED or NOT RUN. State simulated components explicitly. A test skipped for unavailable credentials stays unverified. A screenshot of a reference capture cannot prove a client is authenticated or a write persisted.

## Required coverage

| Area | Required positive and failure evidence | Task owners |
|---|---|---|
| Identity | Sign-in/out, expired codes, session refresh/revocation, role changes; sibling client and unassigned staff denied | PX-006, PX-007, PX-035 |
| Booking | Browse, verify identity with draft preserved, confirm, retry, cancel, atomic reschedule, attendance | PX-012 through PX-018, PX-036 |
| Scheduling integrity | Simultaneous overlapping reservations, shared room/equipment collision, buffers, timezone/DST boundaries, staff closure and stale edit | PX-014, PX-017, PX-035 |
| Payment choice | Selected pay-at-center/deposit/prepayment/package path; no invented paid state; webhook retry/reordering if provider used | PX-019, PX-035, PX-038 |
| Care | Assign/publish version, start/resume/finish separate attempts, review feedback, change future plan without rewriting past | PX-021 through PX-023, PX-026, PX-036 |
| Messages/files | Correct participants, retry without duplicates, private upload/download, revoked access and lifecycle failure | PX-024, PX-032, PX-035 |
| Community | Approved visibility, opt-in, event capacity race, duplicate RSVP, cancellation, staff-only edits | PX-028 through PX-030, PX-035 |
| Privacy | Direct API/DB/storage denial, role changes, export scope, deletion/retention outcomes, logs and private-cache isolation | PX-007, PX-032, PX-035 |
| Locale | BG/EN routes, dates, errors, emails, consent text and accessible labels; context preserved on switch | PX-005, PX-031 |
| Rendering | Approved template comparison, new public design acceptance, overlays/history/empty/error states, keyboard and mobile | PX-001, PX-034 |
| Operations | Durable job retry, monitoring, fresh migration, upgrade migration, backup restore, environment isolation | PX-033, PX-038, PX-041 |

Use at least two synthetic clients, two therapists with different assignments, reception, admin and moderator actors; combine roles only in explicit tests. Include another clinic/workspace when the schema supports that boundary. Test unauthenticated requests and revoked assignments directly, not only hidden buttons.

## Visual and interaction protocol

1. PX-001 records route/capture ID, viewport, authentication mode, data fixture and source SHA for the preserved template. Record existing defects instead of silently redefining the baseline.
2. Compare each affected account surface at 393px and 1440px; check 320px reflow and 200% zoom. For clinic additions record the approved design direction and intentional differences.
3. Verify navigation, browser back/forward, refresh/deep links, dialogs, escape/focus return, keyboard use, reduced motion, long BG text, touch targets and mobile keyboard/safe areas.
4. Cover loading, empty, error, forbidden, offline/interrupted submission, conflict and successful states where applicable. Check console/network failures and horizontal overflow.
5. For writes, reload or sign in with the receiving staff/client actor and verify authoritative data. UI optimism is not persistence evidence.

The route matrix must enumerate each in-scope template surface and intentional retirement/adaptation. “All 270 screens are 1:1” requires an actual 270-item comparison; neither a handful of screenshots nor retaining source files establishes that claim.

## Commands and scope

Inspect `package.json` and environment guards first. Existing commands include `npm run typecheck`, `npm run lint`, `npm run test:unit`, `npm run test:auth`, `npm run build`, and `npm run test:integration`. Confirm each command's prerequisites before running it. Integration/seed work must target an isolated synthetic database. Never run a destructive reset against an unverified target.

Run focused tests for each behavioral change, then the required project checks at the integration/release gate. Use actual database concurrency tests for booking invariants and browser tests for complete journeys; do not write tests that merely repeat implementation constants. Do not run a production build concurrently with dev against the same `.next` output. Documentation-only changes need link/task-graph/diff checks, not application builds.

## Task completion record

Create `docs/physix/evidence/PX-NNN.md` using the [evidence template](evidence/README.md). Every acceptance criterion needs its result and artifact/command reference. Include exact code SHA or baseline plus pending diff, environment, synthetic actor/fixture, reproduction steps, expected versus observed outcome, known limitations and follow-up IDs. Refresh evidence after changes that invalidate it.

DONE requires all task acceptance criteria to pass, related contracts and handoff to be current, and no unresolved critical/high issue in the task's scope. A check awaiting a provider or owner decision is BLOCKED or VERIFY, not DONE. Intentional scope removal needs an explicit owner decision and a WAIVED ledger entry. Required data integrity, authorization and privacy checks cannot be waived into a passing release.

## Release gates

- PX-034: complete route/state visual and accessibility review with approved differences.
- PX-035: no unresolved authorization, private-data leakage or booking/history integrity failure.
- PX-036: all six product journeys pass with durable data, including retries and negative paths.
- PX-037: record and meet agreed route/bundle and response budgets on representative devices/data; choose measured budgets during baseline work, never invent a pass threshold afterward.
- PX-038: hosted candidate is tied to an exact SHA; migration/restore, provider configuration and smoke flows pass in isolated staging.
- PX-039: clinic signs off services, staff, prices, policies, BG/EN, assets and operational use. Record who approved what and when.
- PX-040: explicit publication authorization for that candidate and destination; production smoke checks pass without synthetic preview/backdoor configuration.
- PX-041: agreed observation window, operational ownership and recovery/support handoff complete; remaining nonblocking defects have owners and tasks.

If a release gate fails, retain evidence, add the defect to the ledger and return dependent work to the appropriate pending state. Passing local checks does not change a failed hosted or owner gate.
