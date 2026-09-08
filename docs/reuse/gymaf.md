# Gymaf -> PhysiX reuse plan

## What is actually included

Source repository: `darkapoparka/gymaf`. Main inspected at `82b75bde5b4ac2fa355ee98e0efc39fc470ebac6`; connected astra inspected/pinned at `88cef03ca0b8c00ec3e3c4a5dba09daeb5023506`. The latter includes the original `src/components` alongside `src/features/gymaf`, `src/server/gymaf`, shared contracts and SQL work.

`vendor/gymaf` is a real Git submodule entry with that immutable commit, not an ordinary copied folder and not a symlink to a remote service. The full source is populated on the local machine by submodule initialization. A normal GitHub ZIP does not contain it. PhysiX code is still to be scaffolded/adapted locally; adding the submodule is not the same as integrating a working patient app.

[Inventory](inventory.json) records exact source paths/blob IDs, intended targets and dispositions. [Frontend](frontend.md) owns visual adaptation; [backend](backend.md) owns domain mapping. [Tasks](../tasks.md) is the only execution backlog.

## Why this boundary

One Next application is simpler here than separate public/account frameworks with a login bridge. It preserves useful React work while allowing a clean PhysiX data/brand boundary. We do not fork Gymaf wholesale, merge its history, change its product or create shared customer infrastructure. The original source is available for comparison; owned code is extracted and tested deliberately.

The pinned astra status explicitly describes unfinished media, auth/browser hardening, notifications, billing, localization and launch work. Its historical test reports are evidence only for those reported commits/scenarios, not proof that PhysiX or every upstream feature works. Do not convert source presence into a completed task.

## Retrieval and verification

From a clean/up-to-date PhysiX checkout:

```sh
git submodule update --init --checkout -- vendor/gymaf
node scripts/verify-upstream.mjs --require-checkout
```

When already populated, inspect `git -C vendor/gymaf status --short` first. A different HEAD, modified files or unexpected URL is a stop-and-review condition, not permission to reset somebody's work. Never use --remote/--force. Without checkout, `node scripts/verify-upstream.mjs` still verifies committed/indexed pin metadata. Its checks do not run upstream code or contact a provider.

To deliberately upgrade later, review an exact candidate commit, its diff, dependency/security changes and the affected inventory entries; then update gitlink and inventory together in a dedicated change. Normal agent sessions do not update the pin. A missing/deleted remote commit must be reported, not silently replaced by main.

## Source families and disposition

Original `src/components`: useful layout/interaction source, but coupled to capture-link, capture-context, local store, fixture data and reference-media cropping. Extract the view structure; replace those dependencies. Do not preserve hardcoded exercise selection or automatic replacement exercises as clinical behavior.

Connected `src/features/gymaf`: useful saved-session, programme authoring, client/history/check-in examples. Split multi-purpose screens along actual responsibilities, change routes/branding/localization and use PhysiX DTOs. A catch-all ConnectedApp and all-account bootstrap are not our route/data architecture.

`src/shared/gymaf`: reusable concepts and pure rules, after mapping the fitness/coaching domain. Do not share entire contract types just to avoid deciding permissions. Physio session targets are clinician-defined, not default gym prescriptions.

`src/server/gymaf` and upstream SQL: reference implementation only until individually reviewed. Use the selected official Next SSR integration and PhysiX schema; do not execute upstream migrations or copy its custom token-cookie/session framework. Preserve valuable invariants with new integration tests rather than a bulk rename.

## Extraction contract

Before a copy, identify the smallest useful component/function, its imports, style dependencies, fixtures and external assets. Check source/provenance permissions. Copy into the inventory's intended PhysiX-owned target (or record a justified changed target), remove capture/reference dependencies, use the shared tokens and minimal DTOs, add tests and update the inventory with actual target/commit/evidence.

Statuses begin planned. An item becomes adapted only when it is owned code, has no upstream runtime dependency, passes relevant checks and is used by an actual route. Reference-only/excluded items stay unshipped. Do not create parallel V2/Final components or duplicate source trees.

Root configs/package files/CI/auth are intentionally generated or implemented for PhysiX rather than copied. The application is not an iframe of Gymaf and its Account link never redirects patients into another brand.

## Forbidden automatic carry-over

No upstream env/secrets, production data, reference screenshots, unreviewed photos/fonts, fake people/reviews, Future/Alexander branding, capture modes, Apple Health permission simulations, localStorage health records, marketplace/tenancy layer, subscription requirement for clinic bookings, or auto-generated treatment/replacement exercises.

Owning the repository does not resolve third-party asset rights. Obtain approved Charlie/clinic images and exercise-media clearance separately. Typography falls back to a permitted/system font until a chosen font's rights are verified; do not redistribute upstream font files.

## Build and tooling isolation

No imports/aliases/workspaces into vendor. Exclude it from TypeScript, lint/format, Tailwind scanning, test discovery and deployment artifact tracing. No root postinstall hook invokes it. CI for PhysiX can build without it after extraction. The handoff CI may fetch it solely to validate the recorded pin and source blob metadata; no vendor code or lifecycle script is executed.

Optional visual comparison of the original app can run later in a separate disposable worktree, on a distinct port, after dependencies and runtime instructions are reviewed. That does not authorize connecting to real clients or running its SQL on PhysiX.

## Acceptance and review

M0 first shows a coherent PhysiX public site plus clearly synthetic patient dashboard/plan/player. After reviewed identity/schema work, R2-05 proves the smallest real care slice: clinician publishes and assigns one synthetic plan -> patient signs in -> logs a session -> reload preserves acknowledged logs -> a second patient is denied. Clinic booking is a separate R1 vertical slice with overlap protection. Neither waits for a marketplace or subscription platform.

Clinical assignment does not depend on Stripe; educational purchasing does not imply treatment approval. Keep these boundaries even when a single dashboard presents both.
