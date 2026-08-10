BEGIN;

CREATE TABLE courses (
  id UUID PRIMARY KEY,
  subject_id UUID,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft','published','archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE lectures (
  id UUID PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position > 0),
  status TEXT NOT NULL CHECK (status IN ('draft','published','archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(course_id, position)
);

CREATE TABLE enrollments (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  status TEXT NOT NULL CHECK (status IN ('active','completed','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

CREATE TABLE lecture_progress (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  lecture_id UUID NOT NULL REFERENCES lectures(id),
  position_seconds INTEGER NOT NULL CHECK (position_seconds >= 0),
  completed BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, lecture_id)
);

CREATE TABLE quizzes (
  id UUID PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft','published','archived'))
);

CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES quizzes(id),
  user_id UUID NOT NULL REFERENCES users(id),
  answers JSONB NOT NULL,
  score NUMERIC(6,3),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lectures_course_position ON lectures(course_id, position);
CREATE INDEX idx_progress_user_updated ON lecture_progress(user_id, updated_at DESC);
CREATE INDEX idx_attempts_user_submitted ON quiz_attempts(user_id, submitted_at DESC);

COMMIT;
