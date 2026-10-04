// server/migrate.js — Create tables if they don't exist
import { query } from './db.js';

const SCHEMA = `
-- Products / Stock table
CREATE TABLE IF NOT EXISTS products (
  id              VARCHAR(64)  PRIMARY KEY,
  title           VARCHAR(255) NOT NULL,
  brand           VARCHAR(100),
  gender          VARCHAR(16),
  category        VARCHAR(64),
  sub             VARCHAR(64),
  price           INTEGER      NOT NULL,
  original_price  INTEGER,
  image           VARCHAR(512),
  sizes           TEXT[],
  condition       VARCHAR(32),
  rarity          VARCHAR(32),
  era             VARCHAR(16),
  is_new_drop     BOOLEAN      DEFAULT FALSE,
  is_one_of_one   BOOLEAN      DEFAULT FALSE,
  curator_slug    VARCHAR(64),
  available       BOOLEAN      DEFAULT TRUE,
  created_at      BIGINT
);

-- Orders table (one row per order; items stored as JSONB)
CREATE TABLE IF NOT EXISTS orders (
  id                  VARCHAR(64)  PRIMARY KEY,
  customer_name       VARCHAR(255) NOT NULL,
  customer_email      VARCHAR(255),
  customer_phone      VARCHAR(32),
  items               JSONB        NOT NULL,
  subtotal            INTEGER      NOT NULL,
  payment_method      VARCHAR(32)  DEFAULT 'razorpay',
  razorpay_payment_id VARCHAR(128),
  status              VARCHAR(32)  DEFAULT 'pending',
  created_at          TIMESTAMPTZ  DEFAULT NOW()
);

-- Index for quick customer lookup
CREATE INDEX IF NOT EXISTS idx_orders_email  ON orders (customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_products_avail ON products (available);
`;

async function migrate() {
  console.log('[migrate] Running schema migration…');
  try {
    await query(SCHEMA);
    console.log('[migrate] ✅ Schema ready.');
  } catch (err) {
    console.error('[migrate] ❌ Error:', err.message);
    process.exit(1);
  }
  process.exit(0);
}

migrate();
