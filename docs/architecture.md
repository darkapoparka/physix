# Application architecture

## One app, explicit boundaries

```text
Browser
  public SSR pages + small interactive components
  authenticated booking/account/staff screens
        |
SvelteKit Node application
  server loads/actions/endpoints
  validated inputs + verified identity + permission checks
        |
  domain services (booking / content / access / plans)
        |
  Supabase: PostgreSQL + Auth + Storage
  external adapters: email; approved video links; later Stripe
```

A background outbox is stored in PostgreSQL and processed by an authenticated scheduled endpoint. It is not an in-memory timer or an unawaited serverless request. No separate backend, message broker or microservice is required initially.

## Planned repository structure

Create folders only as their implementation begins; this is a map, not permission to generate empty abstractions.

```text
AGENTS.md
README.md
docs/
src/
  app.html
  app.css
  hooks.server.ts
  params/locale.ts
  lib/
    components/ui/          # small primitives styled with tokens
    components/layout/      # header, dock, focused booking shell
    components/home/
    components/services/
    components/booking/
    components/account/
    components/staff/
    content/                # approved public text and synthetic demo data
    i18n/                   # typed bg/en messages; locale passed explicitly
    domain/                 # pure rules, input schemas, DTOs
    server/
      auth/                 # verified request identity and authorization
      booking/              # scheduling entry points
      repositories/         # concrete Supabase reads/RPCs
      notifications/        # outbox worker and email adapter
      storage/              # authorized short-lived signed assets
      payments/             # R2 only
      plans/                # R2 only
      config.ts
    types/database.types.ts # generated, never manually patched
  routes/
    +layout.svelte
    +page.server.ts         # root -> /bg
    [lang=locale]/
      (public)/
      (booking)/book/
      (patient)/account/
      (auth)/
      (staff)/staff/
    api/                    # jobs, provider callbacks, minimal availability
static/
  images/                   # licensed/approved public assets only
tests/
  unit/
  e2e/
supabase/
  migrations/
  tests/
  seed.sql                  # synthetic, deterministic local fixtures
```

Route groups do not change URLs. [Routes](routes.md) owns actual paths; avoid duplicate implementations of the same route across groups. Global layout supplies tokens and accessibility infrastructure, not a forced marketing header around every private workflow.

## Rendering and state

Public pages are SSR and can be prerendered when their content is static. Service search over the small public catalogue can run locally after hydration; the listing remains useful without JavaScript. Private and availability routes are dynamic, not prerendered.

Component-local state owns dialogs and field interactions. The URL owns locale and public navigation, not symptom free text. Server state owns appointments, identity, roles, prices, orders and clinical plan versions. Do not put mutable patient/locale/session state in module-level server variables shared between requests.

Booking selection can survive verification with a short-lived opaque draft ID. Store the draft server-side with expiry and a random session binding; an HttpOnly cookie holds the binding, not a patient record. It is a convenience selection, not a slot hold. Validate everything again on confirmation. See [booking](booking.md).

## Environment modes

`APP_MODE=demo`: M0 only, synthetic content, clearly marked preview paths, no real booking writes or outbound provider calls. Missing environment values may default to this only during local development. A deployed demo must explicitly select demo mode, carry noindex and show a banner. Production must reject demo mode.

`APP_MODE=live`: credentials and operational capabilities validated before use. A provider outage returns a useful failure state; it must not fall back to fake slots or a fake booking success. Supabase clients are constructed lazily in server modules so public static pages do not import required secret configuration at module initialization.

Development, staging and production are separate data environments. Preview deployments do not connect to the production patient database. Cloud provisioning is not part of the documentation handoff.

## Data access and transactions

Normal authenticated reads use a request-scoped Supabase client under the user's JWT and RLS. Protected scheduling mutations call narrowly scoped SQL functions that verify `auth.uid()` and current database roles. Privileged service clients are restricted to signed jobs/provider processing and explicit admin operations; a service key does not replace a user authorization check.

A booking transaction owns schedule validation, conflict detection, durable write, audit event and outbox insert. External email/video/payment calls do not occur inside the SQL transaction. A write is successful when durable state exists, even if a notification is queued for retry.

Public DTOs never serialize private contact fields, internal block reasons, meeting URLs or clinical records. Server-only modules must remain under `$lib/server` or otherwise use SvelteKit's protected module conventions.

## Content strategy

Initially public editorial copy is typed repo-managed content with approval metadata. It is not duplicated between a CMS and database. Bookable appointment types, fees and availability live in the database and are authoritative; marketing service slugs map to those records. Show duration/fee from the same source when live. Changing a draft service description must not silently change the rules of an existing appointment.

Small provider adapters isolate external calls; do not implement a universal repository framework. An eventual managed scheduling replacement is a deliberate migration with a new decision record, not two calendars racing to be authoritative.

## Error model

Domain errors have stable codes: `VALIDATION_FAILED`, `AUTH_REQUIRED`, `FORBIDDEN`, `SLOT_UNAVAILABLE`, `POLICY_RESTRICTED`, `RATE_LIMITED`, `PROVIDER_UNAVAILABLE`, `CONFIG_UNAVAILABLE`. UI copy is localized separately. Log request IDs and sanitized codes; never whole request bodies or raw provider payloads.
