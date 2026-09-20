# Visual direction, components and assets

## Latest feedback and reference review — 20 September 2026

The owner rejected d5493ef Home: an isolated green hero, disconnected header treatment and repeated illustrated panels do not preserve the original Gymaf/Future visual family. Prior implementation descriptions below are history, not approval. Read [the concrete source comparison](references/fitness-apps-20260920/README.md) and its index.html viewer before the next change. Primary reference: the original saved Gymaf/Future screens. Secondary: official Nike Training Club publisher screenshots for photographic content hierarchy. Distinguish lead media, library tiles and compact utility rows instead of forcing everything into CareCard. This review changed no application source and makes no fresh-runtime parity claim.

## Current Home revision — direct discovery, 20 September 2026

The Services / By area selector was rejected. Home now presents four service choices directly, two columns on mobile and four on desktop. No category control, second focus stack, or content hidden in a swipe rail. All four use one image-to-caption composition with scoped geometry tokens; shared defaults retain the existing patient programme/session presentation. Home nests service h3 headings under its discovery h2. The four cutouts remain decorative and the unused originals are preserved.

Back and neck remain search terms in the existing service catalogue, not invented additional appointment offerings. One forest banner opens /care/programmes directly. Keep the established header, high search, white canvas, solid colours and stable dock. Visual acceptance is still the owner's decision.


## Direction

**Adapt Fidelity, not a clinic template.** White is the page canvas only. Keep the original app composition: media-first cards with substantial art, solid-colour card bodies and banners, serif display roles with sans-serif controls, compact sheets and the selected icon-only dock. The owner rejected the white-polish thumbnail/bento layout. Mint, sage, sand and forest panels provide hierarchy without restoring an all-over tint.

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


## Historical navigation correction — superseded by icon-only dock

At 390px, the adapted dock had drifted to 358x68 with a nearly opaque surface. Restored donor CSS geometry produces 348x64, 20px bottom offset plus safe area, original translucent white and lighter active state. Patient headings are smaller/lighter; focused booking has no dock and its mobile primary action stays reachable. New saved-care screens use the same custom token family. The owner has not yet approved these changes; fresh runtime parity with 3216 could not be captured. Source CSS and PhysiX browser measurements are documented in evidence/persistence-20260919.

## Previous implementation — mint refresh (superseded surface treatment)

Public Home now has a concise centered heading, search immediately underneath, compact Book/Online actions and six illustrated discovery cards. Composition lives in src/features/physix/home.module.css. On a 390px viewport the search input begins at about 195px from the viewport top. Use two card columns on mobile and three on wider screens; no baked-in UI images.

MobileDock uses Treido Next's inspected independent floating action pattern, not its commerce routes: four public or five patient circular icons, 44px each with 8px gaps, 200px/252px total widths and 44px height. Destinations retain accessible names, active state, keyboard-focus tooltips, safe-area offset and menu focus restoration. Hide the dock while entering text and during focused booking/exercise tasks. Do not restore the older 348x64 full-width labelled capsule.

Primary actions and dock targets stay 44px; supporting icon controls can be 36px and text actions 32px with adequate separation. No blanket 44px minimum is applied to every supporting control. This is not screen-reader, real-device or WCAG certification.

The semantic colours live in src/app/physix.css: forest #153e32, jade #23735d, mint #77d8b3, pale mint #d7eadc, canvas #f3f6f0 and muted ink #5a6b61. Error colour remains distinct. Home and dock styles are scoped modules; obsolete global home/dock rules were removed rather than left under another override cascade.

The selected six semi-3D cutouts are recorded in assets/illustrations-v1/manifest.json. Use as decorative service/discovery and programme covers, never as exercise instructions or the actual practitioner's likeness. Browser evidence is in evidence/mint-refresh-20260919. Owner visual approval of the running implementation remains separate from test results.


## Rejected implementation — white-polish cards, 20 September 2026

Owner feedback asked for a white background and more refinement. The canvas is now #ffffff with #f5f7f6 grouping surfaces; #202b26 text and #626f68 secondary text. Jade #24785f and forest #173f35 identify actions/selection. No full-page colour gradient. Existing tokens and owning CSS modules are edited in place.

App headings now use the existing Manrope family with stronger size/weight hierarchy. Home retains its high search and concise heading. On mobile, Physiotherapy is a horizontal lead card, Sports/Mobility are paired, Back/Neck are compact entries, and Online is a smaller row. Desktop presents three primary cards and three supporting entries. All six decorative assets and the direct-to-time destinations remain. Enlarged feature text can wrap the illustration to a new row.

The independent icon-only dock retains its 44px geometry and accessible names. Inactive icons are neutral white; the selected icon is forest. Patient plan media is smaller, card bodies are white, and calendar/progress/recording surfaces are neutral. The exercise media area intentionally remains dark; this is not a whole-app forced light media panel.

See evidence/white-polish-20260920 for inspected captures and exact final tests. Owner visual acceptance, real-device testing and full assistive-technology acceptance remain separate.

## Current implementation — Fidelity card and panel correction

CareCard (care-card.tsx/.module.css) uses the inspected donor today-card → media → today-copy structure, 24px rounded clipping, real headings and real links. Public services and saved patient plans share this component. Service discovery uses a scroll-snap rail with the next card visibly peeking on mobile and three columns on desktop. Back/neck use the same substantial media-card family, not 40–60px thumbnails. Online consultation is a solid forest banner; My Plan is a solid mint banner. The artwork itself is unchanged.

CareWeek adapts the donor challenge-card/week-calendar structure without challenges, fake streaks or scores. It renders only the stored patient schedule and completion states for the displayed week. Booking summary and progress panels keep solid fills. White canvas and the user-selected compact dock are retained.

Source: M:/gym-fidelity/src/components/home.tsx and src/app/globals.css. A current donor browser navigation timed out; the stored gymaf-bypass-final.png capture was inspected as a historical reference, not current-runtime parity. Reference identity, imagery, fake OS chrome and donor account/storage state are not imported.

Style corrections do not authorize a backend/auth/session rewrite. Visual owner approval remains separate from typechecks and browser acceptance.

## Shared product composition — 20 September 2026

Do not split public and authenticated routes into different design languages. The current white canvas, solid mint/sage/sand panels, forest banner, display typography and compact dock remain common. `CareCard` is shared, with media-first or substantial landscape orientation; neither is a tiny outlined thumbnail row.

Home uses a horizontal rail for the three appointment services, a vertical pair of landscape focus cards and the forest online-care banner. These sections serve different discovery tasks rather than selecting one permanent featured service. No new visual board or asset family was generated.

Patient care uses the same visual vocabulary: Today, assignment-level programme cards, programme detail, a week/day schedule, a 7/28-day activity view and recorded attempts. Library filters and the Today / Programmes / Schedule navigation adapt the inspected Gymaf workout-library and schedule patterns. Dates and progress come from saved local records, never reference screenshots.

A programme is not an individual workout. Programme-card completion is unique completed scheduled sessions; repeated attempts remain separate history. Activity charts count recorded attempts in the selected period. No recovery score, fabricated purchase or fictional clinician portrait is shown.

## Navigation polish, not another restyle — 20 September 2026

The consumer dock now has four identical icon positions across discovery, login, booking, and care: Home, Book, My care, Menu. At 390px it is 200x44 in every non-focused screen. Header geometry is also shared. Care screens use a compact Today / My plans / Schedule / Progress text navigation; Progress no longer inserts a new dock icon.

The existing solid panels, serif display roles, artwork and white canvas are retained. Programme library artwork takes less vertical space. Programme detail has one title, a static completion summary (not a self-link), collapsible metadata and immediately useful session actions. Completed programmes do not repeat their status in a second large banner.

Do not infer owner approval from tests. Screenshot comparison and real-device acceptance remain separate.

## Home coherence correction — 20 September 2026

The owner identified the Home sections as visually inconsistent. Supersedes the earlier service-rail / landscape-focus / online-banner composition, not the Fidelity design family. Home now contains one discovery section with Services and By area links. Both use the unchanged CareCard primitive: same width, media ratio, title placement, radii and solid palette. Online is a normal service entry in the same family, not a custom banner. Back and neck remain alternate discovery entries mapped to physiotherapy, not new clinical offers.

One forest banner leads directly to /care/programmes. Search, hero copy, booking actions, white canvas and primary navigation remain. Mobile shows the next card as a scrolling affordance; tablet uses two columns and desktop four. Public category navigation is server-rendered and URL-backed; native Back and reload restore the selected category. All six existing assets remain available; no new images or patient data were added. Booking and private-care source are outside this visual change. Technical verification is not owner visual approval.


## Centre homepage — 20 September 2026

The owner requested a proper new-centre homepage, not repeated grid/selector changes. Home now separates treatment discovery (horizontal CareCard rail on mobile, three columns on desktop) from how/where to attend (matching in-clinic and online visit panels, stacked on mobile and paired on desktop). A restrained mint intro contains identity, search and immediate booking actions. The ongoing-care section leads to saved programmes and public programme discovery. First-visit questions use native disclosures.

This is the same Fidelity-derived product: no new global typography, navigation, card library or framework. HomeVisits is the small interactive boundary for the existing native Sheet; the rest of Home remains server-rendered. No rotating carousel or automatic scrolling. Cards are reachable with keyboard navigation.

Location information is explicit about the address/hours being unconfirmed; no fictitious map, location, clinician portrait or actual clinic photo is substituted. Online details distinguish an appointment from a programme and state that local reservations do not create video meetings. A supplied, approved clinic address and real imagery can replace the missing-content state later.
