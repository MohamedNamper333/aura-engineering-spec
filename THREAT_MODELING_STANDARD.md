---

document_id: STANDARD-THREAT-0001
title: Threat Modeling Standard
status: Approved
version: 1.0.0
owner: AURA Security Team
classification: Security Standard
review_cycle: Annual
review_owner: AURA Security Team
approved_by: Repository Maintainers
effective_date: YYYY-MM-DD
supersedes: null
superseded_by: null
-------------------

# Threat Modeling Standard

## Revision History

| Version | Date       | Description                       |
| ------- | ---------- | --------------------------------- |
| 1.0.0   | YYYY-MM-DD | Initial threat modeling standard. |

---

# Table of Contents

## Definitions

## Normative Language

## PART I — Threat Modeling Foundation

1. Purpose
2. Scope
3. Threat Modeling Objectives
4. Core Principles
5. Threat Model Ownership
6. Assets
7. Trust Boundaries
8. Attack Surface
9. Threat Actors

## PART II — Threat Identification and Analysis

10. System Decomposition
11. Data Flow Modeling
12. Threat Identification
13. STRIDE Classification
14. Abuse Cases
15. Risk Assessment
16. Risk Scoring
17. Threat Prioritization

## PART III — Mitigation and Security Controls

18. Mitigation Strategy
19. Security Control Requirements
20. Authentication and Authorization Threats
21. Data and Privacy Threats
22. Infrastructure Threats
23. Third-Party and Supply-Chain Threats
24. Residual Risk
25. Threat Acceptance

## PART IV — Governance and Lifecycle

26. Threat Model Review
27. Change Management
28. Continuous Validation
29. Exceptions
30. Related Documents
31. Versioning
32. Document Status

## Appendix A — Threat Classification Matrix

## Appendix B — Risk Scoring Matrix

## Appendix C — Threat Model Lifecycle Matrix

## Appendix D — Threat Modeling Review Checklist

---

# Definitions

## Threat

A potential condition, event, actor, or action capable of causing harm to an asset or violating a security property.

## Threat Model

A structured representation of system assets, trust boundaries, attack surfaces, threats, risks, and mitigations.

## Threat Actor

An entity capable of intentionally or unintentionally causing a security-impacting event.

## Asset

Anything requiring protection because its compromise could affect confidentiality, integrity, availability, safety, privacy, or business operations.

## Attack Surface

The collection of interfaces, components, inputs, dependencies, and execution paths through which a system can be influenced or attacked.

## Trust Boundary

A boundary across which the level of trust, authority, privilege, or security assumptions changes.

## Data Flow

The movement of data between components, processes, stores, users, or external systems.

## Abuse Case

A description of how a system capability could be intentionally misused to produce an undesirable result.

## Vulnerability

A weakness that can be exploited to violate a security property.

## Exploit

A technique, action, or mechanism used to take advantage of a vulnerability.

## Mitigation

A technical, procedural, or architectural measure that reduces the likelihood or impact of a threat.

## Security Control

A mechanism designed to prevent, detect, contain, or recover from security threats.

## Residual Risk

The risk remaining after applicable controls and mitigations are implemented.

## Risk Acceptance

A formal decision to tolerate a defined residual risk under specified conditions.

## Threat Scenario

A concrete description connecting an actor, capability, attack path, target, and potential impact.

## Security Property

A property such as:

* Confidentiality.
* Integrity.
* Availability.
* Authenticity.
* Authorization.
* Accountability.
* Privacy.
* Non-repudiation.

---

# Normative Language

The keywords **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are interpreted according to RFC 2119.

---

# PART I — Threat Modeling Foundation

# 1. Purpose

This standard defines how AURA systems SHALL identify, analyze, prioritize, mitigate, and continuously review security threats.

Threat modeling SHALL be treated as an architectural security activity rather than a documentation exercise performed only after implementation.

---

## Primary Objective

The objective is to identify security risks early enough that architecture and implementation can address them before they become expensive or difficult to remediate.

The threat modeling process SHOULD answer:

```text
What are we protecting?
Who could attack or misuse it?
How could they reach it?
What could they do?
What would happen?
How likely is it?
How severe is the impact?
What controls reduce the risk?
What risk remains?
```

---

# 2. Scope

This standard applies to systems and changes that materially affect security.

It MAY apply to:

* Applications.
* APIs.
* Services.
* Databases.
* Authentication systems.
* Authorization systems.
* Infrastructure.
* Cloud environments.
* CI/CD pipelines.
* External integrations.
* Mobile applications.
* Web applications.
* Internal platforms.
* Data-processing systems.

---

## Mandatory Modeling Triggers

Threat modeling SHOULD be performed for:

* New systems.
* New public-facing services.
* New authentication mechanisms.
* New authorization models.
* Significant data-flow changes.
* New sensitive-data processing.
* Major architectural changes.
* New external integrations.
* New privileged operations.
* Significant infrastructure changes.

---

## Risk-Based Scope

Not every minor code change requires a complete threat model.

The depth of analysis SHALL be proportional to:

```text
System Criticality
+
Data Sensitivity
+
Exposure
+
Privilege
+
Change Impact
+
Threat Environment
```

---

# 3. Threat Modeling Objectives

Threat modeling SHALL seek to identify:

## Assets

What must be protected?

## Actors

Who can interact with the system?

## Entry Points

Where can external input or control enter?

## Trust Boundaries

Where do security assumptions change?

## Threats

What could go wrong intentionally or unintentionally?

## Attack Paths

How could an actor move from an entry point to an asset?

## Impact

What would happen if the threat succeeds?

## Controls

What prevents, detects, or limits the threat?

## Residual Risk

What remains after mitigation?

---

# 4. Core Principles

AURA threat modeling SHALL follow these principles.

## Principle 1 — Model Before High-Risk Implementation

Security-critical architectural decisions SHOULD be threat-modeled before implementation.

---

## Principle 2 — Protect Assets

Threat modeling SHALL begin with assets and their required security properties.

---

## Principle 3 — Trust Must Be Explicit

Trust assumptions SHALL NOT remain implicit where they materially affect security.

---

## Principle 4 — Boundaries Matter

Threats SHALL be evaluated at trust boundaries and system interfaces.

---

## Principle 5 — Assume Adversarial Input

Externally influenced input SHALL be treated as potentially malicious.

---

## Principle 6 — Threats Must Be Actionable

Threat identification SHOULD result in a concrete mitigation, monitoring requirement, accepted risk, or explicit decision.

---

## Principle 7 — Prioritize Risk

Not all threats require equal engineering effort.

Risk SHALL be prioritized according to meaningful likelihood and impact.

---

## Principle 8 — Defense in Depth

Critical security properties SHOULD NOT depend on a single control where failure of that control would create unacceptable risk.

---

## Principle 9 — Minimize Privilege

Attack paths SHOULD be constrained through least privilege.

---

## Principle 10 — Design for Failure

Threat models SHALL consider failures of:

* Authentication.
* Authorization.
* Dependencies.
* Networks.
* Storage.
* Monitoring.
* Security controls.

---

## Principle 11 — Residual Risk Must Be Visible

Unresolved material security risks SHALL NOT be hidden by incomplete threat modeling.

---

## Principle 12 — Threat Models Evolve

A threat model SHALL be updated when material system architecture or threat conditions change.

---

# 5. Threat Model Ownership

## Owner

Every material threat model SHALL have an identifiable owner.

---

## Owner Responsibilities

The owner SHALL be responsible for:

* Maintaining the threat model.
* Coordinating reviews.
* Tracking mitigations.
* Recording accepted risks.
* Updating the model after material architecture changes.
* Ensuring security assumptions remain valid.

---

## Shared Responsibility

Threat modeling SHOULD involve the relevant:

* Architects.
* Developers.
* Security engineers.
* Operations engineers.
* Data owners.
* Product owners.

Security SHALL NOT be treated as the sole responsibility of the security team.

---

# 6. Assets

## Principle

Threat modeling SHALL identify assets before evaluating threats.

---

## Asset Categories

Assets MAY include:

```text
Credentials
Tokens
Personal Data
Financial Data
Business Data
Source Code
Infrastructure
Databases
Cryptographic Keys
APIs
User Accounts
Administrative Functions
Production Systems
Logs
Backups
Build Artifacts
```

---

## Asset Classification

Assets SHOULD be classified according to required:

* Confidentiality.
* Integrity.
* Availability.
* Authenticity.
* Privacy.

---

## Sensitive Assets

High-value assets SHOULD receive explicit threat analysis.

Examples:

```text
Authentication credentials
Payment information
Encryption keys
Administrative privileges
Production databases
Personal information
```

---

## Asset Ownership

Every material asset SHOULD have an identifiable owner.

---

# 7. Trust Boundaries

## Principle

A trust boundary exists whenever security assumptions or authority change.

---

## Examples

```text
Internet
   │
   ▼
Public API
   │
   ├── Trust Boundary
   ▼
Application
   │
   ├── Trust Boundary
   ▼
Database
```

Other examples include:

* User → Browser.
* Browser → API.
* Service → Service.
* Application → Third-party API.
* CI → Deployment environment.
* Application → Secret manager.
* Production → Development environment.

---

## Boundary Analysis

Every material trust boundary SHOULD identify:

* Source.
* Destination.
* Data crossing.
* Authentication requirements.
* Authorization requirements.
* Validation requirements.
* Trust assumptions.
* Failure behavior.

---

## Boundary Crossing

Data crossing a trust boundary SHALL be treated according to the security requirements of the receiving component.

---

# 8. Attack Surface

## Principle

Threat modeling SHALL identify meaningful attack surfaces.

---

## Attack Surface Categories

Attack surfaces MAY include:

```text
HTTP Endpoints
APIs
Web Interfaces
Authentication Flows
File Uploads
Message Queues
Databases
Network Ports
Webhooks
Third-Party Integrations
Administrative Interfaces
CI/CD Systems
Dependencies
Container Images
Cloud Resources
```

---

## Attack Surface Inventory

The threat model SHOULD maintain an inventory of significant externally reachable or security-sensitive entry points.

---

## Attack Surface Reduction

Architecture SHOULD minimize unnecessary attack surface.

Examples:

* Remove unused endpoints.
* Disable unnecessary services.
* Reduce exposed ports.
* Remove unused dependencies.
* Restrict administrative interfaces.
* Minimize privileges.

---

# 9. Threat Actors

## Actor Categories

Threat actors MAY include:

### Unauthenticated External Actor

An actor with no established identity or trust relationship.

### Authenticated User

A legitimate user who may attempt unauthorized actions.

### Privileged User

An actor with elevated privileges.

### Malicious Insider

An authorized individual intentionally abusing access.

### Compromised Account

A legitimate account controlled by an attacker.

### Compromised Service

A trusted service or dependency that has been compromised.

### Third-Party Provider

An external system whose behavior can affect the security of AURA systems.

### Automated Attacker

Bots, scanners, malware, or automated exploitation systems.

---

## Actor Capability

Threat models SHOULD distinguish between actors based on:

```text
Access
Knowledge
Privileges
Resources
Persistence
Technical Capability
```

---

## Threat Actor Assumptions

Assumptions about attacker capabilities SHOULD be explicit.

Threat models SHOULD avoid relying on statements such as:

```text
"An attacker would never know this."
```

or:

```text
"Nobody would try that."
```

unless the assumption is supported by a meaningful security boundary.

---

# End of PART I




# PART II — Threat Identification and Analysis

# 10. System Decomposition

## Principle

A threat model SHALL decompose the system into meaningful security-relevant components.

The goal is not to document every implementation detail.

The goal is to expose:

* Assets.
* Entry points.
* Trust boundaries.
* Data flows.
* Privileges.
* External dependencies.
* Failure domains.

---

## Component Categories

A decomposition MAY include:

```text
Users
Clients
Applications
Services
APIs
Workers
Queues
Databases
Caches
Object Storage
Identity Providers
External APIs
Third-Party Services
CI/CD Systems
Infrastructure
```

---

## Component Granularity

Components SHOULD be decomposed to the level required to identify meaningful security differences.

Overly coarse decomposition MAY hide attack paths.

Overly detailed decomposition MAY create unnecessary documentation overhead.

---

## Security-Relevant Properties

Each material component SHOULD identify, where applicable:

* Responsibility.
* Owner.
* Trust level.
* Privileges.
* Data handled.
* External dependencies.
* Exposed interfaces.

---

## Component Interaction

Interactions between components SHOULD be represented explicitly when they cross:

* Trust boundaries.
* Privilege boundaries.
* Network boundaries.
* Data ownership boundaries.

---

# 11. Data Flow Modeling

## Principle

Material security-sensitive data flows SHALL be represented in the threat model.

---

## Data Flow Elements

A data-flow model SHOULD identify:

```text
External Entity
      ↓
Process
      ↓
Data Store
      ↓
Process
      ↓
External Entity
```

---

## Required Information

For important flows, the model SHOULD identify:

* Source.
* Destination.
* Data type.
* Transport mechanism.
* Authentication.
* Authorization.
* Validation.
* Encryption.
* Trust boundary crossings.

---

## Sensitive Data Flows

Sensitive data SHOULD be explicitly marked.

Examples include:

* Credentials.
* Authentication tokens.
* Personal information.
* Financial information.
* Cryptographic material.
* Internal secrets.

---

## Data Flow Assumptions

Security assumptions SHALL NOT remain implicit.

Examples:

```text
"This service trusts the identity claims supplied by the gateway."

"This queue is considered internal."

"This database connection requires mutual authentication."
```

Material assumptions SHOULD be documented.

---

# 12. Threat Identification

## Principle

Threat identification SHALL evaluate realistic ways in which system behavior or security properties could be compromised.

---

## Threat Discovery Sources

Threats MAY be identified through:

* Architecture review.
* Data-flow analysis.
* STRIDE.
* Abuse cases.
* Security testing.
* Incident history.
* Vulnerability intelligence.
* Dependency analysis.
* Penetration testing.
* Operational experience.

---

## Threat Scenario

A useful threat scenario SHOULD identify:

```text
Actor
  ↓
Entry Point
  ↓
Attack Path
  ↓
Target
  ↓
Security Property Violated
  ↓
Impact
  ↓
Mitigation
```

---

## Concrete Threats

Threat descriptions SHOULD be concrete.

Weak:

```text
"Security problem with API."
```

Better:

```text
"An authenticated user may manipulate an object identifier
to access another user's resource because authorization is
performed only at the endpoint level."
```

---

## Threat Preconditions

Threats SHOULD identify meaningful preconditions where applicable.

Examples:

* Attacker must possess a valid account.
* Endpoint must be publicly reachable.
* Specific feature must be enabled.
* Vulnerable dependency must be present.
* Administrative privilege must already exist.

---

## Threat Outcomes

Threat outcomes SHOULD describe the actual security impact.

Examples:

```text
Unauthorized data disclosure
Unauthorized modification
Account takeover
Privilege escalation
Service disruption
Code execution
Credential compromise
Data destruction
```

---

# 13. STRIDE Classification

AURA threat models SHOULD use STRIDE or an equivalent structured classification method.

---

## Spoofing

Spoofing involves impersonating an identity or entity.

Examples:

* Credential theft.
* Token forgery.
* Session hijacking.
* Service impersonation.

Security controls MAY include:

* Strong authentication.
* Token validation.
* Credential protection.
* Session security.

---

## Tampering

Tampering involves unauthorized modification of data or system state.

Examples:

* Request manipulation.
* Database modification.
* Artifact modification.
* Configuration manipulation.

Controls MAY include:

* Integrity validation.
* Authorization.
* Digital signatures.
* Checksums.
* Immutable artifacts.

---

## Repudiation

Repudiation involves denying an action where sufficient accountability should exist.

Examples:

* Administrative actions without audit records.
* Sensitive changes without actor identity.
* Missing transaction identifiers.

Controls MAY include:

* Audit logs.
* Strong identity.
* Correlation identifiers.
* Tamper-resistant logging.

---

## Information Disclosure

Information disclosure involves unauthorized exposure of information.

Examples:

* API data leakage.
* Log leakage.
* Database exposure.
* Error-message leakage.
* Credential disclosure.

Controls MAY include:

* Authorization.
* Encryption.
* Data minimization.
* Output filtering.
* Secret redaction.

---

## Denial of Service

Denial of service involves reducing or preventing availability.

Examples:

* Resource exhaustion.
* Request flooding.
* Queue saturation.
* Expensive operations.
* Dependency exhaustion.

Controls MAY include:

* Rate limiting.
* Resource quotas.
* Timeouts.
* Backpressure.
* Isolation.

---

## Elevation of Privilege

Elevation of privilege involves gaining permissions beyond those legitimately granted.

Examples:

* Authorization bypass.
* Role manipulation.
* Privilege escalation.
* Service-account abuse.

Controls MAY include:

* Least privilege.
* Server-side authorization.
* Role validation.
* Privileged-operation isolation.

---

## STRIDE Limitation

STRIDE SHALL NOT be treated as a complete threat universe.

Additional threat categories MAY be required depending on the system.

---

# 14. Abuse Cases

## Principle

Threat models SHOULD include realistic misuse of legitimate functionality.

---

## Abuse Case Structure

An abuse case SHOULD identify:

```text
Actor
Capability
Target
Misuse
Security Impact
Mitigation
Detection
```

---

## Examples

### Authentication Abuse

```text
Repeated authentication attempts
→ Account compromise
→ Credential stuffing / brute-force protection
```

### Authorization Abuse

```text
Manipulated resource identifier
→ Unauthorized resource access
→ Object-level authorization
```

### File Upload Abuse

```text
Malicious file upload
→ Code execution / storage abuse
→ Validation + isolation + content controls
```

### Administrative Abuse

```text
Compromised privileged account
→ Destructive administrative action
→ MFA + least privilege + audit logging
```

---

## Abuse Case Coverage

Critical user journeys SHOULD have corresponding abuse-case analysis.

---

# 15. Risk Assessment

## Principle

Threats SHALL be evaluated according to their potential risk.

---

## Risk Factors

Risk assessment SHOULD consider:

```text
Likelihood
Impact
Exposure
Exploitability
Existing Controls
Detectability
Recovery Difficulty
```

---

## Likelihood

Likelihood SHOULD consider:

* Attacker capability.
* Required access.
* Complexity.
* Exposure.
* Availability of exploits.
* Existing controls.

---

## Impact

Impact MAY include:

* Confidentiality loss.
* Integrity loss.
* Availability loss.
* Privacy impact.
* Financial impact.
* Operational impact.
* Regulatory impact.
* Reputational impact.

---

## Existing Controls

Risk assessment SHALL account for controls that materially reduce:

* Likelihood.
* Impact.
* Attack path feasibility.

---

## Inherent vs Residual Risk

Where useful, models SHOULD distinguish:

```text
Inherent Risk
      ↓
Controls / Mitigations
      ↓
Residual Risk
```

---

# 16. Risk Scoring

## Principle

Risk scoring SHALL provide a consistent method for prioritization.

AURA MAY use:

```text
Risk = Likelihood × Impact
```

where each factor uses an approved scale.

---

## Example Scale

### Likelihood

| Score | Description   |
| ----: | ------------- |
|     1 | Rare          |
|     2 | Unlikely      |
|     3 | Possible      |
|     4 | Likely        |
|     5 | Highly Likely |

### Impact

| Score | Description |
| ----: | ----------- |
|     1 | Negligible  |
|     2 | Low         |
|     3 | Moderate    |
|     4 | High        |
|     5 | Severe      |

---

## Risk Levels

| Score | Level    |
| ----: | -------- |
|   1–4 | Low      |
|   5–9 | Moderate |
| 10–16 | High     |
| 17–25 | Critical |

---

## Scoring Limitations

Numeric scores SHALL NOT replace engineering judgment.

Two threats with identical scores MAY require different mitigations because their:

* Attack paths.
* Detectability.
* Exploitability.
* Recovery characteristics.

differ materially.

---

# 17. Threat Prioritization

## Priority

Threats SHOULD be prioritized according to:

1. Critical security impact.
2. Exploitability.
3. Exposure.
4. Ease of exploitation.
5. Affected asset value.
6. Existing control weakness.
7. Recovery difficulty.

---

## Critical Threats

Critical threats SHOULD be addressed before the affected system enters production unless an explicit risk acceptance exists.

---

## High Threats

High threats SHOULD have a documented remediation plan.

---

## Moderate Threats

Moderate threats SHOULD be tracked and addressed according to system risk and engineering capacity.

---

## Low Threats

Low threats MAY be accepted when mitigation cost exceeds reasonable risk reduction.

---

## Prioritization Rule

A threat SHALL NOT be marked low solely because:

* It has never happened before.
* Exploitation has not been observed internally.
* The implementation team considers it unlikely without evidence.

---

# PART III — Mitigation and Security Controls

# 18. Mitigation Strategy

## Principle

Every material identified threat SHALL result in one of the following outcomes:

```text
Mitigate
Transfer
Avoid
Accept
Monitor
```

---

## Mitigation

Reduce likelihood or impact through technical or procedural controls.

Examples:

* Authorization.
* Encryption.
* Isolation.
* Input validation.
* Rate limiting.

---

## Avoidance

Remove the feature, interface, dependency, or architecture creating the threat.

---

## Transfer

Move part of the risk to another trusted party where appropriate.

Transfer SHALL NOT mean ignoring the risk.

---

## Acceptance

Accept residual risk only through an explicit decision meeting applicable governance requirements.

---

## Monitoring

Monitoring MAY be used when:

* Immediate mitigation is disproportionate.
* The threat is low enough to tolerate.
* Detection provides meaningful protection.
* A remediation path exists.

Monitoring SHALL NOT be used as an excuse to avoid reasonable preventive controls.

---

# 19. Security Control Requirements

## Preventive Controls

Preventive controls SHOULD reduce the probability of successful exploitation.

Examples:

```text
Authentication
Authorization
Input Validation
Encryption
Network Segmentation
Least Privilege
```

---

## Detective Controls

Detective controls SHOULD identify suspicious or successful attacks.

Examples:

```text
Audit Logging
Security Alerts
Anomaly Detection
Integrity Monitoring
```

---

## Corrective Controls

Corrective controls SHOULD reduce damage or restore secure operation.

Examples:

```text
Credential Rotation
Account Lockout
Rollback
Recovery
Incident Response
```

---

## Defense in Depth

Critical assets SHOULD use multiple independent controls where practical.

---

# 20. Authentication and Authorization Threats

## Authentication Threats

Threat models SHOULD consider:

* Credential theft.
* Credential stuffing.
* Brute force.
* Session theft.
* Token replay.
* Token forgery.
* MFA bypass.
* Account enumeration.

---

## Authorization Threats

Threat models SHOULD consider:

* Horizontal privilege escalation.
* Vertical privilege escalation.
* Missing object-level authorization.
* Role manipulation.
* Tenant isolation failure.
* Privilege inheritance errors.

---

## Server-Side Enforcement

Security-critical authorization SHALL be enforced server-side.

Client-side checks SHALL NOT be treated as sufficient security controls.

---

## Privileged Operations

Sensitive operations SHOULD require explicit authorization checks at the point of action.

---

# 21. Data and Privacy Threats

## Data Classification

Threat models SHOULD identify sensitive data categories.

---

## Data Exposure

Threats MAY include:

* Unauthorized access.
* Excessive data collection.
* Data leakage through logs.
* Insecure backups.
* Incorrect access controls.
* Cross-tenant disclosure.

---

## Data in Transit

Sensitive data crossing trust boundaries SHOULD use appropriate transport protection.

---

## Data at Rest

Sensitive stored data SHOULD use appropriate protection based on risk.

---

## Data Minimization

Systems SHOULD collect and retain only data required for legitimate functionality.

---

## Privacy Boundaries

Privacy-sensitive data SHOULD have explicit ownership and access requirements.

---

# 22. Infrastructure Threats

Threat models SHOULD consider infrastructure-level risks including:

* Exposed services.
* Misconfigured networks.
* Overprivileged workloads.
* Compromised containers.
* Insecure storage.
* Secret exposure.
* CI/CD compromise.
* Resource exhaustion.
* Instance compromise.

---

## Infrastructure Isolation

Critical workloads SHOULD be isolated according to their security requirements.

---

## Administrative Access

Administrative interfaces SHOULD be restricted and monitored.

---

## CI/CD

CI/CD systems SHALL be considered part of the security boundary because they can produce or deploy trusted artifacts.

---

# 23. Third-Party and Supply-Chain Threats

Third-party dependencies SHOULD be treated as potential attack paths.

Threats MAY include:

```text
Compromised Package
Malicious Update
Dependency Confusion
Typosquatting
Compromised Vendor
Stolen Maintainer Credentials
Build-System Compromise
Artifact Tampering
```

---

## Third-Party Trust

The threat model SHOULD document important assumptions about external providers.

---

## Dependency Controls

Supply-chain threats SHALL be evaluated alongside the requirements defined by:

`DEPENDENCY_POLICY.md`

---

## Vendor Failure

Threat modeling SHOULD consider security and operational consequences when a critical external provider becomes:

* Unavailable.
* Compromised.
* Misconfigured.
* Unsupported.

---

# 24. Residual Risk

## Principle

Mitigation rarely eliminates all risk.

The threat model SHALL identify material residual risks.

---

## Residual Risk Record

A residual risk SHOULD contain:

```text
Threat
Original Risk
Controls
Remaining Risk
Owner
Acceptance Status
Review Date
```

---

## Residual Risk Visibility

Residual risk SHALL remain visible to the responsible decision-makers.

---

## Risk Changes

Residual risk SHOULD be reassessed when:

* Architecture changes.
* Threat intelligence changes.
* New vulnerabilities appear.
* Controls change.
* System exposure changes.

---

# 25. Threat Acceptance

## Principle

Risk acceptance SHALL be explicit.

---

## Acceptance Requirements

A material accepted risk SHOULD identify:

* Threat.
* Risk level.
* Business/technical justification.
* Existing controls.
* Residual impact.
* Owner.
* Expiration or review date.

---

## Permanent Acceptance

Permanent risk acceptance SHOULD be exceptional.

---

## Expiration

High and critical residual risks SHOULD have an explicit review or expiration condition.

---

# PART IV — Governance and Lifecycle

# 26. Threat Model Review

Threat models SHALL be reviewed when material architectural changes occur.

---

## Review Triggers

Triggers MAY include:

* New public endpoints.
* Authentication changes.
* Authorization changes.
* New sensitive data.
* New external integrations.
* New privileged functionality.
* Major infrastructure changes.
* Significant dependency changes.
* Security incidents.

---

## Periodic Review

Material systems SHOULD undergo periodic threat model review even without architectural changes.

---

# 27. Change Management

Threat models SHALL evolve with architecture.

---

## Required Updates

A threat model SHOULD be updated when a change modifies:

```text
Assets
Trust Boundaries
Attack Surface
Data Flows
Privileges
External Dependencies
Security Controls
```

---

## Implementation Drift

If implementation differs materially from the threat model, the threat model SHOULD be updated rather than allowing permanent documentation drift.

---

# 28. Continuous Validation

Threat modeling SHALL NOT replace security testing.

It SHOULD guide and complement:

* Static analysis.
* Dynamic testing.
* Dependency scanning.
* Penetration testing.
* Configuration scanning.
* Security monitoring.

---

## Threat-to-Test Mapping

Material threats SHOULD map to at least one validation mechanism where practical.

Example:

```text
Threat
  ↓
Mitigation
  ↓
Security Test
  ↓
Monitoring
```

---

## Control Validation

Security controls SHOULD be periodically validated rather than assumed to remain effective indefinitely.

---

# 29. Exceptions

Exceptions MAY be granted when strict compliance is inappropriate.

A material exception SHOULD document:

* Requirement.
* Reason.
* Risk.
* Compensating controls.
* Owner.
* Review date.
* Remediation plan.

---

# 30. Related Documents

Related AURA security and engineering documents include:

* `ARCHITECTURE_PRINCIPLES.md`
* `SECURITY.md`
* `DEPENDENCY_POLICY.md`
* `API_DESIGN_STANDARD.md`
* `ERROR_HANDLING_STANDARD.md`
* `OBSERVABILITY_STANDARD.md`
* `TESTING_STANDARD.md`
* `DOCUMENTATION_STANDARD.md`
* `RELEASE_PROCESS.md`

Threat models MAY also reference:

* ADRs.
* RFCs.
* Data-flow diagrams.
* Architecture diagrams.
* Security advisories.
* Incident reports.

---

# 31. Versioning

This document follows Semantic Versioning.

## Major

Breaking changes to mandatory threat-modeling requirements.

## Minor

Backward-compatible additions to threat analysis or governance.

## Patch

Clarifications, corrections, formatting changes, and editorial fixes.

Material changes SHALL remain traceable through version control.

---

# 32. Document Status

| Field          | Value                |
| -------------- | -------------------- |
| Status         | Approved             |
| Version        | 1.0.0                |
| Classification | Security Standard    |
| Owner          | AURA Security Team   |
| Document ID    | STANDARD-THREAT-0001 |
| Review Cycle   | Annual               |
| Next Review    | YYYY-MM-DD           |

---

# Appendix A — Threat Classification Matrix

| Category               | Example Threat           | Typical Control            |
| ---------------------- | ------------------------ | -------------------------- |
| Spoofing               | Credential theft         | Strong authentication      |
| Tampering              | Request manipulation     | Integrity + authorization  |
| Repudiation            | Untraceable admin action | Audit logging              |
| Information Disclosure | Unauthorized data access | Authorization + encryption |
| Denial of Service      | Resource exhaustion      | Rate limits + quotas       |
| Elevation of Privilege | Role escalation          | Server-side authorization  |

---

# Appendix B — Risk Scoring Matrix

|              | Impact 1 | Impact 2 | Impact 3 | Impact 4 | Impact 5 |
| ------------ | -------: | -------: | -------: | -------: | -------: |
| Likelihood 1 |        1 |        2 |        3 |        4 |        5 |
| Likelihood 2 |        2 |        4 |        6 |        8 |       10 |
| Likelihood 3 |        3 |        6 |        9 |       12 |       15 |
| Likelihood 4 |        4 |        8 |       12 |       16 |       20 |
| Likelihood 5 |        5 |       10 |       15 |       20 |       25 |

### Interpretation

```text
1–4    Low
5–9    Moderate
10–16  High
17–25  Critical
```

---

# Appendix C — Threat Model Lifecycle Matrix

| State               | Meaning                         | Required Action      |
| ------------------- | ------------------------------- | -------------------- |
| Draft               | Initial analysis                | Continue modeling    |
| In Review           | Security/architecture review    | Validate assumptions |
| Approved            | Accepted threat model           | Maintain             |
| Mitigation Required | Material threats remain         | Track remediation    |
| Accepted Risk       | Residual risk formally accepted | Monitor              |
| Outdated            | Architecture changed materially | Re-model             |
| Archived            | System no longer active         | Preserve history     |

---

# Appendix D — Threat Modeling Review Checklist

```text
SYSTEM:
MODEL OWNER:
REVIEWER:
DATE:
VERSION:

Scope
[ ] System scope is defined
[ ] Critical components are identified
[ ] Security-sensitive changes are included

Assets
[ ] Important assets are identified
[ ] Asset owners are identified
[ ] Confidentiality requirements are known
[ ] Integrity requirements are known
[ ] Availability requirements are known
[ ] Privacy requirements are considered

Trust Boundaries
[ ] Trust boundaries are identified
[ ] Trust assumptions are explicit
[ ] Boundary-crossing data is identified
[ ] Authentication requirements are defined
[ ] Authorization requirements are defined

Attack Surface
[ ] Public interfaces are identified
[ ] Administrative interfaces are identified
[ ] External integrations are identified
[ ] Dependencies are considered
[ ] CI/CD attack surface is considered

Threats
[ ] Threat actors are identified
[ ] Attack paths are identified
[ ] STRIDE analysis performed where applicable
[ ] Abuse cases considered
[ ] Security properties are identified
[ ] Threat outcomes are concrete

Risk
[ ] Likelihood evaluated
[ ] Impact evaluated
[ ] Existing controls considered
[ ] Residual risk calculated
[ ] Threats prioritized

Mitigation
[ ] Critical threats have mitigations
[ ] High threats have remediation plans
[ ] Security controls are explicit
[ ] Defense in depth considered
[ ] Detection mechanisms considered

Authentication / Authorization
[ ] Authentication threats evaluated
[ ] Authorization threats evaluated
[ ] Privilege escalation considered
[ ] Object-level authorization considered

Data
[ ] Sensitive data identified
[ ] Data-in-transit protections evaluated
[ ] Data-at-rest protections evaluated
[ ] Data minimization considered
[ ] Cross-tenant isolation considered where applicable

Infrastructure
[ ] Network exposure evaluated
[ ] Privilege boundaries evaluated
[ ] CI/CD security evaluated
[ ] Container / runtime security evaluated
[ ] Resource exhaustion considered

Supply Chain
[ ] Third-party dependencies evaluated
[ ] Dependency compromise considered
[ ] Artifact integrity considered
[ ] Vendor trust assumptions documented

Governance
[ ] Material residual risks are visible
[ ] Risk acceptance is documented
[ ] Owners are assigned
[ ] Review date is defined
[ ] Related ADRs/RFCs are linked

Validation
[ ] Threats map to security tests where practical
[ ] Security controls can be verified
[ ] Monitoring requirements are defined
[ ] Model reflects current architecture

FINAL RESULT:

[ ] APPROVED
[ ] APPROVED WITH CONDITIONS
[ ] REQUIRES CHANGES
[ ] REJECTED
```

---

# End of Document

