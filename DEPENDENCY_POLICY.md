---
document_id: GUIDE-DEP-0001
title: Dependency Policy
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

# Dependency Policy

---

# Revision History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial dependency policy. |

---

# Table of Contents

## Definitions
## Normative Language

## PART I — Dependency Philosophy
1. Purpose
2. Scope
3. Dependency Philosophy
4. Core Principles

## PART II — Dependency Management
5. Dependency Classification
6. Dependency Selection
7. Dependency Approval
8. Version Management
9. Lockfiles
10. Direct and Transitive Dependencies
11. Dependency Updates
12. Dependency Removal

## PART III — Dependency Security
13. Vulnerability Management
14. Supply Chain Security
15. License Compliance
16. Dependency Integrity
17. Automated Dependency Scanning
18. Deprecated and Unmaintained Dependencies
19. Emergency Dependency Response
20. Dependency Documentation

## PART IV — Governance
21. Review Checklist
22. Exceptions
23. Related Documents
24. Versioning
25. Document Status

## Appendices
- Appendix A — Dependency Risk Matrix
- Appendix B — Dependency Evaluation Checklist
- Appendix C — Update Classification Matrix
- Appendix D — Dependency Incident Checklist

# Definitions

The following definitions establish consistent terminology throughout this document.

## Dependency

A software component required by a project to build, execute, test, deploy, or operate.

## Direct Dependency

A dependency explicitly declared by the project.

Example:

```text
Application
    ↓
Library A
```

Library A is a direct dependency.

## Transitive Dependency

A dependency introduced indirectly through another dependency.

Example:

```text
Application
    ↓
Library A
    ↓
Library B
```

Library B is a transitive dependency.

## Runtime Dependency

A dependency required for the application to operate in its target environment.

## Development Dependency

A dependency required only for development, testing, linting, formatting, building, or other engineering activities.

## Dependency Manifest

A project file declaring dependency requirements.

Examples include:

```text
package.json
requirements.txt
pyproject.toml
Cargo.toml
go.mod
pom.xml
```

## Lockfile

A file recording resolved dependency versions and, where supported, integrity information.

Examples include:

```text
package-lock.json
pnpm-lock.yaml
yarn.lock
poetry.lock
Cargo.lock
```

## Dependency Update

A change that modifies the version or source of an existing dependency.

## Vulnerability

A weakness in a dependency that may negatively affect confidentiality, integrity, availability, or other security properties.

## Known Vulnerability

A vulnerability publicly identified by a recognized security advisory or vulnerability database.

## Dependency Source

The registry, repository, package server, artifact store, or other location from which a dependency is obtained.

## Dependency Integrity

The assurance that the dependency retrieved by the build system corresponds to the intended artifact.

## Maintained Dependency

A dependency that receives appropriate security, compatibility, and maintenance support from its maintainers.

## Unmaintained Dependency

A dependency for which active maintenance, security response, or meaningful project support is no longer reasonably available.

## Dependency Risk

The combined technical, security, operational, licensing, and maintenance risk introduced by a dependency.

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

# PART I — Dependency Philosophy

---

# 1. Purpose

## Objective

This document defines the standards governing the selection, introduction, maintenance, security, and removal of software dependencies within repositories governed by the **AURA Engineering Standards**.

## Mission

The policy exists to:

- Reduce unnecessary dependency risk.
- Improve software supply-chain security.
- Maintain reproducible builds.
- Control technical debt.
- Improve dependency visibility.
- Protect against vulnerable or compromised components.
- Establish consistent dependency governance.

## Dependency as an Engineering Decision

Adding a dependency SHALL be treated as an architectural and operational decision rather than a convenience-only decision.

A dependency introduces:

- Code.
- Transitive dependencies.
- Security exposure.
- Maintenance requirements.
- Licensing considerations.
- Upgrade obligations.
- Potential operational constraints.

## Expected Outcome

Dependency usage SHOULD remain intentional, visible, maintainable, and proportionate to the value provided.

# 2. Scope

## Objective

This policy applies to dependencies used by repositories governed by the **AURA Engineering Standards**.

## Applies To

This policy applies to:

- Application dependencies.
- Runtime dependencies.
- Development dependencies.
- Build dependencies.
- Test dependencies.
- CI/CD dependencies.
- Package-manager plugins.
- Build tools.
- Third-party SDKs.
- External libraries.
- Container dependencies where applicable.
- GitHub Actions and similar automation dependencies.

## Lifecycle

This policy applies throughout the dependency lifecycle:

```text
Evaluate
   ↓
Approve
   ↓
Introduce
   ↓
Monitor
   ↓
Update
   ↓
Replace or Remove
```

## Technology Independence

The policy SHALL remain independent of any specific:

- Programming language.
- Package manager.
- Framework.
- Operating system.
- Cloud provider.
- Registry.

Specific implementation mechanisms MAY differ between ecosystems.

## Repository Boundaries

Each repository MAY define stricter dependency requirements when justified by:

- Security sensitivity.
- Regulatory requirements.
- Deployment environment.
- Business criticality.
- Operational constraints.

# 3. Dependency Philosophy

## Objective

Dependencies SHOULD provide measurable engineering value while introducing the smallest practical amount of risk and complexity.

## Minimize Dependency Surface

Projects SHOULD avoid unnecessary dependencies.

A dependency SHOULD be introduced only when its benefits justify:

- Security exposure.
- Maintenance cost.
- Complexity.
- Upgrade requirements.
- Transitive dependency impact.

## Prefer Existing Capabilities

Before introducing a dependency, contributors SHOULD determine whether the required capability already exists within:

- The standard library.
- Existing project components.
- Existing approved dependencies.
- Platform capabilities.

## Avoid Reinventing Critical Infrastructure

Avoiding dependencies does not justify reimplementing mature security-sensitive or complex functionality without appropriate expertise.

Examples include:

- Cryptographic primitives.
- Authentication protocols.
- Serialization formats.
- Mature parsers.
- Security libraries.

## Explicit Ownership

Every production dependency SHOULD have an identifiable maintenance owner within the engineering organization.

## Lifecycle Awareness

Dependencies SHALL be evaluated not only for their current usefulness but also for their expected maintenance lifecycle.

## Expected Outcome

The dependency graph SHOULD remain intentionally small, understandable, and supportable.

# 4. Core Principles

## Principle 1 — Necessity

Dependencies SHALL have a justified purpose.

## Principle 2 — Least Dependency

Projects SHOULD use the smallest reasonable dependency surface.

## Principle 3 — Security by Design

Dependency security SHALL be evaluated before introduction and throughout the dependency lifecycle.

## Principle 4 — Visibility

Dependencies SHALL remain discoverable through project manifests, lockfiles, or supported dependency metadata.

## Principle 5 — Reproducibility

Builds SHOULD resolve dependencies deterministically.

## Principle 6 — Integrity

Dependency artifacts SHOULD be verified where ecosystem capabilities permit.

## Principle 7 — Maintainability

Projects SHOULD prefer dependencies with sustainable maintenance and security practices.

## Principle 8 — Controlled Updates

Dependency updates SHALL be reviewable and appropriately tested.

## Principle 9 — Minimal Trust

External dependencies SHALL NOT be trusted beyond the capabilities and permissions required by the application.

## Principle 10 — Traceability

Dependency changes SHALL remain traceable through version control and dependency-management tooling.

## Expected Outcome

Dependency management SHOULD reduce security, operational, and maintenance risk without unnecessarily restricting engineering productivity.

# PART II — Dependency Management

---

# 5. Dependency Classification

## Objective

Dependencies SHALL be classified according to their role in the system.

## Runtime Dependencies

Runtime dependencies are required for production execution.

Examples include:

- Web frameworks.
- Database clients.
- Authentication libraries.
- Serialization libraries.
- External service SDKs.

Runtime dependencies SHOULD receive the highest level of lifecycle and security attention.

## Development Dependencies

Development dependencies support engineering activities.

Examples include:

- Linters.
- Formatters.
- Test frameworks.
- Development servers.
- Code generators.

Development dependencies MAY have different operational requirements but SHALL still be subject to security and license review.

## Build Dependencies

Build dependencies are required to compile, package, or generate production artifacts.

Build dependencies SHOULD be treated as security-sensitive because they may execute code during the build process.

## Test Dependencies

Test dependencies support automated testing.

They SHOULD remain isolated from production runtime dependencies unless explicitly required.

## CI/CD Dependencies

CI/CD dependencies include:

- GitHub Actions.
- Build actions.
- Deployment tools.
- Automation scripts.
- CI plugins.

CI/CD dependencies SHALL be subject to the same supply-chain security principles as application dependencies.

## Container Dependencies

Where containerized applications are used, dependencies MAY include:

- Base images.
- OS packages.
- Runtime packages.
- Build images.

Container dependencies SHOULD be monitored independently from application package dependencies.

## Classification Accuracy

A dependency SHALL be classified according to its actual usage rather than merely its package-manager category.

## Expected Outcome

Dependency classification SHOULD make security, maintenance, and lifecycle responsibilities explicit.

# 6. Dependency Selection

## Objective

Dependencies SHALL be selected using explicit engineering criteria.

## Selection Criteria

Before introducing a dependency, contributors SHOULD evaluate:

- Functional suitability.
- Security posture.
- Maintenance activity.
- Release history.
- Community or vendor support.
- Documentation quality.
- Compatibility.
- License.
- Dependency footprint.
- Performance.
- Operational complexity.

## Functional Fit

A dependency SHOULD solve a clearly identified engineering requirement.

Dependencies SHOULD NOT be introduced solely because they are popular or convenient.

## Maintenance

Projects SHOULD prefer dependencies with:

- Active maintenance.
- Responsive maintainers.
- Published security processes.
- Predictable releases.
- Clear ownership.

## Security History

Known security weaknesses SHOULD be considered when evaluating a dependency.

A dependency with repeated unresolved security issues SHOULD receive increased scrutiny.

## Dependency Footprint

Contributors SHOULD consider the dependency's own transitive dependency graph.

A small library with hundreds of transitive dependencies MAY introduce more risk than a larger standalone library.

## Stability

Dependencies used in production SHOULD have a maturity level appropriate to the system's requirements.

Experimental or abandoned packages SHOULD NOT be used for critical functionality without documented justification.

## Duplicate Functionality

A new dependency SHOULD NOT duplicate functionality already provided by an approved dependency unless a documented technical reason exists.

## Expected Outcome

Dependency selection SHOULD maximize engineering value while minimizing long-term risk.

# 7. Dependency Approval

## Objective

New dependencies SHALL undergo an appropriate review before being introduced into production systems.

## Approval Requirements

The review SHOULD establish:

- Why the dependency is required.
- What functionality it provides.
- Which version is proposed.
- What license applies.
- What known vulnerabilities exist.
- What transitive dependencies are introduced.
- Who owns the dependency internally.

## Low-Risk Dependencies

Low-risk dependencies MAY follow the repository's normal pull-request review process.

Examples MAY include:

- Small development utilities.
- Well-maintained testing libraries.
- Non-production tooling.

## High-Risk Dependencies

Additional review SHOULD be required for dependencies involving:

- Authentication.
- Cryptography.
- Payments.
- Secrets.
- Network access.
- File-system access.
- Code execution.
- Production infrastructure.
- Personally identifiable information.

## Security Review

Security-sensitive dependencies SHOULD receive security review before production use.

## Architecture Review

A dependency that materially changes system architecture SHOULD receive architectural review.

## Approval Evidence

The dependency introduction SHOULD remain traceable through:

- Pull request.
- Dependency manifest.
- Review discussion.
- Security review where applicable.
- ADR or RFC when required.

## Expected Outcome

Dependency approval SHOULD ensure that new components enter the system intentionally rather than accidentally.

# 8. Version Management

## Objective

Dependency versions SHALL be explicitly managed.

## Version Constraints

Projects SHOULD use version constraints appropriate to the ecosystem and dependency risk.

Unbounded dependency versions SHOULD be avoided when they could introduce uncontrolled changes.

## Pinning

Security-sensitive or production-critical dependencies MAY require exact version pinning.

Example:

```text
library-x == 4.2.1
```

The exact strategy SHALL depend on the package ecosystem and repository requirements.

## Semantic Versioning

Where dependencies follow Semantic Versioning, projects SHOULD understand the implications of:

- Major versions.
- Minor versions.
- Patch versions.

Semantic Versioning SHALL NOT be treated as a guarantee that updates are risk-free.

## Pre-Releases

Pre-release versions SHOULD NOT be used in production unless explicitly justified.

Examples include:

```text
alpha
beta
rc
nightly
canary
```

## Unsupported Versions

End-of-life dependency versions SHOULD NOT remain in production without documented justification.

## Version Drift

Dependency versions SHOULD be periodically reviewed to prevent excessive divergence from maintained releases.

## Expected Outcome

Version management SHOULD provide predictable upgrades while minimizing uncontrolled dependency changes.

# 9. Lockfiles

## Objective

Where supported by the dependency ecosystem, repositories SHOULD maintain lockfiles for reproducible dependency resolution.

## Reproducibility

Lockfiles SHOULD record resolved versions and integrity information where supported.

## Version Control

Lockfiles SHALL be committed to version control when required by the repository's dependency-management strategy.

## Synchronization

Dependency manifests and lockfiles SHALL remain consistent.

A pull request that changes dependency requirements SHOULD update the corresponding lockfile when required by the package manager.

## Review

Lockfile changes SHALL be reviewed as part of dependency changes.

Reviewers SHOULD consider:

- Added packages.
- Removed packages.
- Version changes.
- Transitive dependency changes.
- Integrity metadata changes.

## Manual Modification

Lockfiles SHOULD NOT be manually modified unless the package ecosystem explicitly requires or supports such behavior.

Package-manager tooling SHOULD be preferred.

## Reproducible Builds

Build environments SHOULD use lockfiles or equivalent mechanisms to avoid unexpected dependency resolution.

## Expected Outcome

Lockfiles SHOULD reduce "works on my machine" behavior and improve build reproducibility.

# 10. Direct and Transitive Dependencies

## Objective

Projects SHALL distinguish between dependencies explicitly required by the project and dependencies introduced indirectly.

## Direct Dependencies

Direct dependencies SHALL be explicitly declared by the project.

Their purpose SHOULD be understandable from the project architecture or manifest.

## Transitive Dependencies

Transitive dependencies SHALL be treated as part of the project's effective dependency attack surface.

A project SHOULD NOT assume that transitive dependencies are irrelevant merely because they were not explicitly selected.

## Visibility

Dependency tooling SHOULD be used to identify:

- Dependency tree.
- Dependency versions.
- Dependency sources.
- Known vulnerabilities.

## Transitive Risk

A direct dependency introducing a large or high-risk transitive graph SHOULD receive additional scrutiny.

## Conflicting Versions

Projects SHOULD minimize unnecessary simultaneous versions of the same dependency.

Where multiple versions are unavoidable, the reason SHOULD be understood and documented when materially relevant.

## Dependency Overrides

Overrides or forced resolutions MAY be used when required to address:

- Security vulnerabilities.
- Compatibility issues.
- Broken transitive constraints.

Overrides SHOULD be documented and periodically reviewed.

## Expected Outcome

The effective dependency graph SHOULD remain visible, understandable, and controllable.

# 11. Dependency Updates

## Objective

Dependency updates SHALL be managed through controlled and reviewable changes.

## Update Sources

Updates MAY originate from:

- Routine maintenance.
- Security advisories.
- Automated dependency tools.
- Compatibility requirements.
- Performance improvements.
- Feature requirements.

## Testing

Dependency updates SHOULD pass the repository's required:

- Unit tests.
- Integration tests.
- Contract tests.
- Security checks.
- Build checks.

## Security Updates

Security updates SHOULD receive appropriate priority according to vulnerability severity and exposure.

## Grouped Updates

Multiple dependency updates MAY be grouped when:

- They are low risk.
- They belong to the same ecosystem.
- Testing remains understandable.
- Failures can be isolated.

Critical or high-risk updates SHOULD generally remain independently reviewable.

## Major Updates

Major dependency updates SHOULD receive additional compatibility analysis.

Reviewers SHOULD inspect:

- Breaking changes.
- Migration requirements.
- Removed APIs.
- Changed defaults.
- Security implications.

## Update Traceability

Dependency updates SHALL remain traceable through version control.

Automated update pull requests SHOULD NOT bypass required repository review.

## Expected Outcome

Dependency updates SHOULD be predictable, tested, and reversible where practical.

# 12. Dependency Removal

## Objective

Unused or unnecessary dependencies SHOULD be removed.

## Removal Criteria

A dependency SHOULD be considered for removal when:

- It is no longer required.
- Functionality has moved into the standard library.
- Functionality has been replaced.
- The dependency is abandoned.
- Security risk is unacceptable.
- Maintenance cost exceeds its value.
- The dependency creates unnecessary complexity.

## Removal Process

Removal SHOULD include:

1. Identify all usage.
2. Remove application references.
3. Remove manifest entries.
4. Update lockfiles.
5. Run relevant tests.
6. Run dependency scanning.
7. Review transitive dependency changes.

## Transitive Effects

Removing a direct dependency MAY also remove transitive dependencies.

The resulting dependency graph SHOULD be reviewed to ensure required functionality remains available.

## Documentation

Architecture or documentation references SHOULD be updated when dependency removal changes system behavior or design.

## Verification

A removed dependency SHALL NOT remain unintentionally referenced by:

- Source code.
- Build configuration.
- CI/CD configuration.
- Documentation.
- Deployment configuration.

## Expected Outcome

Dependency removal SHOULD reduce unnecessary attack surface, maintenance cost, and technical debt.

# PART III — Dependency Security

---

# 13. Vulnerability Management

## Objective

Known vulnerabilities in dependencies SHALL be identified, assessed, prioritized, and remediated according to their risk.

## Vulnerability Sources

Repositories SHOULD use trusted vulnerability sources where applicable, including:

- Package-manager security advisories.
- GitHub security advisories.
- National vulnerability databases.
- Vendor security advisories.
- Maintainer security announcements.

Automated tooling SHOULD be preferred where reliable ecosystem support exists.

## Severity

Vulnerabilities SHOULD be prioritized using factors including:

- Severity.
- Exploitability.
- Exposure.
- Reachability.
- Production usage.
- Privilege requirements.
- Availability of a fix.
- Business impact.

## Critical and High Severity

Critical and high-severity vulnerabilities SHALL receive expedited review.

Where a practical remediation exists, affected dependencies SHOULD be updated or replaced within a risk-appropriate timeframe.

## No-Fix Vulnerabilities

When no upstream fix exists, maintainers SHOULD evaluate:

- Alternative versions.
- Compensating controls.
- Dependency replacement.
- Feature isolation.
- Temporary removal.
- Risk acceptance.

## False Positives

Security findings MAY be determined to be false positives when sufficient technical evidence exists.

False-positive decisions SHOULD remain documented and reviewable.

## Risk Acceptance

Unresolved vulnerabilities MAY be accepted only when:

- The risk is understood.
- The affected functionality is evaluated.
- Compensating controls are considered.
- Appropriate ownership approves the decision.

## Tracking

Material unresolved vulnerabilities SHOULD remain tracked until:

- Remediated.
- Replaced.
- Formally accepted.
- No longer applicable.

## Expected Outcome

Dependency vulnerabilities SHOULD remain visible and receive action proportional to their actual risk.

# 14. Supply Chain Security

## Objective

Dependencies SHALL be treated as part of the software supply chain and SHALL be subject to appropriate supply-chain security controls.

## Dependency Sources

Repositories SHOULD prefer trusted and established dependency sources.

Unknown or untrusted package sources SHOULD NOT be used in production without explicit approval.

## Source Verification

Dependency sources SHOULD be explicitly identified.

Projects SHOULD avoid ambiguous dependency resolution that could cause packages to be retrieved from unintended sources.

## Package Substitution

Build systems SHOULD protect against unintended package substitution or dependency confusion.

Repository and package naming SHOULD be evaluated where public and private package registries coexist.

## Build Isolation

Dependency installation SHOULD occur within controlled build environments where practical.

## Least Privilege

Dependency installation and build processes SHOULD operate with the minimum permissions required.

## Automated Workflows

CI/CD workflows that install dependencies SHOULD:

- Use trusted actions and sources.
- Pin or constrain action versions according to repository policy.
- Avoid unnecessary privileges.
- Protect credentials.
- Review changes affecting dependency installation.

## Dependency Review

Dependency changes SHOULD be reviewed for:

- New dependencies.
- Removed dependencies.
- Version changes.
- Transitive changes.
- Known vulnerabilities.
- License changes.
- Unexpected package sources.

## Compromised Dependencies

If a dependency is suspected of compromise, maintainers SHALL treat the event as a potential security incident.

Affected versions SHOULD be isolated or removed according to incident-response procedures.

## Expected Outcome

Supply-chain controls SHOULD reduce the probability and impact of malicious or compromised dependency introduction.

# 15. License Compliance

## Objective

Dependencies SHALL comply with the licensing requirements applicable to the repository and its distribution model.

## License Identification

The license of a new dependency SHOULD be identified before approval.

## Approved Licenses

Repositories MAY maintain an approved-license list appropriate to their legal and business requirements.

Where no approved-license list exists, potentially restrictive licenses SHOULD receive additional review.

## License Changes

A dependency license change SHALL be treated as a potentially significant dependency change.

## Copyleft and Restrictive Licenses

Dependencies with licensing requirements that may materially affect:

- Distribution.
- Source-code disclosure.
- Commercial use.
- Modification.
- Linking.

SHOULD receive appropriate legal or governance review before introduction.

## License Metadata

Dependency license information SHOULD remain traceable through supported package metadata or repository documentation.

## Transitive Licenses

License review SHOULD consider relevant transitive dependencies where their licenses affect the project's distribution obligations.

## Compliance Records

Material license decisions SHOULD remain documented.

## Expected Outcome

Dependency selection SHOULD remain compatible with the project's legal and distribution requirements.

# 16. Dependency Integrity

## Objective

Repositories SHOULD verify that dependency artifacts correspond to the intended packages and versions.

## Integrity Metadata

Where supported, dependency managers SHOULD use:

- Checksums.
- Hashes.
- Integrity fields.
- Signed artifacts.
- Verified package metadata.

## Lockfile Integrity

Lockfiles SHOULD preserve dependency integrity information when supported by the ecosystem.

Unexpected integrity changes SHOULD be reviewed.

## Package Verification

Production builds SHOULD retrieve dependencies through trusted and controlled mechanisms.

## Artifact Signatures

Cryptographic signatures or provenance information MAY be used where the ecosystem provides reliable support.

## Unexpected Changes

Unexpected changes to:

- Package checksums.
- Package source.
- Maintainer identity.
- Artifact signatures.
- Release metadata.

SHOULD trigger additional review.

## Reproducibility

Builds SHOULD be reproducible from declared dependency state whenever practical.

## Expected Outcome

Dependency integrity controls SHOULD reduce the risk of executing unintended or tampered artifacts.

# 17. Automated Dependency Scanning

## Objective

Repositories SHOULD automate dependency security and lifecycle monitoring whenever supported by the development platform.

## Required Detection Areas

Automated dependency analysis SHOULD identify, where tooling supports it:

- Known vulnerabilities.
- Outdated dependencies.
- Dependency graph changes.
- License concerns.
- Transitive dependency risks.

## Continuous Monitoring

Production repositories SHOULD be monitored continuously or at an appropriate recurring interval.

Dependency security SHALL NOT depend exclusively on manual periodic inspection.

## Pull Request Integration

Dependency changes SHOULD trigger automated checks before merge.

Checks MAY include:

- Vulnerability scanning.
- Dependency review.
- License scanning.
- Build verification.
- Test execution.

## Failure Policy

Repositories MAY block merges when dependency changes violate defined security or compliance requirements.

Critical security findings SHOULD NOT be silently ignored.

## Automated Updates

Automated dependency update systems MAY be used.

Automated updates SHALL remain subject to:

- Required CI checks.
- Repository review rules.
- Security policy.
- Compatibility validation.

Automation SHALL NOT bypass governance.

## Alert Management

Security alerts SHOULD have clear ownership.

Alerts SHOULD be:

- Reviewed.
- Prioritized.
- Remediated.
- Closed with justification when applicable.

## Expected Outcome

Automation SHOULD reduce the time between dependency risk introduction, detection, and remediation.

# 18. Deprecated and Unmaintained Dependencies

## Objective

Repositories SHOULD avoid dependencies whose maintenance lifecycle presents unacceptable technical or security risk.

## Deprecated Dependencies

A deprecated dependency SHOULD be evaluated for replacement.

## Unmaintained Dependencies

An unmaintained dependency SHOULD receive additional scrutiny when it is:

- Internet-facing.
- Security-sensitive.
- Responsible for critical functionality.
- Frequently updated by the project.
- Exposed to untrusted input.

## Replacement Evaluation

Potential replacements SHOULD consider:

- Functional compatibility.
- Security posture.
- Maintenance quality.
- Migration complexity.
- License.
- Performance.
- Dependency footprint.

## Temporary Retention

An unmaintained dependency MAY remain temporarily when immediate replacement creates greater risk.

The decision SHOULD document:

- Reason for retention.
- Known risks.
- Compensating controls.
- Replacement plan.
- Review date.

## Abandoned Critical Dependencies

Critical functionality relying on abandoned dependencies SHOULD be escalated for architectural review.

## Expected Outcome

Dependency lifecycle risk SHOULD be identified before maintenance failure becomes an operational or security incident.

# 19. Emergency Dependency Response

## Objective

Security-critical dependency issues SHALL have an expedited response process.

## Trigger Conditions

Emergency response MAY be initiated when:

- A critical vulnerability is actively exploited.
- A dependency is confirmed compromised.
- Malicious code is discovered in a released artifact.
- Credentials or secrets may have been exposed through a dependency.
- A severe supply-chain attack is suspected.

## Immediate Actions

Maintainers SHOULD evaluate:

1. Affected versions.
2. Affected repositories.
3. Production exposure.
4. Exploitability.
5. Available patched versions.
6. Required containment.

## Containment

Where appropriate, teams MAY:

- Pin to a known-safe version.
- Block affected versions.
- Disable affected functionality.
- Remove the dependency.
- Isolate affected systems.
- Rotate potentially exposed credentials.

## Remediation

Remediation SHOULD include:

- Applying a trusted fix.
- Rebuilding affected artifacts.
- Running security validation.
- Verifying deployment state.
- Reviewing downstream impact.

## Incident Response

Confirmed compromise SHALL be handled according to the repository's security and incident-response procedures.

## Post-Incident Review

Significant dependency incidents SHOULD result in a post-incident review.

The review SHOULD consider:

- Detection speed.
- Response effectiveness.
- Supply-chain controls.
- Monitoring gaps.
- Preventive improvements.

## Expected Outcome

Emergency dependency response SHOULD minimize exposure duration and restore a trusted software state as quickly as practical.

# 20. Dependency Documentation

## Objective

Dependency information SHALL remain sufficiently documented to support maintenance, security review, and operational understanding.

## Manifest

Dependencies SHALL be declared through the package-management mechanism appropriate to the ecosystem.

## Ownership

Production-critical dependencies SHOULD have an identifiable engineering owner.

## Purpose

Non-obvious dependencies SHOULD document their purpose when that purpose cannot be reasonably inferred from the manifest or source code.

## Security-Sensitive Dependencies

Dependencies involving:

- Authentication.
- Cryptography.
- Payments.
- Secrets.
- Network security.
- Authorization.

SHOULD have additional documentation describing their role and security considerations.

## Exceptions

Dependency exceptions SHOULD document:

- Dependency.
- Exception reason.
- Risk.
- Approval.
- Review date.
- Planned remediation where applicable.

## Dependency Inventory

Repositories SHOULD maintain or generate an accurate dependency inventory where practical.

## Documentation Accuracy

Dependency documentation SHALL remain consistent with the actual dependency configuration.

## Expected Outcome

Dependency documentation SHOULD make the dependency graph understandable to maintainers, reviewers, and security personnel.

# PART IV — Governance

---

# 21. Review Checklist

## Objective

Dependency changes SHALL receive an appropriate level of engineering review before being merged.

## Functional Review

Reviewers SHOULD verify:

- [ ] The dependency has a clearly defined purpose.
- [ ] Existing approved dependencies cannot reasonably provide the same capability.
- [ ] The dependency is used only where required.
- [ ] The selected version is appropriate.
- [ ] The dependency classification is correct.

## Security Review

Reviewers SHOULD verify:

- [ ] Known vulnerabilities were evaluated.
- [ ] The dependency source is trusted.
- [ ] Supply-chain risks were considered.
- [ ] Dependency integrity is preserved.
- [ ] Transitive dependencies were considered.
- [ ] Security-sensitive functionality received additional review where required.

## License Review

Reviewers SHOULD verify:

- [ ] The dependency license is known.
- [ ] The license is compatible with project requirements.
- [ ] Relevant transitive licenses were considered.
- [ ] Material licensing decisions are documented.

## Maintenance Review

Reviewers SHOULD verify:

- [ ] The dependency is actively maintained.
- [ ] Security advisories are monitored.
- [ ] The dependency lifecycle is acceptable.
- [ ] An upgrade path exists where appropriate.
- [ ] The dependency does not introduce unnecessary maintenance burden.

## Reproducibility Review

Reviewers SHOULD verify:

- [ ] The dependency manifest is updated.
- [ ] The lockfile is updated where applicable.
- [ ] Integrity information is preserved.
- [ ] CI can reproduce the dependency resolution.

## Testing Review

Reviewers SHOULD verify:

- [ ] Required tests pass.
- [ ] Build verification passes.
- [ ] Security scanning passes.
- [ ] Dependency-specific regression risks were considered.

## Documentation Review

Reviewers SHOULD verify:

- [ ] Dependency purpose is documented where necessary.
- [ ] Ownership is identifiable for critical dependencies.
- [ ] Exceptions are documented.
- [ ] Related architecture documentation is updated where required.

## Expected Outcome

Dependency changes SHOULD be approved only after their functional, security, licensing, maintenance, and operational implications are sufficiently understood.

# 22. Exceptions

## Objective

Exceptions to this policy MAY be granted when strict compliance creates a justified engineering, operational, security, or compatibility constraint.

## Acceptable Reasons

Exceptions MAY be justified by:

- Legacy compatibility.
- Critical security remediation.
- Regulatory requirements.
- Third-party platform requirements.
- Temporary migration constraints.
- Lack of a suitable maintained alternative.
- Emergency incident response.
- Performance-critical requirements.

Convenience alone SHOULD NOT justify an exception.

## Exception Requirements

A material exception SHOULD document:

- Dependency name.
- Affected requirement.
- Reason for exception.
- Security impact.
- Operational impact.
- Alternatives considered.
- Compensating controls.
- Owner.
- Review date.
- Remediation or replacement plan where applicable.

## Security Exceptions

Security-related exceptions SHALL receive appropriate security review.

An exception SHALL NOT be used to permanently ignore a known critical vulnerability without documented risk acceptance.

## Temporary Exceptions

Temporary exceptions SHOULD include explicit expiration or review criteria.

## Repeated Exceptions

Repeated exceptions SHOULD trigger architectural review.

If an exception becomes common practice, the underlying policy SHOULD be reconsidered rather than accumulating permanent deviations.

# 23. Related Documents

This document forms part of the **AURA Engineering Standards** framework.

Related standards include:

- ARCHITECTURE_PRINCIPLES.md
- STYLE_GUIDE.md
- TESTING_STANDARD.md
- SECURITY.md
- API_DESIGN_STANDARD.md
- COMMIT_CONVENTION.md
- BRANCHING_STRATEGY.md
- RELEASE_PROCESS.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md

Related security and supply-chain documentation MAY include:

- Security policies.
- Incident-response procedures.
- Vulnerability-management procedures.
- CI/CD security standards.
- Container security standards.

Where multiple standards apply, the stricter applicable requirement SHOULD be followed unless an approved exception exists.

# 24. Versioning

## Version Policy

This document follows Semantic Versioning.

## Major Version

A Major Version SHALL indicate an incompatible change to the dependency governance requirements.

Examples include:

- Removal of mandatory security controls.
- Fundamental changes to dependency approval requirements.
- Incompatible changes to dependency lifecycle governance.

## Minor Version

A Minor Version SHALL indicate backward-compatible additions.

Examples include:

- Additional security controls.
- New dependency review requirements.
- Additional documentation requirements.
- New governance mechanisms.

## Patch Version

A Patch Version SHALL contain non-breaking changes.

Examples include:

- Typographical corrections.
- Formatting changes.
- Clarifications.
- Editorial improvements.

## Traceability

All revisions SHALL remain traceable through version control.

Significant changes SHOULD include appropriate release or governance documentation.

# 25. Document Status

## Document Information

| Field | Value |
|-------|-------|
| Status | Approved |
| Version | 1.0.0 |
| Classification | Engineering Standard |
| Owner | AURA Architecture Team |
| Document ID | GUIDE-DEP-0001 |
| Review Cycle | Annual |
| Next Review | YYYY-MM-DD |

## Authority

This document defines the official dependency-management requirements for repositories governed by the **AURA Engineering Standards**.

## Compliance

Repositories governed by this standard SHOULD comply with its requirements unless an approved exception exists.

## Review

This document SHOULD be reviewed periodically against:

- Dependency ecosystem changes.
- Security threats.
- Supply-chain incidents.
- Licensing requirements.
- Repository architecture.
- Operational experience.
- Dependency-management tooling.

## Final Principle

A dependency is not merely code imported into a project.

It is a component of the system's:

- Attack surface.
- Supply chain.
- Build process.
- Licensing obligations.
- Maintenance burden.
- Operational reliability.

Dependency decisions SHALL therefore be evaluated according to their complete lifecycle rather than their immediate implementation convenience.

---

# Appendix A — Dependency Risk Matrix

| Risk Level | Typical Characteristics | Review Level |
|------------|-------------------------|--------------|
| Low | Development-only, mature, low privilege, well maintained | Standard PR review |
| Medium | Production use, moderate dependency graph, network interaction | Engineering review |
| High | Security-sensitive, privileged, large transitive graph, critical production role | Engineering + Security review |
| Critical | Authentication, cryptography, payments, secrets, infrastructure control, or severe supply-chain exposure | Engineering + Security + Architecture review |

## Risk Factors

Risk SHOULD consider:

- Production exposure.
- Privileges.
- Network access.
- File-system access.
- Code execution capability.
- Sensitive-data access.
- Maintenance quality.
- Vulnerability history.
- Dependency graph size.
- License restrictions.
- Package source trust.
- Business criticality.

## Risk Adjustment

A dependency MAY be assigned a higher risk level when multiple moderate-risk characteristics combine.

Risk classification SHOULD reflect actual system exposure rather than package popularity alone.

# Appendix B — Dependency Evaluation Checklist

## Functional

- [ ] What problem does the dependency solve?
- [ ] Is the functionality already available?
- [ ] Is the dependency technically appropriate?
- [ ] Is the dependency actively maintained?

## Security

- [ ] Are known vulnerabilities reviewed?
- [ ] Is the package source trusted?
- [ ] Are transitive dependencies understood?
- [ ] Does the dependency execute privileged code?
- [ ] Does it process untrusted input?
- [ ] Does it access secrets or sensitive data?
- [ ] Are integrity mechanisms available?

## Maintenance

- [ ] Is there an active maintenance team?
- [ ] Is the release history reasonable?
- [ ] Is there a documented security process?
- [ ] Is there a viable upgrade path?
- [ ] Is the dependency likely to remain supported?

## Licensing

- [ ] Is the license known?
- [ ] Is the license compatible?
- [ ] Are transitive licenses relevant?
- [ ] Is additional legal review required?

## Operations

- [ ] Does the dependency affect application startup?
- [ ] Does it affect performance?
- [ ] Does it introduce external services?
- [ ] Does it increase deployment complexity?

## Reproducibility

- [ ] Is the dependency version controlled?
- [ ] Is a lockfile available?
- [ ] Is artifact integrity recorded?
- [ ] Can CI reproduce the dependency graph?

## Governance

- [ ] Is an internal owner identified?
- [ ] Is the dependency risk classified?
- [ ] Is additional review required?
- [ ] Are exceptions documented?

## Approval Decision

The dependency SHOULD be approved only when the identified risks are understood and acceptable.

# Appendix C — Update Classification Matrix

| Update Type | Typical Risk | Required Consideration |
|-------------|--------------|------------------------|
| Patch | Low–Medium | Regression and security review |
| Minor | Medium | Compatibility and regression review |
| Major | Medium–High | Breaking-change and migration review |
| Security Patch | Risk-dependent | Severity and exposure assessment |
| Pre-release | High | Explicit justification |
| Source Change | Risk-dependent | Provenance and integrity review |
| Dependency Replacement | Medium–High | Functional, security, license, and compatibility review |

## Patch Updates

Patch updates SHOULD normally receive standard automated testing.

## Minor Updates

Minor updates SHOULD be reviewed for:

- New features.
- Changed defaults.
- Security changes.
- Compatibility implications.

## Major Updates

Major updates SHALL receive explicit compatibility review.

## Security Updates

Security updates SHOULD be prioritized according to:

- Severity.
- Exploitability.
- Production exposure.
- Availability of remediation.

## Pre-release Updates

Pre-release versions SHOULD NOT be introduced into production without documented justification.

## Replacement

Replacing one dependency with another SHOULD be treated as a dependency introduction and removal operation simultaneously.

Both the new dependency and the removed dependency SHOULD be evaluated.

# Appendix D — Dependency Incident Checklist

## Detection

- [ ] Identify the affected dependency.
- [ ] Identify affected versions.
- [ ] Confirm the vulnerability or compromise.
- [ ] Identify affected repositories.
- [ ] Determine production exposure.

## Assessment

- [ ] Determine exploitability.
- [ ] Determine affected functionality.
- [ ] Identify sensitive data exposure.
- [ ] Identify affected credentials.
- [ ] Identify affected builds or releases.
- [ ] Identify downstream consumers.

## Containment

- [ ] Block affected versions where possible.
- [ ] Pin to a known-safe version where appropriate.
- [ ] Disable affected functionality if necessary.
- [ ] Isolate affected systems.
- [ ] Rotate potentially exposed credentials.
- [ ] Prevent vulnerable artifacts from further deployment.

## Remediation

- [ ] Apply trusted remediation.
- [ ] Update dependency manifests.
- [ ] Update lockfiles.
- [ ] Rebuild affected artifacts.
- [ ] Run security scans.
- [ ] Run required tests.
- [ ] Verify deployed versions.

## Recovery

- [ ] Confirm affected systems use safe dependency versions.
- [ ] Confirm vulnerable artifacts are no longer deployed.
- [ ] Confirm required credentials have been rotated.
- [ ] Monitor for residual exploitation.
- [ ] Restore normal deployment processes.

## Post-Incident Review

- [ ] Document root cause.
- [ ] Document detection mechanism.
- [ ] Document response timeline.
- [ ] Identify control failures.
- [ ] Identify monitoring gaps.
- [ ] Improve dependency controls.
- [ ] Update documentation.
- [ ] Track follow-up actions.

## Closure

An incident SHOULD be closed only after remediation has been verified and required follow-up actions have owners.

# End of Document
