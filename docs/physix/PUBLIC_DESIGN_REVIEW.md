# Public website design review

Reviewed 8 September 2026 for the owner's request to move the project to `M:/physix-pro` and assess the supplied frontend direction. This review recommends a direction; it does not claim that the user has approved every generated detail or that the website has been built.

## Recommendation and scope

Use the mint/white/navy/deep-teal family in [the selected homepage](../../frontend/reference/selected-home.png) for public discovery, services, booking and sign-in entry. It presents the clinic and appointment action directly. The public website does not need to duplicate the lavender workout app's layout or palette. Keep the original account UI under its existing preservation contract; shared Physix identity, terminology, access and a clear Account transition can connect the experiences. Any later account recoloring or redesign needs its own reviewed scope.

One repository and the existing Next.js routing plan still apply. `frontend/` is a design-delivery folder, not a second app, runtime, submodule or reason to add Turborepo. Scope public CSS/tokens to its layout so mint/navy styles cannot accidentally restyle the account. Share functional primitives, accessibility behavior, auth and domain services where suitable; allow explicit visual variants.

## Inspected material

- [Original selected homepage](../../frontend/reference/selected-home.png): visual family and original content hierarchy.
- [Home + Services board](../../frontend/concepts/01-home-and-services.png): upper/lower Home, Services and Sports Rehab detail.
- [Booking wireframe](../../frontend/wireframes/booking.png): structural time selection, appointment summary and bottom action.
- [Screen plan](../../frontend/PhysiX-mobile-screen-plan.md), [delivery index](../../frontend/README.md), [asset manifest](../../frontend/asset-manifest.json) and read-only verifier.

The PDF is present and hash-verified; this review does not claim to have inspected every PDF page. The supplied plan states that only the Home + Services board is high fidelity; booking/supporting high-fidelity screens are outstanding. All six manifest assets pass checksum verification. All nine pre-existing frontend files remain byte-identical after the move.

## What works

1. The care offer, service discovery and Book visit action are prominent. It communicates a clinic more directly than showing a workout dashboard to a new visitor.
2. Mint surfaces, dark readable headings and deep-teal actions form a coherent public visual family. Service imagery and the practitioner portrait help distinguish the clinic's content.
3. The compact teal practitioner card on the concept board provides a useful change of surface while keeping the surrounding page light. Treat it as a proposal, not permission to expand it into a full-width dark section.
4. The screen plan gives booking a focused shell with back navigation, preserved details, explicit verification and truthful conflict/confirmation states. Separating the public dock from booking's bottom action is sensible.
5. The plan distinguishes live appointments, private assigned care plans and a possible educational catalogue. That distinction fits the backend/product contracts.

## Corrections and missing work before implementation acceptance

| Finding | Required treatment | Existing task owners |
|---|---|---|
| Original tall reference is a dense composition, not proven phone rendering | Build a scrolling page; keep readable service cards and visible horizontal-rail hints. Do not shrink the full poster into one viewport | PX-010, PX-034 |
| High-fidelity evidence covers mobile Home/Services only | Specify real desktop composition and finish booking/supporting screen designs and relevant states before claiming complete visual coverage | PX-010, PX-011, PX-015, PX-034 |
| Small anatomy labels, search hints and support text may become cramped | Fit actual BG/EN at 320/390/430px, verify contrast, keyboard/zoom, card targets and dock safe areas in the browser | PX-009, PX-031, PX-034 |
| Original reference contains Charlie, ratings and a patient quote | Replace with the actual approved practitioner, media, credentials and authorized quotes. Generated faces/stars/testimonials are not evidence of clinic facts | PX-009, PX-010, D-021, D-022, D-028 |
| Online consult and Recovery Plans are visible offers | Confirm scope/readiness. If unavailable, omit the live action or use a deliberate approved preview; never make a non-working service look bookable | PX-010, PX-011, PX-019, D-020, D-024 |
| Sample 45-minute / EUR 65 offering appears on the board | Use approved service data, currency and policy; do not import fixture values into production | PX-011 through PX-019, D-022, D-024 |
| Booking wireframe says step 2 of 4, but the written plan says Time → Details → Review, then confirmation | Reconcile one progress model during PX-015. Verification belongs within Details; a successful appointment requires a persisted record | PX-012, PX-015 |
| Public search is framed around pain areas | Use bounded service discovery; avoid diagnostic claims and private symptom text in URLs/logs/analytics | PX-007, PX-011, PX-035 |
| Handoff references another repository's routes/design/booking files | Local bridge documents point to current Physix contracts. Preserve the imported source document; do not silently treat its other-repository history as current implementation | PX-001, PX-003, PX-043 |

## Reconcile route and product differences

The root plan remains authoritative for implementation status and data contracts. Imported routes such as `/online`, `/charlie`, `/clinic`, `/faq`, `/book/details`, `/book/review`, `/verify` and `/programmes` are proposals. PX-003/PX-015 must map them deliberately into locale-prefixed routes; do not add them merely because an image lists them. Use the real practitioner's identity for routes/content, not an assumed Charlie page.

Home / Book / Online / Account is the proposed public dock. Confirm the Online service before making it a live destination. It does not replace the retained account navigation. Public sign-in can use the public visual family while sharing the existing verified auth service; entering Account must not unexpectedly create a separate user/payment identity or require a coaching subscription to view appointments.

The imported document's account/backend integration and older rejection history refer to its source context. In this checkout there is one planned Physix project with inherited backend code; no separately provisioned shared-platform integration is inferred.

## Handoff for the implementing session

Read this review alongside EXPERIENCE, ARCHITECTURE, BOOKINGS and LOCALIZATION_AND_CONTENT. During PX-009/PX-010, translate the selected public reference into measured public tokens/components and a representative mobile/desktop slice. Validate that slice before expanding to other public screens. Keep the original reference and screen-plan files unchanged as provenance; put subsequent design deliveries in the same `frontend/` folder with explicit names and review status.

The relocation/review completes PX-043 only. PX-001 through PX-041 remain pending. No public UI, authenticated UI, database schema or booking behavior was implemented in this task.
