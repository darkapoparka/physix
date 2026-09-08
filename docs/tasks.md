# Implementation backlog — single source of progress

All implementation tasks begin unchecked. IDs remain stable. Complete a task only with acceptance evidence; update [status](status.md) with the next task and blockers. Do not create competing TODO lists. Specifications own requirements; this file owns order and completion.

## M0 — locally runnable visual product

- [ ] **M0-01 Inspect and bootstrap.** Follow [bootstrap](bootstrap.md); preserve docs/assets; official minimal SvelteKit scaffold; exact pnpm/Node/dependency versions recorded; clean install, check and build pass. No cloud provisioning.
- [ ] **M0-02 Tokens and shells.** Depends on 01. Implement [design system](design-system.md): responsive header/menu, four equal dock destinations, focused booking shell, typography/spacing/focus/reduced motion, locale parameter. Verify 360/390/430 and desktop screenshots; no device chrome, overlap or global horizontal overflow.
- [ ] **M0-03 Public home and reusable assets.** Depends on 02. Implement short hero, service finder entry, custom-image service cards, Charlie profile preview with no divider lines, approved-content gates, lower-page plans preview. All synthetic identities/claims clearly marked in demo; no fabricated live credibility.
- [ ] **M0-04 Services and discovery.** Depends on 03. Catalogue/list/detail routes, local bilingual search and body-area shortcuts, empty state, semantic card links, validated booking suggestion. Public text is usable without JavaScript; symptom query is not logged or stored in the URL.
- [ ] **M0-05 Remaining M0 journeys.** Depends on 04. Online information, about/contact/FAQ/legal draft shells, focused booking preview, signed-out Account and explicitly synthetic private-state previews. Menu and browser-back behavior work. Nothing claims to have made a real appointment or charge.
- [ ] **M0-06 Visual and quality gate.** Depends on 01–05. Check/lint/unit/build/browser smoke; Bulgarian/English layout; keyboard/zoom/axe; screenshot comparison and documented missing real assets/content. Owner reviews the responsive UI before backend work.

## R1 — real clinic operations

- [ ] **R1-01 Resolve launch business inputs.** Depends on M0 review. Confirm questions Q01–Q08 in [open questions](open-questions.md), actual schedule source of truth, booking/payment policy, operational owner and online preparation process. Unresolved launch-critical inputs block live release, not local UI progress.
- [ ] **R1-02 Local schema and access baseline.** Implement R1 [data model](data-model.md), SQL migrations, synthetic seed, generated types and role/RLS tests. Prove a clean local reset and migration-upgrade path. No clinical-plan/order tables yet.
- [ ] **R1-03 Passwordless identity and staff gates.** Depends on 02. Current SSR integration; verified patient sessions, internal redirect validation, staff membership/MFA, account basics and safe errors. No upfront browsing wall or metadata role escalation.
- [ ] **R1-04 Availability engine.** Depends on 02 and approved schedule rules. Explicit Sofia timezone, intervals/buffers/closures, bounded public DTO, durable abuse limits, deterministic DST/boundary tests. No raw calendar-event exposure.
- [ ] **R1-05 Atomic booking vertical slice.** Depends on 03–04. Verification-aware draft, explicit review, SQL confirmation/idempotency, overlap guard, contact snapshot, audit/outbox, conflict/retry UI. Concurrency tests prove safety across modes/manual entries.
- [ ] **R1-06 Account appointment management.** Depends on 05. Own details/history, policy-aware cancel/reschedule, revision checks, atomic rollback and authorized online-link display. Cross-user access and expired-session recovery tests pass.
- [ ] **R1-07 Staff daily operations.** Depends on 05. Agenda, manual bookings, hours/blocks, cancellation/no-show/completion, online preparation and failed-notification queues. Same constraints as public booking; changes and overrides audited.
- [ ] **R1-08 Notifications and scheduled jobs.** Depends on 05 and approved provider. Auth SMTP and app mail both tested; leased durable outbox, bounded retry/deduplication, obsolete-reminder suppression, authenticated schedule, operational alerts. Failure after commit does not report booking failure.
- [ ] **R1-09 Production content and privacy controls.** Depends on approved inputs. Real images/licences/credentials/contact/fees, localized review, SEO/canonical/hreflang, public/private indexing, privacy/retention/export/deletion controls and no sensitive telemetry. Online capability stays off until operationally ready.
- [ ] **R1-10 Staging rehearsal and launch gate.** Depends on 01–09. All [testing](testing.md) R1 cases, provider failure drills, restore rehearsal, staff rehearsal, access review, approved deployment/migration plan. Owner explicitly authorizes live deployment and real processing.

## R2 — paid content and clinician-controlled plans

- [ ] **R2-01 Confirm offer and clinical workflow.** Define actual educational products versus individualized clinical service; authorship, price/tax/refund/support/access terms, media licences and clinical responsibility. No development of unapproved monetization claims.
- [ ] **R2-02 Product versions and private content.** Depends on 01. Product/version/media schema, publishing workflow, role policies and protected previews.
- [ ] **R2-03 Orders, Checkout and entitlements.** Depends on 02. Server prices, test-mode Checkout, signed/idempotent webhook fulfillment, reconciliation/refund/revocation, private-media checks and all payment failure tests.
- [ ] **R2-04 Patient programme library/player.** Depends on 03. Purchased content in Account, accessible player/captions, progress, resumable sessions, support path; no hidden public video URLs.
- [ ] **R2-05 Clinician-assigned plans.** Depends on reviewed clinical workflow. Draft/review/publish/version/assignment controls, approved exercise/stop instructions, patient progress and clinician revisions. No automatic assignment from checkout or a model.
- [ ] **R2-06 Separate release review.** Security, consumer/clinical/privacy review, staff capacity and test evidence; explicit launch approval.

## R3 — optional AI, not queued for initial implementation

- [ ] **R3-01 Intended-purpose and regulatory/privacy assessment.** Confirm the actual feature and clinician responsibility; no implied approval from the original idea.
- [ ] **R3-02 Internal synthetic-data prototype and evaluation.** Only after 01. Versioned sources, output constraints, clinician review, adversarial/bilingual safety tests and no live patient data by default.
- [ ] **R3-03 Patient-facing pilot review.** Only after documented safety evidence. Clear AI disclosure, human alternative, approved data processing, escalation/monitoring/kill switch and explicit owner/clinical approval.

## Completion record template

Append a brief record to the completed task or link a commit/PR: changed behavior; relevant specification; commit; commands and outcomes; screenshot/report paths; unresolved limits. Use `blocked` in status with the concrete dependency; do not check a task that only has a mock UI or a prose plan.
