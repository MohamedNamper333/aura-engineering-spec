# AURA CI/CD Specification

**Status:** Accepted  
**Version:** 1.0.0

## 1. Pipeline

```text
Pull Request
 -> Format/Lint
 -> Type Check
 -> Unit Tests
 -> Integration Tests
 -> Security Scans
 -> Build
 -> Artifact Verification
 -> Staging Deploy
 -> Smoke Tests
 -> Production Approval
 -> Production Deploy
 -> Post-Deploy Verification
```

## 2. Branch Protection

Protected branches SHALL require successful required checks and review according to repository governance. Direct production deployment from an unreviewed commit is prohibited.

## 3. Build Reproducibility

Builds SHALL use locked dependency versions where supported and produce version-identifiable artifacts.

## 4. Security Gates

CI SHALL include dependency vulnerability scanning, secret detection, and static analysis appropriate to the implementation stack.

## 5. Test Gates

A release SHALL fail when mandatory unit, integration, contract, or security tests fail.

## 6. Deployment Strategy

Production deployment SHALL use a known artifact built by CI rather than rebuilding arbitrary source on the production host.

## 7. Database Migrations

Migrations SHALL execute through controlled deployment automation. Destructive migrations require compatibility planning and explicit review.

## 8. Rollback

Every production release SHALL identify its rollback artifact and rollback procedure before deployment.

## 9. Secrets

CI logs SHALL redact secrets. Production credentials SHALL be injected at deployment/runtime and SHALL not be stored in repository files.

## 10. Post-Deploy

Deployment verification SHALL include health checks and critical business smoke tests. Failed verification SHALL trigger rollback or incident handling according to severity.

## 11. Completion Gate

The implementation repository SHALL contain executable CI configuration, deployment workflows, test commands, security checks, artifact strategy, and rollback automation before CI/CD is considered complete.
