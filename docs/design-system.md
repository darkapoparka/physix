# PhysiX design system and responsive rules

## Public v2 revision (2026-09-08)

The [complete public package](design/public-v2/README.md) is now the visual reference for public work, awaiting owner review. Its CSS owns the refined initial public token values and actual mobile/desktop proportions; the earlier values below remain historical starting points where they differ. Extract these into shared production tokens rather than scattering literal colors.

The home practitioner introduction is an editorial mint section, followed by a full-width deep-teal patient-story band with large readable type. Do not add another white rounded testimonial card underneath it. No separator columns, fake star ratings or invented proof. Omit the story from live content until a genuine approved review exists.

This public package includes no Gymaf/patient/staff screen. Desktop navigation replaces the dock at the reference's content-driven 1000px breakpoint. The longer page scrolls; fixed bars appear in viewport captures, not across the middle of full-page exports. Read the screen/interaction contracts before implementation.

Visual anchor: [design package](design/README.md). This specification outranks generated image geometry. Values below are project design targets, not a claim of completed accessibility testing.

## Direction to preserve

Calm off-white surfaces, dark navy text, deep teal actions, restrained mint accents, strong sans-serif hierarchy, real practitioner photography and a consistent custom editorial service-asset family. This is a medical service brand, not an AI demo, generic wellness dashboard or glassmorphism showcase.

Keep the latest four-item dock. Remove the giant center button, handwritten motivational slogans, unnecessary pill clouds, separator columns in Charlie's card, fake credibility numbers, decorative device status bars and the temptation to make every section a bordered card.

## Initial tokens

| Token | Initial value |
| --- | --- |
| canvas | #F7FBFA |
| surface | #FFFFFF |
| surface-subtle | #EDF6F3 |
| text-primary | #13252E |
| text-secondary | #4D626B |
| brand / primary-action | #11695C |
| brand-hover | #0D544A |
| accent-mint | #CDEAE2 |
| border-subtle | #DCE8E4 |
| error | #AD2737 |
| focus | #174EAF |

Use semantic CSS variables; do not scatter hex values across components. Verify actual foreground/background combinations, especially badges, disabled controls and focused states. A pale border or muted label may not supply sufficient contrast for essential controls.

Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px. Mobile page gutters: 16px at 320–359px, 20px at 360px+. Typical section gap: 28–32px. Container max-width: approximately 1200px on wide layouts. Use rem for text and flexible layout sizes.

Use one quality sans-serif family with Bulgarian Cyrillic support, such as a verified licensed Inter build. Self-host only the needed permitted formats/weights in the actual application; the handoff does not redistribute font files. Body 16px, supporting copy 14–16px, section heading 22–24px, mobile hero 32–36px with comfortable line-height. Navigation labels approximately 12px with full-size hit areas. Do not shrink body copy to force a layout.

Buttons/inputs: usually 48–52px minimum height; project tap-area target 44px or larger, preferably 48px. Corner radii: inputs/buttons 14–16px, cards 20–24px, dock 24–28px. Reserve pill shapes for small filters or the dock; not every surface. Shadow only where elevation has meaning, typically `0 8px 28px rgba(19,37,46,0.08)` for dock/dialog and a lighter card hover treatment.

## Hero and first-screen composition

Header: compact PhysiX wordmark left, 44–48px menu target right. The decorative logo in the image is provisional; a clean wordmark is acceptable until the owner supplies a final vector logo. No fabricated city/location.

Reference headline: 'Expert care for a stronger you.' Preferred two lines in the English design, but do not hard-code line breaks that break Bulgarian or text enlargement. At 390px, use the full content width for this longer heading and place the portrait in a subordinate region below/alongside supporting content. A wide title plus a large side-by-side portrait cannot both fit naturally in a narrow column. At larger widths, text-left/portrait-right is appropriate. A shorter headline may be proposed separately, not silently substituted as approved copy.

Supporting line should explain the offer, e.g. 'Physiotherapy in clinic and online.' This is clearer than 'Book online or in clinic', which can describe the booking channel rather than appointment mode. Hide online wording until it is actually offered. One short sentence; natural wrapping is allowed.

Finder: full-width, aligned to the main gutters, immediately below hero content. Actual accessible label 'Find a service'; placeholder 'Search body area or service'. Left-aligned text inside a centered container. No decorative divider or oversized arrow. Booking remains the strongest filled CTA; online uses a secondary style. At 320px or with longer Bulgarian labels stack the CTAs instead of truncating or shrinking them.

The first 390×844 reference viewport may show header, hero, search/actions, issue shortcuts and the beginning of services. Charlie's detailed card, reviews, plans and footer are reached by scrolling. Never squeeze the entire page into 844px.

## Services and issue assets

Service rail: approximately 240–264px cards at 390px width, a 12px gap and a clear glimpse of the next card. One comfortable card plus a partial next is preferable to three unreadably small ones. At wider mobile/tablet widths two cards may fit. Desktop becomes a grid of three, not a sideways carousel.

Image area uses a consistent aspect ratio around 4:3, common lighting/cropping/background treatment and custom imagery. The title and brief description live in HTML below the image, not embedded in raster text. One whole-card link with a decorative arrow. No separate image/title/arrow links competing for focus. The service categories need clinical approval; a guided-plan teaser is not necessarily a bookable service.

Issue shortcuts: consistent silhouettes, one highlighted area, readable text. Use a horizontally scrollable row if five targets do not fit; no tiny anatomy illustrations. The list remains available via a View all link. No autoplay carousel or drag-only controls.

Charlie preview: portrait, heading, a short accurate introduction and a clear profile link. Optional verified credentials/attributes wrap naturally below. No vertical separator columns, no forced three-column metadata, no unverified 'top rated' pill. Space and type hierarchy provide grouping.

Reviews: only consented/authorized genuine quotes with appropriate source attribution. Omit the section entirely until available. Recovery programme teaser is below trust/clinic information and absent from production until a real programme exists; R2 Account prioritizes an owned active plan.

## Dock, menus and focus

Public dock: Home / Book / Online / Account. Four equal labelled destinations, 20–24px consistent icons, no raised center element. Active state uses icon/text plus a small shape/background cue, not color alone. Desktop replaces the dock with header navigation and a Book button at approximately 900px+; choose the breakpoint by actual layout rather than device marketing names.

Dock positioned about 12px from sides/bottom with `env(safe-area-inset-bottom)` added. Main content bottom padding must exceed dock height + offset + safe-area + 20px. Add scroll padding so focused fields/errors are not obscured. Use `100dvh` appropriately for dialogs, not a fixed 100vh page trap. Test browser toolbar and keyboard behavior on actual mobile browsers. When search/dialog is open, the dock must not overlap its controls; focus and dismissal remain correct.

Book steps and rescheduling use a focused shell with one sticky Continue/Confirm area, replacing the dock rather than stacking both. Back is labelled and respects draft context. Menus/dialogs trap focus only while open and restore focus on close; Escape works on desktop.

## Accessibility and motion

Target WCAG 2.2 AA, with the larger project touch-target convention above. AA minimum target criteria and the project's preferred 44–48px targets are not the same claim. Check contrast, labels, focus visibility, non-obscured focus, keyboard order, error association and reflow. Automated checks are necessary but not sufficient. See [W3C sources](research.md).

Respect reduced-motion preferences; 120–180ms opacity/position feedback is enough for most interactions. No animated text, autoplay hero video, parallax or horizontal page overflow. Reserve image dimensions to avoid layout shifts; lazy-load below-fold imagery, not the main hero. Decorative duplicate assets have empty alt text; meaningful content images have concise accurate alternatives.

Required visual review widths: 320, 360, 390, 430, 768, 1024 and 1440px, with emphasis on 390px, 320px reflow and Bulgarian longest strings. Test 200% text/zoom and keyboard navigation. Wireframes are dimensionally useful guides; they are not pixel tests of inaccessible placeholder text.
