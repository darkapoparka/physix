# Next implementation session

Last verified source checkpoint: `05e84daff0839440e1d36fef466efc466354b828`. The following commit only records verification metadata. Recheck actual HEAD/status before editing.

Work only in `M:\physix-app`. It is already an independent Fidelity-derived repository on `main` and runs on 3217. Keep `M:\gym-fidelity` on 3216 intact. Do not clone again or start physix-pro, Motion Makers, or another frontend.

Read AGENTS, SESSION, SOURCE_PROVENANCE, TASKS, and the owning feature contract. Check actual Git status and server ownership before edits; preserve any newer work. The historical planning records saying the folder was absent are not current.

Inspect the public app at `/`, Book at `/book`, the patient preview at `/dev/demo`, and the interactive booking preview at `/dev/demo/book`. Use the demo-state switch on patient screens for assigned, purchased, pending and empty accounts. Preview booking uses fixed sample dates in explicit UTC and fixed synthetic contact fields. No appointment is reserved and nothing survives a full reload.

The browser-tested four-screen set is awaiting owner visual feedback. Apply that feedback to the existing component family; do not restart the design. Then begin one real isolated-backend vertical slice: approved public catalogue/availability → authoritative appointment persistence → patient/staff read, with overlap and ownership tests. Hosted project provisioning and connecting any existing database require explicit authorization; never reuse Gymaf credentials.

Available checks: npm run lint; npm run typecheck; npm run test:unit; npm run build; npm run test:auth (isolated loopback HTTP fixtures, requires build); node scripts/physix-production-check.mjs; node scripts/physix-booking-browser-check.mjs; node scripts/physix-browser-check.mjs. Browser CLI path can be supplied through AGENT_BROWSER_BIN. The core browser script accepts PHYSIX_BROWSER_SESSION and PHYSIX_EVIDENCE_DIR; the production script accepts PHYSIX_PRODUCTION_EVIDENCE. Warm the dedicated browser session on Windows before running a synchronous CLI test.

No fake booking/payment success, hosted resets, public fixture accounts, automatic prescription changes, push or deployment. A working demo is not a connected clinic system.
