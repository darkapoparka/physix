# Inspected sources and safe migration

Inspection date: 19 September 2026, via Remote Desktop Commander on DESKTOP-LMGQO7V. No Git fetch was run, so remote freshness/divergence is not established. Status counts are `git status --short` entries, not necessarily counts of every untracked file.

## Actual local checkout evidence

| Path | Branch / observed HEAD | Origin observed | Status | Role |
|---|---|---|---|---|
| `M:\gym-fidelity` | `review/mobbin-fidelity` / `60582a5` | `darkapoparka/gymaf` | 8 modified tracked paths | Selected application foundation; preserve original |
| `M:\motion-makers-app` | `main` / `0fbf784` | `darkapoparka/motion-makers-app` | 34 status entries | PhysiX content/asset/booking donor |
| `M:\gym-astra` | `astra-local-test` / `55a8327` | `darkapoparka/gymaf` | Clean at inspection | Supplementary backend reference; no parallel product |
| `M:\physix-pro` | `main` / `f0e40fa` | `darkapoparka/physix` | 147 status entries | Historical archive/reference; do not resume development |
| `M:\physix-app` | Not present at inspection; not created by this session | None | Proposed independent destination | Downloadable specification prepared; remote save blocked by tool quota |

Listeners were observed on 3210, 3211, 3214 and 3216. They were not restarted or stopped. Ports are not project identities; verify executable/cwd before using one. No current runtime visual or end-to-end acceptance is established by a listening port.

## Evidence reviewed

Fidelity: root `AGENTS.md`, `package.json`, directory inventory, the current/earlier sections of `astra/IMPLEMENTATION_STATUS.md`, `astra/ADR-016-ORIGINAL-TEMPLATE-INTEGRATION.md`, tracked route/component/server/migration paths, the eight-file diff summary, relevant catch-all/backend-context/server-auth diffs, and saved synthetic screenshot `.artifacts/gymaf-bypass-final.png`.

Motion Makers: root `AGENTS.md`, recent `docs/physix/SESSION.md` entries, and a tracked documentation/asset inventory. This establishes useful donor paths, not the clinical correctness or rights status of their contents. The service catalogue and every individual component were not fully audited in this planning session.

The supplied pasted conversation is prior advice and the source of the proposed combined direction, not proof of current code correctness. Historical test counts and hosted-schema claims in donor documents were not independently rerun. Production provider acceptance, full visual parity and rights remain unverified.

## Important current finding

Fidelity's uncommitted root catch-all now selects a default reference capture when development reference mode is enabled. Its BackendProvider still has an account-loading gate. Recent changes also add a feature-flagged password sign-in path and client error handling. These changes are not a PhysiX patient account or a production authentication bypass authorization.

The eight modified paths are:

`src/app/[[...route]]/page.tsx`, `src/app/connected-fidelity.css`, `src/app/login/page.tsx`, `src/components/backend/login.tsx`, `src/features/gymaf/api.ts`, `src/features/gymaf/auth-ui.tsx`, `src/lib/backend/context.tsx`, `src/server/gymaf/auth.ts`.

Preserve and review this work. Do not silently lose it by cloning only HEAD, and do not automatically inherit its default fixture behaviour into normal PhysiX routing. Source `.git` is a **file**, consistent with a linked worktree; copying it into another directory is not a safe independent fork.

## Candidate reuse map

| Source area | Reuse decision | Required verification |
|---|---|---|
| `src/components/future-app.tsx`, `home.tsx`, `primitives.tsx`, existing CSS | Selected design/shell candidate | Current fonts/layout, responsive states, remove fake chrome and foreign identity |
| `src/components/workout-session.tsx` and backend session/training modules | Adapt to exercise delivery | Saved actuals, resumability, version integrity, authorization and clinical instructions |
| `src/lib/backend/context.tsx`, member adapter, auth/server modules | Reuse bounded session/data patterns | No public auth wall, no endless loading, no fixture data in real accounts |
| `src/features/gymaf`, `src/shared/gymaf`, SQL commands | Internal compatibility candidates | Inspect actual command semantics; negative authorization and revision tests |
| Eighteen listed migration files and test suites | Engineering reference, not install-all approval | Dependency graph, disposable database execution and removal/quarantine of irrelevant product rules |
| Existing Stripe billing module | Payment plumbing candidate | New one-time offers, real sandbox fulfilment, idempotency and no inherited commercial defaults |
| Motion Makers catalogue, Book behaviour, first-visit/online requirements | Selective requirement/content donor | Clinic confirmation, transport-neutral flow extraction and no copy of rejected shell/CSS |
| Motion Makers generated boards and assets | Reference/asset candidates | Provenance, permission, separate usable assets; no flattened UI implementation |

## Bootstrap procedure for the next implementation request

1. Recheck donor HEAD, branch, status and environment. Record a non-secret manifest and a binary-safe patch of tracked changes; separately inventory relevant untracked source. Preserve staged and unstaged changes deliberately. Do not stash/reset/commit someone else's work automatically.
2. Create a **new independent clone in a temporary sibling staging directory**, using the local Fidelity repository and the inspected branch. If this package has been extracted to `M:\physix-app`, do not attempt `git clone` into that nonempty planning directory. If the destination is absent, still stage and verify the derivative before promotion. Never copy the donor `.git` worktree pointer.
3. Create a local PhysiX review/bootstrap branch. Remove inherited push authority to `gymaf` in the new derivative; do not push there. The new PhysiX GitHub repository/name/remote is not approved or created by this specification.
4. Apply the reviewed working-tree patch in staging, verify it applies to the recorded source revision, and account for any selected untracked files. Never copy `.env*` secrets, `.next`, `node_modules`, provider links/caches, personal sessions, uploads or blanket `.artifacts` directories.
5. Preserve historical technical docs under an explicitly non-authoritative reference location. Replace root AGENTS/README/legacy entry-point authority in the derivative with the PhysiX documents. Do not let inherited PRODUCT/DESIGN/CLAUDE instructions silently restore the coaching product. Retain necessary source code and history.
6. Copy this planning specification into staging without overwriting any newer owner edits; compare content hashes and reconcile differences. Verify the staged result before promoting it to the canonical destination. If a planning directory already exists, preserve it as a temporary backup during the swap—never delete it blindly. If it is absent, create the final destination only by promoting the verified staged result.
7. Verify `M:\physix-app` is now an independent Git checkout on the intended branch with the expected source patch, docs and no secrets. Record exact provenance and diff. Keep all original donor folders unchanged.
8. Install using the inherited lockfile only after reviewing scripts. Establish a separate local/synthetic backend and explicit demo; do not copy Gymaf's hosted credentials or run its seed against hosted data. Run the baseline checks and capture the selected interface before adaptation.

No source migration, dependency installation, environment provisioning, repository creation, commit or deployment is part of this planning checkpoint. The bootstrap is complete only when verified source exists at the canonical destination, not when this procedure has been written.
