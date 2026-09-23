# Home: current composition and acceptance

Latest hierarchy, 23 September: the solid forest Home appointment card sizes to content. The service and small “View visit” action sit left; the unboxed month/day and zoned time sit right with extra edge padding. The time and action share one grid row with matching vertical centers across 320–1440px. The quiet “Next appointment” label, whole-card saved-detail link and accessible mode remain. No overflow was found in that width range. Visual owner acceptance is still open.

Earlier revision, 23 September: the large pale mint appointment card with a detached dark date block was rejected and replaced with a compact white bordered card. That white card was subsequently rejected and superseded above.

Earlier attempt, 23 September: the date-left/stacked-footer appointment card was replaced by a larger mint card with heading and visit details on the left, date and status on the right, and an outlined action pill. That larger mint treatment was subsequently rejected and superseded above.

Latest refinement, 23 September: the dark My care card keeps its two support rows and whole-card link, with a smaller 32px visual action pill. Next appointment is now a Home-only light mint summary with a forest date tile and simple footer; its saved detail route and status are unchanged. Inspected at 320px, default phone, 768px and 1440px, with no document overflow at 390px or 430px. Owner visual approval and enlarged-text/localization checks remain open.

My care detail refinement, 23 September: the dark card now has a subtle outlined “Open My care” pill and two fixed support rows, “Appointments” and “Plans & progress.” Inspected in the live phone-sized Home; design, types, scoped lint, 125 unit tests and build pass. Exact 320px and enlarged-text captures remain open.

Latest owner correction, 23 September: replace the rejected white My care row with a distinct dark card and a decorative abstract cutout. The whole card links to `/care` and has no invented patient state. Live phone-sized Home was inspected after separating text from artwork; the link and browser Back worked. Design, TypeScript, scoped lint, 125 unit tests and production build pass. Exact wider/narrower captures and owner visual acceptance remain open.

Historical misread, 23 September: the colored My care card was removed along with the original row. The owner clarified that the original row should remain; the restoration above is current authority.

My care polish, 23 September: the generic lower-page link is now a solid green, whole-card entry with a 24px title, supporting navigation label and visible arrow. It still opens `/care` and does not present guest state as saved care. Inspected in the live phone-sized page; link and browser Back worked. Design, TypeScript, scoped lint, 125 unit tests and production build passed. The automated Home runner is still unavailable; owner visual acceptance and wider mobile checks remain open.

Mobile booking/discovery polish, 23 September: the single clinic/online action pair now lives with search on the sage Home surface. The clinic action is forest and the online action white. Services begin on the white canvas with a quieter heading; the redundant “View all” booking link is gone. Both mode links and browser Back were checked in the live phone-sized Home. Design, TypeScript, scoped lint, 125 unit tests and build passed; the automated Home suite remains blocked by its missing browser executable. Owner visual acceptance remains open.

Hero refinement: centered How can we help? at 20–24px, with a bounded centered search area on desktop. Inspected at 390px. Design and TypeScript checks passed; full browser suites/build not rerun for this CSS-only refinement. Real clinic location remains awaiting owner details; no invented address or decorative booking imagery added.

Copy/typography correction: removed the Physiotherapy eyebrow and rejected Move with confidence slogan. Home now asks How can we help? with a smaller 28–48px medium-weight heading, natural wrapping and less compressed tracking. The continuous background and booking placement remain. Mobile render inspected; design check and scoped lint passed. Visual acceptance remains open.

Owner correction: the inset forest hero card was rejected. Header, headline and search now share one full-width sage background; booking actions sit below on white. Verified manually at 320/390/1440px; design check and scoped lint passed. Visual approval remains open. This supersedes the prior solid-card direction.

Latest presentation, 23 September: forest hero with “Physiotherapy” / “Move with confidence.”; generated raster header logo; “Book in clinic” and “Book online” actions (stacked below 360px). Common issues retain their mint container and white buttons. Service grid and appointment ordering are unchanged. Visual approval remains open.

Latest owner correction, 23 September: Home is booking/discovery first for everyone. Keep the same introduction, booking pair, services and Common issues regardless of sign-in. An actual next appointment appears immediately after Common issues as a supporting section before Before your visit. Programme/session details belong in My care; Home only keeps the quiet lower-page care link. This supersedes the returning-user priority arrangement below.

23 September personalization refinement: guests and signed-in users with no upcoming appointment or unfinished programme use the discovery layout. My care is a quiet link after Before your visit. Returning users with an actual next appointment or unfinished programme get a compact welcome and their authorized next actions first, followed by booking and discovery. Completed programmes do not create a prominent Home panel. Common issues are secondary and have no duplicate View all action. This supersedes the generic guest care-banner treatment below.

23 September update: Home now matches the live Book palette and controls. Normal white header, typographic introduction, search, forest/mint clinic and online pair, photographic service grid with external captions, compact common-issue links, forest care panel and information rows. The shared dock is light. See SESSION for this pass's verification and remaining acceptance.

Revision: 21 September 2026. Scope: Home and its shared header, not the booking engine, care player or a new frontend. Current delivery branch: `main` only.

## Composition

Normal-flow header, typographic introduction, high search, one booking pair, photographic services, care/programme access, practical information rows. Actual appointment and care summaries precede service discovery for returning patients.

Remove photo fades, small screenshot crops, pastel visit cards, repeated mode labels, filler captions and the ornamental care portrait. Keep the logo, routes, full-size preview photographs and native sheets. Git preserves the earlier revisions; they are not current visual authority.

## Acceptance

A guest can search and reach each service's time picker without an account. The booking pair preserves clinic/online mode; native Back returns to discovery. Catalogue names and eligibility are not duplicated in JSX.

Public programmes open /plans; owned care opens its authorized programme or session. Guests have no fabricated progress. Sign-out clears private Home summaries. Appointment and programme data stay server-owned.

Information sheets contain focus, close with Escape and restore focus. They do not invent clinic details or live meetings.

Check 320/390/430/768/1440 widths, readable inputs, complete normal-size action labels, enlarged type, keyboard rail access, target sizes and actual screenshots. Inspect text inside containers, not only document overflow. Synthetic long labels are not shipped localization.

Keep the same dock before and after sign-in. Do not reset saved records, change clinical content or replace backend acknowledgements with UI-only success.

## Evidence

See the current SESSION checkpoint and evidence/home-contrast-20260921. The two Home npm commands share one maintained suite and must not be counted twice. Prior saved-workflow failures remain separate from this slice.
