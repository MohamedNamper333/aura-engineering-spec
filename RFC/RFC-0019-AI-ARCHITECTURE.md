# RFC-0019 — AI Architecture

**Status:** Accepted  
**Version:** 1.0.0  
**Priority:** High  
**Risk:** High

## 1. Purpose

Define safe, bounded use of AI in AURA without allowing probabilistic systems to become uncontrolled authorities over financial, authorization, or irreversible business decisions.

## 2. AI Role

AI SHALL be treated as assistive. It MAY classify, summarize, recommend, generate drafts, support search, or personalize educational experiences according to approved use cases.

## 3. Deterministic Boundary

AI SHALL NOT be the sole authority for payment confirmation, refund execution, entitlement grants, role assignment, security policy, or irreversible financial operations. Deterministic domain services remain authoritative.

## 4. Model Gateway

Model providers SHALL be accessed through a provider-neutral AI gateway/adapter. Credentials, provider payloads, retry policies, and quotas SHALL remain outside domain logic.

## 5. Prompt and Policy Management

Production prompts and system instructions SHALL be version-controlled, reviewed, and attributable. Material changes SHALL follow release controls.

## 6. Input Safety

Untrusted user/content data SHALL not automatically become trusted instructions. Prompt injection and indirect instruction attacks SHALL be considered in retrieval and content-processing flows.

## 7. Output Validation

AI output SHALL be treated as untrusted data. Structured outputs SHALL be schema-validated and constrained before downstream use.

## 8. Human Oversight

High-impact or ambiguous AI-assisted actions SHALL support human review. Uncertain model output SHALL not be presented as verified fact.

## 9. Educational Use

AI tutors MAY explain concepts, summarize approved material, generate practice questions, and provide guided feedback. They SHALL not fabricate official curriculum facts or claim accreditation that does not exist.

## 10. Retrieval-Augmented Generation

Retrieved sources SHALL be identified, access-controlled, and version-aware. Retrieval SHALL respect user entitlement and authorization boundaries.

## 11. Privacy

Sensitive student data SHALL not be sent to external model providers unless the data flow is explicitly approved and protected. Data minimization and retention controls apply.

## 12. Reliability and Cost

AI calls SHALL have timeouts, bounded retries, quotas, cost controls, and graceful degradation. Optional AI failure SHALL not break core learning or commerce flows.

## 13. Evaluation

Material AI features SHALL have evaluation datasets and measurable criteria such as accuracy, groundedness, refusal behavior, latency, and cost.

## 14. Observability

AI requests SHALL be traceable without logging secrets or unnecessarily retaining sensitive prompts/responses. Model, prompt version, latency, and cost metadata SHOULD be observable.

## 15. Model Lifecycle

Models MAY be changed only with compatibility and evaluation checks. Provider outages SHALL support fallback or explicit degraded behavior when justified.

## 16. Definition of Done

AI Architecture is complete when AI boundaries, provider abstraction, prompt governance, input/output safety, human oversight, educational constraints, retrieval security, privacy, reliability, evaluation, observability, and lifecycle controls are defined.
