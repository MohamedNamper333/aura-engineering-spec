# Schema Validation Policy

**Status:** Accepted

## Purpose

Machine-readable contracts are release gates, not optional documentation.

## Required Checks

Every change touching `schemas/` SHALL pass:

1. JSON parsing for every JSON schema.
2. OpenAPI linting.
3. Required schema-directory checks.
4. Contract review when an API/event/domain contract changes.

## Failure Policy

A failing schema validation job SHALL block merge for protected branches.

Validation failures SHALL be fixed at the contract source. CI configuration SHALL not be weakened merely to make an invalid schema pass.

## Evolution

Breaking API or event changes require an explicit versioning decision and associated compatibility review.

## Scope

This policy validates syntax and baseline contract integrity. It does not prove runtime business correctness; unit, integration, contract, security, and end-to-end tests remain required.
