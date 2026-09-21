# PhysiX tokens and theming

**Authority:** `src/styles/physix-tokens.css` is the executable value source. Import it once, before `physix.css`, in the root layout. This document describes roles; do not maintain another ungenerated list of colors in each component.

## Supported theme

The current scope is a light canvas with inverse brand/feature surfaces, not a finished dark-mode setting. A future theme changes semantic aliases, not layout, routes, authorization or patient data. Do not build unused theme toggles or a second JSON pipeline without an actual consumer and drift checks.

The architecture follows the DTCG distinction between explicit values and aliases. CSS custom properties are not themselves a DTCG JSON interchange file.

## Layers and ownership

**Foundations:** the neutral, green, lime and error palette; the spacing scale; the existing local font families. Primitive values are authored in the token file.

**Semantic roles:** canvas, surface, raised surface, text, muted text, border, brand, action, action hover, on-brand text, inverse secondary text, highlight, progress, focus and danger. Choose a role by purpose, not by a nearby hex value. Inverse text is only for sufficiently dark surfaces.

**Component roles:** control size, card/feature/control/pill radius, page gutter, section rhythm, content measure, type roles, shadows, overlays and motion. Fractions, documented image crops, border widths and breakpoints can remain in the owning CSS module. A token for every arbitrary pixel does not make a design system.

**Compatibility aliases:** `canvas`, `surface`, `forest`, `jade`, `mint`, `ink`, `muted`, `line`, `serif`, `sans` and the established care colors keep existing consumers working. Do not remove them until their consumers are migrated and checked.

## Type and geometry

| Role | Base value | Use |
|---|---|---|
| Caption | 12px | Short non-primary metadata |
| Secondary | 14px | Supporting text and controls |
| Body | 16px | Body and input text |
| Card | 16px / 600 | Service title |
| Subheading | 18px / 700 | Visit title |
| Feature | 24px / 600 | Care feature |
| Section | 22px, 26px desktop | Section hierarchy |
| Title | Fluid 40–76px | The single Home headline |
| Minimum target | 44px | Standalone Home controls |
| Primary control | 48px | Main booking actions |
| Search | At least 52px | Includes a 44px submit target |
| Card / feature radius | 20px / 24px | Distinct content roles |
| Control / pill radius | 16px / full | Inputs/actions and capsule controls |
| Page gutter | 16 / 20 / 24 / 32px | Narrow phone through desktop |
| Section gap | 28 / 32px | Rhythm, not isolated spacer divs |
| Content measure | 1120px | Wide layout, never a phone frame |

Values are rem-based. Weights are 500/600/700. Manrope remains the interface family; Lora roles outside Home are preserved. Do not shrink controls to 10–12px to make them fit. Let text grow, and let related action/visit groups wrap when enlarged text needs more space.

## Current Home roles

Emphasis, emphasis-muted and emphasis-line define the near-black feature surface and readable text. The flat radius is 12px and is used by Home controls, media and care. Display leading and tracking give the title its own role. Home uses no gradient/overlay tokens. Older roles remain for unmigrated screens; this is not a new theme toggle.

## States and behavior

Use defined focus, hover, inverse and error roles. Short media transitions consume the motion token; reduced motion removes the hover transform. Native sheets retain focus, Escape and focus restoration. Booking status must not depend on color alone.

Image overlay tokens are component treatments, not arbitrary per-page colors. Check actual text over every photo crop; a token-pair contrast calculation cannot certify the resulting composite. Tiny existing decorative crops are provisional media, not actual staff, the clinic or instructional video.

## Change and migration rules

Change the existing role first. Add a role only for a distinct recurring need and migrate a real consumer in the same change. Keep layout in the owning CSS Module; do not append a global override stylesheet. Static interface copy and crop geometry are legitimate code; duplicated service data, fake patient state and unrelated page palettes are not.

`npm run check:design` checks token references/cycles, expected legacy color roles, root import order, defined token use, raw color/type regressions in the migrated modules, and representative contrast pairs. It does not certify all accessibility, all components or photo composites.

This slice migrates Home and its shell styles. The inherited global stylesheet, dock, brand and other components still contain legacy literals. Migrate those in bounded, reviewed slices. This is not a claim that the whole application has become token-only.
