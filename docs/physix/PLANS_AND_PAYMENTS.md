# Programmes, purchases, care plans and sessions

## Concepts that must not be collapsed

A **programme template** is reusable content. A **published version** is an immutable reviewed snapshot. A **product/offer** is the commercial promise, price and access terms. An **order/payment** records a transaction. An **entitlement** grants a defined right. A **care-plan assignment/enrolment** connects a patient to a version, schedule and authorized instructions. A **session attempt** is actual exercise activity.

A purchase can grant an entitlement without exercises being assigned yet. An appointment can include a complimentary care-plan assignment without a purchase. Publishing a new template must not rewrite an old patient's completed session or contractual offer.

## Self-guided versus individualized

**Self-guided programme:** the clinician approves it for the stated general purpose and publishes exact content/inclusions. A successful purchase grants access and creates an enrolment pinned to the approved version according to the offer. State limitations clearly. It is not a personalized diagnosis or supervised treatment relationship.

**Individual programme:** the offer describes the assessment/review process, deliverables and timing approved by the clinic. Buying it creates access/service obligations, not invented exercises. My Plan displays assessment/assignment pending until the practitioner publishes the patient-specific plan. The UI must not promise instant exercises when none exist.

**Assigned clinic plan:** a practitioner can assign a plan as part of in-clinic care or a complimentary service. The origin is `clinical_assignment` or `complimentary`, not `paid`. Any clinical relationship and access scope is explicit.

Support more than one active plan. Prioritize the next scheduled session without overwriting another plan, entitlement or practitioner relationship.

## Offer and order snapshots

An offer identifies the programme/service components, eligible audience, assessment requirement, price, currency, tax presentation, access start/expiry rule, messaging/review inclusion and refund/cancellation policy. The clinic supplies these facts. Do not reuse Gymaf's historical subscription amount, guest passes or trial periods.

At order creation, calculate the amount server-side and snapshot the purchased offer/version/policies. Do not trust amount, product eligibility or patient identity from browser fields. A price change requires a new checkout/reconfirmation, not silent collection of a different amount.

Initial scope: one-time programme purchases. Future recurring memberships and appointment-credit bundles require their own ledger and lifecycle acceptance. Model them as distinct products, not a single `isPremium` boolean.

## Checkout and fulfilment

Resolve a verified purchaser account before digital checkout, preserving the selected offer through authentication. The payment provider must not become the authority for patient identity merely because its checkout accepts an email. Guest appointment contact handling has its own BOOKING contract.

Create a hosted Checkout session on the server for an owned order, carrying minimal opaque identifiers. Health conditions, symptom answers and clinician notes must not be sent in provider metadata. Verify merchant account, sandbox/live environment, amount, currency, product/order correspondence and payment state.

Stripe's Checkout status and payment status are distinct, and webhook events arrive asynchronously (references R1/R2). The browser return page must ask the server for the order status; `success=true` or a successful redirect never grants access by itself.

Verify webhook signatures against the raw request body. Persist a deduplicated event/inbox record before acknowledging durable acceptance; process through an idempotent worker. Deduplicate both provider event ID and the underlying order/entitlement operation. Duplicate or out-of-order events cannot issue multiple grants or re-enable refunded access.

A server-side status retrieval may use the same fulfilment function to improve return-page responsiveness, but webhooks/reconciliation must still complete fulfilment when the browser never returns. A pending/failed payment is visible as such. Manual complimentary grants use their own audited path and are not payment settlement.

Fulfilment atomically records the recognized payment and creates/updates the intended entitlement. For self-guided offers, create exactly one eligible versioned enrolment per purchased unit according to the offer. For individualized offers, create the clinical-work queue/assessment obligation rather than fabricating an assignment. Retry safely after interruptions.

## Refunds, expiry and ongoing care

Store refund/dispute/chargeback events separately from clinical history. Financial access rules must be approved by the clinic and applied to the affected entitlement, not to the patient's entire account. A failed renewal or refunded digital purchase does not erase unrelated clinic appointments or other plans.

Expiry may stop starting new paid content while preserving appropriate patient access to historical records under the clinic's approved policy. Clinical record retention/deletion is a separate reviewed rule. Decide what happens to a started session, open clinical programme and promised review before enabling paid offers; do not surprise the patient mid-session.

Customer-facing purchase history shows pending, active, expired and refunded states accurately. Refund requests are not labelled refunded until provider acknowledgement. Live refunds, charges and policy decisions are not authorized by this planning document.

## Programme authoring and assignment

The practitioner creates a draft from reviewed exercise templates, adds instructions, publishes a version and assigns it to an authorized patient with a start date, schedule, duration/access condition and review arrangements. Store authorship, approval, publication time and version identifiers.

Exercise prescriptions may include sets, repetitions, hold duration, rest, side, resistance/unit, frequency, permitted alternatives and written cues. These fields are a data model, not a prescription recommendation. A qualified practitioner supplies all actual dosage and safety instructions.

A later edit creates a new version. Applying it to an active patient requires an explicit assignment revision/effective date and an auditable choice for future sessions. Completed attempts keep the prescription version they followed. Patients cannot change the authoritative prescribed values by editing the browser request.

## Patient session behaviour

My Plan → programme detail → scheduled or available session → exercise instruction/media → record actuals → pause/save/resume → complete → optional clinician-approved feedback. Show assigned instructions separately from actual completion. A self-guided session and a clinician-prescribed session retain their source.

Each real attempt has its own ID. Retries keep the command identity; starting a genuine new attempt creates a new ID. Save acknowledgements indicate server persistence. Network failure shows pending/unsaved state and safe recovery; do not display “Completed” while the completion command failed.

Timers use elapsed-time semantics that survive foreground/background transitions appropriately; they are not evidence of actual exercise completion. Allow pause, stop and skip with an explicit record. Never force exercise completion or shame a paused care plan to preserve a streak.

No service worker/localStorage persistence of sensitive session/check-in content by default. Initial drafts can live in scoped memory with clear loss warnings; durable offline storage requires a separately reviewed security and synchronization design. On sign-out/account switch clear private in-memory state and stop pending subscriptions/requests.

## Check-ins and clinician review

Use only clinician-approved questions/units. Record whether an entry is private draft or explicitly shared, who may see it, timestamps and revision. A clinician sees only authorized/shared data. Do not import an inherited coach-visible payload until its privacy meaning has been reviewed for PhysiX.

Symptoms and performance do not automatically diagnose, increase dosage, declare recovery or trigger an emergency response. Any escalation wording/workflow is approved by the clinic. Messaging and check-ins explain that they are not continuous or emergency monitoring.

## Minimum acceptance

Paid success without browser return; delayed payment; duplicate/out-of-order webhook; invalid signature; wrong amount/account/order ownership; checkout abandoned; already-owned product; exactly one grant; self-guided activation; paid-but-unassigned personalized plan; complimentary assignment not recorded as paid; multiple plans; refund/expiry isolation; immutable completed history; interrupted save/retry; two tabs editing; revoked relationship; honest empty state.


## Local implementation status — 19 September 2026

The local app reuses versioned prescriptions, scheduled assignments, distinct attempts, relational actual sets, idempotent commands and immutable completed history. Repetitions, duration, resistance, explicit skip, pause/resume, finish/abandon, history, due-session adherence and shared weekly sample check-ins are stored on this PC. A local practitioner can assign an existing published sample version and read permitted entries. Complimentary sample access is not a paid entitlement. Real clinical content/authoring, provider identity, one-time commerce, purchased-plan fulfilment and messaging remain unconnected.
