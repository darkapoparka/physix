# Public UI design tokens — extraction sheet

Status: provisional until FUI-001 master board is frozen. Use this file to record the shared measurements that implementation must reuse instead of duplicating route CSS.

## Current family

- Canvas: very light mint/white.
- Primary ink: navy.
- Primary action: deep teal/green.
- Supporting mint: pale mint surfaces and illustration fields.
- Cards: white or pale-mint with subtle boundaries and soft shadow only where the target shows it.
- Charlie: compact deep-teal card with white heading and pale-mint support text.

## Geometry to freeze from master board

- 390px mobile reference width and 320px narrow reflow.
- Shared page gutter.
- Header height and logo/menu alignment.
- Hero radius, portrait crop and hero-to-finder spacing.
- Finder height, icon track, circular action size and internal padding.
- Primary/secondary action height, icon size and label metrics.
- Issue tile width/height, art crop and label baseline.
- Service-card width, image ratio, text padding, arrow badge and radius.
- Section heading size and section-to-section spacing.
- Floating dock width, height, radius, icon/label positions and safe-area offset.
- Booking progress/action-bar geometry.

Exact values should be measured from the selected board and then implemented as shared CSS custom properties or equivalent tokens.
## Frozen from Home — PX-067

- Mobile outer gutter: `20px`; `16px` below 360px.
- Mobile header: about `78px`; menu target `48px` with 16px radius.
- Finder: `60px` overall with 46px circular action.
- Paired Home actions: `52px` minimum height; filled Book / outlined Online.
- Home section heading: about `23px` on standard mobile.
- Issue cards: approximately `60–76px` wide in the five-item rail at 390px.
- Service cards: image-led horizontal rail; about half-width at 390px, wider on narrow phones.
- Charlie card: about `154px` minimum height, deep teal with portrait anchored right.
- Dock: exactly four destinations; active icon receives a mint field and teal label, with no underline.
- Mobile locale control: not a header chip; language switch lives in the menu sheet.