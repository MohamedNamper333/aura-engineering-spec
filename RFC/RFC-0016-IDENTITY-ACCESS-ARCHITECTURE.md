---
document_id: RFC-0016
title: Identity & Access Architecture
status: Accepted
version: 1.0.0
category: Identity and Access Architecture
priority: Critical
risk_level: Critical
owner: AURA Architecture Team
authors:
  - AURA Architecture Team
reviewers:
  - Repository Maintainers
approvers:
  - Repository Maintainers
created: 2026-08-10
updated: 2026-08-10
related_documents:
  - RFC_METADATA_STANDARD.md
  - SECURITY.md
  - THREAT_MODELING_STANDARD.md
  - ARCHITECTURE_DEPENDENCY_GRAPH.md
related_rfcs:
  - RFC-0008
  - RFC-0014
related_adrs: []
dependencies:
  - RFC-0008
supersedes: null
superseded_by: null
tags:
  - identity
  - authentication
  - authorization
  - sessions
  - iam
---
# RFC-0016 — Identity & Access Architecture

**Status:** Accepted  
**Version:** 1.0.0  
**Priority:** Critical

## 1. Purpose

Define identity lifecycle, authentication, roles, permissions, sessions, privileged access, and authorization policy.

## 2. Core Separation

```text
Identity != Authentication != Role != Permission != Entitlement
```

No single boolean or token claim SHALL represent all concepts.

## 3. Identity Lifecycle

```text
Invited/Registered -> Active -> Suspended -> Deactivated
```

Security-impacting lifecycle changes SHALL be auditable.

## 4. Authentication

Authentication SHALL use approved secure mechanisms. Passwords, if used, SHALL be adaptively hashed. Recovery SHALL use short-lived, single-use verification mechanisms.

## 5. Sessions

Sessions SHALL have expiration, revocation capability, secure storage/transport, and rotation on sensitive privilege transitions where appropriate.

## 6. Roles

Initial roles may include Student, Teacher, Content Reviewer, Support Agent, Finance Operator, and Administrator. Assignment SHALL be explicit and auditable.

## 7. Permissions

Permissions SHALL represent concrete capabilities. High-risk permissions SHOULD be separated so ordinary operators receive only necessary authority.

## 8. Resource Authorization

Authorization SHALL combine identity, role/permission, resource ownership, business state, and entitlement where required.

## 9. Privileged Access

Administrative access SHALL use least privilege, strong authentication, audit trails, and step-up controls for high-impact operations where appropriate.

## 10. Account Recovery

Recovery workflows SHALL resist enumeration, token replay, brute force, and takeover. Recovery SHALL not silently weaken authorization.

## 11. Multi-Factor Authentication

MFA SHOULD be required for privileged operators and MAY be offered/required for students according to risk and usability decisions.

## 12. Service Identity

Internal workloads SHALL use separate service identities with scoped permissions. Shared superuser credentials are prohibited.

## 13. Authorization Failure

Authorization SHALL fail closed. Missing permission or uncertain identity SHALL never be interpreted as allowed.

## 14. Audit

Role changes, permission changes, authentication security events, account recovery, privileged actions, and session revocation SHALL be observable and auditable.

## 15. Definition of Done

Identity and Access Architecture is complete when identity lifecycle, authentication, sessions, roles, permissions, resource authorization, privileged access, recovery, MFA, service identities, failure semantics, and audit controls are explicit.
