# Centre homepage — 20 September 2026

Entry: `45901db4942f6f8e2363171e97c203afa6c63663`, branch `main`, clean. Canonical source: `M:\physix-app`; existing `npm run dev` listener on `127.0.0.1:3217` retained.

## Implemented

A clinic introduction/search hero; horizontally scrollable treatment cards on mobile; two matching visit options (in-clinic and online) stacked on mobile and paired on desktop; ongoing patient care with direct programme links; native first-visit disclosures. Visit information uses the existing modal Sheet with focus restoration.

Only Home TSX/CSS and new `home-visits.tsx` changed in application source. Booking, authentication, private care, the database, global CSS, shared cards and the fixed navigation are unchanged. Existing images are reused as decorative illustrations, not actual practitioner/clinic photographs.

Clinic address, hours, arrival information and video provider are unconfirmed. The information sheets state this, with no fictional map/directions or live meeting. Charlie's actual photograph is still needed before depicting him.

## Verification

- `npm run test:home`: 11 checks, four full-page captures at 320/390/768/1440px. Keyboard rail scrolling, focus-visible service access, both visit entry modes, native FAQ, sheet focus/Escape and honest location state.
- `npm run test:ui`: 43 assertions, 28 route/viewport records. Service/search destinations, reservation failure/retry/persistence/cancellation, browser history, large-text reflow, preserved patient history and error buffer.
- `npm run test:navigation`: 23 assertions, 28 route/viewport records. Unchanged dock/header across sign-in, exact return destinations, protected data and owned programmes.
- Typecheck, changed-file ESLint, 95 unit tests and production build passed. Six asset-integrity checks and 45 production-isolation requests passed.

No new booking/workout backend was implemented or reset. Browser booking writes are existing synthetic test behaviour; no real clinic provider was contacted. Passing checks do not constitute owner visual approval, real-device/assistive-technology certification or live clinic readiness.

## Evidence and intermediate check

Selected compressed full-page captures and final logs/results are adjacent. Source scope and donor digest are in `source-check.json`. Raw capture/log files are retained in the scratch path recorded there.

An initial pointer-automation check tried to activate a clipped rail card without revealing it. The runner now scrolls that actual card into view before pointer activation; destination assertions remain. Keyboard scrolling and focus visibility are separately verified. Final browser suites passed; no browser-error assertion was removed.
