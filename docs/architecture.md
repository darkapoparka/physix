# PhysiX application architecture

Accepted baseline: one **Next.js App Router / React / TypeScript** application. See [stack](tech-stack.md), [routes](routes.md), [reuse](reuse/gymaf.md) and [data model](data-model.md). This is the target; the app is scaffolded locally, not already implemented by these docs.

## Boundaries

```text
Public website       Patient account       Staff workspace
        \                 |                 /
          Next.js server-rendered route tree
          + small interactive React components
                         |
       Server Actions / focused Route Handlers
       verified identity + authorization + validation
                         |
       domain services + minimal DTO data-access layer
                         |
       PhysiX Supabase: Postgres / Auth / private Storage
                         |
       durable outbox -> approved email provider
       later: verified Stripe events / protected lesson media

vendor/gymaf  -- reviewed extraction only --> PhysiX-owned source
              (never a runtime import or second backend)
```

One deployable app; no framework bridge or microservice. Public content and availability are usable before registration. Patient authentication belongs to PhysiX. Gymaf users, sessions and commercial relationships are not transferred or shared.

## Planned structure

Create folders when used; do not generate an empty framework of abstractions.

```text
AGENTS.md
README.md
docs/                         # current product/specification/task authority
scripts/                      # small handoff checks and later local tooling
vendor/
  README.md
  gymaf/                      # pinned Git submodule; reference only
src/
  proxy.ts                    # root locale redirect; later supported auth refresh
  app/
    [lang]/
      layout.tsx              # document root, validated lang, global styles
      (public)/
        layout.tsx            # public header/footer/dock
        page.tsx
        services/...
        charlie/...
        clinic/...
        online/...
      (booking)/book/...      # focused shell, no public dock
      (auth)/sign-in/...
      (auth)/verify/...
      (patient)/account/...
      (staff)/staff/...
      (preview)/preview/...   # synthetic, gated out of live operation
      error.tsx
      not-found.tsx
    api/
      availability/route.ts
      jobs/notifications/route.ts
      webhooks/stripe/route.ts # R2 only
  components/
    ui/
    layout/
    public/
    booking/
    patient/
    staff/
  features/
    care/                     # patient UI/controllers; R2 persistence later
    programmes/               # educational purchases, separate from assigned care
  domain/                     # pure types, schemas and rules
  server/
    config.ts
    auth/
    booking/
    care/
    repositories/
    notifications/
    storage/
    payments/                 # R2 only
  lib/
    i18n/
    formatting/
    supabase/                 # supported SSR factories, correctly isolated
  content/                    # approved public content + separate demo fixtures
  styles/                     # tokens/base; no upstream reset
  types/database.types.ts     # generated from applied local schema
public/images/                # approved public images only
supabase/migrations/           # PhysiX-owned migrations only
supabase/tests/
supabase/seed.sql              # synthetic
 tests/                       # unit/browser/integration, no real patient fixtures
```

All HTML pages share the `[lang]/layout.tsx` root (which renders html/body with the validated locale). Route groups do not alter URLs or create extra document roots. `/` is redirected to `/bg` by the small Proxy rule; do not create a conflicting unlocalized page that needs another root layout. Nonlocalized API handlers do not render a page shell. Follow official Next locale/root-layout examples and test invalid locales, 404s and language changes.

Next request APIs/params may be asynchronous in the installed release: use its actual types and docs. Proxy handles routing/session refresh only; private data access is always authorized again at its own server boundary.

## Rendering and state ownership

Public text/structure is Server Component output; only search, dialog, form and player interactions need Client Components. Do not put `use client` at the document/public root just to reuse Gymaf. Private route loaders produce minimal owned DTOs. Protect server modules with `import 'server-only'` and enforce restricted-import rules.

Component state owns transient selections and unsaved edits. URL paths own navigation and explicit locale, not symptoms or patient names. PostgreSQL owns identity links, appointments, published plan versions, assignments, acknowledged logs, prices and entitlements. No mutable request/user state in module globals. No shared cache for patient data; private responses and auth-cookie responses are non-cacheable. Disable private-link prefetch where it would unnecessarily expose/load health-related data.

For booking, a random short-lived draft identifier plus a server-validated cookie binding preserves selections across verification. A draft is not a reservation. Revalidate current terms and availability immediately before the atomic confirmation transaction. Never expose a raw patient form dump in a URL or storage key.

## Environment/capability model

`APP_ENV` identifies local / preview / production; `APP_MODE` identifies demo / live. A missing mode may mean demo only for local development. Preview demo must be explicit and non-indexable. `APP_ENV=production` or the host's actual production environment must reject demo operation; setting NODE_ENV to production for a local build is not itself a live deployment.

M0 provider construction is lazy and behind capability checks. The homepage does not import secret-required clients at module initialization. Demo pages use unmistakably synthetic data and never authenticate a real person, create an appointment, or call mail/payment services. In live mode preview handlers return unavailable/404 and missing providers never cause a fixture fallback. Validate that a local-labelled configuration cannot enable unsafe production shortcuts.

Local, staging and production use separate databases and provider settings. Two local Supabase stacks require separate project IDs/ports; never run copied Gymaf migrations against the PhysiX stack. Cloud creation/deployment is separately authorized.

## Reads, writes and jobs

Ordinary private operations use request-scoped authenticated Supabase clients with RLS, not a universal service-role client. Narrow SQL functions verify current role/ownership and enforce transactions. The data-access layer checks auth, minimizes fields and translates domain failures into safe localized messages.

Server Actions are network entry points: validate inputs and authorization each time. Route Handlers serve explicit needs such as availability queries, session log requests when appropriate, signed media and provider callbacks. Do not implement the same mutation twice in Actions and REST; both must call one domain service if both interfaces are justified.

Booking writes atomically capture schedule validation, occupancy, durable appointment, audit and outbox. R2 session logs use distinct attempt IDs, immutable assigned-version snapshots and revision-aware/idempotent writes. External calls happen after durable state exists, outside SQL transactions. A scheduled authenticated worker drains a leased outbox; no in-memory timer, unawaited work or provider call inside the transaction.

Errors have stable codes: VALIDATION_FAILED, AUTH_REQUIRED, FORBIDDEN, SLOT_UNAVAILABLE, POLICY_RESTRICTED, CONFLICT, RATE_LIMITED, PROVIDER_UNAVAILABLE, CONFIG_UNAVAILABLE. UI translates them. Logs contain sanitized codes and request IDs only.

## Upstream isolation in tooling and deployment

The application has no imports, aliases, package links or image paths into `vendor/`. Exclude vendor from TypeScript root globs, lint/format, test discovery, Tailwind source discovery and deployment tracing/uploads. A build must succeed without initializing the submodule once extracted application code is present. The source is convenient to inspect, not required to serve patients.

Copy selected code into owned modules, test it, record source commit/path and remove superseded implementations. Do not auto-update or merge upstream. See [reuse guide](reuse/gymaf.md) for the extraction boundary and [backend map](reuse/backend.md) for how clinic care differs from fitness coaching.
