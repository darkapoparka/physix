# Decisions

## Home correction — 21 September 2026

Owner rejected pastel panels, image fades and repeated booking blocks. Refine the current application using high-contrast typography, one booking entry, photographic service discovery and compact care/information roles. Preserve the brand, navigation, saved records and provider boundaries. This is not a new framework, repository or release authorization.

## Current Home-system authority — 20 September 2026

The implemented Home and shell now follow DESIGN.md, TOKENS.md, HOME.md and DESIGN_RESEARCH.md, with values owned by src/styles/physix-tokens.css. Older visual trial descriptions below are historical, not a command to restore their palette, icon-only dock or category switch. Primary navigation remains Home / Book / My care / Menu. Bookings, assignments, purchases, authorization and local/production boundaries are unchanged. The owner requires all PhysiX work and GitHub delivery on `main`; review or feature branches are not allowed. This is not deployment or visual approval. Current executed results and limits are in SESSION.md and evidence/home-system-20260920.

## Implementation clarification — 19 September 2026

D01/D02 are now executed: M:\physix-app exists as an independent Fidelity-derived checkout, with the donor preserved. The planning-session descriptions of absent folders and documentation-only work below describe that earlier checkpoint. SESSION.md, SOURCE_PROVENANCE.md and TASKS.md own current status. No source, stack, design-family or live-provider decision was changed during recovery.

The booking preview lives under /dev/demo/book with fixed synthetic contacts and an explicit non-reservation result. It validates interaction design only; D07 separation of appointments, purchases and assignments is unchanged.

Date: 19 September 2026. This register distinguishes the owner's stated direction, the selected technical plan, proposed operating defaults, and unresolved clinic decisions.

## Owner direction reflected in this plan

The friend has opened a physiotherapy centre. PhysiX needs a public website, appointment booking, online plans that users can purchase and see in their account, exercise/workout delivery and tracking. The owner prefers Gymaf's app-like interface over the current Motion Makers appearance. This session is for discussion, selecting the foundation and preparing implementation documents—not for deploying a rebrand.

## Selected implementation direction

| ID | Decision | Reason and consequence |
|---|---|---|
| D01 | Fidelity is the foundation; `M:\physix-app` is the independent destination. | Its member-app structure matches the requested product better than continuing the rejected public-site styling. The specification is delivered as a planning-only download; the PC destination has not been created. |
| D02 | Preserve `M:\gym-fidelity`; do not turn the original Gymaf checkout into the clinic product in place. | Protect another product and its uncommitted fixes. Bootstrap an isolated derivative with provenance. |
| D03 | Motion Makers contributes approved content/assets and booking requirements, not its CSS framework or public shell. | Existing PhysiX work is valuable without dictating the new UI. |
| D04 | One responsive web product with public, patient and practitioner surfaces. | The clinic needs discovery and daily account use, not three separate apps. |
| D05 | Keep Next.js, React, TypeScript and Fidelity's existing CSS/component structure. | No framework rewrite or library shopping. Refactor only the boundaries needed for PhysiX. |
| D06 | Preserve programme/session/version mechanics; adapt the domain incrementally. | Exercises, sets/reps, scheduling and progress are useful in physiotherapy. Remove irrelevant fitness/social features, not useful persistence. |
| D07 | A service, appointment, commercial product, entitlement and care-plan assignment are separate concepts. | Buying access must not imply an appointment or a clinical prescription that was never made. |
| D08 | Public browsing and appointment discovery do not require login. | The current member-first authentication wrapper must not become the new public website gate. |
| D09 | Supabase/Postgres remains the backend direction, using a separate PhysiX environment. | Reuse reviewed implementation patterns, never the existing Gymaf customer database or blanket RLS. |
| D10 | Stripe-hosted checkout is the proposed payment integration, subject to clinic merchant eligibility and policy approval. | Reuse candidate provider code; live/sandbox fulfilment still needs verification. Do not provision or charge in this planning session. |
| D11 | Use app-like navigation and Fidelity's visual family, not a generic green-on-white clinic template. | Keep visual continuity while replacing identity, imagery and fitness-specific screen content. |
| D12 | Web first; optional installable experience later; native apps are a separate future project. | Shared APIs/types can help later, but Next.js DOM/CSS is not automatically a React Native UI. |
| D13 | Small vertical slices with visual approval and real persistence tests. | Avoid another sequence of disconnected homepage redesigns or huge speculative screen boards. |

## Proposed defaults, not assertions about the clinic

Start with one clinic and its current practitioner(s), not a marketplace. Hide practitioner/location selection when there is only one eligible choice. Build multiple-practitioner capability where booking needs it, not a multi-tenant SaaS onboarding system.

Use one-time programme purchases and practitioner-assigned plans first. Subscriptions, appointment-credit packs and mixed bundles are modelled as later extensions unless the clinic confirms they are needed at launch. Do not import Gymaf's old monthly price, guest credits, trials or cancellation rules.

For initial in-clinic bookings, paying at the clinic can be the simplest proposed checkout policy. Online consultations and digital products may require prepayment, but the clinic must decide. The application supports the policy selected per offer; it does not invent one from the modality.

Suggested public navigation: Home / Book / Plans / Menu. Suggested patient navigation: Home / Book / My Plan / Progress / Menu. Messages and appointments remain clearly reachable from Home and Menu. Exact labels and the four-screen layout proof are subject to owner review; no new visual approval is claimed here.

Build English/Bulgarian content capability because prior PhysiX work includes it. Confirm the primary public language and jurisdiction before launch. No currency, timezone, age eligibility or professional title is assumed from language alone.

## Open decisions and who owns them

The clinic owns service names, durations, prices, capacity, booking rules, commercial packaging, content, clinician identity and privacy/retention requirements. The product owner approves the adapted visual set and launch priorities. Engineering verifies source reuse, data isolation, persistence and provider behaviour.

The largest commercial question: ready-made self-guided programmes, individually prescribed programmes following assessment, or both? The model supports both, but the UI must state which one the buyer gets and when exercises become available.

`CLINIC_BRIEF.md` is the only intake list for unresolved facts. Unanswered business facts do not prevent safe shell/demo work. They do block publication, real charges and the affected clinical workflows.

## Superseded recommendations

The uploaded conversation initially preferred Motion Makers and later corrected to Fidelity plus a PhysiX derivative. This plan selects the later direction based on the owner's app-first brief and the bounded local inspection. Neither the earlier “only Motion Makers” rule nor Gymaf's independent coaching roadmap becomes PhysiX's product authority.

No claim is made that Fidelity is complete or secure for patient use. The source contains development fixture paths and historical provider/asset acceptance gaps. Source reuse is conditional on testing, not on a previous assistant's confidence.


## Implementation amendment — saved local workflows

Owner feedback rejected the enlarged dock and the absence of saved booking/workout behaviour. Restore the source geometry instead of redesigning the app again. Move the functional local entry to /login -> /app and reuse the retained care SQL/commands. The original /dev/demo remains a labelled visual reference, not the main demonstration of functionality.

Use PGlite only as a pinned local development/test PostgreSQL engine on this PC because no local Docker/Postgres toolchain was discovered. No hosted provider is provisioned or borrowed. This is a local-test implementation choice, not approval to replace the target Supabase architecture, use sample identity as real authentication, publish clinical content or deploy the prototype.

## Owner revision — mint refresh, 19 September 2026

The owner explicitly selected modern logo-related green in place of lavender/purple, a Treido-like icon-only floating dock, less Home copy with search higher, and the already-generated consistent illustration set. These instructions supersede the original lavender and labelled-capsule baseline, not the Fidelity-derived application foundation or saved-care contracts. No framework, backend, entitlement, clinical policy or live-provider change is implied.

A service tap opens available times immediately. A separate off-screen View availability action is not required. Home problem/discovery cards map to existing public service offerings without adding clinical diagnoses or newly invented services.


## Owner revision — white canvas, 20 September 2026

Replace the all-over mint tint with white and neutral grouping surfaces; use green selectively for actions, selection and one lead service. Reduce uniform decorative prominence, strengthen app-scale typography, and retain the generated assets, compact icon-only navigation and saved-booking/care contracts. This supersedes the mint canvas only, not the canonical Fidelity-derived codebase.

## Owner rejection of the white-polish redesign — 20 September 2026

The owner retained Fidelity as the code/feature and visual-pattern foundation. White page backgrounds do not authorize an outlined-card clinic layout or replacing the source's display roles. Current correction: solid mint/sage/sand media panels, forest banners, substantial art, shared public/patient card composition and a stored-data weekly panel; retain white canvas and icon-only navigation. This supersedes the assistant-inferred white-polish hierarchy, not the saved-care/booking architecture.

## Locked product structure — 20 September 2026

The owner requested implementation of one coherent PhysiX experience, not two differently designed applications. Keep the existing Fidelity-derived Shell, CareCard, Sheet, Row, colours, typography and compact icon-only dock for both public and patient routes. Authentication changes access and content, not the visual system.

Public discovery: horizontal service rail → vertically stacked landscape focus cards → solid forest online-care banner → patient-care entry. Desktop reflows these into appropriate grids. Do not promote one arbitrary service into a permanent exclusive hero or regenerate the six-asset set.

Patient care: Today → Programmes → Schedule, with Progress and Book in the shared dock. Programmes are actual assignment/version groups, not individual scheduled workouts. An assignment contains sessions; each session can have multiple independent attempts. Multiple assignments of the same published version stay distinct. Preserve old session-overview links through redirects.

The programme library uses the existing local database's assignment_id and version_id plus actor-scoped published metadata. No migration, purchase fabrication, source-donor write or provider provisioning is part of this increment. Programme grouping is scoped to the current care relationship, matching the local single-practitioner pilot. Broader relationship selection remains separate work.

Charlie can be added to the same visual system when an actual approved portrait is available. Do not generate a fictional face or invent qualifications to fill the header. No new hero is required to finish programme, schedule and tracking usability.

## Stable navigation correction — 20 September 2026

The current implementation has a fixed consumer dock: Home (/), Book (/book), My care (/care), Menu. Labels, destinations, order, geometry, logo destination and account link must not change after sign-in. The public programme catalogue stays under /plans and is reached from discovery and Menu; it must not replace the owned-plan destination.

/care is the canonical private route namespace, not a separate application. /app bookmarks redirect to /care; old /app/book redirects to the same public /book. Authentication and record authorization still occur on the server. Login accepts only an allowlisted internal care return path. Never accept an arbitrary return URL or put patient fields in it.

My care contains Today, My plans, Schedule and Progress in one stable secondary navigation. Reading a programme or session overview retains the primary dock. Only active exercise sessions and focused booking steps hide it. Keep the white canvas and existing solid Fidelity-derived cards; do not restart typography, artwork or palette work for a routing correction.

## Home composition correction — 20 September 2026

Keep one consistent discovery collection rather than stacking differently styled service, focus and online blocks. Services / By area are public browse categories; online remains an appointment modality and area entries lead to the existing physiotherapy offering. Use the same CareCard geometry in both categories, and one distinct forest banner for private programmes. Preserve the accepted booking, My care and fixed dock. This is a bounded Home change, not a new frontend or visual-system replacement.


## Homepage purpose correction — 20 September 2026

White background, solid Fidelity panels and the fixed dock remain. Home must answer what the centre offers, how to visit in person or online, and how patients continue their plans. Horizontal treatment discovery and vertically stacked visit panels serve distinct tasks; do not collapse them into a flat tile catalogue or add Services / By area filtering. This implementation remains subject to visual review. Booking/patient workflows are preserved.

## Reference-led visual implementation — 20 September 2026

The owner explicitly requested implementation of the Gymaf/Future-led study. This is the current implemented direction, not a claim of pixel-perfect visual approval. Separate photographic features, captioned library tiles, utility rows and quiet data panels now replace repeated illustrated coloured boxes. The neutral header/intro is continuous; the fixed consumer navigation and existing care/bookings remain. Generated photographic preview assets are not actual clinic identity or clinical instruction. No further project, framework, paid provider or deployment decision was made.

## Mobile polish decision — 20 September 2026

Use contextual task headers for internal mobile screens; retain the selected Home brand presentation and the same primary dock. Expose appointment management directly rather than via Menu alone. A stored appointment detail is the confirmation destination. Calendar export is a generic reminder; cancellation is a separate acknowledged command; rescheduling remains a distinct atomic operation, not cancel-and-rebook.
