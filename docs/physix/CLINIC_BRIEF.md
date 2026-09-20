# Clinic brief and verified technical references

## Facts currently supplied by the owner

The product name is PhysiX. The owner's friend has opened a physiotherapy centre. The intended product includes a website/booking experience, online plans users can purchase and see in their account, exercises/workouts and tracking. The owner prefers the app-like Gymaf interface to current Motion Makers styling.

That does not establish the practitioner's name, country, credentials, address, prices, clinical catalogue, exact staff size, merchant account or approved exercise content. Earlier design names/photos/copy are not verified clinic facts.

## Business decisions to collect

| Topic | Needed from the clinic | Current status / effect |
|---|---|---|
| Clinical identity | Legal clinic name, public brand, actual practitioner names/titles, registrations/credentials, contact details | Unknown; blocks real public claims |
| Location and jurisdiction | Country, clinic address, locations, timezone, languages, patient geography | Unknown; affects policies, scheduling, privacy and payments |
| Services | Initial/follow-up or other actual service catalogue, eligible visit modes, duration, buffers, resources and staff | Unknown; do not publish example services as fact |
| Booking policy | Opening hours, exceptions, notice/horizon, instant-confirm versus review, cancellation/reschedule/no-show rules | Unknown; fixture behaviour must be labelled |
| Existing systems | Any current calendar, booking system, patient software or externally managed appointments | Unknown; establish source of truth before live availability |
| Digital offering | Ready-made programmes, individualized programmes after assessment, or both | Main unresolved commercial question; model supports both |
| Programme terms | Included content, clinician reviews/messages, access start/end, eligibility, fulfilment timing and support | Unknown; no automatic “unlimited support” or perpetual access |
| Pricing and payment | Approved prices/currency, tax presentation, deposits/pay-at-clinic/prepaid rules, seller/merchant, invoicing and refund handling | Unknown; blocks live checkout, not labelled UI work |
| Clinical content | Exercise library, actual dosage/instructions, video/text media, approval owner, contraindication/escalation wording | Unknown; do not invent prescriptions |
| Roles and patients | Staff/reception access, relationship assignment, age eligibility, minors/guardian requirements | Unknown; no untested guardian sharing |
| Privacy/operations | Legal/privacy review, processor arrangements, retention/export/deletion, incident contact and response times | Unknown; blocks real patient launch |
| Brand assets | Approved logo, licensed font choice, actual clinic/practitioner photos, exercise-media rights | Candidates exist; commercial approval not established |
| Launch | Domain, hosting/operating budget, launch priority, clinic pilot cohort and release approver | Unknown; no deployment/date promised |

The recommended starting scope is one clinic, simple appointments, assigned care programmes and one-time digital offers where clinically/commercially ready. This is a proposed default, not an assertion that the clinic has approved those policies.

Ready-made content may unlock after verified payment. Personalized services must show a genuine assessment/assignment-pending state. Establish this distinction before writing sales copy or promising what happens after checkout.

## Review responsibilities

The practitioner approves clinical content and how patient tracking is used. The clinic/legal/privacy adviser confirms applicable obligations, notices and retention. The merchant/accounting owner confirms financial terms and invoicing. The product owner approves UI direction. Engineering owns implementation tests and truthful status reporting. Do not let one of these sign-offs silently stand in for the others.

## External references checked on 19 September 2026

These primary sources inform technical constraints. They do not verify the clinic's compliance, provider accounts or implementation. Most detailed rules in this specification are proposed PhysiX design contracts, not quotations from these sources. Recheck current documentation when implementing provider APIs.

| Ref | Source and relevance | Address |
|---|---|---|
| R1 | Stripe Checkout Sessions API: checkout/payment state are distinct; use server payment information | `https://docs.stripe.com/api/checkout/sessions?how=` |
| R2 | Stripe webhook documentation: asynchronous delivery, raw-body signature verification and event handling | `https://docs.stripe.com/webhooks` |
| R3 | PostgreSQL range types: non-overlap exclusion constraints, including resource-specific reservations | `https://www.postgresql.org/docs/current/rangetypes.html` |
| R4a | Supabase row-level security: policies, roles, view and elevated-access boundaries | `https://supabase.com/docs/guides/database/postgres/row-level-security` |
| R4b | Supabase API keys: publishable versus elevated secret keys and their permissions | `https://supabase.com/docs/guides/getting-started/api-keys` |
| R5 | Next.js metadata/OG documentation: route-specific public metadata | `https://nextjs.org/docs/app/getting-started/metadata-and-og-images` |
| R6 | W3C WCAG 2.2 Understanding 2.5.8: target-size minimum, exceptions and larger-target guidance | `https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html` |
| R7 | European Commission individual data-protection guidance: health data is a specially protected category | `https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en` |
| R8 | Supabase changelog: integration assumptions must be checked against current changes | `https://supabase.com/changelog` |

The lightweight Supabase changelog Markdown request did not load; the HTML changelog was read instead. Stripe's fulfilment landing page exposed variant links, but the requested hosted-variant fetch did not load; payment-state and webhook statements here rely on the accessible API/webhook sources above. No account-specific settings were inspected through public web pages.

## Private/local evidence

The user-supplied `Pasted markdown.md` contains the initial Motion Makers recommendation and the later Fidelity-based correction. Current source inspection is recorded in SOURCE_AND_MIGRATION, including what was and was not verified. References to another project or an old test result are not proof of the new PhysiX app.


## Subsequent owner-supplied identity

The owner has named their friend Charlie. A publishable full identity, qualifications, actual portrait, clinic address, opening hours and approved arrival details are still not supplied in the current clinic configuration. The homepage does not invent them.
