# Technology selection

Updated 2026-09-08 after the owner approved substantial Gymaf reuse. **D16 supersedes D01's SvelteKit choice.** This is a reuse decision, not a claim that one framework is universally better. See [decisions](decisions.md) and [official sources](research.md).

| Layer | Selection | Boundary |
|---|---|---|
| Runtime | Supported Node LTS; Node 24 baseline, recheck locally | Match local, CI and deployment; do not use a newer Current release merely for novelty |
| Package manager | pnpm, exact packageManager pin | One root lockfile; never use the upstream lockfile for PhysiX |
| Application | Next.js App Router + React + strict TypeScript | One application, three UI areas, explicit routes, no separate marketing framework |
| Styling | Tailwind CSS + semantic CSS variables; CSS Modules for adapted Gymaf pieces | Do not import its entire global stylesheet; no competing theme systems |
| Widgets | Native HTML first; selective React-compatible primitives, such as Radix Dialog, when necessary | No Bits UI or Svelte packages; no full component kit merely for styling |
| Forms | Native forms, React action state, Next Server Actions, Zod server validation | Route Handlers for deliberate JSON/polling/webhook boundaries, not duplicate CRUD for every form |
| Data / Auth / files | Supabase PostgreSQL/Auth/private Storage | Separate PhysiX project per environment; no shared Gymaf customer data |
| Database tooling | Supabase CLI, SQL migrations, generated TypeScript types | No parallel Prisma/Drizzle migrations; no blind execution of upstream SQL |
| Dates | Intl for display; @internationalized/date as calendar rules require | Explicit Europe/Sofia schedule, UTC booked instants, deterministic DST tests |
| Mail | Resend candidate behind a small adapter | Provider and SMTP terms approved separately; outbox, not fire-and-forget |
| Payments | Stripe hosted Checkout, later R2 | Verified fulfillment; no initial subscription infrastructure |
| Tests | Vitest + React Testing Library; Playwright + axe; local SQL tests | Async Server Components are verified through browser/integration tests, not assumed supported by unit rendering |
| Deployment | Vercel native Next.js support; Node server runtime | No Svelte adapter, static-only export, or automatic cloud provisioning |

## Reuse boundary

The inspected Gymaf source uses Next/React and includes both original styled prototype components and a connected `astra` implementation. Pinning it avoids recoding every interaction from a mockup. It does not certify its security, media rights, clinical suitability or production readiness. Reuse modules selectively according to [the inventory](reuse/inventory.json); copy/adapt into PhysiX-owned source rather than importing vendor.

Public pages and the patient area can have different composition while sharing brand tokens, authentication and backend. No iframe, cross-domain login handoff, subdomain SSO or monorepo is needed. Gymaf remains an independent product.

## Dependency policy

Use the current official create-next-app CLI locally, inspect help, generate compatible stable packages and record exact resolutions in [versions](versions.md). Do not copy version numbers from Gymaf as though they were freshly audited for PhysiX. Match React/React DOM and Next/ESLint compatibility. Use `pnpm exec next typegen` when needed before TypeScript checks; Next builds do not replace a separate lint command.

Initially leave optional compiler/caching experiments off until imported code and tests establish compatibility. In particular do not cache patient/session output in a shared cache. Follow the official Supabase SSR recipe and pin its version; Supabase describes the SSR package API as beta, so treat changes as reviewed upgrades rather than assuming permanent API stability.

Add date/widgets/payment/mail packages only with the corresponding task. No Redux/Zustand, GraphQL, tRPC, generic event bus, universal repository framework, AI SDK, embedded video system or separate worker service by default. Start with a small server data-access layer and a durable SQL outbox.

M0 has no cloud dependency and must run without credentials. Current stack/CLI instructions are here and in [bootstrap](bootstrap.md); historical Svelte guidance is retained only as superseded decision context, not an alternate bootstrap.
