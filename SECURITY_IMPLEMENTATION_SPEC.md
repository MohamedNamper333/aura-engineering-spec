# AURA Security Implementation Specification

**Status:** Accepted  
**Version:** 1.0.0  
**Owner:** Security / Architecture Governance

## 1. Purpose

Translate security architecture principles into implementation controls and verification gates.

## 2. Authentication Controls

- Passwords SHALL be stored only as adaptive password hashes.
- Login and recovery endpoints SHALL be rate-limited and monitored for abuse.
- Recovery tokens SHALL be short-lived, single-use, scoped, and invalidated after successful use.
- Session credentials SHALL be protected against theft and fixation.
- Privilege changes SHALL trigger appropriate session/token invalidation or rotation.

## 3. Authorization

Authorization SHALL fail closed.

Every protected operation SHALL evaluate the relevant combination of:

```text
Identity
+ Permission/Role
+ Resource Ownership
+ Business State
+ Entitlement
```

A client-provided role, price, payment status, entitlement, or completion flag SHALL never be trusted as authority.

## 4. Privileged Operations

Administrative and financial operations SHALL require explicit permissions. High-impact actions SHOULD require step-up authentication or equivalent control.

Material privileged actions SHALL produce audit evidence containing actor, action, target, timestamp, request/correlation ID, and outcome where legally/operationally appropriate.

## 5. Session Security

Sessions SHALL define expiration, revocation, secure transport, secure storage, and rotation policy. Long-lived credentials SHOULD be minimized.

Logout/revocation SHALL be enforceable server-side for sessions that require immediate invalidation.

## 6. API Security

- Validate all input against schemas.
- Reject unexpected privileged fields.
- Enforce authorization after authentication and before protected state changes.
- Apply endpoint-specific rate limits.
- Return stable safe errors without internal stack traces.
- Require HTTPS in production.

## 7. Payment Security

Payment secrets and provider credentials SHALL remain server-side.

Webhook authenticity SHALL be verified before state mutation. Replay protection SHALL be implemented where provider mechanisms support it.

Payment callbacks SHALL be idempotent and SHALL never allow the client to assert successful payment.

## 8. Activation-Code Security

Redeemable code material SHALL be protected from ordinary logs and analytics. Redemption SHALL be atomic, rate-limited, and resistant to enumeration and brute force.

## 9. File Upload Security

Uploads SHALL validate:

- Size limits.
- Allowed media types.
- File signatures where applicable.
- Filename/path safety.
- Malware scanning where risk requires it.
- Storage isolation.

User-controlled filenames SHALL never become executable or traversal-capable paths.

## 10. Content Protection

Protected learning assets SHALL not rely on obscurity. Authorization/entitlement SHALL be checked before issuing access to private assets.

Signed or short-lived asset URLs MAY be used where appropriate.

## 11. Secrets Management

Secrets SHALL be stored in approved secret-management facilities or protected deployment configuration, never committed to source control.

Secrets SHALL have ownership, rotation, and revocation procedures.

## 12. Data Protection

Sensitive personal data SHALL be minimized. Logs SHALL redact credentials, tokens, payment secrets, and unnecessary personal information.

Encryption SHALL be used in transit and at rest where required by risk and infrastructure policy.

## 13. Browser / Edge Controls

Production web applications SHALL define and enforce appropriate:

- Content Security Policy.
- Secure transport policy.
- Cookie security attributes where cookies are used.
- Clickjacking protection.
- MIME sniffing protection.
- Referrer policy.

Exact values belong to deployment configuration and SHALL be tested rather than assumed.

## 14. Abuse Prevention

Controls SHALL cover credential stuffing, brute force, enumeration, scraping, code abuse, payment abuse, and excessive API usage according to risk.

Rate limiting SHALL be paired with monitoring; rate limiting alone is not an abuse-detection strategy.

## 15. Logging and Audit

Security logs SHALL be structured and correlated. Sensitive values SHALL be excluded or redacted.

Audit evidence for material actions SHALL be durable and access-controlled.

## 16. Dependency Security

Dependencies SHALL be pinned/controlled according to the repository dependency standard. Automated vulnerability scanning SHALL run in CI, with documented exceptions and expiry.

## 17. Threat Modeling

New high-risk flows SHALL undergo threat modeling before production release, especially payments, authentication, file uploads, privileged administration, webhooks, and AI retrieval/actions.

## 18. Incident Response

Security incidents SHALL support containment, credential/session revocation, evidence preservation, recovery, communication, and post-incident review.

## 19. Verification Gates

Security implementation is not complete until automated/manual checks cover:

- Authentication abuse.
- Authorization bypass attempts.
- IDOR/resource ownership.
- Input validation.
- Session invalidation.
- Webhook forgery/replay.
- Rate limits.
- Secret leakage.
- File upload abuse.
- Dependency vulnerabilities.
- Security headers.

## 20. AI Security

AI inputs are untrusted. Prompt injection, malicious retrieved documents, tool misuse, data exfiltration, and unauthorized action execution SHALL be considered in threat models.

AI outputs SHALL never bypass ordinary authorization or domain invariants.
