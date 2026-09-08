# Architecture and migration contract

## Selected approach

One Next.js application with separate website, account and staff layouts; feature-owned services over the inherited database/auth integration. This is a modular monolith: shared deployment, explicit internal boundaries. Turborepo, microservices, a second database and a Svelte rewrite are not prerequisites. Reconsider repository packages when a real native app or independent deployment is started.

Observed baseline: Next.js 16.3.4, React 19.2.8, TypeScript 5.9, custom CSS, Lucide and Stripe SDK; Supabase/PostgreSQL integration through server APIs and SQL migrations. Retain the lockfile unless a task establishes a dependency change. Verify installed Next documentation before implementation because framework APIs can differ from earlier versions.

## Proposed route/source shape

```text
src/app/
  [locale]/
    (website)/                 home, services, team, contact, community, book
    (auth)/                    sign-in and invitation UI
    (client)/account/           private client layouts and routes
    (staff)/staff/              staff calendar, clients, plans, administration
  api/v1/                      stable browser/native API boundary
  auth/callback/               provider callback; allowlisted local return paths
src/features/
  identity/ clinic/ bookings/ care-plans/ sessions/ progress/
  messaging/ community/ billing/ privacy/
src/components/ui/             shared presentation primitives only
src/server/
  auth/ policies/ services/ repositories/ jobs/
src/shared/
  contracts/ validation/ domain/
supabase/migrations/            append-only schema changes
supabase/tests/                 permissions, constraints, concurrency checks
tests/                         unit, HTTP, integration and browser evidence
```

Route groups do not appear in URLs. Proposed examples: `/bg`, `/en/services`, `/bg/book`, `/bg/account`, `/en/account/appointments`, `/bg/staff/calendar`. `/` redirects using a validated locale preference with `bg` fallback. Existing `/app` and related links need an explicit migration map; no mass string replacement or blind catch-all redirects. Locale callback handling must retain intent without accepting external redirects. Reference capture tools are excluded from public production routing.

## Boundaries and dependency rules

- Routes compose feature entry points. Feature UI imports its contracts and shared primitives; it does not query another feature's private table directly.
- Pure shared types/calculations do not import React, Next.js, provider clients, secrets or Node-only modules.
- Server services enforce actor/resource permission and business rules. Browser and future native clients call the same authoritative commands.
- Database transactions/constraints protect multi-row invariants and direct API access. A disabled button or hidden staff link is not authorization.
- Keep private server modules out of client import graphs. Server Components call services directly rather than fetching their own API over loopback HTTP.
- Do not mount the client account provider on the public website. Load calendars, recording tools and exercise players only in their relevant route/interaction. Avoid importing every feature through a single client barrel.
- Public cacheable DTOs contain only published fields. Personalized responses, auth redirects/cookies and private media use appropriate private/no-store behavior. No global user-specific provider client.
- Independent booking, care and community services share identity but have distinct permissions, transactions and lifecycle. A community member does not gain plan access.
- Public, client and staff CSS is scoped. Preserve shared tokens deliberately; move global styles incrementally and compare rendering to catch cascade changes.

## Incremental migration order

1. PX-001 inventories source routes, imports, schemas and tests. Capture the original account UI before moves. Identify what is real, fixture-only or incomplete.
2. PX-003 introduces proper feature entry routes/layouts and moves one coherent route family at a time. Preserve existing behavior and temporary compatibility wrappers until consumers migrate.
3. PX-004 isolates Physix runtime/package identity, cookies, PKCE, storage/broadcast namespaces and fixtures. The restored branch currently still contains the source namespaces; do not assume the rejected branch's fixes are present.
4. PX-005 adds locale routing and dictionaries. PX-006 establishes dedicated backend environments; PX-007 proves the role model; PX-008 extracts services with contract regression tests.
5. Extend booking and clinic data additively. Preserve published plan versions and historical attempts. Map old coach/workspace/relationship concepts to clinic/therapist assignments explicitly before renaming tables or changing joins.
6. Build account and website vertical slices against real services. Remove temporary wrappers only after route, API and visual regression checks pass.
7. PX-034 through PX-041 qualify the complete product, environment and release.

Do not replace the whole frontend to accomplish module extraction. Do not wholesale merge `codex/phys1x-foundation`; its website and placeholder entry were rejected. A reusable utility there can be selectively reimplemented after review, with no assumption that the branch's page hierarchy is accepted.

## Reuse map: observed source, not Physix acceptance

| Existing source | Reuse intention | Required gap assessment |
|---|---|---|
| `src/components/future-app.tsx`, `primitives.tsx`, home/workouts/progress/community components | Account visual baseline | Break up catch-all client composition; translate and adapt titles/actions |
| `src/lib/backend/context.tsx`, `member-adapter.ts` | Authenticated data bridge, revisioned member changes | Scope providers by account, retain conflict/retry behavior |
| `src/server/gymaf/http.ts`, `auth.ts`, `email-link.ts` | Verified sessions, origin checks, scoped provider requests | Dedicated Physix cookies/environment and full auth lifecycle |
| `src/features/gymaf/appointments.tsx` and appointment migration | Basic slot reservation/cancellation | Services, eligibility, staff/room constraints, atomic reschedule, attendance and policies |
| Program builder, session and feedback modules | Published plans, dated assignments, actual attempts | Therapist terminology, approved feedback measures, clinical access mapping |
| Messages and private-media modules | Private conversations and uploads | Clinic assignments, retention, BG/EN and lifecycle verification |
| Friends and billing modules | Possible low-level primitives | Do not assume leaderboards, guest passes or monthly coaching prices are Physix policy |
| `supabase/migrations/` and inherited tests | Regression protection and schema provenance | Reapply only to dedicated test target; prove new clinic invariants separately |

## Native later

A later Expo/React Native or other native client can reuse versioned APIs, validation and domain calculations. It will need native screens, secure credential storage, notification/device permissions and separate acceptance. Web DOM/CSS is not automatically portable. Create a separate native plan once web v1 is stable; defer monorepo/package extraction until there is a concrete consumer.
