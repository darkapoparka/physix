# UX, navigation and screen contracts

These routes describe the target, not currently implemented endpoints. `ARCHITECTURE.md` governs how they are introduced without breaking Fidelity's catch-all routes.

## Navigation

Public mobile: **Home / Book / Plans / Menu**. Patient mobile: **Home / Book / My Plan / Progress / Menu**. Patient Home links to the next appointment and practitioner conversation; Menu includes appointments, messages, profile, purchases, help and sign-out. Public Plans is the catalogue; My Plan is owned/assigned content, not the store.

Services are a discovery step inside Book, not another bottom-navigation destination. Service details have their own URLs for sharing/search. Online consultation is a booking modality/entry point, not a duplicate plan store. Public navigation never implies that private progress exists for a visitor.

Use one menu trigger per layout. The mobile bottom Menu replaces a redundant hamburger. No decorative second notification button; unread states belong to the actual messages entry/card. On desktop use a suitable header/sidebar and content grid; do not place an entire website in a fixed-width phone frame.

Book steps, exercise player and focused modal tasks can suppress the main dock while showing an explicit Back/Close control. Back preserves the safe non-sensitive draft and selection; leaving unsaved exercise/check-in work requires a clear choice. Preserve native browser history.

## Public route inventory

| ID | Route | Purpose and primary action | Required exceptional states |
|---|---|---|---|
| P01 | `/` | Clinic identity, prominent search, Book/Online entry points, featured care/programme, practitioner | Missing/unapproved content is not published; network failure does not force patient login |
| P02 | `/book` | Visit-mode segment, service discovery, service selection | No matches, no eligible service, one-practitioner simplification |
| P03 | `/services/[slug]` | What the service is, who delivers it, approved duration/price/policy; Book | Unpublished/unknown service; modality unavailable |
| P04 | `/book/time` | Available day/time; continue with held selection | No availability, stale slot, failed load, hold expired |
| P05 | `/book/details` | Minimum contact details; verify where required | Invalid input, existing-account safe link, request throttled |
| P06 | `/book/review` | Full service/mode/date/time/location/price/policy summary; confirm or pay | Changed price/availability, duplicate request, payment pending |
| P07 | `/book/confirmed` | Server-owned persisted appointment; manage or add to calendar | Unknown/unauthorized reference, processing, cancelled, no persistence |
| P08 | `/plans` | Published exercise-programme catalogue | Empty, filtered none, unpublished product |
| P09 | `/plans/[slug]` | Programme purpose, exact inclusions, review/assessment requirement and terms; purchase/book assessment | Already owned, temporarily unavailable, pending practitioner content |
| P10 | `/checkout/return` | Reconcile an owned order and route to My Plan when fulfilled | Processing, failed/cancelled checkout, expired order; never assume success from URL |
| P11 | `/online` | Explain the online appointment service; enter Book with mode | Unsupported service/mode, no availability; do not confuse with digital programmes |
| P12 | `/about`, `/first-visit`, `/contact` | Verified practitioner/clinic facts, useful first-visit information | No fictional credentials/photos, unpublished claims withheld |
| P13 | `/login`, `/auth/callback` | Real authentication; return to safe intended destination | Wrong credentials, expired link, timeouts, resend/rate limit, unavailable configuration |
| P14 | `/privacy`, `/terms`, `/accessibility` | Reviewed policies and access/help information | Draft policies do not ship as final legal approval |

## Patient route inventory

| ID | Route | Purpose and primary action | Required exceptional states |
|---|---|---|---|
| A01 | `/app` | Today: next appointment, next prescribed session, check-in and message access | New patient, no purchase, no assignment, paused care, loading/error |
| A02 | `/app/appointments`, `/app/appointments/[id]` | Upcoming/history; reschedule/cancel/join online visit when allowed | Past/no-show/cancelled, access denied, policy cutoff, new slot unavailable |
| A03 | `/app/plans` | Owned/assigned programme list; Continue | None, several plans, purchased-but-unassigned, expired, paused |
| A04 | `/app/plans/[assignmentId]` | Programme overview, instructions, sessions, author/revision/access term | Archived revision, assessment pending, access ended, offline |
| A05 | `/app/sessions/[sessionId]` | Exercise media/instructions, dosage, timer/sets, pause/resume, save/finish | Missing media, unsaved work, retry, concurrent edit, access revoked |
| A06 | `/app/progress` | Saved activity and approved check-in trends | No data, missing periods, paused programme; no invented scores |
| A07 | `/app/check-ins/[id]` | Clinician-approved questions; explicitly save/share | Draft, validation, failed save, conflict, no relationship |
| A08 | `/app/messages`, `/app/messages/[id]` | Authorized care conversations | Empty, send failure, ended relationship, offline; no fake replies |
| A09 | `/app/profile`, `/app/purchases` | Personal settings and real order/access history | Auth expired, export request, pending/refunded order |

## Practitioner route inventory

| ID | Route | Purpose |
|---|---|---|
| S01 | `/practitioner` | Today's appointments and actionable review queue |
| S02 | `/practitioner/calendar` | Day/week calendar, availability, exceptions, appointment create/move/cancel |
| S03 | `/practitioner/patients`, `/practitioner/patients/[id]` | Authorized patient summary, appointments, shared progress and assigned plans |
| S04 | `/practitioner/exercises` | Clinician-reviewed exercise library and media references |
| S05 | `/practitioner/plans`, `/practitioner/plans/[id]` | Template drafts, published versions and patient assignments |
| S06 | `/practitioner/messages` | Authorized care conversations; response expectations visible |
| S07 | `/practitioner/services`, `/practitioner/products` | Restricted offer content, price and publication management |
| S08 | `/practitioner/settings` | Clinic hours, roles, approved policies and integration status |

Do not copy the member shell over the staff workspace blindly. Calendar and patient comparison need an effective desktop layout. Prioritize calendar, patient detail and assigning a template over elaborate staff analytics.

## Home hierarchy

Public: compact brand header → concise practitioner/clinic hero → search directly after the relevant copy → compact Book/Online actions → a small useful service/problem discovery section → featured programme or practitioner card → practical clinic information. No badge soup, unsupported “evidence-based” claims or multiple filler captions.

Patient: short greeting → next concrete care action → next appointment → programme/week overview → check-in/message access. Personal care comes before a sales catalogue. A patient with no assignment sees an honest next step, not demo workouts.

## Shared state and interaction requirements

Every network-driven screen has a bounded loading state, honest empty state, accessible error/retry, session-expired path and safe unauthorized response. A spinner must not become a permanent account wall. Preserve useful context during login/retry without putting health information in query strings.

One prominent primary action per task; secondary actions are text or quieter controls. Programmes and services show only metadata that changes a decision. Avoid wrapping important action labels at normal mobile widths; use honest reflow for large text rather than reducing text to fit.

Inputs have actual labels, clear validation and correct keyboards. Modal/sheet focus is contained and restored; Escape/Back work. Respect reduced motion. The mobile keyboard must not hide the focused field or submit action. Booking confirmations show the full date, time, timezone, mode, location/connection instructions and applicable amount—not merely a weekday and “Success.”

## Current visual and interaction revision — 19 September 2026

Public and patient destination names above remain the accessible names, but the mobile dock is now icon-only, with discrete forest/mint circular controls, hover/focus tooltips and one Menu action. Supporting controls are compact rather than universally padded to 44px. The actual Home is a short centered heading followed immediately by search, compact Book/Online actions and six decorative discovery cards; no large marketing hero pushes search down.

The current local booking stages use /book or /app/book with public service/mode/step query state, not separately implemented /book/time pages. A service tap opens times in one action. This preserves browser history without putting selected times or contact/health fields in URLs. The target route inventory remains a product contract, not evidence that every listed route is delivered.

## Implemented shared-care navigation — 20 September 2026

Public discovery and private patient care share one Shell, colour system, card family, sheets and icon-only dock. Different permissions do not create another design or frontend. Public Home retains a horizontal service rail, then vertically stacked landscape care cards and the solid online banner. The patient entry is labelled Your care, all together.

Patient routes now distinguish programmes from individual sessions:

| Route | Implemented local behaviour |
|---|---|
| `/app` | Today, next/resumable session, next appointment, week panel and programme cards |
| `/app/plans` | Searchable assignment-level programme library; All / In progress / Sessions finished filters |
| `/app/plans/:assignmentId` | Published programme identity/version, its sessions and saved attempts |
| `/app/workouts/:scheduledId` | Individual session overview and Start/Resume action |
| `/app/schedule` | Week/day navigation with distinctly labelled appointments and exercise sessions |
| `/app/progress` | 7/28-day saved activity, programme filter, day-filtered history and shared check-ins |
| `/app/sessions/:attemptId` | Existing persistent exercise player, actuals, pause/resume and completion |

The Today / Programmes / Schedule links are navigation within patient care, not new apps. Existing `/app/plans/:scheduledId` URLs redirect to the session overview when the record belongs to the account. Menu includes the schedule and Discover PhysiX, without routing users into the old visual demo.

Only assigned local programmes are currently connected. A completed session count is not clinical recovery, and the absence of a purchase record must never be presented as a paid programme. Purchasing/fulfilment and real clinical content remain separate release work.

## Canonical navigation correction — 20 September 2026

One primary navigation: Home / Book / My care / Menu, before and after sign-in. Header logo always points to /; Account always points to /care/profile. Menu contains the same non-duplicated entries in both states. Private entry requests sign-in only when needed and resumes the allowlisted destination.

| Current URL | Purpose | Old URL compatibility |
|---|---|---|
| /care | Today and next care action | /app |
| /care/programmes | Owned/assigned programme library | /app/plans |
| /care/programmes/:assignmentId | Programme and its sessions | /app/plans/:assignmentId |
| /care/workouts/:scheduledId | Session overview | /app/workouts/:scheduledId |
| /care/sessions/:attemptId | Saved exercise player | /app/sessions/:attemptId |
| /care/schedule, /care/progress | Schedule and activity | Matching /app routes |
| /care/appointments, /care/check-ins, /care/profile | Private management | Matching /app routes |
| /book | One public booking workflow for everyone | /app/book |

The original /app/plans/:scheduledId compatibility still redirects to the session overview after ownership checks. Unknown destinations fail closed. No private data, selected booking times, external hosts or arbitrary queries are accepted in login-return parameters. The normal frontend no longer links to /app or the old visual-only demo.
