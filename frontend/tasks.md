# PhysiX frontend visual backlog

This file is the scoped design/fidelity backlog for `frontend/`. The repository-root `tasks.md` remains the canonical project task ledger and wins on status, dependencies and release claims.

## Working rule

Do not implement a route from memory or from the current browser styling. Freeze its selected high-fidelity target in `frontend/screens/<screen>/`, then implement against that target using the shared system in `IMPLEMENTATION_BLUEPRINT.md`.

| ID | Deliverable | Status | Acceptance |
|---|---|---|---|
| FUI-001 | Full public-app Image Gen master board | REJECTED | Combined-board generation was the wrong workflow; use one screen per folder and one generation at a time. |
| FUI-002 | Per-screen target files | IN_PROGRESS | Every implementation route gets its own reviewed 390px target in its screen folder before implementation. |
| FUI-003 | Shared design tokens | TODO | Geometry, type roles, radii, spacing and surfaces extracted from approved per-screen targets. |
| FUI-004 | Shared component inventory | TODO | One component family covers header, dock, finder, actions, cards, FAQ and booking primitives. |
| FUI-005 | Home high-fidelity implementation | VERIFY | Home target implemented on `/en` and `/bg`; owner visual review remains open. |
| FUI-006 | Book/service-selection implementation | TODO | Service selection lives inside Book and preserves the focused flow CTA. |
| FUI-007 | Service-detail implementation | TODO | Same visual language, service context transfers into Book. |
| FUI-008 | Online implementation | TODO | Human video-care page matches target without fake availability. |
| FUI-009 | About/Charlie implementation | TODO | Compact deep-teal practitioner treatment, no invented credentials. |
| FUI-010 | First Visit/FAQ implementation | TODO | Grouped practical content and native accessible disclosures. |
| FUI-011 | Booking Time implementation | TODO | Focused shell/progress/action geometry matches target; truthful availability state. |
| FUI-012 | Booking Details implementation | TODO | Persistent labels, validation/error geometry and verification substate designed. |
| FUI-013 | Booking Review implementation | TODO | Authoritative summary layout and edit paths designed. |
| FUI-014 | Booking Confirmation implementation | TODO | Success visual exists but production only shows it after persisted booking. |
| FUI-015 | Conflict/unavailable/error states | TODO | No false confirmation; safe data preserved and clear recovery action. |
| FUI-016 | Menu/search overlays | TODO | Focus, close, scroll restoration and dock visibility match the target. |
| FUI-017 | Account-entry boundary | TODO | Public Account entry hands off to retained Gymaf without restyling it. |
| FUI-018 | BG/EN responsive parity | TODO | 320/390/430/tablet/1440, both locales, no overflow or clipped actions. |
| FUI-019 | Visual-diff acceptance set | TODO | Target + browser captures stored for each route/state with intentional differences recorded. |
| FUI-020 | Public CSS consolidation | TODO | Superseded overrides removed only after parity and interaction checks pass. |

## Screen-folder workflow

For a screen task, keep only the selected target marked current. Rejected generations remain versioned but must be labelled rejected in `spec.md` or `acceptance.md`.

Implementation order is deliberate: shared shell -> Home -> Book/service -> detail -> supporting public pages -> booking continuation -> overlays/states -> responsive/locale acceptance -> CSS cleanup.

Do not create a standalone Services tab or route family as a competing IA. Home may expose services; `/services` redirects to Book; the dock stays Home / Book / Online / Account.

Do not redesign the signed-in Gymaf product under these FUI tasks. Any future authenticated-care adaptation uses its own explicit task and preserves the retained application hierarchy.

## Immediate next actions

1. Finish owner visual review of `frontend/screens/01-home/` and keep FUI-005 at VERIFY until accepted.
2. Generate **only** `02-book-service` next; do not create another multi-screen board.
3. Save each reviewed screen target inside its own `frontend/screens/<screen>/` folder before implementation.
4. Extract shared tokens/components incrementally from approved screens instead of guessing them in advance.
5. Implement each route against its approved target, capture 320/390/430px EN/BG evidence, then move to the next folder.