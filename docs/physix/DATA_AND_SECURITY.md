# Data model, permissions and safety boundaries

Status: conceptual target. These are not applied migrations or a declaration of compliance. Reconcile against the actual inherited schema before designing a migration; equivalent existing entities may be reused behind an adapter.

## Core relationships

`clinic → services / practitioners / patients`

`service offering → availability → active allocation → appointment`

`product offer → order → recognized payment → entitlement`

`exercise library → programme version → patient assignment → scheduled session → attempt → saved actuals/check-in`

An appointment, purchase or assignment may refer to the same patient, but none substitutes for another. Auth user identity, patient identity and clinician relationship are separate records.

## Entity contract

| Group | Entities and essential constraints |
|---|---|
| Identity | `profiles`, `clinics`, `clinic_memberships`, `patients`, `practitioners`, `care_relationships`; explicit user links and active/revoked roles |
| Catalogue | `services`, `service_offerings`, `clinic_locations`, `resources`, `products`, `offer_versions`; public publication state and immutable purchased terms |
| Scheduling | `availability_rules`, `availability_exceptions`, `reservation_allocations`, `appointments`, `appointment_events`; UTC instants, timezone, conflict guards, auditable lifecycle |
| Commerce | `orders`, `order_items`, `payments`, `provider_events`, `entitlements`; unique provider identities, server snapshots, no single premium flag |
| Care content | `exercises`, `exercise_versions`, `plan_templates`, `plan_versions`, `plan_items`; authorship, clinical approval, immutable publication |
| Care delivery | `plan_assignments`, `scheduled_sessions`, `session_attempts`, `exercise_logs`, `check_ins`; owner, version, expected revision, prescribed versus actual separation |
| Communication | `conversations`, `conversation_members`, `messages`, `notification_outbox`; scoped recipients and reliable delivery state |
| Governance | `policy_acknowledgements`, `media_assets`, `audit_events`, `data_requests`; purpose-specific acknowledgement, asset provenance, restricted audit payloads |

Use stable IDs, foreign keys, appropriate indexes, explicit statuses, timestamps and normalized monetary units/currency. Check timezone/currency at the offer boundary. Do not duplicate every legacy table simply to rename it; implement these semantics with the smallest auditable schema.

One clinic is the starting product, but clinic and care relationships must still be explicit. Avoid cross-clinic assumptions in reused multi-workspace code. The authenticated user ID alone is not enough to authorize a clinician to access a patient.

## Permissions

| Actor | Allowed | Not automatically allowed |
|---|---|---|
| Visitor | Published public content, anonymized bookable times, bounded guest-booking commands | Patient identity, private calendar reasons, any plan/check-in/message |
| Patient | Own linked appointments, orders, entitlements, assignments, attempts and permitted conversations | Another patient's record, staff-only notes, editing prescribed dosage/payment state |
| Assigned practitioner | Patients/plans and shared records permitted by active care relationship and clinic role | All purchasers, unrelated patients or another clinic's records |
| Reception, if enabled | Minimum scheduling/contact details and permitted booking actions | Symptoms, exercise feedback or private clinical messages by default |
| Clinic administrator | Configuration and role management, with explicit governed clinical permissions when needed | Unrestricted health access solely because they can edit clinic settings |
| System worker | Narrow provider/job operations and required operational records | Unbounded user impersonation or public administrative endpoints |

Unlinking/reassigning a clinician must immediately affect authorization according to the reviewed session policy. Keep a tested historical/read-only policy for ended relationships. An in-memory role flag or stale UI is not permission.

## Database and storage enforcement

Enable row-level security and explicit least-privilege grants on exposed tables. Test public and authenticated API paths directly, not only UI navigation. Supabase documentation distinguishes table grants from row policies and warns that elevated secret/service-role access bypasses RLS (R4a/R4b in CLINIC_BRIEF).

Review views, RPCs and storage access as well as tables. Prefer invoker-authorized access. Any definer function needs an explicit reason, safe search path, narrow execute grants, identity/role validation and negative tests. Do not adopt all inherited SQL as secure merely because its filenames mention integrity/security.

Do not put privileged keys in browser code. For ordinary user operations, carry verified user context rather than laundering every request through unrestricted administrative access. Worker/admin actions have a separate allowlist, identity, authorization and audit trail.

Private media uses private storage with owner/relationship access and short-lived scoped delivery. Public service imagery and patient media must not share access rules. Progress photos, conversation uploads and patient videos stay out of initial scope unless their upload validation, malware/content handling, metadata stripping, retention, deletion and access tests are explicitly delivered.

## Health-data boundary

Patient symptoms, rehabilitation details and related records can be health data; European Commission guidance identifies health data as a specially protected GDPR category (R7). Do not treat the portal as an ordinary gym account with only a renamed heading.

The clinic's jurisdiction and applicable legal obligations are not confirmed. Before real patient processing, the clinic and appropriate privacy/legal advisers must determine the lawful basis, any applicable health-data condition, notices, access rules, retention and processor arrangements. A generic “I agree to the privacy policy” checkbox is not a substitute for that analysis.

Use data minimization: no unnecessary medical history in booking, no health details in payment metadata, no treatment information in analytics/session replays, and no raw messages/check-ins in logs. Do not publish clinic credentials, consent language, retention periods, minors policy or tax/refund statements invented by the implementation agent.

## Clinical-content boundary

The physiotherapist authors/reviews services, exercise instructions, dosage, eligibility and escalation guidance. Version approvals and media rights. The software stores and presents this content; it does not diagnose, prescribe automatically, infer readiness to progress or declare that pain is harmless.

Provide a clear way to stop a session and contact the clinic through the approved process. Symptoms are not continuously monitored unless an actual staffed service is explicitly defined. Do not promise emergency response or instant clinician feedback. This document does not establish medical-device classification or an exemption; review the actual intended product claims/features before release.

## Account lifecycle and security

Require real verified identity to attach private records. Safe guest-booking claiming, session revocation and account switching need direct abuse tests. Protect staff access with MFA as a product security requirement; recovery procedures cannot bypass identity checks through support impersonation.

Rate-limit authentication, public availability, guest holds, checkout creation and message sending. Validate mutation origin/CSRF conditions and redirect allowlists. Bound payloads and support retryable errors. Audit sensitive reads/writes, assignments, grants, role changes and payment corrections with minimal metadata; audit logs must not become a second unrestricted health-record store.

Provide reviewed patient export/access/deletion request workflows. Deletion, retention obligations and financial records may require different treatment; do not implement a blanket cascade or promise immediate erasure of everything. Review backup retention and restores, inactive accounts, abandoned uploads and withdrawn/revoked permissions.

Backups, restore exercises, breach/incident contacts and operational alerts are release requirements. Do not claim GDPR/HIPAA compliance, encryption at every layer, production security or legal readiness merely from choosing Supabase.

## Mandatory adversarial tests

Patient A cannot read/write Patient B through direct API, IDs, queries, exports, storage URLs or cached pages. Practitioner A cannot access unrelated patients. Reception cannot retrieve check-ins/messages. Revoked relationships cannot write. Visitors cannot invoke assignment/payment/admin commands. A forged client status cannot grant access or mark payment. Demo/reference routes cannot expose or mutate real records. Logs/emails/analytics contain no test health payloads. Storage rules match the permission matrix. All of these run against isolated synthetic data before a real patient pilot.
