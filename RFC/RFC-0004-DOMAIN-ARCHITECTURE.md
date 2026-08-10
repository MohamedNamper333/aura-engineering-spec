---
document_id: RFC-0004
title: AURA Domain Architecture
status: Accepted
version: 1.0.0
category: Domain Architecture
priority: Critical
risk_level: Critical
owner: AURA Architecture Team
authors:
  - AURA Architecture Team
reviewers:
  - AURA Product Architecture Team
  - AURA Business Architecture Team
approvers:
  - Repository Maintainers
created: 2026-08-10
updated: 2026-08-10
related_documents:
  - RFC/RFC-0000-PROJECT-CHARTER.md
  - RFC/RFC-0002-PRODUCT-DISCOVERY.md
  - RFC/RFC-0003-BUSINESS-ARCHITECTURE.md
  - ARCHITECTURE_PRINCIPLES.md
  - DATA_MODELING_STANDARD.md
  - API_DESIGN_STANDARD.md
related_rfcs:
  - RFC-0002
  - RFC-0003
related_adrs: []
dependencies:
  - RFC-0003
supersedes: null
superseded_by: null
tags:
  - domain-driven-design
  - bounded-context
  - aggregates
  - architecture
  - education
---

# AURA Domain Architecture

## 1. Executive Summary

This RFC defines AURA's domain boundaries and ownership model. Its purpose is to prevent the platform from becoming a single undifferentiated business object graph where commerce, learning, identity, content, and operations directly mutate one another.

AURA SHALL use explicit bounded contexts with clear ownership, contracts, and invariants. The initial implementation MAY be a modular monolith, but module boundaries SHALL follow the domain boundaries defined here so that later extraction is possible without redesigning the business model.

The core domain topology is:

```text
Identity & Access
        |
        v
Catalog & Content -----> Commerce -----> Entitlements
        |                   |                |
        v                   v                v
Learning <------------- Events/Contracts ----+
        |
        v
Assessment

Operations / Support / Audit observe and act through explicit contracts.
```

## 2. Architectural Goals

The domain architecture SHALL:

- Establish one clear owner for each business concept.
- Prevent unauthorized cross-domain mutation.
- Keep financial state separate from learning state.
- Keep authentication separate from authorization policy.
- Make external integrations replaceable.
- Support an initial modular-monolith deployment.
- Preserve future service extraction options without premature distribution.
- Make important business transitions auditable.

## 3. Bounded Contexts

### 3.1 Identity & Access Context

**Responsibility:** identity, authentication, roles, permissions, sessions, and account lifecycle.

Owns:

- User identity.
- Credentials or authentication references.
- Role assignments.
- Account status.
- Authentication sessions.

Does not own:

- Course purchases.
- Learning progress.
- Payment transactions.

### 3.2 Catalog & Content Context

**Responsibility:** educational products and the content that composes them.

Owns:

- Subjects.
- Courses.
- Modules.
- Lectures.
- Content versions.
- Publication state.
- Content metadata.

Does not own:

- Payment state.
- Student completion state.
- User credentials.

### 3.3 Commerce Context

**Responsibility:** commercial intent and financial transaction orchestration.

Owns:

- Products offered for sale.
- Prices.
- Orders.
- Payment attempts.
- Payment transaction records.
- Refund records.
- Commercial status.

Does not own:

- Learning progress.
- Authentication.
- Raw educational content.

### 3.4 Entitlement Context

**Responsibility:** determine and record whether a principal has access to a product or learning resource.

Owns:

- Entitlements.
- Entitlement state.
- Grant/revoke history.
- Activation-code redemption outcomes.

It consumes validated commercial events but SHALL NOT become a shadow payment system.

### 3.5 Learning Context

**Responsibility:** learner interaction with educational content.

Owns:

- Enrollment/access state from the learning perspective.
- Lecture progress.
- Learning activity.
- Completion state.
- Learning milestones.

It references content identities and entitlement decisions but SHALL NOT mutate commerce state.

### 3.6 Assessment Context

**Responsibility:** quizzes, questions, attempts, grading, and assessment outcomes.

Owns:

- Assessments.
- Questions.
- Assessment versions.
- Attempts.
- Answers.
- Scores.
- Pass/fail outcomes.

Assessment history SHALL remain immutable after finalization except through explicit correction mechanisms.

### 3.7 Operations & Support Context

**Responsibility:** operational intervention, support cases, administrative workflows, and controlled overrides.

Owns:

- Support cases.
- Operational actions.
- Escalations.
- Administrative workflow state.

It SHALL NOT directly rewrite another context's database records as a normal business operation.

### 3.8 Audit & Compliance Context

**Responsibility:** durable records of security-sensitive, financial, authorization, and administrative events.

Owns:

- Audit events.
- Actor metadata.
- Event classification.
- Correlation identifiers.
- Integrity metadata where required.

Audit records SHALL be append-oriented.

## 4. Context Map

| Upstream | Downstream | Relationship |
|---|---|---|
| Identity & Access | Learning | Authenticated principal reference |
| Identity & Access | Commerce | Buyer identity reference |
| Identity & Access | Operations | Operator identity |
| Catalog & Content | Commerce | Product/catalog information |
| Commerce | Entitlement | Validated fulfillment event |
| Entitlement | Learning | Access decision |
| Catalog & Content | Learning | Learning object references |
| Assessment | Learning | Assessment outcome |
| Operations | All operationally affected contexts | Explicit command/workflow |
| All critical contexts | Audit | Domain events / audit events |

No context may bypass its defined upstream/downstream contract merely because direct database access is technically convenient.

## 5. Aggregate Boundaries

Aggregates SHALL be transaction boundaries, not simply database tables.

Initial aggregate candidates include:

| Context | Aggregate | Invariant Examples |
|---|---|---|
| Identity | User Account | Account state and identity consistency |
| Identity | Role Assignment | Authorized role transitions |
| Catalog | Course | Valid publication lifecycle |
| Catalog | Content Version | Version integrity |
| Commerce | Order | Order lifecycle consistency |
| Commerce | Payment Transaction | Financial state consistency |
| Commerce | Refund | Refund amount and authorization |
| Entitlement | Entitlement | Access lifecycle consistency |
| Entitlement | Activation Code | Single valid redemption |
| Learning | Learning Progress | Monotonic/valid progress rules |
| Assessment | Assessment Attempt | Immutable finalized result |
| Operations | Support Case | Controlled workflow |

These are conceptual boundaries. Implementation SHALL avoid giant aggregates that lock unrelated operations into one transaction.

## 6. Aggregate Rules

1. An aggregate owns its invariants.
2. External code SHALL use commands or domain services rather than mutate internal state arbitrarily.
3. Cross-aggregate invariants SHALL be minimized.
4. Cross-context consistency SHALL normally use events or explicit orchestration.
5. A transaction SHALL not span unrelated contexts merely to avoid designing an integration contract.
6. Idempotency SHALL be required for externally retried commands that can create financial or entitlement effects.

## 7. Domain Events

Important state changes SHOULD emit domain events where downstream behavior is required.

Examples:

```text
UserRegistered
CoursePublished
OrderCreated
PaymentConfirmed
PaymentFailed
RefundApproved
EntitlementGranted
EntitlementRevoked
ActivationCodeRedeemed
LectureCompleted
AssessmentSubmitted
AssessmentFinalized
```

Events SHALL describe facts that happened. They SHALL NOT be disguised commands.

For example:

```text
PaymentConfirmed
```

is a fact, while:

```text
GrantStudentAccess
```

is a command and belongs to orchestration/command handling.

## 8. Cross-Context Communication

Preferred mechanisms:

1. Direct application contract for synchronous read/query needs.
2. Explicit command for controlled state changes.
3. Domain/integration event for asynchronous reactions.
4. Anti-corruption layer when translating an external or legacy model.

Direct database writes across contexts are prohibited as an architectural pattern.

## 9. Read Models

A context MAY expose read models optimized for consumers without transferring ownership of the underlying domain state.

Example:

A Student Dashboard may combine:

- Identity display information.
- Catalog metadata.
- Entitlement state.
- Learning progress.
- Assessment results.

The dashboard read model SHALL NOT become the source of truth for any of these domains.

## 10. Financial Boundary

Commerce is a protected domain boundary.

Financial state SHALL be changed only through authorized commerce workflows.

The following are prohibited:

- Frontend-driven payment confirmation.
- Learning service changing order state.
- Entitlement service inventing successful payments.
- Admin UI silently modifying financial history.

Financial corrections SHALL be represented through explicit compensating events or controlled workflows.

## 11. Learning Boundary

Learning state is independent of payment state.

The learning domain SHALL answer questions such as:

- What has the student completed?
- What is the student's progress?
- What assessment did the student attempt?

It SHALL NOT answer:

- Was money actually received?
- Which payment provider processed the transaction?
- How was an order priced?

Those questions belong to Commerce.

## 12. Authorization Boundary

Authentication establishes identity. Authorization determines whether an action is permitted.

Business authorization SHALL be evaluated using explicit policies and relevant domain state.

Examples:

```text
Authenticated Student
    !=
Student Authorized To Access Course
```

The second decision depends on entitlement and other access policies.

## 13. Consistency Model

AURA SHALL distinguish consistency requirements:

### Strong Consistency

Use when violating the invariant would create unacceptable financial or authorization corruption.

Examples:

- Unique activation-code redemption.
- Order mutation within its aggregate.
- Finalization of a single assessment attempt.

### Eventual Consistency

Use when a short propagation delay is acceptable.

Examples:

- Analytics updates.
- Search indexing.
- Notifications.
- Derived dashboard projections.

The architecture SHALL not use distributed transactions merely to force strong consistency where business requirements do not require it.

## 14. Modular Monolith Strategy

The first deployment MAY use one application process and one database infrastructure while maintaining logical module boundaries:

```text
/apps
  /identity
  /catalog
  /commerce
  /entitlements
  /learning
  /assessment
  /operations
  /audit
```

Modules SHALL communicate through contracts rather than importing each other's persistence internals.

This approach reduces operational complexity while preserving domain boundaries.

## 15. Extraction Criteria

A context SHALL be considered for service extraction only when evidence demonstrates a meaningful reason, such as:

- Independent scaling requirement.
- Independent deployment requirement.
- Strong security isolation requirement.
- Distinct reliability profile.
- Organizational ownership boundary.
- Infrastructure dependency that cannot reasonably remain local.

Microservices SHALL NOT be introduced merely because bounded contexts exist.

## 16. Domain Anti-Patterns

The following patterns are explicitly rejected:

### God Entity

One universal `User` or `Course` object containing every domain concern.

### Shared Mutable Tables

Multiple contexts directly updating the same tables without ownership.

### Payment-as-Boolean

Representing financial truth as `isPaid = true` without transaction history.

### Entitlement-as-Payment

Granting access because a UI or provider callback claims payment succeeded without validated internal state.

### Distributed Transaction by Convenience

Forcing multiple contexts into one transaction because explicit consistency design was skipped.

### Service-by-Table

Creating a service for every database table without meaningful business ownership.

## 17. Domain Invariants

The architecture SHALL preserve at least these invariants:

1. Every mutable business concept has an owning context.
2. Context ownership is explicit.
3. Cross-context writes are prohibited.
4. Financial history is append-oriented.
5. Entitlement is not synonymous with payment.
6. Learning progress is not synonymous with entitlement.
7. Authentication is not authorization.
8. Finalized assessment results are historically stable.
9. External retries must not duplicate financial or entitlement effects.
10. Audit records cannot depend solely on mutable operational records.

## 18. Definition of Done

Domain Architecture is complete when:

- Bounded contexts are defined.
- Context ownership is explicit.
- Context relationships are documented.
- Aggregate candidates and invariants are identified.
- Domain event principles are defined.
- Cross-context communication rules are explicit.
- Financial and learning boundaries are protected.
- Consistency requirements are classified.
- Modular-monolith boundaries are established.
- Service extraction criteria are defined.
- Anti-patterns are explicitly rejected.

## 19. Next Dependency

The next architecture layer SHALL translate these domain boundaries into the overall system architecture, including application layers, runtime components, infrastructure boundaries, deployment topology, integration points, and trust boundaries.

That work belongs to RFC-0005 and SHALL preserve the domain ownership defined here.
