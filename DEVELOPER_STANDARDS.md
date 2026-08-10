# AURA Developer Standards

**Status:** Accepted  
**Version:** 1.0.0

## 1. Architecture

Code SHALL follow the ownership and dependency rules defined by the architecture baseline. Transport, domain, persistence, and infrastructure concerns SHALL remain separated.

## 2. Naming

Names SHALL communicate domain meaning. Abbreviations are prohibited when they reduce clarity. Generic names such as `data`, `thing`, `manager`, or `helper` SHALL not be used when a domain-specific name exists.

## 3. Functions

Functions SHALL have one coherent responsibility. Side effects SHALL be explicit. Null/undefined and invalid input paths SHALL be handled deliberately.

## 4. Error Handling

Errors SHALL be classified and propagated intentionally. Silent swallowing, empty catches, and generic success responses for failed operations are prohibited.

## 5. Validation

External input SHALL be validated at boundaries. Domain invariants SHALL be validated again inside authoritative application/domain logic where required.

## 6. Logging

Logs SHALL be structured and useful for diagnosis. Secrets, authentication credentials, payment secrets, and unnecessary PII SHALL not be logged.

## 7. Testing

New domain behavior SHALL include tests for success, invalid input, authorization failure, concurrency-sensitive behavior, and important failure modes.

## 8. Dependencies

Dependencies SHALL be justified by capability and risk. Unused or duplicate libraries SHALL be removed. Security and maintenance status SHALL be considered before adoption.

## 9. Git

Commits SHALL be small enough to review and describe one logical change. Generated files SHALL not be committed unless they are authoritative build artifacts.

## 10. Configuration

Environment-specific configuration SHALL not be hardcoded. Required configuration SHALL fail fast when missing.

## 11. API

Handlers SHALL remain thin. Business rules SHALL not be duplicated across controllers, workers, and background jobs.

## 12. Database

Database writes SHALL respect transaction boundaries and constraints. Application-level checks SHALL not replace database uniqueness or integrity constraints where concurrency can violate correctness.

## 13. Security

Least privilege is mandatory. Security-sensitive operations SHALL produce appropriate audit evidence.

## 14. Reviews

Architecture-affecting changes SHALL update the relevant RFC/ADR/contract. Implementation changes SHALL not silently redefine architectural ownership.

## 15. Definition of Done

A feature is not done when code merely works locally. It requires tests, validation, observability, documentation/contract updates, security review appropriate to risk, and deployability.
