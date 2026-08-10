BEGIN;

CREATE TABLE idempotency_keys (
  id UUID PRIMARY KEY,
  scope TEXT NOT NULL,
  key TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  response_status INTEGER,
  response_body JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  UNIQUE(scope, key)
);

CREATE INDEX idx_idempotency_expiry ON idempotency_keys(expires_at);

ALTER TABLE courses
  ADD CONSTRAINT fk_courses_subject
  FOREIGN KEY(subject_id) REFERENCES subjects(id);

COMMIT;
