---
document_id: RFC-0006
title: AURA Data Architecture
status: Accepted
version: 1.0.0
category: Data Architecture
priority: Critical
risk_level: Critical
owner: AURA Data Architecture Team
authors:
  - AURA Data Architecture Team
reviewers:
  - AURA Domain Architecture Team
  - AURA System Architecture Team
  - AURA Security Team
approvers:
  - Repository Maintainers
created: 2026-08-10
updated: 2026-08-10
related_documents:
  - RFC/RFC-0003-BUSINESS-ARCHITECTURE.md
  - RFC/RFC-0004-DOMAIN-ARCHITECTURE.md
  - RFC/RFC-0005-SYSTEM-ARCHITECTURE.md
  - DATA_MODELING_STANDARD.md
  - ERROR_HANDLING_STANDARD.md
  - OBSERVABILITY_STANDARD.md
  - SECURITY.md
related_rfcs:
  - RFC-0003
  - RFC-0004
  - RFC-0005
related_adrs: []
dependencies:
  - RFC-0004
  - RFC-0005
supersedes: null
superseded_by: null
tags:
  - data
  - database
  - integrity
  - audit
  - migrations
---

# AURA Data Architecture

## 1. Executive Summary

This RFC defines how AURA stores, owns, protects, evolves, and accesses authoritative data.

The design SHALL prioritize transactional correctness, explicit ownership, auditability, privacy, and operational recovery. The primary transactional data model SHALL use a relational database unless a later ADR demonstrates a material requirement for another authoritative datastore.

The database is an implementation of domain ownership, not a substitute for domain architecture.

## 2. Data Architecture Goals

The data architecture SHALL provide:

1. Strong integrity for financial and authorization state.
2. Explicit ownership for domain data.
3. Referential consistency where required.
4. Safe schema evolution.
5. Auditable high-impact changes.
6. Efficient access patterns.
7. Controlled retention and deletion.
8. Recoverability through backups and tested restoration.
9. Protection of sensitive student and financial information.
10. Clear separation between authoritative data and derived data.

## 3. Authoritative Data Store

AURA SHALL use a relational transactional database as the default system of record for:

- Identity and account state.
- Product and catalog state.
- Orders.
- Payment records.
- Entitlements.
- Learning progress.
- Assessment results.
- Support cases.
- Audit metadata required by the platform.

Other stores MAY exist for specialized workloads, but they SHALL have explicit ownership and synchronization rules.

## 4. Domain Data Ownership

Each bounded context owns its authoritative records.

Conceptually:

```text
Identity       -> users, credentials, role assignments
Catalog        -> subjects, courses, products, pricing
Content        -> lectures, content versions, assets metadata
Commerce       -> orders, order items
Payment        -> payment intents, transactions, provider references
Entitlement    -> access grants and lifecycle
Learning       -> enrollments, progress, completion
Assessment     -> quizzes, attempts, results
Support        -> cases and operational interactions
```

A module SHALL NOT update another module's authoritative tables directly.

Cross-domain data access SHALL use application contracts, events, or explicitly approved read models.

## 5. Data Classification

AURA SHALL classify data at minimum as:

### Public

Information intentionally exposed to unauthenticated users, such as selected catalog metadata.

### Internal

Operational information that should not be publicly exposed.

### Sensitive

Student profile data, support records, internal identifiers, and similar information requiring access control.

### Highly Sensitive

Credentials, authentication secrets, payment-related sensitive data, security secrets, and high-impact administrative information.

Classification SHALL drive access, logging, retention, and protection requirements.

## 6. Identity and Key Strategy

Every persistent business entity SHALL have a stable primary identifier.

Identifiers SHALL:

- Be unique within their entity boundary.
- Remain stable for the entity lifetime.
- Not encode mutable business meaning.
- Avoid exposing sequential internal identifiers where that would create an enumeration risk.

Public identifiers MAY differ from internal database keys.

External provider identifiers SHALL be stored separately from internal identifiers.

## 7. Temporal Data

Business records with material state changes SHALL preserve timestamps appropriate to their lifecycle.

At minimum, applicable entities SHOULD distinguish:

- `created_at`
- `updated_at`

Financial, audit, entitlement, and security records SHOULD additionally preserve the event or effective timestamp required to reconstruct state.

All timestamps SHALL use a consistent canonical representation, preferably UTC, with timezone conversion performed at presentation boundaries.

## 8. Money and Financial Precision

Monetary values SHALL NOT be represented using binary floating-point arithmetic for authoritative financial calculations.

The financial model SHALL use an exact representation such as:

```text
integer minor units + currency code
```

or a database decimal type with explicitly defined precision and scale.

Currency SHALL always be explicit where a monetary value exists.

Rounding rules SHALL be deterministic and documented.

## 9. Referential Integrity

Foreign keys SHALL be used where they materially protect required relationships within the same transactional ownership boundary.

Cross-context relationships SHALL not create accidental coupling through unrestricted foreign-key graphs.

The architecture SHALL avoid a single giant schema where every domain table is freely mutable by every module.

## 10. Soft Deletion and Historical Preservation

Soft deletion SHALL be used only where it serves a clear business or operational purpose.

It SHALL NOT become a universal substitute for lifecycle modeling.

Financial records, audit records, and legally or operationally significant history SHALL generally be preserved rather than hard-deleted.

Where an entity has an explicit lifecycle such as `active`, `archived`, `revoked`, or `cancelled`, that state SHOULD be preferred over a generic deletion flag.

## 11. Audit Data

High-impact operations SHALL produce immutable or append-oriented audit records.

Examples:

- Role changes.
- Payment state transitions.
- Refund decisions.
- Entitlement grants/revocations.
- Activation-code redemption.
- Administrative overrides.
- Security-sensitive account changes.

An audit record SHOULD include:

```text
actor
operation
entity_type
entity_id
previous_state (when safe and appropriate)
new_state (when safe and appropriate)
request/correlation id
timestamp
reason or source
```

Sensitive secrets SHALL never be copied into audit logs.

## 12. State Modeling

Important business state SHALL be modeled explicitly rather than inferred from nullable columns or missing rows.

For example:

```text
Payment
  Pending
  Authorized
  Confirmed
  Failed
  Refunded
```

The exact state machines SHALL be defined by their domain specifications.

A database schema SHALL support valid transitions but SHALL not become the only location where business rules exist.

## 13. Concurrency and Consistency

Critical business state SHALL use database transaction isolation and concurrency controls appropriate to the invariant being protected.

Examples requiring strong consistency include:

- Double redemption prevention.
- Entitlement grant uniqueness.
- Financial state transitions.
- Refund amount constraints.
- Role assignment changes.

Optimistic concurrency SHOULD be used where concurrent modification is expected and safe versioning is practical.

Pessimistic locking MAY be used when the business invariant cannot be safely protected otherwise.

## 14. Idempotency Records

Operations that can be retried across process boundaries SHOULD persist idempotency information sufficient to detect duplicate execution.

The record SHALL bind an idempotency key to the relevant operation scope and outcome.

Idempotency records SHALL have an explicit retention policy based on the operation's replay risk.

## 15. Indexing Strategy

Indexes SHALL be created from measured or clearly justified access patterns.

Every high-volume table SHOULD have indexes supporting:

- Primary key lookups.
- Common ownership queries.
- Frequently filtered lifecycle states.
- Time-based operational queries where needed.
- Unique business constraints.

Indexes SHALL be reviewed for write amplification, storage cost, and redundancy.

No index SHALL be added solely because a column appears frequently in code.

## 16. Query Safety

Application queries SHALL:

- Select only required columns where practical.
- Avoid unbounded result sets.
- Use pagination for potentially large collections.
- Avoid N+1 query patterns.
- Use deterministic ordering when pagination is involved.
- Respect tenant/ownership/authorization boundaries.

Dynamic SQL SHALL use parameterized values or an equivalent safe query mechanism.

## 17. Data Access Boundary

Repositories or data-access components SHALL belong to the infrastructure boundary and expose domain-appropriate operations to the application layer.

Domain entities SHALL not depend on ORM-specific persistence behavior where that would compromise domain isolation.

Database-specific constructs MAY be used when they materially improve correctness or performance, but such decisions SHALL remain behind the infrastructure boundary.

## 18. Derived and Read Models

Derived data MAY be stored for performance or analytics.

Examples:

- Search indexes.
- Dashboard aggregates.
- Recommendation features.
- Reporting tables.
- Materialized views.

Derived data SHALL never silently become the authoritative source for financial, entitlement, or identity state.

Every derived store SHALL have:

- Source of truth.
- Rebuild strategy.
- Synchronization mechanism.
- Staleness expectations.
- Failure recovery behavior.

## 19. Eventual Consistency

Eventual consistency is permitted for non-critical derived workloads.

Examples:

```text
Transactional DB -> Analytics
Transactional DB -> Search Index
Transactional DB -> Notification Queue
```

It SHALL NOT be used casually for invariants such as payment confirmation or unique entitlement creation.

## 20. Migration Strategy

All schema changes SHALL be version-controlled and reproducible.

Migrations SHALL be:

- Deterministic.
- Reviewable.
- Ordered.
- Safe to execute in the target environment.
- Tested against representative data.

Destructive migrations SHALL use an expand-and-contract strategy where practical:

```text
Expand
 -> Migrate
 -> Verify
 -> Switch Reads/Writes
 -> Contract
```

A migration SHALL have a rollback or recovery strategy appropriate to its risk.

## 21. Backups and Recovery

The production database SHALL have automated backups with documented retention.

Recovery objectives SHALL be defined through RPO and RTO before production launch.

Backups SHALL be tested through restoration exercises. A backup that has never been restored successfully SHALL not be treated as proven recoverability.

## 22. Data Retention

Retention SHALL be defined by data category and business need.

The platform SHALL avoid retaining sensitive information indefinitely without justification.

Deletion workflows SHALL consider:

- Business history.
- Security requirements.
- Legal obligations where applicable.
- Referential integrity.
- Auditability.
- Backup copies.

Deletion from the primary database SHALL not be represented as immediate destruction from every backup or derived system.

## 23. Privacy and Sensitive Data

The system SHALL follow data minimization.

Sensitive data SHALL:

- Be collected only when required.
- Have explicit access controls.
- Be excluded from ordinary logs.
- Be encrypted in transit.
- Use encryption at rest where appropriate to the threat model.
- Have controlled retention.

Authentication secrets SHALL never be stored as reversible plaintext.

Payment card data SHALL not be stored by AURA unless the architecture, provider obligations, and security requirements explicitly justify and support it.

## 24. Data Integrity Invariants

At minimum:

1. An order item references a valid product context.
2. A payment transaction references a stable internal financial operation.
3. An entitlement cannot be granted twice when the business rule requires uniqueness.
4. A refund cannot exceed the refundable amount.
5. A quiz attempt belongs to a valid student and assessment.
6. Progress records cannot silently belong to another user.
7. Historical financial records are not overwritten to represent a new event.
8. Administrative overrides are attributable.
9. Provider identifiers are not treated as internal primary keys.
10. Critical state transitions are atomic within their required transaction boundary.

## 25. Data Lifecycle

The generic lifecycle is:

```text
Create
 -> Active
 -> Updated / Transitioned
 -> Archived / Revoked
 -> Retained
 -> Eligible for Deletion
 -> Deleted / Anonymized
```

Not every entity uses every state.

Lifecycle behavior SHALL be defined per domain entity.

## 26. Performance and Capacity

Capacity planning SHALL use measured workload assumptions.

The team SHALL monitor:

- Query latency.
- Transaction throughput.
- Connection pool utilization.
- Lock contention.
- Storage growth.
- Index size.
- Cache hit rate where applicable.
- Background job backlog.

Performance optimizations SHALL preserve domain and financial correctness.

## 27. Database Security

Database credentials SHALL be managed through secure secret storage.

Application roles SHOULD follow least privilege.

Administrative database access SHALL be restricted and audited.

Production data SHALL not be copied into development environments without approved sanitization or equivalent controls.

## 28. Data Export and Portability

Operationally important data exports SHALL be generated through controlled interfaces.

Exports SHALL:

- Be authorized.
- Be auditable.
- Respect data classification.
- Avoid exposing unrelated users.
- Use bounded and controlled scopes.

Bulk exports SHALL be treated as high-risk operations.

## 29. Anti-Patterns Prohibited

The following are prohibited unless explicitly approved by ADR:

- Floating-point authoritative money values.
- Shared mutable tables across unrelated domains.
- Silent schema changes in production.
- Hard deletion of required financial history.
- Database writes from frontend clients.
- Unbounded queries in user-facing endpoints.
- Storing secrets in ordinary database fields without required protection.
- Using analytics/read models as financial sources of truth.
- Relying on timestamps alone to establish event ordering when stronger sequencing is required.
- Production data copied into development without controls.

## 30. Definition of Done

Data Architecture is complete when:

- Authoritative stores are identified.
- Domain ownership is explicit.
- Data classification exists.
- Identifier and timestamp strategy is defined.
- Financial precision rules are explicit.
- State modeling is explicit.
- Audit requirements are defined.
- Concurrency rules are defined.
- Indexing and query safety principles are defined.
- Migration strategy is defined.
- Backup and recovery expectations are defined.
- Retention and deletion principles are defined.
- Privacy and security boundaries are defined.
- Derived-data rules are explicit.

## 31. Relationship to Later RFCs

This RFC defines data-level architectural constraints. Later RFCs SHALL specify concrete schemas, API contracts, security controls, infrastructure topology, and domain-specific persistence models while preserving the ownership and integrity rules established here.
