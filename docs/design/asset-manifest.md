# Asset provenance and production readiness

## Delivered reference assets

| Asset | Origin | Status / permitted project use |
|---|---|---|
| `reference/physix-home-final-thumbnail.webp` | Downsample of the final image generated earlier in this user conversation; 235 × 418, 6,500 bytes | Design-reference-only; fictional people/content; not a source for production crops |
| Original `physix-home-final-original.png` in the separately delivered design ZIP | Original final mockup from this conversation; 941 × 1672 | Higher-resolution visual reference; optional import to `docs/design/reference/`; not committed as the full PNG in this handoff |
| `wireframes/*.svg` | Authored geometric layout diagrams for this handoff | Editable implementation references; synthetic text and labelled placeholders; no external images/scripts |
| Rendered `wireframes/*.png` in the design ZIP | Raster renders of the authored SVGs | Quick review previews; not screenshots of working code |
| Physeo Home-3 template | Third-party inspiration selected by the user | No theme code or original theme imagery copied into this repository; verify licence before any reuse |

Reference thumbnail Git blob SHA: `8edd6b08c353f5e29d399935d27f06ac0f96d723`. This records exact file provenance, not proof of clinical content authenticity.

## Required production asset family

**Charlie:** owner-supplied/approved high-resolution portrait, ideally a transparent cutout plus a conventional portrait crop. Verify likeness permission, real professional identity and any visible branding. A generated generic person must not be presented as the actual practitioner.

**Clinic:** real exterior/interior and accessibility/directions imagery where useful. Do not generate a fictional facility and present it as the clinic. Keep addresses/location text separate and verified.

**Service imagery:** one consistent editorial family for the approved service catalogue, with shared lighting, crop, neutral/mint palette and realistic anatomy. Prefer real approved photographs; illustrative assets may be used as illustrations, never fake before/after evidence. Keep treatment positioning clinically reviewed. Use a 4:3 master image region and test tighter responsive crops.

**Body-area shortcuts:** a consistent simplified anatomy/silhouette family with one highlighted region, identical framing and contrast. These are navigation illustrations, not diagnostic visualizations. Always retain a text label.

**Programmes:** real approved cover/video stills for actual products. Do not fabricate lesson counts, lifetime access, qualifications or outcomes on a decorative booklet. Paid video sources must not be exposed as public marketing files.

**Logo and icons:** final owner-approved vector logo. Use one appropriately licensed utility icon set for navigation/search/calendar; keep these separate from custom service illustrations. Confirm Bulgarian Cyrillic support and font licences during app implementation; the handoff distributes no font binaries.

## Asset registry contract for implementation

Maintain a typed registry with `id`, `path`, `width`, `height`, `kind`, `source`, `licenceOrPermission`, `approvalStatus`, `approvedBy`, `altKey` and `focalPoint` where relevant. Approval status distinguishes `demo`, `review`, and `approved`. Production build/content validation must reject or omit demo-only assets in truthful identity/proof roles.

Use filenames such as `charlie-portrait-approved.webp`, `service-sports-rehab-01.webp`, `service-manual-therapy-01.webp`, `area-shoulder.svg`. Do not name an unapproved placeholder `approved`. Keep immutable masters separately and generate appropriately sized AVIF/WebP derivatives once originals are supplied. Set image dimensions and `sizes/srcset` deliberately; do not download desktop-size photography for every mobile card.

Store only intentionally public licensed assets in the app's public assets directory. Private plan/media files belong in protected storage. Never commit patient consent forms, original patient photos, sensitive image metadata or private licence documents to this public repo; store a safe reference to permission records instead.
