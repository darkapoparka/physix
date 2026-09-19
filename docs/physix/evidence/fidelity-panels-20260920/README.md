# Fidelity card / solid-panel correction — 20 September 2026

Canonical checkout: M:/physix-app, main. Entry HEAD: 3d576065af4d3fa4f015866c85844891bf154586. Source file hashes and unchanged donor identity are in source-check.json. The commit containing this folder is the verified implementation checkpoint.

## Changed

White canvas retained. The rejected outlined thumbnail/bento layout was removed. CareCard shares Fidelity's media-first, rounded, solid-panel composition between public discovery and saved patient plans. Home has a three-service mobile rail / desktop grid, substantial Back/Neck cards, forest online-consultation banner and mint My Plan banner. CareWeek adapts the source weekly calendar using only stored schedule records. Original display typography roles return; the icon-only dock stays compact. No assets were regenerated.

Inspected reference: M:/gym-fidelity/src/components/home.tsx, globals.css and stored .artifacts/gymaf-bypass-final.png. Fresh donor browser navigation timed out; no current-runtime pixel parity is claimed. Donor files/runtime and backend/auth/SQL/storage source were unchanged.

## Verification on final source

- npm run typecheck: exit 0.
- npm exec -- eslint on changed TSX and browser scripts: exit 0. No full-repository lint claim.
- npm run test:unit: 74 passed, exit 0.
- npm run build: exit 0.
- npm run test:ui: 28 checks; 28 route/viewport records, exit 0.
- npm run test:local-browser: 25 checks; 28 responsive captures, exit 0.
- node scripts/physix-production-check.mjs: 36 production-isolation requests, exit 0.
- npm run test:assets: six original/derivative pairs unchanged, exit 0.

Browser widths: 320, 390, 768, 1440. Booking submit/retry/reload, actual set saves, pause/resume, history, staff reads/assignment and empty/unauthorized account paths remain exercised. An intermediate card-height defect covered Start session; corrected before final checks, with a new unobstructed-button hit-test. Final enlarged-text checks cover bounded Home computed-font stress, not real-device accessibility certification.

Selected WebP captures are in this folder. Complete PNG captures remain in the temporary verification folder on C:. Local Next listener remained on 3217 (observed PID 37476); original 3216 listener remained PID 23036. No database reset, cloud provisioning, real clinic booking, payment, push or deployment. All records are synthetic; visual owner approval remains open.
