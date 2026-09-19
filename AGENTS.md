# PhysiX agent instructions

## Authority and current stage

Canonical checkout: `M:\physix-app`, independent Git repository on `main`. Selected source: `M:\gym-fidelity`, branch `review/mobbin-fidelity`, source HEAD `60582a5f3037375782e450fcd09f5d8aaf7ce94e`. The source and its eight local corrections are already imported (checkpoint `5e7c6a1`). This is now an implemented local visual/interaction prototype, NOT a planning-only folder. Do not clone again. Read `docs/physix/SESSION.md`, `SOURCE_PROVENANCE.md`, `TASKS.md` and `NEXT_SESSION.md` for the live state.

Read `README.md`, `docs/physix/DECISIONS.md`, `SOURCE_AND_MIGRATION.md`, `SESSION.md`, then the owning feature contract and `DELIVERY_AND_QA.md`. The remaining short file references in this paragraph are under `docs/physix/`.

Precedence: current explicit owner direction → this file → DECISIONS → owning feature contract → supporting/historical material. The selected Fidelity shell governs the design family, not copied third-party identity or every visual defect. Old Motion Makers instructions saying it is the only codebase are historical for this new product; do not edit or override that donor's checkout in place.

## Execution

1. Use Remote Desktop Commander for filesystem, terminal and browser work on the owner's PC. Inspect actual branch, HEAD, status, origin and listener ownership before changes. Paths and ports in documents are observations, not permanent process identifiers.
2. Planning does not authorize source migration, provider provisioning, payment operations or production deployment. On the next explicit implementation request, follow the bootstrap procedure; do not create another alternative project.
3. Preserve all unrelated dirty/untracked work. Do not reset, clean, stash, force-push, mass-rename database objects, copy donor secrets, or kill unrelated servers. Do not copy Fidelity's `.git` file: it is a linked worktree pointer.
4. Keep the observed Next.js/React/TypeScript stack and lockfile. No Svelte, TanStack, React Native, Tailwind or component-library migration as part of the adaptation. Re-evaluate only for a demonstrated requirement and a recorded decision.
5. Preserve the useful shell, programme versions, sessions, assignments, check-ins and retry patterns. New PhysiX APIs use PhysiX terminology; temporary Gymaf compatibility stays behind a documented adapter rather than a global search-and-replace.
6. Select one bounded end-to-end slice with acceptance criteria. Reuse what passes inspection and tests. Do not infer production readiness from screenshots, old documentation, test stubs or a build.

## Product and visual rules

Public Home, service discovery and booking must not require a patient account. Patient and practitioner data must require real server-authorized access. Online appointments and online exercise programmes are distinct offers.

Services belong within Book navigation; service-detail pages remain shareable. Keep an app-like mobile shell and usable desktop layouts. No generic white/green clinic-template redesign, fake phone frame, fake status bar, unlicensed brand imitation, duplicate menu/notification controls or unnecessary explanatory text on every card.

Capture one bounded Fidelity baseline first. Approve a small PhysiX-adapted set before expanding. Reference images are never rendered as flattened interfaces. Do not generate fresh full-site boards or new artwork without an actual asset gap and owner authorization.

## Truth, safety and data boundaries

A booking is confirmed only after authoritative persistence. A payment return URL is not payment proof. A purchase entitlement is not an individualized clinical prescription. A complimentary assignment is not a sale.

Use an isolated PhysiX environment with synthetic records. Never point new PhysiX migrations or seed scripts at the existing Gymaf backend. No real patient data during development. Keep confidential fields out of public pages, URLs, analytics, notifications and logs.

Demo mode is explicit, development-only, clearly labelled and incapable of sending real API/provider mutations. Never bypass production authentication, fabricate a saved record, import reference local storage into an account, or leave an infinite “Loading your account” screen without recovery.

No fabricated practitioner identity, credentials, reviews, fees, availability, clinical advice or exercise prescriptions. Clinician-authored and approved content is a release dependency, not something the implementation agent invents.

## Verification and handoff

Run checks supported by the inspected package: lint, typecheck, unit/HTTP tests and build, then isolated database tests and browser journeys as appropriate. Do not run destructive integration resets against an unverified target. Check current Next.js/Supabase/provider documentation before implementing provider-specific APIs.

Test empty/loading/error states, 320px reflow, Bulgarian and English text, keyboard/focus, other-patient denial, repeated submissions, expired sessions and provider delays. Save exact evidence for the changed slice. Label source implemented, local tested, provider tested, visual owner-approved and release-ready separately.

Update SESSION and the owning acceptance row after coherent work. Do not mark the roadmap done because a few screens render. Commit/push, cloud provisioning and deployment require explicit authorization. Leave preserved donor checkouts and their runtimes intact.
