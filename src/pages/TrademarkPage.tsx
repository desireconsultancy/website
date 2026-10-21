import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SubpageLayout } from '../layouts/SubpageLayout';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Trademark Registration Consultancy',
  description:
    'Protect your brand name, logo, slogan, and intellectual property with expert Trademark Registration consultancy in Mumbai and across India — NICE classification, trademark search, online filing, objection replies, hearing representation, and renewals.',
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
  url: 'https://desireconsultancy.in/trademark-registration',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://desireconsultancy.in' },
    { '@type': 'ListItem', position: 2, name: 'Trademark Registration', item: 'https://desireconsultancy.in/trademark-registration' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between ™ (TM) and ® (Registered) symbols?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ™ symbol can be used immediately upon filing Form TM-A with the Trademark Registry once the official application number is generated. The ® symbol can ONLY be used legally after the Registrar issues the final Trademark Registration Certificate upon surviving publication in the Trademark Journal.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I choose the correct trademark class under the NICE classification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trademarks in India are categorized into 45 classes (Classes 1 to 34 for goods and Classes 35 to 45 for services) under the International NICE Classification. For example, Packaged Drinking Water falls under Class 32, Food products under Classes 29 & 30, and consultancy/business services under Class 35. Desire Consultancy conducts classification mapping to ensure complete legal protection without overpaying statutory fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if a trademark receives an examination report objection (Section 9 or 11)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An objection is common during the examination phase. Section 9 objections concern descriptive or non-distinctive names, while Section 11 objections pertain to similarity with an existing mark. Our trademark attorneys draft a statutory reply supported by evidence of prior commercial use and legal precedents within the mandatory 30-day window.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is a registered trademark valid in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A registered trademark is valid for 10 years from the original application date. It can be renewed indefinitely every 10 years by paying the renewal fee via Form TM-R.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'When can I start using the ™ and ® symbols?',
    a: 'You can use the ™ symbol immediately after our team files Form TM-A and generates your official application receipt. You can only display the ® registered mark once the registration certificate has been officially granted.',
  },
  {
    q: 'How long does it take to register a trademark in India?',
    a: 'Once filed, the ™ status is active in 24 hours. The complete registration journey to the ® certificate typically takes 6 to 12 months, which includes examiner examination, statutory 4-month public journal advertisement, and final certificate issuance if unopposed.',
  },
  {
    q: 'Do startups and MSMEs get government fee concessions for trademark filing?',
    a: 'Yes. The official government filing fee for individuals, startups (DPIIT recognized), and MSME (Udyam registered) enterprises is ₹4,500 per class, compared to ₹9,000 for standard corporate applicants — giving you a 50% statutory rebate.',
  },
  {
    q: 'Can Desire Consultancy handle trademark objections and show-cause hearings?',
    a: 'Yes. Our IP legal consultants draft formal statutory replies to Examination Reports under Sections 9 & 11 and represent your mark before the Registrar of Trademarks during virtual or physical hearings.',
  },
];

export function TrademarkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SubpageLayout>
      <Helmet>
        <title>Trademark Registration Consultancy | Desire Consultancy — Mumbai</title>
        <meta
          name="description"
          content="Expert Trademark Registration consultancy in Mumbai. Safeguard your brand name, logo, and intellectual property. Brand search, online TM-A filing, objection replies, and renewals across India."
        />
        <meta
          name="keywords"
          content="Trademark registration Mumbai, brand name protection India, logo trademark Maharashtra, trademark filing consultancy, intellectual property support, TM-A filing, NICE classification"
        />
        <link rel="canonical" href="https://desireconsultancy.in/trademark-registration" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://desireconsultancy.in/trademark-registration" />
        <meta property="og:title" content="Trademark Registration Consultancy | Desire Consultancy" />
        <meta property="og:description" content="Safeguard your brand identity and secure trademark filings across India." />
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
            <span className="text-white/60">Trademark Registration</span>
          </nav>

          {/* Header */}
          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            INTELLECTUAL PROPERTY &amp; BRAND PROTECTION
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            Trademark
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              Registration
            </span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-12">
            Your brand name, company logo, and packaging designs are valuable intellectual property. Registering your trademark prevents competitors from counterfeit copying and secures your exclusive rights across India. Desire Consultancy provides comprehensive IP services from preliminary search to final certificate issuance.
          </p>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { title: 'Comprehensive Brand Search', desc: 'Thorough search across IP India public records and phonetic databases to prevent Section 11 conflicts.' },
              { title: 'NICE Class Mapping (1 to 45)', desc: 'Strategic mapping of your products and services across 45 classes for maximum legal protection.' },
              { title: 'Online Form TM-A Filing', desc: 'Same-day filing on the Controller General of Patents, Designs and Trade Marks portal with 50% MSME rebate.' },
              { title: 'Examination Report Objection Replies', desc: 'Drafting grounded legal rebuttals to Section 9 (distinctiveness) and Section 11 (conflict) notices within 30 days.' },
              { title: 'Hearing Representation', desc: 'Representation before the Registrar during statutory show-cause hearings to secure journal publication.' },
              { title: '10-Year Renewals & Assignments', desc: 'Form TM-R maintenance filings, title assignment deeds, and brand license agreement drafting.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#16D9C5]/20 transition-all duration-300">
                <h2 className="font-semibold text-white text-sm mb-1">{item.title}</h2>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 4-Step Registration Process */}
          <div className="mb-16 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-6">
              The Trademark Registration Journey
            </h2>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Search & Class Identification', desc: 'We verify availability across phonetic, wordmark, and device indices to ensure high probability of approval.' },
                { step: '02', title: 'Filing & Immediate ™ Usage', desc: 'Application submission via Form TM-A. You receive your official filing receipt and can start displaying ™.' },
                { step: '03', title: 'Examination & Gazette Publication', desc: 'Responding to registry objections if raised. Mark is published in the official Trademark Journal for 4 months.' },
                { step: '04', title: 'Registration Certificate & ® Protection', desc: 'Issuance of the central registration certificate valid for 10 years across all states in India.' },
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
              Run Free Trademark Search
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
              <Link to="/fssai-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">FSSAI Licensing →</Link>
              <Link to="/bis-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">BIS Certification →</Link>
              <Link to="/services/packaged-drinking-water" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Packaged Water Plants →</Link>
              <Link to="/services/ro-solutions" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Industrial RO Solutions →</Link>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
export default TrademarkPage;
