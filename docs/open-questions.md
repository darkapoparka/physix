# Owner inputs and launch blockers

The agent should proceed with M0 using synthetic fixtures. Ask only what blocks the next milestone; do not turn this table into an upfront interrogation. Record actual decisions here when supplied, and update the owning specification.

| ID | Input needed | Default for local work | Gate |
|---|---|---|---|
| Q01 | Clinic legal/trading identity, city/address, phone/email, domain, accessibility/directions | PhysiX brand only; no assumed Sofia location or fake public contact | R1 public launch |
| Q02 | Charlie's full professional name, approved portrait/likeness use, qualifications, registration where relevant, achievements, approved biography | Explicit portrait placeholder; no factual qualification/rating claims | R1 public launch |
| Q03 | Actual services, first/follow-up types, durations, buffers, fees/currency/tax handling, suitable modes | Synthetic examples not payable | R1 real booking |
| Q04 | Working hours, breaks, holidays, lead time/horizon, cancellation/reschedule deadlines, no-show policy | Deterministic local fixtures | R1 real booking |
| Q05 | Existing calendar/tool, all practitioners/resources, who enters phone bookings and updates blocked time | One practitioner and one authoritative app calendar | R1 scheduling decision |
| Q06 | Is human online care offered at launch? Video provider, preparation owner/deadline, remote payment handling and fallback contact | Demo explanation; production online capability off until ready | R1 online bookings |
| Q07 | Privacy/controller contact, adviser, notices, vendor agreements, retention, export/deletion, emergency/clinical wording, minors policy | No live patient intake; adults booking for themselves only in initial scope unless approved otherwise | R1 processing |
| Q08 | Hosting/backend/email owner accounts, approved budget/regions, staff role grants/MFA, operational backup owner | No cloud provisioning, no outbound mail | R1 deployment |
| Q09 | Bulgarian copy approval and whether English launches together | BG-first architecture, draft EN; no unreviewed locale indexing | R1 content |
| Q10 | Real reviews and permission/source, clinic photography, logos and asset licences | Hide fabricated proof in live mode; synthetic demo only | R1 credibility |
| Q11 | Actual educational programmes, clinician content, paid support, tax/refund/access rights | No live products, checkout or subscriptions | R2 |
| Q12 | Exact AI intended purpose, disclosure/likeness permission, clinical reviewers, data processor assessment and regulatory review | AI off; no model SDK in M0/R1 | R3 |

## Do not assume from the generated designs

Charlie being 'the best in Bulgaria', a 5.0 rating, 1,200 patients, 5+ years, an MSc, a Sofia clinic address, particular treatment efficacy, recovery time, prices or patient testimonials. These need evidence/approval. The user supplied the brand and project intent, not those facts.

## Scope reductions that preserve a viable launch

If online staffing/provider readiness is missing, launch in-clinic booking first and show an honest online-information state. If real programme content is missing, omit sales CTAs rather than blocking the clinic launch. If complex AI review is unfinished, leave it out entirely. If the authoritative calendar decision changes, record a scheduling migration decision before implementing two systems.
