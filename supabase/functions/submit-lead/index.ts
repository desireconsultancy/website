// ─────────────────────────────────────────────────────────────────────────────
// Supabase Edge Function: submit-lead
// Deployed at: POST /functions/v1/submit-lead
//
// Responsibilities:
//   1. Validate + sanitize input (Zod schema)
//   2. Rate-limit: max 2 submissions per IP per 5 minutes
//   3. Honeypot bot check
//   4. Store lead in Supabase DB (service role — bypasses RLS)
//   5. Send admin notification + client auto-reply via Resend
// ─────────────────────────────────────────────────────────────────────────────
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });

// Lightweight sanitize: strip HTML tags, trim, truncate
function sanitize(value: string, maxLen = 500): string {
  return value
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLen);
}

function validateEmail(email: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\d\s\+\-\(\)]{7,20}$/.test(phone);
}

const VALID_SERVICES = [
  'FSSAI Licensing',
  'BIS Certification',
  'Packaged Drinking Water Consultancy',
  'Industrial RO Solutions',
  'Other',
];

// Hash IP for anonymised rate-limiting (privacy-friendly)
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  // ── Parse body ────────────────────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const {
    full_name,
    business_name,
    phone,
    email,
    service,
    message,
    website, // honeypot field
  } = body;

  // ── Honeypot bot detection ────────────────────────────────────
  if (website && website.trim().length > 0) {
    // Bot filled the hidden field — silently accept (don't reveal detection)
    return json({ success: true, id: 'bot-rejected' });
  }

  // ── Input validation ──────────────────────────────────────────
  const errors: string[] = [];
  if (!full_name || full_name.trim().length < 2) errors.push('Full name is required (min 2 chars)');
  if (!business_name || business_name.trim().length < 2) errors.push('Business name is required');
  if (!phone || !validatePhone(phone)) errors.push('Valid phone number is required');
  if (!email || !validateEmail(email)) errors.push('Valid email address is required');
  if (!service || !VALID_SERVICES.includes(service)) errors.push('Valid service selection is required');
  if (!message || message.trim().length < 5) errors.push('Message is required (min 5 chars)');

  if (errors.length > 0) return json({ error: errors.join('; ') }, 422);

  // ── Supabase client (service role — bypasses RLS) ─────────────
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  // ── Rate limiting: max 2 leads per IP per 5 minutes ───────────
  const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const ipHash = await hashIP(clientIP);
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  const { count } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', fiveMinutesAgo);

  if ((count ?? 0) >= 2) {
    return json({ error: 'Too many submissions. Please wait a few minutes.' }, 429);
  }

  // ── Sanitize inputs ───────────────────────────────────────────
  const cleanLead = {
    full_name: sanitize(full_name, 100),
    business_name: sanitize(business_name, 150),
    phone: sanitize(phone, 20),
    email: sanitize(email, 150).toLowerCase(),
    service: sanitize(service, 100),
    message: sanitize(message, 2000),
    status: 'new' as const,
    ip_hash: ipHash,
  };

  // ── Insert lead ───────────────────────────────────────────────
  const { data: lead, error: dbError } = await supabase
    .from('leads')
    .insert(cleanLead)
    .select('id')
    .single();

  if (dbError) {
    console.error('[submit-lead] DB error:', dbError);
    return json({ error: 'Failed to save inquiry. Please try again.' }, 500);
  }

  // ── Send emails via Resend ────────────────────────────────────
  const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? '';
  const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') ?? 'onboarding@resend.dev';
  const adminEmail = Deno.env.get('RESEND_TO_EMAIL') ?? 'desireconsultancy37@gmail.com';

  if (resendApiKey && !resendApiKey.includes('placeholder')) {
    try {
      // Admin notification email
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Desire Consultancy <${fromEmail}>`,
          to: [adminEmail],
          subject: `🔔 New Lead: ${cleanLead.full_name} — ${cleanLead.service}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fff;border-radius:12px;">
              <h2 style="color:#16D9C5;margin-bottom:24px;">New Lead Received</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#888;width:140px;">Name</td><td style="color:#fff;">${cleanLead.full_name}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Business</td><td style="color:#fff;">${cleanLead.business_name}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="color:#fff;"><a href="tel:${cleanLead.phone}" style="color:#16D9C5;">${cleanLead.phone}</a></td></tr>
                <tr><td style="padding:8px 0;color:#888;">Email</td><td style="color:#fff;"><a href="mailto:${cleanLead.email}" style="color:#16D9C5;">${cleanLead.email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#888;">Service</td><td style="color:#fff;">${cleanLead.service}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Message</td><td style="color:#fff;">${cleanLead.message}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Lead ID</td><td style="color:#888;font-size:12px;">${lead?.id}</td></tr>
              </table>
              <hr style="border:1px solid #1a1a1a;margin:24px 0;" />
              <p style="color:#555;font-size:12px;">Desire Consultancy — Lead Management System</p>
            </div>
          `,
        }),
      });

      // Client auto-reply email
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Desire Consultancy <${fromEmail}>`,
          to: [cleanLead.email],
          subject: 'We received your inquiry — Desire Consultancy',
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fff;border-radius:12px;">
              <h2 style="color:#16D9C5;margin-bottom:16px;">Thank You, ${cleanLead.full_name}</h2>
              <p style="color:#ccc;line-height:1.6;">
                Thank you for contacting <strong style="color:#fff;">Desire Consultancy</strong>.
              </p>
              <p style="color:#ccc;line-height:1.6;">
                We have received your inquiry regarding <strong style="color:#16D9C5;">${cleanLead.service}</strong>
                and a compliance expert will review your requirements and respond within <strong>24 hours</strong>.
              </p>
              <div style="background:#111;border:1px solid #1a1a1a;border-radius:8px;padding:16px;margin:24px 0;">
                <p style="color:#888;margin:0 0 8px;font-size:12px;">YOUR INQUIRY SUMMARY</p>
                <p style="color:#fff;margin:0;"><strong>Service:</strong> ${cleanLead.service}</p>
                <p style="color:#fff;margin:4px 0 0;"><strong>Business:</strong> ${cleanLead.business_name}</p>
              </div>
              <p style="color:#ccc;line-height:1.6;">
                If you have an urgent requirement, you can reach us directly:
              </p>
              <p style="color:#ccc;">
                📞 <a href="tel:+918421504028" style="color:#16D9C5;">+91 84215 04028</a><br>
                📧 <a href="mailto:desireconsultancy37@gmail.com" style="color:#16D9C5;">desireconsultancy37@gmail.com</a>
              </p>
              <hr style="border:1px solid #1a1a1a;margin:24px 0;" />
              <p style="color:#555;font-size:12px;margin:0;">
                Regards,<br>
                <strong style="color:#888;">Desire Consultancy</strong><br>
                Nagpur, Maharashtra, India
              </p>
            </div>
          `,
        }),
      });
    } catch (emailErr) {
      // Email failure should not fail the overall submission
      console.error('[submit-lead] Email error:', emailErr);
    }
  }

  return json({ success: true, id: lead?.id });
});
