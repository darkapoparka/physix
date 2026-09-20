# Homepage system completion — 20 September 2026

Implemented in M:\physix-app on review/physix-home-system. GitHub delivery target: darkapoparka/physix, the same review branch; older main and the Gymaf donor remain unchanged. The interrupted bundle was applied to actual source, not committed as a substitute ZIP.

## Changes

One token file supplies foundations, semantic colors, type, spacing, radii, controls, focus and motion, with compatibility aliases preserving existing care/booking values. Home and shell consume it through scoped CSS Modules. Service cards project the existing catalogue; validated booking links keep public service/mode intent. The large visit action books; a separately named control opens information. Returning care precedes discovery in DOM order. Filler slogans and the decorative care motto are removed.

Visual review corrected the hard edge in the existing hero cutout, narrow-phone action wrapping and enlarged-text card/care wrapping. No new art, identity, framework, provider, backend schema or saved-store reset. The existing dock and contextual task headers remain.

## Executed checks

| Check | Result |
|---|---|
| TypeScript, scoped lint, full lint, production build | Passed; full lint retains two existing legacy coach warnings |
| Unit tests | 125 passed |
| Inherited isolated HTTP tests | 5 passed |
| Target asset integrity | 7 passed |
| Production exclusion | 46 requests passed |
| Home system | 11 named checks passed |
| Home actions and identity | 20 named checks passed |
| Navigation | 23 named checks passed |
| Appointments | 19 named checks passed |
| Programmes | 17 named checks passed |
| Shared UI and booking | 43 named checks passed |
| Saved exercise-workflow suite | Failed at its initial sign-in wait in two runs; no exercise-workflow pass is claimed |

There are 133 passing named browser checks across the six completed suites. Repeated viewport assertions are not counted as additional named checks. Home was checked at 320, 390, 430, 768 and 1440px, with actual screenshots, keyboard rail access, focus return, complete normal-size booking labels and a bounded doubled-text test. Synthetic long Bulgarian labels test reflow, not shipped localization.

The token guard checks 111 declarations, alias/reference integrity, 11 preserved legacy roles and eight contrast pairs. Color-pair checks do not certify all text over photography. Other sign-in and protected-care tests passed; the separate saved-workflow startup timeout remains unresolved and is recorded in saved-workflow-failure.txt, not hidden or treated as success. Saved-session application code was not changed in this slice.

## Visual evidence

- [Before: first-pass clean 390px baseline](before-390.webp)
- [After: 320px](home-320.webp), [390px](home-390.webp), [430px](home-430.webp), [768px](home-768.webp), [1440px](home-1440.webp)
- [Returning patient](home-returning-390.webp), [doubled text at 320px](home-text-200-320.webp), [long-label stress](home-long-labels-390.webp)

The before capture is the original clean 0b673c8 baseline, not a newly rendered version of the partially edited tree. Captures are local Chromium renders with synthetic accounts, not mockups, physical-device captures or visual owner approval. source-manifest.json records the applied bundle hash and the changed source hashes. Full raw logs/captures remain in the session's system-temp evidence directory; only selected compressed outputs are in Git.

## Limits and tooling notes

The initial automatic browser start timed out; an explicit installed Chrome path and separate QA sessions subsequently worked. A desktop target-size failure was fixed by enlarging the actual controls. Existing navigation/canvas/type assertions were updated to target the visible care link and the intended tokenized surface/type, while retaining their destination and behavior checks.

The repository remains a local-test app. Real clinic Auth, policies/availability, approved high-resolution media, payment fulfilment, video joining, notifications, full accessibility and physical Safari acceptance remain separate. No database reset, donor write, deployment or live patient transaction accompanied this change. The inherited global stylesheet and other component modules are not all token-only yet.
