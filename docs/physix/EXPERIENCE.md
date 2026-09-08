# Experience, routes and visual authority

## Keep the approved app

The displayed original template is the account UI starting point. Preserve its typography roles, spacing, hierarchy, photo placement, compact navigation, sheets, progress views and session behavior while adapting specific tasks for Physix. The source branch is not a certificate of pixel parity; compare the actual selected screens before and after each affected slice. Translate the visual system into approved Physix branding without importing reference identities into real accounts.

The public website is a separate experience reached outside the account area. It explains the clinic and leads to booking and “My account.” It must be designed from actual clinic content and a reviewable layout direction. The rejected generic landing page at `be0f629` is not an approved reference. Do not reuse it by default. Never place an opening-soon screen in front of the account app as a substitute for integration.

## Proposed navigation

- Website: Services, Team, About/contact, Community; primary “Book an appointment”; persistent “My account.” Mobile keeps booking and account discoverable with real labels.
- Account: Home, My plan, Appointments, Messages, Profile. Progress is reachable from Home/My plan/Profile; optional community is reachable from Home/Profile and the website. Confirm this adaptation against the original navigation during PX-020; avoid squeezing seven items into a bottom bar.
- Staff: Calendar, Clients, Plans, Community (permission-based), Administration (permission-based). On small screens, preserve the current day/client task instead of shrinking a desktop week grid.

## Route inventory and owners

Prefix all product routes below with `/bg` or `/en` per D-013. URLs are target contracts, not current implemented routes.

| Route | Audience / purpose | Task |
|---|---|---|
| `/` | Actual center introduction and primary booking/account paths | PX-010 |
| `/services`, `/services/[slug]` | Published service content, eligibility and booking CTA | PX-011 |
| `/team`, `/team/[slug]` | Approved therapist identity, credentials and services | PX-011 |
| `/contact`, `/about` | Approved location/contact/access information | PX-010 |
| `/book` | Service, therapist, date/time, identity, review and confirmed booking | PX-015 |
| `/sign-in` | Verified sign-in and safe return to intended booking/account page | PX-006 |
| `/account` | Next appointment, assigned plan, therapist updates; truthful empty states | PX-020 |
| `/account/appointments`, `/account/appointments/[id]` | Saved visits, cancellation/reschedule and history | PX-016 |
| `/account/plan`, `/account/plan/[id]` | Assigned program, instructions and exercise detail | PX-021 |
| `/account/sessions/[id]` | Actual exercise attempt, pause/resume, logs and summary | PX-022 |
| `/account/progress`, `/account/check-ins` | Meaningful approved feedback/history and measurements | PX-023 |
| `/account/messages`, `/account/messages/[id]` | Private assigned-team conversations and attachments | PX-024 |
| `/account/profile`, `/account/settings`, `/account/documents` | Account, approved intake, privacy requests, locale and security | PX-025 |
| `/account/payments` | Only the selected payment/package policy; receipts/status | PX-019 |
| `/community`, `/community/events/[id]` | Published content/events according to visibility rules | PX-029 |
| `/staff/calendar` | Availability, booked visits, blocked time and attendance | PX-017 |
| `/staff/clients/[id]`, `/staff/plans` | Authorized therapist workflows | PX-026 |
| `/staff/settings` | Clinic, services, staff permissions and policies | PX-027 |
| `/staff/community` | Draft/review/publish, events, moderation and participant operations | PX-030 |

## Required states for each interactive route

Initial loading; real empty; populated; validation error; API unavailable; session expired; unauthorized/not found; stale revision/conflict; submitting; acknowledged success; lost acknowledgement/retry; unsaved departure; mobile keyboard/overlay; language change; refresh and back navigation. Use only relevant states per control but do not ship only ideal data. No fake success toast before a server acknowledgement.

Bookings must show the full date, clinic timezone, service, therapist, duration/location, selected price/payment requirement and applicable cancellation rule before confirmation. A time selection alone is not a reservation. Lost availability returns an actionable conflict while preserving the person's service/date choice.

## Visual and accessibility acceptance

Capture affected views at 393px and 1440px; verify 320px reflow and 200% text size. BG translations, long names, no media, many appointments and slow/error states must fit. Use visible focus, semantic buttons/links, labeled inputs, 44px mobile interaction targets, accessible date/time selections, dialog focus trapping/return and reduced-motion support. Protect bottom actions from the keyboard/safe areas. No blanket overflow hiding to conceal broken layout.

Every UI slice records reference route/state, viewport, source SHA, before/after evidence and intentional differences in the task evidence file. Public website direction and the proposed account navigation require a concrete visual checkpoint before expansion across all routes. Routine implementation can proceed within the established direction; another redesign requires an explicit updated decision.
