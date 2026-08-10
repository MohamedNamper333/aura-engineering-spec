# RFC-0015 — Content Architecture

**Status:** Accepted  
**Version:** 1.0.0  
**Priority:** Critical

## 1. Purpose

Define lifecycle, structure, governance, versioning, storage, and delivery of educational content.

## 2. Content Model

```text
Subject -> Course -> Module/Lecture -> Content Version -> Asset
```

Metadata SHALL be distinct from binary assets.

## 3. Authoring Lifecycle

```text
Draft -> Review -> Approved -> Published -> Archived
```

Only authorized roles may transition content.

## 4. Versioning

Material changes to published content SHALL create a new version when historical learner context could become ambiguous. Completed learning SHALL remain attributable to the consumed version.

## 5. Review and Quality

Published content SHALL pass defined gates covering correctness, completeness, metadata, accessibility, and media integrity.

## 6. Asset Storage

Large media SHALL use private object storage. Database records SHALL hold metadata/references rather than unnecessary binary payloads.

## 7. Access Control

Visibility SHALL be determined by publication state plus authorization/entitlement. Public catalog metadata and protected assets SHALL have separate rules.

## 8. Media Processing

Uploads MAY pass through asynchronous validation/transcoding. Processing status SHALL be explicit; incomplete assets SHALL not be published accidentally.

## 9. Content Integrity

Assets SHOULD have integrity identifiers such as checksums where useful. Replacing an asset SHALL preserve enough metadata to reconstruct published versions.

## 10. Deletion

Published content SHALL generally be archived rather than destructively deleted when historical learning or commercial records depend on it.

## 11. Search and Discovery

Search indexes are derived data and SHALL be rebuildable from authoritative content records.

## 12. Accessibility

Content specifications SHOULD define captions, transcripts, text alternatives, readable structure, and device compatibility where applicable.

## 13. Anti-Piracy

AURA SHALL use reasonable access controls, signed delivery, rate limiting, anomaly detection, and optional watermarking. Absolute anti-copy guarantees SHALL not be claimed.

## 14. Teacher Workflow

Teacher contributions SHALL enter controlled draft/review workflows and SHALL not bypass publication approval through direct asset access.

## 15. Definition of Done

Content Architecture is complete when hierarchy, lifecycle, versioning, review, storage, access, processing, integrity, archival, search, accessibility, and anti-abuse controls are explicit.
