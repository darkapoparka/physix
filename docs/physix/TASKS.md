# Current implementation tasks

Updated 19 September 2026. Distinguish saved LOCAL-TEST behaviour from provider-verified clinic delivery. Historical NOT STARTED and memory-only statements do not describe the current app.

| Slice | Current state | Remaining acceptance |
|---|---|---|
| PX00 bootstrap | Independent Fidelity-derived checkout established; source preserved | Keep provenance current; do not clone again |
| PX01 visual foundation | White canvas with Fidelity media-card family, solid panels/banners and stored-schedule week panel; public/patient cards shared | Owner visual approval; real-device and assistive-technology checks |
| PX02 boundaries | Public browsing; separate memory demo; local server-session test accounts; production blocks both local modes | Real verified PhysiX Auth, full lifecycle/MFA/role review |
| PX03 catalogue/availability | Public sample offers and UTC test windows from local PostgreSQL | Actual clinic configuration, rules, buffers, exceptions, staff availability editor |
| PX04 booking | Service tap opens times directly; Back/Forward and safe retry tested; local reservations/cancellations persist with existing overlap/ownership guards | Guest verification/claiming, real calendar source, holds, atomic rescheduling, policies, notifications and provider acceptance |
| PX05 care delivery | Retained immutable versions/assignments/actuals; saved attempts, pause/resume/finish/history; staff assigns published samples | Real clinician content/editor/media, staging authorization/version/lifecycle validation |
| PX06 commerce | Not connected; complimentary assignments are not fake purchases | Offers, approved merchant, one-time checkout, verified fulfilment and isolation |
| PX07 tracking/messages | Saved session activity, due-session adherence, shared weekly sample check-ins and practitioner read | Clinician-approved question model/trends, private messaging, ended-relationship and production privacy review |
| PX08 staff/lifecycle | Local calendar list, patient detail, actuals/check-in review and sample assignment | Full operational calendar, role lifecycle/recovery, exports, audit/notifications and administration |
| PX09 responsive/accessibility | Core local journeys at 320/390/768/1440; focused time/review fixes and compact navigation | Bulgarian, 200% text, assistive technology and real mobile devices |
| PX10 release | Not approved | Real identity/content/provider/privacy/operations acceptance and explicit deployment approval |

Use /login -> /app, not /dev/demo, to inspect saved behaviour. The clinical/production rows remain partial even when their local tests pass.

Final mint verification, 20 September 2026: six assets finalized and integrity-tested; all six Home cards enter times directly; normal Menu/programme links lead to the saved app, not the old demo. Current evidence is evidence/mint-final-20260920. Automated checks passed after relocating disposable test fixtures off the nearly full source drive. Visual owner approval and all clinic release gates remain open.
