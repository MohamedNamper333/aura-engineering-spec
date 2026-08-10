---
document_id: RFC-0002
title: AURA Product Discovery
status: Accepted
version: 1.0.0
category: Product
priority: Critical
risk_level: High
owner: AURA Product Architecture Team
authors:
  - AURA Product Architecture Team
reviewers:
  - AURA Architecture Team
approvers:
  - Repository Maintainers
created: 2026-08-10
updated: 2026-08-10
related_documents:
  - RFC/RFC-0000-PROJECT-CHARTER.md
  - RFC/RFC-0001-PRODUCT-VISION.md
  - README.md
related_rfcs: []
related_adrs: []
dependencies:
  - Product Vision
supersedes: null
superseded_by: null
tags:
  - product
  - discovery
  - education
  - iraq
  - mvp
---

# AURA Product Discovery

## 1. Executive Summary

AURA addresses a structural problem in Iraqi vocational education: students and families can face fragmented educational material, inconsistent explanations, dependence on private tutoring, and limited access to structured digital learning designed specifically for vocational curricula.

The initial product SHALL focus on a narrow and executable outcome: provide vocational students with reliable, structured, affordable digital course material that can be purchased, activated, consumed, assessed, and tracked through one platform.

AURA SHALL validate the product in Iraq before introducing unnecessary regional complexity. The first release is therefore a focused education-commerce-learning system, not a full institutional replacement for schools or government systems.

## 2. Discovery Problem

### 2.1 Primary Problem

Vocational students need accessible explanations and organized educational material aligned with their actual study requirements.

### 2.2 Current Friction

The product is intended to reduce the following recurring friction:

- Difficulty finding complete and structured vocational explanations.
- Fragmentation of educational material across teachers and informal channels.
- Dependence on expensive private tutoring.
- Weak visibility into learning progress.
- Difficulty obtaining consistent educational content at the required time.
- Lack of a vocational-first digital learning experience.

### 2.3 Consequence

If the problem remains unresolved, students continue to depend on fragmented sources and variable teaching quality, while AURA loses the opportunity to establish a specialized vocational education ecosystem.

## 3. Target Users

### 3.1 Primary User

The primary user is an Iraqi vocational student, initially approximately 16–20 years old.

Typical needs include:

- Finding the correct subject or course quickly.
- Understanding lessons through clear explanations.
- Accessing purchased content reliably.
- Knowing what has been completed.
- Testing understanding through quizzes.
- Receiving a clear completion state.

### 3.2 Secondary Users

AURA SHALL also support:

- Teachers and content creators.
- Operations and support staff.
- Finance and administrative staff.
- Platform administrators.

Parents, schools, ministries, and external institutions are potential future stakeholders but SHALL NOT be treated as primary product users without explicit requirements.

## 4. Jobs To Be Done

### Student

When I need to study a vocational subject, I want to find structured material, learn it in sequence, test my understanding, and track my progress so that I can prepare effectively without relying entirely on private tutoring.

### Teacher

When I provide educational content, I want it organized into controlled courses and lectures so that students receive a consistent learning experience and I can manage my educational contribution.

### Operations

When students purchase and consume content, I need reliable records of users, orders, activations, learning activity, and support events so that the platform can operate predictably.

## 5. Product Hypotheses

AURA SHALL validate the following hypotheses rather than treating them as unverified facts:

| ID | Hypothesis | Validation Signal |
|---|---|---|
| H-01 | Vocational students have meaningful unmet demand for structured digital content. | Course discovery and purchase demand |
| H-02 | Students will pay for reliable vocational educational content. | Paid conversion and repeat purchase |
| H-03 | Structured learning with progress and quizzes improves engagement. | Completion and assessment activity |
| H-04 | A vocational-first UX is more relevant than a generic education platform. | User research and retention |
| H-05 | Controlled content delivery can reduce unauthorized distribution without making legitimate learning unusable. | Abuse rate versus learning friction |

Hypotheses SHALL be measured using real product data and user research.

## 6. Initial Product Scope

### 6.1 MVP Capabilities

The MVP SHALL prioritize:

1. Student registration and authentication.
2. Course and subject discovery.
3. Course and lecture presentation.
4. Purchase and order lifecycle.
5. Activation of purchased content.
6. Controlled lecture access.
7. Learning progress tracking.
8. Basic quizzes and results.
9. Student dashboard.
10. Basic administration of users, courses, content, and orders.
11. Transactional notifications.
12. Auditability of important financial and access events.

### 6.2 Deliberately Deferred

The MVP SHALL NOT require:

- Government accreditation.
- Full school information-system replacement.
- Complex social networking.
- Public creator marketplace.
- Advanced adaptive learning.
- Multi-country payment orchestration.
- Large-scale AI tutoring.
- Unvalidated gamification systems.

These may be evaluated after evidence supports them.

## 7. Learning Experience Requirements

The core learning journey SHALL be:

```text
Discover
  -> Register
  -> Select Course
  -> Purchase / Activate
  -> Start Learning
  -> Consume Lecture
  -> Record Progress
  -> Complete Quiz
  -> Review Result
  -> Continue / Complete Course
```

The experience SHALL minimize unnecessary navigation and make the student's current state obvious.

A first lecture or introductory lesson MAY be offered freely where commercially appropriate to reduce purchase uncertainty.

## 8. Commerce Discovery

AURA's initial commercial model is content and course sales.

The platform SHALL support a lifecycle that can distinguish:

```text
Catalog Item
  -> Order
  -> Payment Attempt
  -> Payment Confirmation
  -> Entitlement / Activation
  -> Learning Access
```

Refunds, failed payments, reversals, and manual operational interventions SHALL be represented explicitly rather than inferred from a single order status.

Activation codes MAY be used as a distribution mechanism, including codes sold through authorized AURA agents. Code generation, redemption, expiration, revocation, and fraud controls SHALL be defined in the Financial Architecture RFC.

## 9. Content Protection Principle

AURA should protect paid educational content, but protection SHALL not destroy legitimate usability.

The platform SHALL prefer controlled authenticated delivery and authorization checks over assumptions that browser-based content can be made impossible to copy.

No engineering requirement SHALL claim that client-side controls can provide absolute prevention of screenshots, recording, or redistribution.

## 10. Trust and Safety Requirements

The product SHALL establish trust through:

- Clear purchase records.
- Deterministic access rules.
- Secure authentication.
- Financial audit trails.
- Transparent entitlement state.
- Reliable support procedures.
- Protection of student data.

High-impact financial and authorization decisions SHALL remain deterministic and auditable.

## 11. Success Metrics

Initial product validation SHOULD measure:

| Metric | Purpose |
|---|---|
| Registration completion rate | Measures onboarding friction |
| Course view-to-purchase conversion | Measures commercial demand |
| Purchase success rate | Measures payment reliability |
| Activation success rate | Measures entitlement reliability |
| First-lecture start rate | Measures post-purchase activation |
| Course completion rate | Measures learning engagement |
| Quiz participation | Measures assessment adoption |
| Support contact rate | Measures operational friction |
| Refund rate | Measures purchase quality and satisfaction |
| Repeat purchase rate | Measures retained commercial value |

Targets SHALL be established after baseline data exists rather than inventing unsupported numbers.

## 12. MVP Release Boundary

The MVP is successful when a student can complete the critical loop without manual engineering intervention:

```text
Discover -> Register -> Buy/Activate -> Learn -> Track Progress -> Assess -> Complete
```

Operations must be able to inspect the corresponding account, entitlement, order, payment state, learning progress, and assessment result.

## 13. Discovery Risks

### R-01: Demand Assumption

The existence of an educational problem does not guarantee willingness to pay.

**Mitigation:** validate pricing, conversion, and retention with real users.

### R-02: Content Supply

A platform without sufficient high-quality content will fail regardless of technical quality.

**Mitigation:** establish a content acquisition and quality-control process before broad expansion.

### R-03: Payment Friction

Payment availability and reliability can directly constrain conversion.

**Mitigation:** prioritize supported Iraqi payment methods and maintain explicit payment states.

### R-04: Unauthorized Distribution

Paid digital content can be redistributed.

**Mitigation:** use layered access controls, monitoring, and operational controls without promising impossible protection.

### R-05: Scope Explosion

Attempting to build every education feature before validating the core loop creates unnecessary cost and complexity.

**Mitigation:** enforce the MVP boundary and require evidence for major additions.

## 14. Product Principles Derived From Discovery

1. **Vocational-first:** the product is designed around vocational learners, not a generic education abstraction.
2. **Learning before decoration:** functional learning outcomes take priority over cosmetic features.
3. **Commerce must be trustworthy:** payment and entitlement states must be explicit and auditable.
4. **Progress must be observable:** students and operators need reliable state, not ambiguous completion indicators.
5. **Security must be proportional:** protect valuable assets without creating unusable learning flows.
6. **Evidence over assumptions:** hypotheses become requirements only after validation.
7. **MVP discipline:** defer complexity that does not improve the validated core journey.

## 15. Definition of Done

Product Discovery is considered complete when:

- Target users are explicitly defined.
- Core problems are documented.
- Primary jobs-to-be-done are documented.
- Product hypotheses are identified.
- MVP scope is bounded.
- Critical learning and commerce journeys are defined.
- Initial success metrics are established.
- Major discovery risks are documented.
- Deferred capabilities are explicit.

## 16. Relationship to Later RFCs

This RFC establishes discovery-level requirements only.

Detailed definitions SHALL be delegated as follows:

- Business Architecture -> RFC-0003.
- Domain Architecture -> RFC-0004.
- Educational Platform -> Product RFC series.
- Financial Architecture -> Financial RFC series.
- Backend/API -> Backend RFC series.
- Security -> Security RFC series.

Later RFCs SHALL NOT silently contradict the accepted product discovery constraints. Conflicts require an explicit documented decision.
