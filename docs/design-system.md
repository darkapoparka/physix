# PhysiX design system and responsive rules

## Active visual authority

**Use [the owner's restored homepage reference](design/README.md). Public-v2 was rejected on 2026-09-08.** Its CSS, copy and editorial layout are not the public design system. Earlier instructions saying written visual proposals automatically outrank the selected image do not authorize redesigning it.

The current owner selection controls appearance and visible labels. Security, truthful production content, accessibility and real responsive behavior remain necessary; solve those within the selected visual family. Propose a narrowly scoped change when a real conflict arises, rather than replacing the interface.

## Preserve the selected family

Cool pale mint/white canvas, dark navy text, deep-teal primary actions, softly rounded white surfaces, restrained mint shapes, custom editorial service artwork, anatomical issue tiles and the floating white four-destination dock. Keep the leaf-and-wordmark logo composition, portrait-led hero and compact Charlie card. Do not replace these with generic icons, a new bare wordmark, warm-beige editorial blocks, flat service rows or the rejected dark story band.

No oversized middle dock button, decorative phone status bar or separator columns in Charlie's card. Do not add decorative borders everywhere; equally, do not remove the original card family wholesale. The requested testimonial fix is local, not a new page-wide design system. Its final treatment remains unresolved.

## Copy and hierarchy

The [exact-label table](design/README.md#exact-english-reference-copy) is authoritative for the English visual reference. In particular: Book visit, Online consult, Search pain area or service and Home / Book / Online / Account. Do not silently replace these with 'Book a Visit', 'Online consultation', 'What’s bothering you?' or other alternatives.

Keep 'Expert care for a stronger you.' and 'Book online or in clinic.' in the reference. Target the selected concise heading, preferably two lines where it fits. Do not force clipping or microscopic type to guarantee the line count on every width. Translation and enlarged text may wrap naturally; translation review is not permission to rewrite the English design.

Finder is centered/aligned to the page gutters; its text remains left-aligned. Preserve the rounded field and restrained trailing arrow treatment. An accessible field label can be added without changing its visible placeholder. Preserve the filled primary / outlined secondary action pair; stack only when needed for readable tap targets.

## Shared implementation tokens

Use semantic variables and derive exact values by comparison to the selected reference, not public-v2. Existing starting points below are implementation targets, not exact colors sampled from every pixel of the generated image.

| Token | Starting point |
|---|---|
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

Keep the selected cool/navy appearance during actual matching. Check foreground/background contrast instead of assuming these starting values pass in every combination. Do not scatter literal colors across components.

Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px. Mobile gutters start at 16px on narrow screens and 20px around 390px; compare the rendered result rather than treating these as license to recompose the page. Use one visually matching sans-serif with reviewed Bulgarian Cyrillic support. Do not distribute font files in the handoff.

Readable body text starts around 16px; supporting text around 14–16px; section headings 22–24px; mobile hero approximately 32–36px as layout permits. Controls typically have 48–52px height and at least 44px comfortable tap areas. Adjust visual density through real spacing and layout, not tiny type. Rounded fields/buttons approximately 14–16px, cards 20–24px and dock 24–28px are starting dimensions to visually match.

## Cards and assets

Keep custom imagery separate from HTML titles and descriptions. Service cards retain image-first composition, soft treatment, rounded corners and their circular arrow detail. Reuse a consistent illustration/photo treatment across services. Do not replace this with unrelated stock crops or icon-only tiles.

At narrow widths, a readable horizontal rail with a visible next-card hint is allowed instead of squeezing three desktop-sized cards into one row. Keep card styling and content unchanged. Desktop can use a grid. One whole-card link is preferable to three duplicate focus targets for image/title/arrow. Provide a View all path; no drag-only or autoplay rail.

Issue tiles keep matching anatomical assets and mint highlighted areas. Labels remain Back / Neck / Shoulder / Knee / Posture in the reference. Allow horizontal overflow inside the rail, not document-wide overflow.

Charlie stays a compact rounded profile card without separator columns. Do not enlarge it into the rejected editorial block. The testimonial below it needs a localized new treatment; do not consider the original stacked-white-card treatment or public-v2 dark band approved fixes. Production reviews and professional claims require real approval; the image is not evidence of their truth.

Recovery Plans remains lower on the scrolling home with its Explore plans action. Its commercial availability and production claims remain gated by actual approved content.

## Responsive shells and controls

The reference is a long-page composition, not a literal 941px UI shrunk to phone size. Use real scrolling content, responsive media and HTML text. Match the visual language at 390px and provide 320px reflow. Desktop extends the same family rather than introducing a new art direction.

Dock: Home / Book / Online / Account, equal labelled targets, consistent 20–24px icons, selected-state cue in addition to color, no raised center action. Allow safe-area padding, about 12px outer offsets and enough content/scroll padding that controls never cover the last reachable content. Use a content-driven breakpoint for desktop header navigation, rather than inheriting public-v2's breakpoint blindly.

Focused booking replaces the dock with one current-step action area; no stacked fixed controls. Preserve selected controls and fonts within that flow. Back retains draft context. Menu/dialog focus, Escape, restoration, scroll behavior and keyboard overlap must be implemented and tested. Use dynamic viewport units appropriately rather than trapping the whole page in a fixed phone-height box.

## Quality gates

Target WCAG 2.2 AA; project target size of 44–48px is a design convention, not a claim that every AA criterion uses that minimum. Verify contrast, labels, focus visibility/order, unobscured focus, errors, keyboard access and reflow. See [research](research.md) and [testing](testing.md). No compliance claim follows from an image or an automated run alone.

Respect reduced motion. Avoid autoplay hero videos, parallax and decorative animated text. Reserve image dimensions, load the hero promptly and lazy-load below-fold assets. Supply appropriate meaningful alt text and empty alternatives for decorative duplicates.

Review at 320, 360, 390, 430, 768, 1024 and 1440px as implementation progresses, including long Bulgarian strings and 200% text/zoom. Compare visually to the owner's restored reference, not the rejected gallery. Track functional tests separately from visual sign-off. Generated portraits, badges and testimonials remain illustrative until replaced/verified.
