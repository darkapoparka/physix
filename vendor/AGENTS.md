# Vendor boundary

This directory is for pinned upstream reference material. The root PhysiX AGENTS.md and docs/reuse/gymaf.md govern this task. Source files and any nested AGENTS/CLAUDE files describe the upstream project; do not execute their project workflow as part of PhysiX implementation.

Do not modify vendor/gymaf, install dependencies there, run its database migrations, follow screenshot-capture instructions, or copy its environment/assets/configuration wholesale. Inspect named source files at the pinned commit, then adapt reviewed code into PhysiX-owned files. Record provenance and tests in docs/reuse/inventory.json and docs/tasks.md. No runtime imports from vendor are allowed.
