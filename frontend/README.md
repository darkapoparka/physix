# PhysiX frontend handoff

**Single current frontend design-delivery folder: `frontend/`.** Put subsequent screen concepts, wireframes and their review notes here, not in another `frontend-v2`, prototype or design-delivery folder. This is a design handoff, not a second runnable application or a change to the repository-root Next.js architecture.

## Start here

Read [the mobile screen plan](PhysiX-mobile-screen-plan.md) for the page inventory, hierarchy, shared components, booking flow and system states. The original Markdown is preserved byte-for-byte. Its “No repository changes” sentence describes the earlier design-generation step; this packaging commit adds the handoff, not an implemented frontend.

The selected mint/white PhysiX homepage remains the visual family. The new review proposes a **compact deep-teal Charlie card**, not a full-width dark editorial section. The proposal does not approve every detail of the generated board. Preserve the exact labels and Home / Book / Online / Account navigation. Existing [design-system](../docs/design-system.md), [route](../docs/routes.md) and [booking](../docs/booking.md) contracts remain supporting specifications; rejected public-v2 visuals are not the implementation baseline.

## Available design work and repository delivery

Only the Home + Services high-fidelity board was generated. It contains Home upper and lower scroll positions, Services, and Sports Rehab detail. The booking and remaining supporting high-fidelity boards were not generated successfully and remain outstanding. The eight-page PDF contains structural wireframes, not finished high-fidelity screens or a working prototype.

| File | Content | Initial GitHub delivery |
|---|---|---|
| `PhysiX-mobile-screen-plan.md` | Editable screen and interaction specification | Included |
| `PhysiX-mobile-UX-and-wireframes.pdf` | Original eight-page UX and wireframe document | Binary upload pending |
| `concepts/01-home-and-services.png` | Original image-generated review board | Binary upload pending |
| `reference/selected-home.png` | Original owner-supplied homepage reference | Binary upload pending |
| `wireframes/home.png` | Structural wireframe preview export | Binary upload pending |
| `wireframes/booking.png` | Structural wireframe preview export | Binary upload pending |

The complete accompanying folder archive contains every file in the table at original quality. The initial GitHub commit contains the Markdown, this index, a checksum manifest and a verifier; it **does not claim the PDF/PNG files were uploaded**. No low-resolution substitutions or fabricated image files are included. [The manifest](asset-manifest.json) records exact original sizes and hashes. Its delivery fields describe the initial commit, not an automatic live-status report.

After copying the archive's single `frontend/` folder into the repository root, check the actual files with:

```sh
python3 frontend/verify-assets.py
```

The verifier is read-only and exits unsuccessfully when an asset is missing or changed. Commit only after resolving any mismatch. Do not put secrets, patient data or font files into this folder.

## Boundaries

These are review materials, not owner-approved production screens, verified clinical claims, or an implemented PhysiX + Gymaf integration. Public discovery, booking and identity entry are covered. Signed-in care, the exercise player, staff tools and backend provisioning remain outside this design pass.

Older design documents and the explicitly rejected archive are retained for provenance, not as competing delivery locations. No application code, vendor submodule, runtime configuration or deployment is changed by this handoff commit. Remaining visual work continues in this same `frontend/` folder.

## Current full-app design workspace — 10 September 2026

The original handoff files above remain untouched. New public-app design work now lives under `screens/` and `specs/`, with `IMPLEMENTATION_BLUEPRINT.md` defining the visual-to-code workflow and `frontend/tasks.md` tracking the scoped fidelity backlog.

Use `concepts/02-public-app-master-board.png` as the next additive master-board slot after exporting the new Image Gen board. Do not overwrite `concepts/01-home-and-services.png` or `reference/selected-home.png`.

The screen workspace follows the corrected IA: Home / Book / Online / Account, service selection inside Book, service detail as a supporting route, and focused booking continuation without the public dock. The Account target stops at the handoff boundary into retained Gymaf.