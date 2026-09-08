# Quality strategy and release gates

A beautiful screenshot is not functional verification. This handoff contains no implemented application and reports no application tests as passed. Test evidence begins with local bootstrap. [Tasks](tasks.md) is the only completion checklist.

## Test layers

| Layer | Tool / purpose | Minimum coverage |
|---|---|---|
| Static | Svelte check, TypeScript, ESLint, Prettier | Component/route types, imports, syntax, formatting |
| Unit/component | Vitest; official generated Svelte-compatible setup | Catalogue search, locale/money/date formatting, validation, component states |
| Browser | Playwright, Chromium + WebKit; Firefox smoke where feasible | Public journeys, keyboard, forms, private routing, error recovery |
| Database | Supabase local tests / pgTAP plus concurrency harness | RLS/grants, RPC authorization, exclusion constraints, migration upgrades |
| Accessibility | axe-core + manual keyboard/screen reader review | Semantics, names, contrast, focus, reflow, dock obstruction |
| Visual | Saved Playwright screenshots with deterministic fixtures | 360/390/430 mobile, 768 tablet, 1280/1440 desktop, Bulgarian/English |
| Integration | Local/staging providers in test mode | Auth mail, outbox failures, video-link access, R2 webhook fulfillment |

Pure unit tests cannot prove a database race safe. Browser tests with mocked data cannot prove RLS works. Automated accessibility checks cannot prove the entire interface is accessible.

## M0 acceptance

Fresh install with no `.env`/cloud keys -> start -> public homepage and service finder work in clearly local demo mode. No Supabase configuration crash, runtime console error, document-wide horizontal overflow or remote provider side effect. Header/menu/dock, service details, online information, booking preview and account preview are usable; synthetic previews are visibly labelled and cannot confirm a real appointment.

At 390 x 844, readable text and targets take precedence over showing the whole poster. At 320 CSS pixels and increased text size, content wraps rather than clips. Use page zoom and screen-reader checks; a two-line English hero is a preference, not permission to hide localized text. Test dock safe area, browser bottom UI, virtual keyboard, open menu/search and last-content visibility. Hide neither focus nor errors behind fixed controls. No iPhone status-bar decoration in the web UI.

## R1 critical journeys

Public to confirmed appointment with email verification; returning patient to own appointment; expired auth with safe return; stale slot; empty availability; staff preparation queue; phone booking; reschedule success and conflict rollback; cancel with policy boundary; missing online link; confirmation email outage after successful booking.

Database tests must prove public/private separation; user A cannot read/write user B; no role escalation through profiles; reception lacks clinical access; revoked staff and missing MFA fail; protected views/RPCs do not bypass intended checks. Exercise direct API access, not only UI routes.

Concurrency harness: two authenticated clients start overlapping confirmations simultaneously. Exactly one permitted occupancy persists; the other returns a domain conflict. Repeat across online/in-clinic modes, manual entries, buffers, blocks, schedule edits and identical/different idempotency payloads. The result is checked in the database, not inferred from button state.

Time tests include Sofia daylight-saving transitions, UTC/browser timezone differences, midnight, end-of-month/year, past time, lead-time/horizon edges and canceled occupancy. Use fixed clock fixtures; never depend on the actual day in CI.

## R2 critical journeys

Invalid/duplicate/reordered webhooks, return before/after fulfillment, delayed payment success/failure, wrong currency/amount, abandoned checkout, duplicate checkout requests, refunded/revoked entitlement, unauthorized programme/media access, signed-link expiry, clinician draft/published/versioned assignment access. Test payments only; never run real charges as a developer test.

## CI once application exists

On pull requests: frozen dependency install, format/lint/check, non-watch unit tests, production build, public/demo browser smoke and documentation/asset validation. R1 adds a local Supabase test job with synthetic seed and database invariants. Protect the integration branch/main with appropriate review and passing checks when the owner enables repository settings; this handoff does not change them.

Normalize scripts as specified in [bootstrap](bootstrap.md), and make `pnpm test:unit` noninteractive. Upload browser artifacts only from synthetic/demo contexts. Pin CI action revisions or follow an explicitly reviewed update policy. Do not give untrusted PR workflows production credentials.

## Performance budgets: project targets, not measured results

Target mobile public LCP <= 2.5 s, INP <= 200 ms and CLS <= 0.1 under the measurement strategy documented at implementation. Use lab results before launch and privacy-reviewed aggregate field measurement later. Aim for <= 200 KB compressed initial client JavaScript on the public homepage and <= 500 KB above-fold image transfer on the mobile test configuration; inspect actual bundles rather than arguing from framework marketing.

Reserve image dimensions, serve appropriate responsive sizes, prioritize only the true hero image, lazy-load below-fold imagery, avoid autoplay video and full icon-library imports. Private programme videos are loaded on demand. Asset byte budgets and contrast decisions are in [design system](design-system.md).

## Evidence format

For each completed task record commit, exact commands, environment, results and paths to sanitized screenshots/reports. List checks not run and why. At the end of a session run relevant targeted checks; before milestone completion run the complete gate. Do not run a full suite after every line edit, but do not replace release evidence with confidence.
