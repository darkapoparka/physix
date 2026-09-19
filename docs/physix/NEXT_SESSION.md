# Next implementation session

Last verified source checkpoint: `0de64dc26252ce57387c012e15ac7d86e91d2f01`; inspect actual HEAD/status before editing.

Continue only in M:\physix-app. Do not clone again, start physix-pro or modify the donor M:\gym-fidelity. Recheck Git HEAD/status and listener ownership; preserve new work and the local persisted test database.

Read AGENTS.md, SESSION.md, SOURCE_PROVENANCE.md, TASKS.md, ARCHITECTURE.md and the owning feature contracts. The latest functional routes are /login -> /app, /app/plans, /app/sessions/:id, /app/progress, /app/check-ins, /app/appointments, /book and /practitioner. /dev/demo is the older visual-only mode, not the saved application.

npm run dev starts a single local PGlite PostgreSQL service and Next on 3217. The local persona login is deliberately synthetic, with HttpOnly server sessions; it is not Supabase Auth and must stay blocked in production. The disk store is .artifacts/physix-local/pgdata. Reuse the retained versioned-plan/session SQL and native command adapter, not the old memory demo. Never reset the persistent store to improve screenshots.

The compact Fidelity-family styling and usable saved workflow are now the baseline for owner review. Before real clinic bookings, establish whether another scheduling system already exists, confirm actual hours/offers/policies, and obtain explicit approval for a separate PhysiX provider environment. Implement real verified Auth and the full permission/lifecycle matrix there. Do not enable local persona/MFA fixtures or point at the Gymaf database. Extend the practitioner plan editor with clinician-supplied content rather than inventing clinical instructions.

Checks: npm run lint; npm run typecheck; npm run test:unit; npm run test:local-db; npm run test:local-browser; node scripts/physix-local/layout-check.mjs; npm run build; npm run test:auth; node scripts/physix-production-check.mjs. The HTTP/provider-shaped fixtures are not provider acceptance. Browser tests modify synthetic accounts; they do not delete or reset data. Use the current evidence JSON files for exact results, not old counts.

No production release, cloud provisioning, charges, push or new GitHub remote without explicit approval. Keep current booking/auth/media/clinical limits visible in SESSION and TASKS.
