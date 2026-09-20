# Fitness-app reference study — 20 September 2026

This is a reference decision, not a new homepage implementation or visual approval.
Current application checkpoint at inspection: `d5493ef3af8833039caf1076a61f7d33869beb1c`.
The owner rejected the isolated green hero below a white header and the continued drift from Gymaf.

## Primary: the original Gymaf / Future Pro reference family

The four `gymaf-*.webp` files are exact copies of the existing donor references in `M:/gym-fidelity/public/reference/`. These are the original saved reference screens, not fresh screenshots of 3216. Preserve source branding and do not use reference people or flattened UI as production assets.

- `gymaf-home.webp`: one photographic lead card, short metadata, compact supporting rail, selective tonal panels.
- `gymaf-workouts.webp`: photographic library tiles with captions on the surrounding surface; not every entry is a boxed, coloured hero.
- `gymaf-yoga.webp`: immersive exercise media with readable overlay controls and a focused start action.
- `gymaf-progress.webp`: quiet page background, clear sections, compact calendar and selective state colour.

Code reference: donor `src/components/home.tsx`, `workouts.tsx`, `primitives.tsx`, `progress.tsx`, and the corresponding CSS. Adapt presentation to existing PhysiX records; do not copy donor fixtures, fake OS chrome, commercial terms or authenticated storage.

## Secondary: Nike Training Club editorial and media hierarchy

Official source: https://apps.apple.com/us/app/nike-training-club/id301521403 (publisher: Nike, Inc). Supporting product source: https://www.nike.com/ntc-app . These are publisher screenshots fetched during this review, not proof of an independently tested current app session.

`nike-01.webp` demonstrates image/metadata list rows; `nike-03.webp` demonstrates wide photographic category banners; `nike-04.webp` demonstrates restrained activity/history hierarchy. Keep Nike's typography and branding out of the product; study the media scale, concise captions and clear grouping instead.

The connected Mobbin search returned a paid-plan requirement. No new Mobbin content was retrieved. The source screenshots already present in the repository were inspected locally. Fresh navigation to the donor on 3216 timed out and produced a blank capture; it is not accepted evidence.

See `manifest.json` for source locations and SHA-256 values, and `index.html` for the side-by-side reference viewer. All seven images are reference-only, outside `public/`.

## Proposed adaptation — not owner-approved pixels

Use Gymaf/Future as the primary component/composition reference. Nike is a secondary reference for photography, image cropping, useful metadata and content density; do not blend whole design systems or introduce another framework.

1. One continuous light-neutral header/welcome/search surface, with the existing stable navigation. Remove the isolated mint text-hero panel; do not merely paint the existing header green. Search stays high. A real practitioner/centre photograph can become the lead media feature without making every section a coloured box.
2. A compact horizontal treatment rail based on photographic library tiles. Use consistent image ratios and concise sans-serif captions on the surrounding canvas. No Services/By area control and no repeated booking captions.
3. A deliberately different wide feature for the centre or online appointment, using the same spacing/typography and real media when supplied. The vertical layout communicates a place/service, not a second copy of the treatment cards. Address/directions appear only with verified clinic details.
4. One useful programme/continue entry reusing the patient programme and saved-session patterns. Do not invent a plan, purchase, progress number or clinician relationship for a visitor.
5. Practical first-visit/location information stays concise and subordinate, not another large marketing banner for each question.

Share design tokens and behaviour, not one forced `CareCard` variant everywhere. The donor already distinguishes its lead `today-card`, `workout-tile` and compact `Row` roles. Recover those roles with owned media and existing PhysiX links/data. Keep booking, programme assignment/versioning, actual sets, progress, server authorization and the fixed Home / Book / My care / Menu navigation intact.

The existing six illustrated cutouts are not proof of the desired visual direction. Preserve their source files, but reduce their role to occasional support instead of using them for every hero, service, programme and visit panel. Charlie's identity must not be represented by a generated lookalike. Missing real photography blocks that particular final asset, not the component work.

Before claiming a visual correction, compare actual Home, programme library and session screens to these references at the same viewport, including a logged-out/empty account. Keep source tests and visual review separate. Do not write another speculative layout into AGENTS as though the owner approved it.

## Scope of this checkpoint

Reference images and documentation only. No application source, dependencies, backend, migrations or saved records were changed. No build or functional test suite was rerun for a documentation-only change. The original donor and its running server were not modified; 3217 remains on the inspected implementation.
