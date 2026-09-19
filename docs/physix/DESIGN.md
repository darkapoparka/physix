# Visual direction, components and assets

## Direction

**Adapt Fidelity; do not redesign from a blank clinic template.** Preserve the app-like composition, layered soft surfaces, image-led cards, rounded controls, concise navigation and useful member-screen hierarchy. The initial colour family is Fidelity's cool neutral/lavender family, with restrained PhysiX brand accents. Do not replace every surface with white and green simply because this is a healthcare product.

This is a design-family decision, not approval of every inherited pixel. Fix weak contrast, typography fallbacks, dock overlap, fake operating-system chrome, broken images and inappropriate fitness imagery. Do not preserve a defect in the name of fidelity.

The inspected saved capture `M:\gym-fidelity\.artifacts\gymaf-bypass-final.png` shows the general family but also reference identity/content and layout/typography issues. It is historical synthetic evidence, not a fresh runtime acceptance capture or the final PhysiX target. Capture the current selected runtime and verify fonts before measuring or claiming parity.

## Small approval set before expansion

Build one coherent set using the same tokens/components: public Home, Book/service selection, patient My Plan and an exercise session. Include a short empty-account state to prevent a design that only looks good with fixtures. Compare against the current Fidelity family at the same viewport, not against different boards for each page.

The owner approves this set before broad screen expansion. Record accepted screenshots and the specific unresolved differences in one evidence folder. Do not keep generating alternative full-site boards. Missing artwork is a bounded asset task, not a reason to restart architecture or invent branding.

## Component adaptation map

| Fidelity pattern | PhysiX use | Keep / change |
|---|---|---|
| Main workout/Today card | Next prescribed session or care-programme card | Keep visual hierarchy, media treatment and primary action; replace fitness content |
| Workout library cards | Owned plans, programme catalogue, service discovery where appropriate | Keep card vocabulary; distinguish store from owned content |
| Week/schedule section | Prescribed exercise week and appointments | Keep compact chronology; appointments and exercise sessions have distinct types |
| Exercise player | Guided physiotherapy exercise session | Keep actual exercise mechanics; add clinician-approved dosage/instructions and honest save states |
| Progress screens | Activity/adherence and approved patient-reported tracking | Replace bodybuilding metrics; show missing data and clinical pauses honestly |
| Messaging/profile sheets | Private care messages and patient settings | Keep tested interaction structure; enforce clinical permissions and privacy |
| Bottom dock | Public/patient navigation from UX_AND_ROUTES | Replace Friends/Challenges; ensure safe-area clearance and one active item |
| Large photographic/soft cards | Clinic and practitioner content | Use rights-cleared clinic identity/media, not reference people |

## Token consolidation

First extract the actually loaded Fidelity colours, typography, spacing, surfaces, radii, shadows and navigation dimensions. Record one token layer before introducing new tokens. Do not append another large override stylesheet for every correction.

Proposed geometry defaults for the adapted set: 16–20px mobile page gutters, 8px base spacing with 4px fine steps, roughly 24–32px section separation, 16px body/input text, 14px secondary labels when legible, 44–48px primary control targets, and 20–28px major-card radii. These are starting design choices to verify against the baseline, not measurements of the existing app or accessibility certification.

Keep one clear heading family and one readable interface family at most. Reuse an existing font only after proving loading and licensing. Select a rights-cleared replacement when necessary; fonts are not available for distribution merely because they exist in a reference folder. Do not silently ship a browser fallback serif and call it the approved typography.

Declare semantic roles for canvas, surface, elevated surface, ink, muted ink, accent, border, focus, error and success. Separate status colour from decoration. No health/safety interpretation should depend solely on a green/red chart mark.

Our product target is at least 44px for primary touch controls, with readable text and sufficient separation. This is intentionally more generous than the basic WCAG 2.2 2.5.8 24px minimum with exceptions; see reference R6 in CLINIC_BRIEF. Test actual accessible behaviour, not just control dimensions.

## Responsive behaviour

At 320–430px: real full-width mobile layout, safe-area-aware dock and sheets, no clipped labels, no global fixed phone height and no horizontal document overflow. Test 200% text and long Bulgarian labels. Content may scroll vertically; a small explicitly scrollable rail must expose its affordance and keyboard access.

On tablet: widen content and use appropriate paired panels without stretching text into long unreadable lines. On desktop: use a wider public layout and a proper patient/staff navigation structure. The exercise player may remain intentionally focused, but not the entire website.

Do not render fake iOS time, battery, home indicator or browser chrome. Use the device's own controls. Avoid permanent fixed heroes that push search and actions below useful reach. Keep content above/below fixed controls through actual inset calculations, not screenshot-specific spacers.

## Asset inventory and rights

Candidate donors, not automatic publication approval:

- Motion Makers: `docs/physix/targets/home-selected.webp`, the two files in `docs/physix/boards/`, `docs/physix/ASSETS.md`, `src/lib/physix-catalogue.ts` and selectively inventoried public assets. The generated screen images are reference-only, not interface backgrounds.
- Fidelity: current component/surface patterns and internal reference captures. `public/reference`, `public/fonts` and inherited practitioner/fitness media require a rights review; no assumption of commercial reuse.
- Clinic-supplied: actual approved logo master, practitioner/clinic photos, biographies, service text and clinician-reviewed exercise media.

Before importing a publishable asset, record its source path, destination path, SHA-256, role, dimensions, licence/permission evidence, depicted-person permission where needed, reviewer and status: candidate, approved, replace or reference-only. Keep original reference bytes; create derivative crops as separately named files. No whole-directory asset dump.

Essential launch media: approved logo; actual practitioner and clinic imagery; covers for published services/programmes; exercise instructions and any promised videos. Do not invent a practitioner's face or credentials. Generated anatomy/illustration can fill a reviewed visual role but is not medical instruction, a real person or proof of an exercise's suitability.

## Visual acceptance

For each changed screen save viewport, route, application mode, source revision, screenshot and notes. Check typography loaded, media intact, one primary action, navigation active state, card hierarchy, text reflow, sheet focus, safe-area/keyboard clearance and empty/error state. Compare consistent viewport pairs.

Technical checks and visual owner approval are separate. “Build passed,” “close enough,” “all reference screens mapped” and “one screenshot looked good” are not visual acceptance. Do not promise 1:1 against unavailable, inconsistent or legally unusable source material. The goal is a coherent approved PhysiX app using Fidelity's strengths.
