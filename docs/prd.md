# Product requirements: PhysiX

Working implementation baseline; owner confirmations remain in [open questions](open-questions.md). Updated for approved Gymaf reuse; this is not a production-readiness claim.

## Purpose

PhysiX is a physiotherapy clinic brand in Bulgaria led by the owner's friend Charlie. Its public website helps visitors understand the offer, trust the practitioner and book a human appointment. The personal patient application helps them manage visits and, later, follow clinician-approved care at home or access purchased educational programmes.

The design is calm, modern and deliberately mobile. The selected Physeo WordPress template and PhysiX mockup are visual inspiration, not licensed source to copy or a device-sized implementation. We are building one custom **Next.js / React application**, reusing selected Gymaf components and connected implementation ideas. The public site and signed-in experience have a common identity/backend, not two sites connected by a login redirect.

## Confirmed and assumed

Confirmed: PhysiX brand; Bulgaria; Charlie featured; in-clinic booking and human online consultations are priorities; visible services and genuine professional credibility; later paid plans/guides; mint/teal styling and compact Home/Book/Online/Account dock. The owner approved using Gymaf's useful app screens/functions and revising the framework/architecture accordingly.

Not verified: legal identity, city/address, credentials/title/registration, outcomes/years/ratings, services/prices, hours, staff count, domain, current scheduler and remote-care operating model. Generated people/reviews are illustrative. Personal praise is not evidence of a national ranking.

Working assumptions: one clinic/initial practitioner, adults booking themselves, Bulgarian-first with English-ready routes, Europe/Sofia schedule, EUR money model, staff-arranged appointment payment. Confirm affected assumptions before live implementation/launch. [Decisions](decisions.md) records changes.

## Users and jobs

New patient: find relevant services without self-diagnosing; understand first appointment/location/duration/price/availability; book without creating a password or first understanding technical treatment names.

Returning appointment-only patient: find the next visit immediately, change it within policy, join a human online appointment and access practical information. No coaching invitation, subscription or assigned plan is required for this account to work.

Patient with assigned care: see today's reviewed session, follow approved instructions, record what was actually completed, pause when appropriate and resume acknowledged activity. Activity history is not an inferred health score. Purchased educational programmes are separately identified.

Charlie/clinician: manage availability/appointments/online preparation, and later draft/review/publish/assign/version clinical care with recorded responsibility. The useful Gymaf builder/session ideas should reduce duplicated engineering, not replace clinical approval.

Reception/owner: manage administrative bookings, blocks, failures and commercial information without unnecessary clinical access. Being an admin is not automatically a clinical-record permission.

## Priority hierarchy

Public discovery/trust -> one reliable booked appointment -> useful patient/staff follow-through -> appropriate paid education/ongoing care -> separately reviewed optional AI. Public information is not hidden behind a signup wall. A patient account is introduced when it provides a concrete benefit.

The personal app should feel more task-focused than the public homepage, while sharing branding and navigation consistency. It is not a rebranded fitness marketplace. Reuse the smallest useful Gymaf pieces, not its whole feature set, demo store or commercial assumptions.

## Releases

M0: locally runnable public UI and explicitly synthetic booking/account/plan/session previews. No cloud keys required. Demonstrates the design and the patient-app direction, not real authentication, appointments or saved clinical data.

R1: approved public content, real availability and passwordless verification, atomic booking, patient appointment management, staff calendar/manual blocks and bookings, transactional notifications, authorized human-online links when operational, and tested privacy/accessibility/recovery controls. No real appointments until the launch gate passes.

R2 has independent care and education tracks. Assigned care is human-authored, versioned and scoped to a patient, with durable session/activity records. Education has product scope, verified purchases and protected content. A clinician may assign care without Stripe; a purchase does not approve a clinical prescription. Messaging/check-ins require a real staffed purpose and are not prerequisites for the minimal plan experience.

R3: optional explicitly disclosed AI, initially bounded navigation/FAQ or clinician draft assistance. Patient-specific functionality requires its own intended-use, clinical, privacy and evaluation work. AI never pretends to be Charlie personally responding or publishes treatment autonomously.

## Non-goals for initial launch

No multi-clinic/coach marketplace, cross-product SSO/shared Gymaf customers, native app, custom conferencing, unrestricted live chat, subscription platform, physical-product cart, insurance billing, wearables, diagnostic/mobility score, treatment recommender, symptom uploads, medical-record replacement or autonomous exercise generation. No microservices, vector database, CMS or global state framework without demonstrated need.

Responsive web first; installability/native packaging can be revisited after actual use. No casual offline caching of patient data. Keep the reference submodule outside runtime/build/deployment and replace uncleared third-party assets.

## Success and launch criteria

Measure actual booking start-to-confirmation, verification completion, slot conflicts, delivery failures, successful changes and staff preparation failures. Later measure assigned-session usability and acknowledged completion, not invented treatment efficacy. Establish baselines; do not promise conversion gains without data. Analytics excludes health interests/identities.

Required invariants: no overlapping active practitioner occupancy; no cross-patient access; no paid access without valid entitlement; no unapproved clinical content presented as approved. Test directly at data/API boundaries and in the browser.

R1 launch means a real visitor sees approved information/correct availability, verifies identity, gets one durable booking, manages it privately and can receive staffed support when a provider fails. Charlie can operate the calendar without a developer. Owner approval covers content, operations, privacy/vendor terms, staff rehearsal and deployment. A beautiful homepage, local build or inherited Gymaf test report is not enough.
