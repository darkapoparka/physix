# Public screen contracts

This file owns the visual coverage of the public package. The main [route map](../../routes.md) still owns production URL/access semantics. Prototype hashes are **review identifiers**, not a replacement route architecture. Prefix live HTML routes with the existing `/:lang` convention.

## Shared composition

Mobile: 20px outer gutters at 390px, readable 16px body text, compact header, four equal dock items Home / Book / Online / Account. Body content reserves bottom clearance. Desktop at 1000px+: header navigation, no mobile dock, maximum content width 1160px. At 320px: 16px gutters, wrapping content and stacked hero actions. No decorative phone or iOS status chrome.

The service rail is intentionally horizontally scrollable; the document is not. Each service card is one link, including its decorative arrow. Use HTML headings/text, not text baked into an image. Buttons and fields are approximately 48–52px high. The actual CSS is the visual reference, not a mandate to preserve hard-coded pixel values or artificial English line breaks in translated content.

### 01–03 — Home and service discovery

| Prototype ID | Live route | Layout and behavior |
|---|---|---|
| `home` | `/` | Two-line headline, concise offer, subordinate practitioner portrait, finder, primary Book and secondary Online action, body-area shortcuts, image-led service rail. Then editorial Charlie, deep-teal patient story, clinic information, future programme teaser, compact footer. |
| `services` | `/services` | Title and visible search directly above category chips. Readable image-and-text list on mobile, two-column listing on desktop. Not a second oversized promotional hero. |
| `services-loading` | same | Stable skeleton rows and announced loading label. No fake service results or interactive skeleton controls. |

Home trust rhythm is intentional: mint practitioner section → edge-to-edge dark-teal story. Do not turn the story back into a white testimonial card. A genuine authorized quote is a publication prerequisite; no quote means no story section.

### 04–06 — Service details

`service-sports`, `service-manual`, `service-movement` map to `/services/[slug]`. They are three actual reference variations sharing a detail layout, not three unrelated design systems. Each has a back link, meaningful service artwork, title, concise explanation, proposed assessment steps, a few relevant FAQs and a booking summary/action.

Mobile reads in one column. Desktop puts the booking summary beside the main content. Exact service names, clinical explanations, prices and durations need approval. No outcome guarantees, recovery-week promises, invented eligibility or fake provider availability. An assessment is the entry path for an unsure visitor.

### 07–09 — People, place and online care

| ID | Live route | Contract |
|---|---|---|
| `charlie` | `/charlie` | Portrait-led introduction; approach; verified experience/education; optional non-autoplay introduction-video slot. No fake awards, ratings, patient totals or separator columns. |
| `clinic` | `/clinic` | Practical visit information first: address/directions, opening hours, verified access and transport, contact, booking. The current map is an illustration, not a fabricated location. |
| `online` | `/online` | Explicit human video visit, expectations, preparation and booking entry. Same booking system with online mode. Never disguise an AI as Charlie. Hide live online offers until the actual service is ready. |

### 10–14 — Future public educational programmes

| ID | Live route/transition | Contract |
|---|---|---|
| `programmes` | `/programmes` (R2) | Image-led educational catalogue with clear scope. Do not present educational content as an individual diagnosis or prescription. |
| `programme` | `/programmes/[slug]` (R2) | Artwork, title, author/content slot, curriculum preview, suitability/limitations, actual price/access/refund terms, purchase action. |
| `programme-checkout` | provider handoff (R2) | Clear transition to the selected hosted payment provider. No invented custom payment fields. |
| `programme-pending` | return/pending (R2) | Verification-in-progress state. A redirect or query flag never proves payment or grants access. |
| `programme-complete` | verified order result (R2) | Receipt/access summary after real fulfillment. Prototype is synthetic; the private library/player is deliberately not designed here. |

These are public-facing future layouts, not permission to build payments before R1 or to publish nonexistent programmes. Keep release gates from the main feature catalogue.

### 15–17 — Practical questions and contact

| ID | Live route | Contract |
|---|---|---|
| `faq` | `/faq` | Categorized, readable disclosures; one representative expanded answer. No gigantic card around each accordion row. |
| `contact` | `/clinic` contact section or `/contact` | Booking shortcut, verified communication details and a minimal practical-enquiry form. No public medical-record upload or symptom intake. A separate `/contact` route is an optional public routing addition, not a new backend domain. |
| `contact-sent` | submitted state | Only after a genuine successful submission in live mode. Preserve fields and show recovery on failure. The prototype explicitly sends nothing. |

### 18–28 — Complete visitor booking journey

| ID | Live route/state | Contract |
|---|---|---|
| `book` | `/book` | First/follow-up, in-clinic/online, date and time. Show fee/duration before commitment. Selected time is not held. |
| `book-loading` | `/book` loading | Loading message and slots skeleton. Continue disabled. |
| `book-online` | `/book` online preset | Identical flow and controls, online selected. No second booking system. |
| `book-empty` | no slots | Change day or contact clinic; do not invent sample availability in live mode. |
| `book-details` | `/book/details` | Minimum identifying/contact information, reviewed policy information, no unnecessary health questionnaire. |
| `book-details-error` | invalid form | Field-associated error, entered values preserved, focus on first invalid field. |
| `book-verify` | identity gate within details | One pasteable code field with resend/edit-email states. No six separately troublesome inputs. |
| `book-review` | `/book/review` | Final authoritative appointment, mode, clinician, time zone, fee, contact and policy summary. Edit paths preserve other information. |
| `book-conflict` | commit conflict | Acknowledge unavailable slot; retain safe details; select a different time. No false success, no dropped existing appointment. |
| `book-success` | `/book/success/[appointmentId]` | Actual persisted result, authenticated owner only in production. Confirmation/reminder delivery failure is not booking failure. Prototype displays only a labelled example. |

The numbered range describes the family rather than additional routes; use the exact IDs in the gallery/index as the coverage source. The focused shell has Back, progress and one sticky flow-action area. **No public dock underneath it.** The live final action is Confirm booking; the reference calls it Preview confirmation so a viewer is not misled.

Dates, 45-minute duration and €65 fee are visibly labelled examples. They are not business decisions. Time zone is explicit in the design; live scheduling still follows the canonical booking specification.

### Public identity boundary

`sign-in`, `verify`, `verify-error` map to `/sign-in` and `/verify`. They show public email entry, code entry, invalid/expired recovery and return navigation. The design ends before the authenticated patient area. Verification in this prototype is not real authentication. No patient dashboard, Gymaf component, plan player or staff screen is part of this package.

### Navigation and search

`menu`: full-height, dark-teal public navigation surface, close control, Escape support and return to the invoking screen. No dock competing with the menu. Services, Charlie, online, programmes, clinic, FAQ and contact remain easy to reach. Future items are gated in production.

`search`: prominent input with matching services and clear results count. `search-empty`: useful reset/browse/first-appointment recovery. Search maps to service information, not a diagnosis. The prototype retains free text in memory rather than writing it to the URL. Bounded body-area identifiers may be used as navigation state. Production must not send raw symptoms to logs or analytics.

### Legal, preferences and system states

`privacy`, `terms`, `cancellation`, `accessibility`: shared legible reading template, information navigation, update/status location and contact route. Text is deliberately a content brief, not a claimed legally reviewed policy. Production route mapping remains `/legal/[document]`.

`cookies`: necessary-only default, optional categories off, equally clear reject/save controls. Do not add a cookie banner or consent machinery just to copy a mockup when no optional processing exists. This prototype has no tracking.

`not-found`: 404 with home/service recovery. `unavailable`: unreliable provider/data state with retry/contact, no fallback to synthetic success. `offline`: connection recovery with safe draft preservation. A real implementation must distinguish transient network errors, authorization failures and unavailable features.

## Translation, content and accessibility acceptance

The reference screens use English. Bulgarian translation is not completed or claimed. Before public frontend sign-off, fit actual approved Bulgarian strings at 320/390px and 200% text, especially hero actions, date labels, policies and validation. Do not shrink text or clip labels to preserve English geometry.

Actual-device browser toolbars, soft keyboard interaction, screen readers, complete contrast checks, translated copy and production media remain review items. The automated renderer's no-overflow result is useful evidence, not a substitute for those checks.
