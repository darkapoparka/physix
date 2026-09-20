# Contextual mobile headers and appointment management

Entry: 95fd25d7953eba102c059232b9fb9e93679bcc36, main, clean. The implementation commit is the commit adding this evidence directory. Source manifest records exact final file hashes.

Runtime: M:/physix-app, npm run dev, http://127.0.0.1:3217. Existing saved local-test database preserved; no donor edit, provider action, push or deployment.

## Implemented and exercised

ContextHeader replaces the brand row on mobile Book/care screens. Desktop retains brand navigation; the primary dock is unchanged. Booking has Service/Time/Review progression, selected-time footer, explicit leave/keep, and a persisted owned appointment detail route. The appointment hub separates Upcoming/Past/Cancelled, with date/time/timezone, calendar export, Book again and safe cancellation/retry. Home/Today/Book/Schedule link to actual appointments. Public Home only receives an authorized minimal summary.

Final checks: 19 appointment + 19 Home + 43 shared UI + 23 navigation + 17 programme + 26 saved-workflow browser checks = 147; 116 unit tests; 36 isolated database checks; five loopback HTTP tests; 46 production-isolation requests; seven target and nine retained asset integrity checks. TypeScript, full lint and production build exited zero. Lint retains the two existing legacy coach warnings.

Browser tests use Chromium at 320x740, 390x844, 430x932, 768x1000 and 1440x1000 for the appointment flow; inherited regression suites cover 320/390/768/1440. New checks include doubled computed text, normal single-line appointment title, keyboard focus/return, failed reservation, delayed cancellation, double-submit prevention, failed cancellation/retry with one command ID, persisted reload, filter Back, generic calendar payload and second-patient route/API denial. No physical Safari/iOS, screen-reader or OS calendar-import certification is claimed.

Screenshots are real browser captures, not generated interfaces. All depicted records/personas are synthetic. Check each JSON for route, viewport and checks; the file suffix identifies width. Booking time/review hide the dock; management/detail retain it.

## Corrections during verification

Large-text filter/footer overflow was fixed with real reflow; the 320px header action was shortened to Book so Appointments remains intact. Two render-purity lint errors were fixed through a request-scoped Home projection and stable client clock. The new test's numeric-leading UUID selector was corrected; first-launch browser-tool pipe timeouts were retried after initialization. None of the failed attempts are included as successful checks.

## Remaining scope

All reservations are persisted local tests. No verified real guest identity, confirmed clinic hours/policies, atomic rescheduling, provider calendar sync, live meeting links, reminders, refunds/payments or clinical release is implemented. A calendar file is a generic reminder, not a real clinic reservation. Local UI cancellation eligibility is not the clinic's cancellation policy; server ownership/idempotency/overlap commands were not rewritten. Past does not mean attendance was confirmed.
