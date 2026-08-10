# AURA Database Architecture

**Status:** Accepted  
**Version:** 1.0.0  
**Owner:** Architecture Governance

## 1. Purpose

Define the authoritative persistence model and invariants required before database implementation.

## 2. Persistence Principles

- PostgreSQL is the baseline relational system.
- Authoritative business state SHALL live in transactional tables.
- Money SHALL use integer minor units or exact decimal, never floating point.
- Foreign keys SHALL enforce ownership relationships where relational integrity is required.
- Unique constraints SHALL enforce business uniqueness that must hold under concurrency.
- Audit history SHALL be append-oriented.
- Derived data such as caches, search indexes, and analytics aggregates SHALL be rebuildable.

## 3. Core Domains

```text
Identity
  users
  roles
  permissions
  user_roles

Catalog / Content
  sections
  subjects
  courses
  modules
  lectures
  content_versions
  assets

Commerce
  products
  prices
  orders
  order_items
  payments
  refunds

Access
  entitlements
  activation_codes
  activation_redemptions

Learning
  enrollments
  progress
  assessments
  assessment_versions
  quiz_attempts

Operations
  notifications
  audit_events
  outbox_events
```

Names are conceptual and may be refined during physical schema design without changing ownership semantics.

## 4. Identity Invariants

- User identifiers SHALL be immutable primary identifiers.
- Login identifiers SHALL have an appropriate unique constraint.
- Password hashes SHALL never be returned through APIs.
- Role assignment SHALL be represented explicitly.
- Deactivation SHALL preserve historical references.

## 5. Catalog Invariants

- Published content SHALL reference a valid content version.
- Content versions SHALL be immutable after publication where historical reconstruction requires it.
- Destructive deletion of referenced educational history SHALL be prohibited.

## 6. Commerce Invariants

### Orders

An order SHALL preserve the agreed price/currency at purchase time. Historical order amounts SHALL not change when catalog pricing changes.

### Order Items

Each item SHALL identify the purchased product/content and immutable commercial snapshot required for reconstruction.

### Payments

Provider transaction identifiers SHALL be unique within the relevant provider scope. Payment state transitions SHALL be constrained by domain rules.

### Refunds

Refunded amount SHALL never exceed the refundable amount. Refund records SHALL preserve original payment linkage.

## 7. Entitlement Invariants

Entitlement grants SHALL identify the subject receiving access, the protected resource, the granting reason/source, and relevant validity state.

The schema SHALL prevent duplicate active grants where the business model requires uniqueness.

## 8. Activation Code Invariants

Activation codes SHALL be stored in a form that prevents unnecessary exposure of redeemable secrets. Redemption SHALL be atomic and concurrency-safe.

A code SHALL not be redeemable beyond its configured usage policy.

## 9. Learning Invariants

Progress SHALL be attributable to a learner and versioned educational resource. Assessment attempts SHALL preserve the assessment version used.

Completion records SHALL be reconstructable from authoritative learning state.

## 10. Audit Invariants

Security, financial, entitlement, privileged administrative, and material content lifecycle events SHALL produce durable audit evidence.

Audit records SHALL not be silently overwritten to hide history.

## 11. Transaction Boundaries

The following operations require transactional integrity where implemented within the same database:

```text
Order creation + order items
Payment state transition + outbox event
Refund creation + refundable-balance update
Activation redemption + entitlement grant
Completion transition + completion event
```

Cross-provider operations SHALL use explicit state machines and reconciliation rather than distributed database transactions.

## 12. Concurrency

Database constraints and locking/isolation SHALL protect against:

- Duplicate payment processing.
- Double redemption.
- Over-refunding.
- Duplicate entitlement grants.
- Lost progress updates.

Correctness SHALL not depend solely on application-level pre-checks.

## 13. Indexing

Indexes SHALL be derived from actual access patterns and constraints. Every index SHOULD have an identified query or uniqueness purpose.

Over-indexing is prohibited because write amplification and storage cost are architectural concerns.

## 14. Soft Delete / Archive

Soft deletion SHALL be used only where historical references or business requirements justify it. It SHALL not become a default substitute for lifecycle design.

## 15. Migrations

Schema changes SHALL be version-controlled. Breaking changes SHOULD use expand-and-contract migration patterns.

Production migrations SHALL be observable and reversible where technically safe; irreversible data transformations require explicit recovery planning.

## 16. PII and Sensitive Data

Sensitive fields SHALL be classified, minimized, protected, and excluded from ordinary logs. Database access SHALL follow least privilege.

## 17. Outbox Pattern

Authoritative state changes that must emit reliable asynchronous events SHOULD use an outbox record in the same transaction, followed by asynchronous publication.

## 18. Machine-Readable Schema Gate

Before implementation is declared data-complete, an ERD and machine-readable schema/migration set SHALL exist and validate against these invariants.
