# AURA Infrastructure Blueprint

**Status:** Accepted  
**Version:** 1.0.0

## 1. Topology

```text
Internet
  |
  v
DNS / Edge / TLS
  |
  v
Web/API Gateway
  |
  +--> Stateless API instances
  +--> Worker instances
  |
  +--> PostgreSQL
  +--> Object Storage
  +--> Cache / Queue (when required)
  +--> External Payment Providers
```

## 2. Environment Separation

Development, staging, and production SHALL use separate credentials and data boundaries. Production secrets SHALL never be reused in non-production environments.

## 3. Compute

API and worker processes SHALL be stateless. Local ephemeral storage SHALL not contain authoritative business data or irreplaceable educational assets.

## 4. Database

PostgreSQL SHALL be private to the application trust boundary. Public database exposure is prohibited unless explicitly justified by an ADR and compensating controls.

## 5. Object Storage

Educational/media assets SHALL use object storage with private-by-default access. Delivery SHALL use controlled application authorization and/or short-lived signed access where appropriate.

## 6. Queue / Async Processing

Asynchronous workloads SHALL be isolated from synchronous API latency. Critical events originate from the transactional outbox and are published by workers.

## 7. Network Boundaries

External traffic terminates at the edge. Internal services communicate through authenticated/private channels. Administrative interfaces SHALL not be publicly exposed without explicit controls.

## 8. Secrets

Secrets SHALL come from a managed secret mechanism or protected runtime configuration. Secrets SHALL never be committed to Git or logged.

## 9. Observability

Every production service SHALL emit structured logs, metrics, and traces appropriate to its role. Request IDs and event correlation IDs SHALL be propagated.

## 10. Availability

Stateless application capacity SHALL be horizontally scalable. Stateful components require documented backup, restore, and failure procedures.

## 11. Backups

PostgreSQL backups and critical object-storage recovery SHALL satisfy the RPO/RTO defined by the disaster recovery policy. Restore tests are mandatory evidence of backup validity.

## 12. Deployment

Production deployments SHALL use immutable/versioned artifacts and support rollback to a known-good release.

## 13. Security Baseline

TLS is mandatory for external traffic. Administrative access SHALL use least privilege, strong authentication, audited access, and restricted network exposure.

## 14. Capacity

Capacity planning SHALL track API throughput, database CPU/connections/storage, object storage growth, queue depth, and worker latency. Scaling thresholds SHALL be evidence-based.

## 15. Infrastructure-as-Code

Production infrastructure SHOULD be represented as code and reviewed through version control. Manual production changes SHALL be auditable.

## 16. Infrastructure Completion Gate

Before implementation is infrastructure-complete, the repository SHALL contain environment configuration, infrastructure-as-code or an approved equivalent, secret mappings, deployment topology, monitoring configuration, backup configuration, and restore procedures.
