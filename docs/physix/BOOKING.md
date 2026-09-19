# Booking and clinic scheduling contract

Status: target contract. No new booking backend was implemented in this planning session.

## Offer configuration

A service has a stable ID/slug, published content, eligible visit modes, practitioner eligibility, duration, buffer rules, locations/resources, price/currency or explicitly approved price display, and booking/cancellation policies. A mode is `in_clinic` or `online`; it is not a separate purchased programme.

Do not make the patient choose a practitioner or location when only one is eligible. Different duration or price by mode is represented in the service offering, not inferred from text. Unpublished/incomplete offerings are not bookable.

## Availability

The scheduling source of truth is the PhysiX database for the proposed native flow. Recurring practitioner hours are defined in the clinic's confirmed IANA timezone. Generate bookable instants from hours, holidays/overrides, staff blocks, service duration/buffers, resource capacity, booking horizon, minimum notice and existing reservations.

Store start/end instants and the relevant timezone; never use “Tuesday” as an ID. For online appointments show clinic and patient-local times when different. Exercise schedules and clinical appointments are separate records even when shown together on a calendar.

Before implementing synchronization, ask whether the clinic already has an authoritative booking system. Do not permit a calendar with unobserved outside bookings to advertise unconditional live availability. Calendar export is not two-way sync. A provider integration requires an explicit conflict/source-of-truth decision.

## Guest flow

Public browsing and time selection require no account. Collect only the necessary booking identity/contact data and approved policy acknowledgement. Avoid clinical history in public booking forms; a generic optional reason can still be sensitive and needs review before enabling.

A selected slot is not yet a confirmed appointment. If a multi-step flow uses a temporary hold, the server issues its opaque ID, expiry and ownership proof. Proposed hold duration is configurable and must be coordinated with the payment flow; no arbitrary timeout is a clinic policy.

The final server command validates current offer/policy, contact verification where required, price snapshot, hold ownership and remaining availability in one authoritative operation. Persist the appointment and any payment obligation. Queue confirmation after commit. Email delivery failure must not undo a real reservation or cause a duplicate booking on retry.

After confirmation, a patient may claim/manage the appointment using verified account ownership or a scoped, expiring booking-management token. A matching typed email is not sufficient to reveal or attach an existing patient's records. Resolve duplicates through a verified workflow; do not merge patients automatically by name.

## States and payment separation

Appointment states: `held → confirmed → completed | no_show | cancelled`; an unused hold becomes `expired`. A change of time is an auditable reschedule, not silent mutation without notification. Service content and policy snapshots remain attached to the reservation.

Payment obligations independently record not-required/pay-at-clinic, pending, paid, failed, refund-pending and refunded as applicable. A completed appointment need not be paid, and a paid appointment need not have occurred. Clinical completion and accounting settlement are separate actions with separate permission checks.

For pay-at-clinic policy, server confirmation can reserve the appointment immediately while accurately showing the amount due. For prepaid policy, a pending checkout/hold is not confirmation. The displayed confirmation is based on the persisted appointment state, not a query-string flag.

## Concurrency and retries

Prevent overlapping active reservations in the database, including necessary buffers and required room/resource allocation. A simple uniqueness key on the starting timestamp is insufficient when services have different lengths. Use a reviewed range-overlap exclusion and/or serialized allocation transaction appropriate to the actual resource model. PostgreSQL supports exclusion constraints for non-overlapping reservations (R3 in CLINIC_BRIEF).

Use a single active-reservation allocation model so holds and confirmed appointments cannot live in separate tables without a shared conflict guard. Represent blocking status explicitly. Do not depend on a volatile `now()` expression in an index predicate to magically release expired holds; expire them in an authorized transaction/job and revalidate at booking time.

Two simultaneous attempts for the last capacity-one slot must yield exactly one reservation. Return a recoverable conflict to the other person and preserve their service/contact draft safely. A repeated command with the same idempotency key/payload returns its original result; changed payload with that key is a conflict, not a second appointment.

Reschedule atomically: validate/allocate the replacement before releasing the current reservation in the same transaction or an equivalent tested workflow. If the new time fails, the original appointment remains. Staff-created appointments use the same overlap constraints; UI privilege does not bypass capacity rules.

## Payment delay beyond hold expiry

A payment event can arrive late. Never confirm a time that has already been allocated to someone else. The reconciliation worker verifies current hold/reservation ownership and tries an atomic conversion. If that is impossible, record a paid-but-unallocated exception, tell the patient the appointment is not confirmed, and trigger the clinic's authorized resolution/refund process. Do not auto-charge again or issue uncontrolled refunds in a retry loop.

For the first prepaid booking release, either constrain payment methods/timing to a tested reservation strategy or keep delayed methods disabled for appointment checkout. A digital programme purchase has no appointment inventory and can have a different payment-method policy.

## Cancellation, no-show and reminders

The clinic must approve minimum notice, cancellation/reschedule cutoff, staff exceptions, deposits/refunds, no-show handling and reminder timing. Store the policy version accepted at booking. Cancellation does not by itself prove a refund; any refund follows a separately authorized payment command and auditable result.

Messages use a minimal appointment template and avoid symptoms or treatment details on lock screens. Confirmation/reminder delivery uses a durable outbox, retry/backoff and deduplication keys. Cancel/reschedule invalidates obsolete reminders. Delivery timestamps are evidence of attempted/provider-accepted delivery, not proof the patient read the message.

Online visits use a clinic-approved video provider or meeting process. Store private per-appointment join information; show it only to authorized participants at the configured time. Do not promise a working video visit until creation, access and recovery have been tested. Building a video platform is not an initial requirement.

## Practitioner minimum workflow

The practitioner can view a day/week, create availability and exceptions, book on behalf of a patient with appropriate verification, move/cancel appointments, see pending payment exceptions and mark attendance. Staff cannot edit their own permission level or read unrelated health records through the calendar.

## Required acceptance cases

Normal guest booking; account booking; empty calendar; stale slot; two simultaneous clients; different service lengths/buffers; blocked dates; DST boundary; idempotent retry after lost response; hold expiry; payment delay; email failure after persistence; safe account claiming; expired manage link; reschedule conflict preserving old time; cancellation and refund tracked separately; staff scheduling conflict; online join-link isolation.

No live reservation is advertised as successful when the scheduling provider/database is unavailable. A clearly labelled contact/request fallback is acceptable only when it says it is not a confirmed appointment.


## Local implementation status — 19 September 2026

/book and /app/book now save test appointments through /api/physix/v1 into local PostgreSQL. The database protects practitioner/patient overlap ranges and replayed command identities; cancellations retain records and free the allocation. Samples use a single practitioner, 45-minute offers, explicit UTC and generated test windows. The patient and staff views read the same stored records. This does NOT complete the guest-verification, configurable-policy, holds, resource/buffer, reschedule, notification, real external-calendar or payment parts of this contract. No actual clinic appointment is reserved.

## Current local interaction correction — mint refresh

Service selection now advances directly to available times from both /book and /app/book. Public Home illustration cards deep-link to the existing public service and eligible visit mode. Native browser history records only public service, mode and step; Back/Forward remain usable. Contact details and selected appointment instants stay out of the URL.

The selected time is bound to its offer ID, visit mode and day. A stale slot cannot be reused for another selection. A full reload without an in-memory slot returns to available times rather than pretending to have a complete review. Confirmation uses a snapshot created after the successful reservation response; the persisted appointment is available from /app/appointments after reload. Existing local database conflict, ownership and idempotency rules are unchanged. No real-clinic guest verification, policies, holds, payments or production release were added by this correction.
