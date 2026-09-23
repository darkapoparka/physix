# Session checkpoint and next action

## Mobile Book simplification - 23 September 2026

Owner rejected wrapping category/title stacks, the oversized appointment summary and First visit under the availability action. Public Book now uses one shared ServiceChoice row with compact image and Home presentation titles; saved local booking reuses it with authoritative duration. Removed category copy, the empty appointment summary, First visit link and top coming-soon banner. Kept unavailable status inside the availability sheet because production has no booking backend. No fake slot/confirmation or local-auth production bypass was added. Requested owner choice between appointment requests and authoritative live times; hosted booking implementation remains pending that choice and backend configuration.

Design check, typecheck, scoped lint, 125 unit tests and production build pass. Production-mode browser verified service selection, availability sheet/focus return and one-line service titles at 320/390/430/768/1440px without document overflow. Evidence: evidence/book-mobile-20260923. Full browser runner remains blocked by previously documented missing executable; local persisted booking journey, enlarged text and Bulgarian were not rerun. Owner visual acceptance remains pending.

## Public services and signed-out entry - 23 September 2026

Committed and pushed as 2f474f1; production deployment https://physix-cdaqk76w2-tyj5.vercel.app completed successfully. Verified public alias https://physix-sable.vercel.app shows service tiles on Home, three Book services and the compact signed-out care panel.

Owner requested the missing production services, less wrapping on small phones and a shorter signed-out My care entry. Public Home and Book now display the existing service metadata without enabling development fixtures or claiming available slots. Book uses the compact Bookings coming soon notice; its availability sheet contains no production demo link. Common issue buttons use one column below 430px, two below 1000px and four on desktop. My care uses the existing contextual header plus one compact sign-in panel. Hosted sign-in remains unavailable; no authentication or backend guard was bypassed.

Passed: design check, typecheck, scoped ESLint, 125 unit tests, production build and diff check. Tested the production build on isolated port 3220: Home, Book and signed-out care at 320/390/430/768/1440px, no document overflow or broken loaded images; service selection, availability sheet and focus return checked. Saved before/after care and Home screenshots plus responsive measurements in evidence/public-entry-20260923. Full browser suites remain blocked by their previously recorded missing agent-browser executable. Enlarged text, Bulgarian and owner visual acceptance remain open. No provider provisioning or patient-data change.

## First Vercel production deployment - 23 September 2026

Owner created tyj5/physix and explicitly requested fixing its missing production deployment. Verified project prj_QS52hh5k8Vb9yiGsfzKVtb1LhWJW had zero deployments. Deployed a git archive of committed main 19cf33eecfab66cdd2bad31c18e082a9ee040577 via Vercel CLI from an isolated temporary export; no untracked public/dev prototypes, local environment files or disk database were uploaded from the checkout. Vercel build/TypeScript completed and deployment dpl_48NraY389ggKVr4KMnA4bjHhEuuB is READY, target production, no alias error.

Public production: https://physix-sable.vercel.app . The alternate team alias physix-tyj5.vercel.app redirects unauthenticated visitors to Vercel sign-in; protection was not changed. Public Home and /book return 200 and Home was inspected in the browser. /care redirects to /login?returnTo=%2Fcare. /api/physix/v1/me returns 503 SETUP_REQUIRED because the hosted PhysiX backend is not configured. Book correctly says Booking is not open yet; local preview service imagery, synthetic accounts and persisted care are development-only. This establishes hosting, not clinic release or a hosted local-test backend. No donor project or authentication boundary was changed. Future automatic Git deployment wiring was not verified by this CLI deployment.


## GitHub checkpoint and Vercel inspection - 23 September 2026

Owner explicitly requested commit and push of the current UI work. Origin is darkapoparka/physix (public), main; fetch confirmed HEAD and origin/main both at 7ad59f3 before the new checkpoint. Commit scope includes the current Home/Book/My care implementation, required logo/care artwork, provenance and local evidence. Rejected design exploration/public-dev prototypes and failed-suite scratch results remain untracked locally. No database directory or environment files are included. Latest design/type/scoped lint/125-unit/build checks passed; browser runner limitations remain documented above.

GitHub connector confirms repository push/admin permission. Vercel connector is connected to team tyj5 (team_RTNXBnClGWDdcYFFUW0BnqvJ). Enumerated all 41 projects through read-only CLI pagination; no physix project, no local .vercel/project.json, and no Vercel statuses on the previous PhysiX main commit. The separate gymaf project has four Ready deployments for darkapoparka/gymaf, latest preview source 60582a5. This is not a PhysiX deployment. No deployment resumed, created or reconfigured. Existing GitHub workflow listens for astra pushes and main/astra pull requests, not direct main pushes.


Activity emphasis correction, 23 September: owner rejected the large green sessions-finished card. Replaced it with the existing compact Row component: Your activity, saved session count as secondary text, clock icon and progress destination. Preserved 12px separation from check-in; measured 72.5px row height at 390px and inspected live rendering/progress destination. Design, typecheck, scoped lint, 125 unit tests and build pass. Broader browser-runner and localization limitations remain as above; visual approval pending.


Shared appointment refinement, 23 September: restored visible visit mode and authoritative duration beneath the service in NextAppointmentCard, including duration in its accessible name. Kept the existing green surface, date/action alignment and single saved-detail link; Home and Today reuse the change. Checked 320/390/430/768/1440 reflow (no card/document overflow), inspected 320/390 screenshots, checked saved detail and Back, and verified Home renders the same details. Design/types/scoped lint/125 units/build passed. Existing full-browser-runner block and enlarged-text/localization limitations remain. Screenshot: evidence/care-polish-20260923/refined-appointment.png. Owner visual acceptance pending; no commit/push/deployment.


Today spacing correction, 23 September: owner identified touching activity/check-in cards. Grouped those existing links with a token-based 12px gap and 24px preceding space in the owning care CSS module. No card restyle or appointment change. Measured 12px separation at 320/390/430/768/1440 with no document overflow; checked live screenshot and keyboard focus. Design/types/scoped lint/125 units/build passed. Full browser runners remain blocked by the previously documented missing executable; enlarged text/localization and owner visual acceptance remain open. Evidence: care-polish-20260923/support-spacing-detail.png and spacing-*.log.


## My care polish - 23 September 2026

Owner requested a restrained Today-first polish, shared components and before/after evidence. Continued main at 7ad59f37de53a26a9026511e7e4235ff0bcc259a with extensive pre-existing dirty work preserved. Owner explicitly superseded the older Remote Desktop Commander rule for this task; used Codex local tools and the in-app browser.

Fixed two measured tab-layout causes: Today/Schedule subtitle rows changed tab vertical position (Today versus plans: 27.5px), and classic scrollbars changed content width by 15px. All four care destinations now reuse CareHeader (My care, Account, existing labelled navigation). Date and schedule context sit below navigation. Root scrollbar-gutter is stable. Tabs use 14px labels and 44px targets; plan filters and week arrows use the shared control sizes. Today has token-based section spacing and retains its existing session/week/programme patterns. Home and Today now render the same NextAppointmentCard, extracted from the current solid-green Home design. Home's identity invalidation wrapper remains intact. No appointment/session mutation, provider, schema, clinical-content or donor change.

Passed: design check; typecheck; scoped ESLint across eight touched care/shared TSX files; 125 unit tests; production build; diff whitespace check. In-app browser: all four tab headers have identical x/y/width geometry at each 320/390/430/768/1440 viewport with no document overflow; 44px tab targets; visible keyboard focus; saved appointment detail from Today and Home plus Back; plans empty filter and reset; next/previous schedule week and empty week. Inspected 320/390 Today, 390 plans/schedule and 1440 Today screenshots. No captured console errors. Evidence: evidence/care-polish-20260923 (geometry JSON, command logs, before/after and responsive captures). Screenshot raster width can exclude the 15px native scrollbar gutter.

Blocked: test:home-system, test:home, test:navigation, test:appointments and test:programmes all stop before assertions because their configured agent-browser executable is missing (ENOENT). In-app checks above are separate evidence, not full-suite passes. Not rerun: 200% text, Bulgarian, guest/no-assignment, expired/loading/error, other-patient/provider-delay and full session-mutation/database regressions. Owner visual approval and release acceptance remain open. No commit, push or deployment.


## Rejected Book appointment row removed — 23 September 2026

The owner rejected both the white “Your next appointment” card between appointment type and search and its later separator row below service choices. Book's first step now has no duplicate upcoming-appointment entry. The header's “My visits” link opens the authorized appointment list, and Home still shows an actual upcoming appointment when available. Removed the unused row styling and client-side appointment projection from Book; booking, saved records and detail routes are unchanged.

Inspected the live Book page at 320px and 390px with no document overflow. Confirmed no appointment row remains and “My visits” opens the saved appointment list; browser Back returns to Book. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests, `npm run build` and `git diff --check` passed. `test:appointments` and `test:navigation` were not rerun after this removal; the preceding attempt stopped before assertions because their configured `agent-browser-win32-x64.exe` is missing (ENOENT). Enlarged text, Bulgarian, physical-device and owner visual acceptance remain open. No commit, push or deployment was made.

## Service-led next appointment card — 23 September 2026

The owner then called out the card's empty left space, small right-hand details and tight right edge, followed by a request to align the time with the action. The forest whole-card link sizes itself to its contents. Its “View visit” action sits directly under the actual service, while the month/day sits on the right; the zoned time and action share one grid row and are vertically centered together. Month/time are larger than the previous version, with more right padding. Mode stays in the accessible link name and saved detail. Other appointment views and the near-black My care card are unchanged.

Inspected the aligned card at 320px and 390px. Measured action/time centers at 320/390/430/768/1440px: they match to the pixel, with no card or document overflow and 45px horizontal clearance at 320px. Height is about 144px at 320px and 143px at 390px. The current card opened the saved `/care/appointments/:id` detail and browser Back returned Home. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests, `npm run build` and `git diff --check` passed. `npm run test:home-system` stopped before assertions because its configured `agent-browser-win32-x64.exe` is missing (ENOENT). Enlarged text, Bulgarian, physical-device and owner visual acceptance remain open. No commit, push or deployment was made.

## Rejected appointment panel corrected — 23 September 2026

The owner rejected the large pale mint Home appointment panel with its detached dark date block. A later white bordered version was also rejected and superseded above. No appointment data or list-card styling changed.

Inspected live at 320px, 390px, default phone and 1440px; checked 430px and 768px for document overflow. Followed the whole-card link to the persisted detail and returned Home. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests and `npm run build` passed. `npm run test:home-system` again stopped before checks because its configured `agent-browser-win32-x64.exe` is missing (ENOENT). Enlarged text, Bulgarian, physical-device and owner visual acceptance remain open. No commit, push or deployment was made.

## Owner-directed next appointment layout — 23 September 2026

Replaced the rejected Home appointment summary with a dedicated, whole-card link: “Next appointment,” the actual service/time/mode on the left, the month/day calendar tile on the right, and a small outlined “View appointment” pill matching the My care action language. The actual saved status sits beneath the date. At 320px the card reduces padding and date size so the title and action stay on one line; at desktop widths it shares the My care card's 40rem cap. Other appointment list cards and persisted booking behavior are unchanged.

Inspected live at 320px, 390px, the default phone width, 768px and 1440px; 430px had no document overflow. The card opens its saved `/care/appointments/:id` detail and Home navigation returns. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests and `npm run build` passed. `npm run test:home-system` remains blocked before checks by the missing configured `agent-browser-win32-x64.exe` (ENOENT). Enlarged text, Bulgarian, real-device and owner visual acceptance remain open. No commit, push or deployment was made.

## Home care action and appointment preview — 23 September 2026

Reduced the visual “Open My care” pill to 32px high while keeping the entire dark card as the `/care` link. Reworked the Home-only next-appointment summary from a heavy forest block to a light mint card with a forest date tile, compact details and a quiet footer. The underlying appointment component, saved record and detail route remain unchanged.

Inspected the live page at 320px, the default phone width, 768px and 1440px; checked 390px and 430px for document overflow. The saved appointment preview opened its persisted detail page and Home navigation returned. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests and `npm run build` passed. `npm run test:home-system` could not launch its configured `agent-browser-win32-x64.exe` (ENOENT, zero checks). Other automated browser suites, enlarged text, Bulgarian, physical-device checks and owner visual approval remain open. No commit, push or deployment was made.

## My care pill and two-row label — 23 September 2026

Refined the current dark Home care card at owner request: “Open My care” now reads as a subtle translucent outlined pill, and the support copy is fixed to two rows, “Appointments” and “Plans & progress.” Narrowed the decorative art at phone widths so the pill and text have separate space. Live phone-sized screenshot inspected. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests and `npm run build` passed. Exact 320px, enlarged-text and full browser-suite acceptance remain open; the configured automated browser runner is still missing.

## My care visual card — 23 September 2026

The owner rejected the plain white My care row and clarified that the earlier flat green card was badly styled. Replaced the row with one near-black, whole-card `/care` link: large My care title, generic navigation copy, explicit action and a small decorative sage/ivory loop cutout on the right. The first render let artwork approach the subtitle; revised widths separate them on the inspected phone-sized page. This is a visual treatment only, with no fabricated care status or changed booking/persistence behavior. The generated asset is `public/physix/home-2026/care-loop-v1.webp`; prompt, source and hash are in CARE_ASSET.md.

Live phone-sized screenshot inspected; whole-card navigation to `/care` and browser Back verified. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests and `npm run build` passed. The configured automated Home browser runner remains unavailable, and exact 320/430/768/1440, enlarged-text, Bulgarian and physical-device checks were not run. Owner visual approval is still open. No commit, push or deployment was made.

## Original My care row restored — 23 September 2026

The owner clarified that the original unboxed My care row was fine; only the later green card was horrible. Restored that exact row and its CSS after Before your visit, and restored the server-owned care projection used by Home. Removed only the added icon badge, colored panel and arrow bubble. Inspected the live phone-sized Home and confirmed the original visual treatment and `/care` link are present. Existing booking, appointment and saved-care behavior remain unchanged.

The restored row was followed to `/care` and browser Back returned Home. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests and `npm run build` passed for this restoration. The full automated Home suite remains unavailable because its configured browser executable is missing. No commit, push or deployment was made.

## Rejected Home care card removed — 23 September 2026

The owner rejected the solid My care card. A sand restyle still repeated the page's rectangular surfaces, so the extra Home care entry was removed entirely. The persistent My care dock and desktop navigation remain, and a real saved next appointment still appears in its established position. Home's request projection no longer computes an unused programme summary. Existing saved-care routes, data and synthetic records were not changed.

Inspected the live phone-sized Home ending, used the My care dock to open `/care`, and returned with browser Back. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests and `npm run build` passed. The automated Home browser suite is still blocked by its missing executable, and its older assertions about the removed care panel need updating before it can be counted as a current regression. Exact 320/430/768/1440, enlarged-text, Bulgarian and physical-device checks remain open. Preserve unrelated dirty files; no commit, push or deployment was made.

## Solid My care entry — 23 September 2026

The owner found the lower Home My care text row too weak. Replaced that row with one solid green whole-card link, a stronger title, an icon tile and a clear arrow. It remains below visit information to preserve booking/discovery priority. The card contains only generic navigation copy; no guest programme or progress is invented. Kept the clinic/online icons rather than adding generated artwork that would compete with the service photography.

Inspected the live phone-sized lower Home, opened `/care` through the card and returned with browser Back. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests and `npm run build` passed. The automated Home browser runner remains unavailable at its configured path from the preceding check; exact 320/430/768/1440 captures, enlarged text, Bulgarian and physical-device acceptance were not run. Owner visual approval remains open.

## Home booking/discovery polish — 23 September 2026

Moved the existing clinic/online booking pair into the continuous sage Home intro below search. Forest/white actions now form one clear booking zone; the photographic service library starts separately on white with a quieter title and no duplicate View all link. No service, mode, booking or patient data changed. Preserved the pre-existing dirty work in this checkout.

Inspected the before/after phone-sized live Home in the browser, followed both booking actions to their correct mode-selected Book screens, and used Back to return. `npm run check:design`, `npm run typecheck`, scoped ESLint, all 125 unit tests and `npm run build` passed. `npm run test:home-system` could not launch: its configured `agent-browser-win32-x64.exe` is absent (ENOENT, zero checks). Broader automated navigation/appointment suites, exact 320/430/768/1440 captures, enlarged text, Bulgarian and physical-device checks were not run. Visual owner approval remains open.

Hero refinement: centered How can we help? at 20–24px, with a bounded centered search area on desktop. Inspected at 390px. Design and TypeScript checks passed; full browser suites/build not rerun for this CSS-only refinement. Real clinic location remains awaiting owner details; no invented address or decorative booking imagery added.

Copy/typography correction: removed the Physiotherapy eyebrow and rejected Move with confidence slogan. Home now asks How can we help? with a smaller 28–48px medium-weight heading, natural wrapping and less compressed tracking. The continuous background and booking placement remain. Mobile render inspected; design check and scoped lint passed. Visual acceptance remains open.

Owner correction: the inset forest hero card was rejected. Header, headline and search now share one full-width sage background; booking actions sit below on white. Verified manually at 320/390/1440px; design check and scoped lint passed. Visual approval remains open. This supersedes the prior solid-card direction.

## Solid Home hero and raster identity — 23 September 2026

Owner requested a solid-color hero, shorter copy, generated raster logo and explicit booking labels. Home now has a forest hero with “Physiotherapy” and “Move with confidence.”; controls read “Book in clinic” and “Book online.” At widths below 360px they stack to preserve readable text. Generated transparent PNG replaces the shared SVG logo; prompt and provenance are in BRAND_ASSET.md. No new preview variant.

Design check, scoped ESLint, all 125 unit tests and production build including TypeScript passed. Live screenshots inspected at 320/390/1440px. Automated Home/navigation/care browser regressions remain unrun because the configured runner is missing, as previously recorded. Enlarged text, Bulgarian and physical-device acceptance remain open. Visual owner approval is pending.

## Home section separation — 23 September 2026

Owner requested a green appointment banner and a stronger break between services and Common issues. The Home-only appointment summary now uses forest with white text, a white date tile and a subtle inset action area. Common issues is a single soft mint panel below the photographic services, with white issue buttons. The requested section order is unchanged and no extra CTA was added. Inspected the rendered result at default phone width and 320px; the appointment action wraps at the narrow width without clipping.

## Owner correction: booking-first Home for everyone — 23 September 2026

Removed the returning-user welcome/priority layout. Home now always starts with the established introduction, booking controls, service grid and Common issues. The actual next appointment follows Common issues, before Before your visit, as requested. Programme/session panels stay in My care; Home has a quiet care link at the bottom. Browser accessibility inspection confirmed this exact order for the signed-in local account. This supersedes the previous personalization arrangement and its rationale.

## Home relevance and fewer competing actions — 23 September 2026

Owner requested implementation of the guest/returning-user distinction. Guest and empty-account Home now have a quiet My care link after the practical visit information, replacing the large promotional banner. Common issues have a smaller heading and no duplicate View all link. Users with a real upcoming appointment or unfinished assigned programme see a compact welcome and those authorized next actions before booking/discovery. Completed programme summaries remain accessible through the quiet care entry. Removed the extra All visits action from the Home appointment summary and increased its supporting text size.

Observed the existing signed-in synthetic account with its saved appointment and completed programme: appointment appears first, completed programme produces no feature panel, quiet care entry remains. Inspected 320px reflow with no horizontal document overflow. An unauthenticated HTTP request returned guest care after visit information with no appointment or returning heading. Design check, scoped ESLint, 125 unit tests and production build/TypeScript passed. Active/empty-account browser fixtures and full automated suites were not rerun; the previously recorded missing browser runner remains a limitation. No authentication changes, saved-record mutations, new previews or deployment.

## Home typography and button alignment — 23 September 2026

Owner requested restoration of service arrows, dark Online text and proper left-aligned booking icons. Restored 16px caption chevrons; service captions now use medium weight and natural letter spacing so Physiotherapy and its arrow fit together at 320px. Booking controls retain 52px height with left-aligned 20px icons and 16px medium labels; Online uses dark ink. Home's headline has a slightly smaller dedicated token, more line spacing, less negative tracking and consistent dark text. Checked 320/390px screenshots and measured both controls; no document overflow at 390px. Existing wider-screen and automated-suite limitations remain; this is a visual refinement for review, not a claim of perfect typography.

## Home density refinement — 23 September 2026

Owner preferred the aligned Home and requested smaller booking actions, vertical service browsing, a single care-banner action and colored information buttons without separator lines. Clinic/online are now 52px controls with 16px labels. Services remain a two-column mobile grid; caption arrows were removed after 320px inspection showed one squeezing Physiotherapy onto an extra line. The care banner has only its state-aware care action; public programmes remain accessible through the service tile. Before your visit uses full-width mint buttons with spacing instead of separators.

Design check, changed-file ESLint and final production build (including TypeScript) passed. Inspected phone layouts including 320px, measured both booking controls at 52px, and verified the first-visit sheet opens, closes with Escape and restores focus. Existing automated-browser-runner limitation and broader acceptance gaps from the preceding checkpoint remain. No new variants, provider actions or deployment.

## Home aligned with Book; numbered steps removed — 23 September 2026

Owner requested removal of Book's 1/2/3 progress strip and a matching Home. Removed the progress component and its unused CSS. The mode switch now follows the contextual header directly. Home now uses the same white canvas, forest emphasis, mint supporting surfaces, rounded controls and readable action scale. Replaced the dark hero/photo overlays with a normal header and typographic introduction; service photography has separate captions; common issues are compact text links; care remains a distinct forest panel. Home uses the same light labelled dock as Book. Existing catalogue links, mode parameters, server-owned care summaries and information sheets remain connected.

Verified: design check, typecheck, changed-file ESLint, 125 unit tests and production build pass. Browser inspection covered 320/390/430/768/1440 widths, online mode entry, a direct service-to-time link and native Back. The numbered strip is absent on service and time screens. Automated Home/navigation/appointment suites were not rerun because their configured browser executable was missing in the preceding attempt; enlarged-text, Bulgarian, signed-in summary regression and physical-device checks remain open. Visual approval is not claimed. No new preview variant, provider action or deployment.

## Live Book styling pass — 23 September 2026

Owner pointed to the actual `/book?step=time&service=physiotherapy` screen as the visual anchor and directed us to stop making preview variants. Updated the real `/book` flow in place: service choice surfaces and mode selection now follow the time step's forest/mint controls; card titles, metadata, progress and action text have a larger consistent scale; the narrow date rail hides its native scrollbar; and the last service remains reachable above the mobile dock. Shared contextual header actions now meet the 44px/14px target. Review gives the chosen service, appointment time and local-test details distinct hierarchy without the long bordered list. Focused time/review steps use a single centered content column on tablet/desktop. Booking state, catalogue eligibility, persistence and API logic were unchanged. No new preview or artwork was created.

Verified on the running local-test app: clinic service selection, online eligibility, service search, service-to-time transition, slot selection and review; visual reflow at 320, 390, 430, 768 and 1440px with no horizontal document overflow at inspected widths. `npm run check:design`, `npm run typecheck`, 125 unit tests, changed-TSX ESLint and `npm run build` passed. The automated `test:ui` script could not start because its configured `agent-browser-win32-x64.exe` is missing on this machine; its generated evidence files were restored to their clean pre-run state. Browser checks here are manual inspection, not a substitute for the full saved-workflow suite, enlarged-text/Bulgarian, physical-device or owner visual acceptance. No push, provider action or deployment.

## Mobile ImageGen exploration — 23 September 2026

At the owner's request, inspected the live phone-sized Home, Book and signed-in Today screens on `127.0.0.1:3217` and generated three coordinated mobile concept images. The owner rejected that set and then rejected the browser-rendered v2 as too generic. A distinct Fidelity-inspired v3 Home/Book/Today study is now at `public/dev/physix-mobile-v3.html`; see `design-exploration-20260923/README.md`. The preview was inspected at 320px and 390px with loaded images/fonts and no horizontal overflow. It is separate from the actual product UI; no booking, care, provider or runtime behavior changed, no broader tests ran, and visual approval remains open. The live Home appeared dark/photo-led while the 21 September checked-in Home evidence is white/task-led; the discrepancy is uninvestigated.

## Current: high-contrast Home — 21 September 2026

The owner rejected the pastel/faded composition. Home now has a normal-flow white header, near-black typography, one booking pair, larger photographic service sources with plain captions, a text-only care panel and practical information rows. Returning appointment/care summaries precede discovery. No provider, SQL, saved-player or database reset.

Verified: design checks, typecheck, full lint, 125 unit tests, build, 46 production-isolation requests; 21 Home, 23 navigation and 19 appointment checks. Screenshots were inspected at phone/desktop sizes and enlarged text containment was corrected and retested. See evidence/home-contrast-20260921. The broader UI and separate saved-workflow suites were not rerun; previous saved-workflow startup failure remains separate. Visual acceptance and physical-device/full accessibility review are still open.

Continue the canonical checkout on `main`. Do not create or use a review/feature branch. No new design board, donor write, deployment or live clinic transaction. Current design authority is DESIGN.md and current owner feedback, not the rejected screenshots.

## Historical: Home-system completion — 20 September 2026

The interrupted bundle was originally installed on a temporary review branch, then moved to `main` and that review branch was deleted on 21 September 2026. Home and shell use the shared semantic token source; service cards derive from the catalogue; booking and information have distinct large targets; authorized care comes before discovery. Existing brand, art, dock, contextual headers, stored care and booking logic are retained. README and active design/continuation guidance are reconciled; previous versions are preserved under history.

Verified: 125 unit tests, 133 named browser checks across six completed suites, 5 isolated HTTP tests, 7 asset checks and 46 production-exclusion requests. Typecheck, scoped/full lint and build passed (two existing legacy coach warnings). The separate saved-workflow suite failed at its initial sign-in wait in two runs; that workflow is not counted as passing. See evidence/home-system-20260920 for exact reports and inspected before/after captures.

Owner-authorized GitHub delivery is `darkapoparka/physix` `main`. The temporary review branch was retired and deleted; do not recreate it. Do not push into Gymaf. No deployment or database reset. Visual owner approval, complete legacy CSS migration, high-resolution approved media, real clinic providers and physical-device/accessibility acceptance remain separate.

---

## Historical checkpoints — not competing current styling instructions

## Mobile task headers and appointment management — 20 September 2026

Implemented contextual mobile headers for Book, appointments and care; the approved Home and stable bottom dock remain. Book now exposes My visits, clear stages and a selected-time action footer. Confirmed reservations open authorized persisted detail pages; cancellation has Keep/Cancel review, pending and failed-retry states. Upcoming/Past/Cancelled views, generic calendar export, Book again, and direct Home/Today/Schedule appointment entries are connected. No SQL, saved database, provider or asset replacement. See UX_AND_ROUTES and BOOKING for owning contracts, and evidence/mobile-appointments-20260920 for verification.

## Home composition revision — 20 September 2026

The owner rejected the preceding editorial Home. This revision removes the separate heading plus large duplicate photo feature. The existing header overlays one photographic forest masthead containing the sole headline, high search and two booking actions. Treatment discovery is a compact keyboard-scrollable rail; in-clinic/online information is one grouped list; first-visit details use a sheet. The four-destination dock and booking/session mechanics are unchanged.

Home now renders a minimal server-authorized programme summary. Guests and empty accounts have distinct non-fabricated states; saved attempts can be resumed, read-only care links to the programme record, and cross-tab identity changes clear the summary before refresh. No check-in body or full account payload is passed to Home. Production still has no local persona access.

All media is provisional generated imagery, not Charlie, real patients or the actual centre. The on-dark wordmark is an alpha-cleaned monochrome derivative of the existing asset, not a new identity. The earlier staged implementation was backed up before edits and its functional work preserved. Visual owner approval remains outstanding. Verification: 103 unit tests, 83 scoped browser checks, build/typecheck/scoped lint and 45 production-isolation requests passed. See evidence/home-composition-20260920 for the broader UI rerun limitation.


## Reference-led implementation — 20 September 2026

Final verified result: 121 browser assertions (13 Home, 23 navigation, 17 programme, 42 shared UI/booking, 26 saved workflow), 95 unit tests, 36 isolated database checks, five HTTP tests, nine asset checks and 45 production-isolation requests. Final changed-file lint, typecheck and build exited 0. Whole-repository lint repeat ran out of memory after earlier passes; bounded final lint and exact limitations are recorded. Evidence: editorial-implementation-20260920. No push or deployment.

Entry: 3c82691892b628b636d75affc33c428f1aaed436 on main, clean. Continued M:/physix-app; original Gym Fidelity remains read-only. The user authorized implementing the Gymaf/Future-led direction after the saved-reference study, not another planning pass.

Implemented: continuous white header/intro/high search; photographic centre lead; horizontal unboxed treatment tiles with captions on the page; compact online visit and programme entries. Public and private programme libraries share the library role. Today has a media-first saved-session feature; session detail is a static cover, not a self-link. Week/schedule/progress use neutral data panels and selective green state. Missing instructional video is compact and explicit; the final exercise has one Finish action. The fixed four-item navigation and care subnavigation do not change with sign-in.

Photos are optimized versions of three existing generated donor images, not actual clinic/Charlie/patient photography. Originals, six 3D cutouts and reference screenshots remain preserved. assets/editorial-v1 records provenance, dimensions, hashes and pending publication approval. The three derivatives total 207,002 bytes. No new image generation, copied Nike/Future photo assets, fake address or fabricated exercise video.

Booking/session command logic, server authorization, backend/SQL and saved database remain intact. Service thumbnail paths changed to the same photo family; booking geometry and behaviour remain. All local records and test accounts are synthetic. No new commercial/provider functionality is implied.

See evidence/editorial-implementation-20260920 for final checks and captures. An enlarged-text section heading overflow was fixed, wide photo crops were corrected, and the saved-workflow test was updated to target the remaining primary Finish action. Intermediate tooling failures are recorded separately; they are not represented as passing tests. Visual owner approval, actual clinic media/address, approved exercise videos/instructions, real Auth, payments and release acceptance remain outstanding.


## Original-reference review — 20 September 2026

Entry: d5493ef, main, clean. Owner rejected the Home styling and requested the original Gymaf/Nike fitness-app references. Inspected donor code plus four original saved Future Pro screens. Retrieved Nike publisher screenshots from its official App Store listing and reviewed Nike/Future public product materials. Saved seven reference-only images, SHA-256 provenance and a side-by-side HTML viewer under references/fitness-apps-20260920. Mobbin search required a paid plan; no new Mobbin result was obtained. Donor navigation on 3216 timed out and a blank image was rejected as evidence.

No frontend, backend, dependency, schema, saved-record or development-server changes. No application test/build claims for this documentation-only checkpoint. Corrected current visual guidance to stop treating each rejected implementation as a locked owner decision. Original Gymaf/Future remains primary, Nike secondary; photographic feature/library distinctions matter more than rearranging coloured cutouts. Stable booking, My care routes and dock must survive any subsequent visual work.

## Centre-first homepage — 20 September 2026

Implemented the owner-requested homepage around clinic tasks rather than another grid/filter iteration: restrained mint identity/search intro, horizontal treatment discovery, matching in-clinic/online visit panels, ongoing patient plans and first-visit questions. Desktop shows the treatments together and pairs the visit panels. No category picker or fabricated map/clinic photograph. Location and online information sheets explicitly distinguish pending clinic details from functioning local test booking.

Application scope is only home.tsx, home.module.css and home-visits.tsx. Shared cards, navigation, booking, auth, care and the saved database are unchanged. Existing decorative assets reused. The original Gym Fidelity remains unchanged.

Fresh verification: 11 homepage + 43 shared UI/booking + 23 navigation checks; 95 unit tests; TypeScript, changed-file lint and build; six asset checks and 45 production isolation requests. Viewports 320/390/768/1440; keyboard rail scrolling, information-sheet focus and native disclosures included. Evidence: evidence/centre-home-20260920. Not real clinic bookings, live video, real-device certification or owner visual approval.


## Home direct-discovery revision — 20 September 2026

Removed the rejected Services / By area switch and obsolete Home browse state. Four booking choices are visible directly in a two-column mobile grid (four on desktop), with shared CareCard geometry tokens, consistent imagery/title treatment and top-corner link affordances. Back/neck remain searchable; their unused cutouts are preserved. Booking, patient controllers, identity, storage, navigation and shared default card geometry are unchanged.

Verified: 45 Home/booking + 23 navigation + 25 saved-workflow browser checks, 95 unit tests, typecheck/build/changed-file lint, 45 production-boundary checks and six asset-integrity checks. Four viewports and bounded doubled-text tests passed. Evidence: evidence/home-direct-20260920. This is a local-test UI revision, not visual approval or live clinic delivery.


## Home coherence — 20 September 2026

Owner feedback identified the Home sections as inconsistent while booking/navigation were improved. Replaced the separate service rail, landscape Find your focus stack and custom online banner with one How we can help collection. Services / By area use the same unchanged CareCard primitive and geometry. Online is a normal service card; back/neck map to the existing physiotherapy offering. One forest banner leads directly to private programmes. Existing artwork, header, high search, typography and fixed dock remain.

Public browse selection is server-rendered and URL-backed; native Back, reload, keyboard links and unsupported-category fallback are tested. Only Home TSX/CSS and its single public route branch changed in application source. Booking, care, authentication, APIs, database, shared card component and navigation code are unchanged.

Verified: 41 Home/shared UI checks, 23 navigation checks, 95 unit tests, TypeScript, changed-file lint, production build, six asset-integrity checks and 45 production-exclusion requests. Both browse views at 320/390/768/1440, plus doubled-computed-font stress at 320/390/768. This does not claim real-device/full accessibility approval or clinic readiness. Evidence: evidence/home-coherence-20260920. No new images, dependencies, database reset, push or deployment.


## Navigation recovery and first-render correction — 20 September 2026

The interrupted navigation implementation was already present as uncommitted work at d5597f6. It was preserved and reviewed, not replaced by another project or design. Home / Book / My care / Menu is now the same consumer navigation before and after sign-in. /app is compatibility-only; existing links retain their authorized destination through sign-in. The Home programme banner goes directly to /care/programmes.

Care views now receive the account snapshot already authorized by the server. They render useful content immediately instead of discarding that result and presenting a second loading screen. The client still revalidates and clears records on identity changes or denied requests. No private browser storage was added. Local development responses require revalidation; production checks separately assert private/no-store responses.

Keep the current solid-colour cards, white canvas, typography and compact icon-only dock. This change does not authorize another visual-system replacement. Real clinic Auth, paid fulfilment, clinician content and operational booking remain outside this local-test checkpoint.



Fresh recovery verification: 95 unit tests; 23 navigation, 17 programme, 28 UI and 25 saved-workflow browser assertions; 36 disposable database checks; five HTTP tests; six asset checks; 45 production-isolation requests. Typecheck, lint and build passed; two pre-existing legacy coach warnings remain. Evidence: evidence/navigation-finish-20260920. No push or deployment.

## 20 September 2026 — stable navigation and care URLs

User feedback correctly identified different public/private navigation. The consumer dock is now always Home (/) / Book (/book) / My care (/care) / Menu: the same four icons, labels, destinations and positions before and after sign-in. Logo always opens /; Account always opens /care/profile. /app is retained only for old-link redirects, including the scheduled-workout compatibility path. Private data still requires server authorization; login resumes only an allowlisted intended care destination.

My care uses Today / My plans / Schedule / Progress subnavigation. Session overviews keep the normal dock; only an active player or focused booking step suppresses it. Programme detail now shows a static completion summary, optional metadata and sessions without a repeated self-linking hero/status banner. Existing Fidelity solid cards and art are preserved.

Verified: typecheck, changed-file lint and build; 94 unit tests; 20 navigation + 17 programme + 28 UI + 25 saved-workflow browser checks; 36 isolated database checks; five HTTP tests; six asset checks; 45 production isolation requests. Four viewport widths: 320/390/768/1440. Final browser run had no uncaught errors. Evidence: evidence/navigation-continuity-20260920.

A runtime restart preserved all existing session, programme and appointment IDs. Source donor and its listener were untouched. Local synthetic care remains distinct from real clinic Auth, paid fulfilment, clinical content and live booking readiness. No push or deployment.

## 20 September 2026 — one product, real programme library and schedule

Locked to one shared visual system for public discovery and private care, not two differently designed apps. Home uses horizontal services, vertically stacked solid landscape focus cards and the forest online banner. Patient Today / Programmes / Schedule navigation uses the existing Shell, CareCard and dock.

The former My Plan view incorrectly represented each scheduled workout as a programme. It now groups actual assignment IDs and published version metadata. /app/plans is the programme library; /app/plans/:assignmentId contains its sessions/history; /app/workouts/:scheduledId is a session overview; existing old links redirect safely. /app/schedule combines clearly separated exercises/appointments with working week/day selection. /app/progress has 7/28-day and programme filters, active-day charts and selected-day history. Existing sets, attempts, pause/resume, booking and practitioner assignment still work locally.

Verified: 84 unit tests, 36 disposable local PostgreSQL checks, 17 programme UI checks, 28 shared UI/booking checks, 25 saved-workflow checks, 36 production-boundary checks and six asset checks. Typecheck, changed-file lint and production build pass. Four widths: 320/390/768/1440. Exact evidence: evidence/unified-care-20260920. Large-text Home grid expansion was found and fixed; full real-device/accessibility acceptance is not claimed.

The local backend adds only an actor/RLS-scoped metadata read for existing assignments/versions. No migrations, command-state rewrites, paid orders, provider access or donor writes. Current single-selected-relationship and bounded-read limits remain. The saved database was backed up after graceful close and preserved through the local service restart. Real Auth, clinic configuration, purchased-plan fulfilment, messaging and approved clinical media are still separate work. Charlie portrait not supplied. Do not create another frontend or generate another design board.


## 20 September 2026 — Fidelity cards and solid panels restored

The owner rejected the white-polish thumbnail/bento redesign. White remains the canvas; it did not authorize replacing Fidelity's component family. Current source shares CareCard between public discovery and saved plans, restores serif display roles and substantial mint/sage/sand media panels, uses forest/mint banners, and adapts the source weekly-calendar panel with actual stored schedules. Tiny outlined Back/Neck/Online rows are removed. The compact icon-only dock, high search and direct service-to-time entry remain.

Final verification: typecheck/build/changed-file lint exit 0; 74 unit tests, 28 UI browser checks, 25 saved-workflow checks, 36 production isolation requests and six asset checks passed. Intermediate intrinsic card-height regression was caught in a screenshot and fixed; a new browser hit-test proves Start session is visible and unobstructed. Evidence: evidence/fidelity-panels-20260920. Backend, SQL, auth and persistence source stayed unchanged. Browser mutations use synthetic local records only; no live clinic functionality is claimed.

Continue M:/physix-app, not the donor. Current source is intentionally not declared owner visually approved. Do not inherit the rejected white-polish card layout as an owner decision. Read the current AGENTS/DESIGN mapping; do not change the design system again merely to adjust a background colour.


## 20 September 2026 — white canvas and refined hierarchy

Owner feedback requested a white base and more polish. Replaced the all-over tint with white/neutral surfaces, strengthened sans-serif heading hierarchy, prioritized the main care card and reduced the prominence of supporting illustrations. The compact icon-only dock remains, now with white inactive controls and a forest active state. Booking/session/authorization code and assets were preserved.

Verified: 28 UI and 24 saved-care browser checks; 320/390/768/1440 widths; 74 unit tests; TypeScript, changed-file lint and build; six asset-integrity checks; 36 production-isolation requests. Home doubled-computed-font stress passed at 320/390/768 after fixing lead-card text/art overlap. Six semantic contrast pairs passed; not a full accessibility audit. Evidence: evidence/white-polish-20260920. Local synthetic data only; no provider changes, push or deployment.


## 19 September 2026 — saved local care and bookings

Verified implementation checkpoint: `0de64dc26252ce57387c012e15ac7d86e91d2f01`. Final typecheck/lint/build exit 0; 74 unit tests, 31 local PostgreSQL checks, 26 saved-journey browser checks with 28 responsive captures, focused four-width booking checks plus persisted cancellation, five inherited HTTP fixtures and 36 production-exclusion requests passed. Two existing legacy coach lint warnings remain. No push or deployment.

Current implementation has two deliberately different environments. The old /dev/demo is still an in-memory visual reference. The working local app is /login -> Open patient app -> /app, with /book and /app/book for saved test reservations and /practitioner for staff. Both are development-only; neither is a real clinic service.

npm run dev now starts a single disk-backed local PostgreSQL process (PGlite 0.5.8) and Next on 127.0.0.1:3217. Records live in .artifacts/physix-local/pgdata. Do not delete or reset that directory to get a clean screenshot. A random per-launch RPC secret stays server-side. Patient cookies identify explicit synthetic test accounts, not verified Supabase users. No Gymaf environment, patient records, cloud project or credentials were imported.

Retained unchanged: the first four Gymaf care SQL migrations, their version/assignment/session/set semantics, authorization helpers, idempotent command handling and immutable completed history. The provider-shaped auth bootstrap is synthetic local test infrastructure. The new namespace /api/physix/v1 exposes a reviewed local allowlist; legacy command names stay in the adapter. Do not enable the local persona selector in production.

Working locally: start a distinct session, save actual repetitions/time/resistance, mark a set skipped, pause/resume after reload, explicitly finish or abandon, inspect immutable history, see scheduled-session adherence without double-counting repeat attempts, share a weekly check-in, reserve and cancel test appointments, view appointments/check-ins as the assigned practitioner, and assign an existing published sample plan to another authorized test patient.

Styling: restored the actual Fidelity dock geometry (at 390px: 348x64 rather than 358x68), translucency and lighter active surface. Reduced inflated patient headings, corrected the mobile time-picker grid overflow, kept the focused booking action reachable, and fixed narrow-screen statistics/account accessibility. A fresh 3216 browser visual comparison did not complete; parity is NOT claimed from a stale screenshot. Source CSS and actual PhysiX screenshots are the evidence.

Verification is recorded in evidence/persistence-20260919: real local PostgreSQL checks include database close/reopen, unchanged retry, changed-payload rejection, completed history, sibling denial, explicit sharing, overlap exclusion and cancellation; browser checks include actual reload navigation, a failed save/retry, units, pause/resume, persisted booking and practitioner assignment. The single local database serializes requests; this does not substitute for multi-connection hosted concurrency testing. Check the result JSON/logs for final counts and exit codes.

Still NOT delivered: verified clinic identity/authentication, production-ready role lifecycle or MFA, actual approved services/prices/timezone/policies, guest verification/appointment claiming, appointment holds or rescheduling, external calendar source-of-truth integration, notifications/reminders, payments/purchased-plan fulfilment, private messaging, a full clinical plan editor, approved exercise instructions/videos, offline health-data storage, real mobile-device/Bulgarian/200% text acceptance, or release approval. The booking table and fixed sample availability are a local pilot, not the full BOOKING contract. Do not turn local synthetic MFA/auth fixtures into production access.

Next: keep this source and compact visual family. Confirm the clinic's scheduling source of truth and configure a separately authorized PhysiX staging backend with real Auth. Adapt the tested persistence contracts, rather than starting over or pointing at Gymaf. Continue clinician-authored plan configuration and required operational/permission tests. No push or deployment was authorized.

## Historical checkpoint — recovered implementation and extended booking preview

Tested source checkpoint: `05e84daff0839440e1d36fef466efc466354b828`. Final checks passed: lint (two existing legacy warnings), typecheck, production build, 68 unit tests, five isolated loopback HTTP tests, 27 production-boundary requests, and 74 browser checks. A documentation-only follow-up records the source checkpoint. No push or deployment.

The canonical repository **exists at M:\physix-app** and is running on **3217**, PID **38400** at recovery inspection. It is an independent checkout on `main`, not a linked worktree. The donor on 3216 remains M:\gym-fidelity, PID 23036; no donor files or servers were changed. The previous planning-only statements below are historical.

Found on entry: imported source checkpoint `5e7c6a1ab121d3e214d8904e3ef63691a102a831`, the four-screen PhysiX adaptation and its safe public/private/demo boundaries, all still largely uncommitted. Recovered rather than recreated this work. The imported correction patch exactly equals the current eight-file Fidelity dirty diff; SHA-256 is recorded in SOURCE_PROVENANCE. All 14 installed planning documents initially matched the attached archive manifest.

Implemented during this recovery: development-only service → date/time → fixed synthetic contact → review → explicit non-reservation result; example selection appears on patient Home. Demo Book now stays within the shared demo layout so exercise activity survives navigation. Focused booking steps hide the mobile dock after a real browser test caught it covering Continue. Review links reflow correctly. Menu row links close their sheet. Added booking-model tests and a four-viewport browser regression.

Verified before final checkpoint: 68 unit tests; 53 booking browser checks with 20 captures at 320/390/768/1440 widths; 21 core interaction checks with 21 route/viewport captures at 320/390/1440. Both browser suites passed without uncaught errors. Final build, lint and isolated HTTP/production results are recorded in the recovery evidence README and check-exits JSON. No hosted services or database resets were used.

Current real limitations: no patient identity provider, live availability, authoritative appointment persistence, payment processing, clinician-approved content, or production release. Demo contact values are fixed synthetic values. Reloading clears demo state. Patient/staff routes fail closed to the setup/sign-in screen; the old backend only supports explicitly isolated loopback contract fixtures.

Next: owner review of the running bounded adaptation; then an explicitly isolated PhysiX backend slice for catalogue/availability → persisted booking, with concurrency and ownership tests. Do not return to physix-pro or perform another framework rewrite. Read NEXT_SESSION.md.

## Historical planning record — superseded as a statement of current filesystem state

## 19 September 2026 — planning complete, implementation not started

Selected foundation: `M:\gym-fidelity`, observed branch `review/mobbin-fidelity`, HEAD `60582a5` with eight modified tracked paths. Independent PhysiX destination: `M:\physix-app`. Motion Makers is the content/asset/booking donor; Astra is a supplementary reference; physix-pro is historical.

The downloadable package contains 14 indexed Markdown documents plus a content-hash manifest. Desktop Commander reached its monthly quota before remote saving: **`M:\physix-app` was not created, and the documents were not written to the owner's PC**. The tool explicitly paused further calls; no reconnect or quota-bypassing route was attempted. The consolidated reading copy and individual-document package are supplied in chat. Neither is an application checkout. No app source was copied or edited, no dependencies installed, no server restarted/stopped, no account provisioned, no database/schema touched, no payment sent, no Git repository/remote created, and no commit/push/deployment performed by this planning work.

Read the actual source/inspection limits in SOURCE_AND_MIGRATION. The current saved Fidelity screenshot was inspected as historical synthetic evidence, not fresh visual acceptance. Existing donor test reports were not independently rerun. The documentation integrity checks do not substitute for application tests.

## Next bounded implementation task

PX00–PX02, beginning with safe bootstrap and one coherent visual proof. No more project-choice debate, no framework rewrite, no complete new image board and no polishing Motion Makers as the main frontend.

The clinic brief can be completed in parallel. Missing business facts block publishing/charging/clinical release, not an isolated labelled shell demo. The main question to settle commercially is whether the first digital offering is ready-made programmes, individualized programmes after assessment, or both.

## Copyable next-session prompt

```text
Continue PhysiX using the supplied PhysiX planning package. The intended
workspace is M:\physix-app; it was not created in the planning session.
First locate/read this package (from the attached archive or extracted folder).
Do not assume the documentation or application already exists at that path.
Use Remote Desktop Commander for all filesystem, terminal and browser work on my PC.
The chosen foundation is M:\gym-fidelity, not Motion Makers.

Read AGENTS.md, README.md and docs/physix/{DECISIONS,SOURCE_AND_MIGRATION,
SESSION,DESIGN,UX_AND_ROUTES,ARCHITECTURE,DELIVERY_AND_QA}.md.
This is an explicit request to implement the first bounded slice, not to deploy.

First recheck all source identities and preserve dirty work. Follow the staged,
independent-clone procedure; do not copy Fidelity's .git worktree pointer or
.env.local, do not lose its local fixes, and do not push to the Gymaf origin.
Keep donor checkouts/runtimes and their databases unchanged. Reconcile any
newer planning edits before moving the verified derivative into M:\physix-app.

Keep Fidelity's stack and app-like visual family. Separate public routes from
patient authentication. Add an explicit development-only synthetic demo with
no real provider writes. Normal accounts must have honest empty/error states.
Build a coherent PhysiX adaptation of Home, Book/service selection, My Plan
and an exercise session, reusing the existing component/session foundations.
Do not invent clinic facts, prices, prescriptions, imagery rights or payments.

Run the appropriate baseline checks; inspect the result in the actual browser
at mobile and desktop widths. Save the source identity, screenshots and exact
check results. Update SESSION and the acceptance rows. Stop for owner review
of this bounded visual set before expanding the remaining screen catalogue.
Do not claim booking, payment, clinical or production readiness from the demo.
```

The new repository name/remote, hosted project and production deployment remain unapproved. No cloud action is implied by copying this prompt.

## 20 September 2026 — mint UI and assets finalized; supersedes earlier visual checkpoints

Recovered the already implemented but uncommitted mint refresh after interrupted chat responses. The six generated cutouts are installed in real responsive cards, with preserved originals and hash metadata in assets/illustrations-v1. Production WebP source set: six transparent 800px files, 485,980 bytes total. They are decorative discovery art, not actual staff or exercise instructions.

Current Home has a short centered heading and high search; two card columns on mobile, three on desktop. The mint/jade/forest semantic palette replaces lavender. MobileDock uses independent icon-only circles adapted from the inspected Treido source. Public dock: 200x44px; patient dock: 252x44px. Supporting controls can be 32–36px. Accessible names, focus and keyboard-input hiding remain.

Service selection now opens time selection on a single tap. Home cards enter the same flow directly. Native Back/Forward, review state, failed reservation/retry and persisted acknowledgement were tested. Saved exercise actuals, reload/resume, history, shared check-ins and practitioner assignment remain working locally.

Fresh evidence: evidence/mint-final-20260920/README.md. Passed: 23 mint UI checks; 24 saved-workflow checks with 28 responsive captures; 74 unit tests; 31 local database checks; six asset integrity checks; five isolated HTTP tests; 36 production-exclusion checks; typecheck/build/lint. Two existing coach lint warnings remain. Viewports: 320, 390, 768 and 1440.

M: disk exhaustion interrupted an initial screenshot and disposable database test. Four disposable physix-check-* directories were verified and relocated to system temp; the saved app database was not reset. The test runner now creates and cleans its own system-temp fixture. Original failed logs are retained; verified reruns are authoritative.

No donor source changes, hosted configuration, live patient records, charges, push or deployment. Real clinic availability/Auth, clinical media, purchases, reminders and release approval remain separate work. Continue this implementation; do not regenerate the six-asset set or restore the old dock.

Verified mint implementation checkpoint: `82beae558bfbd7cc3eb14a90eac2b23e1195c443`. The following documentation-only commit records this source SHA. No push or deployment.

## Latest checkpoint — selected Image Gen finish, 20 September 2026

Recovered the interrupted selected-target implementation at ee38c9f; preserved all 22 incoming modified/untracked files. The current Home uses the selected image composition, seven separate decorative picture assets and BrandMark's SVG/live lettering. The shared dock follows the selected labelled capsule. Narrow phones use a readable service rail rather than 10px captions; care copy and its decorative motto no longer overlap. Booking and saved care were preserved.

At entry, 3217 had a listener but Home, the API and static media all timed out. Stopped the old supervisor; verified the old database writer had exited, copied its saved directory into the session's system-temp backup, and started the existing database again without resetting it. The original cause of the stall was not established. The launcher now records readiness, PIDs and a file-backed dev log under .artifacts/physix-local, checks port ownership before opening the database, and supports graceful database shutdown via IPC. Normal startup remains npm run dev.

Final checks passed: typecheck, full lint (two existing coach warnings), build, 103 unit tests, seven target-asset checks and 45 production-isolation requests. Browser suites passed 128 assertions: Home 19, UI/booking 43, navigation 23, programmes 17, saved workflows 26. Home was checked at 320/390/430/768/1440; the UI suite includes bounded doubled-font checks. A separate Chromium iPhone-sized 3x-density capture loaded all seven images; this was not a physical-device or Safari test.

Evidence: docs/physix/evidence/selected-home-finish-20260920. Last HTTP probes returned 200 for Home, Book, Login, offers and the hero asset; the listener was PID 7464. The approved reference is the supplied physix_movement_care_dashboard.png, not earlier Home screenshots. No fake OS chrome or reference progress values are rendered. Small reference crops remain a photographic-resolution limitation; neither pixel-perfect parity nor complete accessibility certification is claimed. No push or deployment.

## 23 September 2026 — Book concept revision

The owner rejected v3 Book's small progress tabs, white service rows, borders and green text. Created `public/dev/physix-mobile-v4.html` as a preview-only revision. Book now has large clinic/online choices, clear three-step progress, a dark canvas and photographic service cards. Its local search filters the sample list; online mode excludes the in-clinic-only sports service and preserves `mode=online` in direct links. Home and Today were carried over from v3.

In-app browser checks: 390px clinic view and 320px online view rendered without horizontal overflow; the online list showed two choices; search showed one-match and no-match states. This does not alter the product Book route, provider data or saved bookings. Owner visual review remains open. No push or deployment.

## 23 September 2026 — typography and style audit

The owner found the v4 concept's buttons and general typography too small. Browser measurements confirmed 13px Home booking labels and 10px dock labels, although the current token contract specifies 16px main actions and 14px supporting controls. The standalone concept bypassed the token source. `npm run check:design` passed but scopes its audit to Home and Shell CSS Modules, not static previews or all inherited booking/care CSS. The live Home booking label measured 16px; six inherited feature CSS Modules still contain 10–13px rules that require later interactive-label review. See `design-exploration-20260923/STYLE_AUDIT.md`.

Created `public/dev/physix-mobile-v5.html` as a new candidate with a coherent type scale, larger actions and navigation, fewer outlines and wrapping at 320px instead of reduced button text. In-app browser checks covered Home, Book and Today at 320px without document-width overflow, and the Home service grid at 768px. No application route or saved data changed; enlarged-text, Bulgarian, real-device and owner visual approval remain open. No push or deployment.

## 23 September 2026 — art-direction correction

The owner clarified that the actual objection was the visual styling; v5 enlarged a generic treatment. Revised the audit accordingly and created `public/dev/physix-mobile-v6.html` as a distinct visual study: bold sans/italic-serif introduction, near-black search and labelled dock, one lime accent, warm-neutral discovery, less rounded photography and full-bleed service imagery in Book. Reused existing local decorative assets; no product route, saved data or provider changed.

In-app browser checks at 390px inspected Home, Book and Today. At 320px Home and online Book had no document-width overflow; Home action labels remained 17px with 62px targets; online Book showed two eligible services and preserved `mode=online` in direct links. This is a visual candidate, not owner-approved product styling. No push or deployment.

## 23 September 2026 — v6 rejected

The owner rejected v6's speculative lime/editorial treatment as AI slop. Returned the visible preview to v4 Book, the last direction described as relatively better. Marked v6 rejected in the exploration audit and task state; no v6 values or markup were moved into the application. A concrete visual reference is needed before another styling attempt. No push or deployment.
