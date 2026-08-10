BEGIN;

CREATE TABLE activation_codes (
  id UUID PRIMARY KEY,
  code_hash TEXT NOT NULL UNIQUE,
  product_id UUID REFERENCES products(id),
  entitlement_resource_id UUID,
  status TEXT NOT NULL CHECK (status IN ('active','redeemed','revoked','expired')),
  expires_at TIMESTAMPTZ,
  redeemed_by UUID REFERENCES users(id),
  redeemed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE activation_redemptions (
  id UUID PRIMARY KEY,
  activation_code_id UUID NOT NULL REFERENCES activation_codes(id),
  user_id UUID NOT NULL REFERENCES users(id),
  entitlement_id UUID NOT NULL REFERENCES entitlements(id),
  redeemed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(activation_code_id)
);

CREATE INDEX idx_activation_codes_status ON activation_codes(status);
CREATE INDEX idx_activation_redemptions_user ON activation_redemptions(user_id, redeemed_at DESC);

COMMIT;
