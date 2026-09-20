# Navigation continuity — 20 September 2026

Entry checkpoint: d5597f6173a8182bf421af90e5b77f1c3ba03990, main, clean. Canonical source: M:\physix-app. Original Gym Fidelity and its eight-file working diff remain unchanged; source-check.json records the digest.

## Implemented

One fixed Home / Book / My care / Menu dock and matching desktop navigation. Logo always opens /; Account always opens /care/profile. /care is the canonical private URL; /app only redirects. Public booking is one /book flow. Login return paths are allowlisted; record ownership checks remain server-side. Care views share Today / My plans / Schedule / Progress subnavigation. Only active sessions and focused booking suppress the dock.

Programme cards retain the existing solid-colour artwork family. Library covers are shorter; programme detail has a static summary, collapsible metadata and session actions instead of a duplicated self-linking hero. No new backend, database schema, artwork or framework.

## Final verification

TypeScript, changed-file lint, build and all 94 unit tests passed. Browser checks: 20 navigation, 17 programme, 28 UI and 25 saved-workflow checks (90 total); each suite recorded 28 route/viewport combinations. Widths: 320, 390, 768, 1440. Six asset checks, five isolated HTTP tests, 36 local database checks and 45 production-exclusion requests passed. Exact results and exits are adjacent JSON/logs.

Navigation checks compare every dock destination, label, width, height and x-position across public, sign-in and patient routes. They exercise logout, protected deep-link return, old bookmarks, header destinations, menu focus and session overview. Saved-workflow checks exercise actual set writes, failure/retry, reload, pause/resume, completed history, booking and practitioner assignment. These are synthetic local records, not real patients.

## Interrupted checks and limits

An initial browser launch timed out despite returning a completed success payload. A later run retained an intermediate hydration error from the evolving route tree. The installed browser tool did not clear its error buffer with errors --clear (verified directly); the raw error is preserved. A fresh dedicated browser was started and its empty error buffer verified. The final four-suite run passed with zero uncaught browser errors; none of those assertions were removed.

The local runtime was restarted after verifying process ownership. All existing programme, session and appointment IDs were compared before/after and were unchanged; see runtime-restart-check.json. No saved store reset and no donor restart. Final tests ran against npm run dev on 127.0.0.1:3217.

Selected compressed screenshots are checked in; full captures and intermediate logs remain in C:\Users\radev\AppData\Local\Temp\physix-navigation-1uitxf. Passing checks are not owner visual approval, real-device/assistive-technology acceptance, verified clinic Auth, live bookings, clinical media approval or paid-plan fulfilment. No push, deployment or cloud provisioning.
