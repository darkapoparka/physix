# Documentation map

**Current scope: public PhysiX website only. Current appearance: [the owner's restored homepage reference](design/README.md), not public-v2.** The owner rejected the later redesign and rewritten labels. Start with that visual contract, [status](status.md), [tasks](tasks.md) and [current local prompt](handoff.md).

The production baseline remains Next.js / React / TypeScript. Future Gymaf/patient/backend documents are retained for separately authorized work, not prerequisites for matching the public design. The matching public screen set is unfinished; the rejected archive is not a completed visual handoff.

## Product and experience

| Document | Owns |
|---|---|
| [PRD](prd.md) | Purpose, users, outcomes, non-goals and launch definition |
| [Features](features.md) | Capability catalogue and release allocation |
| [Routes](routes.md) | Public, booking, patient, staff, preview and system route map |
| [User flows](user-flows.md) | Journeys and recovery behavior |
| [Selected visual reference](design/README.md) | Owner-selected appearance, exact labels, localized outstanding revision and rejection boundary |
| [Design system](design-system.md) | Matching component behavior, responsive implementation and accessibility |
| [Components](components.md) | React responsibilities, DTOs and interaction states; reconcile visual choices with selected reference |
| [Content](content.md) | BG/EN content, SEO, proof and approval; no unsolicited rewrites of locked English labels |
| [Rejected public-v2 archive](design/public-v2/README.md) | Historical experiment and functional coverage inventory only; no current visual authority |

## Engineering and operations

| Document | Owns |
|---|---|
| [Stack](tech-stack.md) | Selected technologies and dependency discipline |
| [Architecture](architecture.md) | One-app structure, server/client boundaries, environment modes |
| [Data model](data-model.md) | Canonical tables/invariants/access/migration ownership |
| [Booking](booking.md) | Atomic availability/booking/reschedule rules |
| [Security](auth-security.md) | Next/Supabase identity, authorization and privacy controls |
| [Clinical safety](clinical-safety.md) | Clinical scope, human publication and later AI gates |
| [Integrations](integrations.md) | Auth/mail/video/storage/payment/jobs and environment names |
| [Monetization](monetization.md) | Education purchases, entitlements and refunds |
| [Testing](testing.md) | Tooling versus application evidence, test layers and release gates |
| [Operations](operations.md) | Deployment, launch, backups, incidents and maintenance |

## Future source reuse — not public design work

| Document | Owns |
|---|---|
| [Reuse guide](reuse/gymaf.md) | Pinned submodule, extraction rules, provenance and boundaries |
| [Frontend adaptation](reuse/frontend.md) | Original visual components -> future patient app |
| [Backend adaptation](reuse/backend.md) | Connected concepts -> clinical-care schema and persistence proof |
| [Source inventory](reuse/inventory.json) | Exact paths/blob IDs, destinations and actual adaptation status |
| [Vendor README](../vendor/README.md) | Retrieval and read-only-by-policy usage |

## Execution

| Document | Owns |
|---|---|
| [Bootstrap](bootstrap.md) | Safe local official CLI and source setup; no public dependency on vendor checkout |
| [Tasks](tasks.md) | Single ordered backlog; DESIGN-PUBLIC-01 reopened after rejection |
| [Status](status.md) | Current owner correction and actual delivery state |
| [Decisions](decisions.md) | Architecture choices and change process; latest owner visual correction is in the active design guide |
| [Open questions](open-questions.md) | Business inputs and release blockers |
| [Versions](versions.md) | Source/tool pins and actual application versions |
| [Handoff](handoff.md) | Current public-only prompt preserving selected appearance |
| [Research](research.md) | Dated official source register |

`node scripts/check-handoff.mjs` checks documentation/tooling integrity; it does not establish visual approval or application correctness. Only later authorized reuse requires `node scripts/verify-upstream.mjs --require-checkout`. Preserve historical evidence without describing rejected visual exports as finished approved work.

Update the owning specification and existing task when requirements change. Do not create competing PRDs or let vendor/archived documentation override the current owner decision.
