# PhysiX public website styling

Current implementation: PX-062, 9 September 2026. Continues the original mint/navy public website, not the rejected dark previews. Compact mobile composition, anatomical art from the earlier mint concept, scoped search/action components, and retained Gymaf entry. Owner visual acceptance remains open.

## Product boundary

PhysiX is the public marketing and booking website. My account enters the retained Gymaf experience for courses, programmes and account features. Do not replace that app, copy its dashboard into the website, add compulsory onboarding or create another frontend.
Work in the existing `/en` and `/bg` routes. Keep the member source, global styles, backend and unrelated dirty work unchanged.

## Reference and components

The supplied original mint/white/navy website and earlier mint screen concepts are the visual references. Use green/teal actions, navy text, a portrait-led opening, anatomical issue illustrations, white image-led service cards, a compact teal practitioner card, and equal Home / Book / Online / Account navigation.
No purple, charcoal website, invented ratings, clinical credentials or proof. Generated imagery and names remain illustrative.
`src/features/physix/home.tsx` and `shop-home.module.css` own the homepage. The CSS filename is retained; it is not a Shop clone or a new styling authority.
Use one component system rather than accumulating competing override files. System sans-serif typography is explicit in the website scope; do not modify or distribute member font files.
Mobile outer gutter is 24px (16px below 360). Search, paired booking actions, section headings, service grid and dock share this alignment. Search uses stable 24px / flexible input / 44px tracks, 16px input text and a labelled clear action. Full booking labels must fit or wrap naturally.
The page scrolls; it is not a screenshot scaled to fit one viewport. Keep interactive targets, real text, safe-area clearance, keyboard focus and reduced-motion behavior.
The compact Recovery Plans panel links to `/account`, not a second course catalogue/player. It does not assert live course entitlement or checkout.

## Artwork and provenance

`public/physix-preview/website-art/anatomy/` contains native-resolution crops of the earlier supplied mint concept; its manifest identifies the source and crop coordinates. The books, practitioner and service artwork are also reference derivatives. They are not approved standalone clinic photography or high-resolution asset deliveries.
Do not turn the screenshot into a background interface. Inputs, labels, navigation and arrows are HTML/SVG. Original references remain untouched.

## Verification

See `docs/physix/evidence/PX-061.md` and `.artifacts/website-finish/`. Compare actual browser captures at mobile, tablet and desktop sizes; exercise empty/typed/cleared search, filters, menu focus, FAQ and account navigation.
Technical checks do not establish visual acceptance. Live scheduling/authentication, physical-device testing and publication remain separate gates. Continue only in existing public routes; preserve Gymaf.

PX-061 component targets: shared mobile gutters; stable 56px finder with 44px icon action and 16px input; at least 44px interactive targets; solid white four-item dock; native aspect ratios for distinct illustration families. Programme discovery leads to the member app, never to appointment booking. Evidence: docs/physix/evidence/PX-061.md.

## PX-062 focused refinement

The owner likes the issue/service cards. Preserve their markup, CSS rules, artwork and behavior. Header/hero/Charlie/FAQ were the only requested refinement targets. The hero uses a contained portrait frame, not a full-width crop behind navigation. The language entry is a direct locale link; do not give it a fake dropdown interaction. Charlie has a visible Meet Charlie button rather than a whole-card overlay. FAQ uses native exclusive details with plus/minus indicators, readable answers and real navigation; service availability remains truthful. See evidence/PX-062.md. Existing search, member entry, dock and Gymaf styles remain preserved.

## PX-065 full public screen system

The public route family now uses `public-screens.module.css` for service details, Online, About, First Visit/FAQ and booking continuation states, while the homepage keeps its protected issue/service card styling. Service selection belongs inside Book; `/services` redirects to `/book`. The public dock remains Home / Book / Online / Account. New public screens must match the same 390px mint/white/navy/deep-teal geometry before desktop adaptation. Gymaf styles remain outside this system.
