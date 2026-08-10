---
document_id: RFC-0007
title: AURA API Architecture
status: Accepted
version: 1.0.0
category: API Architecture
priority: Critical
risk_level: Critical
owner: AURA API Architecture Team
authors:
  - AURA API Architecture Team
reviewers:
  - AURA System Architecture Team
  - AURA Security Team
  - AURA Data Architecture Team
approvers:
  - Repository Maintainers
created: 2026-08-10
updated: 2026-08-10
related_documents:
  - RFC/RFC-0004-DOMAIN-ARCHITECTURE.md
  - RFC/RFC-0005-SYSTEM-ARCHITECTURE.md
  - RFC/RFC-0006-DATA-ARCHITECTURE.md
  - API_DESIGN_STANDARD.md
  - ERROR_HANDLING_STANDARD.md
  - SECURITY.md
  - OBSERVABILITY_STANDARD.md
related_rfcs:
  - RFC-0004
  - RFC-0005
  - RFC-0006
related_adrs: []
dependencies:
  - RFC-0005
  - RFC-0006
supersedes: null
superseded_by: null
tags:
  - api
  - http
  - rest
  - contracts
  - security
  - versioning
---

# AURA API Architecture

## 1. Executive Summary

This RFC defines the external and internal application API architecture for AURA.

The API is a controlled boundary between clients, integrations, and the application's business capabilities. It SHALL expose explicit contracts while preventing transport concerns from leaking into domain logic.

The initial external API SHOULD use HTTPS and resource-oriented HTTP semantics. REST-style APIs are preferred for public application operations unless a specific use case justifies another protocol.

## 2. API Goals

The API SHALL provide:

1. Stable and explicit contracts.
2. Strong authentication and authorization.
3. Deterministic business operations.
4. Consistent error semantics.
5. Safe retries for state-changing operations.
6. Predictable pagination and filtering.
7. Backward-compatible evolution where practical.
8. Traceability and auditability.
9. Provider-neutral domain behavior.
10. Protection against abuse and accidental overload.

## 3. API Boundaries

The architecture distinguishes:

```text
Client API
  -> Application API
      -> Domain Modules
          -> Infrastructure Adapters
```

Controllers/handlers SHALL translate transport requests into application commands or queries.

Domain entities SHALL not depend on HTTP, JSON, headers, cookies, or framework-specific request objects.

## 4. Transport

The default external transport is HTTPS.

Minimum requirements:

- TLS for all production API traffic.
- Secure HTTP headers where applicable.
- Explicit content types.
- Request size limits.
- Timeout controls.
- Authentication on protected endpoints.

HTTP status codes SHALL reflect broad protocol semantics, while the response body SHALL provide an application error code for deterministic client handling.

## 5. Resource Naming

Resource paths SHALL use stable nouns rather than action-heavy URLs where practical.

Preferred:

```text
GET    /api/v1/courses
GET    /api/v1/courses/{courseId}
POST   /api/v1/orders
GET    /api/v1/orders/{orderId}
```

Avoid exposing internal database table names.

Action endpoints MAY exist when the operation is a domain command that cannot be represented clearly as ordinary CRUD semantics, for example:

```text
POST /api/v1/activation-codes/{codeId}/redeem
POST /api/v1/orders/{orderId}/cancel
```

## 6. Versioning

Public API contracts SHALL be versioned.

The initial major version SHALL use an explicit path such as:

```text
/api/v1/...
```

Breaking changes SHALL require a new major API version or an explicitly approved migration strategy.

Additive, backward-compatible changes MAY be introduced within the same major version when clients can safely ignore the new data.

## 7. Request Validation

Every externally supplied value SHALL be treated as untrusted.

Validation SHALL cover:

- Type.
- Format.
- Length.
- Range.
- Enumeration.
- Cross-field constraints where applicable.
- Authorization scope.

Validation SHALL occur before domain execution.

Client-side validation MAY improve UX but SHALL never replace server-side validation.

## 8. Authentication

Authentication SHALL establish the identity of the caller.

The API MAY support session-based or token-based mechanisms depending on client type, but the chosen mechanism SHALL be documented and secured against:

- Credential theft.
- Token replay.
- Session fixation.
- Brute-force attempts.
- Unauthorized persistence.

Authentication credentials and secrets SHALL never be returned in ordinary API responses.

## 9. Authorization

Authorization SHALL be enforced for every protected resource and operation.

The API SHALL distinguish:

```text
Identity
Role
Permission
Resource ownership
Entitlement
```

A role check alone is insufficient when access depends on ownership or purchased entitlement.

Authorization failures SHALL not reveal sensitive information about resources the caller is not permitted to discover.

## 10. Entitlement-Aware APIs

Paid learning APIs SHALL validate entitlement server-side.

Example:

```text
GET /api/v1/courses/{courseId}/lectures/{lectureId}
```

The API SHALL determine whether the authenticated student is authorized to access the requested lecture.

The client SHALL not be trusted to provide a flag such as `hasAccess=true`.

## 11. Request and Response Contracts

API contracts SHALL use explicit schemas.

Responses SHOULD have stable envelopes where doing so improves consistency.

Example success shape:

```json
{
  "data": {},
  "meta": {}
}
```

Example error shape:

```json
{
  "error": {
    "code": "ORDER_NOT_PAYABLE",
    "message": "The order cannot be paid in its current state.",
    "requestId": "..."
  }
}
```

Error messages SHALL be safe for the caller and SHALL not expose stack traces, secrets, SQL, provider credentials, or internal infrastructure details.

## 12. Error Taxonomy

The API SHALL distinguish at minimum:

- `VALIDATION_ERROR`
- `AUTHENTICATION_REQUIRED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `RATE_LIMITED`
- `UNPROCESSABLE_OPERATION`
- `DEPENDENCY_UNAVAILABLE`
- `TIMEOUT`
- `INTERNAL_ERROR`

Domain-specific error codes MAY extend this taxonomy.

Clients SHALL use stable error codes rather than parsing human-readable messages.

## 13. Idempotency

State-changing endpoints whose duplicate execution could cause financial, entitlement, or other material side effects SHALL support idempotency.

Example:

```http
Idempotency-Key: <client-generated-stable-key>
```

The server SHALL bind the key to an operation scope and return the original outcome when the same valid operation is retried according to the retention policy.

A different request payload using an already-consumed idempotency key SHALL be rejected rather than silently executing a different operation.

## 14. Pagination

Collection endpoints SHALL use bounded pagination.

The API SHOULD prefer cursor-based pagination for large or frequently changing datasets.

Where offset pagination is used, the endpoint SHALL define deterministic ordering.

Example:

```text
GET /api/v1/courses?limit=20&cursor=...
```

The server SHALL enforce maximum page sizes regardless of client input.

## 15. Filtering, Sorting, and Search

Filtering parameters SHALL be explicitly documented and validated.

Clients SHALL NOT be allowed to submit arbitrary SQL-like expressions or uncontrolled field names.

Sort fields SHALL come from an allowlist.

Search endpoints SHALL define:

- Searchable fields.
- Normalization rules.
- Maximum query size.
- Pagination behavior.
- Authorization scope.

## 16. Concurrency Control

Resources susceptible to concurrent modification SHOULD expose a version or equivalent concurrency mechanism where required.

The API MAY use ETags or application-level version fields.

Conflicting updates SHALL return a deterministic conflict response rather than silently overwriting another actor's change.

## 17. Rate Limiting

Rate limits SHALL be applied according to operation risk and resource cost.

Higher protection SHOULD apply to:

- Authentication.
- Password reset.
- Activation-code redemption.
- Payment initiation.
- Refund operations.
- Administrative endpoints.
- Expensive search or export operations.

Rate limiting SHALL not be the only abuse-control mechanism.

## 18. File and Content Uploads

Uploads SHALL be treated as untrusted input.

The API SHALL enforce:

- Maximum size.
- Allowed media types.
- Filename normalization.
- Malware/security scanning where appropriate.
- Storage isolation.
- Authorization checks.

User-controlled filenames SHALL not become executable paths.

Large uploads SHOULD use object storage with controlled upload grants rather than routing large binary payloads through the main application when operationally justified.

## 19. Webhooks

Inbound provider webhooks SHALL:

1. Authenticate or cryptographically verify the sender where supported.
2. Validate the event structure.
3. Persist the provider event/reference.
4. Be idempotently processed.
5. Return an appropriate acknowledgment.
6. Defer expensive processing to background jobs where appropriate.

A webhook SHALL not grant entitlement merely because its payload appears syntactically valid.

## 20. External Provider Integration

Provider-specific APIs SHALL be isolated behind infrastructure adapters.

The public API SHALL expose AURA's domain semantics rather than provider terminology.

For example, clients should reason about:

```text
Payment
Payment Status
Refund
```

rather than a provider-specific object model.

## 21. API and Financial Operations

Financial APIs SHALL be designed for retries, ambiguous outcomes, and reconciliation.

A request timeout SHALL NOT automatically mean a financial operation failed.

The API SHALL expose a safe way to query authoritative operation status.

Clients SHALL not create a second financial operation merely because the first response timed out without first checking the original operation state.

## 22. API and Learning Progress

Progress endpoints SHALL be idempotent where repeated progress updates can occur.

The API SHALL validate that:

- The student owns the learning session.
- The lecture belongs to the course.
- The course is accessible.
- Progress values are within valid bounds.
- Completion state follows the defined learning rules.

The client SHALL not be able to mark arbitrary content as completed without server-side validation.

## 23. API Security

The API SHALL follow the repository security and threat-modeling standards.

At minimum:

- TLS.
- Input validation.
- Output encoding where relevant.
- Authentication controls.
- Authorization checks.
- Rate limiting.
- Secure secret handling.
- Audit logging for sensitive operations.
- Security headers where applicable.
- Protection against injection attacks.
- Protection against insecure direct object references.

Sensitive values SHALL not appear in ordinary logs.

## 24. Observability

Every API request SHOULD carry or receive a correlation/request identifier.

Telemetry SHOULD include:

- Route.
- Method.
- Status.
- Latency.
- Request ID.
- Actor class where safe.
- Error code.
- Dependency outcome where relevant.

Raw authentication tokens, passwords, payment secrets, and sensitive payloads SHALL not be logged.

## 25. Compatibility and Deprecation

Deprecated endpoints SHALL have:

- A documented replacement.
- A deprecation date or policy.
- Migration guidance.
- Monitoring of remaining usage.
- A removal decision.

Breaking changes SHALL not be silently introduced into a supported API version.

## 26. API Documentation

Every public API operation SHALL have machine-readable and human-readable documentation.

The preferred contract format is OpenAPI or an equivalent formal specification.

Documentation SHALL define:

- Request schema.
- Response schema.
- Authentication.
- Authorization.
- Errors.
- Idempotency requirements.
- Pagination.
- Rate limits where relevant.
- Examples for non-obvious workflows.

## 27. Internal APIs

Internal module interfaces SHALL not automatically become public HTTP APIs.

Within the modular monolith, module-to-module communication SHOULD use typed application contracts or direct in-process interfaces rather than HTTP unless isolation requirements justify transport boundaries.

## 28. API Performance

Endpoints SHALL have explicit expectations for:

- Maximum payload size.
- Query complexity.
- Timeout.
- Pagination limits.
- External dependency behavior.

Performance optimization SHALL not bypass authorization or correctness checks.

Expensive operations SHOULD be asynchronous and expose an operation status resource where appropriate.

## 29. API Failure Semantics

The API SHALL distinguish:

```text
Client Error
Domain Rejection
Dependency Failure
Timeout
Unknown Outcome
```

Unknown outcome SHALL be represented as unknown when the authoritative state cannot yet be determined.

The API SHALL not return `success` merely because the request was accepted for asynchronous processing unless the contract explicitly defines acceptance as the operation's success state.

## 30. Prohibited API Anti-Patterns

The following are prohibited unless explicitly approved:

- Returning ORM/database entities directly as public contracts.
- Trusting client-provided authorization flags.
- Using HTTP 200 for every failure state.
- Leaking stack traces or SQL errors.
- Unbounded collection endpoints.
- State-changing operations without idempotency where duplicates are harmful.
- Provider-specific objects exposed as core domain contracts.
- Authentication secrets in URLs.
- Sensitive information in logs.
- Silent breaking changes.
- Controllers containing substantial domain business logic.

## 31. Definition of Done

API Architecture is complete when:

- API boundaries are defined.
- Versioning is explicit.
- Authentication and authorization semantics are defined.
- Request validation is mandatory.
- Error taxonomy is standardized.
- Idempotency rules are explicit.
- Pagination and filtering are bounded.
- Rate limiting strategy exists.
- Webhook security and processing are defined.
- Financial API failure semantics are defined.
- Content and entitlement checks are defined.
- Documentation requirements are explicit.
- Observability requirements are defined.

## 32. Relationship to Later RFCs

This RFC establishes API-level architecture. Concrete endpoint catalogs, OpenAPI schemas, authentication implementation details, payment provider contracts, and domain-specific APIs SHALL be defined in later implementation specifications while preserving these constraints.
