# Deployment, launch and operations runbook

No environment has been deployed by this handoff. This document defines work needed before handling real people and appointments.

## Environment separation

Local M0 is no-key demo mode. Local R1 uses local Supabase, synthetic mail and fake identities. Staging uses a separate approved project, test credentials and no real patients. Production has its own database, secrets, domains, vendor configuration and backups. A PR preview must never inherit production patient access.

Use the selected supported Node runtime consistently locally, in CI and hosting. Store secrets in provider settings; commit an empty/example-only `.env.example`. Validate `APP_MODE`, canonical origin, provider readiness and clinic configuration before live features start. Missing live services produce unavailable states, not demo data.

## Deploy sequence

Review application changes, passing gates and migrations. Test the migration from the currently deployed schema on an isolated environment. Prefer additive backward-compatible schema changes; separate destructive cleanup into a later reviewed migration. Apply approved migrations through the owner's deployment process, deploy compatible app, and run synthetic production-safe smoke checks that create no unintended appointments or charges. Keep the previous compatible application deploy available for rollback.

Do not treat database rollback as reverting Git. Document restore/roll-forward options before schema changes. Cloud resource creation, changing paid plans, live migrations, DNS edits, outgoing campaigns and production deletion require explicit owner approval.

## Launch gate

The owner approves real business identity, location, contact, opening hours, scope of practice, actual credentials, service/fee/duration list and cancellation/payment terms. Clinician approves service and online-care copy. All placeholder claims and fictional testimonials are removed or hidden. Bulgarian text and any launched English translation are reviewed. Check every public link and asset licence.

Security review covers RLS/grants, staff MFA, private file access, secret isolation, backups, retention/export/deletion, vendor agreements and incident response. Clinical/AI review is separate; an R1 launch does not authorize future AI. Verify current local consumer, pricing and health-data obligations with appropriate advisers.

Operational rehearsal: staff enters phone bookings in the authoritative calendar; online links are prepared; reminders and failure queues run; reception knows cancellation/reschedule rules; verified contact and fallback instructions exist. Test the actual sending domain and email templates. Do not enable online appointments without a real preparation process and a staffed contact route.

## Backups and restore

Determine database backup/PITR availability and retention for the chosen Supabase plan. Storage objects need a separate backup/recovery plan; do not assume a database backup contains media files. Keep encrypted, access-controlled backups only in approved locations. Set owner-approved recovery point/time targets and test a restore into an isolated environment. Record measured recovery results before launch; an untested backup is not a proven recovery capability.

Application source/lockfile/migrations are in Git, but Git is not a patient-data backup. Protect provider owner accounts with MFA and maintain controlled recovery access. Do not share recovery keys in docs.

## Outbox and job operations

Authenticated scheduled workers claim a bounded batch with leases, retry transient errors and quarantine persistent failures. Alert on queue age, repeated delivery failures, missing online links, elevated booking conflicts/errors and exhausted service limits. Suppress obsolete appointment-revision reminders. Monitor actual schedule execution; a configured cron expression is not proof of delivered work.

Use sanitized event IDs and error codes. No patient names, emails, symptom input, OTP tokens or private meeting URLs in observability dashboards unless an explicitly authorized minimal operational display requires them. Disable session replay on private journeys.

## Incident response

Assign an actual owner and backup contact privately before launch. For suspected exposure, restrict affected access, preserve minimal forensic evidence securely, rotate compromised credentials, determine affected processing and follow the approved legal notification assessment. Do not post patient examples in public GitHub issues. For booking failures, stop new confirmations if integrity is uncertain and provide the approved clinic contact path; do not invent availability.

For provider outage, show truthful status, keep already confirmed appointments durable and use the staff queue to recover delivery. For an AI/clinical content concern, disable the affected capability/content version and route to the responsible clinician; no silent model substitution.

## Routine maintenance

Daily clinic operation: agenda, blocked time, online-link readiness, failed notifications. Regular engineering review: dependency/security updates, failing jobs, backup success, access grants, log retention and vendor changes. Review clinical content on a clinician-set schedule and version changes. Re-run role tests whenever schema/policies change. Keep a short operational record outside public source control for sensitive matters.
