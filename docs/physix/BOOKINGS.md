# Booking and clinic scheduling contract

Bookings are a core product capability, not a link to the exercise schedule. The inherited coach-call slots are a starting implementation, not the final clinic scheduler. D-020 through D-024 must determine the actual published policy.

## Domain concepts

- Clinic/location with a confirmed IANA timezone. Use Europe/Sofia only as a proposed test default until location is confirmed.
- Service with approved BG/EN title/description, duration, preparation/cleanup buffers, booking eligibility, permitted therapists, location/resource requirements, active state and selected payment policy.
- Therapist availability: working intervals, exceptions/leave, blocked time, eligible services and administrative overrides.
- Resources: explicit room/equipment capacities where the clinic needs them. Do not assume one therapist means unlimited rooms.
- Appointment: clinic, client, service/version snapshot, therapist, resources, UTC start/end, timezone snapshot, booking-policy snapshot, lifecycle state and revision. Preserve descriptive/price policy snapshots so historical appointments do not change when a service is edited.
- Audit/notification events: durable record of reservation, movement, cancellation, attendance and delivery intent. Do not put clinical detail into external notification payloads.

## Proposed lifecycle

`selected` is browser-only and consumes no capacity. An optional short-lived `held` state is required only when payment or another confirmed workflow needs it. A committed appointment is `confirmed`; operational outcomes are `completed`, `no_show` or `canceled`. Rescheduling changes the reserved interval atomically with an audit event, not by canceling first and hoping the new booking succeeds. If the clinic requires approval, introduce an explicit request/approval lifecycle with defined capacity semantics before implementation; do not disguise requests as confirmed bookings.

Payment status is separate: not required, due at center, pending, paid, failed, refunded/partially refunded as applicable. No-shows do not automatically charge a fee. Attendance is an auditable staff action. Final states cannot be freely overwritten by the client; correction permissions and reasons are explicit.

## Reservation invariants

1. Server validates identity, service eligibility, clinic/therapist/resource scope, start/end, lead time, horizon, availability, breaks, closures and policy at commit time.
2. No overlapping confirmed appointments/active holds for the same therapist or capacity-one resource, including required buffers. For resources with approved capacity above one, reserve explicit units or enforce the aggregate limit atomically; never exceed configured capacity. Enforce at the database level with exclusion/uniqueness or appropriate locking; query-then-insert in JavaScript is insufficient.
3. A command idempotency key is scoped to actor and command. Retrying after lost acknowledgement returns the same appointment/result. A different payload under the same key must conflict, not silently reuse another booking.
4. “Any available therapist” resolves a qualified therapist atomically and stores the actual assignment. Public availability never exposes patient names, private notes or internal staff data.
5. Cancellation validates ownership, current revision/state and the applicable cutoff using server time. It releases capacity and records notification intent in the same transaction.
6. Reschedule validates and reserves the destination before releasing the previous interval in one transaction. On conflict/failure, the original booking remains intact. A concurrent cancel/reschedule cannot produce two live bookings.
7. Staff cannot silently override an actual collision. Privileged policy exceptions require a reason and audit; conflicting capacity remains protected.
8. Availability edits cannot strand existing confirmed appointments silently. Surface affected appointments and require an explicit rebooking/cancellation workflow.
9. If holds are used, they expire on server time and are reclaimable atomically. Late provider payment cannot confirm capacity already reassigned; route to reconciliation/refund handling under the chosen policy.
10. External notification/provider failures do not undo a committed booking or show false cancellation. Retry delivery through durable jobs, with status visible to staff.

## Public-to-account flow

Browse published services and available times without signing in. Follow assessment-first/direct-service eligibility from D-020. Choose therapist/any, date and time; authenticate before final confirmation under D-014. Keep a non-sensitive booking draft across authentication and locale changes; never put patient history or invitation secrets in URL query parameters. Revalidate availability after sign-in and immediately before confirmation. Rate-limit abusive availability/reservation/auth activity without leaking whether an email already belongs to a patient.

Confirmation shows actual saved appointment ID/reference, full clinic-local date/time, service, therapist, location, payment status and policy. Refreshing the confirmation must load that record; a `success=true` query is not proof. The same appointment appears in client history and staff calendar. Calendar exports must avoid sensitive care details and require the correct access scope.

## Staff operations

Day/week calendar, therapist/service filters, service eligibility, working hours/exceptions, availability block/unblock, upcoming/history detail, booked-on-behalf-of-client workflow if approved, checked-in/completed/no-show actions, cancellation/rescheduling, and auditable overrides. Reception sees operational fields only. Concurrent staff editing uses revisions and refreshes on conflict. Clients without accounts and dependent/minor booking need explicit D-023 policy before adding proxy identities.

## Mandatory tests

- Two clients reserve the same time concurrently: one succeeds, one receives a conflict; exactly one capacity claim exists.
- Same therapist with overlapping times/different services; same room with different therapists; buffers crossing adjacent slots; multi-resource reservation rollback.
- Retry after committed response is lost; same key/different payload; stale revision; two tabs cancel/reschedule; booking on behalf of another client without permission.
- Reschedule destination taken during confirmation: original appointment remains booked.
- Boundaries: cutoff exact instant, midnight/month/year transitions, spring-forward nonexistent local times, fall-back ambiguous times and a client browsing from a different timezone. Display and confirmation retain explicit clinic timezone.
- Staff closure/leave intersects existing booking; withdrawal/cancel notifications; service archived/price changed while draft is open.
- Fake payment redirect, duplicate/out-of-order webhook, expired hold, declined payment and notification outage for the selected payment path.
- Anonymous/public responses and direct API/database calls cannot reveal or mutate another client's appointments.

Owners: PX-012 through PX-019, staff configuration PX-027, security/integration acceptance PX-035/PX-036. Detailed actual schema and endpoint payloads are written during PX-012 after source inventory and clinic-policy resolution; do not pretend this domain plan is an installed schema.
