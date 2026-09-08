# Implementation backlog — single source of progress

## Current owner scope — public website only

- [ ] **DESIGN-PUBLIC-01 Complete the matching public visual reference. REOPENED: owner rejected public-v2 on 2026-09-08.** The 41 exported prototype states are a rejected visual attempt, not an approved finished screen set. Restore [the selected homepage family and exact labels](design/README.md), keep the compact Charlie card, address only the outstanding testimonial-container refinement, and extend that family to the other public screens. Compare a representative service/booking screen before mass export. Distinguish proposed, selected and implemented screens. **Current evidence: documentation authority corrected; replacement screen designs not yet delivered.** Historical render/interaction checks remain in the archive and do not satisfy this task.

**Execution override for M0:** only public pages and visitor booking/identity-entry states are authorized. Do not implement public-v2 styling or copy. M0-00's Gymaf inspection and M0-05's patient previews are deferred; they are not prerequisites for the public frontend. Ordinary repository/tool inspection can proceed without claiming the visual gate is complete. In M0-06, test the public app against the selected reference, real assets and translation; private extraction/initialized-vendor requirements do not apply to this scope. Existing future task IDs below remain intact.

Do not build a patient dashboard, exercise player, staff area, reuse port, backend or payment integration without a new explicit authorization. [Status](status.md) is the short handoff; specifications own requirements. Checked boxes require delivered behavior and evidence, not plans, screenshots of a rejected design or upstream test claims.

## Handoff infrastructure, already prepared

The repository specifies a pinned vendor/gymaf source, reuse inventory, Next architecture/bootstrap and verification tooling for future use. This is preparation, not an implemented application or visual approval. Public work does not require executing the vendor workflow.

## M0 — public work now; private previews deferred

- [ ] **M0-00 Verify source and adaptation scope.** Deferred for this public-only task. When reuse is separately authorized, read reuse guide/inventory; initialize the exact submodule; verify pin and cleanliness. Inspect candidate imports/assets and record any changed destination or rights gap. Do not change/install upstream or repeat a full audit without cause.
- [ ] **M0-01 Inspect and bootstrap.** Inspect actual repo/tool state. Official minimal Next App Router/TypeScript/Tailwind scaffold in a temporary sibling only if needed; preserve docs/tools/vendor. Record actual versions; root pnpm lockfile; TypeScript/lint/test/Tailwind/deployment exclude vendor. Clean install, typecheck and build. No cloud setup. No public dependency on deferred M0-00.
- [ ] **M0-02 Tokens and shells.** Depends on 01 and selected visual contracts. Validated bg/en root layout, selected PhysiX header and compact Home/Book/Online/Account dock, focused booking shell. No staff shell in current scope. Shared tokens matching the restored reference, not public-v2 CSS. Compare mobile/desktop with no overlap/overflow/device chrome or rewritten labels.
- [ ] **M0-03 Public Home and reusable assets.** Depends on 02. Faithfully preserve selected hero/finder/actions, custom-image service cards, compact Charlie preview without dividers and scroll hierarchy. Testimonial treatment requires a localized proposal, not a dark editorial redesign. No unverified claims in live-shaped content. Asset gaps marked honestly.
- [ ] **M0-04 Service discovery.** Depends on 03. Public list/detail, local bilingual finder/body-area categories, useful empty states, one service-to-book path. Extend the selected component family; do not reuse the rejected flat-list appearance or rewritten buttons. No diagnostic generation, logged symptom query, or screenshot-based UI.
- [ ] **M0-05 Remaining public journeys.** Depends on 04. Online/clinic/profile/FAQ/contact/legal draft shells and focused booking preview in the selected style. Public identity entry only; no dashboard, player or Gymaf port. Synthetic states must not claim real login/server-save/booking. Future programme UI remains gated. Earlier patient-preview work under this ID is deferred, not completed.
- [ ] **M0-06 Owner UI/quality gate.** Depends on current authorized 01–05 and delivered DESIGN-PUBLIC-01 work. Typecheck/lint/format/unit/build/browser smoke; source-boundary checks; 390px/1440px visual comparison to the selected reference, 320px reflow, BG/EN, keyboard/zoom/axe/dock. Check exact labels and asset consistency. Record unavailable assets and tests not run. Stop for owner review before backend work. No automatic approval from snapshot count.

## R1 — identity and dependable clinic operations

- [ ] **R1-01 Resolve operational inputs.** After M0 review: actual services/durations/fees/hours, owner roles, schedule source of truth, cancellation/payment policy, online preparation and privacy/vendor responsibilities. See open questions. Unknown live inputs do not stop safe local UI work.
- [ ] **R1-02 Local schema/access foundation.** New PhysiX migrations, synthetic seed, role/RLS tests and generated types for R1 entities. Isolated local Supabase, clean reset and upgrade test. No copied vendor SQL, shared Gymaf database, clinical plan/order schema yet.
- [ ] **R1-03 Passwordless identity and account shell.** Depends on 02. Official Next SSR cookie/refresh integration, generic OTP responses, verified ownership, safe redirects, current staff membership/MFA. Real browser refresh/logout/revocation cases. Appointment-only patient is useful without coaching or payment entitlement.
- [ ] **R1-04 Availability engine.** Depends on 02 and schedule decisions. Europe/Sofia rules, duration/buffers/closures, bounded public slot DTO, durable abuse controls, deterministic DST/lead-time/horizon tests.
- [ ] **R1-05 Atomic booking slice.** Depends on 03–04. Draft binding, review/verification, SQL confirmation/idempotency, overlap guards, contact snapshots, audit/outbox, conflict/retry UI. Concurrent in-clinic/online/manual requests cannot double book.
- [ ] **R1-06 Patient appointment management.** Depends on 05. Own details/history, allowed cancel, atomic reschedule preserving original on failure, private online link. Cross-user/direct API tests, expired-session recovery and honest no-link state.
- [ ] **R1-07 Staff operations.** Depends on 05. Agenda/manual booking, blocks/hours/offerings, cancellation/no-show/completion, preparation/failure queues. Same scheduling constraints; scoped permissions and audit.
- [ ] **R1-08 Notifications/jobs.** Depends on 05 and provider approval. Auth SMTP plus outbox delivery, leases/retries/deduplication, obsolete-reminder suppression, authenticated schedule and alerts. Delivery outage never converts a committed booking into a failed booking.
- [ ] **R1-09 Approved production content/privacy.** Actual licensed photos/credentials/contact/fees/policies and reviewed localization. SEO/canonical/hreflang, strict private caching/indexing, retention/export/deletion operations, no sensitive telemetry. Online stays disabled until real operations exist.
- [ ] **R1-10 Staging/launch gate.** Depends on 01–09. All critical tests, provider/restore drills, staff rehearsal, access and artifact review; owner-authorized deployment/migrations. No claim of launch from a pretty UI or inherited upstream CI.

## R2 — two independent tracks: assigned care and educational commerce

After relevant R1 identity/security prerequisites, **R2-05 may be built before R2-02/03/04**. Clinical assignment must not depend on Stripe. The sequence below keeps existing IDs, not an artificial payment prerequisite.

- [ ] **R2-01 Define care and education offers.** Actual clinician workflow, educational scope, authorship/media rights, support capacity, access/refund/tax terms and content approval. Clear clinical responsibility and no autonomous exercise prescription.
- [ ] **R2-05 Clinician-assigned care reuse slice.** Depends on R1-02/03 and approved R2-01 care scope, not Stripe. Adapt reviewed builder/session concepts to PhysiX plan/version/assignment/item/session/log schema. Clinician publishes/assigns a synthetic plan; patient starts/logs/reloads/resumes; different patient/reception denied. Draft/published/history isolation, idempotent attempts, stale-revision recovery, private media and safe pause/contact behavior. Complete minimal persistence proof before expanding screens. Update inventory with actual code/test evidence.
- [ ] **R2-02 Educational products/private content.** Depends on R2-01 education scope. Product versions, authoring/publishing, media schema and protected previews. Separate from care assignment.
- [ ] **R2-03 Checkout/orders/entitlements.** Depends on 02. Server prices, test Checkout, raw-body signed/idempotent fulfillment, duplicate/reordered/delayed event handling, reconciliation/refund/revocation tests. No medical information in payment metadata.
- [ ] **R2-04 Programme library/player.** Depends on 03. Owned lessons/captions/progress/support; no public protected media. Reuse a player primitive only when its content/access semantics really match clinical care.
- [ ] **R2-06 Separate release gate.** Relevant track's auth/security/media/consumer/clinical review, staff capacity and testing; explicit launch approval. Optional messaging/check-ins need their own approved purpose/capacity and are not blockers for a minimal assigned-plan release.

## R3 — optional AI, not queued for initial execution

- [ ] **R3-01 Intended-use and privacy/regulatory assessment.** Define bounded feature and responsible clinician; no automatic approval from the original idea.
- [ ] **R3-02 Synthetic internal evaluation.** After 01: sources/versioning, output constraints, human review and bilingual/adversarial safety tests. No live patient data by default.
- [ ] **R3-03 Pilot gate.** Clear disclosure, human alternative, approved processing, escalation/monitoring/kill switch and explicit clinical/owner approval.

## Evidence format

For each completed task: behavior delivered, source files adapted/rejected, specification, code commit, exact commands/environment/results, sanitized screenshots/report paths, remaining limits. Add an IN_PROGRESS or BLOCKED note with a concrete reason, not a checked box for planned work. Separate visual proposals, owner-selected direction, implemented behavior and test evidence. The handoff tooling test is not an application or clinical test.
