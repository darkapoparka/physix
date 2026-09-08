# Commercial model and paid access

## Release order

R1 revenue comes from real clinic/human online appointments, under approved fee and payment terms. The simplest proposed launch is payment handled by the clinic outside this app; this needs owner confirmation, particularly for remote appointments. Do not add a checkout or imply a charge occurs when clicking Confirm unless a later payment release explicitly implements it.

R2 adds one-off purchases of clinician-authored educational programmes, then clinician-assigned care plans where the clinic can deliver that service. Do not start with subscriptions, a marketplace, affiliate sales, coupons, complex bundles or insurance billing. The homepage may show a non-selling preview in demo, but a public launch must not sell an uncreated programme.

## Distinguish products

A bookable appointment is scheduled clinical time. An educational programme is general content with clear scope and access terms. A personalized plan is an actual clinician-reviewed service, not an automatically generated PDF unlocked by a questionnaire. Keep the checkout copy, entitlement model and clinical approval state separate.

Before sale, approve currency, taxes/VAT treatment, invoices, prices, duration of access, refund/cancellation policy, support entitlement, consumer-rights wording and required consent/acknowledgement for digital delivery. Do not claim every digital purchase is non-refundable. Get local accounting/legal review for the actual supply. No fabricated prices from mockups.

## Checkout and fulfillment contract

The authenticated server creates an order for a published product/price version. It stores a checkout reference and sends the user to hosted Checkout. A return URL contains only an opaque reference, never health data. Order state and entitlement are fetched with ownership checks; return-to-success is not proof of payment.

The signed webhook handler validates the raw body and provider signature, deduplicates event IDs and resolves the referenced order from trusted server records. Check merchant/environment, payment state, expected amount/currency/product mapping and ownership. Grant a unique entitlement transactionally only after verified successful payment. Support delayed success/failure events when enabled payment methods require them. Duplicate or reordered events must not grant extra access or move a refunded order back to paid.

Use a narrow order state machine such as `created -> checkout_open -> paid`, with failed/expired/cancelled paths and refund/dispute handling. Keep provider event facts and internal state transitions distinct. Reconcile stuck orders through an authenticated job/admin action. An HTTP timeout creating Checkout must not generate an uncontrolled sequence of duplicate sessions; use an idempotency key and persisted request state.

## Access enforcement

Public product pages contain only previews. Paid lessons are never shipped as hidden frontend JSON, public static files or accessible video URLs. Check active entitlement on every private data/media request. Issue short-lived signed media links after verification. Revocation prevents new links; already-issued links remain usable until expiry, which must be reflected in the threat model.

If a programme version is updated, define whether an existing purchase receives it; do not silently rewrite content/version history. Refund/dispute handling updates entitlement state according to the approved policy and stops future access. Never put symptom descriptions or patient-plan details into provider metadata or analytics.

## Product UX

Show what is included, intended audience, limitations, actual clinician authorship, sample content, access duration, total price and support terms before checkout. After purchase, surface the product in Account without making the user navigate the marketing homepage. An awaiting-payment screen explains that access is being confirmed and can be revisited. A missing entitlement has a recoverable support path.

## Release evidence

Test signed/invalid webhooks, duplicates, reversed delivery order, browser return before event, event before browser return, delayed payment, checkout abandonment, duplicate checkout request, refund/revocation, cross-user access and signed-link expiry. No live charges during local implementation. See [testing](testing.md) and Stripe sources in [research](research.md).
