# AURA Contract Test Matrix

**Status:** Active

## Objective

Every machine-readable contract must have executable positive and negative coverage before the contract layer is considered implementation-ready.

| Contract | Positive | Negative | Compatibility | Runtime integration |
|---|---:|---:|---:|---:|
| OpenAPI | required | required | required | required |
| Domain JSON Schema | required | required | required | required |
| Event envelope | required | required | required | required |
| Financial events | required | required | required | required |
| Learning events | required | required | required | required |
| AI output | required | required | required | required |
| Database migrations | migration test | constraint test | required | required |

## Positive Tests

Positive fixtures SHALL prove that representative valid payloads are accepted.

## Negative Tests

Negative fixtures SHALL prove rejection of missing required fields, invalid enums, invalid formats, impossible values, and forbidden additional properties where the schema declares them.

## Compatibility

A backward-compatible change MAY add optional fields or widen explicitly documented constraints. Removing required fields, changing types, tightening accepted values, or changing event identity semantics is breaking unless versioned.

## Runtime Contract Tests

At implementation time, generated or hand-written tests SHALL verify that actual HTTP responses and emitted events conform to the committed schemas.

## Financial Safety

Payment and refund contracts require exact integer minor-unit amounts and currency validation. Floating-point monetary values are prohibited.

## Event Safety

Consumers must accept each supported event version and reject unknown incompatible versions deterministically.

## Merge Gate

A contract change SHALL NOT merge when any positive, negative, compatibility, or runtime contract test fails.
