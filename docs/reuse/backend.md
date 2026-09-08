# Backend reuse and care-domain mapping

PhysiX owns its schema and identity. [Data model](../data-model.md), [booking](../booking.md) and [security](../auth-security.md) remain authoritative. Upstream code is reference for concepts, not an approved migration bundle. This guide adds mapping and adaptation requirements, not a second table naming system.

## Keep the useful invariants

Gymaf's connected source models editable programme drafts, immutable publications, patient-specific assignments, distinct workout attempts, prescribed-versus-actual set values, revisions and acknowledged server writes. Preserve those ideas where appropriate, and prove them with PhysiX tests.

Remove fitness-business assumptions: a clinic patient need not belong to a coaching workspace or hold a training subscription to access an appointment. There is one clinic initially, with trusted staff roles and explicit clinician assignments. Do not build a multi-tenant platform or share Gymaf's customer database to reuse these concepts.

## Mapping

| Upstream concept | PhysiX target | Required adaptation |
|---|---|---|
| Profile | profiles + Auth identity | Remove default weight-loss/fitness assumptions; no role in editable profile |
| Workspace/operator | staff_memberships + clinic configuration | No automatic marketplace/operator layer or all-clinical-record access |
| Coach-client relationship | plan_assignments + responsible clinician | Only needed for assigned clinical care; independent of booking identity |
| Program draft / ProgramVersion | clinical_plans / clinical_plan_versions | Clinician-authorized publication, appropriate instructions, immutable versions |
| ScheduledWorkout | plan_items / assignment schedule | Exercise schedule, NOT practitioner occupancy |
| WorkoutSession | plan_sessions | Distinct attempt, assigned-version snapshot, timestamps and revision |
| SetLog | plan_set_logs | Valid fields/targets, null vs zero vs skipped, unique set key/revision |
| Completion/history | plan_progress + derived activity views | Record activity; do not infer health improvement |
| can_train/entitlement | explicit assignment access versus education entitlement | No training subscription guard around appointments; historical access policy explicit |
| Messages/check-ins | optional R2 scoped communication | Add only with approved purpose, retention and staffing; not required for initial care slice |
| Custom auth HTTP/cookies | official Supabase Next SSR integration | Do not combine two refresh/session architectures |
| Gymaf command/query RPC | narrow PhysiX domain operations | Server-derived actor; explicit inputs/auth; no giant generic command endpoint by default |

## R1 booking is new work

A workout's date does not reserve a clinician's time. Use PhysiX appointment_types, schedule rules, appointments and one calendar_entries occupancy constraint for online/in-person/manual visits and blocks. Idempotency, working-hour locks, buffers and conflict rollback remain required. A naive date grid or UI-disabled button is not concurrency protection.

A first patient account contains their visits even when they have no plan. Do not copy the upstream 'open coach invitation' empty state or can_train condition into account authorization. Appointment management is an authenticated ownership function independent of R2.

## R2 care schema additions

The owning schema doc extends its existing clinical_plans/versions/assignments/items/progress with plan_sessions and plan_set_logs; do not introduce a second parallel workouts schema. Each attempt references the published assigned version/scheduled item, patient owner and responsible clinician scope. Store a stable prescribed snapshot or immutable foreign-key path so later publication never rewrites history.

A started attempt is in_progress; allowed transitions are pause/resume, complete or abandon under validated rules. Completed/abandoned attempts are not silently reopened. A new attempt gets a new ID. Concurrent start requests use idempotency and a defined single-active-attempt constraint where applicable. A failed request must not tell the patient a save was acknowledged.

Logs use a unique (session, exercise, set index) identity and expected revision. Null means unrecorded; zero means a recorded value; skipped is explicit. Validate that the exercise/set belongs to this patient's attempt, allowed values match the prescription and the attempt is editable. Do not let a client submit another owner, a rewritten plan or fabricated completion status.

Keep elapsed time as server state/timestamps; the browser display derives from it. Handle stale revisions and retries without overwriting other edits. Publication/assignment/logging each has an appropriate audit trail with minimal sensitive payloads.

## Identity, authorization and media

Use request-scoped supported Supabase SSR clients and verify current access. Database grants/RLS/functions enforce patient ownership, clinician scope and staff MFA. Never adopt a local-only MFA bypass from upstream. A reception/admin role alone cannot read clinical plans.

Private media requires a live assignment or programme entitlement check and short-lived delivery. No public bucket/link based solely on guessing a file path; no paid or patient media in public/. Check actual file rights and reviewed exercise content before release. No symptom details in URLs, provider metadata or diagnostics.

## Local persistence proof (within R2-05 after its prerequisites)

Use two synthetic patients and a clinician in isolated local Supabase. Clinician saves a draft; patient cannot see it. Clinician publishes and assigns a version. Patient signs in and sees only that assignment, starts an attempt, records one valid set, reloads and resumes with the acknowledged values. A duplicate request produces the same result; a stale revision yields recoverable conflict. A second patient and receptionist are denied by direct API/RPC tests. Publishing a later version does not mutate earlier attempt history.

This proves only the slice exercised. It does not require Stripe, a broad exercise marketplace, AI, chat, uploaded patient files or live clinical data. Keep those out of the slice. Clinical and product approval remain separate from a technical test pass.

## No migration shortcut

Never copy vendor/supabase/migrations into the root and run them unchanged or bulk-renamed. Inspect relevant constraints/functions, write new PhysiX migrations with grants/policies, and test reset plus incremental upgrades. Preserve any existing root migrations once deployed; correct with new migrations. Do not share secrets, link a remote project or reset an unknown database to make the port easier.
