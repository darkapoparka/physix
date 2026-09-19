# Architecture and implementation boundaries

## Baseline, not a new stack decision

The inspected Fidelity package declares Next.js `16.3.4`, React/React DOM `19.2.8`, TypeScript `^5.9.0`, `lucide-react`, `sharp`, `qrcode` and Stripe `^22.6.1`. It uses `package-lock.json`, existing CSS files and server-side Gymaf HTTP modules. These are observed manifest versions, not a recommendation to upgrade to the newest release or proof of installed/runtime versions.

Keep the existing Next.js/React/TypeScript application as the source foundation. Do not import Motion Makers' TanStack/Vite runtime or HeroUI installation merely because those were previously used for public pages. No new component library is necessary to preserve Fidelity's app-like design.

Public routes should render meaningful clinic/service content without waiting for patient authentication. Next.js metadata/OG capabilities support route-specific public presentation (R5 in CLINIC_BRIEF). Private patient/staff responses must never be included in a shared public cache. Search visibility is a route/content concern, not a reason to make the interface look like an old clinic template.

## Surfaces and routing

Use public, patient and practitioner route/layout boundaries in the same application. Keep the public root outside `BackendProvider`'s authenticated-account gate. Preserve the tested provider/session logic inside authorized areas after review.

The donor currently has root/member/coach catch-all routes. Introduce explicit PhysiX route ownership in controlled slices and test precedence, deep links and redirects. Do not copy route names from the plan without checking how they resolve against those catch-alls. Reference/review routes stay development-only and must not intercept normal production paths.

New API contracts live under **`/api/physix/v1`** so they do not silently collide with the inherited `/api/v1` catch-all. This is a proposed implementation namespace. A private adapter can call reused Gymaf primitives until the underlying migration is complete. No direct UI dependency on legacy fitness command names in newly written feature components.

## Logical modules

| Module | Owns | Must not own |
|---|---|---|
| Clinic/catalogue | Published services, products, public practitioner/location content | Private patient profiles or payment settlement |
| Booking | Availability, allocations, appointments and booking policies | Exercise completion, diagnosis or card processing |
| Commerce | Offer/order snapshots, provider events and payment recognition | Clinical assignment decisions |
| Access | Product entitlements and access-term evaluation | Assuming that paid access is a clinical prescription |
| Care | Exercise/version library, assignments, schedules, sessions and check-ins | Authorizing any clinician to read any patient |
| Communication | Conversations, delivery outbox and notifications | Broad health-data export to email/analytics |
| Identity | Auth/session, clinic roles and care relationships | Trusting editable profile fields as permissions |

Start as one modular application, not microservices. Share validation/types and small domain functions where helpful; do not create an abstract framework before the first workflow works.

## Suggested source ownership

Keep and adapt existing primitives under `src/components`; consolidate reviewed tokens without a global CSS replacement. Add bounded modules under `src/features/physix`, `src/shared/physix` and `src/server/physix`. Keep actual database changes in the existing migration tooling only after an isolated target is established.

Legacy `src/features/gymaf`, `src/shared/gymaf`, `src/server/gymaf` and existing SQL may temporarily remain as an internal compatibility layer. Track every reused primitive and its PhysiX acceptance result. New public contracts and patient-facing labels use PhysiX concepts. Delete unused features only after reachability/import/test review, not by a global rename command.

## API conventions

These are target contracts, not an implemented endpoint list:

| Operation | Access and authoritative behaviour |
|---|---|
| Read published services/products | Public; return only approved public fields |
| Read availability | Public; rate-limited, no patient identities or private calendar reasons |
| Create/confirm guest hold | Scoped guest proof, strict validation, concurrency/idempotency checks |
| Read/manage appointment | Owning patient, authorized staff, or narrowly scoped verified manage session |
| Create owned checkout | Authenticated purchaser; server prices and snapshots the offer |
| Receive payment event | Provider signature and environment/account checks; durable inbox and deduplication |
| Read My Plan | Ownership/relationship plus access policy; never fallback to reference fixtures |
| Save session/check-in | Owner and current assignment authorization, revision and command identity |
| Publish/assign programme | Authorized practitioner role and eligible patient relationship |
| Read/send conversation | Explicit membership and active/read-only relationship rules |

Use structured error codes: validation, unauthenticated, forbidden/not-found, conflict, rate-limited and temporary-unavailable. Include a non-sensitive request ID, not raw SQL/provider responses. Bound pagination and body/media sizes. A retry of the same logical mutation retains its idempotency key and expected revision; a changed payload creates a new command or returns a conflict.

Do not equate a disabled button with authorization. Server handlers and database policies/commands enforce the same access model. A server's possession of a privileged key is not evidence that the requesting person is authorized.

## Background work

Use a database-backed inbox/outbox and a deployable worker/job facility for payment reconciliation, hold expiry and notification delivery. Start with the simplest supported runtime for the chosen host; no queue vendor decision is necessary in this planning session.

Jobs need leases/retries, idempotency, bounded failure alerts and replay tools with appropriate permissions. A transactional change and its outbox event are committed together. Do not use browser timers, a user's open tab or development-only cron as the production source of truth.

## Environment separation

`demo`: explicitly synthetic, local/development-only, no provider writes. `local-test`: disposable synthetic database. `staging`: dedicated PhysiX provider/database environments with test payment mode. `production`: separately authorized clinic-owned configuration after release gates.

Do not copy donor `.env.local`, tokens, sessions, Supabase project links, Stripe customer IDs or live CLI state. Add a new reviewed `.env.example` only during bootstrap. Keep secrets out of source control and client bundles. Prefer user-context access for normal requests; isolate administrative credentials/jobs and justify each use.

The source's preview flag requires review: current uncommitted code can choose fixture captures by default in development. PhysiX must instead use an explicit `/dev/demo` or equivalent labelled demo surface. Production must reject it even when an environment flag is accidentally set.

## Auth and caching

Keep the existing server-cookie/session architecture unless a tested defect requires an approved change; inspect actual code before assuming a Supabase SDK is installed. Authentication must have a bounded loading timeout and recoverable unauthenticated/error states. Verify email links, password/reset policy, session refresh, sign-out, revoked sessions and account switching against real staging Auth.

Never authorize from user-editable metadata. Do not share authenticated DTOs through static generation, shared fetch caches or service-worker precaches. Clear private client state on role/account changes. Auth-link and booking-token landing pages should avoid third-party scripts, exchange scoped tokens safely, remove them from subsequent URLs and use strict referrer handling.

## Future app direction

Ship a responsive browser app first. An installable web experience can follow after caching/privacy and real-device tests; do not promise offline health-data access by adding a manifest. Native iOS/Android can reuse the product model, APIs, types and selected domain logic, but requires a real native UI/device/notification and distribution workstream.


## Implemented local-test adapter — 19 September 2026

The PC has Node but no discovered Docker, psql or Supabase CLI runtime. A pinned development dependency, @electric-sql/pglite 0.5.8, runs actual PostgreSQL SQL with disk persistence for the LOCAL-TEST environment. This does not replace the proposed separate Supabase/Postgres staging/production architecture and does not establish Supabase Auth acceptance.

scripts/physix-dev.mjs starts one database owner process plus the existing Next dev server. The single writer avoids multiple Next development workers opening the same PGlite files. A per-launch random secret protects a loopback-only named-operation RPC; browser clients call the Next /api/physix/v1 boundary, not arbitrary SQL. Synthetic test identities use hashed server-side tokens and HttpOnly SameSite=Strict cookies. No privileged provider key reaches a client bundle. Production checks refuse these routes even when local flags are set.

scripts/physix-local/database.mjs reuses the first four existing care migrations unchanged and validates their source hashes. It adds local-only booking SQL from db/physix/local-booking.sql. The auth bootstrap and synthetic MFA runtime flag are explicitly test fixtures. They must not be applied to a hosted real-data project. The one-clinic sample configuration does not constitute the complete production permission/lifecycle model.

The local data directory is .artifacts/physix-local/pgdata. Keep it out of Git and preserve it across restarts. Disposable acceptance databases use separately named .artifacts/physix-check-* directories; never reset the application database to make a test pass. Tests cover close/reopen and real SQL ownership/constraint enforcement; the single process serializes local requests, so staging still needs multi-connection concurrency and real provider/session testing.

Public /book now uses local saved operations only when the local backend is enabled. /app supplies saved plans/sessions/activity/check-ins/appointments. /practitioner reads permitted records and assigns existing published sample versions. /dev/demo remains an explicitly memory-only visual reference. Do not wire production to the synthetic account chooser or call these modes a working clinic deployment.
