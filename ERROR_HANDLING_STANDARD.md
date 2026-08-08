---
document_id: GUIDE-ERR-0001
title: Error Handling Standard
status: Approved
version: 1.0.0
owner: AURA Architecture Team
classification: Engineering Standard
review_cycle: Annual
review_owner: AURA Architecture Team
approved_by: Repository Maintainers
effective_date: YYYY-MM-DD
supersedes: null
superseded_by: null
---

# Error Handling Standard

---

# Revision History

| Version | Date | Description |
|---|---|---|
| 1.0.0 | YYYY-MM-DD | Initial error handling standard. |

---

# Table of Contents

## Definitions
## Normative Language
## PART I — Error Handling Philosophy
1. Purpose
2. Scope
3. Error Handling Philosophy
4. Core Principles
## PART II — Error Classification and Propagation
5. Error Classification
6. Error Taxonomy
7. Error Codes
8. Exceptions
9. Validation Errors
10. Domain Errors
11. Infrastructure Errors
12. API Error Contracts
## PART III — Recovery and Operations
13. Error Propagation
14. Retry and Recovery
15. Timeouts and Cancellation
16. Logging and Observability
17. Security and Sensitive Information
18. User-Facing Errors
19. Distributed Systems
## PART IV — Testing and Governance
20. Testing Error Scenarios
21. Review Checklist
22. Exceptions
23. Related Documents
24. Versioning
25. Document Status
## Appendix A — Error Classification Matrix
## Appendix B — Error Code Guidelines
## Appendix C — Retry Classification Matrix
## Appendix D — Error Handling Review Checklist

# Definitions

---

## Error

A condition indicating that an operation cannot complete according to its defined contract.

## Exception

A language or runtime mechanism used to represent an exceptional condition during execution.

## Failure

An externally observable inability of a system, component, or operation to perform its required behavior.

## Error Classification

The process of determining the nature, severity, ownership, and expected handling behavior of an error.

## Error Code

A stable machine-readable identifier representing a defined error condition.

## Validation Error

An error caused by input that violates structural, syntactic, or semantic validation requirements.

## Domain Error

An error caused by a validly formed request that violates a domain rule or business invariant.

## Infrastructure Error

An error caused by infrastructure, persistence, networking, external dependencies, or runtime resources.

## Operational Error

An error caused by an operational condition such as configuration, deployment, capacity, or service availability.

## Programming Error

An error caused by incorrect implementation, violated assumptions, or invalid program state.

## Transient Error

An error that MAY succeed if the operation is attempted again after an appropriate delay or state change.

## Permanent Error

An error that is not expected to succeed through an immediate retry without changing the input, state, configuration, or implementation.

## Retry

A controlled re-execution of an operation after a failure.

## Backoff

A delay strategy used between retry attempts.

## Timeout

A maximum permitted duration for an operation before it is considered unsuccessful.

## Cancellation

An explicit request to stop an operation that is currently executing.

## Error Propagation

The controlled transfer of an error from the component where it occurs to the component responsible for handling it.

## Error Boundary

A defined architectural boundary at which errors are translated, contained, logged, or exposed.

## Root Cause

The underlying condition responsible for a failure rather than merely a downstream symptom.

## Error Contract

A defined structure describing how an error is represented, transported, and interpreted by a consumer.

## Silent Failure

A failure that occurs without producing sufficient evidence, notification, or observable state to identify that the operation failed.

## Fail-Fast

A behavior in which an invalid or impossible condition causes immediate, explicit failure rather than allowing corrupted or ambiguous state to propagate.

# Normative Language

The keywords **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** used throughout this document are interpreted according to RFC 2119.

## SHALL

Indicates an absolute requirement.

## SHALL NOT

Indicates an absolute prohibition.

## SHOULD

Indicates a strong recommendation that should normally be followed unless a justified exception exists.

## SHOULD NOT

Indicates a practice that should normally be avoided.

## MAY

Indicates an optional practice whose applicability depends on engineering requirements.

# PART I — Error Handling Philosophy

# 1. Purpose

## Objective

This document defines the engineering requirements for detecting, classifying, propagating, handling, observing, and testing errors within systems governed by the **AURA Engineering Standards**.

## Mission

The standard exists to ensure that errors are:

- Explicit.
- Correctly classified.
- Safely propagated.
- Observable.
- Actionable.
- Recoverable where appropriate.
- Secure.
- Testable.

## Error Handling as Architecture

Error handling SHALL be treated as an architectural concern rather than scattered defensive code.

Error behavior can affect:

- APIs.
- User experience.
- Data integrity.
- Transactions.
- Retries.
- Distributed systems.
- Security.
- Observability.
- Operational response.

## Lifecycle

Error handling SHALL be considered throughout:

```text
Detect
  ↓
Classify
  ↓
Contain
  ↓
Propagate
  ↓
Handle
  ↓
Observe
  ↓
Recover
  ↓
Learn
```

## Expected Outcome

A correctly designed system SHOULD make it possible to determine:

- What failed.
- Where it failed.
- Why it failed.
- Whether the failure is transient.
- Whether retry is safe.
- Who owns the failure.
- What the consumer should do.
- Whether data or system state was affected.

# 2. Scope

## Objective

This standard applies to error handling across systems governed by the **AURA Engineering Standards**.

## Applies To

This standard applies to:

- Application code.
- Domain logic.
- APIs.
- Background jobs.
- Scheduled tasks.
- Database operations.
- External service integrations.
- Message processing.
- Distributed services.
- CLI applications.
- Web applications.
- Authentication and authorization flows.
- Infrastructure-facing components.

## Error Sources

The standard covers errors originating from:

- Invalid input.
- Domain rules.
- Persistence.
- Networking.
- External dependencies.
- Configuration.
- Resource exhaustion.
- Concurrency.
- Timeouts.
- Cancellation.
- Programming defects.
- Security controls.

## Environment Scope

Error behavior MAY differ between:

- Development.
- Testing.
- Staging.
- Production.

However, such differences SHALL be intentional and SHALL NOT conceal production-critical failures.

## Technology Independence

This standard SHALL remain independent of a specific programming language, framework, database, or API technology.

Implementation-specific standards MAY impose additional requirements.

## Out of Scope

This document does not define:

- A specific programming-language exception hierarchy.
- Vendor-specific monitoring configuration.
- Incident-response procedures.
- Disaster-recovery procedures.
- Infrastructure provisioning.

Those concerns MAY be governed by separate standards.

## Relationship to Other Standards

This document SHALL be applied together with applicable:

- API standards.
- Security standards.
- Testing standards.
- Observability standards.
- Data-modeling standards.
- Release standards.

# 3. Error Handling Philosophy

## Objective

Error handling SHALL preserve correctness while providing sufficient information for recovery and investigation.

## Errors Are Signals

An error is evidence that one of the following may have occurred:

- Invalid input.
- Invalid state.
- Broken dependency.
- Capacity limitation.
- Configuration failure.
- Programming defect.
- Security violation.
- Unexpected environmental condition.

The handling strategy SHALL reflect the actual cause.

## Classification Before Action

Systems SHOULD classify an error before deciding whether to:

- Retry.
- Return an error.
- Transform the error.
- Escalate.
- Log.
- Suppress.
- Recover.

Blind handling SHOULD be avoided.

## Correctness Over Convenience

Error handling SHALL prioritize system correctness over hiding failures.

The following pattern SHOULD generally be avoided:

```text
operation fails
     ↓
catch error
     ↓
ignore error
     ↓
continue with invalid state
```

## Explicit Failure

When a system cannot safely continue, it SHOULD fail explicitly rather than silently producing incorrect results.

## Recovery Must Be Safe

Recovery SHALL NOT create greater damage than the original failure.

Examples of unsafe recovery include:

- Repeating non-idempotent operations.
- Retrying permanent validation failures.
- Continuing after transaction corruption.
- Replacing missing data with fabricated defaults.

## Preserve Causality

Error handling SHOULD preserve the causal chain of failures.

Higher layers MAY translate an error for their boundary, but SHOULD retain sufficient underlying context for diagnosis.

## Boundary Translation

Errors SHOULD be translated at architectural boundaries rather than indiscriminately throughout the call stack.

For example:

```text
Database Error
      ↓
Repository Boundary
      ↓
Domain Error
      ↓
Application Boundary
      ↓
API Error Contract
```

The exact layers MAY differ by architecture.

## Expected Outcome

Error handling SHOULD produce a system in which failures are explicit, classifiable, observable, and handled according to their actual semantics.

# 4. Core Principles

## Principle 1 — Fail Fast on Invalid State

Systems SHALL reject impossible or invalid states as early as practical.

## Principle 2 — Never Fail Silently

Critical failures SHALL produce sufficient evidence for detection and investigation.

## Principle 3 — Classify Before Retrying

Retry behavior SHALL be based on error semantics rather than the mere existence of an error.

## Principle 4 — Preserve Root Cause

Error translation SHALL NOT unnecessarily destroy the underlying cause.

## Principle 5 — Do Not Leak Sensitive Information

Errors SHALL NOT expose secrets, credentials, internal security data, or unnecessary personal information.

## Principle 6 — Handle at the Correct Boundary

Errors SHOULD be handled by the layer that has sufficient context and authority to make the correct decision.

## Principle 7 — Do Not Catch What Cannot Be Handled

A component SHOULD NOT catch an error merely to prevent propagation if it cannot meaningfully recover or translate it.

## Principle 8 — Avoid Generic Catch-All Behavior

Broad error handlers SHOULD NOT convert unrelated failures into a single meaningless outcome.

## Principle 9 — Retries Must Be Controlled

Retries SHALL have bounded attempts, appropriate delays, and clear eligibility rules.

## Principle 10 — Timeouts Are Required for External Operations

Operations depending on external resources SHOULD have explicit time boundaries.

## Principle 11 — Cancellation Must Be Respected

Long-running operations SHOULD support cancellation where the execution model permits it.

## Principle 12 — Errors Are Observable

Important failures SHOULD be represented in logs, metrics, traces, or other appropriate telemetry.

## Principle 13 — User Messages Are Not Debug Logs

User-facing error messages SHOULD communicate the necessary action without exposing internal implementation details.

## Principle 14 — Error Contracts Are Stable

Machine-readable error representations SHOULD remain stable enough for consumers to handle them reliably.

## Principle 15 — Recovery Must Preserve Integrity

Error recovery SHALL NOT leave the system in a state that violates defined data or domain invariants.

## Final Principle

A mature error-handling system does not attempt to eliminate errors.

It makes failures:

```text
Predictable
    +
Classifiable
    +
Observable
    +
Recoverable when safe
    +
Unambiguous when recovery is impossible
```

The objective is not to hide failure.

The objective is to control it.

# PART II — Error Classification and Propagation

# 5. Error Classification

## Objective

Errors SHALL be classified according to their semantics, recoverability, ownership, and operational impact.

## Primary Classification

Every material error SHOULD be assignable to one primary classification:

```text
VALIDATION
DOMAIN
AUTHENTICATION
AUTHORIZATION
INFRASTRUCTURE
DEPENDENCY
CONFIGURATION
CONCURRENCY
TIMEOUT
CANCELLATION
PROGRAMMING
SECURITY
RESOURCE
UNKNOWN
```

The exact taxonomy MAY be extended for a specific system, but extensions SHALL remain unambiguous.

## Recoverability Classification

Errors SHOULD additionally be classified as:

```text
TRANSIENT
PERMANENT
CONDITIONAL
UNKNOWN
```

## Transient

A transient error MAY succeed after:

- Waiting.
- Retrying.
- Restoring a dependency.
- Releasing a resource.
- Resolving temporary contention.

## Permanent

A permanent error SHOULD NOT be retried without changing the input, state, configuration, or implementation.

## Conditional

A conditional error MAY succeed after a specific condition changes.

## Unknown

Unknown errors SHALL be handled conservatively. Unknown errors SHOULD NOT automatically be classified as retryable.

## Severity

Material errors MAY additionally have severity levels:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Severity SHOULD represent operational impact rather than technical complexity.

## Classification Requirements

Error classification SHOULD answer:

1. What caused the failure?
2. Is the failure expected?
3. Can it safely be retried?
4. Which component owns the failure?
5. Does the failure affect data integrity?
6. Does the failure require operational intervention?

# 6. Error Taxonomy

## Objective

The error taxonomy SHALL provide stable semantic categories for consistent handling.

## 6.1 Validation Errors

Validation errors occur when input does not satisfy defined structural or semantic requirements.

Examples:

```text
Missing required field
Invalid format
Invalid range
Malformed identifier
Unsupported value
```

Validation errors SHOULD normally be treated as permanent until the input changes.

## 6.2 Domain Errors

Domain errors occur when an otherwise valid request violates a domain rule.

Examples:

```text
Insufficient balance
Order cannot be cancelled
Subscription already expired
Resource cannot transition to requested state
```

Domain errors SHOULD be explicit and machine-readable where consumers need to react differently.

## 6.3 Authentication Errors

Authentication errors indicate that the system cannot establish the identity required for an operation.

Examples:

```text
Missing credentials
Invalid credentials
Expired credentials
Invalid authentication token
```

Authentication errors SHALL NOT expose sensitive credential details.

## 6.4 Authorization Errors

Authorization errors indicate that an authenticated actor is not permitted to perform an operation.

Examples:

```text
Insufficient permissions
Resource access denied
Operation not allowed
```

Authorization failures SHOULD NOT reveal unnecessary information about protected resources.

## 6.5 Infrastructure Errors

Infrastructure errors originate from system infrastructure.

Examples:

```text
Database unavailable
Connection failure
Storage failure
Network failure
Resource exhaustion
```

Infrastructure errors MAY be transient or permanent depending on the underlying condition.

## 6.6 Dependency Errors

Dependency errors originate from an external or separately managed component.

Examples:

```text
External API unavailable
Dependency timeout
Dependency rate limit
Dependency returned invalid response
```

Dependency errors SHOULD preserve sufficient context to identify the affected dependency without exposing sensitive internal information.

## 6.7 Configuration Errors

Configuration errors occur when required configuration is missing, invalid, incompatible, expired, or misconfigured.

Configuration errors SHOULD generally fail fast during initialization when they can be detected safely before serving traffic.

## 6.8 Concurrency Errors

Concurrency errors occur when simultaneous operations conflict.

Examples:

```text
Optimistic lock conflict
Duplicate operation
Resource version mismatch
Concurrent state modification
```

Concurrency errors SHOULD NOT automatically be treated as generic infrastructure failures.

## 6.9 Timeout Errors

Timeout errors occur when an operation exceeds its permitted execution duration.

A timeout SHOULD identify the operation boundary where practical.

## 6.10 Cancellation Errors

Cancellation indicates that execution was intentionally stopped.

Cancellation SHOULD NOT automatically be classified as a system failure.

## 6.11 Programming Errors

Programming errors indicate defects or violated implementation assumptions.

Examples:

```text
Null dereference
Impossible state
Invariant violation
Unexpected type
Unhandled case
```

Programming errors SHALL NOT normally be hidden or converted into successful behavior.

## 6.12 Security Errors

Security errors indicate violations or suspected violations of security requirements.

Examples:

```text
Invalid signature
Security policy violation
Suspicious request
Integrity verification failure
```

Security errors SHALL be handled according to applicable security requirements.

## 6.13 Resource Errors

Resource errors occur when required resources cannot be obtained or used.

Examples:

```text
Memory exhaustion
Connection pool exhaustion
Storage capacity exceeded
File descriptor exhaustion
Concurrency limit reached
```

Resource errors MAY be transient but SHOULD be treated as operationally significant.

## 6.14 Unknown Errors

Unknown errors represent conditions that cannot be confidently classified.

Unknown errors SHALL NOT be silently ignored.

Unknown errors SHOULD be logged with sufficient diagnostic context and escalated according to operational requirements.

# 7. Error Codes

## Objective

Systems exposing errors to other components SHOULD use stable machine-readable error codes.

## Stability

Error codes SHOULD remain stable even when human-readable messages, internal implementations, logging formats, or exception types change.

## Naming

Error codes SHOULD use a consistent format.

Examples:

```text
USER_NOT_FOUND
ORDER_ALREADY_CANCELLED
INVALID_PAYMENT_METHOD
DEPENDENCY_TIMEOUT
DATABASE_UNAVAILABLE
```

## Domain Prefixes

Large systems MAY use domain prefixes.

Examples:

```text
AUTH_INVALID_CREDENTIALS
PAYMENT_INSUFFICIENT_FUNDS
ORDER_INVALID_STATE
```

## Code Semantics

An error code SHOULD represent a semantic condition rather than a specific implementation exception.

Prefer:

```text
PAYMENT_PROVIDER_UNAVAILABLE
```

over:

```text
HTTP_502_FROM_PAYMENT_CLIENT
```

## Code Reuse

The same error code SHOULD NOT represent materially different conditions.

## Human Messages

Human-readable messages MAY change independently from machine-readable error codes. Consumers SHOULD NOT parse human-readable messages to determine program behavior.

## Deprecation

Deprecated error codes SHOULD remain documented for the duration of any supported compatibility window.

## Unknown Codes

Consumers SHOULD handle unknown error codes safely and SHOULD NOT crash solely because an error code was not previously recognized.

# 8. Exceptions

## Objective

Exceptions SHALL be used deliberately and SHALL NOT replace explicit error semantics.

## Throwing Exceptions

An exception SHOULD be raised when the current layer cannot reasonably continue the operation.

## Catching Exceptions

A component SHOULD catch an exception only when it can:

- Recover.
- Translate.
- Add meaningful context.
- Perform required cleanup.
- Apply an appropriate boundary policy.

## Catch-and-Ignore

The following pattern SHALL NOT be used for material failures:

```text
try
    operation
catch
    ignore
```

## Generic Catch Blocks

Generic catch-all handlers SHOULD be restricted to architectural boundaries such as process, API, worker, or top-level request boundaries.

Even at these boundaries, the original cause SHOULD remain observable.

## Exception Translation

An exception MAY be translated when crossing an architectural boundary.

Example:

```text
DatabaseException
       ↓
RepositoryError
       ↓
DomainError
       ↓
ApplicationError
       ↓
API Error Response
```

## Exception Context

Translated errors SHOULD preserve:

- Root cause.
- Relevant operation.
- Correlation identifier where available.
- Safe diagnostic context.

## Cleanup

Resources SHALL be released reliably even when an exception occurs.

Examples include database connections, file handles, locks, temporary resources, and network connections.

## Exception Safety

Error handling SHOULD avoid leaving partially modified state. Where atomicity is required, transactional mechanisms SHOULD be used.

# 9. Validation Errors

## Objective

Validation errors SHALL be detected as early as practical and SHALL provide actionable information to the responsible consumer.

## Validation Layers

Validation MAY occur at multiple boundaries:

```text
Transport
   ↓
Schema
   ↓
Application
   ↓
Domain
   ↓
Persistence
```

Each layer SHOULD validate the rules it owns.

## Transport Validation

Transport validation MAY verify required request structure, encoding, and content type.

## Schema Validation

Schema validation SHOULD verify required fields, data types, formats, allowed values, and structural constraints.

## Domain Validation

Domain validation SHALL enforce domain-specific rules that cannot be expressed purely through structural validation.

## Validation Response

When validation errors are exposed to consumers, the response SHOULD identify:

- Error code.
- Affected field or object where appropriate.
- Safe human-readable explanation.
- Corrective action where useful.

## Multiple Errors

APIs MAY return multiple validation failures in one response when doing so improves usability and does not create ambiguity.

## Sensitive Input

Validation errors SHALL NOT echo sensitive input unnecessarily.

## Validation vs Domain Errors

The system SHOULD distinguish malformed or invalid input from valid requests that violate a domain rule.

For example:

```text
quantity = "abc"
```

is a validation failure, while:

```text
quantity = 10
but only 5 units are available
```

is a domain failure.

# 10. Domain Errors

## Objective

Domain errors SHALL represent violations of explicit business or system-domain rules.

## Domain Ownership

Domain errors SHOULD be defined by the domain layer rather than by infrastructure implementation details.

## Examples

```text
ACCOUNT_SUSPENDED
ORDER_ALREADY_COMPLETED
INSUFFICIENT_BALANCE
SUBSCRIPTION_EXPIRED
INVALID_STATE_TRANSITION
```

## Explicit Semantics

Domain errors SHOULD communicate what domain rule prevented the operation.

## State Transitions

Invalid state transitions SHOULD produce explicit domain errors rather than generic failures.

Example:

```text
PENDING → CANCELLED
```

may be valid while:

```text
COMPLETED → CANCELLED
```

may be rejected with:

```text
ORDER_INVALID_STATE
```

## Domain Errors Are Not Infrastructure Errors

A domain rule failure SHALL NOT be represented as `INTERNAL_SERVER_ERROR` when the consumer can reasonably understand and act on the domain condition.

## User Communication

Domain errors MAY be translated into user-facing messages. The internal domain code SHOULD remain stable.

## Logging

Expected domain failures SHOULD NOT automatically be logged as critical system failures. Logging severity SHOULD reflect whether the event represents expected business behavior, suspicious behavior, or system malfunction.

# 11. Infrastructure Errors

## Objective

Infrastructure errors SHALL be isolated from domain semantics and handled according to their actual operational characteristics.

## Sources

Infrastructure errors MAY originate from databases, caches, message brokers, file systems, networks, operating-system resources, service discovery, and infrastructure APIs.

## Translation

Infrastructure-specific errors SHOULD be translated at the infrastructure boundary when exposing them to higher layers.

Example:

```text
PostgresConnectionError
        ↓
DatabaseUnavailableError
```

rather than exposing vendor-specific exceptions throughout the application.

## Retryability

Infrastructure errors SHALL NOT automatically imply that retry is safe.

Retryability SHOULD depend on operation idempotency, error semantics, dependency behavior, timeout state, system capacity, and retry budget.

## Availability

Infrastructure failures MAY require retry, fallback, circuit breaking, degradation, queueing, or immediate failure. The selected strategy SHOULD be explicit.

## Data Integrity

Infrastructure errors occurring during writes SHALL be evaluated for partial execution and transaction state.

The application SHOULD NOT assume:

```text
error = operation definitely did not happen
```

unless the underlying contract guarantees that behavior.

## Unknown Infrastructure State

When an operation's completion state is unknown, the system SHOULD use reconciliation, idempotency, or another correctness mechanism rather than blindly repeating the operation.

# 12. API Error Contracts

## Objective

APIs SHALL expose errors through stable, machine-readable contracts.

## Contract Requirements

An API error response SHOULD contain, where applicable:

```text
error code
message
request/correlation identifier
details
```

## Example

```json
{
  "error": {
    "code": "ORDER_INVALID_STATE",
    "message": "The order cannot be cancelled in its current state.",
    "request_id": "req_01HXYZ123",
    "details": {
      "current_state": "COMPLETED"
    }
  }
}
```

The exact response schema MAY differ by API standard.

## Stable Code

The `code` field SHOULD be the primary machine-readable identifier. Clients SHOULD NOT depend on the exact wording of `message`.

## HTTP Status

HTTP status codes SHOULD communicate the broad class of failure. The application error code SHOULD communicate the more specific semantic condition.

## Internal Errors

Internal implementation details SHOULD NOT be exposed directly through public API responses.

Avoid returning database stack traces, SQL statements, filesystem paths, internal hostnames, secret values, or framework exception names.

## Validation Details

Validation responses MAY include structured field-level details.

Example:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "One or more fields are invalid.",
    "details": {
      "email": "Invalid email format",
      "age": "Must be greater than or equal to 18"
    }
  }
}
```

## Correlation

Externally visible errors SHOULD include a correlation or request identifier when operationally useful.

## Contract Evolution

Changes to the API error contract SHALL follow the applicable API compatibility requirements. Existing consumers SHOULD NOT be broken unnecessarily by adding optional error metadata.

## Security

Error responses SHALL NOT disclose sensitive information or provide attackers with unnecessary implementation details.

# PART III — Recovery and Operations

# 13. Error Propagation

## Objective

Errors SHALL propagate through architectural boundaries without losing semantic meaning or causing unnecessary exposure of internal implementation details.

## Propagation Rule

An error SHOULD continue upward until a layer has sufficient context and authority to recover, translate, record, return, or escalate.

## Do Not Handle Prematurely

A lower-level component SHOULD NOT convert an error into a generic success state merely because it cannot handle the failure.

Bad pattern:

```text
Dependency fails
      ↓
Repository catches error
      ↓
Returns null
      ↓
Application assumes "not found"
```

## Semantic Preservation

When propagating an error, the system SHOULD preserve classification, error code, root cause, relevant context, retryability, and correlation information.

## Error Translation

Translation MAY occur when crossing a boundary. Each translation SHOULD add semantic value.

## Error Wrapping

When the implementation supports error chaining, wrapped errors SHOULD preserve the original cause.

## Context

Additional context MAY be attached when it improves diagnosis. Context SHOULD be relevant, accurate, safe, and necessary.

## Error Ownership

The component responsible for handling an error SHOULD be the component with enough information to make the correct decision.

## Terminal Handling

At a terminal boundary, an error SHALL result in an explicit outcome.

Possible outcomes include:

```text
Successful recovery
Controlled failure
Retry
Deferred processing
Rejected request
Escalation
Process termination
```

# 14. Retry and Recovery

## Objective

Retries SHALL be controlled, bounded, and based on the semantics of the failure.

## Retry Eligibility

An error SHOULD be retried only when all required conditions are satisfied:

- The failure is transient or conditionally recoverable.
- The operation can be safely repeated.
- The dependency is expected to recover.
- The retry count remains within the configured limit.
- The retry does not violate system capacity or rate limits.

## Non-Retryable Errors

The following SHOULD generally NOT be retried automatically:

```text
Validation errors
Authentication failures
Authorization failures
Invalid state transitions
Malformed requests
Unsupported operations
Permanent domain failures
Programming errors
```

## Idempotency

Non-idempotent operations SHALL NOT be blindly retried unless a mechanism exists to guarantee safe repetition.

Possible mechanisms include idempotency keys, deduplication, transaction identifiers, and conditional writes.

## Retry Count

Retries SHALL be bounded. An unbounded retry loop SHALL NOT be used.

## Backoff

Retries SHOULD use backoff. Exponential backoff SHOULD be preferred for repeated dependency failures where appropriate.

## Jitter

Jitter SHOULD be applied to distributed retry strategies when synchronized retries could create load spikes.

## Retry Budget

Systems with significant traffic SHOULD define a retry budget or equivalent mechanism to prevent retries from amplifying an existing outage.

## Rate Limits

Rate-limit responses SHOULD respect the dependency's specified retry guidance where available.

## Circuit Breaking

Circuit breaking MAY be used when repeated dependency failures could otherwise cause cascading failure.

## Fallbacks

Fallback behavior MAY be used when it preserves correctness. Fallbacks SHOULD NOT silently substitute incorrect or stale data when correctness requires authoritative data.

## Recovery

Recovery mechanisms SHOULD define trigger, maximum duration, state transition, observability, failure behavior, and escalation path.

## Retry Storm Prevention

Retries SHALL NOT cause uncontrolled amplification of load.

Systems SHOULD consider request rate, retry attempts, and the number of dependent components when evaluating retry behavior.

# 15. Timeouts and Cancellation

## Objective

External and potentially unbounded operations SHALL have explicit execution boundaries.

## Timeout Requirement

Operations involving external resources SHOULD define timeouts appropriate to the operation, including HTTP requests, database queries, RPC calls, queue operations, file operations, and distributed locks.

## Timeout Ownership

The component initiating an operation SHOULD define an appropriate upper execution boundary rather than relying indefinitely on downstream defaults.

## Timeout Budget

Distributed operations SHOULD propagate or derive timeout budgets where practical.

Example:

```text
Incoming Request: 5s
       ↓
Service A: 4s
       ↓
Service B: 2.5s
       ↓
Database: 1.5s
```

The exact values depend on the architecture.

## Timeout Semantics

A timeout SHALL NOT automatically imply that the underlying operation did not execute.

For example:

```text
Request timed out
       ↓
Server may still have completed the operation
```

Systems performing non-idempotent operations SHOULD account for this possibility.

## Cancellation

Operations SHOULD support cancellation when they may run for significant duration, the caller no longer requires the result, or continuing execution consumes meaningful resources.

## Cancellation Propagation

Cancellation SHOULD propagate to downstream operations where technically possible.

## Cleanup

Cancelled operations SHALL release resources reliably.

## Cancellation vs Failure

Cancellation SHOULD remain distinguishable from system failure.

## Deadline Exceeded

A timeout or deadline error SHOULD include sufficient context to identify the operation, boundary, relevant request or correlation identifier, and safe duration information.

# 16. Logging and Observability

## Objective

Important errors SHALL be observable without exposing sensitive information.

## Error Logging

Material failures SHOULD produce structured logs or equivalent telemetry.

## Structured Logging

Error events SHOULD contain structured fields where supported.

Typical fields MAY include:

```text
timestamp
severity
error_code
error_class
service
operation
request_id
trace_id
component
dependency
retry_count
```

## Root Cause

Logs SHOULD preserve the root cause when safe and useful.

## Stack Traces

Stack traces MAY be recorded for unexpected programming or infrastructure failures. Stack traces SHOULD NOT be exposed directly to untrusted consumers.

## Severity

Severity SHOULD reflect operational impact. Expected business-rule failures SHOULD NOT automatically be classified as critical infrastructure incidents.

## Metrics

Systems SHOULD expose error metrics for material failure classes.

Useful dimensions MAY include error code, service, endpoint, dependency, operation, and environment.

## Cardinality

Telemetry labels SHOULD avoid uncontrolled cardinality. Dynamic values such as user IDs, request bodies, and raw exception text SHOULD NOT be used as high-cardinality metric labels without strong justification.

## Tracing

Distributed operations SHOULD use correlation or tracing identifiers where applicable.

## Alerting

Alerts SHOULD be based on actionable failure conditions rather than every individual error event.

## Error Aggregation

Repeated identical failures SHOULD be aggregated where appropriate to prevent telemetry overload.

## Silent Failures

Critical failures SHALL NOT be discarded solely because logging is inconvenient.

# 17. Security and Sensitive Information

## Objective

Error handling SHALL protect sensitive information and SHALL NOT create unnecessary security exposure.

## Sensitive Information

Errors SHALL NOT expose:

- Passwords.
- Authentication tokens.
- API keys.
- Private keys.
- Session secrets.
- Payment credentials.
- Encryption keys.
- Security-sensitive configuration.
- Unnecessary personal information.

## Stack Traces

Internal stack traces SHALL NOT be exposed to untrusted clients.

## Database Errors

Raw database errors SHOULD NOT be returned directly through public interfaces.

The following SHOULD NOT be exposed:

```text
SQL syntax
table names
column names
database hosts
connection strings
query parameters containing secrets
```

## Authentication Errors

Authentication failures SHOULD provide only the information required by the legitimate consumer. The system SHOULD avoid revealing whether protected credentials or accounts exist when such disclosure creates a security risk.

## Authorization Errors

Authorization errors SHOULD avoid revealing unnecessary information about protected resources.

## Logging

Sensitive values SHOULD be excluded, redacted, masked, or tokenized as appropriate.

## Error Injection

Error messages containing untrusted input SHOULD be handled safely to prevent log injection, response injection, header injection, command injection, or query injection.

## Security Event Correlation

Security-sensitive errors MAY require additional telemetry or escalation according to applicable security standards.

## Error Detail Levels

Systems MAY expose different error detail levels for internal operators, trusted services, authenticated users, and untrusted clients. The level of detail SHALL be appropriate to the trust boundary.

# 18. User-Facing Errors

## Objective

User-facing errors SHOULD be understandable, actionable, and safe.

## Message Requirements

User-facing messages SHOULD:

- Explain the problem at an appropriate level.
- Avoid implementation details.
- Avoid blame.
- Provide corrective action where useful.
- Remain understandable without internal system knowledge.

## Machine vs Human Messages

Machine-readable error codes SHALL remain separate from human-readable messages.

Example:

```text
Code:
PAYMENT_INSUFFICIENT_FUNDS

Message:
Your payment could not be completed because the available balance is insufficient.
```

## Actionability

Where appropriate, the message SHOULD tell the user what to do next.

## Sensitive Information

User-facing messages SHALL NOT reveal secrets, internal architecture, database information, security controls, or private user data belonging to another user.

## Localization

Applications supporting multiple languages SHOULD keep error semantics independent from translated messages. Error codes SHOULD remain language-neutral.

## Consistency

Equivalent errors SHOULD produce consistent user-facing behavior across the system.

## Unexpected Errors

Unexpected internal failures SHOULD use a generic safe message. Detailed diagnostics SHOULD remain in internal telemetry.

# 19. Distributed Systems

## Objective

Error handling in distributed systems SHALL account for partial failure, uncertain execution state, and dependency interaction.

## Partial Failure

A distributed operation MAY fail in one component while succeeding in another. Systems SHALL NOT assume that a single observed error represents the complete state of the distributed operation.

## Unknown Completion State

When a caller cannot determine whether a remote operation completed, the system SHOULD use idempotency, reconciliation, status queries, durable operation identifiers, or transaction coordination where appropriate.

## Duplicate Delivery

Message consumers SHOULD assume that duplicate delivery MAY occur unless the messaging contract explicitly guarantees otherwise.

## Idempotent Consumers

Consumers of retryable or at-least-once messages SHOULD be idempotent where practical.

## Dead-Letter Handling

Message-processing systems MAY use dead-letter mechanisms for messages that cannot be safely processed after defined retry limits. Dead-letter queues SHOULD remain observable and operationally managed.

## Poison Messages

Messages that repeatedly fail because of malformed or permanently invalid content SHOULD NOT be retried indefinitely.

## Dependency Failure

A service SHOULD distinguish between its own failure, dependency failure, caller failure, and unknown distributed state.

## Cascading Failures

Services SHOULD avoid propagating uncontrolled load during dependency failures. Controls MAY include timeouts, circuit breakers, bounded retries, bulkheads, queueing, load shedding, and rate limiting.

## Correlation

Distributed errors SHOULD preserve a correlation or trace identifier across service boundaries where supported.

## Error Contracts

Inter-service error contracts SHOULD use stable machine-readable codes and documented semantics.

## Recovery

Distributed recovery SHOULD prioritize consistency and correctness over attempting to force immediate completion.

# PART IV — Testing and Governance

# 20. Testing Error Scenarios

## Objective

Error behavior SHALL be tested as deliberately as successful behavior.

## Error Path Coverage

Tests SHOULD cover validation, domain, authentication, authorization, dependency, timeout, cancellation, concurrency, resource exhaustion, unexpected exception, and recovery paths.

## Classification Tests

Tests SHOULD verify that known failures are assigned the correct classification.

## Retry Tests

Retry behavior SHOULD verify:

- Retryable errors are retried.
- Permanent errors are not retried.
- Retry limits are enforced.
- Backoff is applied.
- Jitter is applied where required.
- Non-idempotent operations are protected.
- Retry exhaustion produces a controlled failure.

## Timeout Tests

Tests SHOULD verify termination at the configured deadline, correct classification, resource release, downstream cancellation where supported, and safe handling of unknown completion state.

## Cancellation Tests

Tests SHOULD verify cancellation, cleanup, correct classification, and valid partial state.

## API Error Tests

API tests SHOULD verify HTTP status, error code, response structure, safe message, validation details, correlation identifier where applicable, and absence of sensitive internal information.

## Security Tests

Tests SHOULD verify that errors do not expose credentials, tokens, secrets, internal paths, database details, stack traces, or private information.

## Distributed Failure Tests

Distributed systems SHOULD test dependency timeout, dependency unavailable, duplicate messages, delayed messages, retry exhaustion, partial execution, unknown completion state, and circuit breaking where applicable.

## Regression Tests

Every material production failure SHOULD be evaluated for a regression test when practical.

# 21. Review Checklist

## Architecture

- [ ] Error ownership is defined.
- [ ] Error boundaries are explicit.
- [ ] Error propagation preserves semantics.
- [ ] Infrastructure errors are not leaked into domain logic unnecessarily.
- [ ] Recovery behavior is intentional.

## Classification

- [ ] Errors have meaningful classifications.
- [ ] Transient and permanent failures are distinguished.
- [ ] Unknown failures are handled conservatively.
- [ ] Severity reflects operational impact.

## Exceptions

- [ ] Exceptions are caught only when meaningful handling exists.
- [ ] Catch-and-ignore behavior is absent.
- [ ] Root causes are preserved.
- [ ] Resources are released on failure.
- [ ] Generic catch-all handling is limited to appropriate boundaries.

## Validation

- [ ] Validation occurs at the appropriate boundary.
- [ ] Validation errors are actionable.
- [ ] Domain errors are distinguished from malformed input.
- [ ] Sensitive input is not unnecessarily echoed.

## Retry

- [ ] Retry eligibility is explicit.
- [ ] Retry count is bounded.
- [ ] Backoff exists where required.
- [ ] Jitter is considered.
- [ ] Idempotency is addressed.
- [ ] Retry storms are prevented.
- [ ] Rate limits are respected.

## Timeouts

- [ ] External operations have appropriate timeouts.
- [ ] Timeout budgets are considered.
- [ ] Cancellation is supported where practical.
- [ ] Unknown completion state is handled safely.

## Observability

- [ ] Material failures are observable.
- [ ] Error codes are logged.
- [ ] Correlation identifiers are available where appropriate.
- [ ] Metrics do not create uncontrolled cardinality.
- [ ] Alerts are actionable.
- [ ] Sensitive information is protected.

## Security

- [ ] Stack traces are not exposed to untrusted clients.
- [ ] Secrets are not included in errors.
- [ ] Database details are not exposed.
- [ ] Authentication errors are safe.
- [ ] Authorization errors are safe.
- [ ] Untrusted input is safely represented.

## Testing

- [ ] Error paths are tested.
- [ ] Retry behavior is tested.
- [ ] Timeout behavior is tested.
- [ ] Cancellation behavior is tested.
- [ ] API error contracts are tested.
- [ ] Security exposure is tested.
- [ ] Distributed failure scenarios are tested where applicable.

# 22. Exceptions

## Objective

Exceptions to this standard MAY be granted when strict compliance is technically, operationally, or architecturally inappropriate.

## Acceptable Reasons

Exceptions MAY be justified by:

- Legacy systems.
- Third-party limitations.
- Framework constraints.
- Performance requirements.
- Regulatory requirements.
- Availability requirements.
- Migration constraints.
- Temporary compatibility requirements.

Convenience alone SHOULD NOT justify an exception.

## Exception Record

A material exception SHOULD document:

- Affected requirement.
- Affected component.
- Reason.
- Technical impact.
- Security impact.
- Operational impact.
- Compensating controls.
- Owner.
- Review date.
- Remediation plan where applicable.

## Temporary Exceptions

Temporary exceptions SHOULD include an explicit expiration or review condition.

## Repeated Exceptions

Repeated exceptions SHOULD trigger architectural review. If the same exception is repeatedly required, the underlying design SHOULD be reconsidered rather than accumulating permanent deviations.

# 23. Related Documents

This document forms part of the **AURA Engineering Standards** framework.

Related standards include:

- ARCHITECTURE_PRINCIPLES.md
- STYLE_GUIDE.md
- TESTING_STANDARD.md
- SECURITY.md
- API_DESIGN_STANDARD.md
- DATA_MODELING_STANDARD.md
- DEPENDENCY_POLICY.md
- OBSERVABILITY_STANDARD.md
- COMMIT_CONVENTION.md
- BRANCHING_STRATEGY.md
- RELEASE_PROCESS.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md

Related documentation MAY include:

- Incident response procedures.
- Disaster recovery procedures.
- Service-level objectives.
- Dependency-specific resilience requirements.
- Security incident procedures.
- API compatibility requirements.

Where multiple standards apply, the stricter applicable requirement SHOULD be followed unless an approved exception exists.

# 24. Versioning

## Version Policy

This document follows Semantic Versioning.

## Major Version

A Major Version SHALL indicate an incompatible change to mandatory error-handling requirements.

Examples include changing mandatory error semantics incompatibly, removing a mandatory security requirement, changing a required API error contract incompatibly, or removing a mandatory recovery control.

## Minor Version

A Minor Version SHALL indicate backward-compatible additions.

Examples include new error classifications, additional testing requirements, additional governance controls, and new recommended recovery mechanisms.

## Patch Version

A Patch Version SHALL contain non-breaking changes.

Examples include typographical corrections, formatting changes, clarifications, editorial improvements, and documentation corrections.

## Traceability

All revisions SHALL remain traceable through version control.

Material changes SHOULD reference the relevant incident, architecture decision, migration, or release documentation where applicable.

# 25. Document Status

## Document Information

| Field | Value |
|---|---|
| Status | Approved |
| Version | 1.0.0 |
| Classification | Engineering Standard |
| Owner | AURA Architecture Team |
| Document ID | GUIDE-ERR-0001 |
| Review Cycle | Annual |
| Next Review | YYYY-MM-DD |

## Authority

This document defines the official error-handling requirements for repositories governed by the **AURA Engineering Standards**.

## Compliance

Repositories governed by this standard SHOULD comply with its requirements unless an approved exception exists.

## Review

This document SHOULD be reviewed periodically against:

- Production incidents.
- Security events.
- Dependency failures.
- Distributed-system behavior.
- Observability requirements.
- API evolution.
- Operational experience.
- Testing coverage.

## Final Principle

A mature system does not measure reliability by the absence of errors.

It measures reliability by how predictably the system:

```text
Detects
   ↓
Classifies
   ↓
Contains
   ↓
Propagates
   ↓
Observes
   ↓
Recovers
   ↓
Learns
```

from failure.

# Appendix A — Error Classification Matrix

| Error Class | Typical Cause | Retry | User Action | Operational Attention |
|---|---|---|---|---|
| Validation | Invalid input | No | Correct input | Low |
| Domain | Business rule violation | Usually No | Change requested operation | Low/Medium |
| Authentication | Invalid identity credentials | Usually No | Re-authenticate | Medium |
| Authorization | Insufficient permission | No | Request appropriate access | Medium |
| Infrastructure | Internal resource failure | Conditional | Usually retry later | Medium/High |
| Dependency | External service failure | Conditional | Retry later | Medium/High |
| Configuration | Invalid system configuration | No | Correct configuration | High |
| Concurrency | Conflicting state change | Conditional | Retry or refresh state | Medium |
| Timeout | Operation exceeded deadline | Conditional | Retry if safe | Medium/High |
| Cancellation | Operation intentionally stopped | No | Retry if desired | Low |
| Programming | Implementation defect | No | None | High/Critical |
| Security | Security policy violation | Usually No | Follow security process | High/Critical |
| Resource | Capacity exhaustion | Conditional | Retry later | High |
| Unknown | Unclassified failure | Conservative | Retry only if proven safe | High |

# Appendix B — Error Code Guidelines

## Naming

Error codes SHOULD:

- Use uppercase characters.
- Use underscores as separators.
- Describe semantic conditions.
- Remain stable.
- Avoid implementation-specific terminology.

## Preferred

```text
USER_NOT_FOUND
ORDER_INVALID_STATE
PAYMENT_INSUFFICIENT_FUNDS
DEPENDENCY_UNAVAILABLE
DATABASE_TIMEOUT
```

## Avoid

```text
ERROR_123
BAD_THING
HTTP_500
POSTGRES_EXCEPTION
NULL_POINTER
```

## Domain Prefixes

Large systems MAY use domain prefixes:

```text
AUTH_INVALID_CREDENTIALS
PAYMENT_DECLINED
ORDER_INVALID_STATE
USER_NOT_FOUND
```

## Generic Codes

Generic codes MAY exist for broad boundaries:

```text
VALIDATION_FAILED
INTERNAL_ERROR
SERVICE_UNAVAILABLE
```

However, generic codes SHOULD NOT replace more specific semantic codes when the specific condition is known.

## Stability

Changing an error code SHOULD be treated as a compatibility change when consumers depend on it.

## Message Independence

Consumers SHALL NOT parse human-readable error messages to determine application behavior.

# Appendix C — Retry Classification Matrix

| Condition | Default Retry | Notes |
|---|---|---|
| Validation failure | No | Input must change |
| Authentication failure | No | Credentials/state must change |
| Authorization failure | No | Permission/state must change |
| Domain rule violation | No | Requested operation is invalid |
| Rate limit | Conditional | Respect server guidance |
| Temporary network failure | Yes | Bounded retry with backoff |
| Dependency unavailable | Conditional | Use retry budget |
| Dependency timeout | Conditional | Consider operation idempotency |
| Database connection failure | Conditional | Verify transaction state |
| Deadlock | Yes | Bounded retry where supported |
| Optimistic lock conflict | Conditional | Refresh state first |
| Resource exhaustion | Conditional | Avoid amplifying load |
| Programming error | No | Requires correction |
| Unknown error | Conservative | Do not assume retryability |
| Request cancellation | No | Caller explicitly stopped operation |

## Retry Preconditions

Before retrying, evaluate:

```text
Is the error retryable?
        +
Is the operation safe to repeat?
        +
Is the retry budget available?
        +
Is the dependency likely to recover?
        +
Will retry increase system instability?
```

Only when the relevant conditions are satisfied SHOULD an automatic retry occur.

# Appendix D — Error Handling Review Checklist

## Detection

- [ ] Failure conditions are detectable.
- [ ] Invalid states fail explicitly.
- [ ] Silent failures are prevented.

## Classification

- [ ] Error class is defined.
- [ ] Recoverability is defined.
- [ ] Severity is appropriate.
- [ ] Unknown errors are handled conservatively.

## Propagation

- [ ] Error ownership is clear.
- [ ] Root cause is preserved.
- [ ] Translation occurs only at meaningful boundaries.
- [ ] Infrastructure details do not leak unnecessarily.

## Retry

- [ ] Retryability is explicit.
- [ ] Retries are bounded.
- [ ] Backoff is configured.
- [ ] Jitter is considered.
- [ ] Idempotency is addressed.
- [ ] Retry amplification is controlled.

## Timeouts

- [ ] External operations have timeouts.
- [ ] Timeout budgets are appropriate.
- [ ] Cancellation is propagated where possible.
- [ ] Unknown completion state is handled.

## Observability

- [ ] Errors are logged appropriately.
- [ ] Error codes are recorded.
- [ ] Correlation IDs are preserved.
- [ ] Metrics are actionable.
- [ ] Alerts are meaningful.
- [ ] Telemetry cardinality is controlled.

## Security

- [ ] Secrets are not exposed.
- [ ] Stack traces are protected.
- [ ] Database details are hidden from untrusted consumers.
- [ ] Authentication errors are safe.
- [ ] Authorization errors are safe.
- [ ] Untrusted input is safely represented.

## API

- [ ] Error codes are stable.
- [ ] Human messages are separate from machine semantics.
- [ ] HTTP status codes are appropriate.
- [ ] Validation details are structured.
- [ ] Contract evolution is backward-compatible.

## Testing

- [ ] Error paths are covered.
- [ ] Retry behavior is tested.
- [ ] Timeout behavior is tested.
- [ ] Cancellation is tested.
- [ ] Security leakage is tested.
- [ ] Distributed failures are tested where applicable.
- [ ] Regression tests exist for material incidents.

## Governance

- [ ] Applicable standards are identified.
- [ ] Exceptions are documented.
- [ ] Ownership is defined.
- [ ] Changes are version-controlled.
- [ ] Review requirements are satisfied.

---

# End of Document
