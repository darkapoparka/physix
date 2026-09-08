# Clinical boundaries and future AI

## R1 is a clinic booking product

The launch product introduces the clinic, explains approved services and schedules a human physiotherapist. It does not diagnose, triage autonomously, prescribe exercise from a symptom field, predict recovery time, interpret scans, or claim an algorithm has been reviewed by Charlie when it has not.

The earlier image-generation concepts contain fictional portraits, ratings, testimonials, qualifications, prices, suitability recommendations and progress scores. They establish visual direction only. None is clinical evidence or publishable business truth. Replace/approve real content before launch.

The service finder is catalogue navigation. A body-area selection helps filter content; it is not a clinical assessment. Online consultation means a real human appointment. Describe remote-care limitations and the clinician's ability to recommend in-person care. Clinical copy and escalation wording require clinician approval. Do not use a generic disclaimer to justify unsafe functionality.

## R2: educational programmes versus clinical plans

Keep two products distinct. An educational programme is general clinician-authored information with clear intended audience, limitations and approved instructions. A personalized clinical plan is assigned to an identified patient by a responsible clinician and published as an immutable version after review.

Only a qualified authorized clinician may approve a patient-specific plan. Payment, a questionnaire or a successful LLM call cannot automatically publish it. Record author, reviewer, version, date, patient assignment and change history. Provide understandable stop/contact instructions approved for the actual plan. Completion tracking is not a clinical outcome score. Avoid punitive streaks or rewards that encourage exercising through concerning symptoms.

Urgent advice or escalation information must be freely accessible, not locked behind purchase. Do not invent a red-flag algorithm in a coding task. The clinician owns the protocol; the implementation needs tested deterministic pathways and a staffed escalation process before patient use.

## R3: optional AI, disabled by default

A first defensible AI experiment is internal assistance to clinicians using approved content and synthetic/non-identifiable evaluation data. Patient-facing use is a separate release gate. The user should always know when they interact with software rather than Charlie. A Charlie-branded assistant must not impersonate a live clinician, silently reuse his likeness as an endorsement, or imply review that never happened.

Before enablement, define intended purpose, users, exclusions, data flows, model/vendor processing terms, clinical responsibility, escalation, quality evaluation, monitoring, versioning and rollback. Review applicable EU AI Act obligations and medical-device software qualification/classification with suitable experts. Software with diagnostic or therapeutic intended purposes may require regulatory assessment; naming it 'wellness' does not determine its legal classification. The Commission's medical-device software guidance and current AI Act guidance are linked in [research](research.md).

The technical design must make model output untrusted. Use a curated, versioned clinical source set; separate patient input from system instructions; constrain retrieval and tool access; disallow autonomous medication/diagnosis/payment/booking actions; validate output schemas; require clinician approval for individualized treatment. Any urgent safety pathway is independent of model compliance and must fail safely if generation fails.

Do not send clinical data to an external model until the processing agreement, purpose, minimization, retention and transfer assessment are approved. Never assume an API vendor's default retention or training policy. Do not use real patient histories in a public GitHub issue or coding-agent context.

## Required evaluation before any patient-facing AI pilot

Evaluate Bulgarian and English separately, out-of-scope questions, prompt injection, unsupported claims, refusal/escalation behavior, hallucinated references, missing context and dangerous reassurance. Have clinicians review representative cases and document unacceptable error classes. Include adversarial tests, auditability, incident reporting, a kill switch, and a human alternative. A disclaimer or attractive UI is not a safety validation.

No autonomous AI treatment feature is scheduled in the R1 backlog. Keep the architectural seam small; do not build vector infrastructure or add model SDKs during the initial UI milestone.
