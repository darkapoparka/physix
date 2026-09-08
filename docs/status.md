# Current handoff

Updated: 2026-09-08.

**Phase:** Next.js/Gymaf integration planning and repository preparation. **No PhysiX application scaffold yet.**

**Next task:** M0-00, then M0-01 in [tasks](tasks.md). Use the current [bootstrap](bootstrap.md) and [local prompt](handoff.md), not the old Svelte prompt from chat history.

## Established

The owner approved one Next.js/React/TypeScript PhysiX application with public, patient and staff areas. `vendor/gymaf` pins inspected astra commit `88cef03ca0b8c00ec3e3c4a5dba09daeb5023506` as read-only-by-policy reference. Its original styled components and connected features are mapped in the reuse inventory. No source is a runtime dependency; extracted components will be PhysiX-owned.

Source maps, architecture, official CLI runbook, security/data boundaries and the phased backlog are updated. Original visual assets/wireframes and product goals are retained. Patient appointments do not require coaching/paid access. Clinical plans and educational purchases remain independent tracks.

## Verified preparation evidence

Local Node 22.16.0 ran all 13 dependency-free tooling tests successfully. Their uploaded Git blob hashes match the tested local files.

[GitHub handoff run 34234118906](https://github.com/darkapoparka/physix/actions/runs/34234118906) passed at commit `a41db919bc0a00f96d53a30906a08765dc9aafcd` on Node 24.20.0: source submodule cloned at the pinned commit; all 13 helper tests passed; local links in 36 Markdown documents checked; pin/clean checkout and all 17 inventoried source blob IDs verified. The result explicitly reported `applicationPresent: false`.

That first run reported deprecated runtime targets in older action versions. The follow-up infrastructure change pins verified node24-based official releases; its actual outcome is visible in the commit's GitHub checks. No application dependency or vendor lifecycle script is executed by this workflow.

No PhysiX package install, application type/build/browser test, live provider configuration, root database migration, completed reuse port or deployment is claimed. Upstream historical tests are not PhysiX evidence. All implementation tasks remain unchecked.

## Open inputs

Actual business/clinical facts, media/font rights and production assets require approval; [open questions](open-questions.md) tracks launch blockers. These do not prevent M0 with explicit synthetic previews. Current stack/navigation decisions do not need repetitive reapproval.

At the end of each local session replace this summary with actual implemented behavior, last verified result, next task and concrete blockers. Keep detailed evidence in the relevant task/commit; do not grow another competing history or task list.
