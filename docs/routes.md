# Website and application map

All user-facing routes use `/:lang`, with `bg` and `en` allowed by a route matcher. `/` redirects to `/bg`; preserve deliberate language choice on navigation. Unsupported locales return 404. Route groups in SvelteKit organize layouts but do not appear in URLs.

## Public routes

| Path after /:lang | Page / primary job | Main components | Release |
| --- | --- | --- | --- |
| `/` | Home: discover, trust, start booking | Header, Hero, ServiceFinder, IssueRail, ServiceRail, PractitionerPreview, approved review, optional programme teaser, VisitInfo | M0/R1 |
| `/services` | Search/browse services | compact heading, prominent finder, category/area chips, readable cards, no-result state | M0/R1 |
| `/services/[slug]` | Understand a service and the first appointment | editorial media, concise explanation, linked offering, price/duration if configured, FAQ, Book CTA | M0/R1 |
| `/charlie` | Practitioner profile | actual portrait, approved professional title, verified credentials, approach, clinic link, Book CTA | M0/R1 |
| `/clinic` | Practical visit information | address, accessibility, travel/parking if verified, opening hours, phone and directions links | M0/R1 |
| `/online` | Human online consultation information | scope, what to expect, suitability explanation approved by clinician, visit type CTA, not a fake chat | M0/R1 gated |
| `/faq` | Practical answers | simple accessible accordion; booking, first visit, cancellation, online visit | M0/R1 |
| `/programmes` | Public educational catalogue | scope, product cards, prices, filters only if useful | R2 |
| `/programmes/[slug]` | Programme detail | educational purpose, author, preview, inclusions, access terms, purchase CTA | R2 |
| `/legal/privacy` | Approved privacy notice | version/date, controller, purposes/recipients, rights and contact | R1 |
| `/legal/terms` | Service and account terms | version/date, actual business details, responsibilities and limits | R1 |
| `/legal/cancellation` | Cancellation/rescheduling/payment rules | policy windows, fees only when approved, contact recovery path | R1 |
| `/legal/accessibility` | Accessibility/support statement | known limitations, tested scope, contact route | R1 |

Services handles body-area discovery without an extra diagnosis catalogue. Add dedicated condition pages only when there is genuine clinician-reviewed content, not SEO filler. Homepage menu links to Services, Charlie, Clinic, FAQ, optional Programmes, language switch and Account.

## Focused booking routes

| Path | Job / access |
| --- | --- |
| `/:lang/book` | Public offering, visit mode, date/time selection; real availability when enabled. Selected time is not held. |
| `/:lang/book/details` | Contact and policy summary, email-verification entry when signed out. Draft is bound to session. |
| `/:lang/book/review` | Verified user reviews authoritative offering, time, fee and terms, then explicitly confirms. |
| `/:lang/book/success/[appointmentId]` | Authenticated owner-only durable result. Direct access without ownership is denied; no success from query flags. |

Use a focused header/back control and progress label, not a second competing bottom dock. Separate routes provide reload/back behavior; underlying shared BookingSummary and domain operations prevent duplicate flows. Invalid or expired drafts return to selection with a clear explanation.

## Identity and patient routes

| Path after /:lang | Job |
| --- | --- |
| `/sign-in` | Email entry and generic send-code result; do not reveal account existence |
| `/verify` | Email code entry/resend; post-verification safe internal return target |
| `/auth/callback` | System route only if the chosen official passwordless flow uses token links; validate token and allowlisted internal redirect |
| `/account` | Next appointment; later active plan; useful signed-out/empty state |
| `/account/appointments` | Own upcoming and past appointments |
| `/account/appointments/[id]` | Own details, status, safe change/cancel controls, private online link |
| `/account/appointments/[id]/reschedule` | Focused atomic replacement flow preserving old appointment on failure |
| `/account/settings` | Name/contact preferences, locale, sign out; change identity email through verified provider workflow |
| `/account/privacy` | Request access/export/deletion with documented human processing in R1; do not pretend instant legal erasure |
| `/account/plans` | R2 clinician-assigned plans and separately purchased programmes |
| `/account/plans/[id]` | R2 own published plan version and task completion |
| `/account/programmes/[id]` | R2 owned educational content and progress |
| `/account/programmes/[id]/lessons/[lessonId]` | R2 entitlement-checked lesson and authorized media |
| `/account/orders` | R2 order status, receipts/support and refunds as supported |

Patient dock still uses Home / Book / Online / Account; active Account covers all its descendants. Book is not 'my appointments'. Sign-out is a POST mutation and clears user-specific cached state.

## Staff routes

All require verified staff identity and MFA. Every load/action/endpoint enforces its own permission, beyond layout protection. Staff uses a separate practical navigation layout, not the patient dock.

| Path after /:lang | Job / minimum role |
| --- | --- |
| `/staff` | Today's agenda, notifications needing attention, online-session preparation / receptionist |
| `/staff/calendar` | Day/week list, appointment create/change, blocks / receptionist |
| `/staff/appointments/[id]` | Administrative details and status controls / receptionist; clinical details not included |
| `/staff/availability` | Working hours/time off for permitted practitioners / admin or delegated scheduler |
| `/staff/offerings` | Bookable types, durations, fees, published status / admin |
| `/staff/notifications` | Failed/queued message status and safe retry / receptionist |
| `/staff/access` | Staff invitations/role lifecycle if built; admin only; never self-promotion |
| `/staff/patients/[id]/plans` | R2 scoped clinician plan authoring and approval |
| `/staff/programmes` | R2 educational catalogue authoring/publishing / admin and approved clinician workflow |

R1 staff-access provisioning can be a documented owner-operated administrative procedure rather than a new UI. Do not create the route until implemented.

## Nonlocalized system endpoints

`/api/availability` returns public safe slot DTOs; strict allowlisted inputs, bounded date range, no contact data. `/api/jobs/notifications` is an authenticated job endpoint with no patient-facing HTML. `/api/webhooks/stripe` exists only in R2 and validates the signature on the raw body. `/api/health` returns a minimal liveness result without configuration leakage. Signed-media access should use authenticated server actions/endpoints, never public storage paths.

SvelteKit actions handle forms; do not expose a parallel REST CRUD API for every table. Sitemap/robots include only approved public routes. Auth, booking, account, staff and disabled features are noindex; private responses also use no-store. Crawling rules are not access controls.

## Shared screen states

Define a real 404, generic safe 500, session-expired redirect, forbidden/ownership-denied response, offline/network failure, provider-unavailable notice, empty schedule, stale-slot conflict and unpublished feature state. Never expose another user's object existence through detailed authorization errors.
