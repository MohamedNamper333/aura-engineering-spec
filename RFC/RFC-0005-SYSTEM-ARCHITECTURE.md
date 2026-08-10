---
document_id: RFC-0005
title: AURA System Architecture
status: Accepted
version: 1.0.0
category: System Architecture
priority: Critical
risk_level: Critical
owner: AURA Architecture Team
authors:
  - AURA Architecture Team
reviewers:
  - AURA Domain Architecture Team
  - AURA Security Team
approvers:
  - Repository Maintainers
created: 2026-08-10
updated: 2026-08-10
related_documents:
  - RFC/RFC-0003-BUSINESS-ARCHITECTURE.md
  - RFC/RFC-0004-DOMAIN-ARCHITECTURE.md
  - ARCHITECTURE_PRINCIPLES.md
  - API_DESIGN_STANDARD.md
  - DATA_MODELING_STANDARD.md
  - SECURITY.md
  - OBSERVABILITY_STANDARD.md
  - DEPENDENCY_POLICY.md
related_rfcs:
  - RFC-0003
  - RFC-0004
related_adrs: []
dependencies:
  - RFC-0004
supersedes: null
superseded_by: null
tags:
  - architecture
  - system
  - modular-monolith
  - api
  - security
  - reliability
---

# AURA System Architecture

## 1. Executive Summary

This RFC defines the runtime and deployment-neutral system architecture for AURA. It converts the business and domain boundaries into explicit application boundaries, infrastructure responsibilities, communication patterns, reliability rules, and security boundaries.

AURA SHALL begin as a **modular monolith** with strong internal domain boundaries. The architecture SHALL optimize for correctness, auditability, operational simplicity, and controlled evolution rather than premature distribution.

The system SHALL be designed so that independently deployable services can be extracted later when measurable operational or organizational constraints justify the cost.

## 2. Architectural Goals

The system SHALL prioritize:

1. Correct business state transitions.
2. Strong domain isolation.
3. Explicit authorization boundaries.
4. Financial and entitlement integrity.
5. Reliable asynchronous processing.
6. Observable operations.
7. Secure content delivery.
8. Horizontal scalability where evidence requires it.
9. Low operational complexity during early stages.
10. Deterministic failure handling.

## 3. Non-Goals

The initial architecture SHALL NOT optimize for:

- Maximum service count.
- Kubernetes by default.
- Distributed transactions everywhere.
- Event-driven architecture for every operation.
- Multi-region active-active deployment without demonstrated need.
- Independent deployment of every domain.

Complexity must be justified by a concrete requirement.

## 4. Logical Architecture

The logical system is divided into the following layers:

```text
Clients
  |
  v
Edge / Web Layer
  |
  v
Application Layer
  |
  +-----------------------------+
  | Domain Modules               |
  |                             |
  | Identity & Access           |
  | Catalog & Content            |
  | Commerce                     |
  | Payment Integration          |
  | Entitlement                  |
  | Learning                     |
  | Assessment                   |
  | Notifications                |
  | Support & Operations         |
  | Analytics                    |
  +-----------------------------+
  |
  +-----------------------------+
  | Infrastructure Adapters      |
  | DB | Cache | Queue | Storage |
  | Payment Providers | Email   |
  +-----------------------------+
```

Clients SHALL never bypass the application boundary to directly manipulate domain state.

## 5. Architectural Style

### 5.1 Modular Monolith

The initial deployment SHOULD be one primary application runtime with strongly isolated modules.

A module SHALL expose behavior through explicit application interfaces rather than allowing arbitrary cross-module database access.

Conceptually:

```text
Module A -> Public Application Contract -> Module B
```

not:

```text
Module A -> Module B private tables
```

### 5.2 Service Extraction Rule

A module MAY become an independent service only when one or more measurable constraints justify extraction, such as:

- Independent scaling requirement.
- Independent availability requirement.
- Security isolation requirement.
- Independent release cadence.
- Organizational ownership boundary.
- Resource contention.
- Regulatory or infrastructure isolation.

Service extraction SHALL preserve the domain contract rather than recreate business logic in transport code.

## 6. Runtime Components

### 6.1 Client Applications

The client layer may include:

- Student web application.
- Administrative interface.
- Teacher/content interface.
- Future mobile clients.

Clients SHALL treat the backend as the authoritative source for authorization and business state.

### 6.2 API/Application Runtime

The application runtime SHALL coordinate:

- Authentication.
- Authorization.
- Input validation.
- Application commands and queries.
- Transaction boundaries.
- Domain execution.
- Integration calls.
- Response mapping.

Transport-specific concerns SHALL remain outside domain logic.

### 6.3 Database

The primary transactional database SHALL own authoritative transactional state.

The database SHALL not be treated as a generic integration bus or cross-module shared object store.

### 6.4 Cache

Caching SHALL be treated as an optimization, never as the sole source of truth for critical business state.

Cache invalidation SHALL have an explicit strategy for each cached resource.

### 6.5 Message Broker / Queue

Asynchronous processing MAY use a queue for:

- Notifications.
- Content processing.
- Analytics events.
- Webhook processing.
- Retryable integration work.
- Long-running background jobs.

Critical synchronous business decisions SHALL NOT depend on an asynchronous consumer unless the business state machine explicitly supports eventual completion.

### 6.6 Object Storage

Large content assets SHALL be stored outside the transactional database where appropriate.

Access to protected assets SHALL be mediated through authorization-aware delivery mechanisms such as short-lived signed URLs or equivalent controls.

## 7. Request Processing Model

A normal synchronous request SHALL follow:

```text
Request
 -> Authentication
 -> Authorization
 -> Validation
 -> Application Command/Query
 -> Domain Logic
 -> Persistence / Integration
 -> Response Mapping
```

Failure at any mandatory stage SHALL produce an explicit error contract.

## 8. Command and Query Separation

The architecture SHOULD distinguish commands from queries at the application boundary.

Commands:

- Change state.
- Enforce invariants.
- Produce auditable outcomes.

Queries:

- Read state.
- Must not mutate domain state as a side effect.

This separation is logical; it does not require separate databases or services.

## 9. Transaction Boundaries

A transaction SHALL be as small as possible while preserving a required business invariant.

The application SHALL avoid holding database transactions open across:

- External HTTP calls.
- Payment-provider round trips.
- Long-running content processing.
- User interaction.

External operations SHALL use state machines, idempotency, reconciliation, or compensating behavior where required.

## 10. External Integrations

External providers SHALL be isolated behind adapters.

```text
Domain/Application
      |
      v
Provider-neutral Port
      |
      v
Provider Adapter
      |
      v
External System
```

The domain SHALL not depend directly on provider SDKs or provider-specific response shapes.

This applies to:

- Payment providers.
- Email/SMS providers.
- Object storage providers.
- Analytics providers.
- Future identity providers.

## 11. Payment Architecture Boundary

Payment processing is a high-risk integration boundary.

The system SHALL:

1. Create an internal payment intent or equivalent state before contacting a provider when required.
2. Use idempotency for retried operations.
3. Validate provider callbacks/webhooks.
4. Persist provider references.
5. Reconcile ambiguous transactions.
6. Avoid granting entitlement solely from an unverified client response.
7. Maintain immutable financial history.

A payment provider SHALL never directly write learning state.

## 12. Authorization Architecture

Authorization SHALL be enforced server-side.

The architecture SHALL distinguish:

```text
Authentication = Who are you?
Authorization  = What may you do?
Entitlement    = What content are you allowed to access?
```

These concepts SHALL not be collapsed into a single boolean such as `isPaid`.

Authorization checks SHALL occur at the application boundary and, where necessary, at resource delivery boundaries.

## 13. Content Delivery

Protected educational assets SHALL not be exposed through permanent public URLs.

The recommended flow is:

```text
Authenticated Request
 -> Entitlement Check
 -> Short-lived Access Grant
 -> Asset Delivery
```

Access grants SHALL have bounded lifetime and appropriate scope.

Absolute prevention of copying or recording SHALL not be claimed as an architectural guarantee.

## 14. Asynchronous Event Model

Domain events MAY be emitted when a meaningful business fact occurs, for example:

- `OrderPaid`.
- `EntitlementGranted`.
- `CourseCompleted`.
- `QuizSubmitted`.
- `RefundCompleted`.

Consumers SHALL be idempotent.

At-least-once delivery SHALL be assumed unless the chosen infrastructure explicitly provides a stronger guarantee.

Duplicate events SHALL not cause duplicate financial effects, duplicate entitlements, or duplicate irreversible operations.

## 15. Reliability Model

The system SHALL explicitly classify operations as:

### Critical

Examples:

- Payment confirmation.
- Entitlement grant/revocation.
- Refund processing.
- Identity changes.

These require strong consistency, idempotency, and auditability.

### Recoverable Asynchronous

Examples:

- Email delivery.
- Analytics ingestion.
- Search indexing.
- Non-critical notifications.

These may use retries and eventual consistency.

### Best Effort

Examples:

- Non-critical telemetry enrichment.
- Optional recommendation updates.

Failure SHALL not corrupt core business state.

## 16. Failure Handling

The architecture SHALL distinguish:

- Validation failure.
- Authentication failure.
- Authorization failure.
- Domain rule violation.
- Transient infrastructure failure.
- External provider failure.
- Timeout.
- Unknown external outcome.

Unknown outcomes SHALL NOT be converted into successful outcomes by default.

Retry policies SHALL be bounded and operation-specific.

## 17. Idempotency

All externally retryable state-changing operations SHALL define idempotency behavior where duplicate execution could cause harm.

Examples include:

- Payment confirmation.
- Webhook processing.
- Activation-code redemption.
- Entitlement grant.
- Refund initiation.
- Notification dispatch where duplicate delivery matters.

An idempotency key SHALL map to a stable business operation, not merely a random request identifier.

## 18. Observability

Every production request and asynchronous job SHALL be traceable through a correlation or trace identifier.

Critical business transitions SHALL emit structured audit events.

The system SHALL provide sufficient telemetry to answer:

- What happened?
- When did it happen?
- Which actor caused it?
- Which business object was affected?
- What external provider was involved?
- Did the operation succeed, fail, or remain unknown?

## 19. Security Boundaries

Security controls SHALL be layered across:

```text
Client
 -> Edge
 -> Application
 -> Domain
 -> Data
 -> Storage
 -> External Integrations
```

Secrets SHALL remain outside source code.

Sensitive data SHALL be minimized, protected in transit, and protected at rest according to its classification.

Administrative operations SHALL require stronger authorization and audit controls than ordinary student operations.

## 20. Data Ownership

Each domain module SHALL have explicit ownership of its authoritative data.

Cross-domain consumers SHALL access another domain through:

- Public application contracts.
- Published domain events.
- Explicit read models where justified.

Direct mutation of another module's private tables is prohibited.

## 21. Scalability Strategy

AURA SHALL scale in this order unless evidence demands otherwise:

1. Correctness.
2. Query and indexing optimization.
3. Caching.
4. Background processing.
5. Horizontal application scaling.
6. Read-model specialization.
7. Independent service extraction.
8. Multi-region architecture.

Scaling complexity SHALL be introduced only when measurements justify it.

## 22. Availability Strategy

The initial system SHALL target practical availability through:

- Health checks.
- Automated restart.
- Database backups.
- Graceful degradation.
- Queue retry policies.
- Provider timeout controls.
- Operational monitoring.

Availability objectives SHALL be formally specified before production commitments are made.

## 23. Architectural Anti-Patterns Prohibited

The following are prohibited unless an explicit ADR approves an exception:

- Shared mutable global state.
- Direct cross-module database mutation.
- Provider SDK calls from domain entities.
- Payment success inferred from frontend state.
- Permanent public URLs for protected content.
- Unbounded automatic retries.
- Distributed transactions used as a default integration strategy.
- Microservices created solely for perceived sophistication.
- Business logic duplicated in controllers and clients.
- Silent fallback from unknown state to success.

## 24. Architecture Decision Gates

Before introducing a new infrastructure component, the team SHALL document:

1. The problem it solves.
2. Why existing components are insufficient.
3. Operational cost.
4. Failure modes.
5. Security implications.
6. Data ownership implications.
7. Migration and rollback strategy.

Material architectural changes SHALL be recorded through an ADR.

## 25. Definition of Done

System Architecture is complete when:

- Runtime boundaries are defined.
- Modular monolith strategy is explicit.
- Domain modules map to runtime responsibilities.
- External integrations use adapters.
- Transaction boundaries are defined.
- Critical and asynchronous operations are distinguished.
- Idempotency requirements are explicit.
- Content delivery boundaries are defined.
- Authorization boundaries are explicit.
- Observability requirements are defined.
- Scalability strategy is staged.
- Prohibited architectural patterns are documented.

## 26. Relationship to Later RFCs

This RFC establishes the system-level architecture. Detailed technical contracts SHALL be defined by later specifications for:

- Data Architecture.
- API Architecture.
- Security Architecture.
- Infrastructure Architecture.
- Observability Architecture.
- Testing Architecture.
- Deployment and Release Architecture.
- Financial Architecture.
- Learning Platform Architecture.
- Identity and Access Architecture.

Those specifications SHALL preserve the architectural boundaries established here unless an explicit architecture decision changes them.
