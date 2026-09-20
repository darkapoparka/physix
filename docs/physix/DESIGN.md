# PhysiX design system — active specification

Status: homepage foundation implementation, 20 September 2026. Owner visual acceptance remains pending. This document replaces all earlier competing visual directions; the old document is retained under history/DESIGN-before-system-20260920.md. Keep product, authorization, booking and clinical contracts in their existing owning documents.

## Product intent

PhysiX is a clinic discovery and booking experience that continues into a useful patient app. Public Home must make booking obvious without requiring an account. Returning patients need their next real appointment/programme, not another sales homepage. An online consultation is an appointment; a digital programme is separate content/access. Never imply that either is a purchased or prescribed plan without the corresponding record.

Keep the selected Gymaf-derived shell, current green identity, existing reference artwork and stable Home / Book / My care / Menu navigation. No additional project, framework, UI library, pretend phone frame or full-site image board. The original Gymaf/Future reference is a composition reference, not permission to copy its people, identity or fake operating-system chrome.

## Visual language

White is the canvas. Forest is the brand/feature surface; mint is supportive grouping; jade identifies actions and state. Do not invent a new green for each component. Use a photo-led service tile, a purposeful appointment entry, a compact information sheet, and a care feature for different jobs rather than making every block the same generic card.

Manrope remains the interface face. Existing Lora display roles outside Home are preserved, not replaced by another typography restart. Home uses a small named type hierarchy: title, section, feature, subheading, card, body, secondary, caption. Controls use complete readable labels; do not solve overflow by reducing them to 10px. Remove decorative slogans that compete with actual choices or saved care information.

## Executable ownership

- src/styles/physix-tokens.css owns primitive values, semantic roles and legacy aliases. TOKENS.md explains use and migration boundaries.
- src/features/physix/home.module.css owns Home layout, component arrangements and media crops. Do not append a global override stylesheet for the next correction.
- catalogue.ts owns candidate names and service mode eligibility; home-content.ts is a presentation projection, not a second catalogue. booking-link.ts constructs allowlisted public booking state.
- Shell, MobileDock, ContextHeader and Sheet remain shared. Do not change destinations, order or geometry as a side effect of sign-in or a Home redesign.
- home-context.ts and shared/physix/home-care.ts retain minimal authorized projections. Components must not fetch or serialize a whole account just to decorate Home.

## Component contracts

HomeHero: one headline, useful short description, labelled native search form, clear clinic and online actions. Keep the header and masthead visually continuous; no white header pasted over an unrelated green rectangle.

ServiceDiscovery: the catalogue supplies names and modes; the presentation map supplies artwork and stable test identifiers. The whole tile is one semantic link to that service's time selection. It is not a button containing another link. Labels describe the offer; no invented price, duration, rating or availability.

HomeVisits: a large, explicitly labelled booking link is separate from the information button. The card no longer makes a tiny corner arrow the only way to book while the main area unexpectedly opens a sheet. Information sheets retain focus, Escape/close and focus restoration, and clearly identify missing clinic details.

HomeCare: render once. Assigned care appears before discovery; guests see a neutral invitation below the visit options. Preserve real completion counts, read-only access, next-session/resume destinations and immediate identity invalidation. Do not show a fake score or decorative motivational side column.

## Mobile behaviour

Use defined gutters and vertical rhythm. Primary actions target 48px; standalone Home controls at least 44px; text inputs 16px; secondary/action text 14px. Cards can grow with translated or enlarged text. Touch target requirements apply to the interactive element, not every decorative icon.

At 320px the document must reflow without sideways scrolling. A service rail may scroll within its own region, expose the next item, support keyboard access, and reveal focused links. Do not hide all the other services behind an unexplained carousel. Tablet/desktop must not become a giant fixed phone frame. The dock, focused booking footer and sheets respect safe-area insets and keyboard behaviour.

## Quality gates and handoff

Run check:design, typecheck, scoped lint, unit and build checks, then the relevant browser suites. Inspect real screenshots at 320, 390, 430, 768 and 1440px, not only DOM measurements. Check enlarged text, keyboard navigation, loaded fonts/images, direct booking mode/service selection, information-sheet focus return, guest and assigned care, identity clearing and private-cache boundaries.

Record exact results in evidence/home-system-20260920 and SESSION.md. Source implemented, browser tested, owner visually accepted and release-ready are different states. Passing a build is not visual acceptance. This local application still has synthetic identities/catalogue/availability; real clinic content, original high-resolution approved media, real authentication, payments and live operations remain separate release gates.
