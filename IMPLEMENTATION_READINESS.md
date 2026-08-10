# AURA Implementation Readiness

**Status:** Specification-complete baseline in progress  
**Branch:** `bootstrap/aura-engineering-spec`

## Purpose

This repository is the engineering specification and contract source for AURA. It is not declared production-ready until every gate below is demonstrably satisfied.

## Completion Gates

### G1 — Architecture
- [x] Domain boundaries documented.
- [x] Governance and ADR baseline documented.
- [x] Security principles documented.

### G2 — API
- [x] API contract exists.
- [x] OpenAPI baseline exists.
- [x] Coverage manifest exists.
- [ ] Every declared operation has runtime implementation.
- [ ] Request/response contract tests pass.

### G3 — Events
- [x] Event contract baseline exists.
- [x] Authoritative event catalog contains 26 production events.
- [x] Registry structure requires owner, producer, consumers, compatibility and fixture.
- [ ] All 26 schemas exist and validate the envelope/payload.
- [ ] All required positive/negative fixtures exist.
- [ ] Consumer matrices and idempotency rules are complete.

### G4 — Database
- [x] Database architecture baseline exists.
- [x] Initial core migration exists.
- [ ] Full migration chain covers every authoritative aggregate.
- [ ] Migration validation and rollback/forward-only policy are tested.

### G5 — Security
- [x] Security baseline exists.
- [ ] Authentication/authorization runtime tests exist.
- [ ] Webhook authenticity and replay tests exist.
- [ ] Audit and privileged-action tests exist.

### G6 — Financial Safety
- [ ] Monetary values are integer minor units everywhere.
- [ ] Idempotency invariants are tested.
- [ ] Payment/refund reconciliation invariants are tested.
- [ ] Entitlement cannot be granted before authoritative payment criteria.

### G7 — CI
- [x] Structural contract gate exists.
- [ ] Cross-document coverage validation is complete.
- [ ] Schema/fixture validation is complete.
- [ ] CI proves all critical gates before merge.

### G8 — Runtime
- [ ] API service exists.
- [ ] Workers/outbox publisher exist.
- [ ] Database integration exists.
- [ ] Observability exists.
- [ ] Integration and end-to-end tests exist.

## Non-Negotiable Rule

A checked documentation item is not evidence of runtime implementation. Production readiness requires executable evidence from tests, migrations, and CI.

## Exit Condition

The repository may be labelled **Implementation Ready** only when G1–G7 are green and the runtime foundation in G8 has an approved implementation plan. It may be labelled **Production Ready** only after G8 runtime, security, financial, performance, backup/restore and operational tests pass.
