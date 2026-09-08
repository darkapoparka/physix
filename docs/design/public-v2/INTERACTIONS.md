# Public interaction and state contract

## Two different things: design reference and live implementation

The prototype exercises navigation, selection, search, validation, menu dismissal and disclosures using synthetic in-memory state. It never calls a provider, saves a patient record, sends email, charges a card or generates medical advice. `capture.py` tests those reference interactions only.

The production frontend must use the existing Next.js architecture and authorized server operations. The prototype's hash routes, global variables, HTML-string templates and “any six digits” demonstration are not an authentication or application implementation.

## Navigation

Logo → Home. Book → new appointment. Online → explanation of a human online appointment. Account → public sign-in gate. Existing appointment management belongs to the later private area, not a second meaning of Book.

Services are visible on Home and in the expanded/header navigation, not given another dock item. Four equal dock destinations, visible labels, no raised central CTA. At desktop the header replaces the dock. Booking steps and expanded menu do not stack a second control layer over it.

For production, use real links, router transitions, semantic current-page state, route-level focus and scroll restoration. Opening a modal search/menu must manage focus, Escape and return focus correctly. The standalone menu uses a route-like surface; do not blindly carry this implementation into a modal component.

## Service finder

The home finder and service-page finder use one catalogue and the same aliases. A body-area chip applies a bounded filter, not a medical diagnosis. Submitted free text stays out of URLs, logs and analytics. Empty query shows useful general discovery; no matches offers reset and the first-appointment route.

In live SSR/static content the services can render without a loading interstitial. The loading screen is for genuine asynchronous loads, not decorative delay. Errors must not be masked by cached sample results. Make the service card one coherent link with a visible focus treatment and appropriate image alternative.

## Booking

1. Select visit type/mode/time. Changes to date/time preserve scroll and focus. Update the summary without moving the visitor to the top. Use native radios or equivalent tested semantics.
2. Enter minimum required details. Validate on submit, associate errors, preserve entered values and focus the first invalid field. Do not require visitors to explain their whole medical history before seeing availability.
3. Verify identity using the approved real authentication flow. Support paste/autofill, resend limits, expired-code recovery and change-email. Use generic responses where required to avoid exposing existing accounts.
4. Review authoritative server data. Changing one section preserves the others. Show actual fee, duration, location/mode, time zone and reviewed policies before the final action.
5. Confirm through the atomic operation in the main booking specification. Loading disables repeat actions while retaining an idempotent retry path. Slot conflict retains details and sends the visitor to a new selection. Only a committed record reaches a live success page.

The prototype’s preselected September date, time, duration and fee are labelled synthetic examples. The live calendar is driven by validated availability, not those arrays. Selection is not a hold. The same canonical operation handles service-page, home and online entries.

Account creation, clinician-assigned plans and purchased educational content do not change this basic visitor journey. Real success/appointment data must not be put in public URLs or publicly cached pages.

## Contact, programmes and operational failures

Contact asks only for general practical enquiries. No medical file upload, symptom classifier or invented response-time promise. A live success message requires a genuine accepted submission; failed submission retains fields. Clearly separate delivery status from staff response.

Programme purchase handoff uses the selected hosted checkout. Pending, failed and confirmed payment are distinct states. A return URL cannot grant a programme entitlement. All public programme offers remain release-gated until approved content, pricing and operations exist. The private player is not part of this task.

Service-unavailable and offline states must preserve safe choices and provide retry/help. Do not silently swap a failed live provider for demo availability, demo authentication, a demo booking or a fake payment success.

## Responsive behavior and production acceptance

Use content-driven breakpoints. Do not preserve the English hero line break when it causes translated or enlarged text to overflow. Stack paired actions at narrow widths. No fixed-height content boxes around paragraphs. Avoid rows of tiny metadata with vertical dividers in the practitioner section.

One horizontal service rail on Home is enough. Desktop uses a normal grid. The full services page must remain comfortably browsable without dragging. The dock respects safe areas and browser/keyboard geometry; bottom padding must exceed it. Test focused controls near the bottom on actual mobile browsers.

Use genuine alt text, explicit form labels, announced status/errors, visible keyboard focus, reduced motion, sufficient contrast and semantic headings. Test Bulgarian, 320px reflow and 200% enlargement with real content. The screenshot renderer is not a substitute for a manual accessibility review.

## Prototype review gates

The renderer checks 41 reference states at mobile, desktop and 320px document reflow. It exercises the public booking click-through, search, category filtering, invalid details, menu Escape, FAQ disclosure, optional-cookie rejection and selected enlarged-text layouts. It also checks script errors and broken images.

Missing from this evidence: real-device gestures/keyboards, screen readers, full contrast/axe audit, real translations, real API/auth/payment/clinical behavior and the eventual Next.js production build. Keep those honest in the main backlog. Do not check off application tasks based on these prototype tests.
