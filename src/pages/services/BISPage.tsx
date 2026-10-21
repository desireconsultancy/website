import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SubpageLayout } from '../../layouts/SubpageLayout';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'BIS Certification Consultancy',
  description:
    'Complete BIS (Bureau of Indian Standards) certification consultancy — ISI mark licensing, Compulsory Registration Scheme (CRS), factory audit preparation, in-house lab setup, and compliance support across India.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Desire Consultancy',
    telephone: '+918421504028',
    email: 'support@desireconsultancy.in',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  },
  areaServed: { '@type': 'Country', name: 'India' },
  url: 'https://desireconsultancy.in/bis-certification',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://desireconsultancy.in' },
    { '@type': 'ListItem', position: 2, name: 'BIS Certification', item: 'https://desireconsultancy.in/bis-certification' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between ISI Mark Certification and BIS CRS Registration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ISI Mark (Scheme-I) requires a rigorous on-site factory audit by BIS inspection officers, verification of an in-house testing laboratory, and pre-grant sample testing. It applies to critical industrial goods, packaged drinking water, cement, and safety equipment. The Compulsory Registration Scheme (CRS / Scheme-II) is a self-declaration scheme primarily for IT, electronics, and solar products based on testing at BIS-recognized laboratories without a mandatory prior factory inspection.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is an in-house testing laboratory mandatory for obtaining a BIS ISI license?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. For Scheme-I (ISI mark), manufacturers must establish an operational in-house testing laboratory equipped with calibrated instruments and qualified technical personnel according to the relevant Indian Standard (e.g., IS 14543 for water, IS 4984 for HDPE pipes). Desire Consultancy assists in sourcing compliant testing apparatus and training laboratory chemists.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to get a BIS license in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For Indian domestic manufacturers under Scheme-I, the process typically takes 30 to 60 days from application filing to license grant, including factory inspection and lab testing. Under the Simplified Procedure, licenses can sometimes be granted in as little as 30 days if pre-testing at approved labs is completed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can foreign manufacturers obtain a BIS certificate to export to India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Foreign manufacturers must apply under the Foreign Manufacturers Certification Scheme (FMCS) and appoint an Authorized Indian Representative (AIR). BIS officials conduct a factory audit abroad before granting the license.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'What is the difference between ISI Mark Certification and BIS CRS Registration?',
    a: 'The ISI Mark (Scheme-I) requires a rigorous physical factory inspection by BIS officials, an operational in-house test lab, and independent sample testing. It covers high-impact products like packaged drinking water, steel, and cement. BIS CRS (Scheme-II) is a self-declaration scheme for electronic and IT products based on lab test reports without a prior factory audit.',
  },
  {
    q: 'Is an in-house testing laboratory mandatory for obtaining a BIS ISI license?',
    a: 'Yes. For Scheme-I ISI marking, having an operational in-house testing laboratory with calibrated equipment and qualified quality control personnel is mandatory. Desire Consultancy guides you through complete lab design, equipment sourcing, and chemist preparation.',
  },
  {
    q: 'How long does the BIS licensing process take?',
    a: 'Under standard procedure, domestic manufacturing applications take approximately 45 to 60 days. Under the Simplified Procedure with pre-tested lab reports, grant timelines can be compressed to 30 days.',
  },
  {
    q: 'How does Desire Consultancy assist with factory inspections?',
    a: 'We conduct full pre-audit mock inspections, verify your manufacturing process flow and test registers, train your quality team on BIS audit protocols, and ensure zero non-conformances during official officer visits.',
  },
];

const STANDARDS_MATRIX = [
  { standard: 'IS 14543', category: 'Packaged Drinking Water (Other than Natural Mineral Water)', scheme: 'Scheme-I (ISI Mark)' },
  { standard: 'IS 13428', category: 'Packaged Natural Mineral Water', scheme: 'Scheme-I (ISI Mark)' },
  { standard: 'IS 4984 / IS 12786', category: 'HDPE Pipes & Irrigation Tubing', scheme: 'Scheme-I (ISI Mark)' },
  { standard: 'IS 13252 / IS 616', category: 'Information Technology & Audio/Video Equipment', scheme: 'Scheme-II (CRS Registration)' },
  { standard: 'IS 1786 / IS 2062', category: 'High Strength Deformed Steel Bars & Structural Steel', scheme: 'Scheme-I (ISI Mark)' },
];

export function BISPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SubpageLayout>
      <Helmet>
        <title>BIS Certification Consultant India | ISI Mark for Packaged Water & Manufacturing</title>
        <meta
          name="description"
          content="Leading BIS certification and ISI mark consultant in India. Expert guidance for packaged drinking water (IS 14543), mineral water (IS 13428), factory audits, in-house lab setup, testing coordination, and Manakonline licensing."
        />
        <meta
          name="keywords"
          content="BIS certification requirements for packaged drinking water, BIS consultant for water manufacturing, ISI mark requirements for packaged drinking water, IS 14543 certification, IS 13428 mineral water, BIS factory audit preparation, in-house water testing laboratory setup"
        />
        <link rel="canonical" href="https://desireconsultancy.in/bis-certification" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://desireconsultancy.in/bis-certification" />
        <meta property="og:title" content="BIS Certification Consultancy | Desire Consultancy" />
        <meta property="og:description" content="Complete BIS certification support — ISI mark, in-house lab setup, factory audits, lab coordination." />
        <meta property="og:image" content="https://desireconsultancy.in/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">BIS Certification</span>
          </nav>

          {/* Header */}
          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            STANDARDS &amp; PRODUCT CONFORMITY
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            BIS Certification
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              Consultancy
            </span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-12">
            Bureau of Indian Standards (BIS) certification — including the prestigious ISI mark — is legally mandatory for hundreds of consumer, industrial, and food products in India. Desire Consultancy provides turnkey support: technical documentation, factory layout preparation, in-house testing laboratory setup, BIS liaison, and post-grant surveillance compliance.
          </p>

          {/* Core Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { title: 'ISI Mark Licensing (Scheme-I)', desc: 'Mandatory product certification under Indian Standards (IS) with factory audit and sample verification.' },
              { title: 'BIS Registration Scheme (CRS)', desc: 'Self-declaration compliance for electronic, IT, and solar goods through accredited laboratory test reports.' },
              { title: 'In-House Testing Lab Setup', desc: 'Complete guidance on sourcing testing apparatus, calibration certificates, and testing procedures.' },
              { title: 'Factory Audit & Pre-Audit Mock Runs', desc: 'Comprehensive inspection readiness check simulating BIS officer verification to eliminate observations.' },
              { title: 'NABL Lab Testing Coordination', desc: 'Sample drawing, packaging, and liaison with BIS-recognized labs for statutory testing protocols.' },
              { title: 'License Renewal & Surveillance', desc: 'Annual surveillance audits, test report upkeep, and seamless digital renewal via the Manakonline portal.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#16D9C5]/20 transition-all duration-300">
                <h2 className="font-semibold text-white text-sm mb-1">{item.title}</h2>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Key Standards Covered Table */}
          <div className="mb-16">
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-4">
              Major Standards &amp; Schemes Covered
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mb-6 leading-relaxed">
              We specialize in end-to-end certification across high-scrutiny BIS product categories:
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/[0.01]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/5 text-[#16D9C5] uppercase text-[10px] tracking-wider border-b border-white/5">
                  <tr>
                    <th className="p-4">Indian Standard (IS)</th>
                    <th className="p-4">Product Category</th>
                    <th className="p-4">Scheme Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  {STANDARDS_MATRIX.map((row) => (
                    <tr key={row.standard} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-bold text-white">{row.standard}</td>
                      <td className="p-4 font-sans text-xs">{row.category}</td>
                      <td className="p-4 text-[10px] text-white/50">{row.scheme}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Step by Step BIS Pipeline */}
          <div className="mb-16 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-6">
              Our 5-Stage BIS Certification Process
            </h2>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Gap Analysis & Plant Assessment', desc: 'We inspect your manufacturing unit, verify machinery tolerances, and audit in-house testing capacity.' },
                { step: '02', title: 'Documentation & Portal Filing', desc: 'Filing of Form-V on Manakonline with manufacturing flowcharts, QC registers, and calibration records.' },
                { step: '03', title: 'In-House Laboratory Commissioning', desc: 'Installation and calibration of testing instruments required under the Scheme of Inspection & Testing (SIT).' },
                { step: '04', title: 'Factory Audit & Sample Sealing', desc: 'Guiding your technical team during the on-site physical inspection by BIS investigating officers.' },
                { step: '05', title: 'Independent Lab Clearance & License Grant', desc: 'Tracking testing at BIS-approved laboratories and securing the official CML (Certificate of Manufacturing License).' },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
                  <span className="font-mono text-sm text-[#16D9C5] font-bold">{s.step}</span>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{s.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Base Link */}
          <div className="mb-16 p-6 rounded-2xl bg-gradient-to-r from-[#0E6EFF]/10 to-[#16D9C5]/10 border border-[#16D9C5]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#16D9C5] uppercase block mb-1">Knowledge Guide</span>
              <h3 className="font-display text-lg font-bold text-white">Complete Guide to BIS ISI Mark Certification</h3>
              <p className="text-white/50 text-xs mt-1">Read about application stages, factory audit parameters, and timelines.</p>
            </div>
            <Link
              to="/blog/bis-isi-mark-certification"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#16D9C5] hover:text-black font-mono text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap"
            >
              Read Guide →
            </Link>
          </div>

          {/* FAQ Accordion */}
          <div className="mb-16">
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={faq.q}
                  className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-white/[0.02] transition-colors"
                    aria-expanded={openFaq === idx}
                  >
                    <span className="font-semibold text-white text-xs sm:text-sm">{faq.q}</span>
                    <span className="text-[#16D9C5] font-mono text-base flex-shrink-0">
                      {openFaq === idx ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-0 text-white/60 text-xs leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="border-t border-white/5 pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link to="/#contact" className="px-8 py-3.5 rounded-full bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] text-black font-semibold text-xs tracking-widest uppercase hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(14,110,255,0.35)] transition-all duration-300">
              Book Free Consultation
            </Link>
            <div className="text-white/40 text-xs font-mono space-y-1">
              <div>📞 <a href="tel:+918421504028" className="hover:text-[#16D9C5] transition-colors">+91 84215 04028</a></div>
              <div>📧 <a href="mailto:support@desireconsultancy.in" className="hover:text-[#16D9C5] transition-colors">support@desireconsultancy.in</a></div>
            </div>
          </div>

          {/* Cross Links */}
          <div className="mt-16 pt-12 border-t border-white/5">
            <p className="text-[10px] tracking-widest text-white/30 font-mono uppercase mb-4">Explore Other Services</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/fssai-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">FSSAI Licensing →</Link>
              <Link to="/services/packaged-drinking-water" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Packaged Water Plants →</Link>
              <Link to="/services/ro-solutions" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Industrial RO Solutions →</Link>
              <Link to="/trademark-registration" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Trademark Registration →</Link>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
export default BISPage;
