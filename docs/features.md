# Features and release boundaries

This is the capability catalogue, not a second task list. Implementation order and status live in [tasks](tasks.md).

| ID | Capability | Release | Acceptance / exclusions |
| --- | --- | --- | --- |
| F01 | Public shell and Home | M0/R1 | Responsive header, labelled dock, hero, service finder, services, Charlie and clinic information. Real content approval required for R1. |
| F02 | Service discovery | M0/R1 | Search approved service/body-area synonyms locally; readable results and clear no-result recovery; query is not diagnosis or stored health history. |
| F03 | Service detail | M0/R1 | Explain purpose, appointment pathway, practical details and one booking CTA. Do not promise recovery timelines or outcomes. |
| F04 | Charlie / clinic profile | M0/R1 | Real portrait and approved bio/qualifications; evidence for any review/rating. No generated 'best in Bulgaria' claims. |
| F05 | Booking selection | M0/R1 | First visit/follow-up and in-clinic/online offerings mapped to actual configured appointment types. One practitioner is preselected. Duration, price and policy visible before confirmation. |
| F06 | Scheduling | R1 | Public safe slot list; authenticated atomic confirm; collision prevention across online/in-clinic/manual blocks; conflict recovery; no pretend reservations. |
| F07 | Passwordless identity | R1 | Email verification near the end, not a signup wall at the beginning; session-safe return to booking; generic error responses and abuse controls. |
| F08 | My appointments | R1 | Only owned appointments; clear timezone and status; policy-aware cancel and atomic reschedule; no changes via GET links. |
| F09 | Online appointment | R1 gated | Human consultation information and booking; private per-appointment join link only when configured; preparation queue for staff. No chatbot disguised as a clinician. |
| F10 | Staff operations | R1 | MFA, role checks, day/week agenda, working hours, time off, manual appointments, cancellation and completion/no-show states. No drag-and-drop calendar necessary. |
| F11 | Notifications | R1 | Confirmation/change/cancellation/reminder outbox; safe retries and deduplication; email failure never erases a confirmed appointment. |
| F12 | Language and SEO | M0/R1 | /bg and /en route model, Bulgarian-reviewed launch copy, locale-aware formatting, sitemap with only approved public pages. Private pages no-store/noindex. |
| F13 | Safety, privacy and accessibility | Every release | Data minimization, authorization tests, accessible inputs/keyboard, honest emergency limitations, approved legal copy and documented vendor controls. |
| F14 | Assigned clinical plans | R2 | Only a clinician publishes a version to a specific patient; later changes are new versions; safe pause/contact path and audit evidence. |
| F15 | Educational programme store | R2 | Clear non-personalized scope, one-product checkout, verified payment fulfillment, owned media, refund/revocation behavior. No subscription in initial store. |
| F16 | Patient progress | R2 | Mark assigned tasks complete and resume learning; progress is completion, not a validated 'mobility score' or medical outcome. |
| F17 | AI assistance | R3 gated | Explicit disclosure, bounded allowed tasks, evaluation, human review, privacy and intended-use approval; no autonomous diagnosis or prescription. |

## Availability and progressive rollout

Public pages are visible without login. Account is visible as a useful entry point even before login; signed-out users see what it manages and an email sign-in form, not a fake dashboard. Unavailable features are explained or absent, never decorated with active buttons that do nothing.

M0 can show a labelled design preview of later sections. Production hides paid-plan promotions when there are no published products, hides fabricated reviews, and disables online booking when the clinic cannot operate it. A direct visit to a disabled feature must receive an honest unavailable page or 404, not a redirect loop.

Use centralized, validated server-side capabilities such as `bookingEnabled`, `onlineEnabled`, `programmesEnabled`, and `aiEnabled`. Client flags are display hints, never authorization or billing controls. Missing required production configuration fails closed. Demo behavior is explicitly labelled and must not silently activate because credentials are missing.

## Shared acceptance

Every feature includes loading, empty, validation-error, permission-denied and provider-failure behavior where applicable. The back button restores sensible context. Form inputs have actual labels. Keyboard focus is visible and not behind the dock. Successful writes display the persisted server state, not merely an optimistic local message.

Public content fixtures, domain fixtures and private patient data have different storage boundaries; see [architecture](architecture.md). These distinctions must remain visible in tests and deployment configuration.
