# PhysiX public UI implementation blueprint

Status: active visual implementation contract for the public PhysiX website. Root `tasks.md` remains the canonical project ledger; `frontend/tasks.md` is the scoped visual backlog for this design pass.

## Goal

Rebuild the public PhysiX route family so the rendered mobile UI matches the best high-fidelity Image Gen direction, not merely the same colors or content order.

The target is a coherent product system: Home, Book/service selection, service detail, Online, About/Charlie, First Visit/FAQ, booking Time/Details/Review/Confirmation, menu/search and truthful system states.

Gymaf remains the retained signed-in application. `Account` is an entry boundary, not permission to redesign Gymaf.

## Source hierarchy

1. Explicit owner feedback in the current conversation.
2. `frontend/concepts/02-public-app-master-board.png` once the new master board is exported from ChatGPT.
3. Existing `frontend/concepts/01-home-and-services.png` for the strong mint/white/navy/deep-teal visual family.
4. `frontend/reference/selected-home.png` for the original hero/discovery language.
5. `docs/physix/PUBLIC_UI_MASTER_PLAN.md`, `styling.md`, and route/product contracts.
6. Current browser implementation only as functional evidence, never as the visual authority.

Do not rasterize whole screens. Generated boards define composition, geometry, imagery direction and hierarchy; production controls remain semantic HTML/CSS/SVG.
## Visual lock before coding

Every route must have a reviewed 390px high-fidelity screen before its production styling is considered locked. Each screen folder can contain:

- `reference.png` — selected target crop or owner-approved reference.
- `generated-vNN.png` — Image Gen iteration under review.
- `spec.md` — exact screen hierarchy, states and content constraints.
- `acceptance.md` — measurable parity checks and known intentional differences.

Do not begin a new art direction per route. The same header, typography roles, control heights, card radii, icon family, mint surfaces, white cards, deep-teal actions and bottom dock geometry must repeat across the public app.

## Mobile-first geometry

Design at 390px first, then prove 320px and 430px reflow before tablet/desktop adaptation. The target should feel like the generated mobile product, not a desktop page squeezed into a phone.

Lock shared geometry before route polish: page gutter, header height, hero radius, 52–56px search/action controls, service-card image ratios, 20–24px card radii, section spacing, fixed/floating dock height, safe-area clearance and typography scale.

The page scrolls naturally. Do not compress an entire mockup into one viewport. Do not add sideways document movement, clipped CTA text, tiny service cards or duplicate sticky actions.

## Information architecture

Public dock: `Home / Book / Online / Account`.

Service discovery begins on Home and inside Book. `/services` redirects into Book; there is no Services dock tab. Service-detail pages may link back to Book and preselect their service.

Booking uses a focused shell: `Time -> Details -> Review -> Confirmation`. Do not show the public dock underneath the booking action.
## Reusable implementation layers

Build one public component system instead of route-specific CSS patches:

- `PublicHeader` / locale control / menu trigger.
- `PublicDock` with one geometry and active-state treatment.
- `Finder` with search icon, text field and circular submit/clear action.
- `PrimaryAction` and `SecondaryAction` with shared icon/text alignment.
- `IssueRail` and `IssueTile` using anatomical artwork at native aspect ratio.
- `ServiceCard` with consistent image crop, title, description and arrow badge.
- `CharlieCard` with compact deep-teal surface and portrait treatment.
- `InfoCard`, `FeatureRow`, `FaqList`, `ProgressStepper` and booking action bar.
- Shared empty/error/unavailable/conflict/success states.

Prefer CSS variables or a small token layer for shared measurements. Remove competing overrides once the replacement system is proven; do not stack another visual patch file over the existing ones.

## Image and asset rules

Image Gen may create portrait, anatomical and movement illustration assets. Save selected assets separately from screen boards and document where each is used.

Never use a screenshot of the generated UI as a page background. Text, buttons, inputs, navigation, icons, cards and progress indicators remain real interface elements.

Do not invent clinic facts to fill a pretty screen. Prices, durations, live appointment times, clinician credentials, testimonials and addresses stay placeholder/truthful-unavailable until approved.

## Implementation sequence

1. Freeze the new master board and crop each route into its screen folder.
2. Extract shared tokens and component geometry from the board.
3. Rebuild the public shell/header/dock and primitive components.
4. Implement Home 1:1 before propagating components.
5. Implement Book/service selection and service detail from the same primitives.
6. Implement Online, About/Charlie and First Visit/FAQ.
7. Implement booking Time, Details, Review, Confirmation and conflict/unavailable states.
8. Implement menu/search overlays and account entry boundary.
9. Adapt the locked mobile system to tablet and desktop without changing the mobile hierarchy.
10. Remove superseded public styling only after visual and interaction checks pass.

## 1:1 acceptance loop

For every screen, capture the real browser at 390px beside the selected target and compare visible geometry: outer gutters, vertical rhythm, line breaks, image crop, card dimensions, radii, icon size, control height, dock position and whitespace.

A route is not accepted because it contains the same sections. It must visually read as the same designed product. Large deviations require implementation correction, not a new design explanation.

Then verify 320px, 430px, tablet and 1440px; BG and EN; keyboard focus; 200% zoom/reflow; reduced motion; safe-area clearance; and no horizontal document overflow.

Keep booking truth boundaries intact while matching the concept. A selected example slot is not availability, and a confirmation screen is not shown as real success until an appointment is actually persisted.

## Working files

- Screen workspace: `frontend/screens/`
- Shared visual specs: `frontend/specs/`
- Scoped visual backlog: `frontend/tasks.md`
- Existing master concept: `frontend/concepts/01-home-and-services.png`
- New master board slot: `frontend/concepts/02-public-app-master-board.png`

The original handoff assets stay untouched. New generated boards and crops should be additive so rejected iterations remain traceable without becoming the implementation baseline.