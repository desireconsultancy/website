-- ─────────────────────────────────────────────────────────────
-- Migration: 001_create_leads_table.sql
-- Run in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────

-- Create lead_status enum
CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'in_progress',
  'converted',
  'closed'
);

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
  business_name TEXT NOT NULL CHECK (char_length(business_name) BETWEEN 2 AND 150),
  phone       TEXT NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  email       TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  service     TEXT NOT NULL,
  message     TEXT NOT NULL CHECK (char_length(message) BETWEEN 5 AND 2000),
  status      lead_status NOT NULL DEFAULT 'new',
  ip_hash     TEXT,           -- anonymised IP for rate-limiting
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── Row Level Security ────────────────────────────────────────
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- No direct client reads/writes — all access via Edge Functions using service role key.
-- The service role key bypasses RLS, so we block everything from the anon key.
CREATE POLICY "deny_all_anon" ON public.leads
  FOR ALL USING (false);

-- ─── Indexes ──────────────────────────────────────────────────
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_status ON public.leads (status);
CREATE INDEX idx_leads_email ON public.leads (email);
CREATE INDEX idx_leads_ip_hash ON public.leads (ip_hash);
