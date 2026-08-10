---
document_id: RFC-0017
title: Notification Architecture
status: Accepted
version: 1.0.0
category: Notification Architecture
priority: High
risk_level: Medium
owner: AURA Architecture Team
authors:
  - AURA Architecture Team
reviewers:
  - Repository Maintainers
approvers:
  - Repository Maintainers
created: 2026-08-10
updated: 2026-08-10
related_documents:
  - RFC_METADATA_STANDARD.md
  - OBSERVABILITY_STANDARD.md
  - ARCHITECTURE_DEPENDENCY_GRAPH.md
related_rfcs:
  - RFC-0010
  - RFC-0004
related_adrs: []
dependencies:
  - RFC-0004
  - RFC-0010
supersedes: null
superseded_by: null
tags:
  - notifications
  - messaging
  - delivery
  - providers
  - retry
---
# RFC-0017 — Notification Architecture

**Status:** Accepted  
**Version:** 1.0.0  
**Priority:** High

## 1. Purpose

Define reliable, provider-neutral notification delivery across in-app, email, SMS, and future channels.

## 2. Notification Boundary

Business domains emit notification-worthy facts; notification infrastructure determines channel, template, delivery, retry, and provider interaction.

## 3. Channels

Supported channels MAY include in-app, email, SMS, and push. Provider-specific code SHALL remain behind adapters.

## 4. Templates

Templates SHALL be versioned where content or legal/business meaning requires historical reconstruction. User-supplied data SHALL be escaped for the destination channel.

## 5. Delivery Model

Non-critical notifications SHOULD be asynchronous:

```text
Domain Event -> Notification Job -> Provider Adapter -> Delivery Result
```

## 6. Idempotency

Notification jobs SHALL define duplicate-delivery behavior. Security and financial notifications SHOULD use strong deduplication where duplicate messages could cause harm.

## 7. Retry

Transient provider failures MAY be retried with bounded exponential backoff. Permanent failures SHALL not be retried indefinitely.

## 8. Preferences

Users MAY control non-essential notifications according to product policy. Mandatory security or transactional notices SHALL follow separate rules.

## 9. Delivery State

A notification SHOULD track queued, processing, delivered, failed, suppressed, or expired states without rewriting historical attempts.

## 10. Privacy

Payloads SHALL minimize sensitive information. Email/SMS content SHALL not expose secrets or unnecessary account data.

## 11. Rate Controls

Bulk notifications SHALL be rate-limited and protected against accidental fan-out.

## 12. Definition of Done

Notification Architecture is complete when channels, adapters, templates, asynchronous delivery, idempotency, retry, preferences, states, privacy, and rate controls are defined.
