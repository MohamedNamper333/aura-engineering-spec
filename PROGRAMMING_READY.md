# AURA Programming-Ready Baseline

**Status:** Ready for application implementation
**Scope:** Engineering specification and contract baseline only
**Branch:** `bootstrap/aura-engineering-spec`

## Definition of Done

The repository is programming-ready when the implementation team can build the first runtime without inventing domain boundaries, API routes, event names, database migration order, or core reliability rules.

### Locked contracts

- API routes and operation IDs are enumerated in `schemas/api/api-coverage-manifest.json`.
- HTTP request/response shapes are defined in `schemas/api/openapi.yaml`.
- The event catalog contains 26 production event types.
- Event envelope, delivery, ordering, transactional-outbox, replay, poison-message, security, and compatibility rules are defined in `EVENT_CONTRACTS.md`.
- Event registry contains owner, producer, consumers, version, compatibility policy, schema reference, and fixture reference.
- A canonical machine-readable event schema exists at `schemas/events/event-catalog.schema.json`.
- A canonical fixture catalog exists at `schemas/events/fixtures/event-fixtures.json`.
- Database migration order is explicit in `schemas/database/migration-manifest.json`.
- PostgreSQL migrations cover core, learning, content, activation codes, security/audit, and idempotency foundations.
- CI executes JSON validation, readiness validation, OpenAPI linting, and migration-reference checks.

## Runtime implementation order

1. Database adapter and migration runner.
2. Domain modules: identity, commerce, entitlement, learning, content, security.
3. HTTP API layer from OpenAPI.
4. Transactional outbox writer.
5. Event publisher and idempotent consumers.
6. Authentication and authorization middleware.
7. Payment provider adapters and webhook verification.
8. Contract, integration, and end-to-end tests.
9. Observability and operational controls.
10. Deployment and backup/restore automation.

## Explicit non-claims

Programming-ready does **not** mean production-ready. This repository does not claim that runtime services, payment-provider integrations, infrastructure, load tests, disaster recovery, or end-to-end tests already exist.

No implementation may silently change a locked contract. Contract changes require a versioned review and corresponding schema/fixture/test updates.
