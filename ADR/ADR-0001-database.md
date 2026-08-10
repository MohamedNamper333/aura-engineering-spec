# ADR-0001 — PostgreSQL as Transactional Database

**Status:** Accepted  
**Date:** 2026-08-10  
**Decision Owner:** Architecture Governance

## Context

AURA requires transactional integrity across commerce, payments, entitlements, identity, and learning state. The system also requires relational constraints, indexing, migrations, auditing, and predictable concurrency behavior.

## Decision

Use **PostgreSQL** as the authoritative transactional relational database for the initial AURA implementation.

## Rationale

PostgreSQL provides strong transactional guarantees, foreign keys, unique constraints, mature indexing, JSON support where justified, migration tooling, and a broad operational ecosystem. These capabilities align with the invariants defined by `DATABASE_ARCHITECTURE.md`.

## Consequences

### Positive

- Strong relational integrity.
- Mature transaction and concurrency controls.
- Suitable for financial and entitlement state.
- Mature backup and recovery tooling.

### Negative

- Requires disciplined schema/migration management.
- Horizontal write scaling is more complex than adding stateless application instances.
- Operational backups and upgrades become a critical responsibility.

## Alternatives Rejected

- Document-only database: insufficient relational enforcement for core transactional invariants.
- SQLite as production authority: inappropriate for the expected multi-instance production workload.
- Multiple transactional databases initially: unnecessary operational and consistency complexity.

## Constraints

PostgreSQL SHALL remain the source of truth for transactional state. Redis, search indexes, analytics stores, and caches SHALL NOT replace it as the authority for core business state.

## Reconsideration Trigger

Reconsider only when measured scale, workload characteristics, availability requirements, or domain partitioning justify a different transactional topology.
