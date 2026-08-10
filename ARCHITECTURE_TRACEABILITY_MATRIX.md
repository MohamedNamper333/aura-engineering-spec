# AURA Architecture Traceability Matrix

**Status:** Accepted  
**Version:** 1.0.0  
**Scope:** RFCs 0000–0020

## 1. Purpose

This matrix maps major platform capabilities to their architectural authority, supporting specifications, validation obligations, and implementation owner.

## 2. Traceability Matrix

| Capability | Primary Authority | Supporting Specs | Validation Gate |
|---|---|---|---|
| Product scope | RFC-0001 | README, INDEX | Architecture review |
| Requirements governance | RFC-0002 | RFC Metadata Standard | Document review |
| Business model | RFC-0003 | RFC-0013 | Domain + financial review |
| Domain boundaries | RFC-0004 | RFC-0014, RFC-0015, RFC-0016 | Architecture review |
| System topology | RFC-0005 | RFC-0009 | Deployment review |
| Data ownership | RFC-0006 | Data Modeling Standard | Schema/integration tests |
| API contracts | RFC-0007 | API standards | Contract tests |
| Security | RFC-0008 | SECURITY.md, Threat Model | Security review |
| Infrastructure | RFC-0009 | RFC-0020 | Infrastructure validation |
| Observability | RFC-0010 | OBSERVABILITY_STANDARD.md | SLO/alert validation |
| Testing | RFC-0011 | TESTING_STANDARD.md | CI gates |
| Deployment | RFC-0012 | Dependency Policy | Release verification |
| Financial state | RFC-0013 | Error Handling, Data Modeling | Financial invariants |
| Learning | RFC-0014 | Domain Architecture | Learning E2E |
| Content | RFC-0015 | Security, Data Modeling | Content lifecycle tests |
| Identity/access | RFC-0016 | Security | AuthZ/AuthN tests |
| Notifications | RFC-0017 | Error Handling, Observability | Delivery/idempotency tests |
| Analytics | RFC-0018 | Observability, Data Modeling | Data quality tests |
| AI | RFC-0019 | Security, Identity, Observability | AI evaluation/security tests |
| Recovery | RFC-0020 | Infrastructure, Data, Financial | Restore/reconciliation test |

## 3. Critical Business Flows

### Purchase -> Entitlement -> Learning

```text
RFC-0013 Financial
      |
      v
Entitlement Decision
      |
      v
RFC-0014 Learning
      |
      v
RFC-0015 Content
```

**Invariant:** payment implementation SHALL NOT leak into learning logic.

### Identity -> Authorization -> Protected Resource

```text
RFC-0016 Identity/Access
          |
          v
RFC-0008 Security
          |
          v
RFC-0007 API
          |
          v
Protected Domain Resource
```

**Invariant:** client UI state SHALL never be the authorization authority.

### Content -> AI Assistant

```text
RFC-0015 Content
      |
      v
Entitlement + Authorization
      |
      v
RFC-0019 AI
```

**Invariant:** AI retrieval SHALL inherit content access boundaries.

### Failure -> Detection -> Recovery

```text
Runtime
  |
  +--> RFC-0010 Observability
  |
  +--> RFC-0008 Security
  |
  v
RFC-0020 Recovery
```

## 4. Implementation Traceability Rule

Every implementation component SHALL map to at least one owning architectural document. A component that implements rules from multiple domains SHALL document the dependency direction.

## 5. Test Traceability Rule

Every Critical-risk RFC SHALL have at least one corresponding verification mechanism before the related production capability is considered complete.

## 6. Uncovered Areas

The following require implementation-level artifacts before production readiness:

- Concrete API schemas.
- Database schema/migrations.
- Authorization policy definitions.
- Threat-model artifacts per material feature.
- ADRs for irreversible architecture choices.
- Deployment configuration.
- Recovery runbooks.
- AI evaluation datasets where AI features are enabled.

These are intentionally not fabricated by this matrix.
