# AURA AI Execution Playbook

**Status:** Canonical execution policy
**Version:** 1.0.0
**Authority:** Engineering Source of Truth
**Audience:** AI coding agents, software engineers, reviewers, architects

## 1. Mission

AURA is a digital vocational education platform designed for vocational students in Iraq. The engineering repository is the authoritative specification. AI agents are implementation operators, not autonomous architects.

The objective is to transform the approved AURA specification into deterministic, secure, testable, maintainable software without silently changing product behavior or architecture.

## 2. Non-Negotiable Hierarchy

When information conflicts, use this precedence:

1. Explicit user-approved product decision.
2. Approved ADR.
3. Authoritative contract/schema.
4. Approved RFC/domain specification.
5. Engineering standards.
6. Existing implementation, only when it does not contradict 1-5.
7. AI inference.

AI inference is the weakest source. Never promote an inference into a product decision without approval.

## 3. AI Agent Operating Rules

### MUST

- Read the repository index and relevant contracts before changing code.
- Identify affected bounded contexts before implementation.
- Preserve existing architecture unless an approved ADR changes it.
- Treat API, event, database, security, and financial contracts as executable constraints.
- Validate inputs at trust boundaries.
- Fail fast on impossible states and invalid configuration.
- Use idempotency for retryable financial and externally triggered operations.
- Store monetary amounts as integer minor units; never use floating point for money.
- Keep authentication, authorization, audit logging, and business logic distinct.
- Write tests for every non-trivial business invariant.
- Update documentation/contracts before or with behavior changes.
- Keep changes small, reviewable, reversible, and traceable to a requirement.
- Report uncertainty instead of inventing requirements.

### MUST NOT

- Invent endpoints, fields, events, roles, payment behavior, prices, or permissions.
- Mark an unimplemented feature as implemented.
- weaken authentication or authorization to make tests pass.
- bypass migrations or modify production data manually.
- silently change an API response or event payload for convenience.
- expose secrets, tokens, credentials, private keys, or payment data in logs.
- introduce a dependency without justification and review.
- rewrite unrelated files during a focused change.
- delete tests because they expose a design problem.
- use generated code as authority over repository contracts.

## 4. Required Agent Workflow

```text
READ → MAP → PLAN → CONTRACT CHECK → IMPLEMENT → TEST → AUDIT → REPORT
```

### READ

Load README, INDEX, relevant RFCs, ADRs, standards, schemas, contracts, and existing implementation.

### MAP

Identify the domain, data flow, dependencies, security boundary, events, persistence effects, and external providers affected.

### PLAN

State the smallest implementation sequence required. If a requirement is ambiguous or contradictory, stop and surface it.

### CONTRACT CHECK

Verify API, event, database, security, and financial compatibility before writing code.

### IMPLEMENT

Implement only the approved scope. Prefer existing abstractions over parallel abstractions.

### TEST

Run unit, contract, integration, and relevant end-to-end tests. Add regression coverage for discovered defects.

### AUDIT

Check invariants, authorization, idempotency, transactions, observability, migrations, error handling, and backward compatibility.

### REPORT

Report files changed, contracts affected, tests run, known limitations, and any unresolved decision.

## 5. Change Classification

Every AI change must be classified:

| Class | Meaning | Approval requirement |
|---|---|---|
| C0 | Formatting/docs typo | Normal review |
| C1 | Local implementation with no contract change | Normal review + tests |
| C2 | API/event/schema/database behavior change | Contract review + tests |
| C3 | Security, payment, entitlement, identity, migration, or architectural change | Explicit architectural/product approval |

C2/C3 changes must never be hidden inside a C1 task.

## 6. Platform Map

```text
AURA Platform
│
├── Identity & Access
│   ├── Registration
│   ├── Authentication
│   ├── Recovery
│   ├── Roles / Permissions
│   └── Audit
│
├── Academic Catalog
│   ├── Sections
│   ├── Subjects
│   ├── Courses
│   ├── Lectures
│   ├── Content Versions
│   └── Publication Lifecycle
│
├── Learning
│   ├── Enrollment
│   ├── Lecture Progress
│   ├── Completion
│   ├── Quizzes
│   └── Course Completion
│
├── Commerce
│   ├── Products / Course Purchases
│   ├── Orders
│   ├── Payments
│   ├── Refunds
│   ├── Activation Codes
│   └── Entitlements
│
├── Integration
│   ├── Payment Providers
│   ├── Webhooks
│   ├── Outbox
│   └── Workers
│
└── Platform Operations
    ├── Observability
    ├── Security Monitoring
    ├── Audit Trail
    ├── CI/CD
    └── Backup / Recovery
```

## 7. Domain Boundaries

Identity owns users, authentication state, roles, and authorization inputs.

Catalog owns academic structure and published educational metadata.

Learning owns enrollment, progress, attempts, and completion state.

Commerce owns orders and their lifecycle.

Payments owns payment attempts, provider references, reconciliation, and refunds.

Entitlement owns access rights. Payment success does not mean entitlement state may be changed outside the defined authorization path.

Content owns content versions and publication lifecycle.

Security owns audit records and privileged-action evidence.

Integration owns provider adapters, webhook verification, retries, and delivery mechanics.

No domain may directly mutate another domain's authoritative state without its defined contract.

## 8. Core Business Invariants

- A suspended/deactivated identity cannot perform actions requiring an active account.
- Authorization is deny-by-default.
- A user cannot receive an entitlement without satisfying the authoritative grant condition.
- A refund cannot exceed the refundable amount.
- A payment operation must be idempotent under the same idempotency key and request identity.
- Webhooks must be authenticated and replay-resistant.
- Event consumers must tolerate at-least-once delivery.
- Course/lecture progress must never become negative or exceed valid bounds.
- Published content must reference a valid immutable version.
- Audit records for privileged actions must be append-oriented and tamper-evident at the application boundary.
- Financial state transitions must be transactional and auditable.

## 9. API Rules

- API behavior must match OpenAPI and API contract documents.
- Do not add undocumented endpoints.
- Use stable resource identifiers.
- Validate request bodies, path parameters, headers, and authentication context.
- Return documented error shapes.
- Mutating retryable endpoints require idempotency where specified.
- Never leak internal stack traces, secrets, SQL, provider credentials, or sensitive user data.

## 10. Event Rules

- Events are integration contracts, not arbitrary log messages.
- Event names and versions are stable identifiers.
- Breaking payload changes require a new event version.
- Delivery is at-least-once; consumers must be idempotent.
- Producers own event correctness; consumers own safe handling.
- Every registered event must resolve to a schema and fixture.
- Never publish secrets or unnecessary personal/payment data.
- Event publication must follow the repository's transaction/outbox policy.

## 11. Database Rules

- Schema changes require migrations.
- Migrations are ordered, deterministic, reviewable, and tested.
- Destructive changes require explicit migration strategy and compatibility analysis.
- Foreign keys and unique constraints should enforce invariants where appropriate.
- Sensitive fields require appropriate protection and must not be casually exposed.
- Application code must not depend on undocumented database behavior.

## 12. Security Rules

- Least privilege.
- Deny by default.
- Authenticate before authorization.
- Authorize every protected operation at the server boundary.
- Secrets come from managed configuration, never source control.
- Passwords are stored only as strong password hashes using an approved password-hashing strategy.
- Sessions/tokens must have explicit expiry and revocation behavior.
- Webhook signatures must be verified before processing.
- Rate-limit abuse-sensitive operations.
- Security failures must be observable without exposing sensitive information.

## 13. Financial Rules

- Money uses integer minor units and an explicit ISO currency code.
- Never calculate monetary values using binary floating point.
- Payment provider callbacks are untrusted until authenticated and validated.
- Never grant duplicate financial outcomes because of retries.
- Refunds require authoritative payment linkage and amount bounds.
- Reconciliation discrepancies become explicit states; never silently overwrite them.
- Every financial state transition must be traceable.

## 14. AI Safety Against Specification Drift

If an agent discovers that implementation requires a behavior not described by the repository:

```text
STOP
→ identify the missing decision
→ describe the alternatives
→ request/record approval
→ update the authoritative contract
→ implement
```

The agent must not solve product ambiguity by guessing.

## 15. Definition of Done

A task is not done because code compiles.

A task is done only when:

- requirement is mapped to an authoritative source;
- implementation matches the contract;
- authorization is verified;
- errors are deterministic;
- migrations are present when needed;
- events are updated when needed;
- tests cover behavior and invariants;
- observability is adequate;
- CI passes;
- documentation is updated;
- no unrelated behavior was changed.

## 16. Final Agent Gate

Before submitting work, the agent must be able to answer YES to all applicable questions:

1. What authoritative document required this change?
2. What domain owns the behavior?
3. What contracts changed?
4. What security boundary is affected?
5. What happens on retry?
6. What happens on partial failure?
7. What happens on duplicate delivery?
8. What happens if the input is invalid or missing?
9. What tests prove the behavior?
10. Did the implementation introduce any undocumented assumption?

If any answer is unknown, the change is not complete.

## 17. Platform Product Context

AURA is intended to provide a unified digital learning experience for vocational education. The product model centers on structured educational content, free introductory access where specified, paid learning materials/courses, assessments, progress tracking, digital payment options, activation-code based purchase flows, and entitlement-controlled access.

The platform is initially focused on Iraq and vocational education, with future expansion possible only through an explicit product decision. Product assumptions must not be converted into technical requirements unless they are approved and documented.

## 18. Source-of-Truth Rule

This file governs AI execution behavior. It does not replace domain contracts, API contracts, ADRs, RFCs, database specifications, or security policies. When a conflict exists, the higher-precedence source in Section 2 wins.

## 19. Change Control

Any change to this playbook that alters AI authority, security boundaries, financial invariants, architectural boundaries, or definition-of-done rules requires explicit review and a recorded decision.
