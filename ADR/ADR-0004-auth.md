# ADR-0004 — Token-Backed Authentication Boundary

**Status:** Accepted  
**Date:** 2026-08-10  
**Decision Owner:** Architecture Governance

## Context

AURA requires authenticated web/mobile clients, revocable sessions, protected APIs, and explicit authorization. Authentication must remain separate from business authorization and entitlement.

## Decision

Use a server-verifiable token/session-based authentication boundary for `/api/v1`. The exact token format and storage mechanism are implementation details subject to the security specification, but the system SHALL support revocation, expiry, rotation where applicable, and server-side authorization checks.

## Rationale

The boundary supports stateless application scaling while preserving explicit control over session lifecycle and authorization.

## Consequences

- Token/session lifecycle becomes a security-critical component.
- Revocation and credential compromise procedures are mandatory.
- Authentication data SHALL be separated from authorization/business state.

## Alternatives Rejected

- Client-supplied identity assertions without server verification.
- Long-lived non-revocable credentials as the sole session mechanism.
- Embedding entitlement state permanently into client tokens.

## Constraints

Tokens SHALL NOT be treated as authoritative payment or entitlement state. Sensitive tokens SHALL not appear in logs.

## Reconsideration Trigger

Reconsider when identity-provider requirements, platform architecture, or regulatory/security requirements materially change.
