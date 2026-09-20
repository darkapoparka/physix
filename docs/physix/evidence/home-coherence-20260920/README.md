# Home coherence — 20 September 2026

Canonical checkout: M:\physix-app, main. Entry commit: c99a5c4ecc749dcc5f9eb26a16232ff758ff136b, clean.
Runtime: npm run dev, http://127.0.0.1:3217, synthetic local-test data.

## Implemented scope

One How we can help collection with Services / By area links and consistent CareCard geometry. Online consultation is part of the service collection. The separate Find your focus stack and bespoke online banner are removed. One forest banner leads to /care/programmes. Existing assets, white canvas, hero copy, typography, high search and stable primary dock are preserved.

Browse categories are server-rendered and URL-backed. Reload and browser Back retain the category; area cards map to the existing physiotherapy service without including symptoms in URLs. Unsupported category values fall back to services. No new offers, clinical content, dependencies or media.

Only home.tsx, home.module.css and the Home branch of the public route changed in application source. source-check.json records exact file digests and verifies the rest of that route, booking/private code, shared CareCard and dock stayed unchanged. The Gym Fidelity donor diff also stayed unchanged. No database reset, provider configuration, push or deployment.

## Verification

95 unit tests; TypeScript; changed-file lint; production build; six asset checks; 45 production-exclusion requests passed. 41 Home/shared UI checks and 23 stable-navigation checks passed. Existing reservation acknowledgement, failed request/retry, saved appointment/reload and preserved workout IDs were exercised by the UI suite.

Both Home browse views were captured at 320x740, 390x844, 768x1000 and 1440x1000. Doubled-computed-font checks cover both at 320/390/768. Selected compressed captures are adjacent; full captures/logs remain in C:\Users\radev\AppData\Local\Temp\physix-home-order-cwgLDi. The final browser suites reported no uncaught errors.

An initial successful run preceded additional two-view viewport coverage; ui-results.json and ui.log are the final expanded run. No behavioral assertion was removed to hide a failure. Local identity entry is conditional; the final run reused a test identity from the earlier pass.

## Limits

This is a Home composition correction, not owner visual approval or real-device/accessibility certification. Dedicated exercise-player and database suites were not rerun for this Home-only patch; their source is unchanged. Synthetic local reservations are not live clinic appointments. Real Auth, clinical media and paid fulfilment remain separate release work.
