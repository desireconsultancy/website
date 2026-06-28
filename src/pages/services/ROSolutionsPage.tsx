import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Industrial RO Solutions Consultancy',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Desire Consultancy',
    telephone: '+918421504028',
    address: { '@type': 'PostalAddress', addressLocality: 'Nagpur', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  },
  areaServed: { '@type': 'Country', name: 'India' },
  url: 'https://desireconsultancy.in/services/ro-solutions',
};

export function ROSolutionsPage() {
  return (
    <>
      <Helmet>
        <title>Industrial RO Solutions Consultancy | Desire Consultancy — Nagpur</title>
        <meta name="description" content="Expert industrial RO water treatment consultancy in Nagpur. We assist businesses with compliance, certifications, and regulatory approvals for commercial and industrial RO systems." />
        <meta name="keywords" content="industrial RO solutions Nagpur, RO water treatment consultancy Maharashtra, commercial RO compliance India, water treatment regulatory approval" />
        <link rel="canonical" href="https://desireconsultancy.in/services/ro-solutions" />
        <meta property="og:url" content="https://desireconsultancy.in/services/ro-solutions" />
        <meta property="og:title" content="Industrial RO Solutions Consultancy | Desire Consultancy" />
        <meta property="og:description" content="Compliance and regulatory guidance for commercial and industrial RO water treatment systems." />
        <meta property="og:image" content="https://desireconsultancy.in/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Industrial RO Solutions</span>
          </nav>

          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">WATER TREATMENT</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            Industrial RO<br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">Solutions</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-12">
            Commercial and industrial reverse osmosis (RO) systems require regulatory compliance, water quality certifications, and approvals. Desire Consultancy provides expert guidance to ensure your operation meets all applicable standards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { title: 'Regulatory Compliance Advisory', desc: 'Guidance on applicable standards and regulations for industrial RO systems.' },
              { title: 'Water Quality Certification', desc: 'Support for obtaining water quality test certificates from approved laboratories.' },
              { title: 'CPCB & Pollution Board Approvals', desc: 'Assistance with obtaining environmental clearances and effluent disposal permissions.' },
              { title: 'BIS Product Compliance', desc: 'Ensuring RO membrane and component compliance with applicable BIS standards.' },
              { title: 'Documentation & Application', desc: 'Complete documentation support for all regulatory applications and approvals.' },
              { title: 'Audit & Inspection Support', desc: 'Preparation for regulatory inspections and compliance audits.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#16D9C5]/20 transition-all duration-300">
                <h2 className="font-semibold text-white text-sm mb-1">{item.title}</h2>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link to="/#contact" className="px-8 py-3.5 rounded-full bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] text-black font-semibold text-xs tracking-widest uppercase hover:scale-[1.02] transition-all duration-300">Book Free Consultation</Link>
            <div className="text-white/40 text-xs font-mono space-y-1">
              <div>📞 <a href="tel:+918421504028" className="hover:text-[#16D9C5] transition-colors">+91 84215 04028</a></div>
              <div>📧 <a href="mailto:desireconsultancy37@gmail.com" className="hover:text-[#16D9C5] transition-colors">desireconsultancy37@gmail.com</a></div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-white/5">
            <p className="text-[10px] tracking-widest text-white/30 font-mono uppercase mb-4">Explore Other Services</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/fssai-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">FSSAI Licensing →</Link>
              <Link to="/bis-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">BIS Certification →</Link>
              <Link to="/services/packaged-drinking-water" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Packaged Water Plants →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
