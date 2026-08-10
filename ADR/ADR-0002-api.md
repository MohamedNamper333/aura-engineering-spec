# ADR-0002 — Modular HTTP API Architecture

**Status:** Accepted  
**Date:** 2026-08-10  
**Decision Owner:** Architecture Governance

## Context

AURA needs a stable client-facing contract while allowing internal domain services and persistence to evolve independently.

## Decision

Use a versioned HTTP API as the initial application boundary, organized around domain capabilities rather than database tables. The public baseline is `/api/v1`.

Handlers/controllers SHALL translate transport concerns into application/domain commands and SHALL NOT own business invariants.

## Rationale

This preserves a stable contract for web/mobile clients, isolates transport from domain logic, and aligns directly with `API_CONTRACTS.md` and the Dependency Graph.

## Consequences

- OpenAPI becomes the machine-readable contract gate.
- API versioning must be managed deliberately.
- Domain/application services become the reusable business boundary.
- Internal implementation may evolve without exposing persistence structure.

## Alternatives Rejected

- Direct database-backed endpoints: leaks persistence and duplicates business rules.
- Unversioned public API: makes incompatible evolution unsafe.
- GraphQL as the initial external boundary: not required for the current domain and adds schema/resolver complexity before demand is demonstrated.

## Constraints

Every protected operation SHALL perform server-side authorization. Mutations with retry risk SHALL implement idempotency.

## Reconsideration Trigger

Reconsider the transport architecture only if measured client/query requirements justify a second API paradigm or materially different integration model.
