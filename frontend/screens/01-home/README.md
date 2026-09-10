# 01 — Home

Status: implementation target frozen for PX-067.

## Mobile target

- Public route: `/en` and `/bg`; same geometry in both locales.
- Header: PhysiX logo + one bordered menu button. No visible locale chip in the mobile header.
- Language switch lives inside the menu overlay/sheet.
- Compact portrait-led hero: `Expert care for a stronger you.` + `Book online or in clinic.`
- Full-width search immediately below the hero.
- Immediately below search: filled `Book visit` and outlined `Online consult` actions.
- `Common issues`: five anatomical image tiles with readable labels and horizontal-safe reflow.
- `Our services`: premium image-led cards; never generic icon-only tiles.
- Compact deep-teal Charlie section below service discovery; no invented ratings, credentials, quotes or availability.
- Floating dock: exactly Home / Book / Online / Account. Active state uses teal emphasis, not a long underline.

## Fidelity rule

Implement real HTML/CSS/components and existing approved artwork. Do not rasterize the whole generated screen. Verify at 320 / 390 / 430px and compare the 390px capture before calling the slice ready.