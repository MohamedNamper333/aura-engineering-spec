# ADR-0005 — Object Storage for Educational Assets

**Status:** Accepted  
**Date:** 2026-08-10  
**Decision Owner:** Architecture Governance

## Context

AURA serves video, documents, images, and other educational assets. These files have different scaling and delivery characteristics from transactional relational data.

## Decision

Use object storage as the authoritative storage boundary for large educational/media assets. PostgreSQL SHALL store metadata, ownership, version references, and access-control relationships; it SHALL not store large media blobs by default.

## Rationale

Object storage is designed for durable large-object storage and integrates naturally with CDN delivery and signed/authorized access patterns.

## Consequences

- Asset lifecycle and retention must be managed explicitly.
- Storage access must respect entitlement and authorization.
- Asset metadata and database references require consistency checks.

## Alternatives Rejected

- Storing all media blobs in PostgreSQL.
- Writing directly to local application containers as durable storage.

## Constraints

Deleting an asset SHALL not silently invalidate historical educational records. Uploads SHALL pass security validation before becoming accessible.

## Reconsideration Trigger

Reconsider if content volume, regulatory constraints, delivery requirements, or provider economics justify a different storage topology.
