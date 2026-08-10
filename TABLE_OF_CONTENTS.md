# AURA Engineering Specification

# Master Table of Contents

## Repository Foundation

- README.md
- INDEX.md
- TABLE_OF_CONTENTS.md
- ARCHITECTURE_AUDIT_REPORT.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- SECURITY.md
- CHANGELOG.md
- LICENSE

## RFC Series

### Foundation and Core Architecture

- RFC-0000 — Project Charter
- RFC-0001 — Product Vision
- RFC-0002 — Product Discovery
- RFC-0003 — Business Architecture
- RFC-0004 — Domain Architecture
- RFC-0005 — System Architecture
- RFC-0006 — Data Architecture
- RFC-0007 — API Architecture
- RFC-0008 — Security Architecture
- RFC-0009 — Infrastructure Architecture
- RFC-0010 — Observability Architecture
- RFC-0011 — Testing Architecture
- RFC-0012 — Deployment & Release Architecture
- RFC-0013 — Financial Architecture
- RFC-0014 — Learning Platform Architecture
- RFC-0015 — Content Architecture
- RFC-0016 — Identity & Access Architecture
- RFC-0017 — Notification Architecture
- RFC-0018 — Analytics Architecture
- RFC-0019 — AI Architecture
- RFC-0020 — Disaster Recovery & Business Continuity

**RFC baseline:** 21 documents, RFC-0000 through RFC-0020.

## Standards

### Current Standards

- API_DESIGN_STANDARD.md
- ARCHITECTURE_PRINCIPLES.md
- BRANCHING_STRATEGY.md
- COMMIT_CONVENTION.md
- DATA_MODELING_STANDARD.md
- DEPENDENCY_POLICY.md
- DOCUMENTATION_STANDARD.md
- ERROR_HANDLING_STANDARD.md
- OBSERVABILITY_STANDARD.md
- RELEASE_PROCESS.md
- STYLE_GUIDE.md
- TESTING_STANDARD.md
- THREAT_MODELING_STANDARD.md

## Governance and Supporting Documents

- SECURITY.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- CHANGELOG.md

## Planned / Conditional Artifact Families

These are intentionally not represented by empty placeholder directories. They SHALL be introduced when their first authoritative artifact exists:

- ADRs — durable architectural decisions.
- Context Packs — bounded implementation knowledge.
- Prompt Packs — AI agent operating instructions.
- Schemas — stable machine-readable contracts.
- Diagrams — C4, ERD, sequence, deployment, and process views.
- Checklists — repeatable review/release gates.
- Templates — document and governance templates.

## Authority Model

1. RFCs define architectural requirements and invariants.
2. ADRs define durable decisions and trade-offs.
3. Standards define repeatable implementation rules.
4. Schemas define machine-readable contracts.
5. Context packs package authoritative knowledge.
6. Prompts define agent behavior without overriding authoritative architecture.
7. Diagrams clarify architecture without silently superseding textual requirements.

## Reading Order

```text
Repository Foundation
 -> RFCs in dependency order
 -> Relevant ADRs
 -> Relevant Standards
 -> Schemas / Diagrams / Context
 -> Implementation
 -> Tests
```

## Baseline Status

- RFC foundation: complete.
- Repository inventory: audited.
- Navigation: synchronized.
- Architecture audit: recorded in `ARCHITECTURE_AUDIT_REPORT.md`.
- Documentation metadata normalization: pending.
- Canonical dependency graph: pending.
- Implementation artifact families: conditional on implementation readiness.
