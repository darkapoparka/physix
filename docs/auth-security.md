# Authentication, authorization and privacy engineering

This is an engineering control plan, not legal certification. The owner needs appropriate Bulgarian/EU privacy and clinical advice before processing live patient data. The repository is public: no secrets or real patient information may enter Git, screenshots, issue comments or AI-agent prompts.

## Identity

Use Supabase Auth passwordless email verification and its current supported SvelteKit SSR integration. Public browsing and slot exploration need no login. Final confirmation and private account access require verified identity; distinguish an `authenticated` anonymous Auth user from a verified permanent user. Do not implement passwords, a second authentication system, or custom cryptography.

Create a request-scoped SSR client and follow current official cookie/refresh guidance. Verify identity server-side with supported verified claims/user validation; do not authorize from an unverified `getSession()` payload or a browser store. Validate redirect targets against internal allowed routes, reject protocol-relative/external targets, and avoid caching responses that set auth cookies. Use HTTPS and suitable cookie settings; do not blindly change SDK cookie flags in ways that break supported refresh behavior.

Require MFA for staff and enforce its verified assurance level at sensitive server/RPC boundaries, not only by hiding UI. Bootstrap the first admin through a trusted owner-controlled operation. A patient's editable profile or `user_metadata` can never grant staff privileges. Store current staff grants in database-controlled membership records; revoke access promptly when membership is disabled.

## Permission matrix

| Capability | Public | Patient | Reception | Clinician | Admin |
|---|---|---|---|---|---|
| Published content and available slots | Yes | Yes | Yes | Yes | Yes |
| Own appointment-safe details | No | Own | Administrative scope | Assigned/authorized scope | Administrative scope |
| Create own booking / policy-permitted changes | No | Own via controlled functions | Manual operations | Manual operations | Manual operations |
| Contact details and session preparation | No | Own | Required administrative scope | Assigned/authorized scope | Required administrative scope |
| Staff memberships / operational configuration | No | No | No | Limited schedule scope | Yes |
| R2 clinical draft/plan contents | No | Published assigned versions only | No | Assigned clinical scope | Only with an explicit clinical grant |
| Orders/entitlements | No | Own | Support subset if authorized | Not automatically | Financial/admin subset |
| Secret keys / raw provider payloads | No | No | No | No | Never through browser UI |

Every protected load, action, endpoint, SQL function and signed-URL issuance checks its own authorization. Route-layout guards alone are insufficient. Nonexistent and inaccessible private resources should not disclose ownership or existence.

## Database and Storage

Apply explicit grants plus RLS to every exposed table. Revoke broad client mutation grants and route critical writes through narrowly scoped SQL functions. For `SECURITY DEFINER` functions, use a fixed safe search path, qualified objects, explicit identity/role checks and minimal execute grants. Review helper functions, views, Storage policies and RPCs as carefully as tables. Service-role/secret clients bypass RLS and must stay server-only, restricted to justified jobs and provider processing.

Public assets and private media use different buckets/prefix policies. Issue short-lived private URLs only after an ownership/entitlement check. Never put patient files or a private plan export in `static/`. No patient uploads in R1; R2 upload support needs MIME/content/size validation, malware handling and retention design before enabling it.

## Application controls

Retain SvelteKit origin/CSRF protections. Mutations use POST; webhooks use separate signature verification, not disabled site-wide protections. Validate all input server-side, constrain lengths and allowed values, and avoid HTML rendering of user text. Use parameterized queries/RPCs and server-resolved prices/identities. Apply a restrictive, tested Content Security Policy and safe external-link handling.

Use durable rate limits for OTP requests/verification, draft creation, availability enumeration and confirmations. In-memory counters do not protect multiple serverless instances. Limits can use short-lived keyed/HMAC hashes of IP and email rather than indefinite raw identifiers. Only trust forwarded IP headers from the configured hosting proxy. Document retention and test that legitimate users can recover from throttling.

No raw health input, contact information, auth tokens, private URLs, payment data or provider webhook payloads in logs. Use correlation IDs, route templates and sanitized domain error codes. Disable session replay and third-party marketing pixels on booking/account/online intake paths. Public symptom search remains local and is excluded from analytics.

## Privacy launch review

Health-related information requires special handling under GDPR; a lawful basis and an applicable special-category condition must be established where relevant, not replaced by a generic checkbox. Document purposes, minimization, controller/processor roles, notices, access requests, retention, incident response and vendor agreements. Determine whether a DPIA is required for the actual processing, particularly future AI/clinical workflows. EU-region selection alone does not settle international-transfer obligations. See [research](research.md) for the primary law.

R1 collects only operational booking data. Keep clinical history/intake off the public booking flow until reviewed. Maintain separate records for applicable policy acknowledgement, marketing preferences and any legally required clinical/data consent; never preselect optional marketing.

Implement authenticated export/deletion requests and staff handling, with identity verification, audit, documented response procedure and legally justified retention exceptions. Backups and sent emails have different deletion characteristics; do not promise immediate erasure everywhere. Stop collecting data if the owner cannot operate these controls.

## Security verification

Test anonymous and cross-user reads/writes directly against the Data API and RPCs, not only through the UI. Test role escalation, revoked membership, missing MFA, expired sessions, hostile redirect values, signed-link leakage, webhook tampering and production preview isolation. A public Supabase publishable key is expected; its safety depends on policies. No real service key belongs in a `PUBLIC_` variable or compiled client bundle.
