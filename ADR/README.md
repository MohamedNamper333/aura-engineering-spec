# Architecture Decision Records

## Purpose

ADR records capture decisions that constrain or materially shape implementation across AURA architecture boundaries.

## When an ADR is required

Create an ADR when a decision:

- Changes a system boundary.
- Introduces a new infrastructure technology with material operational impact.
- Changes a data ownership or consistency model.
- Changes authentication/authorization architecture.
- Changes financial transaction semantics.
- Introduces a significant external provider dependency.
- Creates a deliberate trade-off that future engineers must preserve.
- Resolves a conflict between architecture documents.

## When an ADR is not required

Do not create an ADR for routine implementation details that are already constrained by an RFC or Standard.

## Required Structure

```text
# ADR-NNNN — Decision Title

Status: Proposed | Accepted | Superseded | Rejected
Date: YYYY-MM-DD
Owners:
Related RFCs:

## Context
## Decision
## Alternatives Considered
## Consequences
## Security Impact
## Operational Impact
## Migration / Rollback
## References
```

## Rules

1. One ADR records one coherent decision.
2. ADRs SHALL explain why, not restate an entire RFC.
3. Superseded ADRs SHALL remain in history.
4. A superseding ADR SHALL explicitly reference the decision it replaces.
5. Accepted ADRs SHALL be reflected by affected implementation/specification documents.
