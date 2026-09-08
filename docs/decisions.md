# Decision record

Working baseline: 2026-09-08. 'Accepted' means the implementation baseline selected in this handoff, not a claim that every business assumption is confirmed by the clinic.

| ID | Status | Decision | Why / reconsider when |
| --- | --- | --- | --- |
| D01 | Accepted | One SvelteKit app, TypeScript, Tailwind, selective Bits UI | Custom mobile public site and patient workflows without a separate backend. Reconsider only for demonstrated team/deployment constraints. |
| D02 | Accepted | Supabase is the single persistence/Auth/Storage provider | Avoid duplicate backends and auth systems. EU region and processor review are launch requirements, not automatic compliance. |
| D03 | Accepted | First deliverable is no-credentials M0 | Owner must be able to run and review UI before cloud setup. Demo is never silently used in live mode. |
| D04 | Accepted | Home / Book / Online / Account mobile dock | Preserve latest chosen direction. Services is discoverable in Home/menu and has a full route. Focused booking steps omit the dock. |
| D05 | Accepted | Public discovery and availability before identity | Passwordless email verification occurs near final confirmation, with a transparent patient-account notice. |
| D06 | Accepted | One internal calendar for all practitioner occupancy in R1 | Online, in-person, manual appointments and blocks share conflict protection. No Google Calendar two-way sync in R1. If an existing scheduler is essential, decide before B01 and replace this design rather than double-booking systems. |
| D07 | Accepted | No pre-confirmation slot holds in R1 | Avoid expiry/lock complexity. Clearly state selection is not reserved and recover from conflicts. |
| D08 | Accepted | Appointment payment is staff-arranged initially; Stripe for R2 digital education | Avoid payment/slot synchronization on launch. Owner must approve this commercial operating model; change before B01 if deposits are mandatory. |
| D09 | Accepted | Repo-managed public content; database-managed bookable offerings | No CMS overhead initially. Add editing UI only for repeated owner needs. |
| D10 | Accepted | Bulgarian-first explicit locale routes and EUR amounts | Bulgaria is the target market; design copy is English only as a reference. Legal pricing/translation review remains required. |
| D11 | Accepted | Generated mockup is visual direction, not pixel geometry or verified content | Correct proportions at 320–430px, replace fake proof/portraits, and omit unnecessary decoration. |
| D12 | Accepted | Clinical plans are human-published; AI deferred and disclosed | Do not sell autonomous personalized treatment. Regulatory classification and clinical review depend on intended use. |
| D13 | Assumption | One clinic, one initial practitioner, adults booking themselves | Explicitly excludes dependent/minor booking and marketplace complexity. Owner confirms before live scheduling. |
| D14 | Accepted | Responsive web first, not native/PWA-first | No offline patient cache or native release overhead until recurring usage justifies it. |
| D15 | Accepted | Stable official tooling, lockfile, tests per vertical slice | 'Latest' means current stable compatible packages, not experimental APIs or upgrades every session. |

## How to change a decision

Add a dated entry with the old decision ID, concrete evidence, proposed replacement, affected tasks, migration effort and owner approval where required. Mark the old entry superseded; do not erase its rationale. Small styling choices consistent with the design tokens do not require an ADR.

Open business inputs belong in [open questions](open-questions.md), actual work in [tasks](tasks.md), and current implementation evidence in [status](status.md).
