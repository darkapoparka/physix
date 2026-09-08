# Physix task ledger

Updated: 8 September 2026. This is the single source of implementation status for `M:/phys1x`. Read [AGENTS.md](AGENTS.md), the [current handoff](docs/physix/SESSION.md), [decisions](docs/physix/DECISIONS.md) and the selected feature contract before acting.

**Current authorization: create documentation.** PX-000 is the documentation deliverable. PX-001 through PX-041 define the future web v1; none is completed by copying the source or writing this plan. PX-042 is deferred native work outside v1.

## How to execute and track

- READY means dependency-ready within the plan; it is not permission to exceed the user's current request. On an execution request, inspect source and choose a coherent ready task.
- Dependencies require DONE or a valid owner-approved scope waiver. The policy column adds decision gates; task dependencies alone do not resolve them. Confirmed decisions persist. Do not ask the same question again.
- PX-002 tracks the full input collection. Individual tasks may proceed once their own decisions resolve; they do not all depend on PX-002 finishing. Synthetic defaults can support isolated tests while a task stays pending, but cannot become published clinic policy.
- Before editing, set the selected row to IN_PROGRESS, replace “unclaimed” with an executor/session identifier, and record scope/acceptance in the session handoff. Check dirty-file ownership; do not reset another session's work.
- Keep one coherent active slice per executor. Independent work is allowed when blocked elsewhere. Record partial acceptance in the evidence file; do not mark the whole task DONE from a partial implementation.
- After work, link `docs/physix/evidence/PX-NNN.md`, update the row, decisions/contracts as needed, current handoff and append-only session log. Evidence must identify the tested code revision, environment and checks.
- New work/defects get the next unused PX identifier, explicit severity, dependencies and acceptance criteria; never renumber existing tasks. A discovered release blocker is part of v1 even if its ID is above PX-042. Update the affected downstream gates and v1 scope list.
- No automatic PR, remote creation, merge, provider provisioning or publication is implied by this ledger. Continue within the user's actual authorization and finish a concrete reviewable candidate before any required final approval.

## Status definitions

| Status | Meaning |
|---|---|
| TODO | Work remains; prerequisites or scope have not yet been qualified |
| READY | Prerequisites currently satisfied; work can be selected when authorized |
| IN_PROGRESS | Claimed and actively being implemented; acceptance remains incomplete |
| BLOCKED | Record exact missing decision/provider/input, affected criteria and next action |
| VERIFY | Implementation exists; required acceptance evidence is still pending |
| DONE | All task criteria passed with current evidence and handoff updated |
| WAIVED | Explicit owner-approved scope removal with date, reason and affected release claims; never a hidden failed gate |
| DEFERRED | Outside current release, explicitly identified |

Authorization, privacy, booking collision safety and historical data integrity cannot be waived into a passing product. Community and unused payment alternatives may be narrowed by an explicit owner decision; update every affected contract and journey. A failed check is never a scope waiver.

## Ordered work inventory

Policy IDs resolve in [DECISIONS.md](docs/physix/DECISIONS.md). Detailed acceptance follows this table. Owner/claim and status live only here.

| ID | Task | Depends on | Policy gates | Status | Owner / claim | Evidence |
|---|---|---|---|---|---|---|
| PX-000 | Create the execution plan | — | — | DONE | Codex / 2026-09-08 | [Record](docs/physix/evidence/PX-000.md) |
| PX-001 | Audit and freeze the actual baseline | PX-000 | — | READY | unclaimed | — |
| PX-002 | Record clinic inputs and policy decisions | PX-000 | D-020 through D-029 | READY | unclaimed | — |
| PX-003 | Introduce website, account and staff route boundaries | PX-001 | — | TODO | unclaimed | — |
| PX-004 | Isolate Physix runtime and application identity | PX-001 | — | TODO | unclaimed | — |
| PX-005 | Build Bulgarian and English locale foundations | PX-003 | — | TODO | unclaimed | — |
| PX-006 | Connect a dedicated Physix backend and authentication | PX-001, PX-004 | D-027 | TODO | unclaimed | — |
| PX-007 | Enforce clinic roles and record ownership | PX-006 | — | TODO | unclaimed | — |
| PX-008 | Separate feature services and reusable API contracts | PX-003, PX-007 | — | TODO | unclaimed | — |
| PX-009 | Prepare Physix brand, fonts and approved assets | PX-001 | D-028 | TODO | unclaimed | — |
| PX-010 | Build the public clinic website | PX-003, PX-005, PX-009 | D-021, D-028 | TODO | unclaimed | — |
| PX-011 | Publish accurate services and therapist information | PX-008, PX-010 | D-021, D-022 | TODO | unclaimed | — |
| PX-012 | Define clinic booking schema and policy contracts | PX-008 | D-020, D-022, D-023 | TODO | unclaimed | — |
| PX-013 | Calculate real service and resource availability | PX-012 | D-022, D-023 | TODO | unclaimed | — |
| PX-014 | Implement atomic booking, cancellation and rescheduling | PX-012, PX-013, PX-007 | D-020, D-023 | TODO | unclaimed | — |
| PX-015 | Complete the public booking journey | PX-005, PX-011, PX-014, PX-006 | D-020, D-023 | TODO | unclaimed | — |
| PX-016 | Complete client appointment management | PX-014, PX-020 | D-023 | TODO | unclaimed | — |
| PX-017 | Build staff calendar and attendance operations | PX-014, PX-027 | D-022, D-023 | TODO | unclaimed | — |
| PX-018 | Deliver reliable booking notifications | PX-014, PX-006 | D-027 | TODO | unclaimed | — |
| PX-019 | Implement the selected payment and credit model | PX-014, PX-008 | D-024 | TODO | unclaimed | — |
| PX-020 | Adapt the retained account home and navigation | PX-003, PX-005, PX-008 | — | TODO | unclaimed | — |
| PX-021 | Deliver versioned care plans and exercise assignments | PX-008, PX-020 | D-025, D-028 | TODO | unclaimed | — |
| PX-022 | Complete exercise sessions and durable client logs | PX-021 | D-025 | TODO | unclaimed | — |
| PX-023 | Implement approved progress and check-ins | PX-022, PX-025 | D-025 | TODO | unclaimed | — |
| PX-024 | Complete private messaging and media | PX-008, PX-020 | D-025 | TODO | unclaimed | — |
| PX-025 | Build client profile, intake and document flows | PX-008, PX-020, PX-005 | D-023, D-025 | TODO | unclaimed | — |
| PX-026 | Complete therapist client review workflows | PX-021, PX-022, PX-023, PX-024, PX-025 | D-025 | TODO | unclaimed | — |
| PX-027 | Build clinic administration and policy management | PX-007, PX-008, PX-012 | D-022, D-023, D-025 | TODO | unclaimed | — |
| PX-028 | Define community visibility and event data | PX-007, PX-008 | D-026 | TODO | unclaimed | — |
| PX-029 | Build client/public community and event participation | PX-028, PX-005, PX-010 | D-026 | TODO | unclaimed | — |
| PX-030 | Build staff community publishing and moderation | PX-028, PX-027 | D-026 | TODO | unclaimed | — |
| PX-031 | Finish Bulgarian/English coverage and content review | PX-005, PX-010, PX-011, PX-015, PX-016, PX-017, PX-018, PX-019, PX-020, PX-021, PX-022, PX-023, PX-024, PX-025, PX-026, PX-027, PX-029, PX-030, PX-032 | D-028 | TODO | unclaimed | — |
| PX-032 | Implement privacy lifecycle, export and retention | PX-007, PX-019, PX-024, PX-025, PX-028 | D-025 | TODO | unclaimed | — |
| PX-033 | Add operational monitoring, retries and recovery | PX-006, PX-018, PX-019, PX-032 | D-027, D-029 | TODO | unclaimed | — |
| PX-034 | Complete visual, accessibility and interaction acceptance | PX-031 | D-028 | TODO | unclaimed | — |
| PX-035 | Qualify security and database integrity | PX-007, PX-014, PX-019, PX-022, PX-024, PX-025, PX-028, PX-030, PX-032, PX-033 | — | TODO | unclaimed | — |
| PX-036 | Verify complete clinic journeys end to end | PX-015, PX-016, PX-017, PX-018, PX-019, PX-020, PX-021, PX-022, PX-023, PX-024, PX-025, PX-026, PX-027, PX-029, PX-030, PX-031, PX-035 | — | TODO | unclaimed | — |
| PX-037 | Meet measured performance and maintainability budgets | PX-003, PX-034, PX-036 | — | TODO | unclaimed | — |
| PX-038 | Qualify the exact candidate in dedicated staging | PX-033, PX-034, PX-035, PX-036, PX-037 | D-027 | TODO | unclaimed | — |
| PX-039 | Obtain clinic acceptance of the release candidate | PX-002, PX-009, PX-038 | D-020 through D-029 | TODO | unclaimed | — |
| PX-040 | Release the approved candidate and verify production | PX-039 | D-027, D-029 | TODO | unclaimed | — |
| PX-041 | Complete stabilization and operational handoff | PX-040 | D-029 | TODO | unclaimed | — |
| PX-042 | Plan native clients after web v1 | PX-041 | Separate future scope | DEFERRED | unclaimed | — |

## Acceptance by task

Paths below describe intended ownership. PX-001 must verify actual source locations; adjust a path through the architecture contract rather than forcing an inaccurate directory plan. All tasks use the [evidence template](docs/physix/evidence/README.md) and [verification rules](docs/physix/VERIFICATION.md).

### PX-000 — Create the execution plan

- Scope: Canonical docs and root instructions.
- Done when: Product, architecture, feature contracts, decision register, task ledger and session handoff agree; local links and task dependencies validate. Application source remains unchanged.
- Verify: Read-only Markdown/link/dependency checks and git diff --check.

### PX-001 — Audit and freeze the actual baseline

- Scope: Source, routes, schema and template evidence.
- Done when: Inventory existing routes, backend capabilities, all 18 migration assumptions and all in-scope reference captures. Record retained/adapted/retired surfaces, known defects and missing behavior without calling partial coverage 1:1. Capture representative BG-ready mobile/desktop geometry and proposed performance budgets.
- Verify: Source-to-route matrix, representative 393/1440 captures, 320px check, actual provider/configuration inventory; no secret values.

### PX-002 — Record clinic inputs and policy decisions

- Scope: Decision register and owner input sheet.
- Done when: Ask only unanswered clinic questions and record answers, source/date and affected tasks. Resolve required v1 business choices or record explicit scope decisions. Keep unresolved items OPEN and their dependent tasks blocked; independent work may continue before this task is complete.
- Verify: Review every OPEN decision against service/content/booking/payment/privacy/community/launch gates; no invented owner approval.

### PX-003 — Introduce website, account and staff route boundaries

- Scope: Next routes, layouts and shared navigation.
- Done when: Separate public, account and staff layout composition behind stable routes while retaining the original account component hierarchy. Map existing URLs/deep links and redirects; avoid a global client entry importing every feature. Keep preview routing explicit and development-only.
- Verify: Route/deep-link/back/refresh checks; original account before/after captures and bundle import inspection.

### PX-004 — Isolate Physix runtime and application identity

- Scope: Runtime scripts, namespaces and development configuration.
- Done when: Use Physix port 3214 consistently; isolate cookie/storage/cache/environment identity from Gymaf. Inventory copied assets and capture plumbing. Synthetic captures remain explicit and cannot populate real accounts or enable production access; source projects remain untouched.
- Verify: Listener/project proof, separate-session test, production preview-guard checks and sanitized environment-name inventory.

### PX-005 — Build Bulgarian and English locale foundations

- Scope: Locale routing, dictionaries and formatting.
- Done when: Implement typed BG/EN messages and locale routes with BG initial fallback; switching preserves page and safe draft context. Separate domain identifiers from display text and format dates in the clinic timezone. Establish key-parity and locale smoke checks.
- Verify: BG/EN route, refresh, auth-return, context-preservation and missing-key tests.

### PX-006 — Connect a dedicated Physix backend and authentication

- Scope: Isolated database, auth, storage and environment setup.
- Done when: Verify provider ownership and authorized setup; apply reviewed inherited migrations only to a separate synthetic environment and document actual schema. Real sign-in, invitation acceptance, session refresh/sign-out, staff MFA/recovery and private storage configuration work without source credentials or local auth bypasses. Expired invitations and external return URLs are rejected.
- Verify: Fresh migration evidence and real provider sign-in/out/expiry/invitation/MFA tests; record credential-free environment manifest and exact provider target.

### PX-007 — Enforce clinic roles and record ownership

- Scope: Server authorization and database policies.
- Done when: Implement visitor/client/assigned therapist/reception/admin/moderator permissions and explicit role combinations. Deny sibling-client, unassigned-staff and other-workspace access at server/database boundaries. Revocation, role changes and clinical versus operational access work independently of UI visibility. Enforce safe origin/CSRF handling and rate limits for auth, booking, uploads and enumeration, without exposing patient account existence.
- Verify: Direct API/DB negative tests with multiple actors, revoked sessions/assignments and least-privilege DTO checks.

### PX-008 — Separate feature services and reusable API contracts

- Scope: Feature modules, server services, DTOs and adapters.
- Done when: Extract reusable identity/clinic/booking/care/message/community/billing boundaries incrementally. Reuse functioning source commands via explicit adapters; keep domain policies independent of React and provider SDKs. Define input validation, error codes and idempotency conventions for later mobile clients.
- Verify: Contract tests and dependency/import inspection; existing account journeys remain usable and visually preserved.

### PX-009 — Prepare Physix brand, fonts and approved assets

- Scope: Brand/content inventory and design tokens.
- Done when: Record approved name/logo/fonts/images and rights; ensure Cyrillic support. Preserve the original account typography roles, proportions and visual hierarchy. Record deliberate asset differences, with no fabricated credentials/testimonials or unapproved copied assets in release content.
- Verify: Asset provenance inventory, BG glyph review and template comparison at mobile/desktop.

### PX-010 — Build the public clinic website

- Scope: Public layouts, home, clinic/about/contact and metadata.
- Done when: Create an approved clinic-specific public design using real content and clear Book/My account entry points. Keep the existing account application accessible and visually intact. Provide responsive BG/EN pages, truthful clinic/contact details and accessible navigation; do not restore the rejected generic landing branch.
- Verify: Rendered mobile/desktop review against approved direction, link/navigation/form/metadata checks in both languages.

### PX-011 — Publish accurate services and therapist information

- Scope: Service/therapist directory and detail pages.
- Done when: Use approved service descriptions, durations, eligible therapists and truthful price presentation. Public data excludes private schedules/client records. Service-specific booking entry preserves the selected service; inactive services cannot be booked.
- Verify: Directory/detail/empty/unavailable tests plus public DTO and booking-entry checks.

### PX-012 — Define clinic booking schema and policy contracts

- Scope: Booking migrations, models and decision-backed rules.
- Done when: Model services, resources, eligibility, availability, appointment snapshots and policy revisions. Implement the approved assessment/direct-booking and confirmation model. Specify status transitions, time/buffer semantics, idempotency and independent payment state with an additive migration strategy.
- Verify: Schema/contract review and fresh/upgrade migration tests against the BOOKING contract's reservation invariants.

### PX-013 — Calculate real service and resource availability

- Scope: Availability engine and read endpoints.
- Done when: Calculate slots from clinic timezone, staff shifts, service eligibility/duration, buffers, closures and required rooms/equipment. Apply approved horizon/cutoffs; any-therapist selection exposes only valid choices. Never treat client-displayed availability as reservation authority.
- Verify: Boundary, closure, DST, buffer and multiple-resource tests using fixed clocks and realistic synthetic schedules.

### PX-014 — Implement atomic booking, cancellation and rescheduling

- Scope: Database constraints and booking commands.
- Done when: Enforce staff/resource collision rules in the database; retries cannot create duplicates. Reschedule atomically preserves the old appointment when a new slot fails. Cancellation, overrides and status transitions use approved policy snapshots and auditable server commands; durable notification events commit with writes.
- Verify: Concurrent-client/staff reservations, shared-resource collisions, retry payload mismatch, failed reschedule and cutoff/override tests.

### PX-015 — Complete the public booking journey

- Scope: Public booking UI and authentication return.
- Done when: Browse service/therapist/time before authentication, preserve safe selection through verification and revalidate before committing. Show clear conflict/retry/expiry states and complete booking confirmation with locale/timezone/policy context. Apply the chosen assessment/approval model with accurate status labels.
- Verify: Browser journeys for new and returning clients, competing slot selection, interrupted auth and refresh; confirm persisted appointment.

### PX-016 — Complete client appointment management

- Scope: Account appointments, detail/history and change flows.
- Done when: Show the client's actual upcoming/past visits with policy-aware cancel/reschedule actions. Failure never loses the original visit or falsely confirms a change. Distinguish attendance, cancellation and payment states; support deep links and honest empty/error states.
- Verify: Client book/change/cancel/history browser flows, stale updates and sibling-client denial.

### PX-017 — Build staff calendar and attendance operations

- Scope: Staff scheduling, calendar and visit status.
- Done when: Staff can view authorized appointments, book permitted clients, manage closures and record attendance/no-show with audits. Respect rooms, therapists, buffers and stale revisions; overrides do not silently bypass collision constraints. Define how existing visits are handled when availability changes.
- Verify: Multi-staff collision/edit tests, calendar navigation/timezones, attendance history and reception clinical-access denial.

### PX-018 — Deliver reliable booking notifications

- Scope: Outbox worker, email templates and delivery status.
- Done when: Send approved localized confirmations/changes/cancellations through a configured provider from durable committed events. Retry safely without misleading duplicate notifications; surface failure to authorized staff. Links carry safe scope and no clinical content leaks into templates/logs.
- Verify: Provider sandbox delivery, retry/crash/replay, cancellation/reschedule ordering and BG/EN timezone checks.

### PX-019 — Implement the selected payment and credit model

- Scope: Billing policy, provider adapter or pay-at-center path.
- Done when: Implement only the owner-selected pay-at-center/deposit/prepayment/package model with clear prices and settlement status. If credits are chosen, use an auditable ledger for grants, holds, consumption, expiry and reversal with approved rules; do not inherit Gymaf subscriptions/guest passes. Provider mode needs verified webhook ordering, retries, refund and late-payment reconciliation. Pay-at-center needs accurate unpaid/manual-settlement controls.
- Verify: Selected-path integration and browser tests; concurrency/idempotency, reconciliation and permission tests. Record why unused alternatives are outside scope.

### PX-020 — Adapt the retained account home and navigation

- Scope: Original Future Pro home, navigation and data adapters.
- Done when: Retain the original visual hierarchy and interaction patterns while showing actual next appointment, assigned plan and therapist context. Add discoverable appointments/community entry without replacing the app with a generic dashboard. New accounts have truthful empty states without a forced irrelevant profile gate.
- Verify: Original-versus-Physix account captures, real-data/empty/error navigation and direct-route checks.

### PX-021 — Deliver versioned care plans and exercise assignments

- Scope: Exercise catalog, plan editor, versions and assignments.
- Done when: Reuse valid program/version primitives with approved rehabilitation content and structured prescriptions. Publish immutable versions and dated client assignments; editing drafts cannot rewrite completed history. Enforce therapist assignment access and accurate draft/published labels.
- Verify: Publish/assign/revise/retire flow tests, historical version immutability and unauthorized assignment denial.

### PX-022 — Complete exercise sessions and durable client logs

- Scope: Session player, attempts, progress save and feedback.
- Done when: Preserve the template session experience using assigned care-plan versions. Each attempt has a stable identity; refresh, retry and resume preserve actual history without duplicate completion. Separate adherence and client feedback from clinical outcomes and do not relabel workout metrics as medical measurements.
- Verify: Start/resume/finish/retry browser and persistence tests; multiple attempts, stale version and network interruption.

### PX-023 — Implement approved progress and check-ins

- Scope: Progress views, check-ins and therapist feedback.
- Done when: Show measured/logged information with date, units and source; use only approved intake/check-in measures. Distinguish exercise adherence from clinical improvement. Preserve historical entries and corrections, with private client/assigned-therapist access and honest no-data states.
- Verify: History/correction and date/unit tests, role denial, BG/EN chart labels and rendered empty/error cases.

### PX-024 — Complete private messaging and media

- Scope: Conversations, uploads and private file delivery.
- Done when: Use actual authorized participants with durable idempotent messages and truthful send/delivery state. Private uploads/downloads enforce ownership, expiry, size/type policy and revocation; handle orphan/failure cleanup. Define reassignment/history behavior through approved access rules.
- Verify: Two-client/unassigned-staff direct API/storage tests; retry, upload failure, signed-link expiry and assignment-change browser flows.

### PX-025 — Build client profile, intake and document flows

- Scope: Profile, approved intake, consent and client documents.
- Done when: Collect only approved necessary information with versioned consent/policy records and scoped access. Keep booking/account entry usable when optional profile fields are absent. If minors/dependents are supported, implement approved representation rules; otherwise make the limitation explicit in scope and access behavior.
- Verify: Validation/update/history tests, optional-field journey, role restrictions and bilingual documents/consent acceptance.

### PX-026 — Complete therapist client review workflows

- Scope: Staff client records, plan assignment and review.
- Done when: Assigned therapists can review permitted intake, appointments, plans, attempts and feedback and publish the next plan. Reception/admin access does not silently expose clinical detail. Reassignment handles future responsibility and historical visibility according to approved policy.
- Verify: Therapist-to-client end-to-end journey with changed assignment, version/history persistence and forbidden staff actors.

### PX-027 — Build clinic administration and policy management

- Scope: Staff roles, clinic settings, services/resources and audits.
- Done when: Authorized staff manage service/staff/resource availability and approved policy versions without rewriting appointment snapshots. Role changes are auditable and take effect on existing sessions. Prevent accidental loss of essential administrative access and concurrent silent overwrites.
- Verify: Admin/reception/therapist permission tests, stale edits, role revocation and changed-policy existing-booking checks.

### PX-028 — Define community visibility and event data

- Scope: Community migrations, access policies and capacity commands.
- Done when: Implement the approved opt-in announcements/events model with draft/published/archived/cancelled states. Capacity and duplicate RSVP rules are atomic; member visibility is explicit and private care data never appears in public DTOs. Any expanded social features require new scoped tasks.
- Verify: Capacity concurrency, duplicate/revoked RSVP, visibility/public-data and state-transition tests.

### PX-029 — Build client/public community and event participation

- Scope: Community pages and account participation.
- Done when: Expose only approved public/member content with opt-in participation and truthful event capacity/state. RSVP/cancel persists and handles races; public attendee visibility follows explicit policy. If paid events are selected, link the approved billing path and add its acceptance tests.
- Verify: BG/EN visitor/member journeys, capacity race, cancellation and public/private separation.

### PX-030 — Build staff community publishing and moderation

- Scope: Staff announcements/events and moderation controls.
- Done when: Authorized publishers create/review/publish/cancel/archive content with audit history. Implement moderation only for contributions actually approved in scope; event changes/cancellation produce durable participant notifications when required. No moderator access to private care records.
- Verify: Publisher-versus-client permission tests, lifecycle/history, participant notification and cancellation flow evidence.

### PX-031 — Finish Bulgarian/English coverage and content review

- Scope: All public/account/staff strings and provider-facing templates.
- Done when: Both locales cover every in-scope route, form, validation/error/empty state, confirmation, email, document, date/unit/currency and accessible label. Approve clinical/policy translations with the named reviewer. No reference copy or accidental English fallback remains in Bulgarian UI; user-authored text stays original.
- Verify: Key coverage scan plus rendered route/state matrix and reviewer-approved content inventory.

### PX-032 — Implement privacy lifecycle, export and retention

- Scope: Scoped export, deletion requests, retention and storage/jobs.
- Done when: Implement approved purposes/retention/access rules across DB, files, providers and backups. Exports include only authorized records; deletion reports completed/pending/retained categories truthfully with reasons and follow-up ownership. Preserve required integrity without silently promising total instant erasure.
- Verify: Export scope/negative tests, partial failure and retry, file/orphan cleanup, retention jobs and audit redaction.

### PX-033 — Add operational monitoring, retries and recovery

- Scope: Structured telemetry, job operations and backup runbook.
- Done when: Observe failed auth/booking/provider operations without sensitive content; make durable job failures visible and safely replayable. Configure selected alerts within actual authorization, document backup ownership and rehearse restoration into an isolated destination. Agree recovery objectives rather than invent them.
- Verify: Failure injection, worker restart/replay, redacted-log checks and restore record with measured recovery outcomes.

### PX-034 — Complete visual, accessibility and interaction acceptance

- Scope: Complete route/state/viewport matrix and approved differences.
- Done when: Review every in-scope route and important state against original account authority or approved new public/staff design. Fix overflow/focus/contrast/keyboard/navigation issues, long BG text and responsive defects while preserving intended geometry. Record reviewed omissions and retired reference surfaces.
- Verify: 393/1440 comparisons, 320px/200% zoom, keyboard/mobile overlays and full route/state matrix with artifacts.

### PX-035 — Qualify security and database integrity

- Scope: Negative access suite, transactional invariants and environment guards.
- Done when: All required cross-user/assignment/role/storage/cache/export denials pass through direct interfaces. Booking/resource/credit/history invariants hold under concurrent writes and retries. Production cannot enable reference preview/local bypass or expose secrets; unresolved critical/high integrity or privacy failures block release.
- Verify: Real database concurrency and provider-backed negative tests, build/config guard review and sanitized security report.

### PX-036 — Verify complete clinic journeys end to end

- Scope: Public-to-client-to-staff browser integration suite.
- Done when: All six PRODUCT journeys pass in both languages on representative mobile/desktop with a real isolated backend. Verify persisted records, receiving actors and selected provider sandbox outcomes; exercise failures and retries. Every defect has a task and blocking defects are resolved.
- Verify: Reproducible browser journeys with actor/fixture/schema/code SHA, screenshots and authoritative persistence evidence.

### PX-037 — Meet measured performance and maintainability budgets

- Scope: Route bundles, data access and representative load.
- Done when: Public pages do not import all private app code; heavy session/media/calendar features load where needed. Meet budgets agreed in PX-001 for representative routes/data/devices and booking load without weakening private caching or transaction safety. Document measured limits and remaining nonblocking improvements.
- Verify: Bundle/import analysis, representative route/load measurements and cache-isolation regression checks.

### PX-038 — Qualify the exact candidate in dedicated staging

- Scope: Remote/CI/staging, migration rehearsal and release candidate.
- Done when: Use authorized owned hosting/provider targets and tie CI/build/staging evidence to an exact SHA. Fresh/upgrade migration, sandbox auth/email/payment/storage, production-like preview guards, restore and critical hosted smoke journeys pass. Record a concrete candidate runbook and rollback strategy.
- Verify: Exact-SHA CI and hosted evidence, migration/restore logs, environment inventory and tested release runbook.

### PX-039 — Obtain clinic acceptance of the release candidate

- Scope: Owner review, content/assets and launch scope.
- Done when: Clinic approves the concrete staged flows, policies, services/staff/prices, bilingual content, rights, support responsibilities and observation window. Resolve all release-blocking open decisions or explicitly narrow scope with recorded waivers. New changes trigger affected verification again.
- Verify: Dated acceptance record naming approver, candidate SHA, scope, decisions, any waivers and outstanding nonblocking task owners.

### PX-040 — Release the approved candidate and verify production

- Scope: Authorized production deployment and launch smoke checks.
- Done when: Publish only to the authorized destination/candidate with the reviewed migration and rollback plan. Verify actual production identity, public pages, auth/private access, booking and selected provider mode without synthetic bypasses. Use approved test identities/actions and monitor initial failures.
- Verify: Publication authorization, exact deployed SHA, migration outcome, production smoke evidence and rollback decision record.

### PX-041 — Complete stabilization and operational handoff

- Scope: Observation, support ownership and final release audit.
- Done when: Complete the agreed observation window with no unresolved release-blocking issue. Confirm staff operation, alert/job ownership, backup/restore and incident/support procedures. Audit every v1 acceptance criterion and task; remaining nonblocking work is explicitly owned. Mark v1 complete only after these gates pass.
- Verify: Observation report, operational acceptance, restore/support handoff and final dependency/evidence/waiver audit.

### PX-042 — Plan native clients after web v1

- Scope: Future mobile architecture and product scope.
- Done when: Outside v1. When explicitly requested, define native requirements, API contracts, notification/device needs and decide whether shared packages justify a monorepo/Turborepo. Do not preemptively rewrite the web app or count this task toward v1 completion.
- Verify: A separately approved native roadmap and acceptance contract; no native completion claim from web responsiveness.

## Finalization audit

The v1 is complete only when PX-001 through PX-041 and every subsequently added v1 blocker are DONE or validly WAIVED, with all required verification/owner/release gates met. PX-000 is planning; PX-042 is native and excluded. At PX-041, verify that no task is orphaned, no evidence is stale after a code change, no decision has an unresolved launch effect, and every claim matches the actual deployed revision. A page count, local build or inherited CI result cannot substitute for this audit.
