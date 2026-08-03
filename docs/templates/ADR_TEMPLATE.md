---
document_id: TEMPLATE-ADR-0001
title: Architecture Decision Record (ADR) Template Standard
status: Approved
version: 1.0.0
template_version: 1.0.0

owner: AURA Architecture Team

authors:
  - AURA Architecture Team

created: YYYY-MM-DD
updated: YYYY-MM-DD
reviewed: YYYY-MM-DD

applies_to:
  - All Architecture Decision Records (ADR)

priority: High
risk_level: Medium

related_documents:
  - docs/templates/RFC_TEMPLATE.md
  - docs/standards/DOCUMENTATION_STANDARD.md
  - docs/standards/GLOSSARY.md
  - docs/standards/STYLE_GUIDE.md
  - CONTRIBUTING.md
  - README.md
---

# Architecture Decision Record (ADR) Template Standard

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial enterprise ADR template standard. |

---

# Table of Contents

1. Purpose
2. Scope
3. ADR Philosophy
4. ADR Lifecycle
5. ADR Categories
6. ADR Numbering
7. Metadata Standard
8. ADR Structure
9. Decision Writing Rules
10. Decision Lifecycle
11. Decision Status
12. Decision Context
13. Architecture Constraints
14. Decision
15. Decision Rationale
16. Alternatives Considered
17. Consequences
18. Risks
19. Validation
20. Related Documents
21. Approval
22. Revision History
23. Final Checklist

---

# PART I — Governance

---

# 1. Purpose

## Objective

This document defines the official Architecture Decision Record (ADR) standard used throughout the AURA Engineering Specification repository.

Every architectural decision that affects the long-term structure, behavior, maintainability, scalability, security, or operational characteristics of the system SHALL be documented using this template.

The objective of the ADR standard is to ensure that architectural knowledge remains:

- Permanent
- Traceable
- Reviewable
- Discoverable
- Maintainable
- AI-readable
- Human-readable

Unlike implementation documentation, an ADR records **why an architectural decision was made**, not how it was implemented.

Implementation details belong to source code, technical specifications, or implementation guides.

Architectural reasoning belongs inside ADRs.

---

## Primary Goals

The Architecture Decision Record exists to:

- Preserve architectural knowledge.
- Prevent repeated discussions.
- Explain engineering reasoning.
- Document long-term trade-offs.
- Improve onboarding.
- Support future maintenance.
- Provide historical context.
- Reduce architectural drift.

Every approved ADR becomes part of the permanent engineering knowledge base.

---

## Intended Audience

This document is intended for:

- Software Architects
- Technical Leads
- Senior Engineers
- Backend Engineers
- Frontend Engineers
- Infrastructure Engineers
- Security Engineers
- Platform Engineers
- Engineering Managers

It is also intended for AI systems that participate in engineering analysis.

---

## Relationship with RFC

An ADR is **not** an RFC.

The two documents serve different purposes.

### RFC

An RFC answers:

> Should we do this?

Its objective is discussion, evaluation, and proposal.

An RFC may be rejected.

An RFC may evolve significantly during review.

---

### ADR

An ADR answers:

> We decided to do this.

Its objective is documenting the final architectural decision.

Once approved, an ADR becomes authoritative.

It explains:

- What was decided.
- Why it was decided.
- What alternatives were rejected.
- What consequences are accepted.

The ADR should remain stable throughout the lifetime of the architecture.

---

## When to Create an ADR

An ADR SHOULD be created whenever a decision affects one or more of the following:

- Software Architecture
- System Boundaries
- Domain Design
- Database Design
- Distributed Systems
- Event Architecture
- Messaging
- Infrastructure
- Cloud Design
- Security Architecture
- Authentication
- Authorization
- Public APIs
- Internal APIs
- Engineering Standards
- Deployment Strategy
- Scalability
- High Availability
- Disaster Recovery

Small implementation choices SHOULD NOT become ADRs.

Only decisions with long-term architectural impact qualify.

---

# 2. Scope

This template applies to every Architecture Decision Record inside the repository.

The standard SHALL be followed by:

- All engineering teams.
- All repositories adopting the AURA Engineering Standards.
- All future architectural documentation.

This standard applies regardless of:

- Programming language
- Framework
- Infrastructure provider
- Deployment model

An ADR is technology-agnostic.

It documents architectural reasoning rather than implementation specifics.

---

## Out of Scope

The following documents SHALL NOT use this template:

- RFCs
- Meeting Notes
- Sprint Planning
- Task Descriptions
- Bug Reports
- User Documentation
- API References
- Source Code Comments
- Release Notes

Each document type has its own purpose and lifecycle.

Mixing document responsibilities is prohibited.

---

# 3. ADR Philosophy

## Objective

An Architecture Decision Record (ADR) exists to preserve architectural knowledge.

Architecture is not only the structure of software.

Architecture is the collection of engineering decisions that define how the system evolves over time.

Every important architectural decision SHOULD be documented before the reasoning behind it is forgotten.

Memory is temporary.

Documentation is permanent.

An ADR ensures that future engineers understand **why** a decision exists, even years after the original authors have left the project.

---

## Core Principle

Source code explains **how** the system works.

An ADR explains **why** the system was designed that way.

Both are required.

Neither replaces the other.

A well-designed system can become impossible to maintain if its architectural reasoning is lost.

---

## Architectural Knowledge

Architecture consists of knowledge.

That knowledge includes:

- Constraints
- Assumptions
- Trade-offs
- Risks
- Priorities
- Long-term objectives
- Business considerations
- Technical limitations

Most of this knowledge does not exist inside source code.

Therefore, it MUST be documented separately.

---

## Decision-Centric Documentation

An ADR documents one architectural decision.

It is **not** a design document.

It is **not** a specification.

It is **not** implementation documentation.

The decision itself is the primary artifact.

Everything else exists only to explain that decision.

---

## Immutable Historical Record

An ADR represents the architectural decision at the time it was approved.

Historical decisions MUST remain historically accurate.

Never rewrite an ADR to pretend a different decision was originally made.

If architecture changes in the future:

- create a new ADR;
- supersede the previous ADR when appropriate;
- preserve the historical record.

Architecture evolves.

History must not.

---

## Long-Term Thinking

Architectural decisions often survive far longer than implementations.

Programming languages change.

Frameworks change.

Infrastructure changes.

Business requirements change.

Architectural reasoning should remain understandable despite those changes.

Therefore ADRs SHOULD avoid unnecessary implementation details.

---

## Engineering Transparency

Every important architectural decision MUST answer the following questions:

- What problem existed?
- Why was this decision necessary?
- Which alternatives were considered?
- Why were those alternatives rejected?
- What risks were accepted?
- What trade-offs were intentionally made?
- What future consequences should engineers expect?

If these questions cannot be answered, the ADR is incomplete.

---

## Single Decision Principle

Each ADR SHALL describe exactly one primary architectural decision.

Bad example:

- Authentication
- Authorization
- Logging
- Monitoring

inside one ADR.

Good example:

ADR-0008

Authentication Architecture

ADR-0009

Authorization Strategy

ADR-0010

Centralized Logging Architecture

Large architectural initiatives SHOULD be divided into multiple ADRs.

Smaller ADRs are easier to review, understand, maintain and supersede.

---

## Decision Stability

An ADR records a stable architectural decision.

Temporary experiments SHOULD NOT become ADRs.

Brainstorming SHOULD NOT become ADRs.

Work-in-progress ideas belong in RFCs.

Only approved architectural direction belongs inside ADRs.

---

## Traceability

Every ADR SHOULD be traceable.

Traceability includes:

- Related RFCs
- Previous ADRs
- Superseded ADRs
- Dependent ADRs
- Architecture standards
- Design documents
- Technical specifications

An engineer should be able to navigate architectural history without external explanation.

---

## Technology Independence

Architectural decisions SHOULD remain understandable regardless of technology stack.

Avoid writing:

> We selected Framework X because its syntax is better.

Prefer writing:

> We selected an event-driven architecture because loose coupling improves scalability and resilience.

Technology may change.

Architecture usually survives technology.

---

## Documentation Quality

Every ADR SHOULD be:

- Clear
- Precise
- Concise
- Consistent
- Reviewable
- Versioned
- Permanent

Avoid:

- Marketing language
- Personal opinions
- Emotional arguments
- Ambiguous wording
- Unsupported claims

Architecture should be justified using engineering reasoning.

---

## Engineering Responsibility

The author of an ADR is responsible for documenting the decision accurately.

The reviewers are responsible for validating the engineering reasoning.

The approvers are responsible for accepting ownership of the architectural direction.

Approval is therefore an architectural commitment rather than a documentation formality.

---

## Relationship with Other Standards

This template should be interpreted together with:

- DOCUMENTATION_STANDARD.md
- RFC_TEMPLATE.md
- CONTRIBUTING.md
- STYLE_GUIDE.md
- GLOSSARY.md

When conflicts exist:

Architecture Governance Standards take precedence over implementation preferences.

---

# 4. ADR Lifecycle

## Purpose

Every Architecture Decision Record follows a controlled lifecycle.

The lifecycle reflects the maturity of the architectural decision.

It also defines whether an ADR may be used as an authoritative engineering reference.

Unlike RFCs, ADRs represent finalized decisions rather than proposals.

---

## Lifecycle Stages

Every ADR SHALL progress through the following lifecycle whenever applicable:

```text
Draft
   │
   ▼
Under Review
   │
   ▼
Approved
   │
   ▼
Active
   │
   ├───────────────┐
   ▼               │
Deprecated         │
   │               │
   ▼               │
Archived ◄─────────┘
```

---

### Draft

The decision is still being written.

Characteristics:

- Incomplete
- Not authoritative
- May change significantly
- Not suitable for implementation guidance

Draft ADRs SHOULD NOT be referenced by production documentation.

---

### Under Review

The architectural proposal is undergoing formal review.

Review typically includes:

- Architecture review
- Security review
- Platform review
- Domain review
- Engineering review

Major changes are still allowed.

Approval has not yet been granted.

---

### Approved

The architectural decision has been accepted.

This stage indicates that:

- Engineering reasoning has been reviewed.
- Trade-offs have been accepted.
- Risks have been acknowledged.
- The architecture is approved for implementation.

Approved ADRs become official engineering references.

---

### Active

Implementation has adopted the architectural decision.

The ADR now describes the current architecture.

Active ADRs SHOULD remain synchronized with reality.

If architecture changes substantially, create a new ADR rather than rewriting history.

---

### Deprecated

The architectural decision is no longer recommended for future work.

However:

- Existing systems may still rely on it.
- Historical context remains valuable.

Deprecation does not delete architectural history.

---

### Archived

The ADR is retained only for historical reference.

Archived ADRs SHALL remain immutable.

They preserve the evolution of the engineering architecture over time.

---

## Lifecycle Rules

The following rules SHALL apply:

- Every ADR MUST have exactly one lifecycle status.
- Status transitions SHOULD be intentional and documented.
- Approved ADRs MUST NOT silently return to Draft.
- Deprecated ADRs SHOULD reference their replacement.
- Archived ADRs MUST remain accessible for historical analysis.

Lifecycle integrity is essential for long-term architectural governance.

---

# 5. ADR Categories

## Purpose

Every Architecture Decision Record SHALL belong to one primary architectural category.

Categories provide consistency across the repository and improve discoverability, filtering, reporting, and long-term maintenance.

Each ADR MUST declare exactly one primary category.

Secondary categories MAY be listed as tags when appropriate.

---

## Standard Categories

The following categories are officially recognized.

### Architecture

Decisions affecting the overall software architecture.

Examples:

- Modular Monolith
- Microservices
- Event-Driven Architecture
- Layered Architecture
- Hexagonal Architecture

---

### Backend

Decisions affecting backend services.

Examples:

- Service Boundaries
- Internal Communication
- Business Logic Organization

---

### Frontend

Decisions affecting client applications.

Examples:

- UI Architecture
- State Management
- Rendering Strategy

---

### Database

Decisions affecting persistence.

Examples:

- Database Engine
- Schema Design
- Indexing Strategy
- Partitioning
- Replication

---

### Infrastructure

Infrastructure architecture decisions.

Examples:

- Cloud Provider
- Kubernetes
- Docker
- Networking
- Storage

---

### Security

Security architecture.

Examples:

- Authentication
- Authorization
- Secrets Management
- Encryption
- Zero Trust

---

### API

API design decisions.

Examples:

- REST
- GraphQL
- gRPC
- Versioning Strategy

---

### DevOps

Operational engineering.

Examples:

- CI/CD
- Deployment
- Release Process
- Git Strategy

---

### Performance

Performance engineering.

Examples:

- Caching
- Queue Systems
- CDN
- Scaling

---

### Observability

Operational visibility.

Examples:

- Logging
- Monitoring
- Metrics
- Tracing
- Alerting

---

### Governance

Engineering governance.

Examples:

- Documentation Standards
- Repository Standards
- Review Process
- Engineering Policies

---

### Other

Only used when no existing category applies.

Creating excessive "Other" ADRs SHOULD be avoided.

---

## Category Rules

Every ADR:

- MUST define one primary category.
- SHOULD avoid multiple primary categories.
- SHOULD use tags for secondary concerns.
- MUST remain consistent with repository taxonomy.

---

# 6. ADR Numbering

## Purpose

Every ADR requires a permanent identifier.

The identifier allows:

- Stable references
- Cross-document linking
- Historical traceability
- AI indexing
- Repository navigation

ADR identifiers are immutable.

---

## Number Format

Official format:

```text
ADR-XXXX
```

Examples:

```text
ADR-0001
ADR-0002
ADR-0003
ADR-0148
```

The numeric identifier SHOULD be zero-padded to four digits.

---

## Assignment Rules

Identifiers SHALL be assigned sequentially.

Numbers:

- MUST be unique.
- MUST never be reused.
- MUST never be renumbered.

Deleting an ADR does NOT free its identifier.

Historical continuity is more important than numerical completeness.

---

## Reserved Numbers

Reserved identifiers SHOULD remain reserved.

Example:

```text
ADR-0035
```

Reserved for future use.

If abandoned later:

Status becomes:

```text
Rejected
```

The identifier remains permanently reserved.

---

## Cross References

RFCs SHOULD reference ADRs when architectural decisions are finalized.

Example:

```text
RFC-0015

↓

ADR-0007
```

The relationship should always be explicit.

---

# 7. Metadata Standard

## Purpose

Metadata provides structured information about every Architecture Decision Record.

Metadata enables:

- Repository indexing
- Search
- Ownership tracking
- AI processing
- Automated documentation
- Engineering governance

Every ADR MUST begin with a YAML Front Matter block.

---

## Required Metadata

Example:

```yaml
---
document_id: ADR-0001
title: Authentication Service Architecture

status: Approved

version: 1.0.0

category: Security

owner: Architecture Team

authors:
  - Name

reviewers:
  - Name

approvers:
  - Name

created: YYYY-MM-DD
updated: YYYY-MM-DD

related_rfcs:
  - RFC-0004

related_adrs:
  - ADR-0002

supersedes:

superseded_by:

tags:
  - authentication
  - security
  - architecture
---
```

---

## Metadata Definitions

### document_id

Permanent ADR identifier.

Immutable.

---

### title

Human-readable decision title.

Should describe the architectural decision rather than the implementation.

Good:

```text
Authentication Service Architecture
```

Bad:

```text
Authentication Update
```

---

### status

Allowed values:

- Draft
- Under Review
- Approved
- Active
- Deprecated
- Archived

No custom values are allowed.

---

### version

Semantic Versioning SHOULD be used.

Example:

```text
1.0.0
```

---

### category

Primary architectural category.

Must match one official category.

---

### owner

Responsible engineering owner.

Exactly one owner SHALL exist.

Ownership includes future maintenance.

---

### authors

List of document authors.

Multiple authors are permitted.

---

### reviewers

Individuals responsible for technical review.

Reviewers validate engineering quality.

---

### approvers

Final architectural approval authority.

Approval indicates acceptance of the documented architectural direction.

---

### created

Initial creation date.

Format:

```text
YYYY-MM-DD
```

---

### updated

Latest modification date.

Must be updated whenever document content changes.

---

### related_rfcs

References proposal documents that resulted in this ADR.

---

### related_adrs

References other architectural decisions.

Used for dependency tracking.

---

### supersedes

Previous ADR replaced by this document.

---

### superseded_by

Future ADR replacing this document.

---

### tags

Search keywords.

Examples:

- event-driven
- backend
- auth
- database
- scalability

Tags SHOULD remain short and consistent.

---

## Metadata Validation Rules

Before an ADR is approved:

- All mandatory metadata MUST exist.
- Dates MUST follow ISO-8601.
- References MUST be valid.
- Identifiers MUST exist.
- Status MUST match lifecycle.

Metadata inconsistencies SHALL block approval.

---

# 8. ADR Structure

## Purpose

Every Architecture Decision Record SHALL follow a consistent internal structure.

A standardized structure improves:

- Readability
- Reviewability
- Automation
- AI Processing
- Long-term maintenance
- Engineering consistency

Readers should immediately know where to find:

- The problem
- The constraints
- The decision
- The rationale
- The consequences

regardless of who authored the ADR.

---

## Standard Structure

Every ADR SHALL contain the following sections.

```
Metadata
│
├── Context
├── Problem
├── Constraints
├── Decision
├── Decision Rationale
├── Alternatives Considered
├── Consequences
├── Risks
├── Validation
├── References
└── Approval
```

Additional sections MAY be added when justified.

Mandatory sections SHALL NOT be removed.

---

## Section Ordering

The order of sections is intentional.

Architecture should always be presented in the following logical sequence:

1. Understand the existing situation.
2. Identify the architectural problem.
3. Understand the constraints.
4. Present the decision.
5. Explain why it was selected.
6. Describe rejected alternatives.
7. Explain long-term consequences.
8. Record validation.
9. Record governance.

Changing this sequence SHOULD be avoided.

---

## Writing Style

Each section SHOULD be:

- Self-contained
- Technically accurate
- Concise
- Easy to review

Avoid unnecessary repetition.

Avoid implementation details unless they directly justify the architectural decision.

---

# 9. Decision Writing Rules

## Purpose

Architectural decisions must be written consistently across the repository.

Poorly written ADRs create ambiguity.

Ambiguous architecture creates inconsistent implementations.

These rules define how decisions SHALL be documented.

---

## Rule 1 — One Decision

Each ADR SHALL describe one primary architectural decision.

Correct:

```
ADR-0015

Adopt Event-Driven Architecture
```

Incorrect:

```
ADR-0015

Authentication
Messaging
Caching
Logging
```

Large architectural initiatives should be divided into multiple ADRs.

---

## Rule 2 — State the Decision Clearly

The decision SHALL appear explicitly.

Avoid forcing readers to infer it.

Good:

> The platform SHALL adopt PostgreSQL as the primary relational database.

Bad:

> PostgreSQL seems like a reasonable option.

Architectural decisions are commitments.

They should never sound uncertain.

---

## Rule 3 — Explain Why

Every decision MUST explain:

- Why this decision exists.
- Why competing alternatives were rejected.
- Why this solution fits the architecture.

A decision without reasoning becomes historical trivia rather than engineering knowledge.

---

## Rule 4 — Avoid Implementation Details

Implementation belongs elsewhere.

The ADR should explain architecture rather than code.

Good:

> Authentication responsibilities are isolated into an independent service.

Bad:

> Create AuthService.ts containing 18 methods.

---

## Rule 5 — Engineering Language

Architectural reasoning should rely on engineering evidence.

Avoid:

- Personal opinions
- Marketing language
- Emotional wording
- Subjective claims

Instead use:

- Constraints
- Trade-offs
- Measurements
- Engineering objectives

---

## Rule 6 — Long-Term Perspective

Architectural decisions usually survive longer than technologies.

Avoid wording tied to temporary implementation choices.

Prefer architectural concepts over framework-specific terminology.

---

## Rule 7 — Explicit Trade-offs

Every architectural decision creates advantages and disadvantages.

Both SHALL be documented.

Avoid presenting architecture as universally optimal.

---

## Rule 8 — Historical Integrity

Never modify historical architectural reasoning.

If the architecture changes:

Create a new ADR.

Do not rewrite previous decisions.

---

## Rule 9 — Cross References

Whenever possible, an ADR SHOULD reference:

- RFCs
- Previous ADRs
- Standards
- Specifications

Architecture should form a navigable knowledge graph rather than isolated documents.

---

## Rule 10 — Engineering Responsibility

Every ADR SHALL identify:

- Decision owner
- Reviewers
- Approvers

Architectural responsibility must remain explicit.

---

# 10. Decision Lifecycle

## Purpose

Architectural decisions evolve over time.

The implementation may change.

Business priorities may change.

Technology may change.

The recorded decision must therefore support controlled evolution without losing historical context.

---

## Lifecycle Overview

```
Decision Proposed
        │
        ▼
Architecture Review
        │
        ▼
Approved
        │
        ▼
Implemented
        │
        ▼
Operational
        │
        ├───────────────┐
        ▼               │
Deprecated             │
        │               │
        ▼               │
Superseded──────────────┘
        │
        ▼
Archived
```

---

## Proposed

The architectural decision exists but has not yet been accepted.

Typical characteristics:

- Active discussion.
- Subject to modification.
- Engineering review pending.

Normally linked to an RFC.

---

## Approved

The architecture review has completed successfully.

The decision becomes authoritative.

Implementation may begin.

---

## Implemented

The decision has been realized in the production architecture.

Implementation should conform to the approved ADR.

Any significant deviation requires either:

- ADR update, or
- New ADR.

---

## Operational

The architectural decision is actively supporting production systems.

Operational experience should be monitored.

Unexpected consequences should be documented.

---

## Deprecated

The decision is no longer recommended.

Reasons may include:

- Better architecture.
- Technology evolution.
- Business changes.
- Operational experience.

Deprecated ADRs remain part of architectural history.

---

## Superseded

A newer ADR officially replaces the current one.

The superseding ADR SHALL be referenced.

Example:

```
Superseded By:

ADR-0038
```

---

## Archived

Archived ADRs are retained permanently.

They exist for:

- Historical analysis.
- Architecture evolution.
- Audit purposes.
- Knowledge preservation.

Archived documents MUST remain immutable.

---

## Lifecycle Rules

The following governance rules apply:

- Every ADR SHALL have one lifecycle state.
- State transitions SHOULD be intentional.
- Superseded ADRs SHALL reference their replacement.
- Archived ADRs SHALL remain accessible.
- Historical records MUST never be deleted.

Lifecycle integrity is essential for long-term architectural governance.

---

# PART II — Decision Record

---

# 11. Decision Context

## Purpose

The Decision Context describes the architectural environment in which the decision is being made.

Its objective is to provide reviewers and future engineers with sufficient background to understand why the decision became necessary.

Without context, even a technically correct decision can become difficult to understand years later.

The context SHOULD explain the situation before the decision was taken.

It SHOULD NOT describe the solution.

---

## Context Should Include

The context MAY include:

- Existing architecture
- Business drivers
- Technical limitations
- Historical decisions
- Operational challenges
- Growth expectations
- Regulatory requirements
- Stakeholder concerns

Only information relevant to the decision should be included.

---

## Context Template

```markdown
# Context

## Existing Architecture

[Describe the current architecture.]

## Business Context

[Describe relevant business drivers.]

## Technical Context

[Describe technical environment.]

## Operational Context

[Describe operational considerations.]

## Summary

[Summarize why a decision is required.]
```

---

## Writing Guidelines

The context should answer:

- Where are we today?
- Why is change being considered?
- Which conditions influenced the decision?

It should NOT answer:

- What was selected?

That belongs in the Decision section.

---

# 12. Problem Statement

## Purpose

Every architectural decision solves a problem.

The problem MUST be documented before presenting the solution.

A decision without a clearly defined problem is difficult to justify.

---

## Problem Definition

The problem statement SHOULD explain:

- What is wrong today?
- What limitations exist?
- Who is affected?
- Why is the problem important?
- What happens if nothing changes?

---

## Problem Template

```markdown
# Problem

## Current Situation

[Describe the current problem.]

## Impact

[Describe architectural impact.]

## Affected Components

[List affected systems.]

## Long-Term Consequences

[Describe consequences of inaction.]
```

---

## Good Example

The current authentication service is tightly coupled to the API layer.

This coupling prevents independent scaling and increases deployment risk.

---

## Bad Example

Authentication needs improvement.

---

# 13. Architecture Constraints

## Purpose

Architectural decisions never exist in isolation.

Every decision is constrained by technical, operational, business, and organizational realities.

Constraints define what the architecture is allowed to do.

They are not problems.

They are boundaries.

---

## Constraint Categories

### Technical Constraints

Examples:

- Existing technology stack
- Legacy systems
- Database limitations
- Network topology

---

### Business Constraints

Examples:

- Budget
- Timeline
- Regulatory requirements
- Customer commitments

---

### Operational Constraints

Examples:

- Deployment windows
- Maintenance policies
- Availability targets

---

### Security Constraints

Examples:

- Compliance
- Encryption
- Data residency
- Identity management

---

## Constraint Template

```markdown
# Constraints

## Technical

- Constraint

## Business

- Constraint

## Operational

- Constraint

## Security

- Constraint
```

---

## Constraint Rules

Constraints SHOULD be objective.

Avoid writing preferences as constraints.

Correct:

> Existing PostgreSQL infrastructure must be reused.

Incorrect:

> Engineers prefer PostgreSQL.

---

# 14. Decision

## Purpose

This section records the architectural decision itself.

It is the most important section of the ADR.

The decision SHALL be explicit.

Readers must never infer the decision.

---

## Decision Statement

The decision SHOULD begin with a clear declarative sentence.

Example:

> The platform SHALL adopt an Event-Driven Architecture for all asynchronous domain communication.

---

## Decision Description

The description SHOULD explain:

- What has been selected.
- Scope of the decision.
- Systems affected.
- Expected architectural direction.

Implementation details SHOULD remain minimal.

---

## Decision Template

```markdown
# Decision

## Decision Statement

[One explicit architectural decision.]

## Scope

[Systems affected.]

## Architectural Direction

[Describe intended architecture.]
```

---

## Decision Rules

The decision SHOULD:

- Be specific.
- Be testable.
- Be technically precise.
- Avoid ambiguous wording.

Avoid phrases such as:

- We might...
- We probably...
- It could be useful...

Use:

- SHALL
- WILL
- IS ADOPTED

---

# 15. Decision Rationale

## Purpose

The rationale explains why the selected decision is preferable to other reasonable alternatives.

This section preserves engineering knowledge.

Years later, engineers should understand why this decision was made.

---

## Rationale Should Include

The rationale MAY discuss:

- Technical advantages
- Operational benefits
- Business alignment
- Scalability
- Reliability
- Security
- Maintainability
- Cost

---

## Rationale Template

```markdown
# Decision Rationale

The selected architecture provides:

- Benefit
- Benefit
- Benefit

The decision aligns with:

- Engineering goals
- Platform strategy
- Long-term maintainability
```

---

## Writing Rules

Avoid subjective statements.

Good:

> Independent deployment reduces operational risk.

Bad:

> This architecture feels cleaner.

Support reasoning with engineering arguments whenever possible.

---

# 16. Alternatives Considered

## Purpose

Every significant architectural decision SHOULD be evaluated against reasonable alternatives.

The purpose of this section is not to prove that the selected option is perfect.

The purpose is to demonstrate that the engineering team explored multiple viable approaches before reaching a final decision.

Documenting alternatives improves transparency, prevents repeated discussions, and provides historical context for future engineers.

---

## Alternative Selection Principles

Each alternative SHOULD represent a realistic engineering option.

Artificial or obviously inferior alternatives SHOULD NOT be included simply to justify the chosen solution.

Each alternative should be evaluated objectively.

---

## Alternative Template

```markdown
# Alternative

## Name

Alternative Name

## Description

Describe the alternative.

## Advantages

- Advantage
- Advantage
- Advantage

## Disadvantages

- Disadvantage
- Disadvantage

## Decision

Accepted / Rejected

## Rejection Reason

Explain why this option was not selected.
```

---

## Comparison Matrix

A comparison matrix SHOULD be included whenever multiple realistic alternatives exist.

| Alternative | Complexity | Scalability | Maintainability | Cost | Decision |
|-------------|------------|-------------|-----------------|------|----------|
| Option A | Medium | High | High | Medium | Rejected |
| Option B | Low | Medium | Medium | Low | Rejected |
| Selected Solution | Medium | High | High | Medium | Accepted |

---

## Writing Guidelines

The evaluation SHOULD remain objective.

Avoid statements such as:

> This option is obviously bad.

Prefer:

> This option introduces unacceptable operational complexity due to additional infrastructure requirements.

---

## 17. Consequences

## Purpose

Every architectural decision has long-term consequences.

Some are positive.

Some are negative.

Some remain unknown until the system evolves.

This section documents the expected consequences before implementation begins.

---

## Consequence Categories

### Positive Consequences

Examples:

- Better scalability
- Improved maintainability
- Reduced operational complexity
- Better separation of concerns
- Easier testing

---

### Negative Consequences

Examples:

- Increased infrastructure cost
- Higher implementation complexity
- Additional operational requirements
- Longer onboarding

---

### Neutral Consequences

Some consequences are neither beneficial nor harmful.

They simply represent architectural characteristics.

Example:

- Introduction of an additional deployment unit.

---

## Consequences Template

```markdown
# Consequences

## Positive

- Consequence

## Negative

- Consequence

## Neutral

- Consequence
```

---

## Long-Term Considerations

This section SHOULD discuss:

- Future maintenance
- Future extensibility
- Operational impact
- Organizational impact
- Team knowledge requirements

Architecture exists for years.

Its consequences should therefore be evaluated from a long-term perspective.

---

# 18. Risks

## Purpose

Every architectural decision introduces risk.

Risk documentation allows engineering teams to prepare mitigation strategies before implementation begins.

Ignoring risk does not eliminate it.

Documenting risk improves engineering quality.

---

## Risk Categories

### Technical Risk

Examples:

- Increased complexity
- Technology maturity
- Integration failure

---

### Operational Risk

Examples:

- Deployment failure
- Monitoring gaps
- Backup limitations

---

### Security Risk

Examples:

- New attack surface
- Authentication changes
- Secret management

---

### Business Risk

Examples:

- Budget
- Timeline
- Vendor dependency

---

## Risk Template

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Risk Description | Low / Medium / High | Low / Medium / High | Planned Mitigation |

---

## Risk Rules

Every High or Critical risk SHOULD include a mitigation strategy.

Risks without mitigation SHOULD be treated as blockers during review.

---

# 19. Validation

## Purpose

An architectural decision is not considered successful merely because it was implemented.

It must be validated.

Validation confirms that the architecture satisfies its intended objectives.

---

## Validation Categories

### Functional Validation

Verify that the architecture supports the required functionality.

---

### Performance Validation

Measure:

- Response time
- Throughput
- Resource utilization

---

### Scalability Validation

Evaluate:

- Horizontal scaling
- Vertical scaling
- Load behavior

---

### Reliability Validation

Measure:

- Availability
- Recovery
- Failure handling

---

### Security Validation

Verify:

- Authentication
- Authorization
- Encryption
- Compliance

---

## Validation Checklist

- Functional requirements satisfied.
- Performance targets achieved.
- Security review completed.
- Monitoring operational.
- Deployment validated.
- Architecture review closed.

---

## Success Metrics

Where applicable, measurable targets SHOULD be defined.

Example:

| Metric | Target |
|---------|--------|
| API Latency | <100 ms |
| Availability | ≥99.9% |
| Error Rate | <0.5% |
| Deployment Success | 100% |

---

# 20. Related Documents

## Purpose

Architectural decisions rarely exist in isolation.

This section connects the ADR to the broader engineering knowledge base.

Maintaining explicit references improves traceability and reduces duplicated documentation.

---

## Related RFCs

List all RFCs that influenced this decision.

Example:

```text
RFC-0012
RFC-0024
```

---

## Related ADRs

List architectural decisions that are related.

Examples include:

- Parent decisions
- Dependent decisions
- Complementary decisions
- Superseding decisions

---

## Related Standards

Examples:

- DOCUMENTATION_STANDARD.md
- STYLE_GUIDE.md
- SECURITY_STANDARD.md
- API_STANDARD.md

---

## External References

Examples:

- IETF RFCs
- NIST Publications
- OWASP
- CNCF Documentation
- Vendor Documentation

Only authoritative references SHOULD be used.

---

## Reference Guidelines

Every reference SHOULD be:

- Relevant
- Stable
- Publicly accessible where possible
- Sufficient to support the documented decision

References SHOULD complement the ADR rather than replace architectural reasoning.
---

# PART III — Governance & Completion

---

# 21. Approval

## Purpose

Architecture affects the long-term direction of the platform.

Therefore, every Architecture Decision Record MUST be formally approved before becoming authoritative.

Approval confirms that the documented decision has been reviewed, accepted, and adopted by the appropriate engineering authority.

Approval is an engineering commitment.

It is not merely a documentation step.

---

## Approval Authority

The required approvers depend on the scope of the decision.

Examples include:

| Decision Scope | Required Approver |
|----------------|-------------------|
| Component Architecture | Technical Lead |
| Service Architecture | Software Architect |
| Platform Architecture | Chief Architect |
| Security Architecture | Security Lead |
| Infrastructure | Platform Lead |
| Organization-wide Standards | Architecture Review Board |

Projects MAY define additional approval requirements.

---

## Approval Criteria

Before approval, reviewers SHALL verify that:

- The architectural problem is clearly defined.
- The decision is explicit.
- Alternatives have been evaluated.
- Trade-offs are documented.
- Risks are identified.
- Consequences are understood.
- References are complete.
- Metadata is valid.
- Repository standards are satisfied.

Approval SHALL NOT be granted if mandatory sections are incomplete.

---

## Approval Record

Every ADR SHOULD contain an approval section.

Example:

```markdown
# Approval

Status: Approved

Approved By:
- Jane Smith (Chief Architect)
- John Doe (Platform Lead)

Approval Date:
YYYY-MM-DD

Review Version:
1.0.0
```

---

## Post-Approval Changes

Once approved:

- Minor editorial corrections MAY be applied.
- Technical meaning SHALL NOT change.

If architectural intent changes, a new ADR MUST be created.

History MUST remain accurate.

---

# 22. Revision History

## Purpose

The revision history records how the document itself evolves.

It does NOT replace Git history.

Instead, it provides a human-readable summary of meaningful documentation changes.

---

## Revision Rules

The revision history SHOULD include:

- Version
- Date
- Summary of changes
- Author

Editorial fixes MAY be grouped.

Major architectural modifications SHOULD receive their own version.

---

## Revision Table

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0.0 | YYYY-MM-DD | Architecture Team | Initial release |
| 1.1.0 | YYYY-MM-DD | Architecture Team | Clarified rationale and validation guidance |
| 1.2.0 | YYYY-MM-DD | Architecture Team | Added governance improvements |

---

## Versioning Guidance

Semantic Versioning SHOULD be used.

Recommended interpretation:

Major

Architectural documentation fundamentally changes.

Example:

```
1.x.x → 2.0.0
```

Minor

New sections or governance improvements.

Example:

```
1.0.0 → 1.1.0
```

Patch

Editorial corrections.

Example:

```
1.1.0 → 1.1.1
```

---

# 23. Final Checklist

## Purpose

Before an ADR is merged into the repository, it SHOULD pass a final quality review.

This checklist helps ensure consistency across all architectural decisions.

---

## Document Quality

- [ ] Title is descriptive.
- [ ] Metadata is complete.
- [ ] Document ID is unique.
- [ ] Category is correct.
- [ ] Status is valid.

---

## Architectural Quality

- [ ] Context is complete.
- [ ] Problem is clearly defined.
- [ ] Constraints are documented.
- [ ] Decision is explicit.
- [ ] Rationale is technically justified.

---

## Engineering Review

- [ ] Alternatives evaluated.
- [ ] Consequences documented.
- [ ] Risks identified.
- [ ] Validation strategy defined.

---

## Governance

- [ ] References verified.
- [ ] Related RFCs linked.
- [ ] Related ADRs linked.
- [ ] Approval completed.
- [ ] Revision history updated.

---

## Repository Compliance

- [ ] Markdown formatting verified.
- [ ] Tables render correctly.
- [ ] Code blocks render correctly.
- [ ] Internal links verified.
- [ ] Style guide followed.

---

# Document Completion

This template defines the official Architecture Decision Record (ADR) standard for the AURA Engineering Specification repository.

All architectural decisions with long-term impact SHALL be documented using this template.

The template promotes:

- Architectural consistency
- Engineering transparency
- Long-term maintainability
- Historical traceability
- Governance
- Human readability
- AI readability

This document SHALL be maintained alongside the repository engineering standards.

Future revisions SHOULD improve clarity and governance while preserving backward compatibility whenever possible.

---

**End of Document**
