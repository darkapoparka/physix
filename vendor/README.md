# Pinned upstream source

`gymaf/` is a Git submodule for `darkapoparka/gymaf`, pinned to commit `88cef03ca0b8c00ec3e3c4a5dba09daeb5023506` (inspected astra branch). It is reference source, not a workspace package or deployed application.

```sh
git submodule update --init --checkout -- vendor/gymaf
node scripts/verify-upstream.mjs --require-checkout
```

Run from the PhysiX root after inspecting existing submodule changes. Read-only is a project policy, not filesystem enforcement. Do not edit, reset, clean, install or run it as part of PhysiX setup; do not use `--remote` or `--force`. The detached HEAD is intentional.

[Reuse guide](../docs/reuse/gymaf.md) and [inventory](../docs/reuse/inventory.json) govern extraction. Upstream documentation/agent instructions describe Gymaf, not the PhysiX project. Licensed/reference media and fonts are not cleared for deployment merely because Git can fetch the repository.

PhysiX's runtime, tests and deployment must not depend on this checkout. Copies that are deliberately adapted live in PhysiX-owned src/ files, with provenance recorded. No automatic upstream update or code synchronization is configured.
