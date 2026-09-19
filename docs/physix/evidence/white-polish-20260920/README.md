# White-surface refinement — 20 September 2026

Baseline: `69ee1b81d867379f751d9b8810c04300302f1ca0`, `main`, clean on entry. Canonical source: `M:\physix-app`. Existing Next development server remained on `127.0.0.1:3217` (observed PID 37476). No donor, backend, migration, authentication or payment implementation changed.

## Source changes

White canvas and neutral grouping surfaces replace the full-page mint gradient. Application headings use the existing Manrope family. Green is reserved for primary actions, selection and the lead service. Home has a primary Physiotherapy card, paired Sports/Mobility cards and compact Back/Neck/Online entries. All six original images and booking destinations are retained. Supporting controls and the icon-only dock keep their existing sizing and accessible names. Patient cards and calendar/recording controls share the neutral surface system. The focused exercise media region remains dark.

CSS is changed in the existing token layer and owning modules, not appended as another global override stylesheet. Enlarged text exposed an illustration/heading overlap in the lead card; the card now wraps its illustration below the text when needed.

## Verified

- Baseline full-repository lint passed with two existing legacy coach warnings; baseline unit tests passed.
- Final changed-file lint, TypeScript and production build passed. Final unit run: 74 passed.
- UI regression: 28 passed; 28 route/viewport records covering 320, 390, 768 and 1440px. Includes one-tap booking, native history, failure/retry, persisted reservation and existing workout-history preservation.
- Saved-care regression: 24 passed; 28 route/viewport captures. Includes recorded actuals, reload, pause/resume, completion, shared check-ins, booking and practitioner assignment.
- Six original/derivative assets passed integrity checks. No regeneration or asset modification.
- Six opaque semantic text/background pairs exceeded 4.5:1; see palette-contrast.json. This is not a full contrast/accessibility audit.
- Home passed doubled-computed-font stress at 320, 390 and 768px. This is bounded browser stress, not real-device text zoom or comprehensive assistive-technology certification.
- Production isolation: 36 requests passed; local identities remain disabled in production.

Selected actual browser captures are compressed as WebP here. Complete temporary captures remain on C: as recorded in captures.json; no large new evidence set or disposable database was created on the nearly full M: drive. Logs and result JSON files record exact checks.

The existing synthetic persistent database was not reset. Browser regressions create synthetic attempts/assignments; the UI test cancels only its own new reservation. This remains a local-test product, not live clinic booking. Owner visual approval and clinic/provider/clinical release gates remain outstanding.
