# RFC-0010 — Observability Architecture

**Status:** Accepted  
**Version:** 1.0.0  
**Priority:** High

## 1. Purpose

Define how AURA detects, explains, measures, and investigates system behavior.

## 2. Three Pillars

AURA SHALL implement Logs, Metrics, and Traces.

## 3. Correlation

Every externally initiated request and asynchronous job SHALL carry a correlation/trace identifier. Child operations SHALL preserve causal linkage.

## 4. Structured Logging

Production logs SHALL be machine-readable and include timestamp, severity, service/module, operation, correlation ID, outcome, and safe contextual identifiers. Secrets, credentials, tokens, payment secrets, and unnecessary personal data SHALL never be logged.

## 5. Metrics

Minimum technical metrics: request rate, error rate, latency percentiles, database latency, queue depth, worker failures, cache effectiveness where applicable, and resource utilization.

Minimum business metrics: payment success rate, entitlement fulfillment latency, activation success rate, course completion, and refund rate.

## 6. Tracing

Distributed tracing SHALL be supported across application boundaries and external calls where practical. Trace attributes SHALL be privacy-safe.

## 7. Alerting

Alerts SHALL be actionable and threshold-based or anomaly-based. Every critical alert SHALL have an owner and documented response path. Alert fatigue SHALL be minimized.

## 8. SLO Model

Production services SHALL define service-level indicators before committing to SLOs. Initial candidates include availability, latency, payment processing success, and background-job completion.

## 9. Audit vs Logs

Operational logs are not a replacement for business audit records. Financial, entitlement, authorization, and administrative events requiring durable history SHALL use the audit model.

## 10. Privacy

Observability pipelines SHALL apply data minimization, access controls, retention limits, and redaction.

## 11. Failure Investigation

Operators SHALL be able to trace critical operations through application logic, database activity, queue processing, and external provider interaction without exposing secrets.

## 12. Retention

Retention SHALL be defined by telemetry type and operational value. High-volume debug data SHOULD have shorter retention than security or audit evidence.

## 13. Definition of Done

Observability is complete when logs, metrics, traces, correlation, alerts, SLOs, audit boundaries, privacy controls, retention, and investigation workflows are defined.
