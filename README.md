# PhysiX

A mobile-first physiotherapy website for Charlie's PhysiX clinic in Bulgaria.

**Current task: the PUBLIC WEBSITE, not Gymaf or logged-in screens.** The repository contains a complete public visual reference and implementation handoff, not a launched application. The production stack remains **Next.js / React / TypeScript**.

## See the public UI

- **[Complete public screen gallery](docs/design/public-v2/screens/README.md)** — 41 designed screens/states, individual mobile and desktop images.
- **[Public design handoff](docs/design/public-v2/README.md)** — clickable reference, coverage, interaction contracts and evidence.
- **[Corrected mobile homepage](docs/design/public-v2/screens/home-mobile.png)** and **[Charlie-to-review transition](docs/design/public-v2/screens/home-mobile-story.png)**.
- **[Local-agent build prompt](docs/handoff.md)** — public scope only; no ZIP import or Gymaf checkout required.

The new home uses an editorial mint practitioner section followed by a full-width deep-teal patient story, not another white testimonial card. The public design is awaiting owner review. Actual portraits, clinical/business content, genuine reviews, production-resolution media and Bulgarian translations still need approval.

The images are browser renders of the committed standalone design reference, not screenshots of the implemented Next.js product. Full-page exports hide fixed controls for readability; mobile viewport images show their actual placement. No private dashboard, player or staff UI is included.

## Start building locally

```sh
git clone https://github.com/darkapoparka/physix.git
cd physix
node scripts/check-handoff.mjs
```

For an existing clone, inspect and preserve changes before safely pulling the current handoff. Open `docs/design/public-v2/index.html` in a browser to explore the clickable public design; that reference needs no dependencies or backend. Then follow the current [local-agent prompt](docs/handoff.md).

Read [AGENTS.md](AGENTS.md), [current status](docs/status.md), [single backlog](docs/tasks.md), [architecture](docs/architecture.md), [bootstrap](docs/bootstrap.md), and the public design contracts. Use official CLI tooling safely if the production app has not yet been scaffolded. Do not overwrite documentation or regenerate existing code.

The production implementation belongs at the repository root (`src/`, `public/`, later `supabase/`). Do not copy the standalone prototype's hash router, HTML-string renderer or simulated verification into production, and do not create a second application runtime.

## Documentation

[Documentation index](docs/README.md) · [PRD](docs/prd.md) · [Features](docs/features.md) · [Route map](docs/routes.md) · [Architecture](docs/architecture.md) · [Stack](docs/tech-stack.md) · [Design](docs/design/README.md) · [Booking rules](docs/booking.md) · [Security](docs/auth-security.md)

[The recorded public-design workflow](https://github.com/darkapoparka/physix/actions/runs/34244045684) successfully materialized the authored files, rendered the gallery, checked the handoff and committed the ordinary PNGs/source. The [prototype report](docs/design/public-v2/review-report.json) records 123 layout cases and eight prototype smoke checks. This is not application, clinical or provider-integration evidence.

## Retained future work — not this task

The earlier patient, staff and backend specifications remain for separately authorized phases. `vendor/gymaf` is a pinned, read-only-by-policy source reference for potential later selective reuse. It is not installed, built, deployed or imported by the public site, and public frontend work does not require its checkout.

Only when a later approved task needs it:

```sh
git submodule update --init --checkout -- vendor/gymaf
node scripts/verify-upstream.mjs --require-checkout
```

Never use remote-tracking or force updates casually. Do not copy the whole upstream app, styling, database or authentication approach into PhysiX. The [future reuse guide](docs/reuse/gymaf.md) retains those boundaries.

## Trust and release boundaries

This repository is public. No secrets, real patient information, private meeting links, identifiable clinical screenshots or unreviewed claims belong here. Public browsing and discovery are not hidden behind registration. The dock is Home / Book / Online / Account; Account stops at the public sign-in boundary in this package.

The immediate milestone is public UI review and implementation. Real authentication, scheduling operations, clinical plans, educational purchases and any explicitly disclosed AI require their later gates. No root application scaffold, database migration, completed private-app port, real booking, payment or deployment is claimed by the design handoff.

Research/review baseline: **2026-09-08**. Exact application dependencies are resolved and locked locally when implementation begins.
