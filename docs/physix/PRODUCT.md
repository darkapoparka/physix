# Physix product specification

## Purpose

Help a rehabilitation center introduce its actual services, arrange visits, and support clients between appointments through therapist-assigned plans, private communication and progress records. Provide staff with one reliable view of scheduling and assigned clients. Community adds optional connection without exposing private care.

## People and jobs

| Person | Primary job |
|---|---|
| Visitor/new client | Understand the center and choose the appropriate first booking path |
| Returning client | Find the next visit, follow an assigned plan and communicate with the therapist |
| Therapist | Manage assigned clients, plans, feedback and own appointment schedule |
| Reception/scheduler | Manage operational appointments and contact details without broad clinical access |
| Clinic administrator | Configure staff, services and operating rules with auditable access |
| Moderator | Publish/manage permitted community content; no implied care-record access |

Roles may be combined for a small team; permissions remain separate. An administrator role does not automatically confer therapist access.

## Target v1 scope

One public BG/EN website and one authenticated account/staff system in one Next.js project. The account system retains the approved template hierarchy, adapting terminology and content deliberately. Public pages and bookings are designed around the center's approved content; they must not replace the account app or become a generic placeholder.

In scope: public center/services/team/contact pages; service eligibility and therapist availability; verified booking, reschedule/cancel and appointment history; staff calendar/attendance; invitation/account lifecycle; therapist-assigned versioned home plans; session logging and feedback; private messages/media within approved bounds; clinically appropriate progress presentation; optional moderated announcements/events and RSVP subject to D-026; complete BG/EN UI; selected payment path; operational/privacy lifecycle; staged and production release acceptance.

## Journeys that define completion

1. New visitor reads an approved service, finds the appropriate assessment/service, selects a qualified therapist or any available therapist, chooses a valid time, verifies identity, confirms, and sees the same saved appointment in account and staff calendar. Repeated submission creates one booking.
2. Returning client signs in, sees next appointment and assigned exercises, changes a booking within policy, and retains a consistent calendar and notifications after reload.
3. Therapist creates and publishes a plan, assigns it to the correct client, reviews actual attempts/feedback, and sends a private response. Another client/therapist cannot read the records.
4. Reception manages a cancellation or blocked time without silently double-booking, losing history or gaining access to private clinical notes.
5. A client optionally joins an approved community event, can cancel participation, and sees no other client's care details or private attendee identity.
6. Every journey works in BG and EN, at phone and desktop widths, with loading/empty/error/retry states and keyboard access.

## Explicitly outside v1 unless a new decision expands it

Native iOS/Android delivery, Apple Health/watch integrations, AI diagnosis/treatment recommendations, an electronic medical-record system, insurance claims, open therapist marketplace, public patient profiles, competitive recovery leaderboards, live group chat and arbitrary patient-posted feeds. These are not implied by “physio app” or inherited prototype routes. Do not implement them silently or count mocked versions as shipped.

## Product truth

Booking is not medical eligibility, attendance is not payment, exercise completion is not clinical improvement, and a sent notification is not proof it was read. Keep those concepts distinct in both UI and database. Publish no fabricated testimonials, credentials, prices, outcomes or center details. Third-party template imagery/names are reference material until replaced with approved Physix content.

## Release success

All six journeys pass with dedicated synthetic staging accounts and clinic acceptance. No unresolved material cross-account data exposure, double-booking, lost acknowledged writes, missing language coverage or blocked primary controls. Service/payment/community scope matches resolved decisions. Operations, recovery and support have real owners. [tasks.md](../../tasks.md) is the measurable completion list; [VERIFICATION.md](VERIFICATION.md) defines required proof.
