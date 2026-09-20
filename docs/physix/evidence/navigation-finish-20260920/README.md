# Navigation recovery and verified finish — 20 September 2026

Canonical checkout: M:\physix-app, main. Entry HEAD d5597f6173a8182bf421af90e5b77f1c3ba03990. The interrupted navigation slice was already dirty: 33 tracked changes and 38 untracked files. All were backed up and reviewed; no reset or new project was used.

## Delivered

The consumer header and dock keep Home / Book / My care / Menu across public pages, sign-in and care. My care uses Today / My plans / Schedule / Progress secondary navigation. Public booking stays at /book. /app URLs are compatibility redirects with safe login continuation; they do not render a second application. The Home programme action opens the owned library directly.

Programme details retain one heading and a static progress summary, with sessions available without a duplicate self-linking hero. The existing Fidelity-derived solid-card family and existing illustrations are unchanged by this recovery.

Authorized care pages pass their server-checked account snapshot to their client views. Initial HTML now contains the programme content instead of a second account-loading screen. Background revalidation, denial handling and identity-change clearing remain. No private localStorage or sessionStorage was introduced.

## Fresh verification

Commands: npm run typecheck; npm run lint; npm run test:unit; npm run build; npm run test:navigation; npm run test:programmes; npm run test:ui; npm run test:local-browser; npm run test:local-db; npm run test:auth; npm run test:assets; node scripts/physix-production-check.mjs.

Final exits: all 0. Unit tests: 95. Browser assertions: navigation 23, programme 17, UI/booking 28, saved workflow 25 (93 total). Each browser suite captured 28 route/viewport combinations at 320, 390, 768 and 1440px. Database: 36 checks in a disposable system-temp fixture. HTTP: 5 isolated fixture tests. Assets: 6 originals/derivatives unchanged. Production isolation: 45 requests, including private/no-store headers on protected redirects. Lint retains two existing warnings in legacy Gymaf coach navigation.

Browser tests compare labels, URLs, item dimensions and positions; exercise login/logout and old deep links; verify authorized initial HTML and signed-out exclusion; and run saved sets, failure/retry, pause/resume, completion, booking and practitioner assignment. All final browser error assertions passed.

An initial cache assertion incorrectly expected production Cache-Control in next dev. The failed log is retained in scratch. Development revalidation is now checked separately from production private/no-store headers. No authentication assertions were removed. Browser launch initially timed out after a success payload; the same test browser was subsequently verified operational with an empty error buffer.

Selected compressed captures and machine-readable final results are adjacent. Full logs, captures, the initial dirty patch and backup remain in C:\Users\radev\AppData\Local\Temp\physix-nav-finish-BdHk10. No database reset, donor change, dependency upgrade, cloud provisioning, payment, push or deployment. The existing local dev service was retained.

These are synthetic local records, not verified clinic identity, approved clinical content, real bookings, paid-plan fulfilment or full device/accessibility acceptance. This is a tested navigation correction, not a declaration of visual perfection.
