# AURA Event Contracts

**Status:** Accepted  
**Version:** 1.0.0  
**Owner:** Architecture Governance  
**Transport:** Implementation-defined; transactional outbox required for authoritative state changes

## 1. Purpose

Define the event contract baseline connecting AURA domains without coupling them to a specific message broker.

## 2. Event Envelope

Every published domain event SHALL use a stable envelope:

```json
{
  "event_id": "01J...",
  "event_type": "PaymentConfirmed",
  "event_version": 1,
  "occurred_at": "2026-08-10T00:00:00Z",
  "producer": "payments",
  "aggregate_type": "payment",
  "aggregate_id": "pay_123",
  "actor": {
    "type": "user",
    "id": "usr_123"
  },
  "correlation_id": "req_123",
  "causation_id": "evt_122",
  "payload": {}
}
```

`event_id` SHALL be globally unique. Consumers SHALL treat `event_type + event_version` as the schema identity.

## 3. Delivery Semantics

The baseline assumes **at-least-once delivery**.

Consumers SHALL be idempotent. The event ID SHALL be persisted or otherwise deduplicated when processing has externally visible effects.

## 4. Ordering

Global ordering SHALL NOT be assumed. If ordering matters, consumers SHALL use aggregate identity/sequence information or explicit domain state validation.

## 5. Transactional Publication

Critical domain changes SHALL follow:

```text
Domain Transaction
    |
    +-- authoritative state
    +-- outbox event
          |
          v
     publisher
          |
          v
     event transport
```

The application SHALL NOT require a distributed transaction between the primary database and message broker.

## 6. Event Catalog

### Identity

`UserRegistered` — a new user identity became active/registered according to identity policy.

`UserSuspended` — an account was suspended.

`UserReactivated` — a previously suspended account became active.

### Commerce

`OrderCreated` — an order and its immutable commercial snapshot were created.

`OrderCancelled` — an order transitioned to a cancellable terminal/business state.

`PaymentInitiated` — payment processing was requested.

`PaymentConfirmed` — payment reached the domain's confirmed criteria.

`PaymentFailed` — payment reached a defined failed state.

`PaymentReconciliationRequired` — provider outcome is unknown or inconsistent and requires reconciliation.

`RefundRequested` — a refund request was accepted for processing.

`RefundConfirmed` — provider/domain criteria confirm a refund.

`RefundFailed` — refund processing reached a defined failed state.

### Entitlement

`EntitlementGranted` — access was granted by an authorized domain workflow.

`EntitlementRevoked` — access was revoked by an authorized workflow.

`ActivationCodeRedeemed` — a code redemption was committed.

### Learning

`EnrollmentCreated` — learner enrollment became effective.

`LectureProgressUpdated` — authoritative progress state changed.

`LectureCompleted` — completion criteria were satisfied.

`QuizAttemptSubmitted` — a quiz attempt was committed.

`CourseCompleted` — course completion criteria were satisfied.

### Content

`ContentVersionPublished` — a content version became publishable/visible under content policy.

`ContentVersionArchived` — a previously published content version was archived.

### Security / Administration

`RoleAssigned` — a role assignment changed.

`RoleRevoked` — a role assignment was removed.

`PrivilegedActionRecorded` — a material privileged operation was durably audited.

## 7. Minimum Payload Rules

Every event payload SHALL contain enough information for an authorized consumer to process the event without querying another service merely to identify the event's subject.

Payloads SHOULD avoid copying mutable snapshots that can become misleading. Consumers that need current state SHOULD query the authoritative domain after validating access and event semantics.

## 8. Financial Events

Financial events SHALL represent facts, not commands.

Bad:

```text
ProcessPayment
```

Good:

```text
PaymentConfirmed
```

No consumer SHALL infer payment success from `PaymentInitiated`.

## 9. Entitlement Events

`EntitlementGranted` SHALL only be emitted after the authoritative entitlement state is committed.

Payment confirmation MAY be a cause of entitlement, but entitlement SHALL remain a separate domain fact.

## 10. Learning Events

Learning events SHALL be emitted from authoritative learning state. Analytics ingestion SHALL never manufacture `LectureCompleted` or `CourseCompleted` events.

## 11. Schema Evolution

Compatible additions MAY increment a minor schema revision if the registry supports it. Incompatible payload changes SHALL create a new event version.

Old event versions SHALL remain processable for the supported retention window or be explicitly migrated before removal.

## 12. Poison Messages

Consumers SHALL isolate repeatedly failing events through bounded retries and a dead-letter/quarantine mechanism. A poison event SHALL not block unrelated events indefinitely.

## 13. Security

Events SHALL not contain passwords, access tokens, payment secrets, or unnecessary sensitive personal data. Event transport and storage SHALL use appropriate access controls and encryption.

## 14. Replay

Events SHOULD support controlled replay where operationally valuable. Replay SHALL be isolated from live side effects or use explicit idempotency controls.

## 15. Consumer Contract

Every consumer SHALL document:

- Consumed event types/versions.
- Idempotency key.
- Required ordering assumptions.
- Retry behavior.
- Side effects.
- Failure/quarantine behavior.
- Authorization/data-access implications.

## 16. Machine-Readable Registry Gate

Before implementation is declared event-complete, every production event SHALL have a machine-readable schema, owner, version, producer, consumer list, compatibility policy, and test fixture.
