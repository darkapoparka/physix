# Authentication, authorization and privacy engineering

This is a control plan, not legal/clinical certification. The repository is public: never commit secrets, real patient information, private links or identifiable logs/screenshots. The existing privacy/clinical launch reviews remain required.

## One identity system

Use Supabase Auth passwordless email verification and the current official **Next.js SSR** integration with request-scoped clients. Public browsing and availability require no login. Confirming an appointment and private-account access require verified permanent identity, not merely an anonymous authenticated session.

Gymaf's `src/server/gymaf/auth.ts` and `http.ts` are reference, not copy-in auth. Do not combine their custom access/refresh cookie handling and application-session RPCs with the chosen SDK SSR flow. No password implementation, cross-product SSO, shared customer account table or second Auth provider.

Follow official cookie/refresh guidance for the installed SDK. Verify identity on the server through supported verified claims/user validation; `getSession()` payloads and browser stores are not authorization. For sensitive operations, verify current user/account status and current database role/assignment rather than relying on stale UI/JWT metadata. Define and test sign-out/revocation behavior, including provider token lifetime limitations; do not promise instant global revocation without enforcing it.

Next Proxy may refresh cookies and make lightweight routing checks. It is not the sole access-control layer. Every protected Server Component data-access function, Server Action, Route Handler, RPC and signed-media operation verifies identity/ownership/permission. Use `import 'server-only'`; do not pass full account records to Client Components. Do not cache responses that contain private data or set auth cookies. No shared `use cache`/CDN caching of patient results.

Validate return targets against internal locale-aware routes. Reject external/protocol-relative URLs and unsafe auth loops. Use HTTPS, supported secure cookie settings, and correct SDK refresh propagation; don't arbitrarily change cookie flags in a way that breaks the supported flow.

## Roles

| Capability | Public | Patient | Reception | Clinician | Admin |
|---|---|---|---|---|---|
| Published content/slots | Yes | Yes | Yes | Yes | Yes |
| Patient appointment-safe details | No | Own | Required administrative scope | Authorized scope | Required administrative scope |
| Own booking/policy changes | No | Own controlled operations | Manual operations | Manual operations | Manual operations |
| Clinical plan drafts | No | No | No | Assigned clinical scope | Only with explicit clinical grant |
| Published assigned plan/activity | No | Own | No | Assigned clinical scope | Only with explicit clinical grant |
| Staff memberships/config | No | No | No | Delegated subset | Yes |
| Orders/entitlements | No | Own | Approved support subset | Not automatic | Financial/support subset |
| Secrets/raw provider payloads | No | No | No | No | Never through browser UI |

Require verified MFA assurance for staff at server and SQL operation boundaries. Trusted owner-controlled provisioning creates the initial admin; editable profile/user_metadata never grants staff roles. Current database memberships/assignments control access and revocation. Generic admin access does not imply clinical authorization. Inaccessible and nonexistent private IDs must not leak ownership/existence.

## Database and files

Explicit grants and RLS accompany every exposed table. Critical scheduling/plan/publication writes use narrowly scoped SQL functions, not browser direct writes. SECURITY DEFINER functions require safe fixed search_path, qualified objects, identity/role checks and minimal execute grants. Audit views/helper functions/Storage policies as well as tables. Restrict secret/service-role clients to justified jobs/provider processing; their RLS bypass is not an authorization plan.

Separate public images from private media. Sign URLs only after ownership/entitlement checks, with short lifetimes and revocation limits explained. No patient or protected programme content in `public/`. Patient uploads are out of R1; later additions need content/type/size validation, malware handling and retention design.

## Requests, abuse and caching

Keep Next Server Action origin protections; validate authorization/inputs anyway. Explicit Route Handler mutations use POST and deliberate same-origin/CSRF protection appropriate to their session mechanism. Webhook signatures are verified separately on raw bodies; never disable protections globally to make a provider work. Reject unbounded JSON/text, unknown fields where appropriate, unsupported operations and untrusted owner/price values. Use parameterized SQL/RPCs and render untrusted text as text.

OTP requests/verification, draft creation, availability and confirmation need durable distributed abuse controls. In-memory serverless limits are insufficient. Use short-lived keyed hashes for identifiers where appropriate, trust proxy headers only from configured infrastructure and document retention. Test legitimate recovery from throttling.

Apply a tested CSP and safe external-link handling. No sensitive query strings, raw request/provider bodies, tokens, clinical text, contact fields or meeting URLs in telemetry. Disable session replay/marketing pixels on private/booking journeys. Search text remains local; route-level analytics must not expose inferred health interests. Use safe error codes/request IDs.

## Privacy and clinical launch review

Establish actual processing purposes, lawful basis and applicable special-category conditions, minimization, notices, roles, recipient/vendor agreements, retention, rights procedures and incident response with appropriate Bulgarian/EU advice. Determine DPIA needs for the actual service. A generic checkbox or EU region alone is not sufficient evidence. See [research](research.md) for the retained primary-law references.

R1 collects operational booking information, not a broad health history. Keep policy acknowledgements, marketing choice and any applicable clinical/data consent separate. No preselected optional marketing. Authenticated export/deletion requests need identity checks, documented handling and lawful retention exceptions; do not promise immediate erasure from every backup/email.

## Verification

Test auth refresh/expiry/logout in real browsers, cross-tab/back-forward stale private screens, hostile redirects and permission changes. Direct SQL/Data API/RPC tests must prove cross-user isolation, no metadata role escalation, reception clinical denial, revoked staff and missing-MFA rejection, private-media denial and live-mode preview denial. Test fresh instances with different users to catch shared-cache leakage.

A public Supabase publishable key is expected; policies make access safe. Privileged keys must never be exposed via `NEXT_PUBLIC_` variables, client bundles or browser logs. Handoff scripts and upstream CI do not certify these controls.
