# PhysiX — clinic booking and ongoing care

Canonical checkout: **M:\physix-app**. This is the existing Gymaf/Fidelity-derived Next.js, React and TypeScript application, not another frontend or the older public-site implementation on GitHub main. Preserve the donor at M:\gym-fidelity.

## Current implementation

Home now uses one executable theme/token source, a shared app shell, direct clinic/online booking actions, catalogue-derived service cards, separately labelled visit-information sheets, and an authorized programme summary. Assigned care appears before public discovery. The brand remains; full-size service photography replaces faded portrait crops, and pastel visit panels are removed; no new design board was generated.

The local application saves synthetic appointments, cancellations, programmes, session attempts, exercise actuals and check-ins to an isolated PGlite store. This is **local-test functionality**, not real clinic authentication, live availability, purchased-plan fulfilment, video calls or a production release.

## Run locally

From this checkout, use the installed Node.js 24 runtime and run:

```sh
npm run dev
```

Open http://127.0.0.1:3217/. Public browsing does not require an account. /book opens local test booking; /login exposes explicit synthetic test personas; /care is saved patient care and /practitioner is the local staff workspace. /dev/demo is a separate memory-only visual reference, not the saved app.

The launcher owns Next and one disk-backed local database service. Preserve .artifacts/physix-local/pgdata. Read .artifacts/physix-local/runtime.json and dev.log when diagnosing startup. A listening port alone is not proof that the app responds. Never reset the database to obtain a clean screenshot.

## Frontend ownership

- src/styles/physix-tokens.css: foundations, semantic roles, type, spacing, control geometry, states and compatibility aliases.
- src/features/physix/home.module.css and shell.module.css: scoped composition and responsive layout, consuming those roles.
- catalogue.ts: candidate service names and mode eligibility. home-content.ts: decorative presentation projection. shared/physix/booking-link.ts: validated public booking URLs.
- Existing Shell, MobileDock, ContextHeader and Sheet: shared navigation and interaction foundations. Home / Book / My care / Menu never changes after sign-in.

The migration is Home and its shell, not a claim that every inherited stylesheet is token-only. Clinical information, fees, real availability and patient state never belong in decorative component fixtures.

## Documentation and verification

Start with AGENTS.md, then docs/physix/DESIGN.md, TOKENS.md, HOME.md and DESIGN_RESEARCH.md. SESSION.md owns the latest executed results; TASKS.md distinguishes local implementation from release acceptance. Historical conflicting styling notes are preserved under docs/physix/history, not current instructions.

Source checks: npm run check:design, npm run typecheck, npm run lint, npm run test:unit and npm run build. Browser checks include test:home-system, test:home, test:navigation, test:appointments, test:programmes, test:local-browser and test:ui. They require the local test server and an isolated browser session. Point AGENT_BROWSER_BIN and, when needed, AGENT_BROWSER_EXECUTABLE_PATH at the installed tools. Save PHYSIX_EVIDENCE_DIR outside the source drive for full captures.

The homepage completion evidence is docs/physix/evidence/home-contrast-20260921. Automated checks, inspected screenshots, owner visual acceptance and release approval are separate. Real clinic content, higher-resolution approved media, authentication, payment fulfilment, scheduling operations and physical-device/assistive-technology acceptance remain outstanding. No deployment is implied by a Git commit or push.
