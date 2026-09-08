# PhysiX — public website visual handoff v2

**Scope: the public PhysiX website and visitor-facing flows. Not Gymaf, not a patient dashboard, not a staff application.**

This package contains **41 individually designed screen/state references**, a responsive clickable prototype, mobile and desktop image exports, and implementation contracts. It is a design handoff awaiting owner review, **not the production Next.js application** and not a claim of finished clinical content.

## Open the designs

- [Complete image gallery](screens/README.md): individual full mobile pages, actual 390px viewport captures, and desktop pages.
- [Mobile screen overview](screens/public-screen-index.png).
- [Home, full mobile page](screens/home-mobile.png), [home first viewport](screens/home-mobile-viewport.png), [corrected Charlie-to-review transition](screens/home-mobile-story.png), [desktop home](screens/home-desktop.png).
- [Screen-by-screen contract](SCREEN-SPEC.md).
- [Interaction and state contract](INTERACTIONS.md).
- [Asset provenance and replacement requirements](ASSETS.md).
- [Actual prototype review report](review-report.json).

**Clickable reference:** open `index.html` in a browser after cloning the repository, then use the Design index link in its footer. No package install, build command, backend or credentials are needed. GitHub's file viewer shows the source of HTML; it does not run the prototype. The committed PNG gallery can be inspected directly on GitHub.

For a local HTTP server, from this folder run `python -m http.server 4173` and open `http://localhost:4173/index.html#/screens`. The application build will use the existing Next.js/React/TypeScript baseline; this zero-dependency reference does not introduce a second production stack.

## The home correction

Charlie's introduction is an editorial mint section, not a dashboard card. The following patient-story treatment is **full-width deep teal with large type**, not another white rounded testimonial component. There are no separator columns, fake star ratings, decorative patient avatars, or repeated white-card borders in this transition. The entire story section is omitted from a live site until there is an approved genuine review.

The two-line hero, service finder, custom image-led services and restrained four-destination dock preserve the original direction. The longer page actually scrolls. Recovery programmes appear lower down and are explicitly a future-feature preview, not a product currently for sale.

## What is designed

Home; service list and three service-detail variations; Charlie; clinic; online consultation; programme catalogue/detail and purchase handoff/pending/confirmation; FAQ; contact and message confirmation; booking time/loading/online/no-slots/details/validation/verification/review/conflict/confirmation; public sign-in/verification/error; menu; search/results/empty; four legal reading templates; cookie preferences; 404; unavailable; offline; service loading.

The public Account destination opens the sign-in entry only. There are **no logged-in screens** in this package. The booking-confirmation example describes a protected live result, but only synthetic information is shown here.

## What the images mean

The PNGs are browser renders of the committed prototype, not additional image-generation outputs and not screenshots of the production product. The four illustrative image assets were extracted from the previously generated homepage. The diagrams do not prove medical suitability, legal validity, identity, media rights, or launch readiness.

Full-page exports deliberately hide fixed docks/action bars so they do not cut across the middle of a long page. Files ending in `-mobile-viewport.png` show those controls in their actual viewport positions. `home-mobile-story.png` shows a scrolled viewport. Never implement a full-page export as one fixed-height phone screen.

## Evidence

`capture.py` renders each of the 41 references at 390px and 1440px and checks 320px document reflow: **123 layout cases**. It also runs eight prototype interaction smoke checks. See the committed JSON for actual results. This is not an application build, a provider integration test, a real-device audit, a screen-reader audit, or a WCAG compliance certification.

Regenerate locally in a disposable design-tool environment:

```sh
python -m pip install playwright==1.57.0 Pillow==12.3.0
python -m playwright install chromium
python capture.py
```

On a machine with an existing Chromium installation, `python capture.py --browser /path/to/chromium` is supported. The renderer injects only local source and local images into a blank browser page; it does not fetch external assets or contact providers.

The repository's scoped `public-design.yml` workflow renders and commits ordinary PNG files under `screens/`. Those are normal Git files: **no ZIP import step is required**.

## Implementation priority

Current explicit owner instructions and safety/truthfulness boundaries take precedence. For public appearance use this package over the older thumbnail and placeholder wireframes. Use the existing architecture/data/booking/security documents for implementation constraints, not the prototype's in-memory demonstration code.

Do not copy the prototype's hash router, HTML string renderer, synthetic data, verification simulation or inline event delegation into production. Extract the **layout, visual tokens, component boundaries and interactions** into ordinary Next.js components. Replace the prototype warnings with approved live content only when the underlying facts and functionality exist.

The owner has not yet approved this new complete public v2 package. The next task is visual review and public frontend implementation, not private-app development or another unbounded planning round.
