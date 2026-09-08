# Current session handoff

Updated: 8 September 2026. Latest work: PX-043 project relocation and public-design review. No website/account/backend implementation task has been completed by moving the project or reviewing concepts.

## Identity to verify on arrival

- Working directory: `M:/physix-pro`. The task UI may still advertise `C:/Users/radev/.codex/worktrees/ceed/gym`; that is not the Physix checkout.
- Relocated from `M:/phys1x`; the old directory is empty and is not the project. All original frontend design files in the destination were preserved byte-for-byte.
- Active branch at planning: `codex/phys1x-original-template`.
- Application baseline: `60582a5f3037375782e450fcd09f5d8aaf7ce94e`.
- Immutable comparison tag: `phys1x-template-baseline`; tree `630bbe0579f43fac8d83460b584a0726f698f058`.
- This documentation commit sits after that baseline; use Git for the exact current HEAD, rather than copying a SHA from a previous response.
- No Git remote configured. `M:/gym-fidelity` and `M:/gym` are source projects and must stay untouched.
- `codex/phys1x-foundation` at `be0f629` contains the rejected landing-page detour and partial localization. It is preserved for history. Do not merge or restore it wholesale. Any selectively reused utility needs fresh task-level review; its existence does not imply design approval.

## What the user agreed to

Physix is a friend's rehabilitation center. Start with the exact copied original app and its backend code. Build a public website with booking, and place the existing app experience behind “My account.” Include a private client experience, staff operations and an optional community. Both Bulgarian and English are required; web first, native later. Retain Next.js and organize one project by feature and separate layouts; no Turborepo or Svelte rewrite now. The initial plan was documentation only; the later relocation/design-review request did not execute the roadmap.

The latest request moved the project and assessed public design references; the full roadmap remains future work. Public design recommendation: use the supplied mint/white/navy/deep-teal family for the website and booking, without recoloring/replacing the authenticated app. Read PUBLIC_DESIGN_REVIEW.md and D-019. Generated practitioner/quotes/prices and proposed online/catalogue offerings are not clinic facts or approved release scope.

## Actual current state

The working application is the restored Future Pro/Gymaf template, not a finished Physix product. It still has original brand/copy, catch-all routing, English/reference states, and the inherited backend. Eighteen migration files are present; their presence does not mean they are applied to a Physix environment.

Port 3214 is reserved for Physix. The last successful startup used an explicit port argument because the restored package scripts still default to 3210. Runtime ownership must be rechecked; process IDs are not durable state. Ignored `.env.local` contains APP_ORIGIN and reference-preview/auth-mode/live-disabled flags; no Physix Supabase credentials were configured at planning. Do not print secret values during inspection.

The visible template is an explicit synthetic reference preview:

Relocation check: server restarted using `M:/physix-pro/node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3214`. The capture below renders at 393px with original sample content. Root backend requests still return `SETUP_REQUIRED`/503 without provider configuration. Logs: `.artifacts/dev-3214-relocated.log` and `.artifacts/dev-3214-relocated.error.log`. The old `.next` cache is preserved under `.artifacts/next-before-relocation-20260908`; do not reuse it as active output. No live app functionality was added.

`http://127.0.0.1:3214/?activity=workout&capture=f9ddae79f8fdb799`

This is sample data, not authenticated Physix data. Root without a capture uses the original backend entry and may report unavailable configuration. Do not hide this by inserting a “coming soon” product in place of the app. A future public website must be deliberately designed and paired with the retained account app, following EXPERIENCE.md.

## Next action

When the user authorizes execution, begin **PX-001**: inventory and baseline evidence. Then proceed to ready foundation tasks. PX-002 captures clinic decisions; do independent source organization/localization work while owner inputs remain pending. Do not ask the user to repeat already-confirmed architectural or language decisions.

## Open inputs

See DECISIONS.md D-020 through D-029. The unanswered assessment-first versus direct-service booking question is material. Clinic identity/content, services, staff, scheduling rules, payment model and hosting ownership are not known. Defaults may be used in labeled synthetic tests, never advertised as clinic policy.

## Handoff maintenance template

Replace the live sections above after each task slice with: date; branch/current code SHA; dirty files and ownership; active task and status; completed acceptance evidence; exact pending checks; concrete blocker/decision and affected task IDs; next safe action; server URL/verified command; rollback reference. Add a short immutable entry in SESSION_LOG.md. Keep credentials and private patient data out of all three documents.
