# PhysiX

A mobile-first physiotherapy website and patient web application for Charlie's PhysiX clinic in Bulgaria.

**Repository state:** planning and design handoff, not an implemented or production-ready application. No cloud projects, payments, clinical services, or deployment have been provisioned by this handoff.

## Start here

- **Coding agent:** read [AGENTS.md](AGENTS.md), then [current status](docs/status.md), [task backlog](docs/tasks.md), and the documents relevant to the next task.
- **Owner:** read the [PRD](docs/prd.md), [release scope](docs/features.md), and [decisions requiring your input](docs/open-questions.md).
- **First local build:** follow [bootstrap](docs/bootstrap.md) and use the [Codex handoff prompt](docs/handoff.md).
- **Everything:** [documentation index](docs/README.md).
- **Visual direction and mobile corrections:** [design reference guide](docs/design/README.md) and [design system](docs/design-system.md).

## Product in one paragraph

Introduce PhysiX and Charlie, help visitors find relevant services, and make in-clinic and human online appointments easy to book. A passwordless patient area manages appointments and, in a later release, clinician-approved exercise plans and purchased educational programmes. Public information is not hidden behind registration. The first release is a dependable clinic service, not an autonomous AI medical product.

## Selected implementation

SvelteKit + Svelte + TypeScript, Tailwind CSS, selectively used Bits UI primitives, Supabase PostgreSQL/Auth/Storage, and Vercel deployment. Use official CLIs locally, current stable compatible releases, and a committed lockfile. See [stack decision](docs/tech-stack.md) for rationale and [architecture](docs/architecture.md) for boundaries.

**Do not run a scaffolder over this repository's documentation.** Bootstrap in a temporary directory and merge deliberately as described in the runbook.

## Release sequence

1. **M0:** local runnable foundation and responsive public UI, with honest demo states and no cloud credentials required.
2. **R1:** real scheduling, passwordless patient accounts, staff operations, notifications, and launch controls.
3. **R2:** clinician-published plans and separately purchased educational programmes.
4. **R3:** optional, explicitly disclosed AI assistance after clinical, privacy, and regulatory review.

The task backlog is the only implementation checklist. A checked box requires evidence; documentation is not an implemented feature.

## Important boundaries

The repository was public when inspected on 2026-09-08. Never commit secrets, real patient data, clinical exports, private meeting links, or identifiable support logs. Generated mockup portraits, testimonials, qualifications, prices, and ratings are not verified business content. The original WordPress template is visual inspiration, not a code dependency or an implied licence to redistribute its assets.

Research baseline: **2026-09-08**. Recheck the official sources at the start of implementation; preserve the architectural decisions unless there is a recorded reason to change them.
