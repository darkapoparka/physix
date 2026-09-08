# Data model and database contracts

Canonical logical schema, not applied migrations. R1 first; R2 additions only when their track begins. SQL migrations own real schema; regenerate database TypeScript types. [Booking](booking.md), [security](auth-security.md) and [reuse mapping](reuse/backend.md) complement this document, not replace its table names.

## Conventions

UUID keys, explicit timestamps, UTC timestamptz instants, integer minor-unit money plus ISO currency, foreign/check constraints and indexes. Clinic wall-clock schedule is separate from booked instants. Public editorial text is repo-managed and approved; offerings/prices/schedules are DB-authoritative.

Explicit grants/RLS ship with every exposed table. Use non-exposed schemas for drafts, idempotency, outbox and audit where practical. RLS is row protection, not column filtering: split sensitive fields or produce minimal server DTOs. Review views and function/Storage grants. Sources are in [research](research.md).

## R1 entities

| Entity | Important fields/invariants | Access |
|---|---|---|
| profiles | user_id -> Auth, name, locale, optional phone; no editable role | Self and necessary staff subset |
| staff_memberships | user, admin/clinician/reception role, active | Trusted provisioning/current authorization |
| practitioners | public ID/name, optional linked staff user, active | Approved public subset |
| appointment_types | code, duration, buffers, mode, fee/currency, active/version | Public safe subset; authorized staff write |
| practitioner_offerings | practitioner/type/mode, active, unique combination | Public safe subset |
| schedule_rules | practitioner, weekday/local intervals/effective dates, timezone | Staff; availability functions |
| schedule_versions | one version/lock row per practitioner | Internal concurrency control |
| appointments | owner nullable for staff-created guest, offering/practitioner/mode, UTC interval/status, captured fee/policy/duration, revision/source | Own safe DTO; administrative scope |
| appointment_contacts | appointment, necessary name/email/phone snapshot | Owner and authorized staff only |
| calendar_entries | practitioner, appointment nullable, appointment/block kind, occupied range, active | Internal authoritative occupancy |
| online_sessions | appointment, approved private URL, preparation status/by/at | Owner and authorized preparation staff |
| booking_drafts | random ID, hashed browser binding, safe selection, expiry | Server-bound selection, not reservation |
| idempotency_records | actor/operation/key unique, normalized input hash, result ref | Internal |
| notification_outbox | event, appointment/revision, template, attempts/next time/lease/status | Worker + minimized staff DTO |
| audit_events | actor/action/resource/time/request ID, safe metadata | Restricted append-only operations |
| policy_acceptances | user/appointment, policy type/version/time | Self and authorized operations |

No raw OTP/tokens/provider payloads, broad health history, arbitrary clinical notes or form dumps. Auth owns verified identity. Contact snapshots do not transfer ownership when an email changes. Staff-created guest records are not automatically claimed merely by matching an email; require an explicit verified linking process if introduced.

## Appointment occupancy and concurrency

All practitioner occupancy is in calendar_entries, including online, in-clinic, phone bookings and blocks. Unique start times cannot prevent overlaps. Use an active-range exclusion constraint with btree_gist support verified for deployed Postgres: practitioner equality plus tstzrange overlap is forbidden. Ranges are half-open [start - pre_buffer, end + post_buffer); require finite increasing instants, positive durations and one active occupancy per appointment.

```sql
-- Illustrative invariant, not an executable full migration.
EXCLUDE USING gist
  (practitioner_id WITH =, occupied_range WITH &&)
  WHERE (active);
```

Capture buffers/ranges/terms at booking time. Cancellation deactivates occupancy; completed/no-show history is retained. Reschedule updates appointment/range atomically and rolls back to the old slot on conflict. No now()-dependent index predicate.

All writers lock the relevant schedule_versions row before changing working rules, blocks, offering constraints or appointments; then revalidate the real schedule and rely on the exclusion constraint as the final overlap guard. Lock multiple resources in stable order if ever needed. Actor/duration/fee/end time are server-derived, never browser-authoritative. Appointment/contact/occupancy/audit/outbox changes form one transaction; external providers do not.

Revoke direct patient mutation privileges on critical tables. Narrow RPCs verify identity/current permissions. Normalize conflict errors for the UI and preserve idempotency through dropped responses.

## R2 educational commerce

programme_products and immutable programme_versions describe education. orders/order_items/payment_events/entitlements map verified payment to access. Unique provider event/checkout IDs and transactionally created access prevent duplicate fulfillment. An entitlement is not clinical suitability or permission to manage an appointment. Refund/revocation changes access consistently; required historical financial records are retained according to approved policy.

## R2 assigned clinical care

| Entity | Required contract |
|---|---|
| clinical_plans | Clinician-controlled editable draft, author/scope, revision; not visible to patients as published |
| clinical_plan_versions | Immutable approved version with author/approval time and validated content |
| exercise_library | Reviewed media/instruction references; no automatically prescribed library defaults |
| plan_items | Version-linked session/item definition, order/day offset and validated prescribed exercise/set data with stable IDs |
| plan_assignments | Patient, responsible clinician, approved version, start/timezone, status/access policy |
| plan_sessions | Distinct attempt for assignment/item/version, patient, prescribed snapshot or immutable version path, state/revision, started/running/completed timestamps and accumulated elapsed time |
| plan_set_logs | Attempt/exercise/set-index unique, relevant actual reps/load/duration/distance, explicit skipped, nullable unrecorded values, revision |
| plan_progress | Approved non-session task completion or derived session activity; not a competing source for session logs |

No second parallel Gymaf workouts/relationship schema. Validate that every attempt/item/exercise/set belongs to the assignment's immutable version and that the current actor can access/edit it. Patient reads only own published assigned content; reception has no clinical access. Generic admin role is insufficient without clinical grant.

Attempt transitions are validated: in_progress <-> paused, then completed or abandoned. Closed attempts are not silently reopened; new attempts have new IDs. Define a single-active-attempt invariant where applicable and use idempotent starts. Logs distinguish unrecorded/null, recorded zero and explicit skipped. Revisions prevent silent last-write wins. Publication of a newer plan never mutates existing attempts/history. No arbitrary patient-side changes to prescribed targets or ownership.

A controlled session completion derives from recorded allowed activity; a timer or optimistic button alone does not create a clinical outcome. Progress is recorded activity, not an inferred recovery score. The minimal persistence proof is described in reuse/backend.md and R2-05; it is independent of Checkout.

## Media, migrations and retention

Private media lives in private Storage, not public/. Signing checks current assignment/entitlement and expiry; already issued links have a documented limited revocation window. Public assets have separate approved provenance.

Write PhysiX-owned migrations including tables/indexes/checks/grants/RLS/function permissions. Never run vendor migrations or import a real Gymaf database. Test a clean local setup and upgrade from prior migrations; once deployed, correct with new migrations instead of editing history. Seed deterministic fictional users and clearly illustrative terms only.

Define retention classes and bounded cleanup for drafts/logs/outbox, authenticated export/deletion workflows, and lawful exceptions. Do not cascade-delete financial/clinical history just because an Auth account is removed. Backups/files/email copies need their own retention/restore procedures.
