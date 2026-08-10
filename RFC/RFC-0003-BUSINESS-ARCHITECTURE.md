---
document_id: RFC-0003
title: AURA Business Architecture
status: Accepted
version: 1.0.0
category: Business Architecture
priority: Critical
risk_level: High
owner: AURA Business Architecture Team
authors:
  - AURA Business Architecture Team
reviewers:
  - AURA Product Architecture Team
  - AURA Architecture Team
approvers:
  - Repository Maintainers
created: 2026-08-10
updated: 2026-08-10
related_documents:
  - RFC/RFC-0000-PROJECT-CHARTER.md
  - RFC/RFC-0001-PRODUCT-VISION.md
  - RFC/RFC-0002-PRODUCT-DISCOVERY.md
  - DATA_MODELING_STANDARD.md
  - API_DESIGN_STANDARD.md
  - SECURITY.md
related_rfcs:
  - RFC-0000
  - RFC-0001
  - RFC-0002
related_adrs: []
dependencies:
  - RFC-0002
supersedes: null
superseded_by: null
tags:
  - business
  - commerce
  - operations
  - finance
  - education
---

# AURA Business Architecture

## 1. Executive Summary

This RFC defines the business operating model for AURA. It translates the accepted product discovery into explicit business capabilities, actors, lifecycle states, commercial boundaries, operational responsibilities, and business rules.

The purpose is to ensure that the technical platform represents real business processes rather than embedding undocumented assumptions inside application code.

AURA's initial business model is a private vocational education platform that sells controlled access to educational content and courses. The core commercial lifecycle is:

```text
Catalog -> Order -> Payment -> Entitlement -> Learning -> Assessment -> Completion
```

Each stage SHALL have an explicit owner, state, audit requirements, and failure behavior.

## 2. Business Model

### 2.1 Primary Value Proposition

AURA provides vocational students with structured, accessible, and affordable digital educational content through a specialized platform.

### 2.2 Revenue Model

The initial revenue model SHALL primarily consist of:

- Direct course or educational-content sales.
- Authorized activation-code distribution.
- Future educational services where explicitly approved.

Subscription, advertising, marketplace commissions, institutional licensing, and other revenue models MAY be introduced later but SHALL NOT be assumed by the initial architecture.

### 2.3 Value Chain

```text
Content Creation
    -> Content Quality Control
    -> Course Publishing
    -> Student Discovery
    -> Commercial Transaction
    -> Entitlement
    -> Learning Delivery
    -> Assessment
    -> Support / Feedback
    -> Analytics / Improvement
```

## 3. Business Actors

| Actor | Primary Responsibility |
|---|---|
| Student | Purchases or activates content and consumes learning material |
| Teacher | Creates, maintains, or contributes educational content |
| Content Reviewer | Validates educational quality before publication |
| Support Agent | Resolves account, purchase, and learning issues |
| Finance Operator | Reviews financial transactions and exceptions |
| Administrator | Controls platform configuration and operations |
| Authorized Agent | Distributes approved activation mechanisms |
| Payment Provider | Processes external payment transactions |
| System | Enforces deterministic business rules and records state |

A person MAY hold multiple roles only where authorization policy explicitly permits it. Identity and role assignment SHALL remain separate concepts.

## 4. Business Capability Map

### 4.1 Customer and Identity

- Registration.
- Authentication.
- Account lifecycle.
- Role management.
- Support identity verification.

### 4.2 Product and Content

- Subject management.
- Course management.
- Lecture management.
- Content review.
- Publishing.
- Versioning.
- Content access policy.

### 4.3 Commerce

- Catalog management.
- Pricing.
- Order management.
- Payment processing.
- Entitlement management.
- Activation-code management.
- Refund processing.

### 4.4 Learning

- Enrollment/access.
- Lecture consumption.
- Progress tracking.
- Assessment.
- Completion.

### 4.5 Operations

- Customer support.
- Content operations.
- Finance operations.
- User administration.
- Audit review.
- Incident handling.

### 4.6 Analytics

- Product analytics.
- Learning analytics.
- Commercial analytics.
- Operational metrics.

## 5. Core Business Entities

The following concepts SHALL exist at the business level even if implementation names differ:

- User.
- Role.
- Student Profile.
- Teacher Profile.
- Subject.
- Course.
- Lecture.
- Content Asset.
- Product.
- Price.
- Order.
- Payment Attempt.
- Payment Transaction.
- Entitlement.
- Activation Code.
- Quiz.
- Quiz Attempt.
- Learning Progress.
- Refund.
- Support Case.
- Audit Event.

No single entity SHALL be used as an overloaded substitute for materially different concepts such as payment, entitlement, and learning progress.

## 6. Commerce Lifecycle

### 6.1 Order

An order represents the commercial intent to acquire one or more products.

Recommended lifecycle:

```text
Pending
  -> Payment Pending
  -> Paid
  -> Fulfilled
```

Exceptional states MAY include:

```text
Cancelled
Expired
Failed
Partially Refunded
Refunded
```

The exact state machine SHALL be finalized by the Financial Architecture specification.

### 6.2 Payment

Payment is an external or internal financial transaction and SHALL be modeled separately from order state.

A payment provider response SHALL NOT directly grant permanent learning access without deterministic validation of the transaction outcome.

### 6.3 Entitlement

Entitlement is the authorization for a user to access a purchased product.

This separation is mandatory because:

- A payment can succeed while fulfillment fails.
- An entitlement can later be revoked under defined rules.
- Manual operational corrections may be required.
- Refunds may change access without rewriting historical payment records.

## 7. Activation Codes

Activation codes MAY support physical or agent-based distribution.

Each code SHALL have explicit:

- Unique identifier.
- Product association.
- Lifecycle state.
- Creation metadata.
- Redemption metadata.
- Expiration policy where applicable.
- Revocation capability.
- Audit history.

A redeemed code SHALL NOT be reusable unless a future business rule explicitly permits it.

Code values SHALL never be stored or logged in plaintext where that would create unnecessary exposure.

## 8. Content Operations

Educational content SHALL pass through controlled states before becoming available for sale.

Minimum conceptual lifecycle:

```text
Draft
  -> Review
  -> Approved
  -> Published
  -> Archived
```

Only authorized roles MAY transition content between controlled states.

A published course SHALL reference a stable version of its learning content. Changes that materially affect an already purchased learning experience SHALL follow a documented versioning policy.

## 9. Learning Business Rules

1. A student may consume paid content only when an active entitlement permits access.
2. Progress belongs to the student and the relevant learning object.
3. Completing a lecture SHALL NOT automatically imply passing an assessment.
4. Quiz attempts SHALL remain historically auditable.
5. Completion criteria SHALL be explicit and versioned.
6. Administrative corrections SHALL be auditable.
7. Deleting a user or course SHALL NOT silently destroy financial or audit history.

## 10. Refunds and Exceptions

Refunds SHALL be treated as financial events, not as destructive edits to historical orders.

The system SHALL preserve:

- Original order.
- Original payment transaction.
- Refund request.
- Refund decision.
- Refunded amount.
- Operator or system actor.
- Timestamp.
- Resulting entitlement behavior.

The financial system SHALL support partial refunds conceptually even if the initial UI exposes only full refunds.

## 11. Support Operations

Support SHALL operate through explicit cases or tickets rather than undocumented direct database edits.

Support actions affecting:

- payments,
- entitlements,
- account identity,
- content access,
- refunds,

SHALL create auditable records.

Emergency operational actions MAY exist but SHALL be restricted, logged, and reviewed.

## 12. Iraqi Market Constraints

The initial operating model SHALL accommodate Iraqi payment and distribution realities without hard-coding a single provider into the core business domain.

The architecture SHALL permit adapters for supported payment providers and agent-based activation workflows.

Provider-specific behavior belongs in integration boundaries, while the core business model SHALL reason in provider-neutral concepts such as payment intent, transaction, confirmation, refund, and entitlement.

## 13. Business Invariants

The following invariants are mandatory:

1. A user identity is unique within the defined identity boundary.
2. An order has a clear owner and immutable commercial history.
3. A payment transaction is never silently overwritten.
4. Learning access is derived from explicit entitlement state.
5. Financial history is append-oriented and auditable.
6. Activation-code redemption is idempotent.
7. Administrative overrides require authorization and audit evidence.
8. Business state transitions are deterministic.
9. External provider failures do not corrupt internal financial state.
10. Historical records required for finance, security, or compliance are not hard-deleted through ordinary business operations.

## 14. Operational KPIs

AURA SHALL monitor at minimum:

- Registration conversion.
- Course conversion.
- Payment success rate.
- Payment reconciliation rate.
- Entitlement fulfillment latency.
- Activation success rate.
- Course completion rate.
- Refund rate.
- Support case volume.
- Average support resolution time.
- Content publication cycle time.
- Revenue by product.

Metrics SHALL have explicit definitions and consistent time semantics before being used for executive reporting.

## 15. Separation of Responsibilities

The system SHALL maintain separation between:

```text
Product Rules
    !=
Payment Provider Logic
    !=
Learning State
    !=
Authorization Policy
    !=
Operational Overrides
```

A payment provider adapter must not become the source of truth for learning authorization.

A frontend component must not become the source of truth for financial state.

An AI component must not become the sole authority for irreversible financial or access decisions.

## 16. Business Failure Principles

Business failures SHALL be explicit.

Examples:

- Payment timeout != payment failure.
- Payment failure != order deletion.
- Successful payment != guaranteed fulfillment until confirmed.
- Refund request != approved refund.
- Revoked entitlement != erased transaction history.
- Content unpublish != deletion of historical learning records.

Ambiguous states SHALL be represented explicitly rather than guessed from missing data.

## 17. Definition of Done

Business Architecture is complete when:

- Business actors are defined.
- Core capabilities are defined.
- Core business entities are identified.
- Commerce lifecycle is explicit.
- Entitlement is separated from payment.
- Content lifecycle is defined.
- Learning rules are documented.
- Refund and support operations are auditable.
- Market-specific integrations are isolated from core business concepts.
- Business invariants are explicit.
- Operational KPIs are defined.

## 18. Relationship to Later Specifications

This RFC establishes business semantics. Later technical specifications SHALL map these concepts into domain models, APIs, data structures, workflows, and infrastructure.

The next major architectural dependency is Domain Architecture, which SHALL define bounded contexts, aggregates, ownership boundaries, and domain interactions without collapsing the business model into one monolithic object graph.
