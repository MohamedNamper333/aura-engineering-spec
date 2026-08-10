CREATE TABLE users (
  id UUID PRIMARY KEY,
  phone VARCHAR(32) NOT NULL UNIQUE,
  status VARCHAR(24) NOT NULL CHECK (status IN ('active','suspended','deactivated')),
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  status VARCHAR(24) NOT NULL CHECK (status IN ('draft','active','archived')),
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(32) NOT NULL,
  currency CHAR(3) NOT NULL,
  total_minor BIGINT NOT NULL CHECK (total_minor >= 0),
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_minor BIGINT NOT NULL CHECK (unit_price_minor >= 0),
  currency CHAR(3) NOT NULL
);

CREATE TABLE payments (
  id UUID PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id),
  provider VARCHAR(64) NOT NULL,
  provider_transaction_id VARCHAR(255),
  status VARCHAR(32) NOT NULL,
  amount_minor BIGINT NOT NULL CHECK (amount_minor >= 0),
  currency CHAR(3) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  UNIQUE (provider, provider_transaction_id)
);

CREATE TABLE entitlements (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  resource_id UUID NOT NULL,
  source VARCHAR(64) NOT NULL,
  status VARCHAR(24) NOT NULL CHECK (status IN ('active','revoked','expired')),
  created_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ
);

CREATE TABLE outbox_events (
  event_id UUID PRIMARY KEY,
  event_type VARCHAR(128) NOT NULL,
  event_version INTEGER NOT NULL,
  aggregate_type VARCHAR(128) NOT NULL,
  aggregate_id UUID NOT NULL,
  correlation_id VARCHAR(255),
  causation_id VARCHAR(255),
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  published_at TIMESTAMPTZ
);

CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_entitlements_user ON entitlements(user_id);
CREATE INDEX idx_outbox_unpublished ON outbox_events(created_at) WHERE published_at IS NULL;
