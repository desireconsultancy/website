// ─────────────────────────────────────────────────────────────────────────────
// Supabase Edge Function: get-leads
// Deployed at: GET /functions/v1/get-leads
//
// Password-protected admin endpoint that returns all leads with filtering.
// Authorization: Bearer <ADMIN_PASSWORD>
// ─────────────────────────────────────────────────────────────────────────────
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== 'GET') return json({ error: 'Method not allowed' }, 405);

  // ── Auth check ────────────────────────────────────────────────
  const adminPassword = Deno.env.get('ADMIN_PASSWORD') ?? '';
  const authHeader = req.headers.get('authorization') ?? '';
  const provided = authHeader.replace('Bearer ', '').trim();

  if (!adminPassword || provided !== adminPassword) {
    return json({ error: 'Unauthorized' }, 401);
  }

  // ── Parse query params ────────────────────────────────────────
  const url = new URL(req.url);
  const status = url.searchParams.get('status') ?? null;
  const search = url.searchParams.get('search') ?? null;
  const page = parseInt(url.searchParams.get('page') ?? '1', 10);
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10), 100);
  const offset = (page - 1) * limit;

  // ── Query leads ───────────────────────────────────────────────
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  let query = supabase
    .from('leads')
    .select('id, full_name, business_name, phone, email, service, message, status, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) query = query.eq('status', status);
  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,business_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`,
    );
  }

  const { data, count, error } = await query;

  if (error) {
    console.error('[get-leads] DB error:', error);
    return json({ error: 'Failed to fetch leads' }, 500);
  }

  return json({ leads: data, total: count, page, limit });
});
