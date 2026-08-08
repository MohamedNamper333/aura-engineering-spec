---
document_id: GUIDE-DATA-0001
title: Data Modeling Standard
status: Approved
version: 1.0.0
owner: AURA Architecture Team
classification: Engineering Standard
review_cycle: Annual
review_owner: AURA Architecture Team
approved_by: Repository Maintainers
effective_date: YYYY-MM-DD
supersedes: null
superseded_by: null
---

# Data Modeling Standard

---

# Revision History

| Version | Date | Description |
|---|---|---|
| 1.0.0 | YYYY-MM-DD | Initial data modeling standard. |

---

# Table of Contents

## Definitions
## Normative Language
## PART I — Data Modeling Philosophy
1. Purpose
2. Scope
3. Data Modeling Philosophy
4. Core Principles
## PART II — Data Model Design
5. Domain and Entity Modeling
6. Naming Conventions
7. Identifiers and Keys
8. Relationships and Constraints
9. Data Types
10. Nullability and Defaults
11. Normalization and Denormalization
12. Indexing
## PART III — Data Integrity and Evolution
13. Data Integrity
14. Audit Fields and Timestamps
15. Data Ownership
16. Sensitive Data
17. Schema Evolution
18. Migrations
19. Backward Compatibility
20. Data Validation and Testing
## PART IV — Governance
21. Review Checklist
22. Exceptions
23. Related Documents
24. Versioning
25. Document Status
## Appendix A — Naming Matrix
## Appendix B — Data Type Guidelines
## Appendix C — Migration Classification Matrix
## Appendix D — Data Model Review Checklist

# Definitions

## Data Model
A formal representation of the structure, relationships, constraints, and semantics of data within a system.

## Entity
A distinct conceptual object or concept represented within a data model.

## Attribute
A property or characteristic belonging to an entity.

## Record
A stored representation of an entity or data object within a persistence system.

## Schema
The structural definition governing stored data, including fields, types, relationships, constraints, and other structural rules.

## Primary Key
A field or combination of fields that uniquely identifies a record within its entity set.

## Foreign Key
A field or combination of fields that establishes a relationship between records in different entities.

## Candidate Key
A field or combination of fields capable of uniquely identifying a record.

## Composite Key
A key consisting of multiple fields.

## Natural Key
An identifier derived from meaningful domain data.

## Surrogate Key
An identifier generated specifically for persistence or identity purposes rather than derived from business meaning.

## Constraint
A rule enforced by the data store or application to preserve data correctness.

## Index
A data structure used to improve query performance for supported access patterns.

## Normalization
The organization of data to reduce unnecessary duplication and improve integrity.

## Denormalization
The intentional duplication or restructuring of data to improve performance, availability, or access patterns.

## Migration
A controlled change to the structure or representation of persisted data.

## Schema Evolution
The controlled process of changing a data model over time while preserving required compatibility and integrity.

## Data Owner
The person, team, or organizational unit responsible for the correctness, lifecycle, and governance of a dataset.

## Nullability
The property defining whether a field may contain an explicit null or equivalent absence value.

## Referential Integrity
The guarantee that relationships between related records remain valid according to defined constraints.

## Cardinality
The number or range of records that may participate in a relationship.

## Data Integrity
The correctness, consistency, validity, and reliability of stored data.

# Normative Language

The keywords **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** used throughout this document are interpreted according to RFC 2119.

## SHALL
Indicates an absolute requirement.

## SHALL NOT
Indicates an absolute prohibition.

## SHOULD
Indicates a strong recommendation that should normally be followed unless a justified exception exists.

## SHOULD NOT
Indicates a practice that should normally be avoided.

## MAY
Indicates an optional practice whose applicability depends on engineering requirements.

# PART I — Data Modeling Philosophy

# 1. Purpose

This document defines the engineering requirements for designing, implementing, evolving, and governing data models within systems governed by the **AURA Engineering Standards**.

Data models are architectural contracts, not merely storage implementation details. They affect applications, APIs, integrations, reporting, analytics, background jobs, security, and operations.

Data models SHALL be considered throughout:

```text
Design → Implement → Validate → Deploy → Operate → Evolve → Retire
```

A well-designed model SHOULD make explicit what data represents, valid values, relationships, required fields, uniqueness, ownership, and evolution strategy.

# 2. Scope

This standard applies to persistent data models used by systems governed by the **AURA Engineering Standards**, including relational, document, key-value, wide-column, graph, persistent application storage, event schemas, data-transfer schemas representing persistent domain structures, and correctness-sensitive cache models.

It applies to new models, modifications, migrations, transformations, imports, exports, archival, and retirement.

The standard is technology-independent. Vendor-specific administration, infrastructure provisioning, backups, disaster recovery, and SQL formatting are outside its scope unless separately governed.

# 3. Data Modeling Philosophy

Data models SHALL represent domain meaning clearly while satisfying operational requirements.

### Domain First
Structures SHOULD originate from domain concepts and access requirements rather than storage technology alone.

### Explicit Semantics
Fields SHOULD have one clear and stable meaning. Ambiguous names such as `value`, `data`, `status`, `type`, `flag`, and `misc` SHOULD be avoided when they create ambiguity.

### Integrity by Design
Where correctness can be enforced structurally, structural enforcement SHOULD be preferred over application-only checks. Examples include unique, foreign-key, check, and required-field constraints.

### Simplicity
Models SHOULD be as simple as possible without sacrificing integrity, performance, domain correctness, query requirements, or evolution capability.

### Access Patterns
Known access patterns SHOULD be considered. A theoretically elegant model that consistently produces unacceptable operational performance is incomplete.

### Evolution
Models SHALL be designed with future change in mind and SHOULD minimize unnecessary coupling.

A complete model balances:

```text
Domain correctness + Data integrity + Operational performance + Evolution capability
```

# 4. Core Principles

1. **Domain Clarity** — structures SHALL reflect meaningful domain concepts.
2. **Explicit Constraints** — important invariants SHOULD be enforced at the data boundary.
3. **Single Meaning** — fields SHOULD have one clearly defined semantic meaning.
4. **Stable Identity** — entities requiring durable identity SHALL have stable identifiers.
5. **Controlled Duplication** — duplication SHOULD be intentional and justified.
6. **Referential Integrity** — relationships SHOULD remain valid throughout their lifecycle.
7. **Explicit Nullability** — optional data SHALL be distinguishable from required data.
8. **Bounded Complexity** — unnecessary relationships and abstractions SHOULD be avoided.
9. **Performance Awareness** — models SHOULD be evaluated against realistic access patterns and scale.
10. **Evolvability** — changes SHOULD be designed for safe migration.
11. **Ownership** — important datasets SHOULD have identifiable ownership.
12. **Security by Design** — sensitive data SHALL be identified and protected during design.
13. **Testability** — important invariants SHOULD be automatically testable.
14. **Traceability** — material changes SHALL remain traceable through version control and migration history.

# PART II — Data Model Design

# 5. Domain and Entity Modeling

Entities SHOULD be introduced when a concept has independent identity, lifecycle, relationships, ownership, or business significance.

Entities SHOULD NOT be created solely to avoid a large table, and unrelated concepts SHOULD NOT be combined merely for convenience.

Attributes SHOULD represent properties belonging directly to the entity. Repeating independently meaningful data SHOULD NOT be packed into a single field when it requires independent validation, search, ownership, metadata, or lifecycle.

Entities with independent lifecycle requirements SHOULD have explicit lifecycle states where applicable. Derived data MAY be stored for performance, reporting, expensive computation, or historical snapshots, but its source of truth SHALL be defined.

# 6. Naming Conventions

Names SHALL be consistent, descriptive, and unambiguous.

Prefer:

```text
customer
payment_transaction
subscription
created_at
updated_at
account_status
is_active
has_access
user_id
```

over unnecessary abbreviations or ambiguous names.

Equivalent concepts SHOULD use the same naming convention throughout the system. Database-specific reserved words SHOULD be avoided where practical.

# 7. Identifiers and Keys

Entities requiring durable identity SHALL have an explicit identifier strategy.

Primary keys SHALL uniquely identify records within their scope. Surrogate keys MAY be used for stable persistence identity; natural keys MAY be used when domain uniqueness is stable and immutable.

Identifiers SHOULD remain stable. Composite keys MAY be used when they naturally define identity but SHOULD NOT create unnecessary relationship complexity.

Uniqueness SHALL be enforced at the appropriate boundary. Application-only uniqueness checks are insufficient when concurrent writes can violate the invariant.

External identifiers SHOULD be distinguished from internal persistence identifiers. Identifiers SHALL NOT be treated as authorization mechanisms.

# 8. Relationships and Constraints

Relationships MAY be one-to-one, one-to-many, many-to-many, or hierarchical. Cardinality SHOULD be explicit.

Many-to-many relationships SHOULD use an associative structure when the relationship has independent attributes or lifecycle.

Referential integrity SHOULD be enforced by the persistence layer where supported and appropriate.

Delete behavior SHALL be defined, such as:

```text
RESTRICT
CASCADE
SET NULL
SOFT DELETE
```

Cascading deletes SHOULD be used carefully and SHALL reflect domain semantics.

# 9. Data Types

Data types SHALL accurately represent semantics and valid ranges.

Numeric types SHOULD consider precision, range, arithmetic behavior, and storage. Exact monetary values SHALL NOT rely on floating-point representation; fixed-precision decimal or integer minor units MAY be used.

Native boolean types SHOULD represent boolean semantics. Temporal fields SHALL define meaning, time-zone semantics, and precision; UTC SHOULD be preferred for persisted system timestamps unless domain requirements dictate otherwise.

Semi-structured fields MAY be used where structure genuinely varies or schema flexibility is required, but SHOULD NOT merely replace proper modeling of frequently queried fields.

Large binary objects SHOULD generally use dedicated object storage unless a documented requirement justifies embedding them in transactional records.

# 10. Nullability and Defaults

Nullability SHALL communicate meaningful domain semantics.

Required fields SHALL be non-null. Optional fields MAY be nullable when absence has meaningful semantics.

Null SHOULD NOT ambiguously represent multiple states such as unknown, not applicable, not provided, not calculated, or deleted when those states materially differ.

Defaults SHOULD be used only where a deterministic domain-correct default exists. Dangerous defaults such as `0`, `false`, or arbitrary dates SHALL NOT be used merely to avoid missing-data handling.

Nullable booleans SHOULD be used only when three distinct states are meaningful.

# 11. Normalization and Denormalization

Normalization SHOULD be preferred when integrity, frequent updates, or well-defined relationships make duplication undesirable.

Denormalization MAY be introduced for measurable read performance, query complexity, availability, historical snapshots, or distribution requirements.

Denormalized data SHOULD define its source of truth, synchronization mechanism, update behavior, failure handling, and consistency expectations.

Performance-driven denormalization SHOULD be supported by evidence where practical.

# 12. Indexing

Indexes SHALL be designed according to actual access patterns and operational requirements.

Each index SHOULD have an identifiable query or access pattern justifying it. Composite indexes SHOULD reflect actual filter and sort behavior.

Redundant or overlapping indexes SHOULD be avoided. Write, storage, replication, and maintenance costs SHALL be considered.

Unused or obsolete indexes SHOULD be removed through controlled changes. Material indexing decisions SHOULD be validated against realistic workloads where practical.

# PART III — Data Integrity and Evolution

# 13. Data Integrity

Data integrity SHALL be preserved throughout the lifecycle of persisted data.

Important invariants SHOULD be enforced at the persistence boundary. Application validation MAY complement, but SHOULD NOT replace, database constraints where concurrent operations can bypass application checks.

Operations that must succeed or fail as one logical unit SHOULD use transactions where supported.

Concurrency SHALL be considered where simultaneous operations can create invalid state. Possible mechanisms include transactions, optimistic/pessimistic locking, version fields, conditional updates, and unique constraints.

Critical datasets MAY require periodic reconciliation, referential-integrity validation, duplicate detection, checksums, or aggregate comparison.

# 14. Audit Fields and Timestamps

Important entities SHOULD maintain sufficient temporal and audit information.

Typical fields include:

```text
created_at
updated_at
deleted_at
created_by
updated_by
deleted_by
```

Timestamp semantics SHALL be documented. Creation timestamps SHOULD normally be immutable. UTC SHOULD be preferred for persisted system timestamps unless domain requirements dictate otherwise.

Audit fields SHALL NOT be treated as a substitute for a dedicated audit log when complete historical change tracking is required.

# 15. Data Ownership

Important datasets SHALL have identifiable ownership.

Owners SHOULD be teams, services, or organizational units responsible for correctness, schema governance, lifecycle, access, retention, migrations, and incidents.

Each important dataset SHALL have an identified source of truth.

Services SHOULD avoid directly modifying another service's private persistence model unless explicitly permitted by the architecture. APIs, events, or other defined contracts SHOULD be preferred for cross-service interaction.

# 16. Sensitive Data

Sensitive data SHALL be identified and protected during model design.

Data SHOULD be classified according to applicable requirements, for example:

```text
PUBLIC
INTERNAL
CONFIDENTIAL
RESTRICTED
```

Potentially sensitive data includes credentials, secrets, financial information, personal information, government identifiers, security information, and private business information.

Systems SHOULD store only data required for legitimate purposes. Sensitive data SHOULD use appropriate encryption in transit and at rest. Secrets SHALL NOT be stored as ordinary application data unless the mechanism is explicitly designed for secret management.

Passwords SHALL NOT be stored in plaintext and SHALL use an appropriate password-hashing mechanism.

Sensitive data SHALL NOT be unnecessarily emitted into logs, metrics, traces, or error messages.

# 17. Schema Evolution

Schema changes SHALL be treated as controlled architectural changes.

Changes SHOULD be classified as additive, non-breaking, breaking, transformational, or destructive.

Backward-compatible additive changes SHOULD generally be preferred. Breaking changes SHALL identify affected consumers before deployment.

For distributed systems, breaking changes SHOULD use an expand-and-contract approach where practical:

```text
Old Schema → Expand → Dual Compatibility → Migrate Consumers → Contract → Remove Legacy Structure
```

When multiple application versions may coexist, the schema SHOULD remain compatible with all supported versions during the transition.

Fields or structures scheduled for removal SHOULD be explicitly deprecated before removal where practical.

# 18. Migrations

Production schema changes SHALL be version-controlled and reproducible through a migration or equivalent traceable mechanism.

Migrations SHOULD have deterministic ordering and SHOULD fail safely. Production safety SHALL consider locks, table size, query impact, replication, deployment timing, concurrent application versions, and recovery.

Large data transformations SHOULD be separated from schema changes where practical.

Destructive operations SHOULD be delayed until known consumers no longer require the affected structure.

Material migrations SHOULD define rollback, forward-fix, or recovery strategy. Literal reverse migrations are not mandatory when forward-fix is safer.

Production migrations SHOULD be tested against representative data volume where practical and SHOULD be observable through logs, metrics, status reporting, and failure reporting.

# 19. Backward Compatibility

Data-model changes SHALL consider currently deployed consumers.

Fields SHOULD NOT be removed until consumers are identified, migrated, usage is verified, and removal is approved.

Renames SHOULD generally follow:

```text
Add New Field → Support Both → Migrate Consumers → Backfill → Verify → Remove Old Field
```

Type changes SHALL be evaluated for existing values, queries, serialization, APIs, reports, and pipelines.

Constraint tightening SHALL account for existing violating data before enforcement.

Default-value changes SHALL be treated as behavioral changes.

# 20. Data Validation and Testing

Data models SHALL be validated through automated tests and controlled verification.

Tests SHOULD verify required fields, types, constraints, relationships, uniqueness, defaults, nullability, and important domain invariants.

Migration tests SHOULD verify schema correctness, existing-data compatibility, transformations, constraints, and application compatibility.

Representative testing SHOULD include realistic data volume, distribution, edge cases, nulls, boundary values, and legacy records.

After material migrations, systems SHOULD verify record counts, relationships, uniqueness, transformation accuracy, and application behavior.

Critical migration procedures MAY be tested against controlled failures such as partial migration, interruption, lock contention, rollback, and replication delay.

# PART IV — Governance

# 21. Review Checklist

## Domain
- [ ] Entity boundaries are clear.
- [ ] Domain terminology is consistent.
- [ ] Lifecycles are understood.
- [ ] Source of truth and ownership are defined.
- [ ] Derived data has a defined source of truth.

## Naming
- [ ] Names are descriptive and unambiguous.
- [ ] Boolean and timestamp naming is consistent.
- [ ] Foreign keys are clear.
- [ ] Unnecessary abbreviations are avoided.

## Identity and Relationships
- [ ] Primary keys are defined.
- [ ] Uniqueness is enforced.
- [ ] Identifier stability is understood.
- [ ] Relationship cardinality is explicit.
- [ ] Referential and delete behavior is defined.
- [ ] Cascades are justified.

## Types and Nullability
- [ ] Types match domain semantics.
- [ ] Monetary values use exact representation.
- [ ] Temporal semantics are defined.
- [ ] Nullability is intentional.
- [ ] Dangerous defaults are avoided.
- [ ] Semi-structured data is justified.

## Performance
- [ ] Access patterns were considered.
- [ ] Indexes have identifiable purposes.
- [ ] Redundant indexes are avoided.
- [ ] Denormalization is justified.
- [ ] Write and storage overhead was considered.

## Security
- [ ] Sensitive fields are classified.
- [ ] Data minimization is applied.
- [ ] Secrets are protected.
- [ ] Access requirements are defined.
- [ ] Sensitive telemetry exposure is avoided.
- [ ] Retention requirements are understood.

## Evolution and Testing
- [ ] Changes are classified.
- [ ] Consumers are identified.
- [ ] Compatibility requirements are understood.
- [ ] Migration strategy is defined.
- [ ] Recovery or forward-fix strategy exists.
- [ ] Structural and domain constraints are tested.
- [ ] Existing data is validated.

# 22. Exceptions

Exceptions MAY be granted for justified technical, operational, security, privacy, compatibility, legacy, or regulatory constraints.

Convenience alone SHOULD NOT justify an exception.

Material exceptions SHOULD document the affected requirement, model, reason, technical/security/operational impact, compensating controls, owner, review date, and remediation plan where applicable.

Temporary exceptions SHOULD have explicit expiration or review conditions. Repeated exceptions SHOULD trigger architectural review.

# 23. Related Documents

This document forms part of the **AURA Engineering Standards** framework.

Related standards include:

- ARCHITECTURE_PRINCIPLES.md
- STYLE_GUIDE.md
- TESTING_STANDARD.md
- SECURITY.md
- API_DESIGN_STANDARD.md
- DEPENDENCY_POLICY.md
- OBSERVABILITY_STANDARD.md
- COMMIT_CONVENTION.md
- BRANCHING_STRATEGY.md
- RELEASE_PROCESS.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md

Where multiple standards apply, the stricter applicable requirement SHOULD be followed unless an approved exception exists.

# 24. Versioning

This document follows Semantic Versioning.

## Major Version
A Major Version SHALL indicate an incompatible change to mandatory data-model requirements.

## Minor Version
A Minor Version SHALL indicate backward-compatible additions.

## Patch Version
A Patch Version SHALL contain non-breaking documentation changes such as corrections, clarifications, and formatting improvements.

All revisions SHALL remain traceable through version control. Material changes SHOULD reference relevant migration, architecture, or release documentation where applicable.

# 25. Document Status

| Field | Value |
|---|---|
| Status | Approved |
| Version | 1.0.0 |
| Classification | Engineering Standard |
| Owner | AURA Architecture Team |
| Document ID | GUIDE-DATA-0001 |
| Review Cycle | Annual |
| Next Review | YYYY-MM-DD |

This document defines the official data-modeling requirements for repositories governed by the **AURA Engineering Standards**.

Repositories governed by this standard SHOULD comply unless an approved exception exists.

The document SHOULD be reviewed periodically against architecture changes, database technology, operational incidents, security, privacy, performance, and schema-evolution experience.

A data model is an architectural contract defining identity, meaning, relationships, valid states, ownership, integrity, and evolution. Data modeling SHALL therefore be treated as an architectural discipline throughout the system lifecycle.

# Appendix A — Naming Matrix

| Concept | Preferred Pattern | Example |
|---|---|---|
| Entity | Domain noun | `customer` |
| Relationship entity | Domain relationship | `enrollment` |
| Primary key | `<entity>_id` or documented equivalent | `user_id` |
| Foreign key | `<referenced_entity>_id` | `account_id` |
| Boolean | `is_<state>` / `has_<property>` | `is_active` |
| Creation timestamp | `created_at` | `created_at` |
| Update timestamp | `updated_at` | `updated_at` |
| Deletion timestamp | `deleted_at` | `deleted_at` |
| Expiration timestamp | `expires_at` | `expires_at` |
| External identifier | `<entity>_external_id` | `order_external_id` |
| Status | `<entity>_status` where ambiguity exists | `account_status` |

Names SHALL communicate domain meaning. Equivalent concepts SHOULD use equivalent names. Abbreviations SHOULD be minimized.

# Appendix B — Data Type Guidelines

| Data Category | Preferred Approach | Primary Concern |
|---|---|---|
| Boolean | Native boolean | Semantic correctness |
| Integer | Integer type | Range |
| Decimal | Fixed-precision decimal | Exactness |
| Money | Decimal or minor-unit integer | Financial precision |
| Timestamp | Explicit temporal type | Time semantics |
| Text | Appropriate text type | Size and encoding |
| Identifier | Stable identifier type | Identity |
| Enumeration | Explicit bounded values | Valid states |
| Large binary | Object storage where practical | Storage efficiency |
| Semi-structured data | JSON/document type where justified | Schema flexibility |

Floating-point types SHOULD NOT be used for exact monetary calculations. Timestamp semantics SHOULD define time zone, precision, meaning, and mutability. Semi-structured storage SHOULD NOT substitute for modeling frequently queried domain fields.

# Appendix C — Migration Classification Matrix

| Classification | Example | Risk | Typical Strategy |
|---|---|---|---|
| Additive | Add nullable field | Low | Deploy directly where compatible |
| Additive + Backfill | Add field and populate existing records | Medium | Expand → Backfill → Validate |
| Constraint Change | Add uniqueness constraint | Medium/High | Validate existing data first |
| Type Change | Change numeric/string representation | High | Compatibility layer + migration |
| Rename | Rename field/entity | High | Expand → Migrate → Contract |
| Data Transformation | Recalculate stored representation | High | Controlled background migration |
| Destructive | Drop field/table | High/Critical | Verify consumers → Remove |
| Relationship Change | Change cardinality or ownership | High | Migration + compatibility strategy |

High and Critical migrations SHOULD include impact analysis, pre-production validation, recovery strategy, monitoring, explicit ownership, and post-migration verification.

# Appendix D — Data Model Review Checklist

## Domain
- [ ] Entities represent meaningful domain concepts.
- [ ] Entity boundaries are justified.
- [ ] Lifecycles are understood.
- [ ] Source of truth is defined.
- [ ] Derived data has defined ownership.

## Naming
- [ ] Names are descriptive and unambiguous.
- [ ] Boolean and timestamp naming is consistent.
- [ ] Foreign-key naming is consistent.
- [ ] Unnecessary abbreviations are avoided.

## Identity and Relationships
- [ ] Primary keys are defined.
- [ ] Identifier stability is understood.
- [ ] Unique constraints are defined.
- [ ] External identifiers are separated where appropriate.
- [ ] Relationship cardinality is explicit.
- [ ] Referential integrity is addressed.
- [ ] Delete and cascade behavior is justified.

## Types and Nullability
- [ ] Types match domain semantics.
- [ ] Monetary values use exact representation.
- [ ] Temporal semantics are defined.
- [ ] Nullable fields have defined meaning.
- [ ] Dangerous defaults are avoided.
- [ ] Semi-structured data is justified.

## Performance
- [ ] Access patterns were considered.
- [ ] Required indexes exist.
- [ ] Indexes have identifiable purposes.
- [ ] Redundant indexes are avoided.
- [ ] Denormalization is justified.

## Security
- [ ] Sensitive data is classified.
- [ ] Data minimization is applied.
- [ ] Secrets are protected.
- [ ] Access requirements are defined.
- [ ] Sensitive telemetry exposure is avoided.
- [ ] Retention requirements are defined.

## Evolution and Testing
- [ ] Schema changes are classified.
- [ ] Consumers are identified.
- [ ] Compatibility requirements are understood.
- [ ] Migration strategy is defined.
- [ ] Destructive changes are controlled.
- [ ] Recovery or forward-fix strategy exists.
- [ ] Structural constraints are tested.
- [ ] Domain invariants are tested.
- [ ] Existing data is validated.
- [ ] Representative workloads are considered.

# End of Document
