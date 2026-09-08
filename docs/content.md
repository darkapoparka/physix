# Content, localization, SEO and asset approval

## Language and writing

Launch audience is Bulgaria. Build explicit `bg` and `en` locale routes from M0, with typed message keys and identical key coverage. Pass locale per request/component; no module-level mutable locale. Translation files hold interface copy, while public service/practitioner content carries publication/approval metadata. Dates use locale formatting with explicit zones; money uses integer minor units plus currency and `Intl.NumberFormat`.

English text in the design is a reference, not a reason to postpone Bulgarian layout testing. Bulgarian translations, especially clinical terminology and professional titles, require a native/clinician review. Do not publish machine-translated medical guidance as reviewed advice. Unapproved locale pages stay noindex and outside the sitemap.

Use everyday explanations and short headings. Avoid national-best claims, 'pain-free guaranteed', invented recovery durations, generic motivational paragraphs and urgency/discount pressure. 'Online consultation' means a booked human service. 'AI assistant' is a separate later label. The hero supporting line should clarify service mode rather than confuse booking online with receiving care online.

## Public content contract

A service includes stable ID/slug, localized title, short summary, body-area/category associations, approved everyday search synonyms, permitted appointment-type IDs, image ID/alt text, publication status and approval date. The summary explains the offer without diagnosing the visitor.

A practitioner includes approved name/display name, exact professional title, bio, photo provenance, credentials with evidence reference, publication status and booking linkage. 'Charlie' is the only provided display name; do not infer his full name, degree, registration or city.

A clinic includes legal/public names as supplied, real location, verified contact routes, access information and operational hours. Never fill blanks with Sofia, sample phone numbers or an invented address in a live build.

Bookable fees/durations/policies come from live offering data, not duplicated marketing literals. Existing appointments retain their captured commercial terms. Prices are unspecified until approved. EUR is the current baseline for Bulgaria; pricing display and tax/consumer obligations must be checked for the actual launch date and business setup. See [research](research.md).

## Proof and reviews

No generated face represents the real Charlie. No generated avatar/quote represents a patient. The mockup's stars, patient names, 'top rated', years, counts and credentials are illustrative. Production excludes them unless supported by genuine approved content.

Track review source, text permission/attribution basis and approved display identity. Do not publish identifiable treatment details merely because someone emailed praise. Do not fabricate aggregate ratings or include unsupported review structured data.

For local demos use unmistakable sample labels such as 'Preview portrait' or 'Sample review — not a patient testimonial'. Prefer an honest empty state to elaborate fake proof. Before launch replace the portrait with supplied real photography and remove all sample endorsements.

## Search privacy

The initial catalogue is small enough for deterministic client-side matching of localized names/synonyms. Trim and bound input length; normalize case/diacritics appropriately without inventing medical associations. Free text is not put in query strings, localStorage, analytics events or database tables. Use approved category IDs for navigation where needed, and exclude health-interest paths/parameters from analytics collection.

The search UI returns services and first-visit guidance, not a likely diagnosis, treatment plan or emergency reassurance. A visitor can clear the field and browse all services. No semantic/AI search service is needed in R1.

## SEO and sharing

SSR public headings, sensible document titles/descriptions, one primary h1, canonical URLs and correct language attributes. Create hreflang only for actual approved translations. Sitemap contains published Home/services/practitioner/clinic/FAQ/programme/legal routes as appropriate; no drafts, auth tokens, account, staff or booking result pages.

Use accurate organization/local-business structured data only after legal name, address, contact and professional category are confirmed. Do not invent a schema type or rating. Private pages use noindex and no-store and require server authorization. Robots restrictions are not security.

Use an approved share image without a fake medical endorsement. Avoid autoplay video; real short introduction video is optional after poster, captions, consent and performance checks.

## Content workflow

Draft -> owner/clinician review -> approved -> published -> revised/withdrawn. Record who approved and when; reference evidence privately where it is sensitive, not in this public repository. Engineering can build draft content locally but cannot manufacture approval. See [asset manifest](design/asset-manifest.md) for image-specific records.
