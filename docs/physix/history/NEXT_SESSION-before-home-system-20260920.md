# Next implementation session

## Mobile task headers and appointment management — 20 September 2026

Continue the selected Home/brand/artwork and shared dock. Internal mobile views now use ContextHeader instead of the global logo row; desktop retains global navigation. Inspect /book → an owned /care/appointments/:id → cancellation, plus the Upcoming/Past/Cancelled hub. The flow and state rules are owned by UX_AND_ROUTES and BOOKING. Run test:appointments together with the existing navigation, saved-workflow and production-isolation suites. Preserve the database and existing programme mechanics. Live clinic policies, atomic rescheduling, real authentication and video joining remain separate work.

Latest feedback rejected the preceding editorial Home. Current revision: continuous photographic header/masthead, compact treatment rail, grouped visit information, and an authorized Home programme summary. Inspect evidence/home-composition-20260920; do not restore the duplicate photo hero or treat this revision as owner-approved merely because tests pass. Booking, patient workflows and navigation remain preserved.

Continue only in M:\physix-app. The source remains Fidelity-derived; do not create another project or modify M:\gym-fidelity. Inspect HEAD, status and listener ownership before editing.

Current navigation: one fixed Home (/) / Book (/book) / My care (/care) / Menu dock. Same labels, targets, size and order on public pages, sign-in and private care. Logo always returns to /; Account always opens /care/profile. Do not restore the public four-item versus patient five-item split.

Private routes: /care, /care/programmes, /care/programmes/:assignmentId, /care/workouts/:scheduledId, /care/sessions/:attemptId, /care/schedule, /care/progress, /care/appointments, /care/check-ins, /care/profile. /app routes are compatibility redirects only. Booking is /book for everyone. Preserve server authorization and safe, allowlisted login return targets.

Keep the Fitness-app reference roles: a continuous Home masthead, white content canvas, captioned library tiles and neutral patient data panels. My care uses Today / My plans / Schedule / Progress subnavigation. Programme detail has one title and a static completion summary, not a duplicate hero/self-link. No new visual direction was approved merely because tests passed.

Use npm run dev for the local test runtime on 3217. Preserve .artifacts/physix-local/pgdata. All identities and records here are synthetic; this is not real clinic Auth, payments or scheduling. Do not reset the store or connect it to the Gymaf hosted database.

Read AGENTS, SESSION, DECISIONS, UX_AND_ROUTES and the latest evidence/navigation-continuity-20260920. Current tests: test:navigation, test:programmes, test:ui, test:local-browser, test:unit, test:local-db, test:assets, test:auth, typecheck, build and scripts/physix-production-check.mjs. Browser tests need their own session and must assert an empty error buffer at entry; this installed browser tool did not clear a previously recorded error with its advertised errors --clear option. Restart only the test browser to obtain a verified clean buffer. Never ignore newly raised errors.

Evidence outputs and disposable databases use system temp. Keep only selected compressed captures and concise reports in Git. Real clinic Auth, booking policies, purchased-programme fulfilment, clinical media and messaging remain separate work. Charlie's actual portrait is still needed before depicting him. No push, new remote, provider provisioning, payment or deployment without explicit approval.

Care pages receive server-authorized initialAccount data; preserve that first render and revalidation/identity clearing. Home programme entry is /care/programmes. Latest recovery evidence is navigation-finish-20260920; older navigation-continuity evidence remains historical.

## Latest override: selected Image Gen implementation completed

Read the final `selected Image Gen finish` checkpoint in SESSION.md and `evidence/selected-home-finish-20260920` before earlier Home directions. The running Home now implements the chosen generated design using BrandMark, HomeArtwork and the labelled shared capsule dock. The seven photo regions are distinct assets; the UI is real DOM. On narrow phones, service captions stay readable in a horizontal rail rather than shrinking three cards to 10px text. The care banner uses actual authorized state, not the mockup's invented percentage.

The previously stalled runtime was restarted without resetting the saved database. `npm run dev` writes readiness/PID metadata to `.artifacts/physix-local/runtime.json` and child output to `dev.log` in that directory. Verify HTTP responses and browser rendering, not only a listening PID. Latest checks: 128 browser assertions, 103 unit tests, typecheck/build/full lint, target assets and production isolation passed. Physical-device, Safari and complete accessibility approval remain outstanding; do not claim perfect pixels.
