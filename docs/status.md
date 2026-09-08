# Current handoff

Updated: 2026-09-08.

**Phase:** Next.js/Gymaf integration planning and repository preparation. **No PhysiX application scaffold yet.**

**Next task:** M0-00, then M0-01 in [tasks](tasks.md). Use the current [bootstrap](bootstrap.md) and [local prompt](handoff.md), not the old Svelte prompt from chat history.

## Established

The owner approved one Next.js/React/TypeScript PhysiX application with public, patient and staff areas. `vendor/gymaf` pins inspected astra commit `88cef03ca0b8c00ec3e3c4a5dba09daeb5023506` as read-only-by-policy reference. Its original styled components and connected features are mapped in the reuse inventory. No source is a runtime dependency; extracted components will be PhysiX-owned.

The source maps, architecture, official CLI runbook, security/data boundaries and phased backlog are updated. Original visual assets/wireframes and product goals are retained. Patient appointments do not require coaching/paid access. Clinical plans and educational purchases remain independent tracks.

## Verification at this preparation stage

Source/branch/commit inspection was performed through GitHub. Dependency-free handoff-tool tests were run locally with Node 22.16.0: 13 passed. This verifies those helper behaviors only. The handoff workflow additionally validates document links, pin metadata and the initialized source inventory on Node 24; its actual run result is recorded in GitHub checks, not assumed here.

No PhysiX package install, application type/build/browser test, live provider configuration, root database migration, completed reuse port or deployment is claimed. Upstream historical tests are not PhysiX evidence. All implementation tasks remain unchecked.

## Open inputs

Actual business/clinical facts, media/font rights and production assets require approval; [open questions](open-questions.md) tracks launch blockers. These do not prevent M0 with explicit synthetic previews. Current stack/navigation decisions do not need repetitive reapproval.

At the end of each local session replace this summary with actual implemented behavior, last verified result, next task and concrete blockers. Keep detailed evidence in the relevant task/commit; do not grow another competing history or task list.
