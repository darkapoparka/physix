# Decisions and unresolved inputs

Status values: CONFIRMED = explicit owner direction; DEFAULT = reversible engineering choice for the agreed architecture; OPEN = no answer; SUPERSEDED = retained history. An engineering default cannot set real clinical, commercial or privacy policy. Record date, source of authority and impacted tasks whenever a decision changes.

## Confirmed direction

| ID | Decision | Basis / consequence |
|---|---|---|
| D-001 | Independent project in `M:/phys1x`; brand Physix | Owner requested a copy named phys1x; never edit the source app |
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

- 2026-09-08: Created from current conversation. Removed the rejected landing page from active scope. Preserved original baseline. No OPEN policy is resolved by this document.
- Future entry format: date; decision ID; previous/new state; exact owner answer or evidence link; task/scope changes; code migration implications.
