# RFC-0018 — Analytics Architecture

**Status:** Accepted  
**Version:** 1.0.0  
**Priority:** High

## 1. Purpose

Define analytics collection, event semantics, storage, privacy, attribution, and reporting boundaries.

## 2. Source of Truth

Transactional systems remain authoritative for financial, entitlement, identity, and learning state. Analytics is derived and SHALL never mutate those states directly.

## 3. Event Taxonomy

Events SHALL have stable names, versioned schemas where necessary, timestamps, actor/context identifiers, and source information. Examples include UserRegistered, CourseViewed, OrderCreated, PaymentConfirmed, LectureCompleted, QuizSubmitted, and CourseCompleted.

## 4. Collection

Events MAY be emitted synchronously for critical audit semantics or asynchronously for product analytics. Analytics failures SHALL not corrupt core transactions.

## 5. Event Delivery

At-least-once delivery SHALL be assumed unless stronger guarantees are established. Consumers SHALL be idempotent.

## 6. Privacy

Analytics SHALL collect the minimum information required. Sensitive personal data SHALL be excluded unless explicitly justified and protected.

## 7. Identity

Analytics identifiers SHOULD use stable pseudonymous identifiers where possible. Credentials and payment secrets are prohibited.

## 8. Reporting

Business reports SHALL define formulas, time zones, freshness, filters, and source datasets. Reports SHALL not silently use incompatible metric definitions.

## 9. Data Quality

Analytics pipelines SHALL monitor event loss, duplication, schema drift, freshness, and processing failures.

## 10. Retention

Retention SHALL be proportional to analytical value and privacy requirements. Raw high-volume events MAY have shorter retention than aggregates.

## 11. Derived Models

Aggregates and dashboards SHOULD be rebuildable from authoritative event/data sources.

## 12. Access Control

Analytics access SHALL follow least privilege. Student-level data requires stricter access than aggregate metrics.

## 13. Definition of Done

Analytics Architecture is complete when event taxonomy, collection, delivery, privacy, identity, reporting definitions, quality, retention, derived models, and access controls are explicit.
