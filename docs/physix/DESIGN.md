# PhysiX visual system

## Current direction — 21 September 2026

The owner rejected the pastel panels, photographic fades and repeated promotional cards. The current Home revision is a high-contrast, task-led composition. This is an implementation for review, not a claim of owner approval or perfect design. Earlier screenshots and Git revisions are historical, not competing instructions.

Keep the existing PhysiX identity, Gymaf-derived application, Next/React/CSS Modules and Home / Book / My care / Menu destinations. Do not create another project, swap libraries, regenerate branding or render a reference screen as UI.

## Composition

Home has a normal-flow white header and a strong typographic introduction. Search and one clinic/online booking pair immediately follow the introduction. The header is not overlaid on a photo. No gradient hero, pastel visit panels or ornamental portrait banner remains.

Service discovery is a photographic library: one image and one catalogue title per link, without a surrounding colored card, marketing subtitle or fabricated price. Use the existing 1200px decorative editorial images rather than small fragments from a generated screen. Photography is a local preview, not the actual centre, staff or exercise instruction.

Assigned care and the next appointment precede public discovery. Guest care is one ink-colored entry with separate links to owned care and the public programme catalogue. No invented programme, score or prescription. Practical clinic/online/first-visit details live in plain information rows, not a second booking section.

## Styling ownership

`src/styles/physix-tokens.css` owns shared values. The emphasis roles provide near-black surfaces and their readable supporting text. Home and Shell consume those roles in their owning CSS Modules. Keep legacy care/booking aliases stable during this bounded change; this is not a claim that every inherited screen is migrated.

Manrope remains the interface family. Use the title, section, feature, card, body and secondary roles. Stronger hierarchy comes from type, spacing and image proportions, not a new color for every section. Home controls use at least 44px targets and the primary pair at least 48px. Do not shrink labels to force them onto a screenshot.

## Interaction and responsive rules

At 320–430px, support a full-width webapp, readable actions and a keyboard-accessible service rail that reveals focused content. At 600px and above the three services form a grid. Desktop places the introduction and booking controls side by side, not in a stretched phone frame. Large text must reflow. The shared dock, contextual internal headers, focus restoration and safe-area clearance remain.

The whole service tile is a link. Information rows open the existing native sheets. Native browser Back, mode/service intent, server-owned confirmations, cancellation retry, care authorization and cross-tab identity clearing must survive visual changes.

## Evidence

Run the maintained Home suite (`test:home` and `test:home-system` are aliases), design checks, typecheck, lint/build, and relevant navigation/appointment regressions. Inspect actual screenshots and hit targets; assertion counts do not establish visual approval. The current SESSION checkpoint records the exact outcome. Real clinical content, providers, full accessibility and physical-device acceptance remain separate.
