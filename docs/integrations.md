# Integration contracts and environment configuration

No provider resources have been created by this documentation handoff. The local M0 UI runs without credentials. Provisioning live services, choosing paid plans, importing contacts, or sending real messages requires owner authorization.

## Supabase

Use PostgreSQL, Auth and Storage from one approved project per environment; choose an appropriate EU region after a data-processing review. Use `@supabase/supabase-js` and `@supabase/ssr` with the current official SvelteKit recipe. SQL migrations plus generated types own database shape. The server uses request-scoped user clients for ordinary operations and tightly bounded privileged clients for jobs/provider work. Do not add a competing Auth provider or ORM by default.

Local database work begins in R1 using the official Supabase CLI and Docker-compatible runtime. Public UI work is not blocked on Docker or a Supabase URL. Use synthetic test mail locally; never use production SMTP while developing.

## Email

Selected transactional-mail candidate: Resend, subject to owner approval of processing terms, region/transfer handling, sender identity and service plan. Keep an `EmailSender` adapter so another approved provider can replace it without rewriting booking logic. Auth email delivery uses Supabase's supported custom SMTP configuration; application confirmation/reminder messages use the outbox adapter. These are separate paths and both need delivery testing.

Verify the sending domain and configure SPF/DKIM/DMARC as appropriate. Keep messages minimal: appointment reference/time/mode and a link to the authenticated account, not symptoms, clinical plans or secret meeting links. Use stable notification IDs, bounded retries, suppression handling and staff visibility into failures. External-provider success is not required inside the booking transaction. R1 must not promise reminders unless the scheduled worker is actually running.

## Video appointments

R1 does not build video conferencing. Use a clinic-approved external provider with suitable contractual/privacy settings. Staff can prepare a unique per-appointment URL through the protected staff workflow. Provider identity and allowed URL hosts are explicit configuration; accept only HTTPS and reject arbitrary schemes. Do not fetch user-supplied URLs on the server or embed arbitrary HTML.

A private authorized appointment page exposes the link at the appropriate time. Reception/staff has a preparation queue and an operational deadline. Online booking remains disabled until this process and human availability are real. Automated meeting creation, recording, transcription and calendar sync are separate future work, not assumed capabilities.

## Vercel

Use the official SvelteKit Vercel adapter and a supported Node runtime. Request handling and database placement should be selected together; inspect available regional configuration and contracts rather than assuming all processing is EU-only. Preview deploys use demo or isolated staging data, never the production patient database. Cache public content only; auth/private responses are `private, no-store`.

A protected scheduled endpoint processes outbox/cleanup work in bounded batches. Verify current cron frequency limits before choosing a plan. Jobs authenticate with a secret, claim database leases and survive duplicate executions. No `setTimeout`/in-memory scheduler, no relying on a request's post-response execution. Choose a documented operational alternative if the hosting plan cannot run the necessary schedule.

## Stripe, R2 only

Use hosted Checkout and a webhook-verified entitlement workflow. Product/price/currency are resolved server-side; the browser never grants access. Verify raw-body signatures and handle duplicate/reordered events. See [monetization](monetization.md). Never put a medical history, plan title revealing a condition, or symptom description into Stripe metadata. Billing/tax decisions require owner/accountant approval.

## Planned environment names

Names below are the project contract, not existing values. Create `.env.example` with blank/example-safe values during M0. Do not populate real secrets in docs.

| Variable | Visibility | Required when |
|---|---|---|
| `APP_MODE` | Server | Explicit `demo` or `live`; local-only safe fallback |
| `PUBLIC_SITE_URL` | Public | Canonical approved deployment origin |
| `PUBLIC_SUPABASE_URL` | Public | Live/auth-enabled environment |
| `PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public | Live/auth-enabled environment |
| `SUPABASE_SECRET_KEY` | Server secret | Approved privileged jobs only; map the actual provider key type deliberately |
| `RESEND_API_KEY` | Server secret | Application transactional email |
| `EMAIL_FROM` | Server config | Verified sender |
| `CRON_SECRET` | Server secret | Scheduled outbox/cleanup endpoint |
| `RATE_LIMIT_HASH_KEY` | Server secret | Durable abuse-control identifier hashing |
| `STRIPE_SECRET_KEY` | Server secret | R2 checkout |
| `STRIPE_WEBHOOK_SECRET` | Server secret | R2 signed event handling |

Clinic address, timezone, active modes, opening hours, fees, policy versions and approved external hosts are validated business configuration, not random environment defaults. SMTP credentials belong in Supabase's secure provider configuration, not the frontend. Avoid committing actual project IDs, staff emails or provider URLs unless intentionally public and necessary.

## Capability behavior

In demo, show synthetic preview states with a visible label and no outbound calls. In live, missing credentials/configuration return an honest unavailable state; no silent demo fallback. A disabled commercial capability removes purchase promises and active CTAs, not merely the button handler. Log sanitized integration error codes and request IDs. External outages must never expose secret provider responses to a patient.
