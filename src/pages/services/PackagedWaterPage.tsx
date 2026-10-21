import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SubpageLayout } from '../../layouts/SubpageLayout';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Packaged Drinking Water Plant Setup Consultancy',
  alternateName: [
    'Mineral Water Plant Setup Consultant',
    'Water Bottling Plant Project Consultant',
    'Turnkey Packaged Drinking Water Plant Project Consultant',
    '20 Litre Water Jar Plant Setup Consultant',
  ],
  description:
    'Turnkey consultancy for setting up packaged drinking water plants in Mumbai and across India — 1000 LPH, 2000 LPH, 5000 LPH & 20 Litre jar plants. BIS IS 14543 certification, Central FSSAI licensing, CGWA borewell NOC, DPR project report for bank loans, machinery installation, and in-house microbiology lab setup.',
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
  url: 'https://desireconsultancy.in/services/packaged-drinking-water',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://desireconsultancy.in' },
    { '@type': 'ListItem', position: 2, name: 'Packaged Drinking Water Plants', item: 'https://desireconsultancy.in/services/packaged-drinking-water' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does it cost to set up a packaged drinking water plant in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The total setup cost for a packaged drinking water plant in India typically ranges from ₹25 Lakhs to ₹75 Lakhs depending on plant capacity and automation. A small-scale 1000 LPH or 20-litre jar plant starts around ₹25–35 Lakhs, while a semi-automatic or fully automatic 2000 to 5000 LPH plant with PET bottle blowing, rinsing, filling, and capping machinery and in-house NABL testing laboratory ranges between ₹45 Lakhs to ₹75 Lakhs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What licences and approvals are required to start a water bottling plant in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A commercial packaged drinking water factory requires five primary statutory approvals: 1) BIS Certification with ISI Mark under IS 14543, 2) Central FSSAI Manufacturing License, 3) Central Ground Water Authority (CGWA) NOC for borewell extraction, 4) State Pollution Control Board (Consent to Establish and Consent to Operate), and 5) Local Municipal Trade License and Factory License.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Desire Consultancy prepare a Detailed Project Report (DPR) for a bank loan or MSME finance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We prepare bankable Detailed Project Reports (DPR) tailored for nationalized banks, SIDBI, and PMEGP/MSME loan schemes. Our DPR includes machinery quotations, civil layout plans, break-even analysis, operating expenditure projections, ROI models, and working capital estimations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What machinery is required for a commercial packaged drinking water plant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard production lines include: Raw water storage, dual media sand and activated carbon filters, antiscalant dosing, reverse osmosis (RO) system, micron cartridge filters, UV sterilizer, ozone generator with contact tank, automatic PET bottle blow moulding machine, Rinser-Filler-Capper (RFC) monoblock, batch coding, shrink tunnel labeller, and 20-litre jar washing-filling-capping machine.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the in-house testing laboratory requirements under BIS IS 14543?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IS 14543 mandates both physical-chemical and microbiological testing facilities on-site. The manufacturer must employ a qualified chemist and an approved microbiologist, and install equipment like autoclave, laminar airflow bench, incubator, analytical balance, TDS meter, turbidity meter, and spectrophotometer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much land and power is required for a packaged drinking water plant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard 1,000 to 3,000 LPH packaged water plant typically requires between 2,500 to 5,000 sq. ft. of civil space including processing area, hygienic filling room, bottle blow molding area, laboratory, and storage. Connected electricity requirements range from 25 HP to 60 HP depending on automation levels.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'How much investment is required to start a packaged drinking water plant in India?',
    a: 'Setting up a packaged drinking water manufacturing unit typically requires an investment of ₹25 Lakhs to ₹75 Lakhs. A 1000 LPH or 20-litre jar plant starts around ₹25–35 Lakhs, whereas a high-speed 2000 to 5000 LPH automatic PET bottling line with in-house laboratory setup ranges between ₹45 Lakhs to ₹75 Lakhs.',
  },
  {
    q: 'What licences and approvals are needed to start a water bottling plant?',
    a: 'Starting a compliant plant requires: 1) BIS ISI Mark Certification under IS 14543, 2) Central FSSAI Manufacturing License, 3) CGWA NOC for groundwater extraction, 4) State Pollution Control Board Consent (CTE & CTO), and 5) Local municipal trade license and factory registration.',
  },
  {
    q: 'Do you provide a Detailed Project Report (DPR) for bank loans and MSME subsidies?',
    a: 'Yes. We prepare bankable DPR project reports complete with equipment quotations, civil hygiene layouts, financial profitability projections, break-even analysis, and cash flow forecasts accepted by banks and government subsidy schemes.',
  },
  {
    q: 'What is the difference between IS 14543 and IS 13428?',
    a: 'IS 14543 governs Packaged Drinking Water (where source water undergoes extensive multi-barrier treatment like RO, UV, and ozonation). IS 13428 applies to Packaged Natural Mineral Water, obtained directly from protected natural underground sources with minimal treatment that preserves natural mineral composition.',
  },
  {
    q: 'Can Desire Consultancy assist with CGWA (Central Ground Water Authority) NOC?',
    a: 'Yes. We prepare the complete hydrogeological survey, water audit reports, rainwater harvesting proposal, and submit the CGWA application through the official NOC portal.',
  },
  {
    q: 'Do you help set up the in-house microbiology and chemical laboratory?',
    a: 'Absolutely. We provide the complete equipment layout, vendor procurement specifications, calibration compliance logs, and train your laboratory chemists and microbiologists to meet BIS audit standards.',
  },
];

const CAPACITY_MATRIX = [
  { capacity: '1,000 LPH Plant', bottles: '~1,000 - 1,500 Bottles/Hr', jars: 'Up to 100 Jars (20L)/Hr', space: '2,000 - 2,500 Sq. Ft.', ideal: 'Startup & Regional 20L Jar Supply' },
  { capacity: '2,000 LPH Plant', bottles: '~2,500 - 3,500 Bottles/Hr', jars: 'Up to 250 Jars (20L)/Hr', space: '3,000 - 4,000 Sq. Ft.', ideal: 'Mid-scale Commercial Bottling & Retail' },
  { capacity: '5,000 LPH Plant', bottles: '~6,000 - 8,000 Bottles/Hr', jars: 'Up to 500 Jars (20L)/Hr', space: '5,000 - 7,500 Sq. Ft.', ideal: 'High-speed Automatic Production & State Distribution' },
];

export function PackagedWaterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SubpageLayout>
      <Helmet>
        <title>Packaged Drinking Water Plant Setup Consultant India | Cost, BIS IS 14543, FSSAI</title>
        <meta
          name="description"
          content="End-to-end turnkey consultancy for packaged drinking water plant setup in India. BIS IS 14543 certification, Central FSSAI licensing, CGWA borewell NOC, 1000/2000/5000 LPH machinery selection, DPR project reports, and NABL testing lab setup."
        />
        <meta
          name="keywords"
          content="packaged drinking water plant setup consultant, water bottling plant cost India, BIS IS 14543 certification, FSSAI licence for water plant, 1000 LPH RO plant, 2000 LPH water plant, 5000 LPH plant cost, 20 litre water jar plant, water plant project report for bank loan, CGWA borewell NOC, turnkey water plant project consultant India"
        />
        <link rel="canonical" href="https://desireconsultancy.in/services/packaged-drinking-water" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://desireconsultancy.in/services/packaged-drinking-water" />
        <meta property="og:title" content="Packaged Drinking Water Plant Setup Consultant India | Desire Consultancy" />
        <meta
          property="og:description"
          content="Turnkey packaged drinking water plant setup — BIS IS 14543, FSSAI Central License, CGWA NOC, machinery layout, and lab commissioning."
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
            <span className="text-white/60">Packaged Drinking Water</span>
          </nav>

          {/* Header */}
          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            TURNKEY MANUFACTURING SETUP &amp; COMPLIANCE
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            Packaged Drinking
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              Water Plants
            </span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            Planning to start a commercial packaged drinking water or mineral water bottling business? Desire Consultancy is India&apos;s leading turnkey project consultant. We guide new entrepreneurs and expanding factories from concept to first bottle: site inspection, civil cleanroom layouts, machinery sourcing, CGWA borewell NOC, in-house testing lab setup, BIS IS 14543 ISI marking, and Central FSSAI licensing.
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12 p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-center">
            <div>
              <div className="text-lg sm:text-xl font-bold text-[#16D9C5]">1,000 - 5,000</div>
              <div className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">LPH Plant Sizing</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-[#0E6EFF]">IS 14543</div>
              <div className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">BIS Standard</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-[#16D9C5]">DPR Ready</div>
              <div className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">Bank Loan Report</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-[#0E6EFF]">PAN-India</div>
              <div className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">Turnkey Support</div>
            </div>
          </div>

          {/* Key Deliverables Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { title: 'BIS IS 14543 ISI Mark Licensing', desc: 'Mandatory standard compliance, factory audit clearance, and product sample testing for packaged water.' },
              { title: 'FSSAI Central Food License', desc: 'Category 14 FoSCoS filing, hygiene audit readiness, and FSMS implementation for water bottling.' },
              { title: 'CGWA Borewell NOC Clearance', desc: 'Complete hydrogeological survey, rainwater harvesting setup, and statutory groundwater extraction authorization.' },
              { title: 'Detailed Project Report (DPR)', desc: 'Bankable business plans with machinery quotations, ROI models, and break-even calculations for MSME loans.' },
              { title: 'In-House Testing Laboratory Setup', desc: 'Microbiology and chemical lab layout, instrument sourcing (autoclave, laminar air bench), calibration, and chemist training.' },
              { title: 'Machinery & Production Line Advisory', desc: 'Unbiased equipment selection: RO plant, UV sterilizer, ozone contactors, bottle blowing, and 20L jar washing lines.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#16D9C5]/20 transition-all duration-300">
                <h2 className="font-semibold text-white text-sm mb-1">{item.title}</h2>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Capacity & Production Matrix Table */}
          <div className="mb-16">
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-4">
              Plant Capacity, Machinery &amp; Infrastructure Sizing
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mb-6 leading-relaxed">
              Compare standard plant capacities to determine the right production line for your market demand:
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/[0.01]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/5 text-[#16D9C5] uppercase text-[10px] tracking-wider border-b border-white/5">
                  <tr>
                    <th className="p-4">Plant Capacity</th>
                    <th className="p-4">Bottling Output</th>
                    <th className="p-4">20L Jar Output</th>
                    <th className="p-4">Civil Land Space</th>
                    <th className="p-4">Target Market</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  {CAPACITY_MATRIX.map((row) => (
                    <tr key={row.capacity} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-bold text-white whitespace-nowrap">{row.capacity}</td>
                      <td className="p-4 font-sans text-xs">{row.bottles}</td>
                      <td className="p-4 font-sans text-xs">{row.jars}</td>
                      <td className="p-4 text-[10px] text-white/50 whitespace-nowrap">{row.space}</td>
                      <td className="p-4 font-sans text-xs text-[#16D9C5]">{row.ideal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Statutory Road Map */}
          <div className="mb-16 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-6">
              Turnkey Execution Pipeline (From Land to First Bottle)
            </h2>
            <div className="space-y-4">
              {[
                { phase: 'PHASE 01', title: 'Site Inspection & Raw Water Testing', desc: 'Raw water chemical and microbiological profiling (TDS, heavy metals, pesticides) and CGWA NOC feasibility study.' },
                { phase: 'PHASE 02', title: 'DPR Preparation & Bank Loan Assistance', desc: 'Bankable DPR with financial projections, equipment quotes, and subsidies under PMEGP/MSME.' },
                { phase: 'PHASE 03', title: 'Hygienic Civil & Equipment Layout', desc: 'Cleanroom zoning blueprint ensuring positive pressure air handling, filling cubicles, and lab partitions.' },
                { phase: 'PHASE 04', title: 'Machinery Installation & Lab Commissioning', desc: 'RO plant train, ozonation, UV disinfection, bottle blowing machine, and complete in-house testing lab.' },
                { phase: 'PHASE 05', title: 'BIS Inspection & CML License Grant', desc: 'Pre-audit mock inspection, factory audit with BIS officers, sample sealing, and official ISI mark grant.' },
              ].map((p) => (
                <div key={p.phase} className="flex gap-4 items-start border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
                  <span className="font-mono text-xs text-[#16D9C5] font-bold whitespace-nowrap">{p.phase}</span>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{p.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Base Callout */}
          <div className="mb-16 p-6 rounded-2xl bg-gradient-to-r from-[#0E6EFF]/10 to-[#16D9C5]/10 border border-[#16D9C5]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#16D9C5] uppercase block mb-1">Knowledge Guide</span>
              <h3 className="font-display text-lg font-bold text-white">How to Set Up a Packaged Drinking Water Plant</h3>
              <p className="text-white/50 text-xs mt-1">Read our in-depth breakdown of setup costs, machinery, CGWA NOC, and BIS licensing.</p>
            </div>
            <Link
              to="/blog/packaged-drinking-water-plant-setup"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#16D9C5] hover:text-black font-mono text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap"
            >
              Read Full Guide →
            </Link>
          </div>

          {/* FAQ Accordion */}
          <div className="mb-16">
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-6">
              Frequently Asked Questions (Water Plant Setup)
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
              Get Plant Setup Quotation &amp; DPR
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
              <Link to="/bis-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">BIS Certification →</Link>
              <Link to="/fssai-certification" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">FSSAI Licensing →</Link>
              <Link to="/services/ro-solutions" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Industrial RO Solutions →</Link>
              <Link to="/trademark-registration" className="text-xs text-white/50 hover:text-[#16D9C5] font-mono transition-colors">Trademark Registration →</Link>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
export default PackagedWaterPage;
