# Integration contracts and environment configuration

No provider has been provisioned by this handoff. M0 runs without credentials. Live services, paid plans, real messages and remote migrations require explicit authorization.

## Supabase

Use an isolated PhysiX project per environment for PostgreSQL/Auth/Storage. Do not connect to Gymaf's customer database or execute its migrations. Use `@supabase/supabase-js` and the supported `@supabase/ssr` Next recipe, pinned/reviewed as described in [stack](tech-stack.md). Ordinary operations use request-scoped user clients with RLS; jobs may use a tightly bounded privileged adapter. No competing Auth provider/ORM.

Local SQL work starts with the official CLI and approved Docker-compatible runtime after M0. Use synthetic Auth mail and separate ports/project IDs for concurrent stacks. EU-region and vendor-transfer/processing review are launch work, not implied by the choice of vendor.

## Email

Resend is the candidate behind an EmailSender boundary, subject to approval of processing, sending identity and service plan. Supabase Auth SMTP and application outbox delivery are separate paths and both need tests. Verify sender/domain settings and appropriate SPF/DKIM/DMARC configuration.

Messages contain minimal visit reference/time/mode and a link to the authenticated account, not symptoms, clinical plans or private meeting URLs. Stable notification IDs, deduplication, leases/retries and staff-visible failures are required. SQL commit success does not depend on email delivery. No reminder promise before its schedule/worker actually runs.

## Human online appointments

R1 does not implement conferencing, recording or transcription. Staff prepares a unique appointment link from an approved external provider under suitable settings/agreements. Only approved HTTPS hosts are accepted; never server-fetch arbitrary user URLs or render provided HTML. The patient gets the link from an authorized appointment page at the allowed time. Missing links create a preparation item and truthful patient state. Online booking stays disabled until staffing, provider and fallback contact are operational.

## Hosting and jobs

Use Vercel's native Next deployment with a supported Node runtime. There is no Svelte adapter. Public static content may be cached; private/auth responses are non-cacheable. Scope database/compute regions and contractual processing deliberately. Preview deployments use explicit demo or isolated staging data, never production patient access.

Preserve `.vercelignore` and exclude vendor from TypeScript/test/Tailwind/tracing. A PhysiX build must not need its reference submodule initialized. Verify artifact contents, not just ignore patterns. No static-only export for an authenticated server app.

A protected scheduled endpoint processes bounded leased outbox/cleanup batches. Verify current schedule limits of the selected plan; implement an approved alternative if necessary. Duplicate workers are safe. No unawaited request work, process-local timers or an assumed persistent serverless process.

## Payments, R2 only

Stripe hosted Checkout, server-owned prices, raw-body webhook signature verification and idempotent fulfillment. See [monetization](monetization.md). Never include symptom/history/condition-revealing plan titles in provider metadata. Education entitlements and clinical assignments are distinct; payment does not publish care. Billing/tax/refund policies require owner/accountant input.

## Environment contract

`.env.example` contains safe local/demo values and blanks, not secrets. Next recognizes client exposure through `NEXT_PUBLIC_`; old Svelte PUBLIC_ names and Gymaf custom APP_ORIGIN/token-cookie assumptions are not imported.

| Name | Visibility | Requirement |
|---|---|---|
| APP_ENV | Server | local / preview / production; validate host production environment independently |
| APP_MODE | Server | demo / live; safe missing default only for local development |
| SITE_URL | Server/publicly known value | Canonical origin and allowed-origin basis; validated URL, no credentials/path/query |
| NEXT_PUBLIC_SUPABASE_URL | Public | Auth-enabled/live environment |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Public | Auth-enabled/live environment |
| SUPABASE_SECRET_KEY | Server secret | Approved jobs only; deliberate provider key-type mapping |
| RESEND_API_KEY | Server secret | Outbox mail |
| EMAIL_FROM | Server | Verified sender |
| CRON_SECRET | Server secret | Authenticated jobs |
| RATE_LIMIT_HASH_KEY | Server secret | Durable abuse-control identifier hashes |
| STRIPE_SECRET_KEY | Server secret | R2 Checkout |
| STRIPE_WEBHOOK_SECRET | Server secret | R2 event validation |

`APP_ENV=production` or a real hosting production deployment must reject demo operation, even if someone attempts a local-labelled override. A local production build is not automatically a live deployment. Demo preview routes are explicitly unavailable in live mode. Validate capability readiness at the appropriate runtime boundary without making public M0 imports require unused secrets.

Clinic address, opening rules, fees, policies and active modes are validated business configuration, not invented environment defaults. SMTP credentials belong in the provider's secure settings. Missing live configuration produces an honest unavailable state, never fake slots, fake login or fake success.
