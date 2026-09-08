# Data model and database contracts

This is a logical schema specification, not an applied migration. Implement only R1 tables initially. SQL migrations are the schema source of truth; regenerate TypeScript types after changes. See [booking](booking.md) for transactions and [access control](auth-security.md) for permissions.

## Conventions

Use UUID primary keys; UTC `timestamptz` instants; explicit `created_at`/`updated_at`; integer minor units for money plus ISO currency; foreign keys and check constraints. Keep clinic wall-clock schedules separate from booked instants. Public editorial copy lives in typed repository content; do not duplicate it into a CMS now.

Every table in an API-exposed schema needs explicit grants and RLS in the same migration. Internal roles, outbox, audit, and draft data belong in a non-exposed schema where practical. RLS protects rows, not confidential columns: split sensitive data or project a safe server DTO. Verify view security and SQL function grants. Sources: [research](research.md), Supabase RLS and PostgreSQL ranges.

## R1 entities

| Entity | Important fields and constraints | Access |
|---|---|---|
| `profiles` | `user_id` -> Auth, display name, preferred locale, optional phone; no editable staff role | Self; permitted administrative fields for staff |
| `staff_memberships` | user, role (`admin`, `clinician`, `reception`), active flag; trusted provisioning only | Server authorization helper; admin management |
| `practitioners` | public ID/name, optional linked staff user, active; initial seed is explicitly synthetic until approved | Published public subset; staff write |
| `appointment_types` | code, active, duration minutes, pre/post buffers, allowed mode, fee minor/currency, version | Published subset; authorized staff write |
| `practitioner_offerings` | practitioner, appointment type, mode, active; unique combination | Public safe offering information |
| `schedule_rules` | practitioner, weekday, local start/end, effective dates, clinic timezone; multiple intervals support breaks | Staff; used through availability service |
| `schedule_versions` | one row per practitioner, version; all schedule-changing transactions lock it | Internal |
| `appointments` | patient user nullable for staff-created guest, offering, practitioner, mode, UTC start/end, status, snapshot of duration/fee/policy, revision, creation source | Self-safe fields; administrative staff |
| `appointment_contacts` | appointment ID, contact name/email/optional phone; required only as operationally necessary | Patient owner and authorized staff, never public |
| `calendar_entries` | practitioner, appointment ID nullable, kind appointment/block, occupied UTC range, active flag | Internal calendar reads; no public event rows |
| `online_sessions` | appointment ID, private approved meeting URL, preparation status, prepared by/at | Owner of that appointment and authorized staff |
| `booking_drafts` | random ID, hashed browser binding, safe selected offering/start, expiry; no symptom text | Internal; possession/binding checked server-side |
| `idempotency_records` | actor, operation, key, normalized request hash, result reference; unique actor/operation/key | Internal |
| `notification_outbox` | event ID, appointment ID/revision, template, attempt count, next attempt, lease expiry, sent/failed status | Internal job and staff status DTO |
| `audit_events` | actor, action, resource ID, timestamp, request ID, safe change metadata | Restricted; append-only through application |
| `policy_acceptances` | user or appointment, policy type/version, timestamp; separate marketing preference if ever implemented | Self and authorized compliance operations |

Do not store raw email-provider payloads, OTP codes, tokens, arbitrary clinical notes, or a full form dump in these tables. Auth owns verified email identity. Contact snapshots support delivering existing appointment notices; changing an account email must not silently transfer ownership.

## Occupancy constraint

All practitioner occupancy, including blocks and both online/in-clinic appointments, is represented in `calendar_entries`. A unique constraint on start time is insufficient. Use PostgreSQL range exclusion with `btree_gist` (verify extension availability): equal practitioner IDs cannot have overlapping active `tstzrange` values. The range is half-open `[start - pre_buffer, end + post_buffer)`; adjacent permitted ranges do not overlap. Require finite increasing timestamps, a positive duration and one active entry per appointment.

Illustrative invariant, not a complete migration:

```sql
EXCLUDE USING gist
  (practitioner_id WITH =, occupied_range WITH &&)
  WHERE (active);
```

Store buffers/range as appointment-time snapshots; later changes must not rewrite history. Cancellation deactivates occupancy. Completion/no-show retains historical occupancy. Rescheduling updates the appointment and its occupied range atomically; failure preserves the original. Blocks use the same constraint. Do not use a time-dependent `now()` predicate to define index membership.

## Integrity and concurrency

All writers lock the practitioner's `schedule_versions` row before changing working hours, blocks, offerings that affect scheduling, or appointments. This prevents a schedule edit from racing confirmation. Then validate the actual schedule and use the exclusion constraint as the final concurrency guard. Lock multiple resources in stable ID order if later needed.

Use server-derived user/practitioner/duration/fee values, not a browser-supplied owner, end time or price. Publish a stable error code on conflict. Record an audit event and outbox work in the same transaction. Direct patient insert/update/delete privileges on appointments and occupancy are revoked; mutations use scoped functions.

## R2 additions, only when that release starts

`programme_products` and immutable `programme_versions` describe educational products. `orders`, `order_items`, `payment_events` and `entitlements` map verified payment to access; unique provider event and checkout IDs prevent duplicate fulfillment. An entitlement is not evidence of clinical suitability.

`clinical_plans`, immutable `clinical_plan_versions`, `plan_assignments`, `exercise_library`, `plan_items`, and `plan_progress` support clinician-published patient care. Each assignment links the patient, responsible clinician and published version. Patients cannot read drafts or another patient's plans. Progress is a task log, not a generated health score. A general admin/reception role does not automatically grant clinical-record access.

Paid media and patient-specific files live in private Storage buckets. Public marketing images live separately. Signed URL issuance checks the live entitlement or plan assignment; expiry limits already-issued access after revocation.

## Migration and seed discipline

Migrations include tables, constraints, indexes, grants, policies and function permissions together. Test a clean local database and an upgrade from the prior migration. Seed only deterministic fictional identities and explicitly illustrative fees. Never download production patient data to make fixtures. Roll forward with corrective migrations instead of editing a migration already deployed.

Document retention classes before R1; implement bounded draft/log/outbox cleanup, account export/deletion workflow and exceptions for required retained records. Do not cascade-delete historical financial or clinical records simply because an Auth account is deleted.
