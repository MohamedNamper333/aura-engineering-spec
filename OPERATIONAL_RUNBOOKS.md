# AURA Operational Runbooks

**Status:** Accepted  
**Version:** 1.0.0

## 1. General Incident Procedure

```text
Detect
 -> Triage
 -> Assign Incident Owner
 -> Contain
 -> Restore Service
 -> Verify
 -> Communicate
 -> Review
```

Never modify authoritative data merely to make dashboards look healthy.

## 2. Database Failure

1. Confirm database health and connectivity.
2. Freeze unsafe write paths if corruption is suspected.
3. Determine failure scope.
4. Promote approved recovery path if configured.
5. Restore from verified backup when required.
6. Validate integrity and critical invariants.
7. Reconcile asynchronous/outbox state.
8. Re-enable traffic gradually.

## 3. Payment Provider Failure

1. Detect elevated provider errors/timeouts.
2. Do not convert unknown outcomes into failures without policy.
3. Queue or mark reconciliation-required operations.
4. Preserve provider transaction identifiers.
5. Resume processing after provider recovery.
6. Reconcile mismatched internal/external states.

## 4. Security Incident

1. Preserve evidence.
2. Identify affected identities/resources.
3. Revoke/rotate compromised credentials.
4. Contain compromised services or accounts.
5. Assess unauthorized data access.
6. Restore from trusted artifacts if integrity is uncertain.
7. Validate security controls before reopening traffic.
8. Complete post-incident review.

## 5. Object Storage Failure

1. Determine whether metadata or objects are unavailable.
2. Keep database metadata authoritative.
3. Restore missing assets from verified recovery sources.
4. Revalidate content references.
5. Re-enable publication/delivery after integrity checks.

## 6. Queue / Event Failure

1. Inspect publisher/outbox health.
2. Confirm authoritative transactions are committed.
3. Retry bounded failures.
4. Quarantine poison messages.
5. Replay only with idempotency controls.
6. Verify downstream state.

## 7. Deployment Rollback

1. Stop rollout.
2. Confirm incident scope.
3. Select last known-good artifact.
4. Roll back application safely.
5. Assess database migration compatibility before rollback.
6. Run smoke tests.
7. Monitor recovery.

## 8. Secret Rotation

1. Identify compromised/expiring secret.
2. Create replacement credential.
3. Deploy replacement through protected configuration.
4. Verify service health.
5. Revoke old credential.
6. Audit usage and update recovery records.

## 9. Backup Restore Drill

Restore into an isolated environment. Validate database integrity, critical financial records, entitlements, audit evidence, content references, and application startup before considering the drill successful.

## 10. Severity

Severity definitions SHALL be finalized by operational policy, but incidents affecting financial correctness, authorization, data integrity, or broad availability SHALL receive priority over cosmetic or analytics failures.

## 11. Completion Gate

Every critical dependency SHALL have an executable or operator-tested runbook. Documentation without successful drill evidence SHALL be treated as unverified.
