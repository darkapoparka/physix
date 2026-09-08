# PhysiX

A mobile-first physiotherapy website for Charlie's PhysiX clinic in Bulgaria.

**Current scope: public website only. Current design: the original selected mint/white mobile-app-style homepage, not public-v2.** The owner rejected the later visual redesign and its rewritten button text on 2026-09-08.

**Frontend handoff: [frontend/](frontend/README.md) is the single current frontend design-delivery folder.** The screen plan is committed there. The original PDF, generated Home + Services board, reference image and wireframe exports are packaged in the accompanying folder archive, but their GitHub binary upload is still pending. See the folder index and checksum manifest for exact delivery status. No application implementation or complete screen set is claimed.

## Start here

- [Frontend handoff and current screen plan](frontend/README.md).
- [Selected visual reference and exact labels](docs/design/README.md).
- [Agent contract](AGENTS.md), [current status](docs/status.md) and [single backlog](docs/tasks.md).
- [Corrected local handoff](docs/handoff.md).
- [Documentation index](docs/README.md), [architecture](docs/architecture.md) and [bootstrap](docs/bootstrap.md).

The selected Home appearance should be extended to the other public pages. Preserve the PhysiX logo treatment, mint/white/navy styling, custom assets, compact Charlie card and four-item dock. The visible actions remain **Book visit** and **Online consult**; the dock remains **Home / Book / Online / Account**. The latest review in `frontend/` proposes a compact deep-teal Charlie card while retaining that structure. This is a local review variation, not approval for an unrelated homepage redesign.

The matching public screen set is not finished. The earlier count of 41 prototype states is not evidence of an approved design. [public-v2](docs/design/public-v2/README.md) is retained as a **rejected visual archive**, not the implementation reference. Do not copy its appearance or copywriting. Continue new screen deliverables in `frontend/`, not in another frontend or prototype folder.

## Local work

Preserve existing changes when syncing. Read the current contract before scaffolding or implementing. The production stack remains Next.js / React / TypeScript; do not re-scaffold an existing app or reopen the framework decision for this visual correction.

Public work does not require initializing, running or adapting Gymaf. Account stops at public sign-in/verification in this scope. No logged-in dashboard, exercise player, staff UI, provider setup or deployment is included.

The implementation belongs at the repository root. The `frontend/` folder added here contains design-review materials, not a second application. Do not make a screenshot the interface or copy the archived prototype's hash router and simulated verification into production. Use real responsive components and the existing booking/security contracts.

## Retained future work and trust

Patient, staff, backend and optional source-reuse documents remain for separately authorized phases. `vendor/gymaf` remains read-only-by-policy reference, not a public-site runtime dependency. Do not delete or rewrite unrelated work.

This repository is public. No secrets, real patient data or private meeting links belong here. Approval of a visual direction does not verify the generated portrait, testimonials, qualifications, prices or clinic facts. Production content and media need their separate approval.

The existing prototype test report is historical tooling evidence only. No production application, live booking, payment or deployment is claimed by the design handoff.
