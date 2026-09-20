# PhysiX agent instructions

## Authority and current stage

Canonical checkout: `M:\physix-app`, independent Git repository. Read the actual branch and the current SESSION checkpoint; do not assume `main`. Selected source: `M:\gym-fidelity`, branch `review/mobbin-fidelity`, source HEAD `60582a5f3037375782e450fcd09f5d8aaf7ce94e`. The source and its eight local corrections are already imported (checkpoint `5e7c6a1`). This is now an implemented disk-backed LOCAL-TEST application plus a separate visual demo, NOT a planning-only folder or a live clinic system. Do not clone again. Read `docs/physix/SESSION.md`, `SOURCE_PROVENANCE.md`, `TASKS.md` and `NEXT_SESSION.md` for the live state.

Read `README.md`, `docs/physix/DECISIONS.md`, `SOURCE_AND_MIGRATION.md`, `SESSION.md`, then the owning feature contract and `DELIVERY_AND_QA.md`. The remaining short file references in this paragraph are under `docs/physix/`.

Precedence: current explicit owner direction → this file → DECISIONS → owning feature contract → supporting/historical material. The selected Fidelity shell governs the design family, not copied third-party identity or every visual defect. Old Motion Makers instructions saying it is the only codebase are historical for this new product; do not edit or override that donor's checkout in place.

## Execution

1. Use Remote Desktop Commander for filesystem, terminal and browser work on the owner's PC. Inspect actual branch, HEAD, status, origin and listener ownership before changes. Paths and ports in documents are observations, not permanent process identifiers.
2. Bootstrap is complete. Continue this checkout; do not clone or create another alternative project. Local verified commits are authorized by the owner continuation. The owner authorized completing and pushing this Home-system work to darkapoparka/physix on review/physix-home-system (20 September 2026). Keep the older remote main and the Gymaf donor unchanged. Other pushes, provider provisioning, external payments and deployment still need explicit approval.
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

## Active design contract — 20 September 2026

Read docs/physix/DESIGN.md, TOKENS.md, HOME.md and DESIGN_RESEARCH.md before changing frontend presentation. They replace the competing historical visual paragraphs, not the booking/care/security contracts. Historical instructions are archived under docs/physix/history and are not current authority. Current owner feedback always takes precedence; a passing screenshot test does not lock a rejected design.

The executable value source is src/styles/physix-tokens.css. Foundations feed semantic roles; old care/booking variable names are compatibility aliases. Put new colors, font roles, spacing, radii, shadows, motion and control sizes there. Edit the owning CSS module in place, not an appended global correction stylesheet. Ordinary layout fractions, media aspect ratios and documented crop geometry are not forbidden hardcoding. Do not build unused theme switches or migrate frameworks.

Home uses the existing selected artwork and the Gymaf-derived shell: one forest brand/masthead, white content canvas, photo-led service discovery, explicit booking actions, distinct informational sheets and an authorized care summary. Use 16px inputs, 14px secondary/action labels, 44px minimum standalone Home controls, 48px primary actions, and the defined type/spacing roles. Do not squeeze actions to 10–12px, add filler slogans to every card, enlarge tiny preview images without limits, or pretend generated art is actual clinic/staff imagery.

Catalogue names and mode eligibility live in src/features/physix/catalogue.ts. home-content.ts maps only presentation metadata and projects that catalogue. Use shared/physix/booking-link.ts for public Home booking entries; do not duplicate service arrays, prices or availability in JSX. Authoritative appointment and programme data remain server-owned. Static interface copy is allowed; invented patient or business data is not.

Navigation is stable: Home / Book / My care / Menu, same destinations before and after sign-in. Logo opens /; Account opens /care/profile. Public programmes are /plans; assigned programme groups are /care/programmes, not individual workouts. Preserve contextual mobile task headers and the selected labelled dock. Only focused booking steps and active exercise players hide it. Keep /app compatibility redirects and allowlisted sign-in continuations.

Appointments remain /care/appointments and /care/appointments/:id, with ownership checks, persisted confirmation, Keep/Cancel review, pending/retry states and generic calendar export. Do not cancel first to simulate rescheduling or invent a video-join button. Preserve saved programmes, attempts, sets, timers, check-ins, permissions and cross-tab identity clearing.

Run npm run check:design, typecheck, scoped lint, unit tests and a production build; then test:home-system, test:home, navigation and relevant booking/care browser regressions. Check 320/390/430/768/1440 widths, enlarged text, images, focus return, keyboard rail access, direct service/mode links, guest/assigned/empty states and protected summaries. Save before/after evidence. Report blocked or unrun checks explicitly. Scope migration honestly: the entire inherited stylesheet is not yet token-only.
