# Product requirements: PhysiX

Status: implementation proposal accepted as the working build baseline; owner confirmations remain in [open questions](open-questions.md).

## Purpose

PhysiX is a physiotherapy clinic brand in Bulgaria, led by the user's friend Charlie. The public website must help a visitor understand the offer, trust the practitioner, and book an appropriate human appointment. The patient web application then helps that person manage appointments and, later, follow an approved plan at home.

The design should feel calm, modern and deliberately mobile, not a long generic clinic template. The chosen Physeo WordPress template and generated PhysiX mockup supply visual inspiration only. We are implementing a custom SvelteKit application, not installing or reproducing the WordPress theme.

## Confirmed versus assumed

Confirmed from the owner: brand PhysiX; Bulgaria; Charlie is the featured practitioner; in-person bookings and online consultations are primary goals; services and professional credibility must be visible; future paid plans/guides and an account area are desired; mint/teal visual direction with a compact four-item dock is the latest design baseline.

Not verified: legal business name, city/address, actual credentials, professional title/registration, outcomes, years of experience, review count, service list, prices, staff count, opening hours, domain, existing booking system or online-care operating model. The owner's praise is not evidence for publishing a national ranking. Generated faces and reviews are placeholders.

Working assumptions: one clinic and one bookable practitioner initially; adults booking for themselves; Bulgarian launch content, English-ready structure; Europe/Sofia clinic timezone; EUR prices; pay-at-visit or staff-arranged payment for initial appointments. Each is reversible before implementation of the affected feature. See [decisions](decisions.md).

## Users and jobs

**New patient:** Find out whether PhysiX offers relevant care without self-diagnosing; understand the first appointment, location, duration, price and next available times; book without creating a password.

**Returning patient:** Find the next appointment immediately, reschedule or cancel within the published policy, join a booked online session, and later resume their assigned plan.

**Charlie/clinician:** Control availability, see appointments, handle cancellations and online meeting preparation; later publish and revise patient plans with a recorded author and approval.

**Reception/owner:** Manage administrative bookings and blocked time, respond to failures and maintain approved commercial information without seeing unnecessary clinical data.

## Priority hierarchy

1. Useful public discovery and confidence in real people.
2. A reliable completed appointment, not merely a submitted form.
3. Clear patient and staff follow-through.
4. Appropriate paid education/ongoing support.
5. Optional AI assistance only after the preceding service works safely.

Marketing and the application share one domain and visual system. There is no separate signup gate to the 'real website'. Account creation happens at the point it provides a concrete benefit.

## Release plan

**M0 — local foundation and design validation.** A working responsive public UI, navigation, searchable service fixtures, and a clearly labelled booking preview. Runs without cloud secrets. This is a demo milestone, not a live clinic launch.

**R1 — dependable clinic launch.** Approved public content; real scheduling and email verification; patient appointment management; staff calendar/blocking/manual booking; transactional notifications; authorized online-session links when that service is operational; privacy, accessibility, monitoring and recovery controls. Real public appointments remain disabled until the launch gate passes.

**R2 — plans and education.** Clinician-authored assigned plans and a separately described paid educational programme catalogue. Purchases have durable entitlements; published clinical plans have versioned human approval. No autonomous exercise prescription.

**R3 — optional AI.** Initially clinic FAQs/navigation or clinician draft assistance. Direct patient-specific functionality requires a new intended-use assessment, clinical safety work, privacy evaluation and tests. AI is labelled as AI, not Charlie speaking live.

## Explicit non-goals for R1

No multi-clinic marketplace, coach onboarding, native iOS/Android app, custom video-call engine, open-ended live chat, subscriptions, cart of physical products, insurance billing, wearable integration, diagnostic score, treatment recommender, symptom uploads, electronic medical record replacement, or autonomous AI plan generation. No headless CMS, global state library, microservices or vector database without an demonstrated need.

Responsive web first. Installability and native packaging can be reconsidered after actual recurring use; sensitive pages must never be casually cached offline.

## Success measures

Measure booking start-to-confirmation, email verification completion, slot-conflict rate, failed notifications, cancellation/reschedule completion, staff preparation failures, and basic public-page conversion. Do not invent expected conversion rates. Establish a baseline after launch and set targets with the owner.

Operational invariants are stricter: no overlapping active entries for a practitioner, no cross-patient data access, no paid access without a valid entitlement, and no unapproved clinical plan shown as approved. See [testing](testing.md). Analytics must follow the restricted event policy in [operations](operations.md), not track health interests or patient identities.

## Launch definition

R1 is launched only when a real person can find approved information, view correct availability, verify contact, receive one durable booking, access it privately, change it within policy, and get useful staff support when a provider fails. Charlie must be able to run the calendar without developer intervention. The owner signs off real content, staff training, operational policies, data processing and the production environment.

A beautiful homepage, successful local build, or green unit test suite alone is not launch readiness.
