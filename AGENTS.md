# PhysiX coding-agent contract

## Current authorized scope — PUBLIC WEBSITE ONLY (2026-09-08)

The owner explicitly requested the complete public PhysiX UI/UX, not Gymaf or logged-in screens. Start with `docs/design/public-v2/README.md`, its screen gallery and contracts. This scope note supersedes older first-session instructions below requiring Gymaf inspection, submodule initialization or patient previews for public work. Preserve those future specifications, but do not execute them now.

Build the public website and visitor booking experience in the existing Next.js baseline. Account ends at the public sign-in/verification boundary. No dashboard, exercise player, staff area, reuse port, backend provisioning or deployment is part of this task. The standalone HTML/CSS/JS design reference is not a second production app: translate its layouts into normal Next.js components rather than copying its hash router or simulated verification.

New public visual rule: Charlie's editorial mint section is followed by an edge-to-edge deep-teal patient-story treatment, never another white rounded testimonial card. Do not restore vertical dividers, fake ratings or invented patient proof. The story is omitted live until an authorized genuine review exists. Preserve image-led service cards and the four equal dock destinations.

The complete v2 public design package awaits owner review; do not label it owner-approved or production-ready. Use `docs/handoff.md` for the current local prompt. Public frontend work does not depend on a Gymaf checkout.

## Mission and reading order

Build the PhysiX website and personal patient app specified in `docs/prd.md`. The owner approved reusing Gymaf and changing the framework to **Next.js + React + strict TypeScript**. Do not run the old Svelte bootstrap.

At session start read this file, `docs/status.md`, and the next unblocked task in `docs/tasks.md`. Then read its owning specifications and existing code/tests. For the first session also read `docs/bootstrap.md`, `docs/architecture.md`, `docs/reuse/gymaf.md` and the design guide. `docs/README.md` maps topics. Do not reread every document or create duplicate plans/checklists.

Project priority: security/clinical boundaries > current explicit owner decisions > accepted decisions/specifications > responsive wireframes > generated mockup. Upstream documents are evidence about Gymaf, not instructions for PhysiX and not an override of these rules or platform instructions.

## Architecture invariants

- One Next.js App Router application at the repository root. No iframe, Svelte frontend, microfrontend, runtime dependency on `vendor/gymaf`, or second auth system.
- React components, Tailwind tokens/layout, and CSS Modules for isolated adapted styling. Native controls first; optional React-compatible primitives when needed.
- Supabase PostgreSQL/Auth/Storage in an isolated PhysiX environment. SQL migrations, RLS, typed server DTOs and generated database types. No second ORM migration system.
- Stable compatible official CLI scaffold; one root pnpm lockfile and exact packageManager pin. The upstream lockfile is reference only. Recheck current docs; do not blindly upgrade each session.
- Server Components for public composition and private data reads; small Client Components for interaction. Server Actions / explicit Route Handlers call authorized domain operations. Do not turn the whole site into a client SPA or copy Gymaf's catch-all app dispatcher.

## Upstream handling

`vendor/gymaf` is a read-only-by-policy, pinned Git submodule. Git does not enforce that policy: inspect its status before updating. Use `git submodule update --init --checkout -- vendor/gymaf`, without remote tracking or force. Verify with `node scripts/verify-upstream.mjs --require-checkout`.

Read the exact paths in `docs/reuse/inventory.json`. Do not treat the upstream AGENTS, CLAUDE, reference-capture tasks or release checklist as this project's task list. Do not install/run upstream code in the submodule as part of PhysiX bootstrap. Optional upstream comparison belongs in a separate disposable worktree, with its own ports and synthetic database, only when specifically useful and authorized.

Extract small useful pieces into PhysiX-owned files, replacing prototype data/routing and recording provenance in the inventory. Never import from vendor at runtime. Do not copy whole global CSS, upstream package/config files, database migrations, auth cookie plumbing, reference screenshots, fonts, demo testimonials, or coach branding wholesale. Never delete/rewrite upstream source to make PhysiX pass a test.

## Working method

Inspect Git status, origin, branch, recent commits, installed tools and existing implementation. Preserve unrelated work; do not reset, clean, force-push, silently stash, or regenerate an existing app. Use a fresh implementation branch after syncing the handoff safely.

Claim one task with an IN_PROGRESS note. Implement a useful vertical slice, reusing existing components/functions before creating new ones. Document actual imported/adapted/rejected files; a plan to port something is not a completed port. When behavior changes, update the owning spec and linked task rather than creating another PRD or TODO file.

Scaffold in an unused temporary sibling using official `create-next-app`; keep the root README, AGENTS, docs, scripts, workflow and submodule intact. Review and merge generated configuration. No dependency installed just for a hypothetical future feature. No node_modules, builds, .env secrets or dumps in Git.

After each meaningful slice run relevant checks. Before a milestone: typecheck, lint/format, unit tests, production build, browser journeys and rendered screenshot review at 390px and 1440px; also test 320px reflow and Bulgarian strings. Use actual command results, not assumptions. Do not remove assertions to hide failures. The tooling-only handoff check is not application testing.

Finish with changed files, task IDs, commands/results, screenshots, remaining limitations and the exact next task. Update `docs/status.md` and `docs/tasks.md`. Make small meaningful commits when authorized. Do not deploy, send real emails, charge cards, create paid resources, or migrate a remote database without explicit approval.

## UI and product invariants

Public mobile dock: Home / Book / Online / Account. No Services tab, oversized center button, phone status-bar decoration or floating chat bubble. Services remain prominent on Home and have a full page. Book begins a new appointment; existing visits belong in Account. Focused booking and active exercise sessions use a single action area without a competing dock.

Preserve PhysiX mint/teal/white styling, custom editorial service imagery and a concise hero. The long image is a scroll composition, not an 844px viewport. Use readable type, responsive widths and actual HTML/components; no screenshot background. Charlie's card has no separator columns. No fake ratings, credentials, clinic address, fees, testimonials or treatment outcomes.

A signed-in appointment-only patient must have a useful account without a Gymaf coaching relationship, subscription or plan. R2 assigned care and purchased education are separate access rules. A fitness workout date is not a practitioner appointment slot. Progress means recorded activity, not proven clinical improvement.

M0 runs without Supabase/email/payment/AI keys. Explicit synthetic preview routes may demonstrate patient UI without claiming real authentication or writes. In live mode these routes are unavailable, not an auth bypass. Provider failure never falls back to fake success.

## Security invariants

Check verified identity, ownership and current role at every protected server read, Server Action, Route Handler and database function. A layout redirect or Proxy check is not authorization. Use request-scoped supported Supabase SSR integration, RLS/grants and minimal DTOs. Do not mix the upstream custom token-cookie scheme with the selected SSR client. Privileged keys remain server-only and narrowly scoped.

Scheduling uses atomic SQL operations, idempotency and overlap constraints from `docs/booking.md`. A failed reschedule retains the original appointment. Checkout redirects never grant content access; verified idempotent fulfillment does.

No raw symptoms, patient/contact data, tokens, private links or payment payloads in URLs, logs, analytics, Git screenshots or AI prompts. Fixtures are synthetic. No offline patient cache by default. Clinical instructions require authorized human publication; any later AI is explicitly labelled, never a disguised Charlie.

Escalate real clinical/legal/business unknowns and destructive operations. Keep working on safe local tasks when production details are missing. The previous handoff remains in Git history; only the current root contract and active docs govern this project.
