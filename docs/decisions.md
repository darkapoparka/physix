# Decision record

Updated 2026-09-08. Accepted is the implementation baseline, not approval of unknown business/clinical facts. Current owner request authorizes the Next.js/Gymaf organization; no live deployment or data migration is implied.

| ID | Status | Decision | Reason / reconsider when |
|---|---|---|---|
| D01 | Superseded by D16 | Original SvelteKit / Tailwind / Bits UI greenfield plan | Reasonable before deciding to reuse a substantial existing React app. Retained as history, not an executable alternative. |
| D02 | Accepted | Supabase persistence/Auth/Storage | One backend per PhysiX environment; provider/privacy review remains required. |
| D03 | Accepted | No-credentials M0 first | Visual review must not require a Supabase URL; fixtures never replace failed live calls. |
| D04 | Accepted | Home / Book / Online / Account dock | Services stays prominent on Home/menu. Focused booking/session screens omit the dock. |
| D05 | Accepted | Discovery/availability before identity | Passwordless verification near confirmation; transparent patient-account creation. |
| D06 | Accepted | One authoritative practitioner calendar | In-clinic, online, phone bookings and blocks share constraints. No two-way external sync in R1. Resolve existing scheduler dependencies before R1-02. |
| D07 | Accepted | No pre-confirmation slot holds in R1 | Explicit not-reserved language and conflict recovery avoid expiry/lock complexity. |
| D08 | Operating assumption | Staff-arranged appointment payment; Stripe for R2 educational purchases | Confirm with owner before schema/booking work if deposits are mandatory. |
| D09 | Accepted | Repo public content; DB bookable offerings | No CMS until repeated editing needs justify it. |
| D10 | Accepted | Explicit bg/en routes, Bulgarian-first, EUR money model | Review actual translations, price display and legal/tax requirements before launch. |
| D11 | Accepted | Mockup guides styling, not literal viewport geometry or proof | Readable mobile layout and approved assets override compressed poster content. |
| D12 | Accepted | Human-published clinical plans; AI deferred/disclosed | No autonomous treatment publication or hidden clinician impersonation. |
| D13 | Operating assumption | One clinic, one initial practitioner, adults booking themselves | No marketplace/minor/dependent booking until scope is deliberately revised. |
| D14 | Accepted | Responsive web first | No native release/offline patient cache by default. |
| D15 | Accepted | Official tooling, locked versions, verification per slice | Latest means stable compatible at bootstrap, not automatic upgrades each session. |
| D16 | Accepted, 2026-09-08 | One Next.js App Router / React / TypeScript PhysiX app | Owner approved substantial Gymaf reuse; keeping its framework avoids a separate runtime/port. Replaces D01 before any PhysiX app scaffold. |
| D17 | Accepted, 2026-09-08 | Gymaf pinned at vendor/gymaf as reference-only Git submodule | Provides full local source without importing it, merging histories or modifying Gymaf. Extraction is deliberate and provenance-tracked. |
| D18 | Accepted, 2026-09-08 | Distinct PhysiX account/data boundary | No cross-product SSO, tenant platform, customer transfer or shared databases. Appointment access is independent of coaching or paid entitlements. |
| D19 | Accepted, 2026-09-08 | Official Supabase SSR integration, not copied custom auth | Inspect upstream auth as evidence; do not mix two token-cookie/refresh architectures. Test current SSR behavior and pin its API version. |
| D20 | Accepted, 2026-09-08 | Separate assigned clinical care from educational commerce | A clinician can assign care without Stripe; a purchase cannot approve/prescribe personalized treatment. |

## Change entry: D01 -> D16

Evidence: Gymaf main `82b75bde5b4ac2fa355ee98e0efc39fc470ebac6` and astra `88cef03ca0b8c00ec3e3c4a5dba09daeb5023506` were inspected. The source contains React/Next components, hooks, routing and a connected coaching implementation. PhysiX at `84b4afef4721fffb87d11d4f7a06f1b71bb07701` had no application scaffold. The owner explicitly approved integration and asked for an updated local-agent handoff.

Affected specifications: architecture, stack, bootstrap, routes, auth, integrations, components, testing, task order and agent prompts. Product purpose, design direction, clinic-booking integrity and safety requirements remain. No working Svelte application is being discarded. The previous handoff is preserved in Git history.

## Changing decisions later

Record dated evidence, affected specifications/tasks, migration cost and owner approval when needed. Mark superseded entries; do not erase rationale. Small implementation choices within these boundaries do not require repetitive approval. Business unknowns belong in [open questions](open-questions.md), task completion in [tasks](tasks.md), current handoff in [status](status.md).
