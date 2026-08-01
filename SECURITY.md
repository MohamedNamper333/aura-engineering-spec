# Security Policy

The AURA Engineering Specification repository is maintained with a security-first mindset.

This document defines how to report security issues, how they are handled, and how sensitive information should be treated in this repository.

---

# Purpose

This repository contains architecture, engineering, and governance material for the AURA platform.

Although it does not contain production source code, it may still contain sensitive design information, security constraints, threat models, implementation assumptions, and operational guidance.

This policy defines how to handle those concerns responsibly.

---

# Scope

This policy applies to:

- Repository documentation
- Architecture specifications
- RFCs and ADRs
- Standards
- Context packs
- Prompt packs
- Schemas
- Diagrams
- Checklists
- Templates

It also applies to any future files added to the repository that may affect the security posture of the AURA platform.

---

# Supported Versions

The following repository branches are considered active for security review purposes:

| Version / Branch | Status |
|------------------|--------|
| `main` | Supported |
| `bootstrap/aura-engineering-spec` | Supported until merged or retired |
| Archived branches | Not supported |

If a branch is archived or superseded, it should not be treated as a current security reference.

---

# What to Report

Please report any issue that could reasonably affect the confidentiality, integrity, or availability of the repository contents or the AURA platform design.

Examples include:

- Exposed secrets, keys, tokens, or credentials
- Sensitive data included in documentation
- Incorrect or unsafe security guidance
- Missing or inconsistent security requirements
- Unsafe assumptions in architecture or AI guidance
- Broken access-control design in specifications
- Vulnerable dependency guidance or insecure deployment assumptions
- Any document that could mislead implementers into creating insecure behavior

---

# What Not to Report

Please do not use the security channel for:

- Feature requests
- Styling opinions
- Minor wording suggestions
- General product feedback
- Non-security documentation improvements

Use normal repository contribution workflows for those items.

---

# How to Report a Vulnerability

If you discover a security issue, report it privately through the repository's security reporting workflow or by using the designated private contact channel established by the maintainers.

When reporting, please include as much of the following as possible:

- A clear description of the issue
- The affected file or section
- Why the issue is security-relevant
- Steps to reproduce, if applicable
- The potential impact
- Any suggested mitigation, if you have one

Do not open a public issue for security vulnerabilities unless the maintainers explicitly instruct you to do so.

---

# Responsible Disclosure

We ask reporters to practice responsible disclosure.

This means:

- Do not publicly disclose the issue before maintainers have had a chance to review it.
- Do not attempt to exploit the issue beyond what is necessary to demonstrate it.
- Do not access, modify, or share data that is not yours.
- Do not disrupt repository operations or platform planning workflows.

The maintainers will work to assess and remediate validated issues as quickly as practical.

---

# Security Response Process

When a report is received, the maintainers will typically follow this process:

1. Acknowledge receipt.
2. Validate the report.
3. Assess severity and scope.
4. Determine remediation strategy.
5. Update the relevant document or supporting artifact.
6. Record the fix in the repository history when appropriate.
7. Notify the reporter when the issue has been resolved or addressed.

If the issue affects architecture, standards, or implementation guidance, the maintainers may update the relevant RFC, ADR, or standard before any downstream implementation continues.

---

# Response Timeline

Target response times depend on severity and complexity.

| Severity | Initial Response | Target Follow-Up |
|----------|------------------|------------------|
| Critical | Within 24 hours | As soon as possible |
| High | Within 2 business days | Within 7 business days |
| Medium | Within 5 business days | Within 14 business days |
| Low | Best effort | Planned in a future update |

These targets are operational goals, not guarantees.

---

# Security Principles

The repository follows these security principles:

- Security by design
- Least privilege
- Defense in depth
- Secure defaults
- Privacy-aware documentation
- Traceable decisions
- No hidden assumptions
- No undocumented security behavior
- No secret values in source-controlled files

---

# Sensitive Information

Do not commit or publish the following to this repository:

- Passwords
- API keys
- Private tokens
- Private certificates
- Database credentials
- Personal student data
- Production payment data
- Session secrets
- Private encryption material
- Internal-only operational credentials
- Any confidential third-party credentials

If sensitive information is discovered, it should be removed immediately and treated as a security issue.

---

# AI Security Guidelines

AI-generated contributions to this repository must follow these rules:

- Do not invent secrets or credentials.
- Do not assert security claims without support.
- Do not generate insecure defaults.
- Do not weaken existing controls.
- Do not bypass security review.
- Do not modify security-sensitive guidance without human review.
- Do not produce content that could expose sensitive information.

AI output is always subject to human verification before it is accepted.

---

# Third-Party Dependencies

If a document references external libraries, services, or tools, the security implications must be considered before adoption.

Any dependency-related concern should be documented in the appropriate RFC, ADR, or standard.

---

# Repository Security Rules

The following rules apply to all repository work:

- Security requirements must be documented, not implied.
- Security-sensitive changes should be traceable to an RFC or ADR.
- Security updates should be treated as first-class changes.
- Public documentation must not expose private implementation details.
- Sensitive repository material should remain minimal and controlled.

---

# Disclosure Policy

The maintainers may choose to publish a security update, correction, or clarification after a vulnerability is handled.

Any public disclosure should avoid exposing exploit details that are not necessary for users or contributors to understand the resolution.

---

# Contact

Use the repository's private security reporting path for vulnerability reports.

If a dedicated security contact is later established, it should be added here and in the repository's main documentation.

---

# Legal Notice

This policy is provided to support responsible security reporting and secure repository governance.

It does not replace project-level legal, compliance, or contractual obligations.
