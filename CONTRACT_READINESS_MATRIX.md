# AURA Contract Readiness Matrix

**Status:** Active Gate  
**Version:** 1.0.0

## Purpose

This matrix prevents the repository from declaring implementation readiness while prose contracts, machine-readable schemas, fixtures, and validation gates are out of sync.

| Contract Layer | Source of Truth | Machine Artifact | Validation | Current Gate |
|---|---|---|---|---|
| API | API_CONTRACTS.md + OpenAPI | `schemas/api/openapi.yaml` | OpenAPI lint + contract tests | Partial |
| Events | EVENT_CONTRACTS.md | `schemas/events/*.json` | JSON Schema + fixture tests | Partial |
| Domain | DATABASE_ARCHITECTURE.md | `schemas/domain/*.json` | JSON Schema + model tests | Partial |
| Database | DATABASE_ARCHITECTURE.md | SQL/migrations | Migration + integrity tests | Partial |
| AI | AI_IMPLEMENTATION_SPEC.md | `schemas/ai/*.json` | Schema + evaluation fixtures | Partial |
| Security | SECURITY_IMPLEMENTATION_SPEC.md | Security controls/config | Automated security tests | Partial |

## Required Completion Criteria

A layer becomes **Complete** only when all five conditions are true:

1. Normative specification exists.
2. Machine-readable contract exists where applicable.
3. Positive and negative fixtures exist.
4. Automated validation executes in CI.
5. Compatibility/versioning policy is enforced.

## Prohibited Status Claims

The repository SHALL NOT claim `Implementation-Ready` if a critical layer remains Partial.

## Critical Domains

Commerce, payment, entitlement, identity, authentication, authorization, and learning completion are critical. Their contracts require negative-path tests, concurrency tests where applicable, and auditability.

## Final Gate

The final readiness audit SHALL calculate readiness from this matrix rather than from document count.
