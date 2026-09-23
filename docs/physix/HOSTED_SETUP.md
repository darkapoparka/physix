# Dedicated PhysiX backend

Created with explicit owner approval on 23 September 2026 in darkapoparka's Org. Project: wcqibswrmtunjfopzabh, Frankfurt (eu-central-1). Quoted project cost: $0/month. Dashboard: https://supabase.com/dashboard/project/wcqibswrmtunjfopzabh . Gymaf project crhcgcqanoeoddmwaqhb was not changed or queried for patient data.

The hosted adapter is pinned to this PhysiX project and accepts only its publishable key. The four retained care migrations are code reuse within the new database; their internal compatibility names do not connect to the Gymaf service. Unrelated public coach and fitness command RPCs are revoked for client roles. No service-role key is used by the application. Local PGlite data and local persona authentication remain development-only.

## Implemented and tested

Dedicated schema, public service projection, bounded free-slot query, verified-account reservation/cancellation with database overlap exclusion, policy/price snapshots, buffers, minimum/cancellation notice and idempotent retries. Native API routes delegate only allowlisted operations to this database. Existing booking steps, saved appointment detail, calendar export and patient views are reused. Hosted payment model is pay at visit; no payment processing or video-link creation is implied.

No fixture accounts or hours were uploaded. The three owner-approved service names are published for browsing. booking_enabled is false for all offers. No practitioner, duration, price or clinical availability has been invented. Reading free slots returns an empty list until configuration is supplied.

## Required before live reservations

1. Sign in to the Supabase dashboard. Set Authentication URL Configuration site URL to https://physix-sable.vercel.app and allow the exact redirect https://physix-sable.vercel.app/auth/callback. Email template must contain ConfirmationURL and/or Token. Configure a verified production SMTP sender: the default Supabase email service is not a verified public delivery path. Test delivery, expired codes, PKCE and session recovery with an owner-controlled synthetic account. Only then set PHYSIX_AUTH_READY=1 in Vercel production and redeploy. Authentication endpoints currently fail closed while that flag is absent.
2. Owner must provide practitioner identity/account, real working windows, timezone, service/mode durations, fee/currency, location or approved online process, minimum notice, cancellation rules and accepted policy text/version. Confirm PhysiX is authoritative, or specify the existing scheduling system. Configure approved offers/windows before enabling booking; do not use local fixture times.
3. Staff scheduling interface, production email confirmation/reminder outbox, payment integrations, and full hosted clinical workflows are not delivered by this booking adapter. Hosted care mutation endpoints remain disabled. Booking cannot be called release-ready from the database tests alone.

## Configuration

Vercel production uses PHYSIX_HOSTED_BACKEND=1, PHYSIX_SUPABASE_URL for the dedicated project, PHYSIX_SUPABASE_PUBLISHABLE_KEY and PHYSIX_APP_ORIGIN=https://physix-sable.vercel.app. PHYSIX_AUTH_READY stays absent until email configuration is verified. Old SUPABASE_URL and local-test variables are not used as fallbacks.

## Validation and advisors

scripts/physix-hosted-check.mjs creates a separate in-memory database: verifies empty unpublished availability, configured timezone, persisted reservation, replay even after offer disabling, changed payload denial, overlap denial, other-patient/anonymous denial, policy validation, cancellation/retry and slot release. No saved local or hosted records are touched by this test. The configuration unit test rejects the donor URL, secret keys and malformed origins.

Supabase security advisors report intentional default-deny RLS on availability and deliberate SECURITY DEFINER entry points for bounded public slots and authenticated session/booking commands. Raw availability and patient tables are not public; the new commands authorize the actor before mutation. Unrelated public-coach/fitness grants were revoked. See https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable and https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable . Inherited core foreign-key index suggestions remain informational; no live load/performance claim is made.

A local production process with hosted configuration was blocked by automatic approval review; the rejection gave no more specific reason. Verification uses the permitted production build, isolated SQL tests and deployed public/API checks. Email authentication and an end-to-end hosted reservation remain unverified until the owner supplies the outstanding configuration.
