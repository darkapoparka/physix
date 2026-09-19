# PhysiX — app-first physiotherapy

## Current visual checkpoint — white surfaces

The working application uses a white canvas, neutral grouping surfaces and selective green accents. Home discovery has a lead service and smaller supporting entries instead of six equally prominent cards. Saved booking and exercise flows remain at /book and /login -> /app. See docs/physix/evidence/white-polish-20260920 for the current browser checks and captures.


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

## Current frontend — mint and illustrated cards

The finalized Home uses high search, six semi-3D illustrations and a compact icon-only mint/forest dock. Service selection opens booking times immediately. Public Menu and programme details lead to the saved application, not the old visual-only demo. Inspect `/` and `/book`; use `/login` then `/app` for saved workouts and tracking.

Asset originals/manifest: `docs/physix/assets/illustrations-v1`. App assets: `public/physix/illustrations`. Verify with `npm run test:assets`. Current checks and screenshots: `docs/physix/evidence/mint-final-20260920/README.md`. These are local test workflows, not a released clinic service.

## Latest correction: Fidelity card family

The white-polish thumbnail/card redesign was rejected. Keep the white page canvas, but use the restored substantial media cards and solid mint/sage/sand/forest panels. Public discovery and saved plans share CareCard; the saved weekly panel uses real local schedule records. Current evidence: docs/physix/evidence/fidelity-panels-20260920. The application and persisted workflow remain in this repository.

## Current patient experience

One shared PhysiX design now serves public discovery and private care. Open /login, then /app/plans for actual assignment-level programmes, /app/schedule for exercises/appointments and /app/progress for recorded activity. /app/workouts/:id is a session overview and /app/sessions/:id is the existing saved player. Public Home retains horizontal services, vertical solid cards and the online banner. Evidence: docs/physix/evidence/unified-care-20260920. These remain synthetic local workflows, not real clinic identity, purchased-plan fulfilment or release approval.
