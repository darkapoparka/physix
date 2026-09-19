# Mint UI and asset finalization

Source: M:\physix-app, main, entry HEAD 2f036ece3fe686fe5d1794223f88ff90070077fe. Recovered the existing uncommitted mint refresh instead of recreating it. See final Git checkpoint for committed source. Donor and saved app database were not changed by asset/UI work.

## Implemented

Six consistent semi-3D illustrations are installed in Home, services and programme covers. Original PNGs and generation/hash metadata are in docs/physix/assets/illustrations-v1. The six transparent 800px WebP sources total 485,980 bytes. They are decorative artwork, not staff portraits or exercise instructions.

Home has a short centered heading, search immediately below it, compact Book/Online actions and two-column illustrated mobile cards. Desktop uses three columns. Mint/jade/forest tokens replace lavender. The independent icon-only dock uses 44px circles: 200px public width and 252px patient width, with accessible names, focus and safe-area spacing. Supporting controls can be 32–36px.

A service tap opens available times immediately. Public service/mode/stage are tracked in native URL history; patient details and selected times are not. Back/Forward, failure/retry, saved reservation and menu focus were tested.

## Verified results

- npm run test:ui: 23 checks; 28 route/viewport records. Browser-results JSON and ui.log.
- npm run test:local-browser: 24 checks; 28 captures. Use saved-workflow-verified/results.json and saved-workflow-verified.log.
- npm run test:unit: 74 passed. npm run lint and typecheck: exit 0; two existing coach navigation warnings remain.
- npm run test:assets: 6 originals/derivatives verified, including dimensions, hashes, actual transparency and size budget.
- npm run test:local-db: 31 passed. Use database-verified.log and database-checks.json.
- npm run build: exit 0. npm run test:auth: 5 passed. Production exclusion: 36 passed.

Browser widths: 320, 390, 768 and 1440. Saved workflows included actual page reload, failed set save/retry, repetitions/time/resistance, pause/resume, completion, shared check-ins, booking and practitioner assignment. No uncaught browser errors in successful runs.

The first database/browser run was interrupted by M: disk exhaustion. Its logs are retained. Only disposable physix-check-* stores were relocated to a system-temp archive; the saved .artifacts/physix-local/pgdata was untouched. The test runner now creates and cleans its own system-temp fixture. See test-storage-recovery.json.

This is local-test acceptance, not live clinic, provider, payment, medical-content, real-device, screen-reader or full accessibility approval. No cloud provisioning, deployment or push.

Verified mint implementation checkpoint: `82beae558bfbd7cc3eb14a90eac2b23e1195c443`. The following documentation-only commit records this source SHA. No push or deployment.
