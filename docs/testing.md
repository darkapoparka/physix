# Quality strategy and release gates

A source checkout, design screenshot or documentation check is not functional verification. PhysiX application evidence starts with local bootstrap. Upstream reports cover only the source commits/scenarios they actually tested. [Tasks](tasks.md) is the single completion record.

## Layers

| Layer | Tool/purpose |
|---|---|
| Handoff tooling | Node built-in tests, doc links/current instructions, Git pin/inventory and common source-boundary guard |
| Static app | Next route type generation + TypeScript, ESLint, Prettier, production build |
| Unit/component | Vitest + React Testing Library for pure rules and supported synchronous/client component tests |
| Browser | Playwright Chromium/WebKit; Firefox smoke where practical; real server routes and async Server Components |
| Database | Isolated Supabase/Postgres tests for grants/RLS/functions/races and migration upgrades |
| Accessibility | axe plus manual keyboard/screen-reader/reflow/contrast/focus review |
| Visual | Deterministic synthetic screenshots on actual mobile/desktop viewports |
| Providers | Local/test-mode auth/outbox/private-media/payment integration, never real clients/cards |

Async server rendering cannot be assumed to work in a unit component renderer; use Next's documented browser/integration approach. Unit tests cannot prove DB concurrency; mocked browser APIs cannot prove RLS; automated accessibility checks are not a full accessibility audit.

## Handoff checks

`node --test tests/tooling/handoff.test.mjs` checks helper behaviors without network or app packages. `node scripts/check-handoff.mjs` checks local Markdown targets, obsolete active stack instructions, pin metadata and common direct vendor-import patterns. `node scripts/verify-upstream.mjs --require-checkout` verifies initialized source HEAD/cleanliness and candidate blob IDs.

The handoff workflow runs only this preparation layer on synthetic/source material, not Gymaf lifecycle scripts or real providers. The import-pattern guard is a useful tripwire, not a complete module/deployment security proof. Application work must add actual lint restrictions, explicit tool discovery scopes and artifact inspection.

## M0 gate

Fresh root install with no .env/cloud keys -> local public UI, finder and clearly labelled previews work. No Supabase configuration crash, fake sign-in/server-save claim, real provider side effect, console errors or document-wide overflow. The original visual source and connected logic are not imported from vendor at runtime. Build/test once with the source submodule uninitialized in a disposable clean checkout.

Review Home first viewport and scroll, Services/detail, booking selection, Online, appointment-only Account preview, active-plan preview and session controls. Test 390x844 and 1440px screenshots, 320px reflow, 360/430px and tablet as appropriate, BG/EN long strings, text enlargement and keyboard. The two-line hero is a preference, not permission to shrink text. Docks/sticky actions must not hide fields/errors/final content or compete with the browser keyboard/toolbars.

All adapted inventory entries need actual target/provenance and test evidence. Check for capture-link/context/local-store/reference cropping and foreign branding; no leftover demo dependency in owned runtime code. Missing media is an explicit gap, not silently replaced with fake practitioner identities.

## R1 gate

Real email verification -> durable booking -> authenticated own visit. Returning account works without a coaching relationship/subscription. Exercise expiry/refresh/logout/cross-tab/back navigation, safe returns, generic OTP errors and durable abuse limits. Private data is not cached across users, including fresh requests/instances and prefetched views.

Direct DB/API/RPC tests: patient A cannot read/write B; profiles cannot escalate roles; staff revocation/missing MFA rejected; reception lacks clinical access; inaccessible IDs don't leak ownership. Test relevant views/functions/storage, not just route guards.

Scheduling race harness: simultaneous overlapping confirmations produce one valid occupancy and a recoverable conflict. Repeat across online/in-clinic/manual visits, blocks, buffers, schedule edits and duplicate/same-key-different-payload requests. Verify database state. Reschedule conflicts retain the original visit. Test midnight, month/year boundaries, lead/horizon edges and Sofia DST against fixed clocks.

Provider/operations: confirmation delivery fails after durable success, stale slot, no availability, missing video link, retry queue, obsolete reminder, staff preparation, phone booking and policy cutoff recovery. All failures have truthful useful UI.

## R2 gate

Care: draft inaccessible; clinician publishes/assigns; intended patient starts/logs/reloads/resumes; another patient/reception denied; expected revisions and retry IDs avoid lost/duplicate logs. Distinct attempts, pause timing, blank/zero/skipped, history immutability, assignment revocation and private-media expiry. No forced default gym targets or automatic replacement exercise. Test the minimal persistence slice before broad feature porting.

Education: duplicate/reordered/tampered/delayed webhooks, browser return before/after fulfillment, wrong amount/currency, abandoned/duplicate checkout, refund/revocation, unauthorized lesson/media and signed-link expiry. Test mode only. No payment success state publishes clinical care.

## App CI after scaffold

Frozen root dependency install, handoff/tool tests, lint/format/typecheck, non-watch app unit tests, build and synthetic browser smoke. Separate local DB job after R1; no production credentials on PR workflows. Explicitly exclude vendor from test/type/lint/Tailwind scopes. Pin external actions or adopt a reviewed update policy. Preserve the handoff workflow and add app CI rather than overwriting it with upstream configuration.

## Performance and evidence

Targets, not measured claims: mobile public LCP <=2.5s, INP <=200ms, CLS <=0.1; aim for <=200KB compressed initial public client JS and <=500KB above-fold image transfer under a recorded measurement setup. Keep public composition on the server, reserve media dimensions, load videos on demand, avoid autoplay/global icon imports and inspect actual bundles. Never put private data into telemetry to measure this.

Record commit, environment, exact commands/results, sanitized screenshots/report paths, checks not run and unresolved limitations. Full suites are required at gates, not after every line. Do not replace evidence with confidence or 'upstream already did it'.
