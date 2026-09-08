# Implementation backlog — single source of progress

## Current owner scope — public website only

- [x] **DESIGN-PUBLIC-01 Complete public visual reference.** 41 screen/state designs, responsive standalone reference, mobile/desktop PNG gallery, interaction contracts and asset provenance in [public-v2](design/public-v2/README.md). The renderer records 123 layout cases and eight prototype smoke checks in [its report](design/public-v2/review-report.json). Owner visual approval remains pending. This does not check off any application implementation task.

**Execution override for M0:** implement only public pages and visitor booking/identity-entry states. M0-00's Gymaf inspection and M0-05's patient previews are deferred; they are not prerequisites for the public frontend. M0-01 can start with ordinary repository/tool inspection. In M0-06, test the public app and its real assets/translation; private-app extraction and initialized-vendor requirements do not apply to this scope. Existing future task IDs below remain intact rather than being silently marked complete.

Do not build a patient dashboard, exercise player, staff area, reuse port, backend or payment integration without a new explicit authorization.

Updated for Next.js/Gymaf reuse. Implementation boxes remain unchecked until supported by evidence. Keep existing IDs stable. [Status](status.md) holds the current handoff; specifications own requirements. Upstream implementation/test claims do not complete PhysiX tasks.

## Handoff infrastructure, already prepared

The repository now specifies a pinned vendor/gymaf source, reuse inventory, Next architecture/bootstrap and verification tooling. This is project preparation, not an application implementation task. Application/runtime/clinical launch evidence is separate.

## M0 — local public UI and patient previews

- [ ] **M0-00 Verify source and adaptation scope.** Read reuse guide/inventory; initialize the exact submodule; verify pin and cleanliness. Inspect candidate imports/assets and record any changed destination or rights gap. Do not change/install upstream. This is a bounded inspection, not a second full audit or a reason to redesign the agreed stack.
- [ ] **M0-01 Inspect and bootstrap.** Depends on 00. Follow bootstrap: official minimal Next App Router/TypeScript/Tailwind scaffold in a temporary sibling; preserve docs/tools/vendor. Record actual versions; root pnpm lockfile; TypeScript/lint/test/Tailwind/deployment exclude vendor. Clean install, typecheck and build. No cloud setup.
- [ ] **M0-02 Tokens and shells.** Depends on 01. Validated bg/en root layout, compact public header, four-item dock, focused flow shell, staff shell only as needed. Shared PhysiX tokens; scoped adapted CSS; no copied global reset. Screenshots at mobile/desktop, no overlap/overflow/device chrome.
- [ ] **M0-03 Public Home and reusable assets.** Depends on 02. Short hero/finder, custom-image service cards, Charlie preview without dividers, approved-content gates, real scroll hierarchy. No unverified claims in live-shaped content. Asset gaps marked honestly.
- [ ] **M0-04 Service discovery.** Depends on 03. Public list/detail, local bilingual finder/body-area categories, useful empty states, one service-to-book path. No diagnostic generation, logged symptom query, or screenshot-based UI.
- [ ] **M0-05 Remaining journeys and patient-app preview.** Depends on 04. Online/clinic/profile/FAQ/legal draft shells and focused booking preview. Adapt the smallest Gymaf dashboard/session-card/player UI into owned components; preview appointment-only and active-plan states separately. Gated synthetic /preview routes, transient sample edits, no fake login/server-save/real booking. No coach invitation/subscription requirement. Update inventory evidence for actual adaptations.
- [ ] **M0-06 Owner UI/quality gate.** Depends on 00–05. Typecheck/lint/format/unit/build/browser smoke; source-boundary checks; 390px/1440px screenshot review, 320px reflow, BG/EN, keyboard/zoom/axe/dock. Build once without an initialized vendor checkout. Record unavailable assets and tests not run. Stop for owner review before backend work.

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

For each completed task: behavior delivered, source files adapted/rejected, specification, code commit, exact commands/environment/results, sanitized screenshots/report paths, remaining limits. Add an IN_PROGRESS or BLOCKED note with a concrete reason, not a checked box for planned work. The handoff tooling test is not an application or clinical test.
