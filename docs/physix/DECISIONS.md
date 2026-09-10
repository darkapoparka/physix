# Decisions and unresolved inputs

Status values: CONFIRMED = explicit owner direction; DEFAULT = reversible engineering choice for the agreed architecture; OPEN = no answer; SUPERSEDED = retained history. An engineering default cannot set real clinical, commercial or privacy policy. Record date, source of authority and impacted tasks whenever a decision changes.

## Confirmed direction

| ID | Decision | Basis / consequence |
|---|---|---|
| D-001 | Independent project now in `M:/physix-pro`; brand Physix | Originally copied as phys1x; owner requested relocation on 8 September 2026; source apps remain untouched |
| D-002 | Start from original app UI with backend retained | Owner rejected the replacement member UI and later the unrelated landing-page detour |
| D-003 | Website plus account area; bookings are essential | Owner described a website whose account link opens the client app |
| D-004 | Bulgarian and English | Owner answered “both”; partial bilingual screens do not satisfy complete localization |
| D-005 | Responsive web first, native app later | Native distribution is excluded from v1 completion |
| D-006 | Next.js, one organized project initially | Owner accepted the architecture discussion and requested an execution plan |
| D-007 | Community is part of the product idea | Exact participation/events/moderation policy is still open |
| D-008 | Track implementation across sessions | Root tasks.md plus canonical docs, evidence and session handoff |

## Engineering defaults

| ID | Default | Change trigger |
|---|---|---|
| D-010 | Keep installed React/TypeScript/custom CSS/Lucide stack | Concrete dependency or compatibility defect; no framework migration as cleanup |
| D-011 | Supabase/Postgres integration retained behind server services | A documented replacement decision; no second database added incidentally |
| D-012 | One Next.js deployment; feature modules; route-specific layouts | Actual independently deployed app/team or measured build need |
| D-013 | `/bg` and `/en` locale routes; `/[locale]/account` and `/[locale]/staff` | URL migration decision before route implementation; Bulgarian fallback is a default, not a clinic fact |
| D-014 | Browse public services/times before authentication; verify identity before final booking | Clinic requires assessment invitation or approval-only booking |
| D-015 | Server/database owns reservations, permissions and status; no client-authorized outcomes | Non-negotiable integrity requirement |
| D-016 | Proposed community v1: staff announcements/events and optional RSVP | Owner approves other scope in D-026; no open social feed assumed |
| D-017 | Proposed clinical scope: home plans, adherence, client feedback and private messages | Owner explicitly scopes clinical notes/medical-record workflows; no diagnostic engine |
| D-018 | Keep `/api/v1` contracts platform-neutral where practical | Explicit versioned migration; a future native UI will reuse contracts, not web CSS |
| D-019 | Recommend supplied mint/white/navy/deep-teal family for public website/booking, with original account UI preserved | Owner requested assessment; recommendation is not approval of every image detail. PUBLIC_DESIGN_REVIEW.md records missing screens, fixture content and route reconciliation |

## Clinic inputs required before affected tasks can finish

| ID | Open question | Affected tasks | Safe work while unanswered |
|---|---|---|---|
| D-020 | Must new clients book an assessment first, or any eligible service? Is confirmation automatic or staff-approved? | PX-012, PX-014, PX-015 | Design both decision points; test configurable eligibility with synthetic data |
| D-021 | City, address, contacts, opening date, actual services and service descriptions? | PX-010, PX-011, PX-039 | Content inventory, unpublished structures; no invented facts |
| D-022 | Therapists, credentials, service eligibility, session lengths, breaks/buffers, rooms/equipment and opening hours? | PX-011, PX-013, PX-017 | Build constraints and synthetic scenarios; publish no real availability |
| D-023 | Booking horizon/lead time, cancellation/reschedule cutoff, no-show policy, staff override policy and minors/dependents? | PX-014, PX-016, PX-025 | Configurable rules with test-only values; no penalty or dependent-account assumption |
| D-024 | Pay at center, prepayment, deposits or packages? Prices/currency, seller, invoices, refund and cancellation-fee rules? | PX-019, PX-039 | Keep existing billing dormant; code adapters without live offers |
| D-025 | Which intake fields/documents and progress measures are clinically needed? Who may access them, and retention/consent requirements? | PX-025, PX-026, PX-032 | Minimize collection; role/ownership infrastructure; no real patient data |
| D-026 | Community membership, event visibility/fees, moderators and permitted user contributions? | PX-028, PX-029, PX-030 | Plan optional announcements/events with no private-care sharing |
| D-027 | Physix domain, deployment/database/email ownership, environment budget and provider access? | PX-006, PX-018, PX-038, PX-040 | Local isolated tests and configuration templates; no automatic cloud provisioning |
| D-028 | Approved logo, original photos/video, font licenses, BG/EN copy reviewer and translation ownership? | PX-009, PX-010, PX-031, PX-039 | Preserve layout roles and prepare asset manifest; no publishable rights assumed |
| D-029 | Launch service scope, pilot participants, support owner and acceptance sign-off person? | PX-039, PX-040, PX-041 | Prepare staged acceptance and runbooks |

The affected-task column highlights primary consumers; the policy-gate column in root tasks.md is the complete per-task gate list. PX-002 collects all inputs and PX-039 audits every release decision. When a decision changes, search its ID across the ledger and contracts and revalidate every affected acceptance criterion.

Ask only questions needed for the next dependent slice, in ordinary chat if the question UI is unreliable. Group related clinic questions into a short request. A missing response is not approval. Keep unanswered items OPEN and mark the specific dependent task BLOCKED with the precise missing input; continue other ready work.

## Change record

- 2026-09-08: Owner requested relocation to `M:/physix-pro` and review of its existing `frontend/` folder. D-001 updated; D-019 records the public styling recommendation. All nine original handoff files preserved. This does not approve live online services, sample practitioner identity, prices or catalogue commerce.

- 2026-09-08: Created from current conversation. Removed the rejected landing page from active scope. Preserved original baseline. No OPEN policy is resolved by this document.
- Future entry format: date; decision ID; previous/new state; exact owner answer or evidence link; task/scope changes; code migration implications.

- 2026-09-08: PX-045 owner requested normal app entry after homepage inspection. Public pages now use /bg and /en with root redirect to /bg. Engineering transition: /account exposes the retained client app and shared links preserve this prefix; legacy paths remain compatible. This is an interim deviation from the planned fully localized account namespace, not closure of D-013 or locale/auth roadmap tasks. No clinic policy, content or provider decision changed. See evidence/PX-045.md.

- 2026-09-08: Owner delegated reference selection and requested styling.md/AGENTS linkage plus implementation. Shop is now primary public styling reference, Physix retains identity, Headspace informs discovery and Doctolib booking. styling.md supersedes earlier public geometry experiments as active styling guidance. This does not authorize restyling retained account or approve current clinic media/content. See PX-049 evidence.

2026-09-08 — PX-051: explicit owner instruction to execute the proposed redesign supersedes previous60%-width service rail freeze. Mobile services now use complete rows; hero portrait removed, practitioner shown once below discovery. This is design implementation direction, not final owner acceptance.

2026-09-08 — PX-052: explicit owner rejection supersedes PX-051. Restored preferred image-led homepage composition and retained readability corrections; evidence/PX-052.md. No backend, account or deployment changes.

2026-09-08 — PX-053: owner authorized Shop-led mobile app styling after reference research. Implemented homepage in dedicated CSS module; updated styling.md as current authority. Verified local bilingual mobile/desktop and interactions; evidence/PX-053.md. Final visual acceptance and live backend remain open.

2026-09-08 — PX-054: owner requested direct improvement after rejecting PX-053. Shorter banner, visible two-column service cards before issues, white service section and displayed result count implemented; verified locally, evidence/PX-054.md. No backend/account/deployment changes.

2026-09-09 — PX-055: owner clarified clinic-first opening with search inside hero. Implemented unified hero, fixed form-width clipping, verified mobile/BG/desktop and search. Evidence/PX-055.md.

2026-09-09 - PX-057 rejected; D-002/D-003 reaffirmed by the owner: PhysiX is the public marketing website with bookings; the retained Gymaf app serves signed-in courses/programmes/exercises and account features. Website My account leads to that experience. Do not promote the rejected preview, introduce compulsory discovery onboarding, replace the member UI or assume this correction approves a new visual theme. Preserve the green PhysiX identity; purple remains rejected. Recovery is bounded to existing public routes; no clinic/provider policy is resolved.

2026-09-09 - PX-058: owner asked to improve the actual public marketing homepage and show browser evidence after clarifying the website/member-app boundary. Repaired /en and /bg in the original light mint/green visual family. Existing member code/styles/auth remain unchanged; My account enters /account. Services/detail/booking are not completed by this homepage slice. No image-generated portrait, clinical/commercial claim or production launch approval is inferred.

2026-09-09 - PX-059: owner rejected PX-058 anatomy and visual mismatch. Correct actual homepage toward original mint/navy reference; do not invent a new direction, restyle Gymaf or treat functional checks as visual approval. Reference imagery remains illustrative.

2026-09-09 - PX-060: owner objected to mobile search alignment/component quality. Refined the existing public homepage only; no new theme/member UI. Stable search, shared gutters, readable controls and explicit dialog-trigger restoration verified in Chromium and WebKit. Visual acceptance is still open. See evidence/PX-060.md.

2026-09-09 - PX-061: owner instructed correction after rejecting PX-060. Continued in existing public homepage, with anatomical illustrations from the earlier mint concept, shared mobile component geometry and compact lower sections. No member UI, backend, route namespace or production approval changed.

2026-09-09 - PX-061: owner instructed correction after rejecting PX-060. Continued in existing public homepage, with anatomical illustrations from the earlier mint concept, shared mobile component geometry and compact lower sections. No member UI, backend, route namespace or production approval changed.

2026-09-09 - PX-062: owner praised issue/service cards and requested header, hero, Charlie and FAQ refinement. Implemented on normal public routes; card rules/markup and reference artwork preserved. Verification in evidence/PX-062.md. No member redesign, live provider or publication changes. Visual approval remains open.

2026-09-09 - PX-064: owner explicitly corrected public information architecture after rejecting PX-063. Services are not a primary public dock destination; appointment-service selection begins inside Book. The public dock remains Home / Book / Online / Account. Homepage service cards may still open service-detail pages, and their Book action may carry the selected service into the booking flow. This changes no clinic availability, provider or member-app policy.

2026-09-09 — PX-065: owner clarified that fidelity work applies to the entire PhysiX public experience, not a single Book screen. Public IA remains Home / Book / Online / Account; service selection is owned by Book, with service detail pages as discovery/booking entry points. Rebuilt public route family under one mobile visual system; retained Gymaf is explicitly excluded from this redesign. No provider/content policy was resolved.
