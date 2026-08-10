# Schema Validation Policy

**Status:** Accepted

## Purpose

Machine-readable contracts are release gates, not optional documentation.

## Required Checks

Every change touching `schemas/` SHALL pass:

1. JSON parsing for every JSON schema.
2. OpenAPI linting.
3. Local `$ref` resolution.
4. Required schema-directory checks.
5. API/event coverage validation against the authoritative contract catalogs.
6. Compatibility review for API and event changes.
7. Contract fixture validation for critical flows when affected.

## Failure Policy

A failing schema or contract validation job SHALL block merge for protected branches.

Validation failures SHALL be fixed at the contract source. CI configuration SHALL not be weakened merely to make an invalid schema pass.

## Evolution

Breaking API or event changes require an explicit versioning decision and associated compatibility review. Database changes SHALL follow the migration and expand-and-contract policy.

## Scope

Static validation does not prove runtime business correctness. Unit, integration, contract, security, performance, and end-to-end tests remain required.
