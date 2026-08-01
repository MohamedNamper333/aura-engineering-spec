# Contributing to AURA Engineering Specification

Thank you for contributing to the AURA Engineering Specification repository.

This repository is documentation-first and architecture-driven. Contributions are welcome when they improve clarity, correctness, governance, or traceability.

---

# Purpose of This Repository

This repository defines the engineering source of truth for AURA.

Contributions to this repository must improve at least one of the following:

- Architectural clarity
- Business rule precision
- Domain consistency
- Documentation quality
- AI agent usability
- Engineering governance
- Traceability between decisions and implementation

---

# Contribution Principles

## 1. Be Precise

Write clear, direct, unambiguous content.

## 2. Be Consistent

Follow the repository structure, naming conventions, and document templates.

## 3. Be Traceable

When adding or changing a rule, link it to the relevant RFC, ADR, standard, or schema.

## 4. Be Minimal but Complete

Do not add unrelated changes in the same contribution.

## 5. Be Reviewable

Every contribution should be understandable by both human reviewers and AI coding agents.

---

# What You Can Contribute

You may contribute the following:

- New RFCs
- RFC updates
- New ADRs
- Standard updates
- Schema definitions
- Prompt packs
- Context packs
- Diagrams
- Checklists
- Documentation improvements
- Typo fixes
- Clarifications
- Cross-reference fixes

---

# What You Should Not Contribute

Do not contribute changes that:

- Introduce undocumented architecture decisions
- Add implementation code before specifications exist
- Break existing document structure without justification
- Duplicate content across unrelated files
- Remove important traceability
- Replace clear engineering language with vague wording
- Modify standards without considering downstream impact

---

# Contribution Workflow

## 1. Read the Repository First

Before making changes, read:

1. `README.md`
2. `INDEX.md`
3. `TABLE_OF_CONTENTS.md`
4. Relevant RFCs
5. Relevant ADRs
6. Relevant standards

## 2. Identify the Change Type

Determine whether your change belongs to:

- RFC
- ADR
- Standard
- Schema
- Prompt
- Context pack
- Diagram
- Checklist

## 3. Make the Smallest Useful Change

Only change what is required to solve the problem.

## 4. Preserve Existing Structure

Follow the existing document format and file naming rules.

## 5. Validate the Result

Check for:

- Correct Markdown formatting
- Correct cross-references
- Correct numbering
- Correct terminology
- Consistency with related documents

---

# RFC Contribution Rules

RFCs define system-level intent and requirements.

When contributing to an RFC:

- Use the RFC template.
- Number requirements clearly.
- Use normative language where appropriate.
- Separate scope from out-of-scope items.
- Describe alternatives considered.
- Add traceability where relevant.

If the change affects architecture, domain boundaries, or business rules, update or add an RFC before implementation work begins.

---

# ADR Contribution Rules

ADRs capture architectural decisions.

When contributing to an ADR:

- Describe the context.
- State the decision.
- Explain the alternatives rejected.
- Document the consequences.
- Keep the record historical.

Do not rewrite old ADRs to hide past decisions. If a decision changes, create a new ADR that supersedes the old one.

---

# Standards Contribution Rules

Standards define mandatory rules for the repository.

When contributing to a standard:

- State the rule clearly.
- Explain why it exists.
- Keep the rule actionable.
- Avoid unnecessary overlap with other standards.
- Use consistent terminology.

---

# AI Agent Contribution Rules

AI agents may contribute to this repository only when their output follows the same governance rules as human contributions.

AI-generated contributions must:

- Follow the correct template
- Respect existing architecture
- Avoid inventing business rules
- Avoid introducing undocumented behavior
- Preserve traceability
- Be reviewed by a human maintainer before merging

AI agents must not modify architectural intent without a supporting RFC or ADR.

---

# Branch Strategy

Use a feature branch for every change.

Recommended branch names:

- `docs/<topic>`
- `rfc/<id>-<topic>`
- `adr/<id>-<topic>`
- `standards/<topic>`
- `fix/<topic>`

Keep branches focused and short-lived.

---

# Commit Message Convention

Use clear, scoped commit messages.

Examples:

- `docs: add contribution guidelines`
- `docs(rfc-0000): define project charter`
- `docs(adr-0001): record database decision`
- `docs(standards): add naming convention`

---

# Pull Request Requirements

Every pull request should include:

- A clear summary of the change
- The reason for the change
- Related RFCs or ADRs
- Validation notes
- Any follow-up work

Keep pull requests small and reviewable.

---

# Definition of Done

A contribution is complete when:

- It follows the correct template
- It is consistent with the repository structure
- It includes relevant traceability
- It does not introduce unexplained ambiguity
- It has been reviewed and accepted

---

# Documentation Quality Requirements

All contributions should be:

- Clear
- Structured
- Traceable
- Maintainable
- AI-readable
- Human-readable
- Consistent with existing repository decisions

---

# Review Expectations

Maintainers should check that a contribution:

- Matches repository goals
- Uses correct terminology
- Preserves architectural consistency
- Avoids unnecessary complexity
- Improves the repository instead of expanding noise

---

# Communication

If a contribution affects architecture, security, finance, or implementation standards, raise the issue early and document the decision path.

Do not rely on implicit assumptions.

---

# License

By contributing to this repository, you agree that your contributions will be managed under the repository license and project governance rules.
