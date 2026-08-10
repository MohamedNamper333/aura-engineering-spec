# AURA Testing Matrix

**Status:** Accepted  
**Version:** 1.0.0

| Domain | Unit | Integration | Contract | E2E | Security | Load |
|---|---:|---:|---:|---:|---:|---:|
| Identity | Required | Required | Required | Required | Required | Optional |
| Authorization | Required | Required | Required | Required | Required | Optional |
| Catalog/Content | Required | Required | Required | Required | Required | Optional |
| Orders | Required | Required | Required | Required | Required | Required |
| Payments | Required | Required | Required | Required | Required | Required |
| Refunds | Required | Required | Required | Required | Required | Required |
| Entitlements | Required | Required | Required | Required | Required | Required |
| Activation Codes | Required | Required | Required | Required | Required | Required |
| Learning Progress | Required | Required | Required | Required | Required | Required |
| Assessments | Required | Required | Required | Required | Required | Optional |
| Notifications | Required | Required | Required | Optional | Required | Optional |
| AI | Required | Required | Required | Required | Required | Required |
| Webhooks | Required | Required | Required | Required | Required | Required |

## Critical Scenarios

- Duplicate payment webhook.
- Payment timeout followed by provider confirmation.
- Duplicate activation-code redemption under concurrency.
- Refund exceeding refundable balance.
- Unauthorized content access.
- Revoked entitlement access.
- Stale learning-progress update.
- Replay of a domain event.
- Failed outbox publication.
- Poison message quarantine.
- Database restore.
- Deployment rollback.
- Secret rotation.

## Test Requirements

Every domain SHALL have deterministic unit tests for invariants and integration tests for persistence boundaries. Critical external contracts SHALL have contract tests. Critical user journeys SHALL have end-to-end tests.

Security tests SHALL cover authentication, authorization bypass, injection, secret exposure, file-upload abuse, webhook forgery, replay, and rate-limit controls.

Load tests SHALL focus on concurrency-sensitive operations and expected peak traffic rather than arbitrary throughput numbers.

## Completion Gate

Testing is implementation-complete only when the matrix is backed by executable tests and CI enforcement. A checklist alone is not test evidence.
