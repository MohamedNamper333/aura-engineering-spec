---
document_id: GUIDE-DOC-0001

title: Documentation Standard

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

# Documentation Standard

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial documentation standard. |

---

# Table of Contents

## Definitions

## Normative Language

## PART I — Documentation Philosophy

1. Purpose
2. Scope
3. Documentation Philosophy
4. Core Principles

## PART II — Documentation Design

5. Documentation Types
6. Documentation Ownership
7. Documentation Structure
8. Naming and File Organization
9. Markdown Standards
10. Headings and Navigation
11. Links and References
12. Code Examples and Technical Content

## PART III — Documentation Lifecycle

13. Accuracy and Source of Truth
14. Documentation Changes
15. Versioning and Deprecation
16. Architecture and Decision Documentation
17. API and Contract Documentation
18. Operational Documentation
19. Security and Sensitive Information
20. Documentation Testing and Validation

## PART IV — Governance

21. Review Checklist
22. Exceptions
23. Related Documents
24. Versioning
25. Document Status

## Appendix A — Documentation Classification Matrix

## Appendix B — Documentation Naming Matrix

## Appendix C — Documentation Lifecycle Matrix

## Appendix D — Documentation Review Checklist

---

# Definitions

## Documentation

A maintained representation of system knowledge intended to communicate requirements, architecture, behavior, decisions, constraints, procedures, or operational information.

## Source of Truth

The authoritative location from which a particular piece of information is derived and against which conflicting representations are resolved.

## Normative Documentation

Documentation that defines mandatory or explicitly recommended engineering requirements.

## Informative Documentation

Documentation intended to explain, describe, guide, or provide context without itself defining mandatory requirements.

## Architecture Documentation

Documentation describing system structure, boundaries, components, dependencies, interfaces, and architectural constraints.

## Decision Record

A persistent record describing an important decision, its context, alternatives, rationale, and consequences.

## Procedure

A documented sequence of actions intended to accomplish an operational or engineering task.

## Reference Documentation

Documentation intended primarily for lookup, such as API references, schemas, configuration references, or command references.

## Guide

Documentation intended to help a reader accomplish a task or understand a workflow.

## Tutorial

Structured instructional documentation designed to teach a concept or workflow progressively.

## Runbook

Operational documentation describing how to diagnose, operate, recover, or maintain a system.

## Changelog

A chronological record of notable changes to a project, component, or document.

## Deprecation

A formal indication that a documented feature, behavior, interface, or process remains supported temporarily but SHOULD NOT be used for new work.

## Documentation Drift

A condition in which documentation no longer accurately represents the system, process, or decision it describes.

## Documentation Owner

The person, team, or organizational unit responsible for maintaining the correctness and lifecycle of a document.

---

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

---

# PART I — Documentation Philosophy

---

# 1. Purpose

## Objective

This document defines the engineering requirements for creating, organizing, maintaining, reviewing, versioning, and retiring documentation within systems governed by the **AURA Engineering Standards**.

Documentation SHALL be treated as an engineering artifact rather than optional explanatory material.

## Documentation as a System Contract

Documentation may define or communicate:

- Architecture.
- Requirements.
- Engineering standards.
- API behavior.
- Data contracts.
- Operational procedures.
- Security requirements.
- Architectural decisions.
- Development workflows.
- System limitations.
- Known risks.

Where documentation represents an authoritative contract, its accuracy SHALL be maintained with the same discipline applied to implementation artifacts.

## Documentation Lifecycle

Documentation SHALL be considered throughout:

```text
Create
  ↓
Review
  ↓
Publish
  ↓
Maintain
  ↓
Verify
  ↓
Deprecate
  ↓
Retire
```

## Expected Outcome

A well-maintained documentation system SHOULD allow an engineer to determine:

- What the system does.
- Why it is designed that way.
- How it should be used.
- What constraints apply.
- Who owns the relevant information.
- Where authoritative information resides.
- When the information was last reviewed.
- Whether the information is still valid.

---

# 2. Scope

## Applies To

This standard applies to documentation stored or maintained as part of AURA engineering work, including:

- README files.
- Engineering standards.
- RFCs.
- ADRs.
- API documentation.
- Data-model documentation.
- Architecture documentation.
- Operational runbooks.
- Deployment procedures.
- Security documentation.
- Development guides.
- Reference documentation.
- Checklists.
- Templates.
- Schemas and schema explanations.
- Diagrams and diagram descriptions.
- Changelogs.

## Repository Scope

The standard applies to documentation located in repository-defined locations such as:

```text
Repository root
RFC/
ADR/
STANDARDS/
CONTEXT/
PROMPTS/
SCHEMAS/
DIAGRAMS/
CHECKLISTS/
TEMPLATES/
```

Projects MAY use equivalent locations when their repository structure requires it.

## Technology Independence

This standard SHALL remain independent of a specific documentation generator, Markdown processor, static-site generator, IDE, or hosting platform.

Tools MAY be selected by individual projects provided they do not conflict with this standard.

## Out of Scope

This document does not define:

- Product copywriting.
- Marketing content.
- Legal contracts.
- Formal regulatory documentation.
- Vendor-specific documentation tooling.
- Visual design systems.

Those concerns MAY be governed separately.

---

# 3. Documentation Philosophy

## Documentation Is Part of the System

Documentation SHALL be considered part of the engineering system when engineers depend on it to make decisions or operate the system.

A change that materially changes documented behavior SHOULD evaluate whether the corresponding documentation must change.

## Documentation Must Have Purpose

Every maintained document SHOULD have a clearly identifiable purpose.

A document SHOULD answer:

```text
Why does this document exist?
Who uses it?
What decision or action does it support?
Where is the authoritative information?
```

Documents without a defined purpose SHOULD be removed, consolidated, or rewritten.

## Documentation Should Reduce Uncertainty

Good documentation reduces the amount of information an engineer must infer.

It SHOULD make explicit:

- Assumptions.
- Constraints.
- Responsibilities.
- Dependencies.
- Expected behavior.
- Failure behavior.
- Examples.
- Limitations.

## Documentation Is Not a Substitute for Design

Documentation SHALL NOT be used to conceal architectural ambiguity.

If underlying system behavior is undefined, contradictory, or undecided, the documentation SHOULD identify the uncertainty rather than fabricate certainty.

## Documentation and Implementation

Where documentation describes implemented behavior, the implementation and documentation SHOULD remain synchronized.

Neither documentation nor implementation should silently become a conflicting source of truth.

## Documentation Hierarchy

When multiple documents describe the same subject, the authority of each document SHALL be explicit.

A typical hierarchy is:

```text
Normative Standard
       ↓
Architecture / RFC / ADR
       ↓
Implementation
       ↓
Guides
       ↓
Examples
```

The exact hierarchy MAY differ by repository, but conflicts SHALL be resolvable through defined ownership and authority.

---

# 4. Core Principles

## Principle 1 — Accuracy

Documentation SHALL represent the intended or actual behavior it claims to describe.

## Principle 2 — Single Source of Truth

Material information SHOULD have one authoritative source. Duplicated information SHOULD be minimized.

## Principle 3 — Explicit Ownership

Important documentation SHALL have an identifiable owner.

## Principle 4 — Traceability

Material documentation changes SHALL remain traceable through version control.

## Principle 5 — Consistency

Equivalent concepts SHOULD use consistent terminology throughout the repository.

## Principle 6 — Discoverability

Important documentation SHOULD be easy to locate through repository indexes, navigation, or clearly defined paths.

## Principle 7 — Maintainability

Documentation SHOULD be structured so that individual sections can be updated without rewriting unrelated content.

## Principle 8 — Minimal Duplication

The same rule SHOULD NOT be independently defined in multiple documents unless each copy has a clearly defined purpose.

## Principle 9 — Examples Must Be Honest

Examples SHALL NOT imply behavior that the actual system does not support.

## Principle 10 — No Hidden Requirements

Material engineering requirements SHALL NOT exist only inside informal comments, chat messages, or undocumented assumptions.

If a requirement is important enough to govern implementation, it SHOULD exist in an appropriate authoritative artifact.

## Principle 11 — Documentation Changes Are Engineering Changes

Material changes to architecture, contracts, standards, security requirements, or operational behavior SHOULD include corresponding documentation updates.

## Principle 12 — Prefer Clarity Over Length

Documentation SHOULD contain the minimum information required to communicate the subject accurately. Length alone SHALL NOT be treated as quality.

## Principle 13 — Separate Normative and Informative Content

Mandatory requirements SHOULD be distinguishable from explanations, examples, opinions, and recommendations.

## Principle 14 — Documentation Must Be Reviewable

A document SHOULD be structured so reviewers can determine:

- What changed.
- Why it changed.
- Whether the change is correct.
- What other artifacts may be affected.

## Principle 15 — Documentation Must Have a Lifecycle

Documents SHALL NOT remain indefinitely marked as current when they are obsolete, superseded, or no longer applicable.

---

# PART II — Documentation Design

---

# 5. Documentation Types

Documentation SHALL be classified according to its purpose and authority. A document SHOULD have one primary classification.

## Normative Standards

Normative standards define mandatory or recommended engineering requirements.

Examples include:

```text
STYLE_GUIDE.md
TESTING_STANDARD.md
API_DESIGN_STANDARD.md
ERROR_HANDLING_STANDARD.md
```

Normative standards SHOULD use explicit normative language.

## Architecture Documentation

Architecture documentation describes system structure, components, boundaries, dependencies, interfaces, and constraints.

## RFCs

RFCs SHALL be used when a proposed change requires structured technical discussion before adoption.

RFCs SHOULD describe:

- Problem.
- Context.
- Goals.
- Non-goals.
- Proposed solution.
- Alternatives.
- Risks.
- Migration.
- Open questions.

An RFC SHOULD NOT silently become an architectural decision without the appropriate approval or decision record.

## ADRs

ADRs SHALL record significant architectural decisions after the decision has been made.

An ADR SHOULD include:

- Context.
- Decision.
- Alternatives considered.
- Consequences.
- Status.

ADRs SHALL preserve historical reasoning even when the resulting decision is later superseded.

## Guides

Guides explain how to accomplish a task and SHOULD prioritize actionable information.

## Tutorials

Tutorials SHALL be instructional. They SHOULD establish prerequisites, use progressive steps, provide expected outcomes, and minimize unexplained assumptions.

Tutorials SHOULD NOT be the primary location for normative requirements.

## Reference Documentation

Reference documentation exists primarily for lookup, including API references, configuration references, CLI commands, schemas, and environment variables.

Reference documentation SHOULD favor precision and completeness over narrative explanation.

## Runbooks

Runbooks SHALL describe operational procedures. A runbook SHOULD define:

```text
Trigger
Prerequisites
Diagnosis
Action
Verification
Rollback / Recovery
Escalation
```

## Checklists

Checklists SHOULD be used where repeated verification is required. They SHOULD reference authoritative standards rather than duplicating their complete contents.

## Templates

Templates SHALL provide reusable structures for recurring documentation artifacts and SHOULD contain placeholders rather than project-specific decisions.

---

# 6. Documentation Ownership

Important documentation SHALL have clear ownership.

## Owner

A document owner is responsible for:

- Accuracy.
- Review.
- Lifecycle management.
- Deprecation.
- Coordination with affected teams.

Ownership does not necessarily imply authorship.

## Team Ownership

A document MAY be owned by a team rather than an individual. Team ownership SHOULD be preferred for long-lived organizational standards.

## Maintainer Responsibility

Repository maintainers SHOULD ensure that material documentation changes are reviewed by appropriate owners.

## Ownership Metadata

Important documents SHOULD expose ownership through front matter or an equivalent repository mechanism.

Example:

```yaml
owner: AURA Architecture Team
review_owner: AURA Architecture Team
```

## Ownership Changes

When responsibility changes, ownership metadata SHOULD be updated as part of the same change.

## Orphaned Documentation

A document without a known owner SHOULD be treated as a maintenance risk. It SHOULD be assigned an owner, consolidated, deprecated, or removed.

---

# 7. Documentation Structure

Normative engineering documents SHOULD use metadata equivalent to:

```yaml
document_id:
title:
status:
version:
owner:
classification:
review_cycle:
review_owner:
effective_date:
supersedes:
superseded_by:
```

Not every field is required for every document type.

## Document Identity

Each normative document SHOULD have a stable document identifier. The identifier SHOULD remain stable across revisions.

## Status

Documents SHOULD expose a lifecycle status. Recommended values include:

```text
Draft
Proposed
Approved
Active
Deprecated
Superseded
Archived
```

## Recommended Structure

A long-form engineering document SHOULD generally follow:

```text
Front Matter
Revision History
Table of Contents
Definitions
Normative Language
Main Content
Appendices
Related Documents
Versioning
Document Status
```

The exact structure MAY differ when the document's purpose requires it.

## Section Independence

Sections SHOULD be independently understandable where practical. Cross-section dependencies SHOULD be explicit.

## Appendices

Appendices SHOULD contain supporting material that improves usability without interrupting the main normative flow.

Examples include matrices, reference tables, checklists, examples, glossaries, and decision aids.

## Document Length

Documents SHOULD be split when their scope becomes sufficiently broad that navigation or ownership becomes difficult. A document SHALL NOT be split solely to reduce line count.

---

# 8. Naming and File Organization

## File Naming

Normative standards SHOULD use the repository's established naming convention. For AURA engineering standards, the preferred pattern is:

```text
UPPER_SNAKE_CASE.md
```

Examples:

```text
STYLE_GUIDE.md
API_DESIGN_STANDARD.md
ERROR_HANDLING_STANDARD.md
DOCUMENTATION_STANDARD.md
```

## General Documentation

General documentation MAY use established repository names such as:

```text
README.md
CONTRIBUTING.md
CHANGELOG.md
SECURITY.md
```

## Directory Naming

Documentation directories SHOULD follow the repository's established structure. AURA currently uses concepts such as:

```text
RFC/
ADR/
STANDARDS/
CONTEXT/
PROMPTS/
SCHEMAS/
DIAGRAMS/
CHECKLISTS/
TEMPLATES/
```

## Numbered Documents

Documents SHOULD NOT rely exclusively on numeric filenames for identity.

Prefer:

```text
ADR-001-database-selection.md
```

over:

```text
001.md
```

## No Ambiguous Names

Names such as `misc.md`, `notes.md`, `stuff.md`, `final.md`, `new.md`, or `old.md` SHOULD NOT be used for maintained engineering documentation.

## Archive Naming

Archived documentation SHOULD retain its original identity where practical.

---

# 9. Markdown Standards

Markdown SHALL remain readable both as rendered content and as source text.

## Heading Syntax

ATX-style headings SHOULD be used consistently:

```markdown
# Heading
## Section
### Subsection
```

## Heading Hierarchy

Heading levels SHALL NOT be skipped without justification.

## Paragraphs

Paragraphs SHOULD communicate one coherent idea. Long paragraphs SHOULD be split when multiple independent concepts are present.

## Lists

Lists SHOULD be used for requirements, steps, alternatives, enumerations, and checklists.

## Tables

Tables SHOULD be used for structured comparisons or metadata. Tables SHOULD NOT be used for large blocks of prose.

## Code Blocks

Code blocks SHALL identify the language when practical.

Example:

```javascript
const value = getValue();
```

## Inline Code

Use inline code for file names, commands, identifiers, environment variables, API fields, and code symbols.

## Emphasis

Bold and italic formatting SHOULD be used sparingly and should support comprehension rather than decoration.

## Raw HTML

Raw HTML SHOULD NOT be used unless Markdown cannot express the required structure reliably.

## Source Readability

Markdown source SHOULD remain reasonably readable in plain-text form. Projects MAY define automated formatting rules where necessary.

---

# 10. Headings and Navigation

Long documents SHOULD provide predictable navigation.

## Heading Semantics

Headings SHALL describe the content that follows.

Avoid vague headings such as:

```text
Important
Details
More
Things
```

Prefer descriptive headings such as:

```text
Authentication Requirements
Retry Policy
Database Migration Procedure
```

## Table of Contents

Long-form documents SHOULD contain a table of contents. The table of contents SHOULD reflect the actual heading hierarchy.

## Navigation Links

Documents MAY provide links to parent documentation, related standards, previous or next documents, and repository indexes.

## Relative Links

Repository-internal documentation SHOULD prefer relative links because they remain portable across branches and repository mirrors.

Example:

```markdown
[Testing Standard](TESTING_STANDARD.md)
```

## Anchor Links

Links SHOULD target stable sections where practical.

## Broken Navigation

Broken internal documentation links SHALL be treated as documentation defects.

---

# 11. Links and References

References SHALL be stable, relevant, and attributable.

## Internal References

Internal references SHOULD point to the authoritative repository document whenever possible. Avoid duplicating the referenced rule merely to avoid creating a link.

## External References

External references SHOULD point to authoritative sources such as official standards organizations, official vendor documentation, official project documentation, primary technical specifications, or peer-reviewed research where applicable.

## Link Stability

External links SHOULD be evaluated for long-term stability before inclusion in normative documentation.

## Versioned References

When behavior depends on a specific external version, the documentation SHOULD identify that version.

## Reference Context

A link SHOULD provide enough surrounding context to explain why it is relevant. Avoid unexplained links such as `[Click here](...)`.

## Dead Links

Known broken external links SHOULD be corrected or replaced.

## Citation Requirements

Technical claims that materially depend on external sources SHOULD identify the source using the repository's established citation convention.

---

# 12. Code Examples and Technical Content

Technical documentation SHALL avoid presenting misleading or non-functional examples as authoritative implementation guidance.

## Example Accuracy

Code examples SHOULD:

- Match the documented API.
- Use valid syntax.
- Use realistic interfaces.
- Avoid deprecated patterns unless intentionally documented.
- Clearly identify simplified examples.

## Example Status

Examples SHOULD be classified when necessary:

```text
Illustrative
Production-ready
Pseudo-code
Incomplete
Deprecated
```

## Security

Examples SHALL NOT contain real credentials, API keys, private tokens, production secrets, or sensitive personal data.

## Placeholder Credentials

Examples SHOULD use clearly fake placeholders such as:

```text
YOUR_API_KEY
EXAMPLE_TOKEN
example@example.com
```

## Configuration Examples

Configuration examples SHOULD identify required and optional fields.

## Expected Output

When an example depends on a specific result, the expected result SHOULD be documented.

## Version Compatibility

Examples SHOULD identify version requirements when syntax or behavior is version-dependent.

## Commands

Commands SHOULD be safe to copy and execute. Destructive commands SHALL be clearly identified.

## Environment Assumptions

Technical examples SHOULD identify important assumptions such as operating system, runtime version, dependencies, environment variables, permissions, and network requirements.

## Documentation Code Quality

Code examples SHOULD follow applicable engineering standards. Documentation SHALL NOT become an excuse for intentionally poor engineering patterns unless the example explicitly demonstrates an anti-pattern.

---

# PART III — Documentation Lifecycle

---

# 13. Accuracy and Source of Truth

Documentation SHALL remain aligned with the system, process, or decision it represents.

## Source of Truth

Every material engineering fact SHOULD have an identifiable authoritative source.

Examples:

```text
API behavior
    → API contract

Architecture decision
    → ADR

Mandatory engineering rule
    → Engineering Standard

Database schema
    → Schema definition

Operational procedure
    → Runbook
```

## Conflicting Documentation

When two documents contain conflicting information:

1. The authoritative source SHALL take precedence.
2. The conflict SHOULD be corrected.
3. Affected dependent documents SHOULD be reviewed.
4. Material conflicts SHOULD be recorded when they may have caused incorrect implementation.

## Implementation Drift

If implementation differs from documentation, the discrepancy SHALL be classified as one of:

```text
Documentation is outdated
Implementation is incorrect
Decision has changed
Behavior is intentionally different
Source of truth is unclear
```

The discrepancy SHALL NOT remain undocumented when it materially affects engineering behavior.

## Accuracy Review

Important documentation SHOULD be reviewed when the referenced system, API, architectural decision, security requirement, operational procedure, or dependency changes, or when an incident reveals incorrect instructions.

## Stale Documentation

Documentation SHOULD be considered stale when assumptions, interfaces, procedures, dependencies, examples, or ownership are no longer valid.

## Source-of-Truth Declaration

Where ambiguity is likely, a document SHOULD explicitly state its source of truth.

---

# 14. Documentation Changes

Documentation changes SHALL follow the same discipline as other engineering changes when they affect system behavior, standards, architecture, security, or operations.

## Change Classification

Documentation changes SHOULD be classified as:

```text
Editorial
Informative
Normative
Architectural
Operational
Security-sensitive
Compatibility-sensitive
```

## Editorial Changes

Editorial changes include grammar, spelling, formatting, typographical corrections, and non-semantic restructuring.

## Normative Changes

Changes to mandatory requirements SHALL receive appropriate technical review.

Examples include adding a mandatory security control, changing an API requirement, changing retry requirements, or changing release requirements.

## Documentation Coupling

When implementation changes invalidate documentation, the documentation update SHOULD be included in the same change set where practical.

## Change Traceability

Material documentation changes SHALL remain traceable through version control and SHOULD identify what changed, why it changed, affected systems, relevant decisions or issues, and migration implications where applicable.

## Review

Documentation changes SHOULD be reviewed by the owner or designated reviewer when they affect architecture, security, public APIs, operational procedures, engineering standards, or compliance requirements.

## Documentation-Only Changes

A change MAY contain documentation without implementation changes, for example to clarify an existing requirement, correct an example, improve navigation, or add missing operational instructions.

## Implementation-Only Changes

Implementation changes SHOULD NOT intentionally leave materially invalid documentation behind. If documentation cannot be updated in the same change, the discrepancy SHOULD be explicitly tracked.

---

# 15. Versioning and Deprecation

Documentation SHALL communicate lifecycle changes clearly.

## Document Version

Normative documents SHOULD use Semantic Versioning unless a more appropriate repository-wide scheme has been established.

## Version Meaning

### Major

An incompatible change to the document's normative requirements.

### Minor

A backward-compatible addition or expansion of requirements.

### Patch

A non-breaking correction or clarification.

## Feature Deprecation

When a documented feature, API, process, or behavior is deprecated, documentation SHOULD state:

- What is deprecated.
- Current status.
- Recommended replacement.
- Reason.
- Effective date where relevant.
- Removal target where known.
- Migration guidance.

## Deprecated Documentation

A deprecated document SHOULD remain discoverable long enough to support migration and SHALL clearly identify its status and replacement where applicable.

## Superseded Documents

When a document is replaced, the old document SHOULD contain a direct reference to the replacement.

## Removal

Documentation MAY be removed when it is fully superseded, no longer relevant, not required for retention, and its removal will not create historical ambiguity.

## Historical Records

ADRs and other decision records SHOULD generally remain available as historical records even after being superseded.

---

# 16. Architecture and Decision Documentation

Architecture and important engineering decisions SHALL remain distinguishable from ordinary explanatory documentation.

## Architecture Documentation

Architecture documentation SHOULD describe components, responsibilities, boundaries, dependencies, interfaces, data flows, constraints, and important operational characteristics.

## Decision Documentation

Significant architectural decisions SHOULD be recorded using ADRs or an equivalent decision-record mechanism.

## Decision vs Standard

A standard answers:

```text
How should engineering work be performed?
```

A decision record answers:

```text
Why was this architectural choice made?
```

These SHOULD NOT be conflated.

## Decision vs RFC

An RFC generally represents a proposed change. An ADR represents an accepted architectural decision.

Typical lifecycle:

```text
Problem
   ↓
RFC
   ↓
Review
   ↓
Decision
   ↓
ADR
   ↓
Implementation
```

## Architecture Diagrams

Architecture diagrams SHOULD have a defined purpose, identify major components, use consistent terminology, avoid unnecessary implementation detail, and remain synchronized with architecture documentation.

## Diagram Source

Where diagrams are maintained from source files, the source SHOULD remain version-controlled. Examples include Mermaid, PlantUML, Draw.io source, or architecture DSLs.

Rendered images SHOULD NOT become the only authoritative representation when the source can reasonably be maintained.

## Architecture Drift

Material architecture changes SHOULD trigger review of affected ADRs, diagrams, standards, API documentation, operational documentation, and security documentation.

---

# 17. API and Contract Documentation

API documentation SHALL accurately represent externally observable behavior.

## Contract Authority

The authoritative API contract SHOULD be clearly identified. Possible sources include OpenAPI specifications, protocol definitions, schema definitions, or versioned API specifications.

## API Documentation

API documentation SHOULD define, where applicable:

- Endpoint or operation.
- Request format.
- Response format.
- Authentication.
- Authorization.
- Validation.
- Error behavior.
- Rate limits.
- Idempotency.
- Pagination.
- Versioning.
- Compatibility requirements.

## Examples

API examples SHOULD correspond to the actual contract and SHALL NOT demonstrate unsupported fields or invalid request structures.

## Error Codes

API documentation SHOULD reference stable machine-readable error codes. Human-readable messages SHALL NOT be treated as the primary API contract.

## Versioning

Breaking API changes SHALL be documented explicitly. Migration documentation SHOULD be provided where consumers must modify integrations.

## Compatibility

Documentation SHOULD identify compatibility expectations where applicable:

```text
Backward compatible
Forward compatible
Breaking
Deprecated
Experimental
```

## Generated Documentation

Generated API documentation MAY be used. Generated output SHOULD remain traceable to the authoritative API contract.

## Contract Drift

If implementation behavior differs from the documented contract, the discrepancy SHALL be resolved or explicitly documented.

---

# 18. Operational Documentation

Operational documentation SHALL enable authorized engineers to operate and recover systems safely.

## Runbook Requirements

A material operational procedure SHOULD include:

```text
Purpose
Scope
Prerequisites
Trigger
Symptoms
Diagnosis
Procedure
Verification
Rollback / Recovery
Escalation
```

## Preconditions

Operational procedures SHALL identify important prerequisites such as required permissions, tools, environments, backups, or maintenance windows.

## Destructive Operations

Destructive operations SHALL be clearly identified, including data deletion, database reset, production deployment, credential rotation, and infrastructure replacement.

## Verification

Procedures SHOULD define how an engineer determines whether the operation succeeded.

## Rollback

Procedures involving material system changes SHOULD define rollback or recovery behavior where technically possible.

## Emergency Procedures

Emergency procedures SHOULD prioritize:

1. Safety.
2. Containment.
3. Service restoration.
4. Data integrity.
5. Root-cause investigation.
6. Permanent remediation.

## Incident Procedures

Incident documentation SHOULD link to the applicable incident-management process rather than duplicating the complete incident standard.

## Production Commands

Production commands SHOULD be reviewed for safety. Commands with irreversible consequences SHALL include appropriate warnings.

## Operational Assumptions

Runbooks SHOULD identify assumptions that may invalidate the procedure.

---

# 19. Security and Sensitive Information

Documentation SHALL NOT become a source of security leakage.

## Prohibited Information

Documentation SHALL NOT contain real:

- Passwords.
- API keys.
- Access tokens.
- Private keys.
- Session secrets.
- Production credentials.
- Encryption keys.

## Sensitive Architecture

Security-sensitive architectural information SHOULD be documented only at the level necessary for the intended audience.

## Internal Information

Documentation MAY contain internal technical information when required for engineering purposes, but access SHALL respect the repository's security model.

## Examples

Examples SHALL use fake credentials and non-production identifiers.

## Personal Information

Documentation SHOULD avoid unnecessary personal information. Where personal data is required for a legitimate engineering purpose, the minimum necessary information SHOULD be used.

## Security Procedures

Security-sensitive procedures SHOULD identify required authorization, preconditions, audit requirements, escalation paths, verification, and recovery.

## Disclosure Review

Documents that introduce significant security-sensitive information SHOULD receive appropriate security review.

## Secrets in History

If a secret is accidentally committed to documentation:

1. The secret SHALL be considered compromised.
2. The credential SHOULD be revoked or rotated.
3. Repository history SHOULD be evaluated.
4. The incident SHOULD follow the applicable security process.

Simply deleting the line from the current document SHALL NOT be considered sufficient remediation.

---

# 20. Documentation Testing and Validation

Documentation SHALL be validated sufficiently to detect material defects.

## Link Validation

Internal links SHOULD be validated automatically where practical. Broken internal links SHALL be treated as documentation defects.

## Markdown Validation

Repositories SHOULD validate Markdown syntax where tooling is available.

## Heading Validation

Automated checks SHOULD detect broken heading hierarchy, duplicate identifiers where relevant, and missing required sections in normative documents.

## Example Validation

Executable examples SHOULD be tested where practical. Examples that cannot be executed automatically SHOULD be manually reviewed.

## API Documentation Validation

API documentation SHOULD be validated against the authoritative API specification. Where machine-readable contracts exist, automated validation SHOULD be preferred.

## Command Validation

Commands presented as operational procedures SHOULD be reviewed for syntax, required permissions, environment assumptions, and destructive behavior.

## Documentation CI

Repositories SHOULD consider documentation checks as part of CI, including:

```text
Markdown linting
Link checking
Spell checking
Schema validation
API contract validation
Example tests
Generated-document verification
```

## Freshness Checks

Repositories MAY use automated checks to identify expired references, deprecated dependencies, stale version references, and unreviewed documentation.

## Documentation Regression

Material documentation defects SHOULD receive regression protection when practical.

## Review Trigger

Documentation validation SHOULD occur before merging material documentation changes, before releases affecting documented behavior, during periodic reviews, and after incidents revealing documentation defects.

---

# PART IV — Governance

---

# 21. Review Checklist

## Document Purpose

- [ ] The document has a clearly defined purpose.
- [ ] The intended audience is identifiable.
- [ ] The document has an identifiable owner.
- [ ] The document classification is appropriate.
- [ ] The document has an appropriate lifecycle status.

## Accuracy

- [ ] The documented behavior is accurate.
- [ ] Assumptions are identified.
- [ ] The source of truth is clear.
- [ ] Conflicting documentation has been resolved.
- [ ] Known implementation drift is documented.

## Structure

- [ ] Required front matter is present where applicable.
- [ ] Headings follow a consistent hierarchy.
- [ ] A table of contents exists where appropriate.
- [ ] Sections are logically organized.
- [ ] Appendices contain supporting rather than essential material.

## Navigation

- [ ] Internal links are valid.
- [ ] External references are relevant.
- [ ] Authoritative sources are preferred.
- [ ] Version-specific references are identified where required.
- [ ] No unexplained links are present.

## Technical Content

- [ ] Code examples are syntactically valid where applicable.
- [ ] Examples reflect supported behavior.
- [ ] Commands have their required assumptions documented.
- [ ] Destructive operations are clearly identified.
- [ ] Version compatibility is documented where relevant.

## Security

- [ ] No secrets are present.
- [ ] No production credentials are present.
- [ ] Sensitive information is appropriately scoped.
- [ ] Security-sensitive procedures identify authorization requirements.
- [ ] Examples use fake credentials and identifiers.

## Lifecycle

- [ ] Version is correct.
- [ ] Status is correct.
- [ ] Deprecated content is clearly marked.
- [ ] Superseded documents link to replacements.
- [ ] Historical records are preserved where appropriate.

## Validation

- [ ] Markdown checks pass where applicable.
- [ ] Link checks pass.
- [ ] Required sections are present.
- [ ] Executable examples pass where applicable.
- [ ] API documentation matches the authoritative contract.
- [ ] Documentation CI checks pass.

---

# 22. Exceptions

Exceptions to this standard MAY be granted when strict compliance is technically or operationally inappropriate.

## Valid Reasons

Exceptions MAY be justified by:

- Legacy repository constraints.
- External tooling limitations.
- Regulatory requirements.
- Migration requirements.
- Third-party documentation requirements.
- Temporary compatibility requirements.
- Accessibility requirements.
- Security requirements.

Convenience alone SHOULD NOT justify an exception.

## Exception Record

A material exception SHOULD document:

- Affected requirement.
- Affected document.
- Reason.
- Impact.
- Risk.
- Compensating controls.
- Owner.
- Review date.
- Remediation plan where applicable.

## Temporary Exceptions

Temporary exceptions SHOULD include an expiration or review condition.

## Repeated Exceptions

Repeated exceptions SHOULD trigger review of the underlying standard. If the same exception repeatedly occurs, the standard SHOULD be reconsidered rather than accumulating permanent deviations.

---

# 23. Related Documents

This document forms part of the **AURA Engineering Standards** framework.

Related documents include:

- `README.md`
- `INDEX.md`
- `TABLE_OF_CONTENTS.md`
- `STYLE_GUIDE.md`
- `COMMIT_CONVENTION.md`
- `BRANCHING_STRATEGY.md`
- `RELEASE_PROCESS.md`
- `TESTING_STANDARD.md`
- `API_DESIGN_STANDARD.md`
- `DATA_MODELING_STANDARD.md`
- `OBSERVABILITY_STANDARD.md`
- `ERROR_HANDLING_STANDARD.md`
- `SECURITY.md`
- `CONTRIBUTING.md`

Related architectural artifacts MAY include RFCs, ADRs, architecture diagrams, schemas, runbooks, and incident documentation.

Where multiple documents apply to the same subject, the authoritative source SHOULD be followed.

---

# 24. Versioning

This document follows Semantic Versioning.

## Major Version

A Major version SHALL indicate an incompatible change to mandatory documentation requirements.

Examples include removing a mandatory metadata requirement, changing a mandatory structure incompatibly, removing a required validation control, or changing mandatory ownership requirements.

## Minor Version

A Minor version SHALL indicate backward-compatible additions such as new classifications, recommended validation, governance controls, or documentation guidance.

## Patch Version

A Patch version SHALL contain non-breaking changes such as typographical corrections, formatting improvements, clarifications, editorial corrections, or link corrections.

## Traceability

All revisions SHALL remain traceable through version control. Material revisions SHOULD reference the relevant RFC, ADR, issue, incident, architecture change, or release where applicable.

---

# 25. Document Status

| Field | Value |
|---|---|
| Status | Approved |
| Version | 1.0.0 |
| Classification | Engineering Standard |
| Owner | AURA Architecture Team |
| Document ID | GUIDE-DOC-0001 |
| Review Cycle | Annual |
| Next Review | YYYY-MM-DD |

## Authority

This document defines the official documentation requirements for repositories governed by the **AURA Engineering Standards**.

## Compliance

Repositories governed by this standard SHOULD comply with its requirements unless an approved exception exists.

## Review

This document SHOULD be reviewed periodically against repository evolution, architecture changes, documentation defects, production incidents, security requirements, tooling changes, developer feedback, and organizational changes.

---

# Appendix A — Documentation Classification Matrix

| Type | Primary Purpose | Normative | Typical Owner | Lifecycle |
|---|---|---:|---|---|
| Standard | Define engineering requirements | Yes | Architecture / Engineering | Long-lived |
| RFC | Propose a technical change | No | Proposal Owner | Temporary |
| ADR | Record a decision | Yes for decision outcome | Architecture / Decision Owner | Historical |
| Guide | Explain how to perform a task | Usually No | Feature / Team Owner | Maintained |
| Tutorial | Teach a workflow or concept | No | Documentation Owner | Maintained |
| Reference | Provide lookup information | Depends | Domain Owner | Maintained |
| Runbook | Operate or recover a system | Operationally Yes | Operations Owner | Maintained |
| Checklist | Verify repeated conditions | Depends | Process Owner | Maintained |
| Template | Provide reusable structure | No | Process Owner | Long-lived |
| Changelog | Record notable changes | No | Repository Maintainers | Historical |
| Architecture Doc | Describe system structure | Depends | Architecture Owner | Maintained |
| Schema Doc | Explain data contracts | Depends | Data Owner | Maintained |

## Classification Rule

A document SHOULD be assigned the classification that best describes its primary purpose.

If multiple classifications appear applicable, the document SHOULD be split or its primary purpose made explicit.

---

# Appendix B — Documentation Naming Matrix

| Artifact | Recommended Pattern | Example |
|---|---|---|
| README | `README.md` | `README.md` |
| Engineering Standard | `UPPER_SNAKE_CASE.md` | `ERROR_HANDLING_STANDARD.md` |
| Security Policy | `SECURITY.md` | `SECURITY.md` |
| Contribution Guide | `CONTRIBUTING.md` | `CONTRIBUTING.md` |
| Changelog | `CHANGELOG.md` | `CHANGELOG.md` |
| RFC | `RFC-###-description.md` | `RFC-001-api-versioning.md` |
| ADR | `ADR-###-description.md` | `ADR-001-database-selection.md` |
| Runbook | `RUNBOOK-<description>.md` | `RUNBOOK-DATABASE-RECOVERY.md` |
| Template | `<TYPE>_TEMPLATE.md` | `ADR_TEMPLATE.md` |
| Checklist | `<TYPE>_CHECKLIST.md` | `RELEASE_CHECKLIST.md` |

## Naming Requirements

File names SHOULD be descriptive, stable, consistent, and free of temporary or ambiguous naming.

---

# Appendix C — Documentation Lifecycle Matrix

| Status | Meaning | Expected Action |
|---|---|---|
| Draft | Work is incomplete | Continue development |
| Proposed | Ready for formal review | Obtain approval |
| Approved | Accepted but not necessarily active | Prepare adoption |
| Active | Current authoritative document | Maintain |
| Deprecated | Still available but should not be used for new work | Migrate consumers |
| Superseded | Replaced by another document | Follow replacement |
| Archived | Retained for historical purposes | Do not use as current authority |

## Lifecycle Flow

```text
Draft
  ↓
Proposed
  ↓
Approved
  ↓
Active
  ↓
Deprecated
  ↓
Superseded
  ↓
Archived
```

Not every document MUST pass through every state.

A document marked `Deprecated` SHOULD identify its replacement where one exists.

A document marked `Superseded` SHOULD link directly to the authoritative replacement.

An `Archived` document SHALL NOT be presented as the current source of truth.

---

# Appendix D — Documentation Review Checklist

```text
DOCUMENT ID:
DOCUMENT TITLE:
VERSION:
REVIEW DATE:
REVIEWER:
OWNER:

Purpose
[ ] Purpose is clear
[ ] Audience is clear
[ ] Classification is correct
[ ] Owner is defined

Accuracy
[ ] Content is accurate
[ ] Source of truth is identified
[ ] Assumptions are current
[ ] No known documentation drift remains unresolved

Structure
[ ] Front matter is correct
[ ] Heading hierarchy is valid
[ ] Table of contents is accurate
[ ] Sections are logically ordered
[ ] Appendices are appropriate

Navigation
[ ] Internal links work
[ ] External links are relevant
[ ] References point to authoritative sources
[ ] Version-specific references are correct

Technical Content
[ ] Examples are valid
[ ] Commands are safe
[ ] Configuration examples are correct
[ ] Version requirements are documented
[ ] API/schema references match their source

Security
[ ] No secrets are present
[ ] No production credentials are present
[ ] Sensitive information is appropriately scoped
[ ] Security procedures have appropriate authorization requirements

Lifecycle
[ ] Version is correct
[ ] Status is correct
[ ] Deprecations are documented
[ ] Superseded documents point to replacements
[ ] Historical information is preserved appropriately

Validation
[ ] Markdown checks pass
[ ] Link checks pass
[ ] Documentation CI passes
[ ] Executable examples pass where applicable
[ ] Contract validation passes where applicable

Governance
[ ] Required reviewers approved the change
[ ] Exceptions are documented
[ ] Related documents were evaluated
[ ] Material downstream impacts were considered

FINAL RESULT:

[ ] APPROVED
[ ] APPROVED WITH CONDITIONS
[ ] REQUIRES CHANGES
[ ] REJECTED
```

---

# End of Appendix D

# End of Document
