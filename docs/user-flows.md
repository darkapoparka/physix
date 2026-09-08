# User journeys and interaction contracts

The route inventory is in [routes](routes.md); scheduling invariants are in [booking](booking.md). This document owns the experience between screens.

## 1. New patient books a first visit

Home -> Book -> select First appointment and mode -> choose available date/time -> contact/details -> verify email if needed -> review -> explicit Confirm -> durable confirmation -> optional Account.

The initial entry does not require choosing a technical treatment method. The clinician approves actual appointment-type wording. Charlie is preselected while there is only one practitioner. A single provider must not create a meaningless 'choose therapist' step.

Show fee, duration, location/mode, clinic timezone and cancellation policy before confirmation. At email entry explain that verification secures the booking and creates/accesses a passwordless patient area. No marketing opt-in is bundled with this. Do not label an unverified submission a confirmed appointment.

A selected slot is not held. After verification, fetch current availability and pricing. If the slot was taken, retain the visitor's contact/context and offer alternatives. If price/policy changed, show the new terms and request explicit review instead of silently confirming.

If the network drops after Confirm, retry with the same idempotency key or fetch the persisted result. Do not create another appointment or tell the visitor to start again blindly. Email delivery failure shows a confirmed appointment with a notification problem, not a booking failure.

## 2. Service-first discovery

Home service card / menu -> Services -> local search or issue chip -> service detail -> Book with a validated suggested offering.

Search matches the approved bilingual service catalogue and everyday synonyms. It does not diagnose or give exercises. Free text stays in component memory, not browser history, analytics or a clinical record. No result: clear query, browse all, or choose a first assessment. Do not fabricate an AI answer.

Body-area chips supplement the service list. Their labels are understandable without their images. Card arrows are part of the same link, not nested independent controls.

## 3. Human online visit

Online -> what a remote appointment includes/does not include -> Book with online mode -> normal verification/confirmation -> Account appointment -> Join when a private per-appointment link has been prepared.

No symptom-intake questionnaire, suitability prediction or 'reviewed by Charlie' AI badge in R1. The page states that online care has limitations, and the clinician may recommend in-person evaluation. Clinical copy is approved, not improvised by the developer.

If video configuration or the clinic's operating process is unavailable, explain that online booking is not yet offered and provide the approved contact/in-clinic alternative. If a confirmed online appointment lacks a link, show 'Joining details are being prepared' plus actual contact information; staff sees an actionable preparation item.

## 4. Returning patient

Account -> verify email if signed out -> next appointment -> view details / reschedule / cancel / join. Later, active plan is near the top of Account rather than hidden behind marketing sections.

Reschedule: show policy, choose a new slot, review and confirm. Success changes the existing appointment atomically and emits a change notification. Conflict keeps the original appointment. Cancellation requires explicit confirmation and has a policy-aware server result. Links in email open a page; GET must never cancel a booking.

An expired session returns to the relevant protected route after verification with a safe internal return target. An old appointment link never exposes another person's data.

## 5. Staff daily operation

MFA sign-in -> today's agenda and preparation queue -> review online-session links and notification failures -> record phone bookings/blocked time in the same calendar -> perform appointments -> mark completed/no-show when appropriate.

All manual and public bookings share conflict rules. Staff should enter phone bookings before promising a time. Changing working hours cannot silently cancel existing appointments. Overlapping blocked time triggers a conflict resolution prompt; appointment movement is explicit and notified.

An admin cannot silently impersonate a patient. Sensitive administrative access is recorded. A receptionist sees administrative contacts and schedules, not patient-specific clinical plan contents.

## 6. R2 paid educational programme

Programme detail -> explicit offer/terms -> verify identity -> create checkout for the server-defined product/price -> hosted payment -> pending/result page -> verified fulfillment -> programme in Account.

The return page polls/fetches actual order/entitlement state. It must tolerate webhooks arriving before or after the browser return. A cancelled checkout does not grant access. The user can resume a legitimate pending purchase without duplicate fulfillment. Refunds/revocation are reflected in entitlements and future signed-media access.

Educational content is not marketed as a personalized treatment prescription. A tailored clinical plan follows a separate clinician approval flow and must not be auto-created by a purchase.

## 7. R2 clinician-assigned plan

Clinician creates draft -> reviews actual patient context outside/inside an approved clinical workflow -> validates plan and stop/escalation instructions -> publishes a version to that patient -> patient sees approved version -> records completion -> clinician revises by publishing a new version.

Patient progress means task completion, not clinical improvement. No unvalidated 'mobility score', guaranteed recovery countdown, or pressure to continue through concerning symptoms. Pausing and contacting the clinician remain easy.

## Mobile continuity

Preserve normal browser back/forward navigation. Closing search or menu returns focus to its trigger. A bottom sheet is an enhancement to a semantic dialog, not the only way to reach content. Dock never covers the final card, focused input or form error. Do not block zoom or hijack scrolling. On small phones the page scrolls; it is not scaled down to fit a poster.
