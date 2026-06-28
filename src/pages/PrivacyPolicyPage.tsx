import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Desire Consultancy — Nagpur</title>
        <meta
          name="description"
          content="Privacy Policy for Desire Consultancy. Learn how we collect, use, and protect your information when using our regulatory compliance services."
        />
        <link rel="canonical" href="https://desireconsultancy.in/privacy-policy" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Breadcrumb */}
          <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Privacy Policy</span>
          </nav>

          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            LEGAL INFORMATION
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-10">
            Privacy
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <div className="prose prose-invert max-w-none text-white/70 text-sm leading-relaxed space-y-8 font-sans">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you submit a lead through our contact forms or book a free consultation. This information includes your name, email address, phone number, business type, and any compliance requirements you share.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">2. How We Use Your Information</h2>
              <p>
                The information we collect is strictly used to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Respond to your service inquiries and provide consultancy support.</li>
                <li>Reach out to you regarding your FSSAI, BIS, or water plant projects.</li>
                <li>Send compliance updates, notifications, or necessary newsletters.</li>
                <li>Improve our client portal experiences and customer support.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or share your personally identifiable information with third parties. Your data is protected securely and is only accessible by authorized compliance specialists handling your projects.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">4. Data Security</h2>
              <p>
                We implement strict physical, electronic, and procedural safeguards to secure the information we collect online. This includes encrypted form submissions and secure database hosting on Supabase.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">5. Updates to This Policy</h2>
              <p>
                We may modify this privacy policy from time to time to match evolving data protection regulations. The latest version will always be posted here with the active revision date.
              </p>
              <p className="text-xs font-mono text-white/40">Last Updated: June 28, 2026</p>
            </section>
          </div>

          {/* CTA Back to Home */}
          <div className="mt-16 pt-12 border-t border-white/5 flex flex-wrap gap-4">
            <Link
              to="/"
              className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300"
            >
              ← Back to Home
            </Link>
            <Link
              to="/#contact"
              className="px-6 py-2.5 rounded-full bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default PrivacyPolicyPage;
