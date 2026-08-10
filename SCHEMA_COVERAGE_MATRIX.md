# Machine-Readable Schema Coverage Matrix

**Status:** Accepted

| Contract Family | Baseline Spec | Machine Artifact | Coverage | Gate |
|---|---|---|---:|---|
| HTTP API | API_CONTRACTS.md | schemas/api/openapi.yaml | Partial | Expand to all declared endpoints |
| Domain entities | DATABASE_ARCHITECTURE.md | schemas/domain/entities.schema.json | Partial | Add remaining bounded contexts |
| Events | EVENT_CONTRACTS.md | schemas/events/*.schema.json | Partial | Add every production event |
| AI output | AI_IMPLEMENTATION_SPEC.md | schemas/ai/model-output.schema.json | Baseline | Add task-specific schemas |
| Database | DATABASE_ARCHITECTURE.md | schemas/database/core-schema.sql | Partial | Complete physical schema + migrations |

## Rules

1. A Markdown contract SHALL NOT be considered machine-complete until its declared production surface has a corresponding machine-readable artifact.
2. Every machine-readable artifact SHALL identify its owning specification.
3. Schema changes SHALL be reviewed for backward compatibility.
4. CI SHALL eventually validate OpenAPI and JSON Schema syntax automatically.
5. Production event schemas SHALL have fixtures and compatibility tests.
6. Database migrations SHALL be validated against the authoritative data model.

## Current Gate

The repository is **machine-contract baseline ready**, but not yet machine-contract complete. The remaining work is coverage expansion and automated validation, not architectural redesign.
