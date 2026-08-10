# AURA API Contracts

**Status:** Accepted  
**Version:** 1.0.0  
**Owner:** Architecture Governance  
**Scope:** External application API baseline

## 1. Purpose

Define the provider-neutral HTTP API contract rules required before implementation. This document establishes resource boundaries, error semantics, authentication, idempotency, pagination, versioning, and critical endpoint behavior.

## 2. API Principles

1. APIs SHALL expose domain capabilities, not database tables.
2. Authorization SHALL be evaluated server-side for every protected operation.
3. Clients SHALL never be trusted to assert payment, entitlement, role, or completion state.
4. Mutating operations with retry risk SHALL define idempotency semantics.
5. Errors SHALL use a stable machine-readable schema.
6. API contracts SHALL be versioned independently from implementation internals.
7. Sensitive fields SHALL never be returned unless explicitly required.

## 3. Versioning

The initial public API SHALL use a major version prefix:

```text
/api/v1/...
```

Breaking changes require a new major version. Additive, backward-compatible fields MAY be introduced within a major version.

## 4. Authentication

Protected endpoints SHALL require an authenticated identity. Authentication mechanism is implementation-specific but SHALL provide a server-verifiable identity and revocation path.

Authorization SHALL be evaluated using identity, permissions, resource ownership, business state, and entitlement as applicable.

## 5. Standard Error Contract

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found.",
    "request_id": "req_01...",
    "details": {}
  }
}
```

`code` is stable and machine-readable. `message` is safe for clients. `details` SHALL not expose secrets, stack traces, internal SQL, provider credentials, or unnecessary personal data.

Minimum HTTP mapping:

| Status | Meaning |
|---|---|
| 400 | Invalid request |
| 401 | Authentication required/invalid |
| 403 | Authenticated but not authorized |
| 404 | Resource not found or intentionally undisclosed |
| 409 | State/conflict violation |
| 422 | Semantically invalid input |
| 429 | Rate limited |
| 500 | Internal failure |
| 502/503 | Dependency unavailable |

## 6. Request Correlation

Every response SHALL include or be traceable through a request/correlation identifier. Downstream calls SHOULD propagate the same trace context.

## 7. Idempotency

Payment creation, refund requests, activation-code redemption, and other retry-sensitive mutations SHALL support an idempotency key or equivalent deterministic deduplication mechanism.

The server SHALL bind an idempotency key to the authenticated actor and operation scope. Reuse with materially different payloads SHALL fail rather than silently execute a second operation.

## 8. Pagination

Collection endpoints SHALL use cursor pagination for large or frequently changing datasets where practical.

Example:

```json
{
  "data": [],
  "pagination": {
    "next_cursor": "opaque-token",
    "has_more": true
  }
}
```

Cursors SHALL be opaque to clients.

## 9. Critical Resource Boundaries

### Identity

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/recovery/request
POST   /api/v1/auth/recovery/confirm
GET    /api/v1/me
```

### Catalog / Learning

```text
GET    /api/v1/sections
GET    /api/v1/subjects/{subject_id}
GET    /api/v1/courses/{course_id}
GET    /api/v1/courses/{course_id}/lectures
GET    /api/v1/lectures/{lecture_id}
POST   /api/v1/lectures/{lecture_id}/progress
POST   /api/v1/quizzes/{quiz_id}/attempts
GET    /api/v1/me/learning/progress
```

### Commerce

```text
POST   /api/v1/orders
GET    /api/v1/orders/{order_id}
POST   /api/v1/orders/{order_id}/cancel
POST   /api/v1/payments
GET    /api/v1/payments/{payment_id}
POST   /api/v1/refunds
```

### Entitlement

```text
GET    /api/v1/me/entitlements
GET    /api/v1/content/{content_id}/access
```

### Activation Codes

```text
POST   /api/v1/activation-codes/redeem
GET    /api/v1/me/activation-redemptions
```

### Provider Webhooks

```text
POST   /api/v1/webhooks/{provider}
```

Webhook endpoints SHALL verify provider authenticity, enforce replay protection where supported, normalize provider events, and remain idempotent.

## 10. Critical State Rules

### Orders

The API SHALL NOT allow clients to directly set an order to `paid` or `fulfilled`.

### Payments

The API SHALL represent unknown provider outcomes explicitly. Timeout SHALL NOT be converted into failure without reconciliation policy.

### Refunds

Refund amount SHALL be validated against refundable balance. Duplicate requests SHALL be idempotent.

### Entitlements

Clients SHALL not create entitlements directly. Entitlements are granted by authorized domain workflows after defined confirmation criteria.

### Learning Progress

Progress updates SHALL be bounded by the user's authorization and current access. Completion SHALL be validated server-side.

## 11. Rate Limits

Authentication, recovery, code redemption, payment, refund, and webhook endpoints SHALL have stricter controls than ordinary catalog reads.

Rate-limit responses SHOULD provide a retry hint without exposing internal capacity information.

## 12. Caching

Public catalog responses MAY be cached. User-specific, authorization-sensitive, payment, entitlement, and progress responses SHALL use conservative cache policies.

## 13. Security Headers

The edge/application stack SHALL enforce appropriate transport and browser security headers. Exact header policy belongs to the security/infrastructure implementation specification.

## 14. API-to-Domain Rule

Controllers/handlers SHALL translate transport input into domain commands. Business invariants SHALL remain in domain/application services rather than duplicated across HTTP handlers.

## 15. Contract Evolution

Deprecated fields SHALL have a documented removal window. Breaking changes SHALL not be introduced silently. Clients SHOULD be able to determine API capability/version through documented metadata.

## 16. OpenAPI Gate

Before implementation is declared API-complete, every endpoint in this baseline SHALL be represented in a machine-readable OpenAPI document with request/response schemas and security requirements.
