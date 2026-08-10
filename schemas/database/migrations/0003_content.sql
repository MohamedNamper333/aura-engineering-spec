BEGIN;

CREATE TABLE content_versions (
  id UUID PRIMARY KEY,
  content_id UUID NOT NULL,
  version INTEGER NOT NULL CHECK (version > 0),
  title TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft','published','archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  UNIQUE(content_id, version)
);

CREATE TABLE course_content (
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  content_version_id UUID NOT NULL REFERENCES content_versions(id),
  PRIMARY KEY(course_id, content_version_id)
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active','archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_versions_content_version ON content_versions(content_id, version DESC);
CREATE INDEX idx_content_versions_status ON content_versions(status);

COMMIT;
