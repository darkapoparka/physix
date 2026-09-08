# Frontend component contracts

Build components as the associated page task begins. Do not generate an unused component library upfront. Public page composition belongs in routes; shared behaviors belong in small focused components.

| Component | Inputs / responsibility | Required behavior |
| --- | --- | --- |
| SiteHeader | locale, approved brand asset, menu items | semantic home link, labelled menu trigger, compact mobile and desktop variants |
| BottomDock | locale, current route | four destinations, derived active state, safe-area spacing; hidden by focused/staff layouts |
| PublicShell | children and page metadata | container/gutters, footer, dock clearance; no patient data fetch required |
| FocusedFlowShell | title, current step, back target, action slot | one action area; no competing dock; focus heading after navigation |
| ServiceFinder | approved catalogue, locale, initial empty query | accessible combobox or search+result list; local matching; no diagnostic output; keyboard and empty states |
| IssueRail | approved issue categories | meaningful labels; single destination per item; overflow controls/normal scroll |
| ServiceCard | public service DTO + asset metadata | image-forward, full-card link, brief text, no nested buttons |
| ServiceRail | services | CSS scroll-snap, no autoplay; desktop grid; View all remains accessible |
| PractitionerPreview | approved practitioner DTO | real photo/bio, wrapped optional attributes, profile link, no unverified proof |
| ReviewCard | approved review DTO | no synthetic rating in production; author/source display rules and short quote |
| ProgrammeTeaser | published programme summary or null | hide if none; scope distinguished from personalized clinical care |
| VisitInfo | verified clinic contact/location | explicit contact/directions links; no third-party map iframe needed initially |
| OfferingChoice | current offerings, selected ID, mode | native radio semantics, server-owned fee/duration, single practitioner preselected |
| DatePicker / SlotList | allowable dates and slot DTOs | locale-aware labels, keyboard use, timezone visible, empty/loading/conflict states |
| BookingSummary | authoritative offering/time/policy DTO | same summary across review/confirmation/account; never calculates fees from UI literals |
| ContactForm / VerifyCode | validated field state | real labels, input types/autocomplete, errors announced, resend cooldown and safe return |
| AppointmentCard | owned appointment DTO | status text, local+clinic time where necessary, clear allowed actions |
| StatusNotice | kind, message, optional recovery action | appropriate live region, no color-only meaning, no sensitive raw errors |
| StaffAgenda | authorized administrative DTOs | readable day/week list, no custom calendar engine or dragging required |
| PlanViewer (R2) | published plan version, patient progress | shows approved version and author, pause/contact path; completion is not outcome |

## Data and event rules

Components accept minimal DTOs, not full database rows. They emit selections/intents; server actions perform mutations. A service card cannot import a privileged Supabase client. Pure formatting and input schemas can be shared; server modules cannot leak into the client bundle.

Use native HTML for ordinary controls, Bits UI for complex dialog/combobox/date interactions when it actually helps. Restyle using tokens rather than editing accessibility behavior. A visible input placeholder is not a label. Decorative arrow icons are aria-hidden.

## State catalogue

Every stateful component defines idle, loading, empty, invalid, success and failure as applicable. Do not conflate successful submission with a durable confirmed booking. Use skeletons with reserved geometry for fetched public lists; avoid flashing empty-account widgets before the authenticated data is known.

Derived prices and permissions come from server responses; absence of a cancel button does not authorize/deny cancellation. Network retry does not repeat a write with a new idempotency key. Disabled controls explain why when it affects the user's next step.

## Avoid component proliferation

One Button styling contract, one field-error treatment, one appointment summary, one service card and one dock. Add variants for real semantic differences; do not create `ModernServiceCard`, `ServiceCardV2`, and `FinalServiceCard`. Remove superseded implementations in the same reviewed change. Keep demo data out of reusable UI components.
