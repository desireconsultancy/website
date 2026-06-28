// ─────────────────────────────────────────────────────────────────────────────
// Supabase Edge Function: update-lead-status
// Deployed at: PATCH /functions/v1/update-lead-status
// ─────────────────────────────────────────────────────────────────────────────
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });

const VALID_STATUSES = ['new', 'contacted', 'in_progress', 'converted', 'closed'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== 'PATCH') return json({ error: 'Method not allowed' }, 405);

  // ── Auth ─────────────────────────────────────────────────────
  const adminPassword = Deno.env.get('ADMIN_PASSWORD') ?? '';
  const provided = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim();
  if (!adminPassword || provided !== adminPassword) return json({ error: 'Unauthorized' }, 401);

  // ── Parse body ────────────────────────────────────────────────
  let body: { id: string; status: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { id, status } = body;
  if (!id) return json({ error: 'Lead ID is required' }, 422);
  if (!status || !VALID_STATUSES.includes(status)) {
    return json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` }, 422);
  }

  // ── Update ────────────────────────────────────────────────────
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('[update-lead-status] DB error:', error);
    return json({ error: 'Failed to update status' }, 500);
  }

  return json({ success: true });
});
