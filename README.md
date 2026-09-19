# PhysiX — app-first physiotherapy

**Implementation checkpoint: 19 September 2026.**

## Decision

Use **Gymaf/Fidelity (`M:\gym-fidelity`) as the selected code and visual foundation** for PhysiX. Use **`M:\physix-app` as the destination for the independent PhysiX product**. Motion Makers is a donor for PhysiX content, assets and booking requirements, not the frontend to keep polishing.

**State: saved local test application.** Start with `npm run dev`, open `http://127.0.0.1:3217/login`, and choose **Open patient app** or **Open practitioner view**. `/app` now uses a disk-backed local PostgreSQL store for sample plans, workouts, history, check-ins and appointments; `/book` and `/app/book` reserve test times. The original `/dev/demo` remains an in-memory visual-only reference. None of these routes represents real clinic accounts or reservations. The original Fidelity server on 3216 stays separate and unchanged.

This is a deliberate adaptation of useful code, not a new framework rewrite and not a fourth competing frontend. Preserve Fidelity's app-like composition and useful programme/session machinery. Replace the fitness business model where it differs from physiotherapy.

## Product in one sentence

A mobile-first PhysiX website where people discover the clinic, book in-person or online appointments, purchase eligible exercise programmes, and use their account to follow assigned or purchased plans, record sessions and check-ins, and communicate with their physiotherapist.

## Read order and document ownership

| File | Owns |
|---|---|
| `AGENTS.md` | Instructions for implementation agents and evidence discipline |
| `docs/physix/DECISIONS.md` | The project choice, agreed direction, proposed defaults and unresolved decisions |
| `docs/physix/PRODUCT.md` | Users, scope, commercial concepts and end-to-end outcomes |
| `docs/physix/UX_AND_ROUTES.md` | Navigation, screen inventory, route ownership and interaction states |
| `docs/physix/DESIGN.md` | Fidelity adaptation, visual acceptance, components and asset provenance |
| `docs/physix/BOOKING.md` | Appointment rules, availability, concurrency, cancellation and staff operations |
| `docs/physix/PLANS_AND_PAYMENTS.md` | Programme access, prescriptions, sessions, payment and fulfilment contracts |
| `docs/physix/ARCHITECTURE.md` | Stack, module boundaries, API conventions and environments |
| `docs/physix/DATA_AND_SECURITY.md` | Conceptual entities, permissions, privacy and security release gates |
| `docs/physix/SOURCE_AND_MIGRATION.md` | Actual inspected checkouts, reuse map and safe bootstrap procedure |
| `docs/physix/DELIVERY_AND_QA.md` | Implementation sequence, acceptance tests and operating readiness |
| `docs/physix/CLINIC_BRIEF.md` | Facts and decisions the clinic must supply; external technical references |
| `docs/physix/SESSION.md` | Current status and the next-session implementation prompt |

There is one active specification. Historical Gymaf and Motion Makers documents are references, not competing product instructions. Update the owning document rather than creating a parallel master plan.

## What is settled versus still open

The product is app-first, web-first, Fidelity-based, and includes bookings plus a patient exercise experience. No framework or full-site design restart is needed.

Ready-made versus individually prescribed programmes, actual service names, prices, clinic jurisdiction, policies, practitioner identity, payment account and approved media remain business/content decisions. The model supports both kinds of programme without pretending they are interchangeable. Defaults are explicitly marked in DECISIONS and CLINIC_BRIEF.

## First implementation result

An isolated PhysiX derivative that preserves the selected Fidelity design family, has an explicit synthetic demo, and demonstrates Home → Book → My Plan → Exercise session. First prove the visual foundation and route separation; then connect one complete booking workflow and one complete patient-plan workflow. Do not spend several more iterations redesigning a marketing homepage in isolation.

## Current evidence

See `docs/physix/SESSION.md`, `SOURCE_PROVENANCE.md` and `evidence/persistence-20260919/` (current) and `evidence/recovery-20260919/` (historical). The checked-in planning manifest records the original specification, not the current implementation status. Source and screenshots being present do not imply clinical approval or production readiness.
