import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SubpageLayout } from '../../layouts/SubpageLayout';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'FSSAI Licensing Consultancy',
  description:
    'Expert FSSAI licensing and FoSCoS registration assistance for food businesses in Mumbai and across India — basic registration, state and central licenses, renewals, and compliance audits.',
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
  url: 'https://desireconsultancy.in/fssai-certification',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://desireconsultancy.in' },
    { '@type': 'ListItem', position: 2, name: 'FSSAI Licensing', item: 'https://desireconsultancy.in/fssai-certification' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between FSSAI State and Central License?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A State FSSAI License is mandatory for food business operators with an annual turnover between ₹12 Lakhs and ₹20 Crores operating within one state. A Central FSSAI License is required if annual turnover exceeds ₹20 Crores, if the business operates across multiple states, or for specific high-risk operations like 100% export units, importers, and packaged drinking water plants.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required for an FSSAI License application in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Core documents include: photo ID and PAN of directors/proprietor, proof of business premises (electricity bill, registered rent/lease deed), blueprint layout of the processing unit with equipment list, NABL-accredited water testing potability report, list of food categories manufactured, and a Food Safety Management System (FSMS) plan.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the validity period of an FSSAI license?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An FSSAI license or registration can be obtained for a validity period ranging from 1 to 5 years. Renewal applications must be submitted at least 30 days prior to expiry via the FoSCoS portal to avoid statutory late fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the penalty for operating a food business without an FSSAI License?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 63 of the Food Safety and Standards Act, 2006, operating a food business without a valid license can result in imprisonment of up to 6 months and a monetary penalty of up to ₹5,00,000.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'What is the difference between FSSAI State and Central License?',
    a: 'A State FSSAI License is mandatory for businesses with an annual turnover between ₹12 Lakhs and ₹20 Crores operating within one state. A Central License is required if turnover exceeds ₹20 Crores, if operations span multiple states, or for specific businesses like importers, exporters, e-commerce, and water plants.',
  },
  {
    q: 'What documents are required for an FSSAI License application?',
    a: 'Key documents include premises proof (lease agreement or electricity bill), photo IDs and PAN of directors/partners, blueprint plant layout with equipment list, NABL-accredited water test potability report, and an FSMS compliance plan.',
  },
  {
    q: 'How long does it take to obtain an FSSAI License?',
    a: 'Basic registrations typically take 7 to 10 days. State and Central licenses take approximately 20 to 45 days, depending on authority verification, query resolution, and physical premises inspection.',
  },
  {
    q: 'Can Desire Consultancy handle annual returns (Form D1) and renewals?',
    a: 'Yes. We handle end-to-end compliance including timely license renewals, annual FoSCoS return filings (Form D1/D2), and license modifications when adding new food categories or shifting premises.',
  },
];

export function FSSAIPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SubpageLayout>
      <Helmet>
        <title>FSSAI License Consultant for Packaged Drinking Water & Food Businesses India</title>
        <meta
          name="description"
          content="Expert FSSAI licence consultancy in India. Central and State FSSAI manufacturing licenses for packaged drinking water plants, food processing units, renewals, FoSCoS filing, and inspection readiness."
        />
        <meta
          name="keywords"
          content="FSSAI licence for packaged drinking water plant, FSSAI consultant for water plant, FSSAI manufacturing licence drinking water, food safety licence India, Central FSSAI licence consultant, FoSCoS registration water plant, documents required for FSSAI water plant"
        />
        <link rel="canonical" href="https://desireconsultancy.in/fssai-certification" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://desireconsultancy.in/fssai-certification" />
        <meta property="og:title" content="FSSAI Licensing Consultancy | Desire Consultancy" />
        <meta property="og:description" content="Expert FSSAI licensing assistance across India — registrations, state & central licenses, renewals." />
        <meta property="og:image" content="https://desireconsultancy.in/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-16">
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
          operating in India must hold an active license or registration under FoSCoS. Desire Consultancy
          provides comprehensive end-to-end guidance — classification, documentation, inspection audit prep,
          and fast-track approvals across Maharashtra and India.
        </p>

        {/* In-depth guide prompt banner */}
        <div className="mb-14 p-5 rounded-xl bg-gradient-to-r from-[#0E6EFF]/10 via-[#16D9C5]/10 to-transparent border border-[#16D9C5]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#16D9C5] uppercase block mb-1">Knowledge Base Article</span>
            <p className="text-sm text-white font-medium">Looking for a step-by-step breakdown of Central FSSAI eligibility and fees?</p>
          </div>
          <Link
            to="/blog/fssai-central-license-guide"
            className="inline-flex items-center gap-1.5 text-xs text-[#16D9C5] font-mono font-semibold uppercase hover:text-white transition-colors whitespace-nowrap"
          >
            Read Central License Guide →
          </Link>
        </div>

        {/* Services covered */}
        <h2 className="text-xl font-bold text-white uppercase font-display mb-6">Our FSSAI Licensing Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {[
            { title: 'FSSAI Basic Registration', desc: 'For small food manufacturers, retail outlets, and cloud kitchens with annual turnover up to ₹12 Lakhs.' },
            { title: 'State FSSAI License', desc: 'For medium manufacturing plants, restaurants, bakeries, and traders with turnover between ₹12 Lakhs and ₹20 Crores.' },
            { title: 'Central FSSAI License', desc: 'Mandatory for businesses with turnover > ₹20 Crores, 100% EOUs, importers, water bottling plants, and multi-state operations.' },
            { title: 'FSSAI License Renewal', desc: 'Avoid business shutdowns and daily penalties with guaranteed timely renewal filings via FoSCoS.' },
            { title: 'Modification & Category Expansion', desc: 'Adding new product categories, modifying processing machinery, or changing factory premises.' },
            { title: 'Food Safety Audit Prep', desc: 'Pre-inspection site audits, mock hygiene evaluations, and water analysis coordination with NABL labs.' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#16D9C5]/20 transition-all duration-300"
            >
              <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Eligibility & Criteria Table */}
        <h2 className="text-xl font-bold text-white uppercase font-display mb-6">FSSAI License Classification & Criteria</h2>
        <div className="overflow-x-auto mb-16 border border-white/10 rounded-xl bg-white/[0.01]">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-white/5 text-white/70 font-mono text-[10px] tracking-wider uppercase border-b border-white/10">
              <tr>
                <th className="p-3.5">License Tier</th>
                <th className="p-3.5">Turnover Bracket</th>
                <th className="p-3.5">Production Capacity</th>
                <th className="p-3.5">Jurisdiction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/60">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-3.5 font-medium text-white">Basic Registration (Form A)</td>
                <td className="p-3.5">Up to ₹12 Lakhs / year</td>
                <td className="p-3.5">Up to 100 kg or litres / day</td>
                <td className="p-3.5">Local Municipal / Panchayat Authority</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-3.5 font-medium text-white">State License (Form B)</td>
                <td className="p-3.5">₹12 Lakhs to ₹20 Crores / year</td>
                <td className="p-3.5">Up to 2 Metric Tonnes / day</td>
                <td className="p-3.5">State Designated Officer (FDA)</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-3.5 font-medium text-white">Central License</td>
                <td className="p-3.5">Above ₹20 Crores / year</td>
                <td className="p-3.5">Above 2 MT / day or Multi-State</td>
                <td className="p-3.5">Central FSSAI Authority, New Delhi</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FAQs */}
        <h2 className="text-xl font-bold text-white uppercase font-display mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3 mb-16">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={faq.q}
                className="border border-white/5 rounded-xl bg-white/[0.02] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-left flex justify-between items-center text-sm font-semibold text-white hover:text-[#16D9C5] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="font-mono text-xs text-[#16D9C5] ml-4">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-white/60 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
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
            <div>📧 <a href="mailto:support@desireconsultancy.in" className="hover:text-[#16D9C5] transition-colors">support@desireconsultancy.in</a></div>
          </div>
        </div>

        {/* Internal links */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <p className="text-[10px] tracking-widest text-white/30 font-mono uppercase mb-4">Explore Other Services</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/bis-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">BIS Certification →</Link>
            <Link to="/services/packaged-drinking-water" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Packaged Water Plants →</Link>
            <Link to="/services/ro-solutions" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Industrial RO Solutions →</Link>
            <Link to="/trademark-registration" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Trademark Registration →</Link>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
