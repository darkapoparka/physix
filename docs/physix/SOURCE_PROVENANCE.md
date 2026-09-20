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

## Fidelity-panel correction — 20 September 2026

Entry checkpoint 3d576065af4d3fa4f015866c85844891bf154586 was clean. The correction restores the donor media-card and weekly-panel composition in the existing PhysiX checkout; no source migration was repeated. Shared CareCard/CareWeek modules and their CSS are recorded in evidence/fidelity-panels-20260920/source-check.json. The donor eight-file diff remains unchanged; backend/auth/SQL/storage source and the persisted database were not reset or replaced. Final verification and limits are recorded with the source-hash manifest in that evidence folder.

## Unified care increment — 20 September 2026

Continued the existing canonical M:/physix-app checkout on main from 293abc7f8ddc41e901ee4ae004f01b2e2cb32ec7; entry working tree was clean. No new scaffold, source migration or donor copy was made. Read-only source references were the Fidelity workout library, schedule and progress components.

The local adapter now reads published programme identity/version for actual owned assignment groups inside the existing authenticated transaction and RLS. Existing SQL migrations, authentication rules, booking mutations and session commands were not changed. The saved local data writer was closed before a backup to system temp and restarted without resetting its data. No backup, database, credential, browser profile or font files belong in this commit.

Donor binary diff SHA-256 remained 7e56d53bd1ba09c1be9053677df83c29668e875341a32a7b3da840ea24917b2f. The original M:/gym-fidelity checkout and its port 3216 runtime were preserved. No hosted provider connection, writable remote, push or deployment was created.

Verification and compact actual-browser captures: evidence/unified-care-20260920. The commit containing this entry records the coherent source and verification checkpoint; inspect Git HEAD rather than inferring a later SHA from this document.

## Navigation continuity — 20 September 2026

Continued the clean d5597f6 checkout on main without cloning. Canonical patient renderer moved to /care; /app retains redirect-only compatibility. Existing patient-data commands, database schema and saved store were not rewritten. Exact donor diff digest still matches 7e56d53bd1ba09c1be9053677df83c29668e875341a32a7b3da840ea24917b2f. Runtime restart retained programme/session/appointment IDs. See navigation-continuity-20260920/source-check.json and final test evidence. No push, provider operations or deployment.

20 September navigation recovery started at d5597f6 with unfinished continuity changes present, backed them up without resetting, finished first-render and direct-entry corrections, and reran the checks. Existing runtime and saved database retained. Current evidence: navigation-finish-20260920; entry.json records initial tracked/untracked paths. No new source migration or donor modification.

Home coherence, 20 September 2026: entry c99a5c4ecc749dcc5f9eb26a16232ff758ff136b. Application changes are restricted to Home TSX/CSS and its public browse prop; source-check.json in evidence/home-coherence-20260920 verifies booking, care, shared cards, dock and original donor unchanged. Existing six illustration assets are reused without byte changes. No new dependencies, database operations outside synthetic browser checks, push or deployment.


## Centre Home iteration — 20 September 2026

Entry `45901db4942f6f8e2363171e97c203afa6c63663`, clean main. Three Home presentation source files; new scoped HomeVisits reuses the existing Sheet and illustrations. No donor writes, backend/provider changes, database reset, dependency migration, push or deployment. Source hashes, final tests and captures: evidence/centre-home-20260920.

## Editorial implementation provenance — 20 September 2026

Entry source: main at 3c82691892b628b636d75affc33c428f1aaed436, clean. Applied visual changes in M:/physix-app only. Preserved donor M:/gym-fidelity at 60582a5f3037375782e450fcd09f5d8aaf7ce94e and its eight tracked corrections; baseline diff SHA-256 7e56d53bd1ba09c1be9053677df83c29668e875341a32a7b3da840ea24917b2f. No source migration repeated.

New media derivatives come only from existing public/physix/manual.jpg, movement.jpg and sports.jpg. Their generated donor provenance was already recorded in evidence/foundation-20260919/assets.json; all source hashes are retained in assets/editorial-v1/manifest.json. No reference UI or Nike/Future photography was copied into runtime assets. No original files, fonts, environment files, SQL migrations or database records were reset.

Local verification and precise source scope are in evidence/editorial-implementation-20260920. No push, deployment, new remote, provider provisioning or real patient data. The local implementation commit follows this evidence checkpoint.

## Mobile appointment polish — 20 September 2026

Continued the existing independent checkout from 95fd25d7953eba102c059232b9fb9e93679bcc36. No donor files, asset sets, schema, provider configuration or saved database were replaced. New task headers, appointment presentation and Home summaries use the existing local ownership/command adapter. Final source hashes and checks are in evidence/mobile-appointments-20260920/source-manifest.json.
