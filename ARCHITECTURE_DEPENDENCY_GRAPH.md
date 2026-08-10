# AURA Architecture Dependency Graph

**Status:** Accepted  
**Version:** 1.0.0  
**Scope:** Architecture and engineering specification repository

## 1. Purpose

This document defines the authoritative dependency direction between AURA architecture layers. It exists to prevent circular ownership, duplicated rules, and accidental use of derived systems as sources of truth.

## 2. Layer Model

```text
Project Charter / Governance
            |
            v
Product / Business Architecture
            |
            v
Domain Architecture
            |
            +--------------------+
            |                    |
            v                    v
System Architecture      Data Architecture
            |                    |
            +---------+----------+
                      |
                      v
              API Architecture
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
      Security   Infrastructure  Learning/Content
          |           |           |
          +-----------+-----------+
                      |
                      v
              Deployment / Runtime
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
     Observability  Analytics     AI
```

This is a dependency direction, not an implementation sequence. A lower layer SHALL NOT silently redefine an invariant owned by a higher or authoritative domain layer.

## 3. Source-of-Truth Rules

| Concern | Authoritative Source | Derived/Supporting Sources |
|---|---|---|
| Product intent | RFC-0001 | README, INDEX |
| Business model | RFC-0003 | Financial reports |
| Domain boundaries | RFC-0004 | API modules |
| System boundaries | RFC-0005 | Deployment topology |
| Data ownership | RFC-0006 | Analytics models |
| API contracts | RFC-0007 | Client SDKs |
| Security invariants | RFC-0008, SECURITY.md | Logs, alerts |
| Infrastructure | RFC-0009 | Runtime dashboards |
| Operational telemetry | RFC-0010 | Dashboards |
| Verification policy | RFC-0011, TESTING_STANDARD.md | CI results |
| Release behavior | RFC-0012 | CHANGELOG.md |
| Financial state | RFC-0013 | Analytics/reporting |
| Learning state | RFC-0014 | Analytics |
| Content state | RFC-0015 | Search indexes |
| Identity/authorization | RFC-0016 | Session/cache data |
| Notifications | RFC-0017 | Provider delivery records |
| Analytics | RFC-0018 | Dashboards |
| AI behavior boundaries | RFC-0019 | Model outputs |
| Recovery | RFC-0020 | Backups/runbooks |

## 4. Non-Negotiable Dependency Rules

1. Analytics SHALL NOT become the source of truth for transactional state.
2. AI SHALL NOT become the authority for financial or authorization state.
3. API contracts SHALL expose domain capabilities rather than duplicate business rules.
4. Infrastructure SHALL host domain services but SHALL NOT redefine domain invariants.
5. Observability SHALL observe authoritative systems; it SHALL NOT silently mutate them.
6. Content delivery SHALL respect entitlement and authorization owned by domain/security layers.
7. Notification delivery SHALL consume domain events rather than embedding domain decisions.
8. Search indexes and caches SHALL remain rebuildable derived state.
9. External providers SHALL remain integration dependencies, not internal sources of truth.
10. Recovery procedures SHALL restore authoritative state before derived state.

## 5. Cross-RFC Critical Edges

### RFC-0004 -> RFC-0013
Domain boundaries define ownership of financial entities and invariants.

### RFC-0006 -> RFC-0013
Data architecture defines persistence constraints; financial architecture defines money and transaction semantics.

### RFC-0007 -> RFC-0016
Protected API operations require identity and authorization decisions.

### RFC-0008 -> RFC-0016
Security architecture establishes security principles; identity architecture operationalizes authentication and authorization.

### RFC-0013 -> RFC-0014
Payment success may produce entitlement, but learning SHALL remain independent of payment implementation details.

### RFC-0015 -> RFC-0014
Learning access consumes content metadata/assets while preserving versioned educational history.

### RFC-0010 -> RFC-0018
Observability provides operational telemetry; analytics defines product/business measurement. They SHALL NOT be conflated.

### RFC-0019 -> RFC-0016 / RFC-0008
AI retrieval and actions SHALL inherit authorization and security boundaries.

### RFC-0020 -> RFC-0006 / RFC-0013 / RFC-0015
Recovery prioritizes authoritative data and reconstructs derived systems afterward.

## 6. Circular Dependency Prohibition

The following patterns are prohibited unless an ADR explicitly documents a safe abstraction:

```text
Analytics -> Financial State -> Analytics
AI -> Authorization -> AI
Infrastructure -> Domain Rules -> Infrastructure
Notification -> Commerce Decision -> Notification
Search -> Content Source -> Search
```

## 7. Implementation Guidance

When a new feature crosses three or more RFC boundaries, the implementation SHALL identify the owning domain and the direction of dependency before code is written.

If two documents appear to own the same invariant, the conflict SHALL be resolved by an ADR and the lower-level document SHALL reference the decision rather than duplicate it.

## 8. Review Gate

Any new RFC, ADR, or major standard SHALL answer:

- What does this document own?
- What does it depend on?
- Who depends on it?
- What is the authoritative source of truth?
- Which rules must not be duplicated?
