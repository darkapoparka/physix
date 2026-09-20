# Next implementation session

Continue only in M:\physix-app. The source remains Fidelity-derived; do not create another project or modify M:\gym-fidelity. Inspect HEAD, status and listener ownership before editing.

Current navigation: one fixed Home (/) / Book (/book) / My care (/care) / Menu dock. Same labels, targets, size and order on public pages, sign-in and private care. Logo always returns to /; Account always opens /care/profile. Do not restore the public four-item versus patient five-item split.

Private routes: /care, /care/programmes, /care/programmes/:assignmentId, /care/workouts/:scheduledId, /care/sessions/:attemptId, /care/schedule, /care/progress, /care/appointments, /care/check-ins, /care/profile. /app routes are compatibility redirects only. Booking is /book for everyone. Preserve server authorization and safe, allowlisted login return targets.

Keep the solid Fidelity-style card family, existing artwork, white page canvas and green accents. My care uses Today / My plans / Schedule / Progress subnavigation. Programme detail has one title and a static completion summary, not a duplicate hero/self-link. No new visual direction was approved merely because tests passed.

Use npm run dev for the local test runtime on 3217. Preserve .artifacts/physix-local/pgdata. All identities and records here are synthetic; this is not real clinic Auth, payments or scheduling. Do not reset the store or connect it to the Gymaf hosted database.

Read AGENTS, SESSION, DECISIONS, UX_AND_ROUTES and the latest evidence/navigation-continuity-20260920. Current tests: test:navigation, test:programmes, test:ui, test:local-browser, test:unit, test:local-db, test:assets, test:auth, typecheck, build and scripts/physix-production-check.mjs. Browser tests need their own session and must assert an empty error buffer at entry; this installed browser tool did not clear a previously recorded error with its advertised errors --clear option. Restart only the test browser to obtain a verified clean buffer. Never ignore newly raised errors.

Evidence outputs and disposable databases use system temp. Keep only selected compressed captures and concise reports in Git. Real clinic Auth, booking policies, purchased-programme fulfilment, clinical media and messaging remain separate work. Charlie's actual portrait is still needed before depicting him. No push, new remote, provider provisioning, payment or deployment without explicit approval.

Care pages receive server-authorized initialAccount data; preserve that first render and revalidation/identity clearing. Home programme entry is /care/programmes. Latest recovery evidence is navigation-finish-20260920; older navigation-continuity evidence remains historical.
