# Decisions

## Implementation clarification — 19 September 2026

D01/D02 are now executed: M:\physix-app exists as an independent Fidelity-derived checkout, with the donor preserved. The planning-session descriptions of absent folders and documentation-only work below describe that earlier checkpoint. SESSION.md, SOURCE_PROVENANCE.md and TASKS.md own current status. No source, stack, design-family or live-provider decision was changed during recovery.

The booking preview lives under /dev/demo/book with fixed synthetic contacts and an explicit non-reservation result. It validates interaction design only; D07 separation of appointments, purchases and assignments is unchanged.

Date: 19 September 2026. This register distinguishes the owner's stated direction, the selected technical plan, proposed operating defaults, and unresolved clinic decisions.

## Owner direction reflected in this plan

The friend has opened a physiotherapy centre. PhysiX needs a public website, appointment booking, online plans that users can purchase and see in their account, exercise/workout delivery and tracking. The owner prefers Gymaf's app-like interface over the current Motion Makers appearance. This session is for discussion, selecting the foundation and preparing implementation documents—not for deploying a rebrand.

## Selected implementation direction

| ID | Decision | Reason and consequence |
|---|---|---|
| D01 | Fidelity is the foundation; `M:\physix-app` is the independent destination. | Its member-app structure matches the requested product better than continuing the rejected public-site styling. The specification is delivered as a planning-only download; the PC destination has not been created. |
| D02 | Preserve `M:\gym-fidelity`; do not turn the original Gymaf checkout into the clinic product in place. | Protect another product and its uncommitted fixes. Bootstrap an isolated derivative with provenance. |
| D03 | Motion Makers contributes approved content/assets and booking requirements, not its CSS framework or public shell. | Existing PhysiX work is valuable without dictating the new UI. |
| D04 | One responsive web product with public, patient and practitioner surfaces. | The clinic needs discovery and daily account use, not three separate apps. |
| D05 | Keep Next.js, React, TypeScript and Fidelity's existing CSS/component structure. | No framework rewrite or library shopping. Refactor only the boundaries needed for PhysiX. |
| D06 | Preserve programme/session/version mechanics; adapt the domain incrementally. | Exercises, sets/reps, scheduling and progress are useful in physiotherapy. Remove irrelevant fitness/social features, not useful persistence. |
| D07 | A service, appointment, commercial product, entitlement and care-plan assignment are separate concepts. | Buying access must not imply an appointment or a clinical prescription that was never made. |
| D08 | Public browsing and appointment discovery do not require login. | The current member-first authentication wrapper must not become the new public website gate. |
| D09 | Supabase/Postgres remains the backend direction, using a separate PhysiX environment. | Reuse reviewed implementation patterns, never the existing Gymaf customer database or blanket RLS. |
| D10 | Stripe-hosted checkout is the proposed payment integration, subject to clinic merchant eligibility and policy approval. | Reuse candidate provider code; live/sandbox fulfilment still needs verification. Do not provision or charge in this planning session. |
| D11 | Use app-like navigation and Fidelity's visual family, not a generic green-on-white clinic template. | Keep visual continuity while replacing identity, imagery and fitness-specific screen content. |
| D12 | Web first; optional installable experience later; native apps are a separate future project. | Shared APIs/types can help later, but Next.js DOM/CSS is not automatically a React Native UI. |
| D13 | Small vertical slices with visual approval and real persistence tests. | Avoid another sequence of disconnected homepage redesigns or huge speculative screen boards. |

## Proposed defaults, not assertions about the clinic

Start with one clinic and its current practitioner(s), not a marketplace. Hide practitioner/location selection when there is only one eligible choice. Build multiple-practitioner capability where booking needs it, not a multi-tenant SaaS onboarding system.

Use one-time programme purchases and practitioner-assigned plans first. Subscriptions, appointment-credit packs and mixed bundles are modelled as later extensions unless the clinic confirms they are needed at launch. Do not import Gymaf's old monthly price, guest credits, trials or cancellation rules.

For initial in-clinic bookings, paying at the clinic can be the simplest proposed checkout policy. Online consultations and digital products may require prepayment, but the clinic must decide. The application supports the policy selected per offer; it does not invent one from the modality.

Suggested public navigation: Home / Book / Plans / Menu. Suggested patient navigation: Home / Book / My Plan / Progress / Menu. Messages and appointments remain clearly reachable from Home and Menu. Exact labels and the four-screen layout proof are subject to owner review; no new visual approval is claimed here.

Build English/Bulgarian content capability because prior PhysiX work includes it. Confirm the primary public language and jurisdiction before launch. No currency, timezone, age eligibility or professional title is assumed from language alone.

## Open decisions and who owns them

The clinic owns service names, durations, prices, capacity, booking rules, commercial packaging, content, clinician identity and privacy/retention requirements. The product owner approves the adapted visual set and launch priorities. Engineering verifies source reuse, data isolation, persistence and provider behaviour.

The largest commercial question: ready-made self-guided programmes, individually prescribed programmes following assessment, or both? The model supports both, but the UI must state which one the buyer gets and when exercises become available.

`CLINIC_BRIEF.md` is the only intake list for unresolved facts. Unanswered business facts do not prevent safe shell/demo work. They do block publication, real charges and the affected clinical workflows.

## Superseded recommendations

The uploaded conversation initially preferred Motion Makers and later corrected to Fidelity plus a PhysiX derivative. This plan selects the later direction based on the owner's app-first brief and the bounded local inspection. Neither the earlier “only Motion Makers” rule nor Gymaf's independent coaching roadmap becomes PhysiX's product authority.

No claim is made that Fidelity is complete or secure for patient use. The source contains development fixture paths and historical provider/asset acceptance gaps. Source reuse is conditional on testing, not on a previous assistant's confidence.
