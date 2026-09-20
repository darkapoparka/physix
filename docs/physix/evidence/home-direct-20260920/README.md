# Direct Home discovery — 20 September 2026

Entry: f0a52b2ab598792c8248f23bf9e6fc7510cdd2f2, main, clean. Canonical source: M:\physix-app.

The owner rejected Services / By area. Removed that control, its browse state and the horizontal service rail. Four actual booking entry points are now visible together in a two-column mobile grid and four-column desktop grid. Back/neck remain supported by booking search; their original assets are preserved rather than presented as duplicate services.

Home uses the existing CareCard family with scoped CSS geometry variables, consistent artwork/caption sizing and top-corner link affordances. Service titles are h3 below the discovery h2. Default programme/session card geometry remains unchanged. No new fonts, images, dependencies, global theme or navigation system.

## Verified

- TypeScript, production build and changed-file lint: exit 0.
- Unit suite: 95 passed.
- Home/booking UI: 45 checks; navigation: 23; saved workouts: 25.
- Browser widths: 320, 390, 768 and 1440; Home doubled computed text at 320/390/768.
- Production isolation: 45 requests passed. Asset integrity: all six preserved originals/derivatives passed.

The browser checks cover all four service destinations, direct time selection, back/neck search, keyboard entry, server-rendered discovery, obsolete browse URLs, native Back, reservation failure/retry/persistence, stable navigation, saved sets, reload, pause/resume and practitioner assignment. The final suites have no uncaught browser errors. Data is synthetic and local.

## Boundaries

Booking, identity, care commands, SQL, database storage and dock source are untouched. Existing test records were not reset; browser tests add synthetic attempts and cancel only their own test reservation. The donor checkout and server are unchanged. No push or deployment.

An initial browser-daemon launch timed out; a subsequent test found an incorrectly escaped selector in the test script. The selector was corrected and the full suites rerun without removing assertions. An optional later density adjustment did not execute and is not included in this checkpoint. Full logs remain in C:\Users\radev\AppData\Local\Temp\physix-home-direct-MOwdNV; selected lossless WebP captures and final reports are checked in here.

Passing tests is not owner visual approval, full accessibility certification, real-device acceptance or live clinic readiness. Images remain decorative; no new clinical claims or identity content was introduced.
