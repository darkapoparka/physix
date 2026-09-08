# Frontend component contracts

React/Next implementation. Build components as tasks need them; do not pre-generate an unused UI library. [Reuse inventory](reuse/inventory.json) identifies Gymaf candidates; [frontend guide](reuse/frontend.md) explains adaptation. [Design system](design-system.md) owns visuals.

| Component | Inputs / responsibility | Required behavior |
|---|---|---|
| SiteHeader | locale, approved brand/menu | Semantic home link, compact mobile, desktop navigation |
| BottomDock | locale + current path | Four labelled destinations; safe area; hidden by focused/staff shells |
| PublicShell | children | Public layout, footer/dock clearance; no patient data fetch |
| FocusedFlowShell | heading, back, step, action content | One sticky action area; clear focus/navigation |
| ServiceFinder | approved locale catalogue | Client-only query matching; visible label; no diagnoses/logging/query URL |
| IssueRail / ServiceRail | public DTO list | Normal scroll and optional CSS snap, readable cards, View all; desktop grid |
| ServiceCard | public service + licensed asset | One semantic link, image/title/copy, decorative arrow, no nested links |
| PractitionerPreview | approved public practitioner | Accurate portrait/bio/attributes, no divider columns or fabricated proof |
| ReviewCard / ProgrammeTeaser | approved published DTO or null | Hidden when unavailable; no sample endorsement or false offer in live mode |
| VisitInfo | verified clinic data | Directions/contact links, not a required embedded map |
| OfferingChoice / SlotList | current offering/availability DTO | Native selection semantics, timezone, loading/empty/conflict recovery |
| BookingSummary | authoritative booked/selected terms | Same data contract in review and result; no UI-owned pricing |
| ContactForm / VerifyCode | state, field errors, action | Real labels, autocomplete, generic OTP response, safe resend/retry |
| AppointmentCard | owned safe appointment | Status/action permissions, secure video access |
| PatientDashboard | explicit account capabilities + cards | Useful appointment-only state; no required coaching relationship |
| CareSessionCard | assigned published session summary | Gymaf-inspired layout, PhysiX content, pending/active/completed variants |
| ExercisePlayer | published instructions/media + draft UI state | Accessible controls, appropriate metrics only, pause/skip/contact paths |
| SessionLogForm | owned attempt + targets + revisions | Distinguish blank/zero/skipped; save acknowledgement/conflict recovery |
| PlanBuilder | clinician-scoped draft | Draft != publication != patient assignment; immutable published versions |
| ActivityHistory | persisted owned activity DTOs | Label measured records, not fictional mobility/recovery scores |
| StatusNotice | severity + localized text + recovery action | Correct live-region behavior, no raw provider errors |
| StaffAgenda | administrative DTOs | Readable operations, no unnecessarily complex drag calendar |

Server Components compose pages and load authorized DTOs. Client Components own interaction and transient state, not permissions/prices/clinical approvals. Use `import 'server-only'` at server boundaries. A client cannot import a database service because an old Gymaf component did so indirectly.

Use native elements first. For complex dialogs/menus choose a current React-compatible primitive and style it; do not import the old Svelte widget dependency. Use Next Link rather than upstream capture-link, and CSS Modules instead of copying broad global classes. No screenshots embedded as functional UI; images are separate assets and text remains HTML.

Stateful components cover idle, loading, empty, validation failure, pending write, acknowledged success, conflict and network/provider failure where relevant. Never announce saved/completed until the server confirms. Retry a mutation with its existing idempotency key; don't duplicate attempts after a dropped response. Unsaved patient edits must not disappear on a refetch without recovery.

One Button, FieldError, BookingSummary, ServiceCard and Dock contract. Avoid Final/V2/Modern component forks. Props use minimal stable DTOs, not raw database rows or all-account bootstrap payloads. Split Gymaf's multipurpose pages into components only where there is a real responsibility boundary. Record what was adapted and what was deliberately replaced.
