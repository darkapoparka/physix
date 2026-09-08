# Physix execution plan

Planning baseline: 8 September 2026. This is the canonical Physix plan. It supersedes inherited Gymaf product direction and the rejected Physix landing-page branch. Plans are not evidence that features exist.

## Start here every session

1. [Root agent instructions](../../AGENTS.md): authority and working rules.
2. [Session handoff](SESSION.md): exact checkout, current state and next task.
3. [Task ledger](../../tasks.md): the only authoritative implementation status list.
4. [Decisions](DECISIONS.md): confirmed choices, engineering defaults and unanswered clinic policies.
5. Read only the contracts relevant to the selected task, then inspect the actual source.

## Plan map

| Document | Purpose |
|---|---|
| [Product](PRODUCT.md) | Audience, release scope, journeys and success criteria |
| [Architecture](ARCHITECTURE.md) | Next.js modules, routes, data boundaries and incremental migration |
| [Experience](EXPERIENCE.md) | Website/account separation, original template authority and route inventory |
| [Public design review](PUBLIC_DESIGN_REVIEW.md) | Supplied mint/teal website references, strengths, gaps and account styling boundary |
| [Bookings](BOOKINGS.md) | Services, availability, concurrency, cancellations and staff operations |
| [Care and community](CARE_AND_COMMUNITY.md) | Private plans, messages, progress and optional community |
| [Data and security](DATA_AND_SECURITY.md) | Ownership, role matrix, authorization and lifecycle |
| [Localization and content](LOCALIZATION_AND_CONTENT.md) | BG/EN coverage and required clinic assets/content |
| [Verification](VERIFICATION.md) | Test matrix, evidence format and completion rules |
| [Operations and release](OPERATIONS.md) | Local runtime, isolated environments, deployment and recovery |
| [Session log](SESSION_LOG.md) | Append-only compact record of work and handoffs |
| [Evidence directory](evidence/README.md) | Per-task verified outcomes and artifact index |

## What “finished” means

The v1 release scope is PX-001 through PX-041 in the task ledger. It is finished only when every task is DONE or explicitly owner-approved WAIVED, all blocking decisions are resolved, the release checklist is satisfied, and the actual clinic has accepted the staged product. A waiver must narrow the release scope visibly; it cannot conceal a failed privacy, authorization, data-integrity or required booking invariant. Native apps are a later, separately scoped release.

The plan aims to make execution reliable, not promise defect-free software. Any newly discovered requirement, defect or external dependency must enter the ledger before it is forgotten. Never declare the product complete from a count of pages, a screenshot, mocked tests or historical source-project CI.

## Copy-ready continuation prompt

> Continue Physix in M:/physix-pro. Read AGENTS.md, docs/physix/SESSION.md, tasks.md and docs/physix/DECISIONS.md. Verify the actual checkout and runtime before changes. Take the first dependency-ready task within the current authorization, preserve the original template's client UI, and complete a coherent slice with tests and rendered evidence. Update the ledger and session handoff before stopping. Do not restore the rejected landing-page branch, connect the source project's data, invent clinic policies, or claim a task is done without its acceptance evidence.
