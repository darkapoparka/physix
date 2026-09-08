# Data ownership and authorization plan

This is an engineering contract, not a legal compliance certificate. Clinic-specific health-data, consent, retention and notice requirements require an identified responsible reviewer in D-025/D-029. No real patient data enters development fixtures or this repository.

## Identity and ownership model

Keep user identity, clinic membership, staff role, therapist-client assignment, appointment, care-plan assignment, session and community participation distinct. Every private object has an unambiguous clinic and owner/assignment chain. IDs in requests are selectors, never proof of access. Preserve the inherited application-session revocation checks and provider verification while mapping coach/workspace semantics into clinic terminology.

## Permission matrix: minimum proposed grants

| Data/action | Visitor | Client | Assigned therapist | Reception | Clinic admin | Moderator |
|---|---|---|---|---|---|---|
| Published clinic/service/event content | Read | Read | Read | Read | Manage approved clinic content | Manage authorized community content |
| Available times | Public safe DTO | Read/book eligible | Own schedule | Operational calendar | Configure rules | No special access |
| Appointment/contact detail | None | Own | Assigned visits | Clinic operational scope | Operational scope | None |
| Private plan/feedback/messages | None | Own | Assigned scope | None | None unless separately assigned/authorized | None |
| Intake/private documents | None | Own permitted fields | Approved assigned scope | Only explicitly allowed administrative fields | No implicit clinical access | None |
| Roles/service configuration | None | None | No general grant | No general grant | Least-privilege administration | None |
| Private RSVP list | None | Own participation | Only if event-authorized | Only if event-authorized | Operational event scope | Authorized event scope |
| Audit/export/lifecycle | None | Own request/status | Limited action history | Limited action history | Audited operational role | Limited moderation history |

User combinations need tests: another client of the same therapist; another therapist in the same clinic; another clinic's therapist/admin; removed staff; suspended client; moderator-only account; anonymous caller; expired/revoked session. Emergency/break-glass access is not implemented by default and needs a separately reviewed policy if required.

## Enforcement layers

- Verify identity and live application session on private requests. Preserve same-origin/CSRF rules for cookie writes and reject conflicting bearer/cookie identity.
- Resolve each requested object's clinic/assignment and enforce role before returning a narrowly shaped DTO. Public fields are an allowlist, not private DTOs with a few keys deleted.
- Apply row-level policies, restrictive grants and transactional functions/constraints so direct REST/RPC/database paths cannot bypass business rules. Do not put a service-role key in the web app/browser.
- Server-owned fields include role, clinic/owner, payment/booking final state, published version and review author. Reject attempts to overwrite them through generic member save commands.
- Staff MFA, sign-out/revocation, invitation recipient/expiry, account switching and private draft cleanup must be tested. Namespaces must be Physix-specific; localhost ports share cookies by hostname, so another port is not cookie isolation.
- Private API/media responses must not enter shared caches. Authenticated providers live only under private layouts. Public HTML, metadata, structured data and serialized hydration payloads must be free of private fields.
- Errors/logs carry safe codes/request IDs, not tokens, signed URLs, email bodies, clinical notes or full provider responses. Rate limits cover auth, booking, uploads and public enumeration paths.

## Migration and integrity

Inventory the 18 inherited migrations and actual schema before adding tables. Use additive versioned migrations, constraints and explicit backfills with dry-run counts/rollback strategy. Never rename coach/workspace fields globally without mapping access policies, history and foreign keys. Published data remains immutable; corrections are audited. Money uses currency plus integer minor units; dates, UTC instants and IANA timezone have separate semantics. Use explicit measurement units, never localized labels as identifiers.

Keep provider event processing idempotent with replay/out-of-order handling. Reservation/payment states are distinct. Persist outbox intent transactionally; retry side effects with a bounded worker and operational failure visibility. Never rely on an unawaited web-request promise for durable work.

## Privacy lifecycle

Maintain a data inventory: purpose, sensitivity, owner, permitted readers, storage location, retention rule, export behavior and deletion/retention exceptions. Cover auth/account, appointments, intake, plans, logs, messages, uploads, billing, community, audit records, provider copies and backups. Resolve each retention rule with the clinic; do not invent periods.

Implement authenticated export and deletion/correction requests with status and durable processing. Verify authorization and identity; preserve records only where the resolved policy requires it; record why a request is partial or deferred. Deleting a database row alone does not prove object/provider/backups lifecycle completion. Don't claim fulfilled before the configured actions and exception reporting finish. Notifications/preferences and required care processing must not be conflated into a single consent checkbox.

## Release security proof

Negative direct API/database tests, real-provider staged auth/MFA checks, cache/media isolation, booking races, stale writes, job retries, least-privilege staff scenarios, audit events and lifecycle tests are required. See VERIFICATION.md and PX-035. A secret scan and passing unit tests are useful but insufficient.
