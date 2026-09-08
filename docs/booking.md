# Booking domain specification

## Scope and source of truth

R1 uses one Supabase PostgreSQL schedule for online, in-clinic, and staff-entered appointments. No two-way Google Calendar sync, external booking marketplace integration, deposits, waitlist, room capacity or recurring group sessions in R1. If the clinic cannot keep one authoritative calendar, stop and revisit the scheduling decision before live launch.

This is the most correctness-sensitive non-clinical domain. Implement and test it as a vertical slice, not as a pretty calendar followed by persistence later. [User flows](user-flows.md) owns screen behavior; [data model](data-model.md) owns tables.

## Offering and time model

An offering combines appointment type, practitioner and mode. The marketing service selected by a visitor can suggest an offering, but does not diagnose which treatment they require. While Charlie is the only practitioner, do not show a redundant therapist-selection step.

Clinic timezone is `Europe/Sofia`, not fixed UTC+2 or UTC+3. Store bookings as UTC instants. Generate recurring availability from local calendar dates and local schedule intervals in the clinic timezone. Use a timezone-aware library, such as the selected `@internationalized/date`, and `Intl` formatting; never parse a displayed date string or rely on the server machine's timezone. Online visits show clinic timezone explicitly and may additionally show the visitor's local time.

For daylight-saving gaps, do not offer nonexistent local times. For repeated local times, either omit the ambiguous interval under the clinic policy or show distinct instants with offsets; never silently choose. Test spring and autumn transitions, month/year boundaries, leap days, and a browser in a different timezone.

Lead time, booking horizon, operating hours, holidays, appointment durations, buffers, reschedule/cancel deadlines and payment terms are **owner decisions**, not facts supplied by the mockup. Local fixtures may use clearly marked examples. Live confirmation requires approved configuration.

## Public availability

`GET /api/availability` accepts only whitelisted offering ID, clinic local date/window and locale where needed. Cap the window and result size. Return available start instants, offering metadata/version and timezone, not raw calendar entries, patient identifiers, block reasons or private meeting data. Do not allow enumeration of arbitrary staff calendars. Add durable abuse controls and bounded caching; availability is advisory and is always revalidated at confirmation.

Calculation: intersect effective working intervals and allowed mode/offering; apply lead time/horizon; subtract all active occupied ranges with buffers; ensure the whole proposed session and its required buffer fit the allowed schedule. Breaks, closures and exceptional hours participate in the same calculation.

## Selection and verification

No slot hold in R1. A selected time is explicitly provisional until confirmed. The optional short-lived server draft contains safe selection data and an opaque browser binding, not a reservation. Do not put contact details or symptoms into query parameters/localStorage. Contact fields remain in form/session memory until submitted securely; production must minimize what is retained before confirmation.

Use passwordless email verification at the final stages, not a sign-up wall before browsing. An email OTP challenge must not itself book anything. Explain the patient account before initiating verification. Persist only needed context and validate all values after verification. No marketing permission is inferred.

## Atomic confirmation contract

`confirm_booking` receives validated offering/start, contact fields, acknowledged offering/policy versions, an idempotency key and the request identity. Its exact SQL signature is an implementation detail; invariants are not.

1. Verify a real, non-anonymous Auth user and allowed request; derive patient ID from the verified identity. Perform durable rate limiting at the server boundary.
2. Resolve the idempotency key scoped to actor and operation. Same key/same normalized payload returns the stored result; same key/different payload is rejected.
3. Lock the practitioner's schedule-version row. Reload offering, policy and schedule; reject inactive or changed/unacknowledged terms.
4. Recompute end, occupied range, lead time, horizon and schedule eligibility using server values. Do not trust a signed or unsigned client slot token as proof of ongoing availability.
5. Insert appointment, contact snapshot and active calendar entry. The database exclusion constraint is the final overlap guard across every booking mode/source.
6. Add audit and notification-outbox events, record the idempotent result and commit. Translate conflict into `SLOT_UNAVAILABLE`, not an internal SQL dump.

No external email/video/payment request belongs inside this transaction. The browser's success state reads persisted ownership-checked appointment data. An HTTP retry or double click cannot make two bookings for the same operation.

## Appointment state machine

`confirmed -> completed | no_show | cancelled`.

Rescheduling is a revision of a confirmed appointment, not a delete-and-recreate flow. A cancelled/completed/no-show appointment cannot be rescheduled by the patient. Only authorized staff can correct historical administrative states, with an audit event and reason code. A booking draft is not an appointment status. There is no fake `confirmed` state while persistence is pending.

Cancel/reschedule use POST, identity/ownership checks, database policy checks and idempotency. Rescheduling locks the original and schedule, validates expected revision and new slot, updates both appointment and occupancy, then queues a versioned notification. If any step fails, the original appointment stays intact. Cancellation releases occupancy atomically and cancels/supersedes obsolete reminder jobs.

## Staff and manual bookings

Staff must pass the same schedule/overlap rules. A privileged override of a policy is explicit, separately authorized and audited; it never bypasses the overlap constraint. A working-hours change cannot silently invalidate booked appointments. Display affected appointments and require a separate action to move/cancel them.

A phone booking may have no linked Auth patient yet. Do not attach it to whichever account submits the same unverified email or guesses its ID. In R1 staff links it only after an approved identity-verification process, or the clinic manages it directly. Automating guest-claim flows is a separate security task.

## Notifications and online-session preparation

Confirmation is durable before email dispatch. Outbox rows carry appointment revision, so a delayed worker suppresses obsolete reminders after reschedule/cancellation. Worker claims use a lease and bounded retries; crashed leases expire. Design delivery as at-least-once, using stable provider idempotency where supported and safe message content otherwise. A staff queue surfaces permanent failures; never rely on exactly-once delivery.

Online links are unique/private per appointment, created through the approved operational process and visible only after authorization. Do not use a single public meeting link. Staff has a preparation queue and a documented response process for missing links.

## Required tests before live booking

Competing confirmations for overlapping intervals; same time in different modes; buffers; blocks versus bookings; concurrent schedule edit; idempotent retry after lost HTTP response; duplicate key with changed payload; stale fee/policy; expired/foreign draft; verification expiry; user A accessing user B; reschedule conflict preserving original; cancellation racing reminders; timezone/DST; provider failure after successful commit. Refer to [testing](testing.md) for release gates.
