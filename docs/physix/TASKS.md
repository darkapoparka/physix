# Current implementation tasks

Updated 19 September 2026. Distinguish saved LOCAL-TEST behaviour from provider-verified clinic delivery. Historical NOT STARTED and memory-only statements do not describe the current app.

| Slice | Current state | Remaining acceptance |
|---|---|---|
| PX00 bootstrap | Independent Fidelity-derived checkout established; source preserved | Keep provenance current; do not clone again |
| PX01 visual foundation | Reference-led photographic features, unboxed library cards and neutral care/calendar panels; stable shared shell | Owner visual approval; real-device and assistive-technology checks |
| PX02 boundaries | Public browsing; separate memory demo; local server-session test accounts; production blocks both local modes | Real verified PhysiX Auth, full lifecycle/MFA/role review |
| PX03 catalogue/availability | Public sample offers and UTC test windows from local PostgreSQL | Actual clinic configuration, rules, buffers, exceptions, staff availability editor |
| PX04 booking | Service tap opens times directly; Back/Forward and safe retry tested; local reservations/cancellations persist with existing overlap/ownership guards | Guest verification/claiming, real calendar source, holds, atomic rescheduling, policies, notifications and provider acceptance |
| PX05 care delivery | Retained immutable versions/assignments/actuals; saved attempts, pause/resume/finish/history; staff assigns published samples | Real clinician content/editor/media, staging authorization/version/lifecycle validation |
| PX06 commerce | Not connected; complimentary assignments are not fake purchases | Offers, approved merchant, one-time checkout, verified fulfilment and isolation |
| PX07 tracking/messages | Saved session activity, due-session adherence, shared weekly sample check-ins and practitioner read | Clinician-approved question model/trends, private messaging, ended-relationship and production privacy review |
| PX08 staff/lifecycle | Local calendar list, patient detail, actuals/check-in review and sample assignment | Full operational calendar, role lifecycle/recovery, exports, audit/notifications and administration |
| PX09 responsive/accessibility | Core local journeys at 320/390/768/1440; focused time/review fixes and compact navigation | Bulgarian, 200% text, assistive technology and real mobile devices |
| PX10 release | Not approved | Real identity/content/provider/privacy/operations acceptance and explicit deployment approval |

Use /login -> /care, not /dev/demo, to inspect saved behaviour. The clinical/production rows remain partial even when their local tests pass.

## Historical implementation checkpoints

Final mint verification, 20 September 2026: six assets finalized and integrity-tested; all six Home cards enter times directly; normal Menu/programme links lead to the saved app, not the old demo. Current evidence is evidence/mint-final-20260920. Automated checks passed after relocating disposable test fixtures off the nearly full source drive. Visual owner approval and all clinic release gates remain open.

Unified-care increment: real assignment-level programme library, detail/history, week/day schedule and 7/28-day programme-filtered activity are source-implemented and locally tested. Public and private routes share the same card/shell family. Assigned local programmes are not paid purchases. See evidence/unified-care-20260920 for current verification; full clinician/provider/release rows remain open.

Latest navigation correction: canonical /care with /app redirects; fixed four-destination primary navigation across public and private views; intended destination survives sign-in; programme detail decluttered without a new visual system. Evidence is navigation-continuity-20260920. All existing local programme, booking, workout and tracking journeys retested. Visual owner approval and clinic/provider release gates remain open.

Navigation recovery verified: fixed four-destination consumer dock, safe legacy redirects and login continuation, direct Home-to-library action, server-authorized first render without a second loading wall. See navigation-finish-20260920; provider and visual acceptance gates remain open.

Home coherence increment, 20 September 2026: one Services / By area collection and one My care banner replace the mixed focus/banners. Existing shared visual family preserved; booking/care/navigation source unchanged. 41 UI + 23 navigation checks passed; see evidence/home-coherence-20260920. Owner visual approval remains open.

Home revision, 20 September 2026: removed the rejected category control. Four direct booking choices now share one two-column mobile grid; shared card geometry is scoped so patient views do not drift. See evidence/home-direct-20260920 for verified results. Owner visual approval remains open.


Centre Home update, 20 September 2026: treatment rail, visit modalities/location information, ongoing-care entry and first-visit disclosures implemented and locally checked. Real address/hours, approved clinic/Charlie imagery and online provider remain content/configuration dependencies. See evidence/centre-home-20260920. Booking/patient source was not replaced.

Reference-led media implementation: Home, public/private libraries, Today, overview, player and quiet schedule/progress roles updated. Current tests and limitations are in evidence/editorial-implementation-20260920. Assigned local care still is not paid-plan fulfilment or real clinic delivery.

Home composition revision: continuous header/masthead, direct service rail, grouped visit information and minimal authorized Home care summary. See evidence/home-composition-20260920 for 83 scoped browser checks, 103 unit tests and the explicitly unverified broader UI rerun. Existing clinic/provider release gates remain open.

## Mobile appointments polish — 20 September 2026

Locally implemented: contextual mobile task headers, clear booking stages/footer, owned persistent appointment detail/confirmation, Upcoming/Past/Cancelled filters, safe cancellation/retry, minimal calendar export and direct upcoming-visit entries. Existing server ownership and saved workout mechanics are preserved. See evidence/mobile-appointments-20260920. Real clinic policy, authenticated guest claiming, atomic rescheduling, live video/notifications and real-device acceptance remain open.
