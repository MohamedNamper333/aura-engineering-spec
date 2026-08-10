# Contract Testing Standard

**Status:** Accepted  
**Version:** 1.0.0

## Purpose

Prevent drift between authoritative specifications and machine-readable contracts, and prevent backward-incompatible API/event changes from being merged silently.

## Gates

1. OpenAPI MUST parse successfully.
2. Every JSON Schema MUST parse successfully.
3. All local `$ref` targets MUST resolve.
4. Every production API operation declared by `API_CONTRACTS.md` MUST have an OpenAPI operation or an explicit documented exception.
5. Every production event declared by `EVENT_CONTRACTS.md` MUST have a registered schema and registry entry.
6. Event consumers MUST be idempotent and version-aware.
7. Breaking changes MUST require an explicit version change and ADR/approval where architectural impact exists.
8. Database migration changes MUST preserve declared domain invariants.

## Compatibility

### HTTP API

Compatible changes include additive optional response fields and new endpoints. Removing fields, changing required request fields, changing field meaning, or changing response semantics is breaking.

### Events

Adding optional payload fields is compatible. Removing fields, changing field types, changing required fields, or changing event meaning is breaking and requires a new event version.

### Database

Expand-and-contract is the default strategy for changes affecting deployed application versions. Destructive changes require proof that no supported release depends on the removed structure.

## Test Layers

```text
Static schema validation
        ↓
Reference resolution
        ↓
Contract fixture validation
        ↓
Consumer compatibility
        ↓
Integration contract tests
        ↓
End-to-end critical flows
```

## Merge Policy

A failed contract gate SHALL block merge. Exceptions require an explicit, time-bounded waiver recorded in the repository.
