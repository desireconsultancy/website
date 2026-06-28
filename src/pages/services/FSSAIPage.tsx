import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'FSSAI Licensing Consultancy',
  description:
    'Expert FSSAI licensing assistance for food businesses — new licenses, renewals, state and central licenses, and complete compliance support across India.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Desire Consultancy',
    telephone: '+918421504028',
    email: 'desireconsultancy37@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nagpur',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  },
  areaServed: { '@type': 'Country', name: 'India' },
  url: 'https://desireconsultancy.in/fssai-certification',
};

export function FSSAIPage() {
  return (
    <>
      <Helmet>
        <title>FSSAI Licensing Consultancy | Desire Consultancy — Nagpur</title>
        <meta
          name="description"
          content="Expert FSSAI licensing consultancy in Nagpur. We assist food businesses with new FSSAI registrations, state & central licenses, renewals, and modifications across India."
        />
        <meta
          name="keywords"
          content="FSSAI licensing Nagpur, FSSAI registration Maharashtra, food license consultancy, FSSAI renewal, central FSSAI license India"
        />
        <link rel="canonical" href="https://desireconsultancy.in/fssai-certification" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://desireconsultancy.in/fssai-certification" />
        <meta property="og:title" content="FSSAI Licensing Consultancy | Desire Consultancy" />
        <meta property="og:description" content="Expert FSSAI licensing assistance across India — registrations, state & central licenses, renewals." />
        <meta property="og:image" content="https://desireconsultancy.in/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Breadcrumb */}
          <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">FSSAI Licensing</span>
          </nav>

          {/* Header */}
          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            REGULATORY COMPLIANCE
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            FSSAI Licensing
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              Consultancy
            </span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-12">
            The Food Safety and Standards Authority of India (FSSAI) mandates that every food business
            operating in India must have a valid license or registration. At Desire Consultancy, we
            simplify this complex process for you — from initial assessment to final approval.
          </p>

          {/* Services covered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { title: 'FSSAI Basic Registration', desc: 'For small food businesses with turnover up to ₹12 lakh/year.' },
              { title: 'State FSSAI License', desc: 'For medium-sized businesses operating within a single state.' },
              { title: 'Central FSSAI License', desc: 'For large businesses, importers/exporters, and pan-India operators.' },
              { title: 'FSSAI Renewal', desc: 'Timely license renewals to avoid penalties and business disruption.' },
              { title: 'Modification & Transfer', desc: 'Changes to premises, product category, or ownership details.' },
              { title: 'Compliance Audit', desc: 'Pre-inspection audits and documentation reviews.' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#16D9C5]/20 transition-all duration-300"
              >
                <h2 className="font-semibold text-white text-sm mb-1">{item.title}</h2>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="border-t border-white/5 pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              to="/#contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] text-black font-semibold text-xs tracking-widest uppercase hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(14,110,255,0.35)] transition-all duration-300"
            >
              Book Free Consultation
            </Link>
            <div className="text-white/40 text-xs font-mono space-y-1">
              <div>📞 <a href="tel:+918421504028" className="hover:text-[#16D9C5] transition-colors">+91 84215 04028</a></div>
              <div>📧 <a href="mailto:desireconsultancy37@gmail.com" className="hover:text-[#16D9C5] transition-colors">desireconsultancy37@gmail.com</a></div>
            </div>
          </div>

          {/* Internal links */}
          <div className="mt-16 pt-12 border-t border-white/5">
            <p className="text-[10px] tracking-widest text-white/30 font-mono uppercase mb-4">Explore Other Services</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/bis-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">BIS Certification →</Link>
              <Link to="/services/packaged-drinking-water" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Packaged Water Plants →</Link>
              <Link to="/services/ro-solutions" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Industrial RO Solutions →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
