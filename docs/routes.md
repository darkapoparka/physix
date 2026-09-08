# Website and application map

Next.js App Router. All HTML pages use `/:lang` (`bg` or `en`). `[lang]/layout.tsx` validates locale and renders the shared document root. `/` redirects to `/bg` through the small Proxy rule. Unsupported locales return a safe 404. Route groups organize shells without changing URLs. See [architecture](architecture.md) for the filesystem.

## Public routes

Paths below follow `/:lang`.

| Path | Job | Release |
|---|---|---|
| `/` | Home: hero, finder, services, Charlie, real proof, clinic and eligible programme teaser | M0/R1 |
| `/services` | Prominent local service search, body-area categories, readable cards, no-result recovery | M0/R1 |
| `/services/[slug]` | Service explanation, approved media, linked offering/fee/duration when live, Book action | M0/R1 |
| `/charlie` | Real practitioner identity, approved credentials/approach, profile photography, Book | M0/R1 |
| `/clinic` | Verified address, hours, access information, contact and directions | M0/R1 |
| `/online` | Human online visit scope, expectations and booking entry; not a fake chat | M0/R1 gated |
| `/faq` | Practical questions, first appointment, booking and policy | M0/R1 |
| `/programmes` | Educational catalogue, not a diagnosis/treatment marketplace | R2 |
| `/programmes/[slug]` | Actual author, purpose, preview, price/access terms and purchase | R2 |
| `/legal/privacy` | Reviewed controller/purposes/rights/recipients notice | R1 |
| `/legal/terms` | Reviewed business/account/service terms | R1 |
| `/legal/cancellation` | Real cancellation/rescheduling/payment policy | R1 |
| `/legal/accessibility` | Tested scope, known limits and support contact | R1 |

Public menu: Services, Charlie, Clinic, FAQ, eligible Programmes, language choice, Account. Body-area chips lead to the service finder; no empty condition-SEO pages. Public content is not gated by login. Hide unlaunched purchase/online promises, not just broken button handlers.

## Focused booking

| Path after /:lang | Access and job |
|---|---|
| `/book` | Public type/mode/date/time selection; real safe availability in live mode |
| `/book/details` | Contact and policy summary, verification entry; draft bound to session |
| `/book/review` | Verified person reviews authoritative offering, time, price, policy; explicit Confirm |
| `/book/success/[appointmentId]` | Authenticated owner-only persisted result; never success from a query flag |

A selected time is not held. Invalid/expired draft returns to selection with retained safe context. Steps use Back/progress and one Continue/Confirm action area, not the public dock. All booking entry points call the same domain operation.

## Identity and patient app

| Path after /:lang | Job / gate |
|---|---|
| `/sign-in` | Email entry, generic send-code result, no account enumeration |
| `/verify` | Code entry/resend, safe internal return target |
| `/auth/callback` | Only if selected provider link flow needs it; do not create an unused second login flow |
| `/account` | My care dashboard: next visit first when appointment-only; assigned session first when active care exists |
| `/account/appointments` | Own upcoming/history list |
| `/account/appointments/[id]` | Own details, allowed actions, authorized private video link |
| `/account/appointments/[id]/reschedule` | Focused atomic change; conflict retains original visit |
| `/account/settings` | Contact/display preferences, locale, verified email-change process, POST sign-out |
| `/account/privacy` | Authenticated export/deletion request, truthful processing state |
| `/account/plans` | Own clinician-assigned plans, independent of educational purchases | 
| `/account/plans/[id]` | Published assigned version, session/exercise list and approved instructions (R2) |
| `/account/sessions/[id]` | Own distinct exercise attempt, acknowledged logs, pause/resume/finish (R2); focused shell |
| `/account/history` | Own activity/session history, not an inferred recovery score (R2) |
| `/account/check-ins` | Clinician-defined feedback only after purpose/capacity approval (R2 optional) |
| `/account/messages` | Reviewed care-team messaging, permissions and response expectations (R2 optional) |
| `/account/programmes/[id]` | Owned educational programme, separate entitlement (R2) |
| `/account/programmes/[id]/lessons/[lessonId]` | Entitlement-checked lesson/media (R2) |
| `/account/orders` | Own actual order status/receipts/support (R2) |

R1 renders no inert plan/player/message features. Account is useful without any coaching invitation or subscription. The same Home / Book / Online / Account dock remains at this stage, with Account active for descendants; internal links/sections surface My plan / Appointments / History. Do not silently replace the approved dock with Gymaf navigation. Signing in returns to an allowed requested route or Account, not to a second branded application.

## Staff area

All staff pages require verified membership and MFA; each page/data-access function/action enforces permissions independently. Staff uses its own operational shell.

| Path after /:lang | Job |
|---|---|
| `/staff` | Today's agenda, online preparation, notification exceptions |
| `/staff/calendar` | Administrative day/week view, manual appointments and blocks |
| `/staff/appointments/[id]` | Administrative contact/status controls; no automatic clinical-record access |
| `/staff/availability` | Authorized working hours/time off |
| `/staff/offerings` | Admin-managed durations, modes, fees, published availability |
| `/staff/notifications` | Delivery state and safe retry |
| `/staff/access` | Only if staff provisioning UI is built; trusted manual procedure is sufficient for R1 |
| `/staff/patients/[id]/plans` | R2 clinician-scoped draft/review/publish/assign and progress |
| `/staff/programmes` | R2 educational authoring/publishing, approved roles |

Reception/admin status does not automatically grant clinical access. No silent impersonation; private administrative access is audited.

## Synthetic review routes

M0 may implement `/preview/account`, `/preview/plan`, `/preview/session` after `/:lang`, sharing real presentational components with synthetic DTOs. Display a persistent preview label. No real auth success, private state, emails, appointments or payments. Return 404 in live mode and exclude from index/sitemap. These routes replace the temptation to copy Gymaf's full screenshot-capture or legacy route system.

## System endpoints and shared states

Nonlocalized `/api/availability`: validated bounded query, safe slot DTO only. `/api/jobs/notifications`: authenticated bounded worker. `/api/webhooks/stripe`: R2 raw-body signature verification. `/api/health`: minimal liveness with no secrets. Other JSON endpoints exist only where a client/server contract needs them; Next Server Actions handle ordinary forms through shared domain services.

Every page defines appropriate loading/empty/error states. Include safe 404, generic 500, session expired, forbidden, network failure, provider unavailable, stale slot, missing video link, unavailable feature and unpublished content. Auth/account/staff/booking/preview pages are noindex; private/auth-cookie responses are non-cacheable. Robots settings are not authorization.
