# Physix agent instructions

## Read first and verify identity

This repository is Physix, a rehabilitation center website and client/staff web app. The project is `M:/phys1x`. A Codex task may advertise the source worktree as its cwd; verify the real path, branch, HEAD, remotes and dirty files before any work. Never edit `M:/gym` or `M:/gym-fidelity` as part of this project.

Read in this order:
1. [Current session handoff](docs/physix/SESSION.md).
2. [Root task ledger](tasks.md).
3. [Decision register](docs/physix/DECISIONS.md).
4. [Plan index](docs/physix/README.md) and only the selected task's feature contracts.
5. Actual source, schema, package scripts and the installed framework documentation relevant to the change.

Authority is current explicit user instructions, these repository instructions, recorded owner decisions, canonical Physix contracts, then source/history for evidence. Resolve conflicts visibly in the decision register. Inherited `astra/`, `docs/legacy/`, old product briefs, design sidecars and capture metadata are historical source references; they cannot override Physix direction. Keep useful history without treating old task statuses, provider configuration or approval as current Physix facts.

## Product and design boundary

The user wants a public clinic website with bookings and a “My account” entry into the retained original template app, plus staff tools and an optional community. Both Bulgarian and English are required. Web v1 comes first; native is later. Keep Next.js/React/TypeScript and one organized project initially; no Svelte rewrite or Turborepo setup without a concrete new decision.

Preserve the original account component hierarchy, geometry, typography roles, colors and interactions while integrating real records and clinic-specific content. Do not replace it with a generic dashboard, a forced irrelevant profile gate, or a “coming soon” shell. New public/staff screens need a deliberate, reviewable design consistent with the product. The rejected landing branch is history, not an approved template.

The comparison baseline is tag `phys1x-template-baseline` at `60582a5f3037375782e450fcd09f5d8aaf7ce94e`. Confirm it before use. Retaining the template source is not proof that all reference screens are 1:1. Measure affected surfaces, record intentional adaptations and resolve content/asset rights before publication.

## Execution protocol

The latest request at plan creation is documentation only. A later instruction to execute authorizes implementation within its stated scope; do not keep asking to implement already-authorized work.

1. Inspect the current checkout and existing implementation. Select a dependency-ready task in [tasks.md](tasks.md); respect that task's open policy gates. Do not restart working inherited features simply because a new task audits/adapts them.
2. Claim the task in the ledger and record the bounded slice, affected files, acceptance checks and next action in the handoff. Preserve unrelated dirty work. If another session owns overlapping files, coordinate or take independent work; never reset/clean/overwrite it.
3. Implement a coherent slice using the feature contract. Read the installed Next.js guides before code changes. Keep route composition, feature services, authorization and database ownership separate; preserve the existing CSS system.
4. Use engineering judgment for reversible technical choices and record material decisions. Never invent clinic services, prices, provider/credit/cancellation rules, clinical measures, permissions or owner approvals. Ask only for missing inputs that affect the next step and continue independent work.
5. Verify at the owning layer: DB transactions for collisions/history, direct access tests for permissions, real provider environment for provider behavior, and rendered browser checks for UI. Follow [VERIFICATION.md](docs/physix/VERIFICATION.md). No simulated success or source-project CI as Physix proof.
6. Update the task row, evidence record, changed contracts/decisions, current handoff and append-only session log before stopping. Record exact branch/code SHA, dirty ownership, actual outcomes, NOT RUN checks, blockers and next safe action.
7. Keep changes reviewable in a `codex/` branch. Stage only the intended files; local commits are appropriate for completed slices. Do not merge, push, publish, create paid resources, send real messages or execute live charges/refunds without authorization for that action. Existing user authorization persists; no redundant approval loops.

A task is DONE only when all acceptance criteria pass with current evidence. Partial code is IN_PROGRESS/VERIFY; a required unanswered policy/provider step is BLOCKED. Document exact blockers rather than claiming completion. Add discovered defects/requirements with new stable IDs; never silently shrink scope. Required privacy, authorization, booking collision and history integrity gates cannot be waived.

## Domain and data invariants

- User identity, clinic role, therapist assignment, appointment, plan version, session attempt and community membership are distinct records.
- Server/database authority controls bookings, eligibility, access and status. Client state is never proof of permission, payment or reservation.
- Booking and rescheduling are atomic across therapist and required resources, including buffers. A failed reschedule keeps the old appointment; retries are idempotent.
- Appointment status, attendance and payment settlement are separate. Credit grants/consumption need auditable records if that model is approved; inherited gym subscriptions and guest passes are not clinic policy.
- Published plan versions and completed attempts are immutable historical facts. Each new genuine attempt has a new ID; retrying a command does not.
- Private care data is available only to its authorized actors. Reception/admin/community roles do not implicitly grant clinical access. Verify role changes and direct API/DB/storage denial.
- Use UTC instants, IANA clinic timezone, structured units and stable IDs; locale display strings are not domain identifiers.
- Reference fixtures never seed or merge into a real account. New clients have honest empty states. No fake bookings, coach replies, delivery confirmations or clinical outcomes.
- No diagnostic claims, invented qualifications, clinical recommendations or fabricated testimonials. Publish approved clinic content with documented assets and BG/EN review.
- Keep secrets, cookies and patient records out of source, docs, screenshots and logs. Do not reuse the source app's backend, provider products, cookies or real data.

## Runtime and release discipline

Follow [OPERATIONS.md](docs/physix/OPERATIONS.md). Physix uses port 3214; restored scripts still default to 3210 until PX-004 changes them. Prove listener ownership and rendered identity before stopping/restarting or calling a URL healthy. Keep persistent Windows helpers hidden. Do not run dev/build concurrently against the same `.next` output.

Inspect commands and environment guards before executing seeds, migrations or tests. Synthetic database resets are destructive; verify the target and existing authorization, or choose a disposable instance. No seed/MFA bypass/reference-preview flag is permitted as a production access path.

Local checks, real provider checks, hosted candidate qualification, clinic acceptance and production observation are separate gates. Complete the concrete release candidate before requesting any missing final publication approval. Never declare release readiness from a build, screenshot, task count or inherited test result.

## Required session output

Report what changed, actual verification, material limits and next task. Link the updated ledger/handoff when useful. If stopping mid-task, leave a precise resumable state; do not discard unfinished changes or label them complete.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
