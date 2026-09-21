# Home contrast and composition — 21 September 2026

The owner rejected the previous pastel/faded homepage. Continued the existing checkout and review branch from 04aa45f; no framework, repository or database replacement.

## Actual changes

Normal-flow white header, stronger near-black typography, one booking pair, full-size photographic service sources with plain captions, a text-only care panel and practical information rows. Removed faded portrait layers, pastel visit panels, repeated service subtitles and repeated booking cards. Catalogue-derived links, native sheets, stable navigation and authorized care remain.

The CSS is scoped and uses the existing token source. Added emphasis/flat/display roles without silently changing the legacy care/booking aliases. Document scroll clearance protects focused controls from the dock. Large-type inspection caught care text containment, which was fixed and added to the test.

## Verified

Typecheck, full lint, 125 unit tests, production build and 46 production-isolation requests passed. Home: 21 named checks; navigation: 23; appointments: 19. The two Home npm commands share one suite and are not counted twice. Exact results are in verification.json and the individual reports.

Home captures cover 320/390/430/768/1440 widths, doubled root text size, long-label stress, normal action labels, touch targets, image loading, keyboard rail access, information-sheet focus, direct service and mode links, programme discovery, authorized care priority and cross-tab sign-out. Appointment regressions exercised persisted reservation, safe cancellation/retry and other-patient denial.

## Captures and limits

before-390.webp is the fresh entry baseline. home-390-viewport.webp is an actual 390×844 browser viewport, not an image mockup. Other saved captures include full mobile/desktop pages, returning synthetic care and enlarged text.

All tests and records are local/synthetic. The separate saved-exercise workflow suite was not rerun; its previous startup failure is not reclassified as passing. No backend, SQL, provider or player source was changed. The broader UI suite's image-family assertion was updated but that entire suite was not rerun in this slice.

No new imagery was generated. Photographs remain generated preview assets, not actual clinic/staff or instructional media. Owner visual approval, real-device/Safari checks, full accessibility, real clinic content and provider readiness remain open. No deployment, data reset or live patient transaction.
