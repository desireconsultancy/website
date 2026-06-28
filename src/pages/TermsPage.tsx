import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | Desire Consultancy — Nagpur</title>
        <meta
          name="description"
          content="Terms and Conditions for Desire Consultancy. Read the terms of service governing our FSSAI licensing and BIS certification compliance consultancy."
        />
        <link rel="canonical" href="https://desireconsultancy.in/terms-and-conditions" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Breadcrumb */}
          <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Terms & Conditions</span>
          </nav>

          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            LEGAL INFORMATION
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-10">
            Terms &
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>

          <div className="prose prose-invert max-w-none text-white/70 text-sm leading-relaxed space-y-8 font-sans">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">1. Agreement to Terms</h2>
              <p>
                By accessing this website (https://desireconsultancy.in) and using our compliance consultancy services, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">2. Scope of Services</h2>
              <p>
                Desire Consultancy provides expert guidance, document verification, auditing, and registration coordination for regulatory compliance frameworks including:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>FSSAI state, central, and basic licensing/registrations.</li>
                <li>BIS certifications, product testing coordinates, and plant audits.</li>
                <li>Industrial/commercial RO water plant approvals and design consultancy.</li>
              </ul>
              <p>
                While we make every effort to ensure accurate filings, approvals are subject to government authorities' reviews and decision-making timelines.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">3. Client Responsibilities</h2>
              <p>
                Clients are responsible for providing authentic, complete, and correct information and documentation required for licensing and certification. Desire Consultancy is not liable for delays or rejections arising from inaccurate or forged documents provided by the client.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">4. Intellectual Property</h2>
              <p>
                All proprietary content, brand logos, code designs, visual layouts, and graphics displayed on this website are the intellectual property of Desire Consultancy and cannot be copied or reused without prior written consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white uppercase font-display border-b border-white/10 pb-2">5. Jurisdiction</h2>
              <p>
                Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the competent courts in Nagpur, Maharashtra, India.
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
export default TermsPage;
