# RFC Metadata Standard

**Status:** Accepted  
**Version:** 1.0.0  
**Owner:** Architecture Governance

## 1. Purpose

All RFC documents SHALL use one canonical metadata schema so humans, tooling, and AI agents can reliably discover ownership, lifecycle, dependencies, and authority.

## 2. Canonical Header

Every RFC SHALL begin with YAML front matter using this shape:

```yaml
---
document_id: RFC-XXXX
title: <canonical title>
status: Proposed | Accepted | Deprecated | Superseded
version: MAJOR.MINOR.PATCH
category: <architecture category>
priority: Critical | High | Medium | Low
risk_level: Critical | High | Medium | Low
owner: <owning team>
authors:
  - <team or person>
reviewers:
  - <team or person>
approvers:
  - <team or person>
created: YYYY-MM-DD
updated: YYYY-MM-DD
related_documents:
  - <path>
related_rfcs:
  - RFC-XXXX
related_adrs:
  - ADR-XXXX
supersedes: null | RFC-XXXX
superseded_by: null | RFC-XXXX
dependencies:
  - RFC-XXXX
tags:
  - <tag>
---
```

## 3. Required Fields

The following fields are mandatory:

`document_id`, `title`, `status`, `version`, `category`, `priority`, `risk_level`, `owner`, `authors`, `reviewers`, `approvers`, `created`, `updated`, `related_documents`, `related_rfcs`, `related_adrs`, `supersedes`, `superseded_by`, `dependencies`, and `tags`.

## 4. Lifecycle Rules

- `Proposed`: under review and not authoritative.
- `Accepted`: authoritative within its declared scope.
- `Deprecated`: retained for historical context but no longer recommended.
- `Superseded`: replaced by another document and SHALL point to the replacement.

## 5. Versioning

RFC versions SHALL follow semantic versioning semantics:

- MAJOR: incompatible architectural meaning.
- MINOR: additive clarification or capability.
- PATCH: editorial or non-semantic correction.

## 6. Ownership

Every RFC SHALL have exactly one accountable owner. Multiple reviewers and approvers are allowed.

## 7. Dependencies

`dependencies` SHALL list documents whose authoritative constraints are required to interpret the RFC. `related_documents` MAY include supporting references that are not hard dependencies.

## 8. Dates

Dates SHALL use ISO-8601 calendar format `YYYY-MM-DD`.

## 9. Content Rules

Metadata SHALL describe the document; it SHALL not duplicate long-form architectural content. Architectural rules belong in the body.

## 10. Migration Rule

Existing RFCs that lack canonical metadata SHALL be normalized without changing their substantive architectural content. Metadata normalization is a documentation change, not permission to silently redesign an RFC.
