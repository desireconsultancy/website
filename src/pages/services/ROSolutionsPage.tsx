import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SubpageLayout } from '../../layouts/SubpageLayout';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Industrial RO & Water Treatment Solutions Consultancy',
  description:
    'Industrial RO solutions consultancy in Mumbai and across India — MPCB consent, CPCB effluent discharge compliance, BIS component conformity, zero liquid discharge (ZLD) design, and testing certification.',
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
  url: 'https://desireconsultancy.in/services/ro-solutions',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://desireconsultancy.in' },
    { '@type': 'ListItem', position: 2, name: 'Industrial RO Solutions', item: 'https://desireconsultancy.in/services/ro-solutions' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What environmental approvals are required for industrial RO reject discharge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Industrial RO systems producing concentrate reject brine require Consent to Establish (CTE) and Consent to Operate (CTO) from State Pollution Control Boards (such as MPCB). High-capacity industries must implement Zero Liquid Discharge (ZLD) systems combining multi-effect evaporators (MEE) and ATFD to prevent contamination of local water tables.',
      },
    },
    {
      '@type': 'Question',
      name: 'What parameters are tested for industrial process water quality certification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key laboratory analysis parameters include Total Dissolved Solids (TDS), Electrical Conductivity (EC), Silica levels, Total Hardness, Chemical Oxygen Demand (COD), Biological Oxygen Demand (BOD), and heavy metals (Iron, Arsenic, Lead) tested through NABL-accredited facilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which industries require specialized commercial and industrial RO systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Major sectors include pharmaceutical formulation units (purified water USP standards), boiler feed water in thermal and chemical plants, food & beverage processing, textile dyeing units, hemodialysis centers, and commercial packaged water plants.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'What environmental approvals are required for industrial RO reject discharge?',
    a: 'Discharging RO brine concentrate requires Consent to Operate (CTO) from the State Pollution Control Board (e.g., MPCB in Maharashtra). For red and orange category industries, a Zero Liquid Discharge (ZLD) system or approved effluent treatment plant (ETP) connection is mandatory.',
  },
  {
    q: 'How does Desire Consultancy assist in RO plant compliance?',
    a: 'We evaluate raw water chemistry, design compliant treatment trains (pre-filtration, antiscalant dosing, reverse osmosis, post-treatment), obtain Pollution Board clearances, coordinate NABL water purity testing, and audit membrane operating logs.',
  },
  {
    q: 'What is the difference between commercial RO and industrial ZLD systems?',
    a: 'Commercial RO systems typically operate at 50% to 75% recovery for institutional drinking or light washing. Industrial ZLD systems achieve up to 95%+ water recovery by integrating secondary RO membranes, reject recovery units, and thermal evaporators to leave zero liquid waste.',
  },
  {
    q: 'Are RO membrane components subject to BIS quality certification?',
    a: 'Yes. BIS has notified standards covering domestic and commercial RO components, filter housings, and food-grade plastic piping to guarantee structural integrity and non-leaching performance under high pressure.',
  },
];

export function ROSolutionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SubpageLayout>
      <Helmet>
        <title>Industrial RO Plant Setup & Water Treatment Consultancy India | Desire Consultancy</title>
        <meta
          name="description"
          content="Commercial and industrial RO water treatment plant consultancy in India. Industrial RO plant design, MPCB/CPCB pollution clearances, ZLD zero liquid discharge systems, and NABL water testing."
        />
        <meta
          name="keywords"
          content="industrial RO plant setup, commercial RO plant India, industrial RO machine, water treatment plant consultant, pollution control permissions for water plant, industrial RO plant design, ZLD zero liquid discharge consultant"
        />
        <link rel="canonical" href="https://desireconsultancy.in/services/ro-solutions" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://desireconsultancy.in/services/ro-solutions" />
        <meta property="og:title" content="Industrial RO Solutions Consultancy | Desire Consultancy" />
        <meta
          property="og:description"
          content="Compliance, pollution clearances, and regulatory guidance for commercial and industrial RO water systems."
        />
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
            <span className="text-white/60">Industrial RO Solutions</span>
          </nav>

          {/* Header */}
          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            WATER TREATMENT &amp; RECOVERY
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            Industrial RO
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-12">
            Commercial and industrial reverse osmosis (RO) installations face stringent environmental discharge guidelines, groundwater extraction norms, and water quality benchmarks. Desire Consultancy guides manufacturing plants, hospitals, hotels, and food processors through regulatory clearances, MPCB consents, and technical compliance.
          </p>

          {/* Service Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { title: 'MPCB & CPCB Pollution Clearances', desc: 'Assistance with Consent to Establish (CTE) & Operate (CTO) for industrial effluent and RO reject brine disposal.' },
              { title: 'Water Quality NABL Testing', desc: 'Comprehensive chemical, heavy metal, and biological profiling of intake and permeate water streams.' },
              { title: 'Zero Liquid Discharge (ZLD) Advisory', desc: 'Process optimization, reject recycling strategies, and thermal evaporator compliance planning.' },
              { title: 'BIS Component & Membrane Compliance', desc: 'Ensuring pressure vessels, membrane modules, and dosing chemicals adhere to national industrial standards.' },
              { title: 'Boiler & Pharma Feed Water Standards', desc: 'Conductivity, silica removal, and endotoxin monitoring for ultra-pure boiler feed and pharma processing.' },
              { title: 'Statutory Water Audit & Audit Reports', desc: 'Mandatory annual water conservation balance audits and CGWA compliance submissions.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#16D9C5]/20 transition-all duration-300">
                <h2 className="font-semibold text-white text-sm mb-1">{item.title}</h2>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Industrial Applications Matrix */}
          <div className="mb-16 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-6">
              Sector Compliance Solutions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { sector: 'Food & Beverage', norm: 'FSSAI Schedule 4 hygiene & potable permeate requirements.' },
                { sector: 'Pharma & Biotech', norm: 'USP / IP purified water grade with periodic microbial monitoring.' },
                { sector: 'Chemical & Textile', norm: 'MPCB effluent treatment, COD/BOD abatement, and brine recovery.' },
              ].map((s) => (
                <div key={s.sector} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-[#16D9C5] block mb-2">{s.sector}</span>
                  <p className="text-white/60 text-xs leading-relaxed">{s.norm}</p>
                </div>
              ))}
            </div>
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
              Request RO Compliance Consultation
            </Link>
            <div className="text-white/40 text-xs font-mono space-y-1">
              <div>📞 <a href="tel:+918421504028" className="hover:text-[#16D9C5] transition-colors">+91 84215 04028</a></div>
              <div>📧 <a href="mailto:support@desireconsultancy.in" className="hover:text-[#16D9C5] transition-colors">support@desireconsultancy.in</a></div>
            </div>
          </div>

          {/* Cross Links */}
          <div className="mt-16 pt-12 border-t border-white/5">
            <p className="text-[10px] tracking-widest text-white/30 font-mono uppercase mb-4">Explore Related Services</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/services/packaged-drinking-water" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Packaged Water Plants →</Link>
              <Link to="/bis-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">BIS Certification →</Link>
              <Link to="/fssai-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">FSSAI Licensing →</Link>
              <Link to="/trademark-registration" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Trademark Registration →</Link>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
export default ROSolutionsPage;
