# PhysiX

A mobile-first clinic website and personal patient web application for Charlie's PhysiX in Bulgaria.

**Current state: implementation handoff, not a launched application.** The architecture now uses **Next.js / React / TypeScript**, selectively reusing Gymaf. The earlier SvelteKit bootstrap is superseded; the original design and product goals are retained.

## Start here

- Agent: [AGENTS.md](AGENTS.md), [current status](docs/status.md), [single backlog](docs/tasks.md).
- First local session: [bootstrap](docs/bootstrap.md) and [copy-paste prompts](docs/handoff.md).
- What to build: [PRD](docs/prd.md), [features](docs/features.md), [route map](docs/routes.md).
- How it fits together: [architecture](docs/architecture.md), [stack](docs/tech-stack.md), [Gymaf reuse guide](docs/reuse/gymaf.md).
- UI: [design system](docs/design-system.md), [design images/wireframes](docs/design/README.md), [patient frontend adaptation](docs/reuse/frontend.md).
- Backend: [data model](docs/data-model.md), [booking](docs/booking.md), [backend adaptation](docs/reuse/backend.md).
- All documents: [index](docs/README.md).

## Gymaf is included as pinned source, not a second live app

`vendor/gymaf` is a Git submodule pinned to Gymaf's inspected `astra` commit. It contains the original styled components and connected application work for reference and selective extraction. It is **not installed, built, deployed, or imported by PhysiX**. There is no second login or shared customer database. Editing that checkout is not part of ordinary PhysiX work.

Fresh checkout:

```sh
git clone https://github.com/darkapoparka/physix.git
cd physix
git submodule update --init --checkout -- vendor/gymaf
node scripts/verify-upstream.mjs --require-checkout
node scripts/check-handoff.mjs
```

For an existing clone, first inspect and preserve local changes, fast-forward the appropriate branch, then run the submodule update. Do not use `--remote` or `--force`. GitHub ZIP downloads do not contain the submodule's source; use Git for the development checkout.

## One application, three areas

Public pages introduce PhysiX, explain services and start bookings. The patient area manages appointments and later clinician-assigned exercises and purchased programmes. The staff area operates the clinic. Public browsing is not hidden behind registration. The four-item public dock remains Home / Book / Online / Account.

The implementation belongs at this repository's root (`src/`, `public/`, `supabase/`). Do not create another nested app, combine two framework runtimes, or copy all of Gymaf over this repository. Use the official CLI in a temporary sibling and merge only reviewed generated files.

## Delivery order

M0: local UI and synthetic patient previews with **no cloud keys required**. R1: real authentication, clinic scheduling, patient appointments and staff operations. R2: clinician-controlled exercise plans and separately purchased educational content. R3: optional, explicitly disclosed AI after its own review. See the backlog for exact dependencies and review gates.

## Trust and privacy

This repository is public. No secrets, real patient data, private meeting URLs, raw clinical exports, or identifiable test screenshots belong here. Upstream prototype assets/branding and generated mockup claims are not approved production content. Reuse requires provenance review; no clinical plan is published by an AI or by a payment redirect.

Research/review baseline: **2026-09-08**. Exact application dependencies will be installed and locked locally. The submodule and documentation are not evidence that the PhysiX application, migrations or end-to-end journeys have been implemented.
