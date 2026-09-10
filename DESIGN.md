# Physix design authority

Follow [EXPERIENCE.md](docs/physix/EXPERIENCE.md), [LOCALIZATION_AND_CONTENT.md](docs/physix/LOCALIZATION_AND_CONTENT.md) and [VERIFICATION.md](docs/physix/VERIFICATION.md).

Public website reference: the supplied [frontend handoff](frontend/README.md), assessed in [PUBLIC_DESIGN_REVIEW.md](docs/physix/PUBLIC_DESIGN_REVIEW.md). Mint/white/navy/deep teal is the recommended public family; it need not copy the account palette. Keep public/account CSS scoped and shared Physix identity coherent. The supplied files are design references, not implemented or fully approved production screens.

Preserve the original Future Pro account interface as the starting visual authority: component hierarchy, measured geometry, typography roles, soft lavender canvas, rounded surfaces, restrained green accents and compact navigation. The baseline is tag `phys1x-template-baseline` at `60582a5`. Integrate actual clinic/client records into that presentation; do not substitute a generic dashboard or an irrelevant onboarding gate.

Observed source tokens include canvas `#f1f0f6`, ink `#202020`, muted `#77767e`, line `#d8d7df`, accent `#82d444`, root radius `26px`, and nav height `68px`. Verify actual source during PX-001; these are preservation references, not blanket accessibility approval or instructions to hardcode new components.

Create the surrounding public clinic website and required staff surfaces deliberately, using approved Physix content and coherent shared styles. The rejected landing branch is not the public design authority. Record the new design direction and intentional changes before treating screenshots as an acceptance baseline.

Use approved logo/media/fonts with Bulgarian Cyrillic support and documented rights. Preserve layout roles when replacing assets. No fake staff credentials, testimonials, medical outcomes, reference prices or placeholder content in a public release.

Capture affected surfaces at 393px and 1440px; check 320px reflow, 200% zoom, BG expansion, keyboard/focus, overlays, reduced motion and mobile keyboard behavior. Retaining code is not evidence of complete 1:1 coverage. The route/reference inventory must state exactly what was compared and what was intentionally adapted or retired.

Historical source integration details: [ADR-016](astra/ADR-016-ORIGINAL-TEMPLATE-INTEGRATION.md). Original reference design notes: [legacy DESIGN](docs/legacy/DESIGN-reference-2026-09-05.md). Neither overrides current Physix scope.

## Public homepage composition — PX-051

The owner authorized replacing the rejected homepage composition. Follow [styling.md](styling.md): a compact care-focused headline, search, paired booking actions, 112px issue choices and fully visible service rows on mobile. Desktop uses three service columns. A single small practitioner portrait and quieter supporting sections follow discovery. Keep the inset floating dock and existing Physix palette. Account design remains unchanged. Current artwork is illustrative; this is implementation direction, not owner acceptance.

PX-052 owner correction supersedes PX-051: previous portrait hero, image-led service rail and teal practitioner panel restored. Follow the current correction in styling.md.

## Current public direction — PX-053

Owner explicitly selected Shop mobile UI/UX after reviewing clinic-template options. Current homepage uses white canvas, neutral collection/search surfaces, near-black actions, a contained Physix portrait banner and compact inset navigation. The current styling.md supersedes PX-051/PX-052 geometry rules. shop-home.module.css owns homepage styling; retained account remains unchanged.
