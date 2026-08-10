# RFC-0013 — Financial Architecture

**Status:** Accepted  
**Version:** 1.0.0  
**Priority:** Critical  
**Risk:** Critical

## 1. Purpose

Define financial boundaries and integrity controls for orders, payments, refunds, reconciliation, activation sales, and money calculations.

## 2. Financial Source of Truth

AURA's internal financial state is authoritative for business history. External providers are evidence and integration dependencies, not the internal source of truth.

## 3. Money Model

Money SHALL use exact decimal or integer minor units plus explicit currency. Floating-point arithmetic is prohibited for authoritative amounts.

## 4. Commercial Objects

```text
Product -> Price -> Order -> Payment Intent -> Transaction -> Entitlement
                                      \-> Refund
```

These objects SHALL not be collapsed into one record.

## 5. Order Lifecycle

Minimum conceptual states:

```text
Pending -> Payment Pending -> Paid -> Fulfilled
                       \-> Failed/Expired/Cancelled
Paid -> Partially Refunded -> Refunded
```

Exact transitions SHALL be enforced by domain rules.

## 6. Payment Processing

Payment operations SHALL use idempotency, provider references, callback verification, timeout handling, and reconciliation. Unknown outcomes SHALL remain explicitly unknown until resolved.

## 7. Reconciliation

Reconciliation SHALL compare internal transactions against provider evidence and identify missing confirmations, duplicates, amount/currency mismatches, unrecognized references, and refund mismatches.

## 8. Refunds

Refunds SHALL be append-oriented financial events. Historical payments SHALL not be rewritten. Total refunded amount SHALL not exceed refundable amount.

## 9. Entitlement Boundary

Successful payment and content entitlement are separate state transitions. Entitlement SHALL be granted only after defined confirmation criteria are satisfied.

## 10. Activation Codes

Activation-code generation, sale, redemption, revocation, and reconciliation SHALL be auditable.

## 11. Pricing

Prices SHALL be versioned or historically reconstructable. Orders SHALL preserve the price agreed at purchase time.

## 12. Currency and Rounding

Currency SHALL be explicit. Rounding SHALL be deterministic and applied at defined boundaries.

## 13. Audit

Payment, refund, entitlement, pricing, and administrative financial actions SHALL produce durable audit evidence without secrets.

## 14. Fraud and Abuse

The system SHOULD detect abnormal payment attempts, failed transactions, suspicious redemption, duplicate callbacks, and unusual refunds. Fraud signals SHALL not silently mutate authoritative state without an approved rule.

## 15. Provider Isolation

Each provider SHALL be implemented through a provider-neutral adapter. Provider payloads SHALL not leak into the domain.

## 16. Financial Reporting

Reports SHALL derive from authoritative transaction records and explicitly distinguish pending, failed, refunded, and reconciled states.

## 17. Chargebacks / Disputes

The architecture SHALL allow future dispute/chargeback lifecycle without corrupting original transaction history.

## 18. Definition of Done

Financial Architecture is complete when money precision, commercial objects, payment state, idempotency, reconciliation, refunds, entitlement separation, pricing history, fraud controls, provider isolation, reporting, and auditability are explicit.
