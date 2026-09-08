# Technology selection

Decision date: 2026-09-08. Exact package versions are deliberately resolved by the local CLI and written to [versions](versions.md), not guessed in documentation. [Official sources](research.md) were checked for this handoff.

## Selected stack

| Layer | Selection | Reason / boundary |
| --- | --- | --- |
| Runtime | Node.js 24 LTS baseline; recheck current supported LTS at bootstrap | Production should use supported LTS, not the newest Current major solely because it is newer. Match local/CI/hosting. |
| Package manager | pnpm, exact version in packageManager | One reproducible lockfile; do not mix npm/yarn lockfiles. |
| App | SvelteKit + Svelte + strict TypeScript | Server-rendered public pages and interactive booking/account in one codebase. Native server actions avoid a separate backend framework. |
| Styling | Tailwind CSS through official Svelte CLI/Vite integration; CSS custom-property tokens | Precise bespoke design without a heavy theme. Do not copy old Tailwind v3 setup into a current app. |
| Complex widgets | Bits UI, selected components only | Dialog/menu/combobox/date interaction primitives, restyled to PhysiX. Ordinary links and buttons stay native HTML. |
| Form validation | Zod + SvelteKit server actions | Shared input shape, server authority; no form meta-framework until a real need appears. |
| Data / identity / files | Supabase PostgreSQL, Auth, private Storage | One backend provider for relational operations, passwordless identity and protected assets. No Neon plus Supabase duplication. |
| Database changes | Supabase SQL migrations and generated TypeScript database types | RLS, constraints and transactions are visible SQL. No Prisma/Drizzle migration system alongside it. |
| Dates | @internationalized/date when calendar implementation begins | One explicit-zone conversion library; UTC instants plus local scheduling rules. Do not hand-roll DST arithmetic. |
| Email | Resend SDK behind a narrow server adapter; production SMTP/provider terms approved before use | No custom email infrastructure. Generic transactional messages with minimal appointment details. |
| Payments | Stripe hosted Checkout, R2 only | Keep card collection out of the app. Do not install/integrate payments in M0. |
| Testing | Vitest, Playwright, axe-core integration, Supabase database tests | Unit/component, real browser, accessibility automation and data authorization/constraints. |
| Deployment | Vercel with explicit SvelteKit adapter, Node runtime | One deployment boundary. Region/provider terms and costs require owner approval. |

## Why SvelteKit here

The product is one clinic's branded public site plus a focused application. SvelteKit supplies routing, rendering, server endpoints and progressively enhanced form actions in the same project. Svelte's component model is a good fit for the exact custom mobile design requested. This is a fit decision, not a claim that Svelte is universally fastest or best.

Next.js would also be viable, especially for a React-heavy team or a product already built with React. That is not the current repository. WordPress would accelerate a brochure with an embedded scheduler, but a custom protected patient plan workflow would depend on a different plugin/maintenance strategy. Neither alternative supplies a reason to change the chosen greenfield architecture now.

Supabase is not required to see the first UI. It becomes required when persistent identity, scheduling and staff operations are implemented. There must be no 'Supabase URL missing' crash on the M0 homepage.

## Dependency discipline

Use `sv create` and official add-ons, then inspect generated configuration. Prefer stable APIs. SvelteKit's form-action documentation currently describes remote form functions as experimental; use established server actions for R1 rather than building around an unstable alternative.

Use current Svelte conventions and official examples, including runes where appropriate. Do not paste obsolete lifecycle/store/slot patterns into new components without checking compatibility. Do not add Zustand, Redux, tRPC, GraphQL, a query cache, a component megakit, a carousel library, animation framework, or an AI SDK for hypothetical future requirements.

Install Bits UI or date tooling when the relevant widget is needed. Lucide or a similarly consistent licensed icon set is suitable for utility navigation; custom service assets are not replaced by generic utility icons. Validate the actual current package name before installation.

Resolve versions once, commit the lockfile, and update dependencies in a dedicated tested change. Subsequent sessions run a frozen install, not an unconditional upgrade. The actual generated package scripts are the authority until normalized as described in [bootstrap](bootstrap.md).
