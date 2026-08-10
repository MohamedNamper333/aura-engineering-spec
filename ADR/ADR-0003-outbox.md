# ADR-0003 — Transactional Outbox for Domain Events

**Status:** Accepted  
**Date:** 2026-08-10  
**Decision Owner:** Architecture Governance

## Context

AURA must publish reliable domain events after transactional changes such as payment confirmation, entitlement grants, refunds, and learning completion. A direct database-plus-broker transaction would introduce distributed transaction complexity.

## Decision

Use a transactional outbox record written in the same database transaction as the authoritative state change. A publisher asynchronously delivers committed outbox records to the event transport.

## Rationale

This prevents the failure mode where database state commits but the corresponding event is lost, while avoiding a distributed transaction between the database and broker.

## Consequences

- Outbox records require lifecycle management and retry handling.
- Consumers must be idempotent because delivery is at least once.
- Monitoring must detect publication lag and poison messages.

## Alternatives Rejected

- Direct synchronous broker publish inside the business transaction.
- Distributed two-phase transaction between database and broker.
- Best-effort event emission without durable persistence.

## Constraints

Events represent committed facts, not commands. Event consumers SHALL NOT treat delivery order as globally guaranteed.

## Reconsideration Trigger

Reconsider only if the event volume, latency requirements, or infrastructure constraints demonstrate that the outbox architecture is no longer appropriate.
