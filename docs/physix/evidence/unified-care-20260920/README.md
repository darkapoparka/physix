# Unified PhysiX care — 20 September 2026

Canonical checkout: M:/physix-app, main. Entry checkpoint: 293abc7f8ddc41e901ee4ae004f01b2e2cb32ec7. The local commit containing this evidence records the tested source. No donor changes, provider provisioning, push or deployment.

## Implemented

One shared shell and card family. Public Home uses a horizontal service rail, substantial vertically stacked landscape cards and the forest online banner. Patient Today exposes Programmes and Schedule alongside existing Book and Progress navigation.

The programme library groups actual assignment IDs and published versions, instead of presenting individual workouts as separate programmes. Search and progress-state filters, programme detail, owned sessions and saved attempts are connected. Schedule has working week/day navigation and separates appointments from exercises. Progress supports 7/28 days, programme filtering and day-selected history using stored records.

Only the actor-scoped metadata read was added to the local backend. Existing migrations, session commands, booking constraints, identity boundaries and saved history remain intact. The development service was stopped, its closed data directory backed up, and the service restarted without resetting records. The original 3216 donor was untouched.

## Verification

84 unit tests; 36 disposable PostgreSQL checks; 17 programme-browser checks with 28 captures; 28 public/booking/shared-UI checks with 28 route/viewport records; 25 saved-workflow browser checks with 28 captures. TypeScript, changed-file lint and production build passed. Six asset-integrity checks and 36 production-isolation requests passed. See final result JSON and logs rather than historical counts.

Browser widths: 320, 390, 768, 1440. Verified programme grouping, library filtering, assignment deep links/reload, session return links, week navigation, activity period/day filters, existing booking failure/retry/persistence, saved sets, pause/resume and completion. The UI suite also checks bounded doubled-computed-font Home reflow. A real enlarged-text grid expansion was fixed without hiding overflow. Two early programme-test failures were test expression escaping/navigation timing, corrected before the verified run.

## Limits

Local synthetic accounts and sample content only. Programmes are assigned, not purchased. Real Auth, payments, purchases/fulfilment, clinician content, messages and clinic scheduling integration are not delivered by this increment. The pilot still uses its current selected care relationship and inherited bounded snapshots; broad multi-practitioner account selection and pagination remain release work. No full accessibility, physical-device, Bulgarian or clinical acceptance is claimed.

Screenshots are compact WebP copies of actual browser captures, not Image Gen screens. The existing six discovery assets were reused unchanged. Charlie's actual portrait has not been supplied.
