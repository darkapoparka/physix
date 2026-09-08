# Local-agent handoff

Open the **PhysiX root**, not vendor/gymaf. Safely pull the current handoff and initialize its pinned submodule; [bootstrap](bootstrap.md) provides commands and guards. Do not run the earlier Svelte prompt from conversation history.

## First session prompt

```text
Implement PhysiX using the CURRENT repository instructions.
Read AGENTS.md, docs/status.md, docs/tasks.md, docs/bootstrap.md,
docs/architecture.md, docs/tech-stack.md and docs/reuse/gymaf.md.
Then read docs/reuse/frontend.md, the source inventory and relevant design/route specs.

Inspect Git origin/status/branch and existing code/tooling. Preserve unrelated edits.
Safely integrate the current handoff; do not reset, force-push or overwrite existing work.
Initialize vendor/gymaf at the recorded submodule commit, inspect its status and run
node scripts/verify-upstream.mjs --require-checkout. Treat it as read-only reference.
Do not install/run upstream scripts, follow its agent workflow or import vendor at runtime.

Execute M0-00 through M0-06 in small verified slices. The selected application is one
Next.js App Router + React + TypeScript app at the repository root, with Tailwind tokens
and scoped CSS for adapted Gymaf UI. Follow current official CLI help, scaffold in an
unused temporary sibling and merge reviewed files without overwriting docs/AGENTS/tools.
Record exact compatible versions and commit one root pnpm lockfile. Exclude vendor from
TypeScript, tests, lint/format, Tailwind discovery and deployment/tracing.

Preserve PhysiX's public design, custom service imagery and Home/Book/Online/Account dock.
Build real responsive components, not a compressed screenshot. Adapt selected Gymaf cards,
dashboard/player interactions into PhysiX-owned files; replace capture routing, local stores,
fixtures and unreviewed assets. No generic icon substitution for final service artwork.
Record actual adaptations/provenance. Don't copy the entire Gymaf app or global stylesheet.

M0 must run without Supabase/email/payment/AI keys. Show a useful appointment-only Account
preview and a separate explicitly synthetic assigned-plan/session preview. No fake login,
real booking, server-save claim, subscription requirement or outbound provider call.
BG/EN text and actual mobile proportions must work. Mark missing real assets/content honestly.

Run relevant checks per slice; before the gate run handoff/tooling checks, typecheck, lint,
format check, unit tests, production build and browser smoke. Inspect 390px and 1440px
screenshots plus 320px reflow, keyboard, zoom and dock/keyboard overlap. Prove the app builds
without an initialized vendor checkout. Record all actual results and tests not run.

Update docs/tasks.md, docs/status.md and reuse inventory evidence. Stop at M0 review.
Report run commands, working screens, screenshots, limitations and exact next task.
Do not start backend/cloud/deployment work, run vendor migrations or use real patient data.
```

## Backend session, after M0 approval

```text
Continue PhysiX from AGENTS.md, docs/status.md and the next authorized R1 task.
Inspect actual code and task evidence; do not re-scaffold or repeat completed work.
Read docs/data-model.md, docs/booking.md, docs/auth-security.md, docs/integrations.md
and docs/reuse/backend.md for the task's boundaries.

Use isolated LOCAL Supabase and synthetic identities only. Confirm existing local config
and disposable database before any reset. No cloud linking, remote migration, real mail,
payments or production data. Write PhysiX-owned migrations/tests, not copied vendor SQL.
Use official supported Next SSR auth, not Gymaf's custom auth-cookie system.

Build one end-to-end R1 slice at a time: verified identity, server-authorized data, correct
SQL constraints, actual UI and failure recovery. Appointment management must work without
a coaching relationship or subscription. Test direct cross-user/role access and real
browser behavior. Preserve the approved frontend. Record evidence and update the handoff.
Stop at the next review gate or a genuinely blocking business/operational decision.
```

## Assigned-plan session, separately scoped

```text
Implement the approved R2-05 care slice only after its identity/schema prerequisites.
Follow docs/reuse/backend.md and the canonical data model. Reuse the inspected Gymaf
builder/session ideas, not its whole schema or fitness-business assumptions.
Prove with synthetic patients that a clinician can publish/assign a plan, the intended
patient can start/log/reload/resume an attempt, another patient/reception is denied,
and edits to future versions do not change past attempts. Test idempotency and conflicts.
Do not add Stripe, subscriptions, AI, messaging or uploads just to complete this slice.
Keep live clinical publication behind review/approval and record actual test evidence.
```

## Continuing any session

Read current status/backlog and actual code first. Work on the next unblocked authorized task, not a new parallel todo list. Preserve exact pins/lockfile unless a reviewed change is needed. Finish with evidence, limitations and the next task. Local execution permission is not permission to provision paid services, send real messages, charge cards or deploy a clinical service.
