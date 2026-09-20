# Interrupted Home foundation — execution handoff

## Last verified checkout

Work only in `M:\physix-app`, the independent Gymaf Fidelity derivative. Branch was `main`, HEAD `0b673c8df57da341ed397d4019432832c0c3d640`, initially clean. This session made uncommitted edits. No commit, push, deployment, dependency installation, database reset or donor change was performed.

Desktop Commander exhausted its monthly allowance and explicitly paused calls. Do not retry/reconnect or use another path to bypass that restriction. The remaining files were prepared outside the PC as an **unapplied completion patch**. A local executor with existing authorized filesystem access can review the patch independently; do not describe it as remotely applied.

## Changes already written before the interruption

`src/styles/physix-tokens.css` was created and imported before the existing global stylesheet. The old global root variables now use the new source rather than a second root block. Legacy role values were intentionally preserved.

Home was decomposed into a hero, service discovery and composition. `home-content.ts` derives service names and eligibility from `catalogue.ts`; `booking-link.ts` constructs public booking destinations. The assigned-care summary is placed before service discovery. Existing authorization, saved appointment/programme mechanics, identity invalidation, imagery and navigation remain in use.

Visit cards now have a large booking link and a separate labelled information control. Service slogans and the decorative care motto were removed. The base Home CSS was replaced with token-consuming rules, but the final responsive breakpoints and shell alignment were **not saved before interruption**. This is a partial implementation, not a verified visual result.

`AGENTS.md`, `docs/physix/DESIGN.md` and `docs/physix/HOME.md` were updated. Original AGENTS and DESIGN were preserved under `docs/physix/history`. The token guide, research write-up, new guards/tests and responsive completion in the external bundle were not on the PC when access stopped.

## What this completion patch adds

It finishes proposed responsive Home/shell styles, supplies TOKENS and DESIGN_RESEARCH, adds a token/contrast source guard, booking-link unit tests and a Home browser regression script, and makes the online service default explicit rather than dependent on catalogue array position. These changes require actual local build and browser validation after applying.

The patch is based on the **already modified partial worktree**, not clean HEAD. Inspect branch, HEAD and dirty files again. Run `git apply --check` before applying; do not force, reset, clean, stash unrelated work or overwrite a conflicting file. Hunk mismatch means reconcile against the actual file.

## Finish in this order

1. Read AGENTS, DESIGN, TOKENS, HOME and DESIGN_RESEARCH. Inspect the actual changes with `git diff`, including untracked files. Preserve `.artifacts/physix-local/pgdata` and all donor repositories.
2. Apply the reviewed completion patch only if its check matches. Then inspect the actual `home-care.tsx` and `home-visits.tsx`: make accessible names include the visible action labels. In particular, guest care currently has an `Open my programmes` aria-label while the visible action is `Open My care`; the visit buttons also need matching visible/accessibility wording. No guessed full replacement of these components is supplied.
3. Audit AGENTS for leftover historical visual directives. Its append operation may have retained old sections. Keep the new active specification but preserve security, navigation and persisted workflow contracts. Update SESSION, NEXT_SESSION and README with a single accurate checkpoint; historical screenshots are not current approval.
4. Run `npm run check:design`, `npm run typecheck`, scoped ESLint, `npm run test:unit`, and `npm run build`. Inspect any failure instead of changing tests simply to accept it. Run source checks before the browser suite.
5. Verify the real existing dev server with HTTP requests and a browser, not only its listener. Run `npm run test:home-system`, `npm run test:home`, and `npm run test:navigation`. Review the existing appointment, programme and saved-care test scripts before running them: some create or mutate synthetic persisted records. Never reset the app database for clean screenshots.
6. Inspect actual after captures at 320/390/430/768/1440px, enlarged text, long labels, keyboard rail use, sheet focus and restoration, image quality and foreground contrast over photos. Check a returning patient and an empty account, direct booking entries, cross-tab sign-out and unchanged dock routes. Physical Safari/device acceptance remains separate.
7. Save exact results and unresolved issues. Only after successful checks may the local implementation be called tested. Owner visual approval and real clinic release are separate decisions. Do not push or deploy without permission.

## Evidence and process cleanup

A fresh **before** screenshot was created and opened at `C:\Users\radev\AppData\Local\Temp\physix-home-system-20260920\before-390.png`. No after screenshot or post-edit PC typecheck/lint/unit/build/browser result exists from the interrupted remote work. Before-edit browser errors were empty; this says nothing about the edited app.

The own QA browser session was `physix-home-system-20260920`. The own Node debugging REPL was reported as PID 53820. Quota prevented closing them. Inspect actual ownership before cleanup because PIDs can be reused. Do not stop unrelated browser or Node processes. The saved app runtime was left untouched.

External-bundle validation is an isolated Linux/Node fixture check of patch application, helper unit tests and source guards. It is not the Windows checkout, a Next production build or rendered browser acceptance.
