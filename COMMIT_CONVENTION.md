---
document_id: GUIDE-COMMIT-0001

title: Commit Convention

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

# Commit Convention

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial enterprise commit convention. |

---

# Table of Contents

## Definitions

## Normative Language

---

## PART I — Commit Philosophy

1. Purpose
2. Scope
3. Commit Philosophy
4. Core Principles

---

## PART II — Commit Structure

5. Conventional Commit Format
6. Commit Types
7. Scope
8. Commit Subject
9. Commit Body
10. Breaking Changes
11. Atomic Commits
12. Commit Hygiene
13. Examples

---

## PART III — Repository Workflow

14. Commit Frequency
15. Branch Interaction
16. Merge Strategy
17. Revert Commits
18. Squashing
19. Release Tagging
20. Commit Quality Checklist

---

## PART IV — Governance

21. Review Checklist
22. Exceptions
23. Related Documents
24. Versioning
25. Document Status

---

# Definitions

The following definitions establish consistent terminology throughout this document.

---

## Commit

A Git object representing a logical set of repository changes.

A commit records source modifications together with metadata such as the author, timestamp, and commit message.

---

## Commit Message

The textual description explaining the purpose and intent of a commit.

Commit messages provide historical context and support repository maintenance.

---

## Conventional Commit

A commit message following the Conventional Commits specification.

It communicates the nature of the change through a standardized format.

---

## Scope

An optional identifier describing the primary component, module, or feature affected by a commit.

---

## Breaking Change

A modification that introduces behavior incompatible with previous versions.

Breaking changes require explicit communication.

---

## Atomic Commit

A commit containing one logical engineering change.

Atomic commits simplify review, debugging, and rollback.

---

## Revert

A commit that reverses the effects of a previous commit while preserving repository history.

---

## Squash

The process of combining multiple commits into a single logical commit.

---

## Tag

A Git reference identifying a specific repository version, commonly used for releases.

---

# Normative Language

The keywords **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** used throughout this document are interpreted according to the principles defined in RFC 2119.

---

## SHALL

Indicates an absolute requirement.

---

## SHALL NOT

Indicates an absolute prohibition.

---

## SHOULD

Indicates a strong recommendation.

---

## SHOULD NOT

Indicates a generally discouraged practice.

---

## MAY

Indicates an optional practice.

---

# PART I — Commit Philosophy

---

# 1. Purpose

## Objective

This document defines the official commit message standard for repositories governed by the **AURA Engineering Standards**.

Its purpose is to establish consistent commit practices that improve repository history, collaboration, code review, traceability, and release management.

Commit messages are considered engineering documentation and SHALL communicate the intent of every repository change.

---

## Mission

The Commit Convention exists to:

- Standardize repository history.
- Improve collaboration.
- Simplify code reviews.
- Support release automation.
- Improve traceability.
- Facilitate debugging.
- Improve long-term repository maintainability.

---

## Philosophy

Every commit SHOULD describe **why** a change exists rather than merely **what** changed.

Source code shows the implementation.

Commit messages explain the engineering intent behind that implementation.

Repository history SHOULD remain understandable years after changes are introduced.

---

## Design Goals

Commit practices SHOULD maximize:

- Clarity
- Consistency
- Traceability
- Readability
- Automation
- Maintainability
- Release management

---

## Relationship to Other Standards

This document complements:

- CONTRIBUTING.md
- STYLE_GUIDE.md
- TESTING_STANDARD.md
- PR_TEMPLATE.md
- RFC_TEMPLATE.md
- ADR_TEMPLATE.md
- SECURITY.md

Commit conventions SHALL remain consistent with the overall engineering governance framework.

---

## Expected Outcome

Following this standard SHOULD produce repository histories that are:

- Consistent
- Searchable
- Self-explanatory
- Automation-friendly
- Easy to review
- Easy to audit

Repository history is treated as a long-term engineering asset.

# 2. Scope

## Objective

This Commit Convention applies to every repository governed by the **AURA Engineering Standards**.

It establishes consistent expectations for commit creation regardless of repository size, programming language, or development methodology.

---

## Applies To

This standard applies to commits affecting:

- Source code.
- Documentation.
- Infrastructure.
- Configuration.
- CI/CD pipelines.
- Tests.
- Build systems.
- Security configurations.
- Repository maintenance.

Every repository contribution SHOULD follow these conventions.

---

## Contributors

This document applies to:

- Repository Maintainers.
- Internal Developers.
- External Contributors.
- Contractors.
- Automation Systems.

Automated commits SHOULD also follow standardized commit conventions whenever practical.

---

## Repository Independence

The engineering principles defined in this document are independent of:

- Programming language.
- Framework.
- Operating system.
- Git hosting platform.

Repositories MAY use different tooling while preserving identical commit conventions.

---

## Workflow Compatibility

These conventions are compatible with common Git workflows, including:

- GitHub Flow.
- Git Flow.
- Trunk-Based Development.
- Release Branch workflows.
- Monorepositories.

Workflow selection SHALL NOT affect commit quality expectations.

---

## Exceptions

Temporary deviations MAY occur under exceptional engineering circumstances.

Significant deviations SHOULD be documented according to repository governance.

Engineering convenience alone SHOULD NOT justify breaking commit conventions.

# 3. Commit Philosophy

## Objective

Commits represent the permanent engineering history of a repository.

Each commit SHOULD communicate a single logical change together with the engineering intent behind that change.

Repository history is considered long-term documentation.

---

## History as Documentation

Commit history SHOULD explain the evolution of the software.

Future contributors SHOULD understand:

- Why a change occurred.
- What problem was solved.
- How repository behavior evolved.

Well-written history reduces future maintenance costs.

---

## Intent Over Implementation

Source code already describes implementation.

Commit messages SHOULD explain:

- Motivation.
- Reasoning.
- Business intent.
- Architectural purpose.

The engineering rationale SHOULD remain understandable long after implementation details evolve.

---

## Small Logical Changes

Repositories SHOULD prefer multiple small commits over large unrelated commits.

Each commit SHOULD represent one logical engineering objective.

Smaller commits improve:

- Code review.
- Debugging.
- Rollback.
- Repository navigation.

---

## Traceability

Commit history SHOULD allow engineers to trace:

- Feature introduction.
- Bug fixes.
- Architectural changes.
- Security improvements.
- Performance optimizations.

Traceability improves long-term repository governance.

---

## Reviewability

Every commit SHOULD be independently understandable during review.

Reviewers SHOULD NOT need to inspect unrelated commits to understand the current change.

Logical separation improves engineering quality.

---

## Automation

Well-structured commit messages enable automation including:

- Automatic changelog generation.
- Release notes.
- Semantic versioning.
- Deployment pipelines.
- Repository analytics.

Commit quality directly supports engineering automation.

---

## Long-Term Value

Repositories SHOULD prioritize long-term maintainability over short-term convenience.

Commit history becomes increasingly valuable as repositories mature.

# 4. Core Principles

## Objective

The following principles define the expected characteristics of every commit created within repositories governed by the **AURA Engineering Standards**.

These principles apply regardless of repository size or workflow.

---

## Principle 1 — Clarity

Commit messages SHALL clearly describe the purpose of the change.

Readers SHOULD immediately understand the engineering intent without examining the implementation.

---

## Principle 2 — Consistency

Repositories SHALL follow a consistent commit structure.

Uniform history improves:

- Navigation.
- Automation.
- Collaboration.
- Maintenance.

---

## Principle 3 — Atomicity

Each commit SHOULD contain one logical engineering change.

Avoid combining unrelated modifications into a single commit.

Atomic commits simplify review and rollback.

---

## Principle 4 — Traceability

Commit history SHOULD allow repository evolution to be reconstructed accurately.

Important engineering decisions SHOULD remain discoverable through commit history.

---

## Principle 5 — Readability

Commit messages SHOULD remain concise while providing sufficient engineering context.

Readable history benefits future contributors.

---

## Principle 6 — Reviewability

Each commit SHOULD be independently reviewable.

Reviewers SHOULD understand a commit without relying upon unrelated repository changes.

---

## Principle 7 — Automation Compatibility

Commit messages SHOULD support automated tooling including:

- Semantic versioning.
- Changelog generation.
- Release automation.
- CI/CD pipelines.

Standardization improves repository tooling.

---

## Principle 8 — Maintainability

Repository history SHALL remain maintainable throughout the software lifecycle.

Well-structured commits improve debugging, auditing, and future development.

Commit quality is considered an integral part of engineering quality.

# PART II — Commit Structure

---

# 5. Conventional Commit Format

## Objective

Repositories governed by the **AURA Engineering Standards** SHALL use a standardized commit message structure based on the Conventional Commits specification.

A consistent format improves readability, automation, and repository history.

---

## Standard Format

Commit messages SHOULD follow the structure below:

```text
<type>(<scope>): <subject>
```

When no scope is necessary:

```text
<type>: <subject>
```

---

## Optional Body

Additional engineering context MAY follow the subject.

Example:

```text
feat(auth): add JWT refresh token support

Implement automatic refresh token rotation.

Improve session security.

Reduce authentication interruptions.
```

---

## Optional Footer

Footers MAY communicate additional metadata.

Examples include:

- Breaking Changes
- Issue References
- RFC References
- ADR References

Example:

```text
BREAKING CHANGE: Authentication API now requires refresh tokens.

Refs: #142
```

---

## Formatting Rules

Repositories SHOULD follow these formatting rules:

- One commit per logical change.
- One-line subject.
- Blank line before body.
- Blank line before footer.
- No trailing whitespace.
- UTF-8 encoding.

---

## Benefits

A standardized structure supports:

- Automated changelog generation.
- Semantic versioning.
- Release automation.
- Improved code reviews.
- Better repository history.

Commit structure SHALL remain consistent across the repository.
# 6. Commit Types

## Objective

Commit types communicate the primary purpose of a repository change.

Every commit SHALL begin with one recognized commit type.

---

## Standard Types

### feat

Introduces new functionality.

Example:

```text
feat(auth): add OAuth2 login support
```

---

### fix

Corrects incorrect behavior.

Example:

```text
fix(api): handle invalid pagination values
```

---

### docs

Updates documentation only.

Example:

```text
docs(readme): update installation guide
```

---

### style

Formatting changes without behavioral modification.

Examples include:

- Whitespace
- Formatting
- Indentation

---

### refactor

Internal code improvements without changing observable behavior.

Example:

```text
refactor(cache): simplify eviction logic
```

---

### perf

Performance improvements.

Example:

```text
perf(database): optimize query execution
```

---

### test

Adds or modifies automated tests.

Example:

```text
test(auth): add refresh token integration tests
```

---

### build

Changes build systems or dependencies.

Examples include:

- Package managers
- Build configuration
- Dependency updates

---

### ci

Changes Continuous Integration or deployment pipelines.

Example:

```text
ci(github): update workflow permissions
```

---

### chore

Repository maintenance that does not affect production behavior.

Examples include:

- Cleanup
- Tooling
- Repository configuration

---

### revert

Reverts a previous commit.

Example:

```text
revert: revert authentication middleware changes
```

---

## Custom Types

Repositories MAY introduce additional commit types when justified.

Custom types SHOULD remain:

- Documented.
- Consistent.
- Rare.

Standard types SHOULD be preferred whenever possible.
# 7. Scope

## Objective

The optional scope identifies the primary repository component affected by a commit.

Scopes improve repository navigation and simplify change tracking.

---

## Format

Scopes SHALL appear inside parentheses immediately after the commit type.

Example:

```text
feat(auth): add password reset flow
```

---

## Examples

Valid scopes MAY include:

```text
auth

api

database

cache

security

ci

docker

docs

ui

payments

notifications

users

orders

tests
```

Repositories MAY define additional scopes appropriate to their architecture.

---

## Naming

Scopes SHOULD be:

- Short.
- Descriptive.
- Lowercase.
- Consistent.

Avoid:

```text
AuthenticationModule

VeryLongComponentName

MiscStuff
```

---

## Optional Usage

Scopes MAY be omitted when the affected area is obvious or repository-wide.

Example:

```text
docs: improve contribution guide
```

---

## Consistency

Repositories SHOULD avoid using multiple names for the same component.

Example:

Choose one:

```text
auth
```

Avoid alternating between:

```text
authentication

login

security-auth
```

Consistency improves repository history and searchability.


# 8. Commit Subject

## Objective

The commit subject is the primary summary of the repository change.

It SHALL communicate the engineering intent clearly and concisely.

---

## General Rules

The subject SHOULD:

- Describe one logical change.
- Be understandable without reading the body.
- Remain concise.
- Describe the result of the change.

The subject SHOULD explain **what the commit accomplishes**.

---

## Style

Subjects SHOULD:

- Use the imperative mood.
- Begin with a lowercase letter after the type.
- Avoid ending with a period.
- Remain consistent throughout the repository.

Preferred:

```text
feat(api): add invoice export endpoint
```

Avoid:

```text
feat(api): added invoice export endpoint.

feat(api): invoice export endpoint was added
```

---

## Length

Commit subjects SHOULD remain reasonably short.

Recommended maximum:

```text
72 characters
```

Longer descriptions belong in the commit body.

---

## Clarity

Subjects SHOULD communicate meaningful engineering intent.

Good examples:

```text
fix(cache): prevent stale session reuse

feat(users): support profile avatars

perf(api): reduce serialization overhead
```

Poor examples:

```text
update

fix

changes

misc

final

stuff

asdf
```

---

## One Purpose

Each subject SHOULD summarize one engineering objective.

If multiple unrelated objectives exist, multiple commits SHOULD be created.

# 9. Commit Body

## Objective

The commit body provides additional engineering context that cannot reasonably fit within the subject.

The body explains **why** a change exists rather than repeating **what** changed.

---

## When to Use

A commit body SHOULD be included whenever:

- The change is non-trivial.
- Architectural decisions are involved.
- Future maintainers require context.
- Trade-offs were considered.
- Important assumptions exist.

Small documentation or formatting commits MAY omit the body.

---

## Content

Commit bodies MAY explain:

- Motivation.
- Engineering rationale.
- Design decisions.
- Trade-offs.
- Performance considerations.
- Security implications.
- Migration notes.

---

## Formatting

The body SHALL begin after one blank line.

Example:

```text
fix(auth): prevent refresh token reuse

Refresh tokens are now invalidated immediately after use.

This prevents replay attacks while preserving existing
authentication behavior.
```

---

## Readability

Body paragraphs SHOULD:

- Be concise.
- Focus on engineering reasoning.
- Avoid unnecessary implementation details.
- Remain easy to read.

---

## Duplication

The body SHOULD NOT repeat the subject.

Instead, it SHOULD expand upon the reasoning behind the change.

---

## Long Explanations

Extremely detailed design discussions SHOULD reference:

- RFCs
- ADRs
- Issue trackers

rather than placing extensive documentation directly inside the commit.

# 10. Breaking Changes

## Objective

Breaking changes SHALL be communicated explicitly.

Engineers must understand when repository behavior becomes incompatible with previous versions.

---

## Identification

Breaking changes SHALL be declared using:

```text
BREAKING CHANGE:
```

within the commit footer.

Example:

```text
BREAKING CHANGE: Authentication now requires refresh tokens.
```

---

## Examples

Breaking changes include:

- Public API modifications.
- Removed functionality.
- Configuration incompatibilities.
- Database schema incompatibilities.
- Changed protocol behavior.

---

## Documentation

Breaking changes SHOULD include:

- Reason.
- Migration guidance.
- Compatibility considerations.

Repository users SHOULD understand how to adopt the new behavior.

---

## Semantic Versioning

Breaking changes SHOULD trigger a major version increment according to Semantic Versioning.

---

## Review

Breaking changes SHOULD receive additional engineering review before merging.

Repository maintainers SHOULD carefully evaluate migration impact.

# 11. Atomic Commits

## Objective

Every commit SHOULD represent one complete logical engineering change.

Atomic commits improve repository history, review quality, debugging, and rollback safety.

---

## Characteristics

An atomic commit:

- Solves one problem.
- Implements one feature.
- Fixes one defect.
- Performs one refactoring.

It SHOULD leave the repository in a working state.

---

## Benefits

Atomic commits improve:

- Code review.
- Git bisect.
- Rollback.
- Changelog generation.
- Repository traceability.

---

## Avoid

Avoid commits that simultaneously:

- Add features.
- Fix unrelated bugs.
- Reformat code.
- Update dependencies.
- Rewrite documentation.

Separate unrelated work into multiple commits.

---

## Working Repository

Every commit SHOULD preserve a buildable and testable repository whenever practical.

Broken intermediate commits SHOULD remain rare.

---

## Engineering Discipline

Atomic commits require planning.

Contributors SHOULD structure work so logical repository history emerges naturally.

# 12. Commit Hygiene

## Objective

Repository history SHALL remain clean, understandable, and maintainable.

Commit hygiene ensures repository evolution remains useful throughout its lifetime.

---

## Avoid Noise

Repositories SHOULD avoid unnecessary commits such as:

```text
wip

temp

fix again

trying something

asdf

update

changes
```

These messages provide little engineering value.

---

## Temporary Commits

Temporary work MAY exist locally.

Before sharing work, contributors SHOULD:

- Squash.
- Reword.
- Remove unnecessary commits.

Public repository history SHOULD remain clean.

---

## Consistency

Repositories SHOULD consistently apply:

- Commit format.
- Scope naming.
- Subject style.
- Footer formatting.

Consistency improves repository professionalism.

---

## Review Before Push

Contributors SHOULD review commit history before pushing changes.

Repository history SHOULD accurately represent engineering progress.

---

## Long-Term Value

Every commit becomes permanent repository documentation.

Contributors SHOULD create history that remains valuable years after implementation.

# 13. Examples

## Good Examples

Feature:

```text
feat(auth): add password reset endpoint
```

Bug Fix:

```text
fix(cache): prevent stale token reuse
```

Documentation:

```text
docs(readme): clarify installation steps
```

Performance:

```text
perf(database): optimize invoice lookup query
```

Testing:

```text
test(api): add integration tests for invoice service
```

CI:

```text
ci(github): update workflow cache strategy
```

---

## Breaking Change Example

```text
feat(api): redesign authentication endpoints

BREAKING CHANGE: Legacy authentication routes have been removed.
```

---

## Poor Examples

```text
update

changes

fix

misc

temp

asdf

done

new
```

These commit messages SHOULD NOT appear within repository history because they fail to communicate engineering intent.

# PART III — Repository Workflow

---

# 14. Commit Frequency

## Objective

Commits SHOULD be created frequently enough to represent meaningful engineering progress while avoiding unnecessary repository noise.

Frequent logical commits improve collaboration, review quality, debugging, and repository traceability.

---

## General Principles

Contributors SHOULD commit:

- After completing one logical task.
- Before beginning unrelated work.
- Before significant refactoring.
- Before risky implementation changes.

Repositories SHOULD avoid excessively large commits.

---

## Recommended Frequency

Engineering teams SHOULD prefer:

- Small commits.
- Self-contained commits.
- Buildable commits.
- Testable commits.

The exact frequency MAY vary depending on repository complexity.

---

## Avoid Excessive Delay

Long periods without commits increase:

- Review complexity.
- Merge conflicts.
- Rollback difficulty.
- Loss of engineering context.

Regular commits improve repository health.

---

## Local Work

Developers MAY create temporary local commits during development.

Before pushing shared history, repository history SHOULD be cleaned according to repository policies.

---

## Repository Quality

Commit frequency SHALL balance:

- Engineering productivity.
- Review efficiency.
- Repository readability.

Neither extremely frequent nor excessively delayed commits are encouraged.

# 15. Branch Interaction

## Objective

Commits SHALL integrate cleanly with the repository branching strategy.

Branch history SHOULD remain understandable and predictable.

---

## Branch Independence

Each branch SHOULD represent one engineering objective.

Examples include:

- Feature development.
- Bug fixes.
- Documentation improvements.
- Infrastructure updates.

Branches SHOULD avoid unrelated work.

---

## Commit Alignment

Commits within a branch SHOULD contribute toward the same engineering goal.

Unrelated commits SHOULD be moved into separate branches whenever practical.

---

## Synchronization

Long-lived branches SHOULD periodically synchronize with their target branch to reduce merge complexity.

---

## Review Readiness

Before opening a Pull Request, contributors SHOULD verify:

- Commit history is clean.
- Temporary commits are removed.
- Commit messages follow repository conventions.
- Build and tests succeed.

---

## Repository Consistency

Branch history SHOULD clearly communicate repository evolution.

Branch interaction SHALL preserve repository readability over time.

# 16. Merge Strategy

## Objective

Repository merges SHALL preserve a clean, understandable engineering history.

Merge strategy SHOULD support long-term maintainability.

---

## Approved Merge Methods

Repositories MAY use:

- Merge Commit.
- Squash Merge.
- Rebase Merge.

The selected strategy SHOULD remain consistent across the repository.

---

## Merge Quality

Before merging, reviewers SHOULD verify:

- CI passes.
- Required reviews are complete.
- Repository standards are satisfied.
- No unresolved conflicts remain.

---

## Conflict Resolution

Merge conflicts SHOULD be resolved carefully.

Conflict resolution SHOULD preserve:

- Functional correctness.
- Architectural consistency.
- Testing integrity.

---

## Repository History

Merge operations SHOULD improve—not reduce—the readability of repository history.

History is considered a permanent engineering asset.

---

## Automation

Repositories MAY automate merge approval after required validation has completed successfully.

Automation SHALL respect repository governance policies.

# 17. Revert Commits

## Objective

Repository history SHALL preserve traceability even when reverting previous work.

Reverts SHOULD be performed through dedicated revert commits whenever practical.

---

## Preferred Approach

Rather than rewriting shared history, contributors SHOULD create explicit revert commits.

Example:

```text
revert: remove experimental caching implementation
```

---

## Benefits

Revert commits:

- Preserve history.
- Simplify auditing.
- Support debugging.
- Improve traceability.

---

## Documentation

When practical, revert commits SHOULD explain:

- Why the revert occurred.
- Whether replacement work is planned.
- Related issues or incidents.

---

## Emergency Reverts

Critical production issues MAY require immediate revert commits.

Engineering review SHOULD follow once system stability has been restored.

---

## History Preservation

Repositories SHOULD avoid force-rewriting shared history unless explicitly approved under repository governance.

# 18. Squashing

## Objective

Squashing combines multiple related commits into a single logical commit before integration.

Proper squashing improves repository readability.

---

## Appropriate Usage

Squashing is recommended when:

- Temporary commits exist.
- Work-in-progress commits accumulated.
- Commit history contains unnecessary noise.

---

## Preserve Meaning

Squashing SHOULD preserve engineering intent.

Important implementation milestones SHOULD NOT disappear unnecessarily.

---

## Avoid Excessive Squashing

Repositories SHOULD avoid combining unrelated engineering work into a single commit.

Logical separation remains more valuable than minimal commit counts.

---

## Pull Requests

Squash merging MAY be preferred for feature branches when it produces cleaner repository history.

Repository policy SHOULD define preferred merge behavior.

---

## Repository History

Final shared history SHOULD remain:

- Logical.
- Readable.
- Traceable.
- Easy to review.

# 19. Release Tagging

## Objective

Repository releases SHOULD be identified through consistent Git tags.

Tags provide stable references for deployment, documentation, and version history.

---

## Version Format

Repositories SHOULD use Semantic Versioning.

Example:

```text
v1.0.0

v1.2.4

v2.0.0
```

---

## Tag Creation

Release tags SHOULD be created only after:

- Required reviews.
- Successful CI.
- Testing completion.
- Release approval.

---

## Immutable References

Published release tags SHOULD remain immutable.

Creating new tags is preferred over modifying existing release history.

---

## Documentation

Release tags SHOULD correspond with:

- Release notes.
- Changelogs.
- Deployment records.

---

## Traceability

Release tags improve long-term repository traceability and operational support.

# 20. Commit Quality Checklist

## Objective

Every commit SHOULD satisfy the following engineering checklist before becoming part of shared repository history.

---

## Functional Quality

- Correct implementation.
- No unrelated changes.
- Repository builds successfully.
- Tests pass.

---

## Commit Message

- Correct commit type.
- Appropriate scope.
- Clear subject.
- Meaningful body (when required).
- Proper footer (when applicable).

---

## Repository Standards

- Follows STYLE_GUIDE.md.
- Follows TESTING_STANDARD.md.
- Follows CONTRIBUTING.md.
- Follows SECURITY.md.

---

## Repository History

- Atomic commit.
- No temporary commits.
- No debugging artifacts.
- No unnecessary formatting-only changes.

---

## Review Readiness

Before pushing, contributors SHOULD verify:

- Commit quality.
- Repository consistency.
- Documentation updates.
- Automated verification.

---

## Expected Outcome

Following this checklist ensures repository history remains:

- Clean.
- Professional.
- Searchable.
- Maintainable.
- Suitable for long-term engineering collaboration.

# PART IV — Governance

---

# 21. Review Checklist

## Objective

Every commit SHOULD undergo appropriate engineering review before becoming part of the repository's permanent history.

The review process ensures commit quality, consistency, and long-term maintainability.

---

## Message Quality

Reviewers SHOULD verify:

- Correct commit type.
- Appropriate scope.
- Clear subject.
- Meaningful body when required.
- Proper footer formatting.

Commit messages SHALL accurately describe engineering intent.

---

## Repository Standards

Reviewers SHOULD confirm compliance with:

- STYLE_GUIDE.md
- TESTING_STANDARD.md
- CONTRIBUTING.md
- SECURITY.md

Repository standards SHALL remain consistent across all contributions.

---

## Atomicity

Reviewers SHOULD verify that:

- One logical change exists.
- No unrelated modifications are included.
- Repository history remains understandable.

Large unrelated commits SHOULD be rejected.

---

## Documentation

When applicable, reviewers SHOULD verify updates to:

- Documentation.
- ADR references.
- RFC references.
- Release notes.

Documentation SHALL evolve together with implementation.

---

## Automation

Reviewers SHOULD confirm:

- CI passes.
- Tests succeed.
- Static analysis completes.
- Required security verification passes.

---

## Approval Criteria

Commits SHOULD only be approved when reviewers are reasonably confident that:

- Repository standards are satisfied.
- Engineering quality is acceptable.
- Repository history remains maintainable.

# 22. Exceptions

## Objective

Engineering standards exist to improve repository quality.

Exceptional situations MAY require temporary deviations from these commit conventions.

Exceptions SHALL remain documented, justified, and periodically reviewed.

---

## Acceptable Exceptions

Examples include:

- Emergency production fixes.
- Legacy repository migration.
- Regulatory requirements.
- Third-party tooling limitations.
- Repository recovery operations.

Convenience alone SHOULD NOT justify exceptions.

---

## Documentation

Every significant exception SHOULD document:

- Engineering reason.
- Scope.
- Duration.
- Repository impact.
- Planned resolution (if temporary).

---

## Approval

Major deviations SHOULD receive approval from:

- Repository Maintainers.
- Architecture Owners.
- Security Reviewers (when applicable).

---

## Continuous Review

Temporary exceptions SHOULD be removed whenever practical.

Repository standards SHOULD be restored after exceptional circumstances conclude.

# 23. Related Documents

This document complements the remaining standards within the AURA Engineering Standards framework.

Related documents include:

- README.md
- CONTRIBUTING.md
- STYLE_GUIDE.md
- TESTING_STANDARD.md
- SECURITY.md
- CODE_OF_CONDUCT.md
- RFC_TEMPLATE.md
- ADR_TEMPLATE.md
- PR_TEMPLATE.md

These documents collectively define repository governance, engineering quality, testing practices, contribution workflows, architectural decisions, and software lifecycle management.

When guidance overlaps, repository standards SHOULD remain mutually consistent.
# 25. Document Status

## Document Information

| Field | Value |
|--------|-------|
| Status | Approved |
| Version | 1.0.0 |
| Classification | Engineering Standard |
| Owner | AURA Architecture Team |
| Document ID | GUIDE-COMMIT-0001 |
| Review Cycle | Annual |
| Next Review | YYYY-MM-DD |

---

## Authority

This document defines the official commit conventions for repositories governed by the **AURA Engineering Standards**.

All contributors are expected to understand and follow these requirements throughout software development, review, maintenance, and release activities.

---

## Continuous Improvement

Commit practices SHALL evolve alongside repository maturity.

Engineering teams SHOULD periodically review this document to ensure alignment with:

- Industry best practices.
- Repository governance.
- Git tooling.
- Release automation.
- Continuous Integration.

Repository history is considered a permanent engineering asset and SHALL be maintained with the same discipline applied to production source code.

---

# End of Document

