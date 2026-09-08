# PhysiX mobile screen plan — Review 01

**Date:** 8 September 2026  
**Status:** Proposed design direction; not approved for production. No repository changes.  
**Deliverables:** structural wireframes in the accompanying PDF; separate image-generated high-fidelity review concepts.

## 1. Direction

Extend the supplied mint/white PhysiX homepage rather than redesigning it. The current project handoff explicitly restores this family after the public-v2 art direction was rejected [S1]. Use that archive only to check functional coverage, not as a visual baseline.

The current user request adds a local variation: retain Charlie’s compact profile-card structure, but make its background deep teal so it is distinct from the surrounding white cards. Use white heading text, pale-mint support text and the reference portrait treatment. No full-width dark editorial section. No separator columns. Do not reinterpret this as permission to redesign the rest of the page.

Preserve the original visible labels: **Expert care for a stronger you.**, **Book online or in clinic.**, **Search pain area or service**, **Book visit**, **Online consult**, **Common issues**, **Our services**, **Hi, I’m Charlie**, **Recovery Plans**, **Explore plans**, and **Home / Book / Online / Account**.

## 2. Mobile hierarchy

Home is a scrolling page, not a poster squeezed into a single phone-height viewport. Show it in two scroll positions in the review concepts. The upper part establishes the offer, makes booking obvious and supports service discovery. The lower part contains readable service cards, Charlie, a restrained patient-story treatment and the future-gated Recovery Plans teaser.

Use a portrait-led hero with a subordinate practitioner image; the headline must remain readable. Keep the finder field aligned with the page gutters and its text left-aligned. Keep Book visit filled, Online consult outlined. Do not add a third equally strong hero action.

Retain anatomical issue tiles with restrained mint highlights. At phone width, make the rail internally scrollable with a visible next-item hint. Services retain image-first, rounded white cards and the circular arrow detail. Show approximately one large card plus a next-card hint or two readable cards where they fit, not three squeezed cards. View all must remain available. The entire card is one navigation target.

Charlie’s card supplies a local change of surface color. Testimonials remain compact and need a real authorized quote before publication; do not invent stars, patient totals, awards or ratings. Recovery Plans remains below the main care and trust content and must not look like an available clinical prescription or live shop when it is not.

## 3. Screen inventory

All production paths below follow `/:lang`; this is a visual plan, not a route migration [S3].

| ID | Screen | Route or state | Main job / action |
|---|---|---|---|
| D01 | Home, upper viewport | `/` | Establish care offer and Book visit |
| D02 | Home, lower viewport | Same scrolling page | Services, Charlie, proof, plans teaser |
| D03 | Services | `/services` | Search/filter and open a service |
| D04 | Sports Rehab detail | `/services/[slug]` | Understand the visit and Book visit |
| B01 | Choose a time | `/book` | Select offering, mode, date and time |
| B02 | Your details | `/book/details` | Minimal contact details and verification |
| B03 | Review booking | `/book/review` | Check authoritative summary and confirm |
| B04 | Booking confirmation | `/book/success/[appointmentId]` | View appointment / practical next steps |
| T01 | Online consult | `/online` | Explain human video care and enter booking |
| T02 | Charlie | `/charlie` | Practitioner introduction and approach |
| T03 | Clinic/contact | `/clinic` | Directions, practical information and contact |
| T04 | FAQ | `/faq` | Answer practical visit/booking questions |
| A01 | Search | Service-finder state | Find a relevant service, not a diagnosis |
| A02 | Menu | Navigation overlay | Reach public sections and language choice |
| A03 | Account entry | `/sign-in` → `/verify` | Email-code sign-in, safe return target |
| A04 | Recovery Plans | `/programmes` | Future educational catalogue preview |

The main generated detail example is Sports Rehab. Manual Therapy and future programme details reuse the relevant shared layout; they are not separate art directions. Programme detail/purchase states, legal reading templates and all system states remain implementation coverage, not claimed finished high-fidelity images in this pass.

## 4. Screen contracts

### Home
Order: header and hero → finder → primary/secondary actions → issues → services → Charlie → verified patient story, when available → Recovery Plans teaser → footer. The floating four-item dock remains equal-weight and labelled. Content has enough bottom clearance to remain reachable above it.

### Services
Start with the page title and visible finder, followed by relevant body-area filters. Use image-led service cards with a title, short description and clear destination. Do not use an oversized marketing hero or turn the catalogue into generic icon rows. Recovery Plans may appear as a visibly future-gated item; no disabled fake checkout.

### Service detail
Show Back to services, meaningful artwork, service name, concise explanation and the first-visit entry. The live offering summary supplies the actual mode, fee and duration. Explain the proposed assessment journey in neutral language; do not guarantee recovery or prescribe treatment from a public page. The main Book visit action transfers a bounded service context into the same booking flow. FAQ rows are secondary. Avoid stacking a sticky CTA above another fixed public dock; use the booking action in the content on this public page.

### Booking
Use the focused shell with Back, progress and one bottom action. The progress model is **Time → Details → Review**, followed by confirmation; identity verification is a substate of Details. Do not show the public dock under the flow action.

At Time, select a valid first/follow-up offering, in-clinic/online mode, day and slot. Display fee, duration and timezone before commitment. The concept may show **example** 45 minutes / €65, Monday 14 September 2026 at 10:30, Europe/Sofia. These are fixtures, not clinic decisions or live availability. A selected slot is not a held slot.

At Details, collect only the identifying/contact fields genuinely needed for the service. Use persistent visible labels, correct input types and field-associated errors. Do not ask for a medical history on the public booking form. Provide reviewed privacy and appointment policy links. Do not bundle marketing consent into booking. Verification uses one pasteable code field with edit-email, resend and expiry recovery.

At Review, show authoritative offering, clinician, mode/location, time with timezone, fee and contact summary. Each edit path preserves the other safe data. Show actual payment/cancellation terms; do not invent deposit or refund policy. Confirm booking is the live final action. Static review concepts are labelled examples so they cannot be mistaken for a real booking.

At Confirmation, show success only after persisted appointment creation in production. Appointment status and confirmation-message delivery status are separate. Lead with View appointment; Add to calendar, verified directions and preparation follow. No aggressive upsell.

### Online
Keep it visibly a human video visit, not an AI chat or fake online clinician. State the actual service scope and preparation using approved copy. Book online visit enters the same `/book` flow with Online preselected. Hide the live offer until operationally ready.

### Charlie
Use the reference’s portrait-led, personable family. A profile page can expand the approach and verified background but should not repeat the whole home hero or fabricate professional credentials. A compact deep-teal introduction panel ties it to the revised home card. Book visit is the main action.

### Clinic/contact
Prioritize verified address, directions, hours, access information and ways to contact the clinic. The review concept uses placeholders such as “Clinic details to be confirmed”, not a fabricated map pin or phone number. Any enquiry form is for practical enquiries, not public medical-record upload.

### FAQ
Use a readable title, short category chips and compact disclosures. Show one representative expanded question. Do not place every short row inside an enormous card. Use policy copy only when supplied and reviewed.

### Search and menu
Search has a clear input, useful result grouping and a reset/browse recovery state. It navigates to services, not diagnoses. Do not put unrestricted symptom free text in URLs, logs or analytics.

Menu is a focused full-height navigation overlay with Close, public destinations and a language control. It can use deep teal consistently with the brand. Hide the dock while the overlay is active; restore focus and scroll position on close.

### Account entry
Use an email-only sign-in entry and Send code. It is not a signed-in dashboard and must not show invented appointments or exercise adherence. Booking remains available to new visitors. Verification returns to a permitted requested destination or Account, not an unannounced second application.

### Recovery Plans
This public route is the future educational catalogue, distinct from individual clinician-assigned plans. Use the existing custom movement artwork and image-first cards. Clearly show Coming soon / Preview in concepts when live content and commerce are unavailable. No fake price or purchase success. The production teaser and route remain release-gated.

## 5. Shared component targets

| Role | Starting target |
|---|---|
| Canvas | `#F7FBFA` |
| Surface | `#FFFFFF` |
| Navy ink | `#10172B` |
| Muted text | `#4D626B` |
| Primary action | `#11695C` |
| Mint surface | `#D8EEE8` |
| Subtle boundary | `#DCE8E4` |
| Mobile reference width | 390px, verify 320px reflow |
| Page gutters | 20px around 390px, 16px on narrow screens |
| Body / support text | 16px / 14–16px starting points |
| Section / hero headings | 22–24px / 32–36px starting points |
| Controls | 48–52px high starting points |
| Cards | Soft 20–24px corners |
| Floating dock | Four equal labelled items; no raised center action |

These are proposed starting targets consistent with the project design system, not sampled pixel-exact values or a completed accessibility claim [S2]. Keep typography roles consistent and check licensed Bulgarian Cyrillic support. Do not distribute font files in handoffs.

## 6. State and interaction coverage

| State | Required behavior |
|---|---|
| Loading services / availability | Stable skeleton geometry and an announced status; no fake results |
| No search results | Edit/reset query, browse services, first-visit route |
| No appointment times | Another day or verified clinic contact; never invented fallback times |
| Invalid details | Retain values, associate errors with fields, focus the first error |
| Expired / invalid code | Clear recovery, resend state, edit-email path, paste support |
| Slot conflict | Preserve safe details and choose another slot; never false confirmation |
| Network / provider unavailable | Retry/contact route and truthful status |
| Confirmation message failure | Keep persisted appointment success distinct from delivery failure |
| Menu / dialog | Escape, focus containment and restoration, scroll restoration |
| Reduced motion / keyboard / zoom | Respect motion preferences; no obscured focus; readable reflow |

## 7. PhysiX + Gymaf boundary

The repositories describe Gymaf as the independent coaching platform with its own preserved visual language, and PhysiX as a branded care experience [S3–S5]. This pass does not redesign Gymaf or claim that integration is implemented.

Keep PhysiX public discovery, booking and sign-in in the selected mint/navy family. Do not silently replace the approved dock with Gymaf navigation. In later authenticated design work, appointments, clinician-assigned plans and purchased educational content must keep their distinct authorization and entitlement rules. A visitor should not need a coaching subscription simply to see an appointment. Do not imply shared accounts, payments or access grants without implemented contracts.

The signed-in care dashboard, workout/session player and staff tools are intentionally outside these public image concepts. Their route/data contracts are referenced for continuity, not redesigned here.

## 8. Review sequence

1. Review the paired home scroll positions, especially the compact deep-teal Charlie card.
2. Check that Services and service detail look like the same product, with readable cards and restrained imagery.
3. Walk through Time → Details → Review → Confirmation and challenge every missing/back/error state.
4. Review the supporting public screens and future-gated catalogue.
5. Before implementation sign-off, fit approved English/Bulgarian text at 320/390/430px and larger widths; test keyboard, zoom, contrast, safe areas and actual browser scrolling.

Generated portraits, sample reviews, claims, photos, durations, fees, dates and clinic details remain illustrative until replaced or approved. A visual concept does not establish accessibility compliance or production readiness.

## Sources and limitations

- **[S1]** [PhysiX restored visual handoff](https://github.com/darkapoparka/physix/blob/main/docs/design/README.md), read 8 September 2026.
- **[S2]** [PhysiX design system](https://github.com/darkapoparka/physix/blob/main/docs/design-system.md), read 8 September 2026.
- **[S3]** [PhysiX route map](https://github.com/darkapoparka/physix/blob/main/docs/routes.md), read 8 September 2026.
- **[S4]** [Gymaf design authority](https://github.com/darkapoparka/gymaf/blob/main/DESIGN.md), read 8 September 2026.
- **[S5]** [Gymaf product authority](https://github.com/darkapoparka/gymaf/blob/main/PRODUCT.md), read 8 September 2026.

The shared ChatGPT page exposed its title but not the conversation text. This plan uses the actual attached image, the current request and the connected repository documents, not an invented reconstruction of that conversation. Current user direction on Charlie’s background takes precedence over the older local-only testimonial correction recorded in the handoff.
