# Product specification

## Product outcome

PhysiX should feel like a useful personal care app from the first mobile visit, while still being a public, searchable clinic website. A visitor can understand the clinic, find an appropriate service and book. A returning patient sees their next appointment and the exercises or programme available to them. The physiotherapist can operate the schedule and assign/review patient plans without using developer tools.

Do not position this as a fitness-social network, a marketplace, an automated diagnosis system or a full electronic health-record replacement.

## People and surfaces

A visitor reads public clinic/service/programme information and chooses appointments. A patient owns their appointments, purchases, assigned plans, saved exercise sessions and permitted conversations. A practitioner sees their authorized patients, appointments, assignments and shared check-ins. An owner/administrator manages clinic configuration and access; administrative access is not automatically unrestricted access to every health record. Reception access, when needed, is restricted to scheduling/contact information rather than symptoms and clinical notes.

The same account may have more than one role; explicit server membership/assignment determines access. Buying a self-guided programme does not automatically establish a treating-practitioner relationship.

## Three offer types

| Offer | What the person gets | What it does not automatically mean |
|---|---|---|
| Appointment service | A reserved in-clinic or online consultation/treatment time | A purchased exercise programme, recurring access or a completed assessment |
| Self-guided exercise programme | Access to a published, clinician-reviewed programme with clearly stated scope and duration | Personalized diagnosis, an individual prescription or unlimited messaging |
| Individual care programme | A practitioner-assigned plan following the clinic's assessment/eligibility process | Instant exercises immediately after purchase unless the practitioner has actually assigned them |

A future care package can combine appointments, digital content and reviews, but each entitlement must be explicit. Keep one-time sales, subscription terms and appointment credits distinct. No package prices or service inclusions are approved by this document.

## Main journeys

**New clinic patient:** Home → Book → choose an eligible service and visit mode → real available time → contact details and policies → persist reservation/payment according to clinic policy → confirmation → optional verified account link → appointments in the patient area.

**Existing clinic patient:** Sign in → Home with next appointment and active plan → view instructions → complete or pause an exercise session → save actuals/check-in → see honest saved progress. Their practitioner reviews what was actually shared and may publish a revised assignment.

**Digital programme purchaser:** Public Plans → programme detail with exact inclusions and access terms → authenticated/verified purchaser identity → hosted checkout → payment pending or server-confirmed fulfilment → My Plan. A ready-made programme can activate a pinned published version; a personalized purchase displays “Assessment/plan pending” until an authorized clinician assigns content.

**Practitioner:** Day calendar → appointment/patient → review assigned plan and patient-shared entries → assign a reviewed template or create a draft → publish a version → set schedule → review adherence/feedback → amend prospectively without rewriting completed sessions.

## Scope for the first usable release

Public Home, services inside Book, shareable service detail, genuine appointment availability and confirmation, clinic/practitioner/first-visit information, authentication with recoverable errors, patient appointments, assigned/purchased plan library, plan detail, guided exercise sessions, simple check-ins/history, and a minimal practitioner calendar/patient/assignment workspace.

Private text messaging belongs in the first connected care release only with a clear response policy and tested patient-practitioner isolation. It must not imply continuous clinical monitoring. Public storefront and checkout are a distinct increment before paid programmes go live; they should not delay proving the basic assigned-plan experience.

A technical clinic-booking pilot may precede paid programme launch. It is a milestone, not a claim that the entire requested product is finished.

## Not in the initial release

Social feeds, friends, challenges, leaderboards, calories/lifting totals as default progress, coach marketplace, referrals/guest passes, native HealthKit integrations, watch support, AI-generated prescriptions, automated exercise progression, insurance claims, full medical-record management, custom video-calling infrastructure and recurring billing are out unless explicitly reprioritized.

Progress photos and patient video uploads are deferred by default because the requested initial tracking can be delivered with fewer sensitive media flows. Minors/guardian access requires an explicit clinic/legal decision and dedicated permissions; it is not silently supported by an adult-account model.

## What “tracking” means

Show planned versus completed exercise sessions, saved completion history, clinician-selected check-in fields and patient-reported function/symptoms where appropriate. The clinician approves what is collected and how it is interpreted. The application does not infer diagnosis, safety or improvement from a number or a colour.

Adherence is completed scheduled sessions divided by eligible scheduled sessions in the selected period. Exclude practitioner-paused/cancelled prescriptions as explicitly recorded; do not hide them from history. Display counts and the period. With no eligible sessions show “No sessions scheduled,” not misleading 0% failure. Self-guided programmes without a schedule show activity history rather than an invented adherence denominator.

Charts label self-reported values, date range and missing entries. Do not fabricate calories, recovery scores, comparison patients or testimonials. Clinical pause and rest are not broken fitness streaks.

## Success criteria

A new visitor can book without first navigating an account system. A returning patient can immediately find the next useful action. An eligible paid programme appears once and persists across sessions. Exercise completion is honest about unsaved/pending work. A practitioner can manage these workflows without SQL or manual file edits.

Instrument completion of booking steps, appointment conflicts, purchase fulfilment delay, support problems and active plan use with privacy-preserving operational events. Do not send symptom answers, treatment identifiers or message contents to generic marketing analytics. Set commercial targets after learning the clinic's actual volume; none are invented here.
