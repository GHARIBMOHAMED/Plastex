CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS catalogue_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (email = lower(email)),
  name text NOT NULL,
  company text NOT NULL DEFAULT '',
  role text NOT NULL CHECK (role IN ('partner', 'admin')),
  password_hash text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS catalogue_sessions (
  token_hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES catalogue_users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS catalogue_sessions_user_idx ON catalogue_sessions(user_id);

CREATE TABLE IF NOT EXISTS catalogue_login_attempts (
  id bigserial PRIMARY KEY,
  ip_hash text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS catalogue_login_attempts_time_idx ON catalogue_login_attempts(ip_hash, occurred_at);

CREATE TABLE IF NOT EXISTS catalogue_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  mime_type text NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp')),
  uploaded_by uuid REFERENCES catalogue_users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS catalogue_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text NOT NULL UNIQUE,
  category text NOT NULL CHECK (category IN ('brake-discs', 'clutch-discs', 'brake-drums', 'brake-pads')),
  draft_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  published_data jsonb,
  published_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS catalogue_products_published_idx ON catalogue_products(category, sku) WHERE published_data IS NOT NULL;

CREATE TABLE IF NOT EXISTS catalogue_crawl_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url text NOT NULL,
  status text NOT NULL CHECK (status IN ('queued', 'running', 'completed', 'failed')),
  error text,
  requested_by uuid REFERENCES catalogue_users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  finished_at timestamptz
);

CREATE TABLE IF NOT EXISTS catalogue_source_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url text NOT NULL UNIQUE,
  supplier_code text NOT NULL,
  category text,
  extracted_data jsonb NOT NULL,
  fetched_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS catalogue_match_proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES catalogue_products(id) ON DELETE CASCADE,
  source_record_id uuid NOT NULL REFERENCES catalogue_source_records(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'rejected')),
  score integer NOT NULL,
  matched_codes jsonb NOT NULL DEFAULT '[]'::jsonb,
  conflicts jsonb NOT NULL DEFAULT '[]'::jsonb,
  reviewed_by uuid REFERENCES catalogue_users(id),
  reviewed_at timestamptz,
  UNIQUE(product_id, source_record_id)
);
