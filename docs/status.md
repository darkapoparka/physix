# Current handoff

Updated: 2026-09-08.

**Current scope: PUBLIC PHYSIX WEBSITE ONLY.** The owner rejected drifting into Gymaf/patient UI and requested a complete public screen handoff directly in GitHub.

## Delivered design reference

[Public visual handoff v2](design/public-v2/README.md) contains 41 screen/state designs, the responsive standalone prototype, individual mobile/desktop PNGs, a full gallery, interaction contracts and asset provenance. The homepage replaces stacked white practitioner/testimonial cards with editorial mint and full-width deep-teal sections. No private dashboard/player/staff screens are included.

The source renderer checks 41 references at 390px, 1440px and 320px reflow (123 layout cases), and eight prototype interaction smoke checks. Actual results are recorded in [review-report.json](design/public-v2/review-report.json). These are prototype tests, not Next.js application or clinical-service evidence.

## Next action

Review the public designs, then implement the public frontend using [the current local prompt](handoff.md). Keep the established Next.js/React/TypeScript baseline. Public work does not require initializing, running or adapting Gymaf. Do not begin patient previews, staff UI, authentication providers, payments, databases or deployment as part of this scope.

The owner has not yet approved the new full public v2 design. No root PhysiX application scaffold, actual booking, account, remote migration, payment or deployment is claimed by this handoff.

## Existing future work

The previously pinned Gymaf source and future patient/backend specifications remain intact for a later separately authorized task. They are not the current public frontend roadmap. [Tasks](tasks.md) remains the single implementation checklist; the completed design task does not complete the application tasks.

## Remaining real inputs

Charlie's actual portrait and professional details, clinic address/contact/hours, approved services/fees/durations/policies, genuine patient reviews, production-resolution media and Bulgarian translations still need approval. The design uses clearly labelled examples or honest content slots. See [open questions](open-questions.md) and [asset provenance](design/public-v2/ASSETS.md).
