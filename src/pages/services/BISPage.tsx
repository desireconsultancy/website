import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'BIS Certification Consultancy',
  description:
    'Complete BIS (Bureau of Indian Standards) certification consultancy — documentation, factory audit preparation, lab coordination, and compliance support across India.',
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
  url: 'https://desireconsultancy.in/bis-certification',
};

export function BISPage() {
  return (
    <>
      <Helmet>
        <title>BIS Certification Consultancy | Desire Consultancy — Nagpur</title>
        <meta
          name="description"
          content="Expert BIS certification consultancy in Nagpur. We assist manufacturers with ISI mark licensing, BIS product registration, factory audits, lab testing coordination, and compliance."
        />
        <meta
          name="keywords"
          content="BIS certification Nagpur, ISI mark license, Bureau of Indian Standards, BIS product certification Maharashtra, BIS factory audit India"
        />
        <link rel="canonical" href="https://desireconsultancy.in/bis-certification" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://desireconsultancy.in/bis-certification" />
        <meta property="og:title" content="BIS Certification Consultancy | Desire Consultancy" />
        <meta property="og:description" content="Complete BIS certification support — ISI mark, documentation, factory audits, lab coordination." />
        <meta property="og:image" content="https://desireconsultancy.in/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">BIS Certification</span>
          </nav>

          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            STANDARDS COMPLIANCE
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            BIS Certification
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              Consultancy
            </span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-12">
            Bureau of Indian Standards (BIS) certification — including the ISI mark — is mandatory for
            hundreds of product categories in India. Our consultants guide you through every step:
            documentation, lab testing, factory audits, and final licensing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { title: 'ISI Mark Licensing', desc: 'Mandatory certification under IS standards for regulated product categories.' },
              { title: 'BIS Registration Scheme (CRS)', desc: 'For electronics and IT products requiring mandatory BIS registration.' },
              { title: 'Factory Audit Preparation', desc: 'Complete preparation for BIS factory inspections and pre-audit mock runs.' },
              { title: 'Lab Testing Coordination', desc: 'Coordination with BIS-approved labs for product testing and sample submission.' },
              { title: 'Documentation Support', desc: 'End-to-end assistance with application forms, test reports, and compliance files.' },
              { title: 'License Renewal & Surveillance', desc: 'Annual surveillance support and timely renewal management.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#16D9C5]/20 transition-all duration-300">
                <h2 className="font-semibold text-white text-sm mb-1">{item.title}</h2>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link to="/#contact" className="px-8 py-3.5 rounded-full bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] text-black font-semibold text-xs tracking-widest uppercase hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(14,110,255,0.35)] transition-all duration-300">
              Book Free Consultation
            </Link>
            <div className="text-white/40 text-xs font-mono space-y-1">
              <div>📞 <a href="tel:+918421504028" className="hover:text-[#16D9C5] transition-colors">+91 84215 04028</a></div>
              <div>📧 <a href="mailto:desireconsultancy37@gmail.com" className="hover:text-[#16D9C5] transition-colors">desireconsultancy37@gmail.com</a></div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-white/5">
            <p className="text-[10px] tracking-widest text-white/30 font-mono uppercase mb-4">Explore Other Services</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/fssai-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">FSSAI Licensing →</Link>
              <Link to="/services/packaged-drinking-water" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Packaged Water Plants →</Link>
              <Link to="/services/ro-solutions" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Industrial RO Solutions →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
