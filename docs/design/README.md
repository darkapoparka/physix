# PhysiX visual handoff

## Read the references correctly

The final generated mockup establishes the visual direction. The written [design system](../design-system.md) and the viewport wireframes establish implementable proportions and behavior. Security, truthful content and accessibility take precedence over any screenshot.

![Compact thumbnail of the final generated PhysiX homepage direction](reference/physix-home-final-thumbnail.webp)

This repository includes a **235 × 418 compact thumbnail** for orientation, not a high-resolution production asset. The separately delivered `physix-design-pack.zip` contains the original **941 × 1672 PNG**, these vector wireframes and rendered PNG previews. For higher-resolution inspection locally, copy `reference/physix-home-final-original.png` from that archive into this repository's `docs/design/reference/` folder. The app can be built from the committed specifications/wireframes even before that optional import. Do not upscale the thumbnail into production imagery or attempt to extract a usable portrait from it.

The original generated image is a long-page style composition, not a realistic single mobile viewport. Its fictional people, ratings, testimonials and credentials are not evidence about Charlie or the clinic. Its handwritten slogan and crowded multi-column cards are not instructions to preserve those details.

## Wireframes

These are authored SVG diagrams, **not new image-generation outputs and not screenshots of an implemented application**. They use labelled image placeholders deliberately. Custom production service assets still need to be supplied or created separately; placeholder circles are not a recommendation to replace those assets with generic icons.

| Screen | Reference | Purpose |
|---|---|---|
| Mobile Home, first viewport | [home-mobile.svg](wireframes/home-mobile.svg) | Readable 390 × 844 layout, short hero, finder/actions, first service-card glimpse |
| Mobile Home, lower content | [home-mobile-scrolled.svg](wireframes/home-mobile-scrolled.svg) | Charlie, genuine-proof slot, clinic information and later programmes reached by scrolling |
| Services | [services-mobile.svg](wireframes/services-mobile.svg) | Visible finder, useful filters, readable image-forward service list |
| Booking | [booking-mobile.svg](wireframes/booking-mobile.svg) | Focused time-selection screen, explicit provisional selection, Continue area instead of dock |
| Online | [online-mobile.svg](wireframes/online-mobile.svg) | Human online appointment explanation and availability entry, no disguised AI |
| Account | [account-mobile.svg](wireframes/account-mobile.svg) | Own appointments; clinical-plan panel explicitly marked R2 preview |
| Desktop Home | [home-desktop.svg](wireframes/home-desktop.svg) | 1440 × 1024 wide hero, header navigation and service grid, no mobile dock |

The lower-Home view is an illustrative scrolled composition, not an exact scroll offset screenshot of the first diagram. Booking dates and times are synthetic examples. Labels such as 'verified credential' identify an asset/content slot; do not publish that phrase as actual evidence. The small 'wireframe' annotations are design metadata, not website copy.

## Implementation priority

Build real components and HTML text. Keep service images independent from titles and descriptions. Reuse the same header, card, field, typography and spacing contracts across pages. Keep only one horizontal service rail on the homepage; the full listing must be comfortably browseable. A hinted next card is intentional viewport clipping, not permission for document-wide overflow.

The long English headline takes the full content width at 390px, with portrait content subordinate. At wider widths the portrait can sit beside the headline. Support Bulgarian line lengths and enlarged text rather than forcing the same pixel layout everywhere. The browser toolbar, keyboard and safe-area behavior require actual device/browser testing.

The dock has four equal destinations. Focused booking replaces it with the current flow action. Add real content bottom padding; the fixed dock must not cover the final reachable content or focused controls. Images do not prove these interaction behaviors.

## Production assets

See [asset manifest](asset-manifest.md) for provenance and missing originals, and [asset prompts](asset-prompts.md) for the visual brief. Do not use the generated face as Charlie's real identity, invent reviews, or redistribute the selected WordPress theme assets without an appropriate licence. No font files are included in the handoff.
