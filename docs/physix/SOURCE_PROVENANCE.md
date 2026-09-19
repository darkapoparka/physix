# Source provenance

## Verified recovery, 19 September 2026

Canonical checkout: `M:\physix-app`; branch `main`; independent `.git` directory and no shared-object alternates. It already existed when this recovery began. No duplicate project, fresh scaffold or donor worktree was created.

Source: `M:\gym-fidelity`, branch `review/mobbin-fidelity`, HEAD `60582a5f3037375782e450fcd09f5d8aaf7ce94e`. Imported corrections checkpoint: `5e7c6a1ab121d3e214d8904e3ef63691a102a831`. The binary diff between those two commits exactly equals the current donor working-tree diff. SHA-256: `7e56d53bd1ba09c1be9053677df83c29668e875341a32a7b3da840ea24917b2f`.

Transferred paths: root catch-all page; connected-fidelity.css; login page; backend/login.tsx; features/gymaf/api.ts; features/gymaf/auth-ui.tsx; lib/backend/context.tsx; server/gymaf/auth.ts. Exact per-file hashes and original migration method are in `evidence/foundation-20260919/migration.json`; independently checked facts are in `evidence/recovery-20260919/source-check.json`.

The foundation record reports an independent clone, binary HEAD-patch import and exact safe tracked-byte transfer, excluding donor node_modules, .next, untracked files, .env.local, artifacts, browser profiles, provider links, logs and caches. Recovery verified no secret environment file at the canonical root and did not repeat that migration. Installation/build records from the foundation are historical evidence, not tests newly run by recovery.

Remote: `upstream-gymaf` fetches the original Gymaf repository; push URL is deliberately disabled. There is no writable origin, new GitHub repository, push or deployment. The original donor remains unchanged.

The inherited lockfile remains; its package name was changed for PhysiX, not its resolved dependency graph. Runtime observed: Node v24.21.0, npm 11.19.0. Active root fonts are the existing local Manrope/Lora replacement files with accompanying OFL notices; metadata is in foundation/fonts.json. Candidate images are inventoried in foundation/assets.json and remain provisional, not approved clinic media. Legacy reference assets remain release-cleanup work.

Original recovery-entry files were backed up in ignored `.artifacts/recovery-start-20260919/` before edits. Historical evidence folders were preserved; current captures and checks are under `evidence/recovery-20260919/`.

Development: `npm run dev` → node scripts/physix-dev.mjs → Next on 127.0.0.1:3217, explicit PHYSIX_DEMO=1. Existing listener PID 38400 was retained. No Gymaf hosted database, real patient records, live payments or destructive tests were used.

Tested implementation checkpoint: `05e84daff0839440e1d36fef466efc466354b828`. It contains the recovered Fidelity-derived adaptation, preserved local corrections, new isolated booking journey, tests and source/evidence documents. The working tree was clean immediately after this source checkpoint. Final verification: lint/typecheck/build exit 0; 68 unit tests, five isolated HTTP tests, 27 production-boundary requests and 74 browser checks passed. A documentation-only follow-up records this exact source SHA. No push or deployment.


## Saved local extension — 19 September 2026

Work continued from e05fc20e5c17ee18e4f95f5bf079147b9c8496e5 in the same independent checkout. No donor edits. The current donor diff SHA-256 still exactly matches 7e56d53bd1ba09c1be9053677df83c29668e875341a32a7b3da840ea24917b2f.

A pinned development-only @electric-sql/pglite 0.5.8 dependency and corresponding npm lockfile change provide local PostgreSQL persistence. This is not a framework migration or cloud provision. Retained care migrations 001–004 are unchanged; new native booking SQL and an allowlisted local adapter are isolated under db/physix and scripts/physix-local. Secret RPC values are generated per launch, not written to source or browser bundles. The private .artifacts database and test stores are ignored and excluded from commits.

3217 was restarted only after verifying its ownership in this checkout; it now runs the local data service plus Next (listener PID 37476 at final inspection). 3216 remained PID 23036. No live provider calls, real personal data, charges, push or deployment. Current verification lives in evidence/persistence-20260919.

Local saved-care source checkpoint: `0de64dc26252ce57387c012e15ac7d86e91d2f01`. A documentation-only follow-up records this exact tested source.

## Mint refresh source and artwork

Started from canonical main HEAD 2f036ece3fe686fe5d1794223f88ff90070077fe with a clean working tree. No new checkout, dependency installation, donor modification, migration or local database reset was required. The Treido Next mobile-bottom-nav client/CSS files were inspected read-only as a reference for independent floating actions. No Treido commerce component, route or provider configuration was imported.

Installed six previously generated originals and six optimized transparent derivatives with exact hash verification; see assets/illustrations-v1/manifest.json. The source originals are retained outside public paths; only 800px WebP derivatives are used by Next Image. A temporary encrypted private transfer file was deleted after successful transfer; no permission changes or public sharing occurred. Existing font files were neither transferred nor redistributed.

The frontend changed in place: scoped Home and dock components, consolidated semantic mint tokens, immediate service-to-time progression, selection-bound slot data and confirmation snapshot. The inherited database/actuals/authentication boundaries were not rewritten. Remote and deployment permissions remain unchanged.

## Mint finalization — 20 September 2026

Entry HEAD was 2f036ece3fe686fe5d1794223f88ff90070077fe with the mint refresh already uncommitted. It was preserved, inspected and finalized rather than cloned or recreated. Entry patch/source backup is in ignored .artifacts/mint-final-20260920. Six original/generated asset pairs were verified by npm run test:assets; their manifest records exact hashes and generation IDs. Treido's current mobile-bottom-nav.module.css/client source was read only for the independent floating-control pattern; no donor was edited.

Fresh source, browser, database, build and production evidence is in evidence/mint-final-20260920. No secret environment, live database, cloud project, payment service or font file was imported by this pass. The only relocated stores were disposable physix-check-* test directories; the saved app database remained in place. The new fixture runner uses system temp and removes its own disposable store on completion.

Verified mint implementation checkpoint: `82beae558bfbd7cc3eb14a90eac2b23e1195c443`. The following documentation-only commit records this source SHA. No push or deployment.
