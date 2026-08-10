# AURA Contract Gate Specification

**Status:** Accepted

## Objective

Prevent contract drift from reaching the default branch.

## Required Gates

1. Every JSON contract parses successfully.
2. OpenAPI passes structural linting.
3. Required contract registries and fixture directories exist.
4. Fixtures are valid JSON.
5. Event registry references existing event schemas.
6. API coverage manifest references the authoritative API contract and OpenAPI document.
7. Negative fixtures MUST fail their referenced schema validation.
8. Positive fixtures MUST pass their referenced schema validation.
9. Incompatible schema changes require an explicit version change or approved compatibility exception.

## Merge Policy

A failed contract gate blocks merge. Manual approval SHALL NOT bypass a broken schema unless an explicit emergency exception is recorded with scope, owner, expiry, and rollback plan.

## Current Scope

The repository currently enforces structural and document-level gates in GitHub Actions. Runtime validation and full cross-document coverage verification are separate completion items and SHALL NOT be represented as complete until executable tests implement them.
