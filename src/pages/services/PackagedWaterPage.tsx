import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Packaged Drinking Water Plant Consultancy',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Desire Consultancy',
    telephone: '+918421504028',
    address: { '@type': 'PostalAddress', addressLocality: 'Nagpur', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  },
  areaServed: { '@type': 'Country', name: 'India' },
  url: 'https://desireconsultancy.in/services/packaged-drinking-water',
};

export function PackagedWaterPage() {
  return (
    <>
      <Helmet>
        <title>Packaged Drinking Water Plant Consultancy | Desire Consultancy — Nagpur</title>
        <meta name="description" content="Expert consultancy for packaged drinking water plants — BIS IS 14543 certification, FSSAI licensing, ISI mark, plant layout, and full compliance support across India." />
        <meta name="keywords" content="packaged drinking water plant consultancy Nagpur, BIS IS 14543, mineral water plant Maharashtra, water bottling plant compliance India" />
        <link rel="canonical" href="https://desireconsultancy.in/services/packaged-drinking-water" />
        <meta property="og:url" content="https://desireconsultancy.in/services/packaged-drinking-water" />
        <meta property="og:title" content="Packaged Drinking Water Plant Consultancy | Desire Consultancy" />
        <meta property="og:description" content="End-to-end consultancy for packaged drinking water plants — BIS, FSSAI, ISI mark." />
        <meta property="og:image" content="https://desireconsultancy.in/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Packaged Drinking Water</span>
          </nav>

          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">WATER PLANT SETUP</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            Packaged Drinking<br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">Water Plants</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-12">
            Setting up a packaged drinking water business requires BIS IS 14543 certification, FSSAI licensing, and multiple regulatory approvals. We provide complete end-to-end guidance from plant layout to final certification.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { title: 'BIS IS 14543 Certification', desc: 'Mandatory certification for packaged drinking water plants.' },
              { title: 'FSSAI Central License', desc: 'Food safety compliance for water packaging operations.' },
              { title: 'Plant Layout Advisory', desc: 'Guidance on approved layouts and process flow for regulatory approval.' },
              { title: 'ISI Mark for Mineral Water', desc: 'BIS IS 13428 certification for natural mineral water businesses.' },
              { title: 'Lab Testing Coordination', desc: 'Coordination with NABL-accredited labs for water quality testing.' },
              { title: 'Inspection Preparation', desc: 'Complete readiness support for BIS and FSSAI audits.' },
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
              <Link to="/services/ro-solutions" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Industrial RO Solutions →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
