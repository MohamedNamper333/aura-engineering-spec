# Repository Index

This file is the navigation map for the AURA Engineering Specification repository.

AURA is organized as a documentation-first engineering system. Each file or folder in this repository has a specific responsibility and should be treated as part of the single source of truth for the platform.

---

## Start Here

1. [README.md](README.md) — repository overview, purpose, and entry point.
2. [TABLE_OF_CONTENTS.md](TABLE_OF_CONTENTS.md) — complete ordered list of specification documents.
3. [CONTRIBUTING.md](CONTRIBUTING.md) — contribution workflow and rules.
4. [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — expected collaboration behavior.
5. [SECURITY.md](SECURITY.md) — security reporting and security-related workflows.
6. [CHANGELOG.md](CHANGELOG.md) — repository-level change history.

---

## Core Specification Areas

### RFC
Request For Comments documents define the system architecture, domain rules, business rules, and implementation-level decisions.

Planned RFC areas:
- Product charter
- Product vision and strategy
- Product discovery and scope
- Business architecture
- Domain model
- Database architecture
- ERD
- Backend architecture
- Frontend architecture
- API architecture
- Authentication and authorization
- Security architecture
- Financial system
- AI system
- Notification system
- Search and discovery system
- Infrastructure and DevOps
- Observability and analytics
- High availability and disaster recovery
- Governance and engineering standards

### ADR
Architecture Decision Records capture durable architectural decisions, rejected alternatives, trade-offs, and rationale.

Planned ADR areas:
- Core technology choices
- Architecture style
- Database selection
- API strategy
- AI integration strategy
- Deployment strategy
- Security decisions
- Multi-tenancy decisions
- Financial workflow decisions
- Media and storage decisions

### Standards
Engineering standards define the rules that all implementations must follow.

Planned standards:
- Coding standards
- Naming conventions
- Folder and repository structure
- Testing standards
- Logging standards
- Security standards
- API standards
- UI standards
- Documentation standards

### Context Packs
Context packs are AI-ready knowledge bundles for specific implementation domains.

Planned context packs:
- Backend context
- Frontend context
- Database context
- Finance context
- AI context
- Security context
- DevOps context
- Testing context

### Prompts
Prompt packs define how AI agents should use this repository when generating or modifying code.

Planned prompt packs:
- Master implementation prompt
- Backend prompt
- Frontend prompt
- Database prompt
- AI prompt
- DevOps prompt
- Testing prompt
- Security prompt

### Schemas
Machine-readable schemas provide structured definitions for entities, events, APIs, and configuration.

Planned schemas:
- Entity schemas
- Event schemas
- API schemas
- Configuration schemas
- Documentation metadata schemas

### Diagrams
Architecture diagrams provide visual structure for the platform.

Planned diagrams:
- C4 context diagram
- C4 container diagram
- C4 component diagrams
- ERD diagrams
- Sequence diagrams
- Deployment diagrams
- BPMN diagrams

### Checklists
Checklists define validation steps for architecture, implementation, and release readiness.

Planned checklists:
- Architecture review checklist
- Security review checklist
- Release checklist
- Testing checklist
- AI prompt review checklist
- Documentation completeness checklist

### Templates
Templates standardize how new documents are created.

Planned templates:
- RFC template
- ADR template
- Architecture spec template
- API spec template
- Checklist template
- Prompt template

---

## Repository Structure

```text
aura-engineering-spec/
├── README.md
├── INDEX.md
├── TABLE_OF_CONTENTS.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── RFC/
├── ADR/
├── STANDARDS/
├── CONTEXT/
├── PROMPTS/
├── SCHEMAS/
├── DIAGRAMS/
├── CHECKLISTS/
└── TEMPLATES/
```

---

## Current Status

- Repository foundation: in progress
- Documentation framework: in progress
- Core architecture documents: planned
- AI prompt system: planned
- Machine-readable schemas: planned

---

## How to Use This Repository

### If you are a human engineer
Start with the README, then move to the RFCs in order, and use ADRs to understand why decisions were made.

### If you are an AI coding agent
Read the README, this index, the relevant RFCs, the applicable ADRs, and the relevant standards before producing or modifying code.

### If you are implementing a feature
Read the product and domain RFCs first, then the technical RFCs, then the matching standards and ADRs.

---

## Navigation Rules

1. Documentation must be read in dependency order.
2. RFCs define what the system must do.
3. ADRs define why decisions were made.
4. Standards define how implementation must behave.
5. Context packs define what an AI agent needs to know for a task.
6. Schemas define the machine-readable contract for structured data.
7. Diagrams clarify the architecture visually.

---

## Next Milestones

1. Finalize the repository foundation documents.
2. Add the RFC template.
3. Add the ADR template.
4. Add the standards framework.
5. Begin RFC-0000: Project Charter.

---

## Notes

This repository is intentionally documentation-first.

No implementation code should be added until the relevant architecture, domain, and engineering rules are defined here.
