# Session checkpoint and next action

## 19 September 2026 — recovered implementation and extended booking preview

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
