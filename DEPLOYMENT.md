# Desire Consultancy — Production Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│  Frontend (Vite/React)                       │
│  → Deploy to: Vercel or Netlify              │
├─────────────────────────────────────────────┤
│  Backend (Supabase Edge Functions — Deno)    │
│  → submit-lead  (form intake + email)        │
│  → get-leads    (admin reads)                │
│  → update-lead-status (admin writes)         │
├─────────────────────────────────────────────┤
│  Database: Supabase PostgreSQL               │
│  Email: Resend (via Edge Function)           │
│  Analytics: Google Analytics 4 + MS Clarity │
└─────────────────────────────────────────────┘
```

---

## Step 1 — Supabase Setup

### 1.1 Create a Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Name it `desire-consultancy`
3. Set a strong database password
4. Select region: **Asia South (Mumbai)**

### 1.2 Run the Database Migration
1. In Supabase Dashboard → **SQL Editor**
2. Open `supabase/migrations/001_create_leads_table.sql`
3. Paste the entire content and click **Run**
4. Verify: Table Editor → `leads` table appears

### 1.3 Get Your API Keys
Go to **Settings → API**:
- `Project URL` → `VITE_SUPABASE_URL`
- `anon` key → `VITE_SUPABASE_ANON_KEY`
- `service_role` key → for Edge Function secrets only

---

## Step 2 — Deploy Edge Functions

### 2.1 Install Supabase CLI
```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

### 2.2 Set Edge Function Secrets
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
supabase secrets set RESEND_API_KEY=re_your_key
supabase secrets set RESEND_FROM_EMAIL=noreply@yourdomain.com
supabase secrets set RESEND_TO_EMAIL=desireconsultancy37@gmail.com
supabase secrets set ADMIN_PASSWORD=your-strong-admin-password
```

### 2.3 Deploy Functions
```bash
supabase functions deploy submit-lead
supabase functions deploy get-leads
supabase functions deploy update-lead-status
```

### 2.4 Verify Deployment
```bash
# Test submit-lead (should return success or validation error)
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/submit-lead \
  -H "Content-Type: application/json" \
  -H "apikey: YOUR_ANON_KEY" \
  -d '{"full_name":"Test","business_name":"Test Co","phone":"9999999999","email":"test@test.com","service":"FSSAI Licensing","message":"Test message"}'
```

---

## Step 3 — Resend Setup

### 3.1 Create Account
1. Go to [resend.com](https://resend.com) → Create free account
2. Free tier: **3,000 emails/month** (plenty for a consultancy)

### 3.2 Verify Your Domain
1. Resend Dashboard → **Domains → Add Domain**
2. Enter `desireconsultancy.com` (or your actual domain)
3. Add the DNS records shown to your domain registrar
4. Wait for verification (usually 15–60 minutes)

### 3.3 Get API Key
1. Resend Dashboard → **API Keys → Create API Key**
2. Set permission: **Full access**
3. Copy the key → set as `RESEND_API_KEY` Edge Function secret

> **Note**: Until your domain is verified, you can use `onboarding@resend.dev` as the "From" address for testing.

---

## Step 4 — Google Analytics 4

### 4.1 Create Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Create Property → **Web**
3. Enter your domain: `desireconsultancy.com`

### 4.2 Get Measurement ID
1. Property → Data Streams → your web stream
2. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
3. Add to environment variables: `VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX`

### 4.3 Verify Tracking
- Visit your deployed site
- In GA4: **Reports → Realtime** → confirm active users appear

---

## Step 5 — Microsoft Clarity

### 5.1 Create Project
1. Go to [clarity.microsoft.com](https://clarity.microsoft.com)
2. Create New Project → **Web**
3. Enter your domain

### 5.2 Get Project ID
1. Copy the **Project ID** from the setup screen (alphanumeric string)
2. Add to environment variables: `VITE_CLARITY_PROJECT_ID=your-project-id`

---

## Step 6 — Deploy Frontend

### Option A: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repository
4. **Environment Variables** → Add all from `.env.local`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GA4_MEASUREMENT_ID`
   - `VITE_CLARITY_PROJECT_ID`
   - `VITE_ADMIN_PASSWORD`
   - `VITE_WHATSAPP_NUMBER`
5. Framework Preset: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Deploy!

#### Vercel SPA Routing (create `vercel.json`)
```json
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```

### Option B: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → New Site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in **Site Settings → Environment**
6. Create `public/_redirects`:
   ```
   /*  /index.html  200
   ```

---

## Step 7 — DNS & Domain Setup

### 7.1 Point Domain to Vercel/Netlify
- Add your domain in the hosting dashboard
- Update your domain's DNS nameservers or add A/CNAME records as instructed

### 7.2 HTTPS
- Both Vercel and Netlify provision free SSL automatically

---

## Step 8 — Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add Property → URL Prefix → `https://desireconsultancy.com`
3. Verify ownership (HTML tag method works well with react-helmet-async)
4. Submit sitemap: `https://desireconsultancy.com/sitemap.xml`

---

## Production Checklist

### Pre-Launch
- [ ] Supabase project created and migration run
- [ ] All 3 Edge Functions deployed and tested
- [ ] Edge Function secrets set (Resend, service role key, admin password)
- [ ] Resend domain verified
- [ ] GA4 property created, Measurement ID added to env
- [ ] Microsoft Clarity project created, Project ID added to env
- [ ] All env vars set in Vercel/Netlify
- [ ] Custom domain connected + HTTPS active

### Post-Launch
- [ ] Submit contact form → verify Supabase row created
- [ ] Submit contact form → verify admin email received at desireconsultancy37@gmail.com
- [ ] Submit contact form → verify client auto-reply received
- [ ] Visit `/admin/leads` → password gate works → leads visible
- [ ] Visit `/services/fssai` → correct metadata in `<head>`
- [ ] WhatsApp button → opens correct number + pre-filled message
- [ ] GA4 Realtime → events firing on form submit and WhatsApp click
- [ ] Clarity → session recordings starting
- [ ] Google Search Console → sitemap submitted

### Security
- [ ] Admin password changed from default in production
- [ ] `.env.local` is in `.gitignore` (verify: `git status`)
- [ ] Rate limiting tested (submit form 3 times rapidly → 429 response)
- [ ] Honeypot tested (fill hidden `website` field → silent rejection)

---

## Accessing the Admin Dashboard

Navigate to: `https://yourdomain.com/admin/leads`

Enter the password set in `VITE_ADMIN_PASSWORD`.

Features:
- View all leads sorted by date
- Search by name, email, phone, business
- Filter by status
- Update status (New → Contacted → In Progress → Converted → Closed)
- Export all leads as CSV

---

## Support

For any deployment issues, contact the development team or refer to:
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Vercel Docs](https://vercel.com/docs)
