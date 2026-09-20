# PhysiX agent instructions

## Authority and current stage

Canonical checkout: `M:\physix-app`, independent Git repository on `main`. Selected source: `M:\gym-fidelity`, branch `review/mobbin-fidelity`, source HEAD `60582a5f3037375782e450fcd09f5d8aaf7ce94e`. The source and its eight local corrections are already imported (checkpoint `5e7c6a1`). This is now an implemented disk-backed LOCAL-TEST application plus a separate visual demo, NOT a planning-only folder or a live clinic system. Do not clone again. Read `docs/physix/SESSION.md`, `SOURCE_PROVENANCE.md`, `TASKS.md` and `NEXT_SESSION.md` for the live state.

Read `README.md`, `docs/physix/DECISIONS.md`, `SOURCE_AND_MIGRATION.md`, `SESSION.md`, then the owning feature contract and `DELIVERY_AND_QA.md`. The remaining short file references in this paragraph are under `docs/physix/`.

Precedence: current explicit owner direction → this file → DECISIONS → owning feature contract → supporting/historical material. The selected Fidelity shell governs the design family, not copied third-party identity or every visual defect. Old Motion Makers instructions saying it is the only codebase are historical for this new product; do not edit or override that donor's checkout in place.

## Execution

1. Use Remote Desktop Commander for filesystem, terminal and browser work on the owner's PC. Inspect actual branch, HEAD, status, origin and listener ownership before changes. Paths and ports in documents are observations, not permanent process identifiers.
2. Bootstrap is complete. Continue this checkout; do not clone or create another alternative project. Local verified commits are authorized by the owner continuation. Provider provisioning, external payments, pushing and deployment still need explicit approval.
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

Update SESSION and the owning acceptance row after coherent work. Do not mark the roadmap done because a few screens render. Local verified commits are authorized; push, cloud provisioning and deployment require separate explicit authorization. Leave preserved donor checkouts and their runtimes intact.

## Local-test runtime

Use `/login` and `/care` for persisted synthetic care, `/book` for native test booking and `/practitioner` for the test workspace. `/dev/demo` is intentionally still memory-only. `npm run dev` owns one disk-backed PGlite service; preserve `.artifacts/physix-local/pgdata`. No real patient data belongs there. Review `scripts/physix-local`, `db/physix/local-booking.sql`, the first four retained care migrations and the current evidence before changing the adapter. Production refuses local accounts even when the local flags are present. Do not enable fixtures or synthetic MFA in production, treat local personas as verified identity, or replace the saved workflow with demo state.

## Current visual implementation — reference-led media, 20 September 2026

The owner authorized implementation of the original Gymaf/Future-led direction after rejecting the illustrated clinic-block compositions. Read docs/physix/references/fitness-apps-20260920 and the latest SESSION. The latest Home revision places the existing header over one continuous photographic masthead with its single headline, search and booking actions. No separate white-header/green-panel seam, duplicate photo hero or Services / By area controls.

Share tokens and interaction rules, not one forced card for everything. HomeVisits provides grouped clinic/online information; HomeCare renders a minimal authorized programme summary; MediaTile provides photo-led service/programme library cards with captions outside the frame; SessionFeature supplies the saved next-session cover; ProgrammeOverview and CareWeek are quieter data panels. The original CareCard remains for the old isolated visual demo, not as the required public/patient card. Current photos are generated photographic previews from existing donor assets, not actual clinic/staff or instructional video. Never label them Charlie. Real clinic media and publication approval remain required.

Keep the fixed consumer dock and server-authorized initial render. Preserve appointment modes, actual programme assignments/versions, saved attempts, sets, timers, check-ins and permissions. A visual improvement never authorizes a data reset, a clinical prescription, new payment or fake video. Missing instructional video has a compact explicit state; decorative cover photography does not play as an exercise demonstration.

Visual owner acceptance remains separate from automated results. Never turn the most recent assistant implementation into a prohibition against further owner feedback.

## Locked shared-product and programme model

One Shell and visual family serve public discovery and private care. Gymaf/Future is the primary component reference; Nike is secondary media/hierarchy inspiration only. Their screenshots and identities stay in docs, not rendered in the application. Work in M:/physix-app only; the source donor is read-only.

`/care/programmes` lists actual assignment groups. `/care/programmes/:assignmentId` contains that programme's version, sessions and attempts. `/care/workouts/:scheduledId` is the session overview; older `/app/plans/:scheduledId` links redirect there after ownership checks. `/care/sessions/:attemptId` remains the persistent player. Never label each individual workout as a programme again.

Programme metadata is read through the existing authenticated local adapter and RLS, with no schema rewrite. Do not infer a purchase from an assignment or a clinical recovery state from completion. Current local care still uses one selected relationship; multi-clinician account switching is not implemented by grouping assignments.

Run `npm run test:programmes` as well as saved-workflow, UI, unit/database and production-isolation checks. Preserve the saved database and donor repositories; tests use synthetic data only.

## Stable navigation correction — 20 September 2026

The current implementation has a fixed consumer dock: Home (/), Book (/book), My care (/care), Menu. Labels, destinations, order, geometry, logo destination and account link must not change after sign-in. The public programme catalogue stays under /plans and is reached from discovery and Menu; it must not replace the owned-plan destination.

/care is the canonical private route namespace, not a separate application. /app bookmarks redirect to /care; old /app/book redirects to the same public /book. Authentication and record authorization still occur on the server. Login accepts only an allowlisted internal care return path. Never accept an arbitrary return URL or put patient fields in it.

My care contains Today, My plans, Schedule and Progress in one stable secondary navigation. Reading a programme or session overview retains the primary dock. Only active exercise sessions and focused booking steps hide it. Keep the white canvas and existing solid Fidelity-derived cards; do not restart typography, artwork or palette work for a routing correction.

Avoid a second account-loading screen after server authorization: seed care views from the current authorized render, then revalidate. Never replace this with public caching or browser storage. Preserve exact login destinations and make direct programme actions open /care/programmes rather than detouring through Today.
