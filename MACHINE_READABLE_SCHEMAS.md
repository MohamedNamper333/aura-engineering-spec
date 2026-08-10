# AURA Machine-Readable Schemas

**Status:** Accepted  
**Version:** 1.0.0

## 1. Purpose

AURA architecture SHALL be represented in machine-readable contracts so implementation tooling and AI coding agents can validate behavior instead of relying exclusively on prose.

## 2. Required Schema Families

```text
schemas/
├── api/
│   └── openapi.yaml
├── events/
│   ├── envelope.schema.json
│   └── <event>.schema.json
├── database/
│   ├── schema.sql
│   └── migrations/
├── domain/
│   ├── errors.schema.json
│   └── state-machines.schema.json
└── ai/
    ├── tool-inputs.schema.json
    └── outputs/
```

## 3. API Schema

OpenAPI SHALL define endpoints, request/response models, security requirements, status codes, pagination, and reusable error models.

## 4. Event Schemas

Every production event SHALL have a versioned payload schema and common envelope definition. Fixtures SHALL exist for compatibility testing.

## 5. Database Schemas

The authoritative relational schema SHALL be represented through version-controlled migrations. Generated documentation MAY be derived from migrations but SHALL not become the only source of truth.

## 6. Domain State Machines

Critical state transitions SHALL be machine-verifiable where practical, especially payments, refunds, orders, entitlements, activation codes, and publishing workflows.

## 7. AI Schemas

Tool inputs and model outputs used by application code SHALL have explicit validation schemas. Free-form model output SHALL never be accepted as authoritative state without validation.

## 8. Compatibility

Schema changes SHALL be classified as additive, compatible, or breaking. Breaking changes require versioning or migration strategy.

## 9. Validation

CI SHALL validate schemas for syntax, references, compatibility where supported, and representative fixtures.

## 10. Completion Gate

This specification defines the required families. The repository becomes machine-schema-complete only when the actual `schemas/` artifacts exist and CI validates them.
