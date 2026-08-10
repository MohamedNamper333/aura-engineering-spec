# Repository Index

This file is the navigation map for the AURA Engineering Specification repository.

AURA is organized as a documentation-first engineering system. The repository is the architectural source of truth for the platform.

---

## Start Here

1. [README.md](README.md) — repository overview and entry point.
2. [INDEX.md](INDEX.md) — repository navigation and document authority.
3. [TABLE_OF_CONTENTS.md](TABLE_OF_CONTENTS.md) — ordered specification inventory.
4. [ARCHITECTURE_AUDIT_REPORT.md](ARCHITECTURE_AUDIT_REPORT.md) — latest repository audit and gap analysis.
5. [CONTRIBUTING.md](CONTRIBUTING.md) — contribution workflow and rules.
6. [SECURITY.md](SECURITY.md) — security reporting and workflows.
7. [CHANGELOG.md](CHANGELOG.md) — repository-level change history.

---

## Current Repository Baseline

- RFC series: **RFC-0000 through RFC-0020 complete**.
- Repository inventory: **46 files in the audited snapshot**.
- ADRs: **not yet instantiated**; create them only for actual durable architecture decisions.
- Context packs: planned for implementation phase.
- Prompt packs: planned for implementation phase.
- Schemas: introduce when stable machine-readable contracts exist.
- Diagrams: introduce where visual representation materially improves architectural understanding.
- Checklists/templates: introduce when the corresponding governance workflow becomes active.

The repository is **architecture-baseline ready but documentation-governance work remains**.

---

## RFC Series

RFCs define architectural requirements, boundaries, invariants, lifecycle rules, and system behavior.

| RFC | Area | Status |
|---|---|---|
| 0000 | Project Charter | Accepted |
| 0001 | Product Vision | Accepted |
| 0002 | Product Discovery | Accepted |
| 0003 | Business Architecture | Accepted |
| 0004 | Domain Architecture | Accepted |
| 0005 | System Architecture | Accepted |
| 0006 | Data Architecture | Accepted |
| 0007 | API Architecture | Accepted |
| 0008 | Security Architecture | Accepted |
| 0009 | Infrastructure Architecture | Accepted |
| 0010 | Observability Architecture | Accepted |
| 0011 | Testing Architecture | Accepted |
| 0012 | Deployment & Release Architecture | Accepted |
| 0013 | Financial Architecture | Accepted |
| 0014 | Learning Platform Architecture | Accepted |
| 0015 | Content Architecture | Accepted |
| 0016 | Identity & Access Architecture | Accepted |
| 0017 | Notification Architecture | Accepted |
| 0018 | Analytics Architecture | Accepted |
| 0019 | AI Architecture | Accepted |
| 0020 | Disaster Recovery & Business Continuity | Accepted |

### RFC Governance Note

RFC-0000 through RFC-0008 currently use structured YAML front matter. RFC-0009 through RFC-0020 use Markdown metadata. This inconsistency is a tracked remediation item and SHALL be normalized before declaring documentation governance complete.

---

## Standards

The repository currently contains standards covering:

- API design
- Architecture principles
- Branching
- Commit conventions
- Data modeling
- Dependencies
- Documentation
- Error handling
- Observability
- Release process
- Style
- Testing
- Threat modeling

Standards define repeatable implementation rules; they do not replace RFCs or ADRs.

---

## ADR Policy

ADRs capture durable decisions, rejected alternatives, trade-offs, and rationale.

No placeholder ADRs SHALL be created merely to populate a planned directory. ADRs SHALL be added when an actual architectural choice warrants an independent decision record.

---

## Planned Implementation Artifacts

### Context Packs

AI-ready bounded knowledge bundles derived from authoritative RFCs and standards.

### Prompt Packs

Operating instructions for coding agents. Prompts SHALL not override architecture invariants.

### Schemas

Machine-readable contracts for stable entities, events, APIs, and configuration.

### Diagrams

C4, ERD, sequence, deployment, and process diagrams where they materially improve comprehension.

### Checklists / Templates

Governance artifacts introduced when their corresponding workflow becomes active.

---

## Authority Rules

1. RFCs define architectural requirements and invariants.
2. ADRs explain durable choices and trade-offs.
3. Standards define repeatable implementation rules.
4. Schemas define machine-readable contracts.
5. Context packs package authoritative knowledge for bounded implementation tasks.
6. Prompts define agent operating behavior but cannot override RFCs, ADRs, or standards.
7. Diagrams explain structure visually but do not silently override textual authority.

---

## Implementation Reading Order

For a new feature:

```text
README
 -> INDEX
 -> Relevant RFCs
 -> Relevant ADRs
 -> Relevant Standards
 -> Schemas / Diagrams / Context Packs
 -> Implementation
 -> Tests
```

For an AI coding agent, the same dependency order applies. The agent SHALL resolve conflicts in favor of the highest-authority applicable document.

---

## Repository Structure

```text
aura-engineering-spec/
├── README.md
├── INDEX.md
├── TABLE_OF_CONTENTS.md
├── ARCHITECTURE_AUDIT_REPORT.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── LICENSE
├── RFC/
└── docs/
```

Additional artifact directories SHALL be introduced when their first authoritative artifact is ready rather than as empty placeholders.

---

## Next Engineering Gates

1. Normalize RFC metadata.
2. Establish the canonical RFC dependency map.
3. Record actual technology decisions as ADRs when selected.
4. Generate implementation context packs from the finalized architecture.
5. Add machine-readable schemas for stable contracts.
6. Add architecture diagrams for major boundaries.
7. Perform a pre-implementation consistency review before application code is introduced.
