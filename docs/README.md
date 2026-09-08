# Documentation map

Current baseline: **Next.js / React, with selective Gymaf reuse**, updated 2026-09-08. Old Svelte scaffolding is superseded. Each document owns a topic; [tasks](tasks.md) is the only implementation backlog and [status](status.md) is the short handoff.

## Product and experience

| Document | Owns |
|---|---|
| [PRD](prd.md) | Purpose, users, outcomes, non-goals and launch definition |
| [Features](features.md) | Capability catalogue and release allocation |
| [Routes](routes.md) | Public, booking, patient, staff, preview and system route map |
| [User flows](user-flows.md) | Journeys and recovery behavior |
| [Design system](design-system.md) | Tokens, real mobile proportions, navigation and accessibility |
| [Components](components.md) | React view responsibilities, DTOs and interaction states |
| [Content](content.md) | BG/EN content, SEO, proof and approval |
| [Design package](design/README.md) | Existing mockup, editable wireframes and asset provenance |

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

## Gymaf source reuse

| Document | Owns |
|---|---|
| [Reuse guide](reuse/gymaf.md) | Pinned submodule, extraction rules, provenance and boundaries |
| [Frontend adaptation](reuse/frontend.md) | Original visual components -> PhysiX patient app |
| [Backend adaptation](reuse/backend.md) | Connected concepts -> clinical-care schema and persistence proof |
| [Source inventory](reuse/inventory.json) | Exact paths/blob IDs, intended destinations and actual adaptation status |
| [Vendor README](../vendor/README.md) | Retrieval and read-only-by-policy usage |

## Execution

| Document | Owns |
|---|---|
| [Bootstrap](bootstrap.md) | Safe local official CLI and source setup |
| [Tasks](tasks.md) | Single ordered implementation backlog |
| [Status](status.md) | Next action and actual current evidence |
| [Decisions](decisions.md) | Accepted/superseded choices and change process |
| [Open questions](open-questions.md) | Owner inputs and release blockers |
| [Versions](versions.md) | Source/tool pins and actual app versions after local resolution |
| [Handoff](handoff.md) | Copy-paste first-session, backend and care-slice prompts |
| [Research](research.md) | Dated official source register |

Run `node scripts/check-handoff.mjs` for local doc links/framework-drift/common source-boundary checks and `node scripts/verify-upstream.mjs --require-checkout` for the initialized source pin/inventory. These are preparation checks, not proof that the app or clinical service works. See testing for the full gates.

Change the owning specification when a requirement changes, then affected tasks. Do not create duplicate PRDs/agent rules or let vendor documentation become a second roadmap. Screenshots are not licensed assets, verified claims or completed accessibility audits.
