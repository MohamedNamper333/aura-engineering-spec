# RFC-0014 — Learning Platform Architecture

**Status:** Accepted  
**Version:** 1.0.0  
**Priority:** Critical

## 1. Purpose

Define architecture for enrollment, learning access, progress, assessments, completion, and learner-facing state.

## 2. Learning Boundary

Learning consumes entitlement decisions but SHALL not own payment logic. Commerce/payment determine commercial facts; entitlement determines access; learning records educational activity.

## 3. Learning Hierarchy

```text
Program/Section -> Subject -> Course -> Module -> Lecture -> Assessment
```

Taxonomy MAY evolve, but identifiers and relationships SHALL preserve historical progress.

## 4. Enrollment and Access

Enrollment/access SHALL derive from explicit eligibility and entitlement rules. Removing access SHALL not erase historical learning records.

## 5. Progress

Progress SHOULD be explicit and measurable rather than inferred only from frontend position. Retries SHALL be idempotent where possible.

## 6. Lecture Completion

Completion criteria SHALL be deterministic and versioned. A client completion claim SHALL not be sufficient where server-side evidence is required.

## 7. Assessments

Quiz attempts SHALL record student, assessment version, submission time, result/score, and outcome according to privacy policy. Published versions SHALL remain reconstructable.

## 8. Completion

Course completion SHALL use explicit criteria. Completion SHALL be a domain state transition, not a UI-only flag.

## 9. Certificates

If introduced, certificates SHALL be based on immutable completion evidence and versioned policy. Revocation SHALL preserve issuance history.

## 10. Offline Learning

Offline access SHALL define authorization lifetime, synchronization, conflict resolution, and revocation before implementation.

## 11. Content Access

Protected learning requests SHALL validate current entitlement according to policy. Short-lived access grants MAY be used for assets.

## 12. Learner Privacy

Learning activity is sensitive user data. Access SHALL be limited to the student and authorized staff for legitimate purposes.

## 13. Analytics Boundary

Learning events MAY feed analytics, but analytics SHALL not become authoritative for progress or completion.

## 14. Performance

High-frequency progress writes SHOULD use batching or controlled update semantics without weakening completion correctness.

## 15. Failure Handling

Transient progress failures SHALL be retryable where idempotency exists. Analytics failure SHALL not block valid learning transitions unless explicitly required.

## 16. Definition of Done

Learning Architecture is complete when hierarchy, access, progress, assessments, completion, privacy, content delivery, analytics boundaries, offline policy, performance, and failure behavior are explicit.
