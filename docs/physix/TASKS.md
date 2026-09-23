# Current implementation tasks

## Mobile Book simplification - 23 September 2026

Owner rejected wrapping category/title stacks, the oversized appointment summary and First visit under the availability action. Public Book now uses one shared ServiceChoice row with compact image and Home presentation titles; saved local booking reuses it with authoritative duration. Removed category copy, the empty appointment summary, First visit link and top coming-soon banner. Kept unavailable status inside the availability sheet because production has no booking backend. No fake slot/confirmation or local-auth production bypass was added. Requested owner choice between appointment requests and authoritative live times; hosted booking implementation remains pending that choice and backend configuration.

Design check, typecheck, scoped lint, 125 unit tests and production build pass. Production-mode browser verified service selection, availability sheet/focus return and one-line service titles at 320/390/430/768/1440px without document overflow. Evidence: evidence/book-mobile-20260923. Full browser runner remains blocked by previously documented missing executable; local persisted booking journey, enlarged text and Bulgarian were not rerun. Owner visual acceptance remains pending.

## Public services and signed-out entry - 23 September 2026

Owner requested the missing production services, less wrapping on small phones and a shorter signed-out My care entry. Public Home and Book now display the existing service metadata without enabling development fixtures or claiming available slots. Book uses the compact Bookings coming soon notice; its availability sheet contains no production demo link. Common issue buttons use one column below 430px, two below 1000px and four on desktop. My care uses the existing contextual header plus one compact sign-in panel. Hosted sign-in remains unavailable; no authentication or backend guard was bypassed.

Passed: design check, typecheck, scoped ESLint, 125 unit tests, production build and diff check. Tested the production build on isolated port 3220: Home, Book and signed-out care at 320/390/430/768/1440px, no document overflow or broken loaded images; service selection, availability sheet and focus return checked. Saved before/after care and Home screenshots plus responsive measurements in evidence/public-entry-20260923. Full browser suites remain blocked by their previously recorded missing agent-browser executable. Enlarged text, Bulgarian and owner visual acceptance remain open. No provider provisioning or patient-data change.

Activity emphasis correction, 23 September: owner rejected the large green sessions-finished card. Replaced it with the existing compact Row component: Your activity, saved session count as secondary text, clock icon and progress destination. Preserved 12px separation from check-in; measured 72.5px row height at 390px and inspected live rendering/progress destination. Design, typecheck, scoped lint, 125 unit tests and build pass. Broader browser-runner and localization limitations remain as above; visual approval pending.


Shared appointment refinement, 23 September: restored visible visit mode and authoritative duration beneath the service in NextAppointmentCard, including duration in its accessible name. Kept the existing green surface, date/action alignment and single saved-detail link; Home and Today reuse the change. Checked 320/390/430/768/1440 reflow (no card/document overflow), inspected 320/390 screenshots, checked saved detail and Back, and verified Home renders the same details. Design/types/scoped lint/125 units/build passed. Existing full-browser-runner block and enlarged-text/localization limitations remain. Screenshot: evidence/care-polish-20260923/refined-appointment.png. Owner visual acceptance pending; no commit/push/deployment.


Today spacing correction, 23 September: owner identified touching activity/check-in cards. Grouped those existing links with a token-based 12px gap and 24px preceding space in the owning care CSS module. No card restyle or appointment change. Measured 12px separation at 320/390/430/768/1440 with no document overflow; checked live screenshot and keyboard focus. Design/types/scoped lint/125 units/build passed. Full browser runners remain blocked by the previously documented missing executable; enlarged text/localization and owner visual acceptance remain open. Evidence: care-polish-20260923/support-spacing-detail.png and spacing-*.log.


My care polish, 23 September: stable shared header and scrollbar gutter across Today/My plans/Schedule/Progress, larger tab/filter/week controls, shared solid-green Home/Today appointment component and Today spacing. Local source checks and 20 tab/width layout observations pass; full browser runners blocked by missing executable. See SESSION and evidence/care-polish-20260923. Visual acceptance, enlarged text and localization remain open.

Book saved-visit correction, 23 September: the owner rejected both the white appointment card above search and the separator row below services. Removed the duplicate from Book's first step; “My visits” remains in the header and opens the saved list. Live 320/390px views and navigation checked; design, types, scoped lint, 125 unit tests, build and diff check pass. Appointment/navigation automation remains blocked by its missing configured executable. Owner visual acceptance, enlarged text and Bulgarian remain open.

Home appointment hierarchy, 23 September: after owner feedback, removed reserved height, grouped “View visit” with the service, enlarged month/time, and increased right padding. Follow-up aligned action and zoned time on the same grid row; measured vertical centers match at 320/390/430/768/1440px with no overflow. Live 320/390px screenshots checked. Design, types, scoped lint, 125 unit tests, build and diff check pass. Automated Home runner remains blocked by its missing executable; owner visual acceptance, enlarged text and Bulgarian remain open.

Earlier Home appointment revision, 23 September: the large mint panel was replaced by a compact white bordered card. The owner then rejected the white card; the solid treatment above supersedes it.

Home appointment correction, 23 September: replaced the rejected preview with an in-card title/details-left, date-right layout and matching small action pill. Live 320/390/default phone/768/1440 views and saved detail navigation checked. Design, typecheck, scoped lint, 125 unit tests and build pass; automated Home runner still fails ENOENT before checks. Owner visual acceptance, enlarged text and localization remain open.

Home card follow-up, 23 September: reduced the My care visual pill and simplified the Home-only next appointment card. Live 320px/default phone/768px/1440px views and persisted appointment detail navigation checked; 390px/430px show no document overflow. Design, types, scoped lint, 125 unit tests and build pass. Owner visual acceptance, enlarged text, Bulgarian and automated browser suites remain open.

My care card refinement, 23 September: subtle outlined Open My care pill and two support rows implemented and inspected at phone size. Design, types, scoped lint, 125 unit tests and build pass; exact 320px/enlarged-text and automated browser acceptance remain open.

Latest Home care treatment, 23 September: the rejected white row is now a near-black visual card with a decorative abstract cutout and one `/care` link. Live phone-sized rendering and navigation checked; design, types, scoped lint, 125 unit tests and build pass. Owner visual approval, exact responsive captures and the automated Home browser runner remain open. See CARE_ASSET.md.

Owner clarification, 23 September: restored the original unboxed My care row after Before your visit. The colored-card styling and subsequent removal were rejected; the original row remains a generic `/care` entry. Live phone-sized appearance, navigation and Back checked; design, types, scoped lint, 125 unit tests and build pass. Automated Home browser runner remains unavailable.

Owner rejection, 23 September: the duplicate My care Home card was removed. Persistent dock/desktop navigation and the saved appointment detail remain the care entry points. Live phone-sized Home and dock navigation checked; design, types, scoped lint, 125 unit tests and build pass. The missing browser runner and stale care-panel assertions remain open, as do owner visual approval and wider responsive/accessibility checks.

My care Home polish, 23 September: replaced the quiet lower text row with a solid green whole-card `/care` link. Live phone-sized visual and navigation checked; design, types, scoped lint, 125 unit tests and build pass. Owner visual acceptance and wider responsive/accessibility checks remain open; automated Home runner is missing.

Home booking/discovery polish, 23 September: the booking pair now sits inside the sage search area; service discovery starts on white without a duplicate View all booking link. Live phone-sized rendering and both mode links checked. Design, types, scoped lint, 125 unit tests and build pass. Automated Home checks remain blocked by a missing runner; owner visual acceptance and wider responsive/accessibility checks remain open.

Hero refinement: centered How can we help? at 20–24px, with a bounded centered search area on desktop. Inspected at 390px. Design and TypeScript checks passed; full browser suites/build not rerun for this CSS-only refinement. Real clinic location remains awaiting owner details; no invented address or decorative booking imagery added.

Copy/typography correction: removed the Physiotherapy eyebrow and rejected Move with confidence slogan. Home now asks How can we help? with a smaller 28–48px medium-weight heading, natural wrapping and less compressed tracking. The continuous background and booking placement remain. Mobile render inspected; design check and scoped lint passed. Visual acceptance remains open.

Owner correction: the inset forest hero card was rejected. Header, headline and search now share one full-width sage background; booking actions sit below on white. Verified manually at 320/390/1440px; design check and scoped lint passed. Visual approval remains open. This supersedes the prior solid-card direction.

Home hero/identity follow-up: solid forest hero, concise copy, explicit booking labels and generated PNG logo implemented. Design/lint/125 unit/build checks pass; 320/390/1440px manually inspected. Owner visual approval and automated browser regression remain open; see SESSION and BRAND_ASSET.

Home styling follow-up: forest next-appointment banner and mint Common issues panel implemented; default phone/320px screenshots inspected. Visual acceptance remains open.

Latest Home direction (23 September): booking and discovery first for everyone; optional next appointment after Common issues; programme/session details in My care. The earlier returning-dashboard ordering is rejected and removed.

Updated 20 September 2026. Distinguish saved LOCAL-TEST behaviour from provider-verified clinic delivery. Historical NOT STARTED and memory-only statements do not describe the current app.

| Slice | Current state | Remaining acceptance |
|---|---|---|
| PX00 bootstrap | Independent Fidelity-derived checkout established; source preserved | Keep provenance current; do not clone again |
| PX01 visual foundation | Book-aligned Home with one booking pair, photographic service library, actual next appointment when available, and a dark visual My care card after visit information. The flat green card and white text row were rejected on 23 September. Rejected static concepts remain in docs/physix/design-exploration-20260923. | Owner visual review of Home and live Book flow; current browser regression recovery, broader screen migration, real-device and assistive-technology checks |
| PX02 boundaries | Public browsing; separate memory demo; local server-session test accounts; production blocks both local modes | Real verified PhysiX Auth, full lifecycle/MFA/role review |
| PX03 catalogue/availability | Public sample offers and UTC test windows from local PostgreSQL | Actual clinic configuration, rules, buffers, exceptions, staff availability editor |
| PX04 booking | Service tap opens times directly; Back/Forward and safe retry tested; local reservations/cancellations persist with existing overlap/ownership guards. Live service/time/review styling polished and manually inspected on 23 September. Rejected duplicate upcoming-visit entry removed from Book's first step; automated UI runner unavailable on this machine. | Owner visual acceptance, full booking browser regression rerun, guest verification/claiming, real calendar source, holds, atomic rescheduling, policies, notifications and provider acceptance |
| PX05 care delivery | Retained immutable versions/assignments/actuals; saved attempts, pause/resume/finish/history; staff assigns published samples | Real clinician content/editor/media, staging authorization/version/lifecycle validation |
| PX06 commerce | Not connected; complimentary assignments are not fake purchases | Offers, approved merchant, one-time checkout, verified fulfilment and isolation |
| PX07 tracking/messages | Saved session activity, due-session adherence, shared weekly sample check-ins and practitioner read | Clinician-approved question model/trends, private messaging, ended-relationship and production privacy review |
| PX08 staff/lifecycle | Local calendar list, patient detail, actuals/check-in review and sample assignment | Full operational calendar, role lifecycle/recovery, exports, audit/notifications and administration |
| PX09 responsive/accessibility | My care header/tab geometry stable at 320/390/430/768/1440; shared Today appointment and control sizing locally checked.  Latest Book-aligned Home visually inspected at 320/390/430/768/1440; online and direct-service entry verified. Book's numbered progress row removed at owner request. | Latest enlarged-text and signed-in regression, automated browser suite recovery, Bulgarian, assistive technology and real mobile devices |
| PX10 release | Not approved | Real identity/content/provider/privacy/operations acceptance and explicit deployment approval |

Use /login -> /care, not /dev/demo, to inspect saved behaviour. The clinical/production rows remain partial even when their local tests pass.

Home refinement, 23 September: compact 52px clinic/online controls, vertical two-column service discovery, one care-banner action and full-width mint information buttons implemented. Narrow-phone captions and information-sheet focus return verified; owner visual acceptance remains open.

Follow-up: restored service chevrons, corrected booking icon alignment and Online text color, and adjusted Home headline/caption typography. Verified 320/390px rendering; visual acceptance remains open.

Home relevance: guest/empty/completed care is now a quiet lower-page link. Actual upcoming appointments and unfinished assigned programmes lead the returning layout. Existing signed-in appointment/completed state and unauthenticated guest response checked; active/empty browser regression and visual acceptance remain open.

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
