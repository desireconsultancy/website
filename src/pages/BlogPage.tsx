import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { SubpageLayout } from '../layouts/SubpageLayout';

// Simple structure of our blog posts for SEO indexing
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  content: React.ReactNode;
}

const MOCK_BLOGS: Record<string, BlogPost> = {
  'fssai-central-license-guide': {
    slug: 'fssai-central-license-guide',
    title: 'How to Obtain a Central FSSAI License: A Step-by-Step Guide',
    description: 'Learn the exact steps, documentation requirements, eligibility criteria, and fee structure for obtaining a Central FSSAI License in India.',
    date: 'June 20, 2026',
    category: 'FSSAI Licensing',
    readTime: '6 min read',
    content: (
      <>
        <p>
          For food business operators (FBOs) in India whose annual turnover exceeds ₹20 Crores or who operate in multiple states, obtaining a Central FSSAI License is a strict legal requirement. This license is issued by the Food Safety and Standards Authority of India (FSSAI) and ensures that food businesses adhere to national safety guidelines.
        </p>
        <h3>Who is Eligible for a Central FSSAI License?</h3>
        <p>
          You must apply for a Central FSSAI License if your business falls into any of the following categories:
        </p>
        <ul>
          <li>FBOs with an annual turnover exceeding ₹20 Crores.</li>
          <li>Importers or Exporters of food products.</li>
          <li>Head Offices of food businesses operating in two or more states.</li>
          <li>E-commerce operators in the food sector.</li>
          <li>Large-scale manufacturers, re-packers, and re-labelers.</li>
        </ul>
        <h3>Essential Documents Required</h3>
        <p>
          Preparing your documentation accurately is key to ensuring quick approval. You will need:
        </p>
        <ol>
          <li>Blueprint or layout plan of the manufacturing unit.</li>
          <li>List of directors, partners, or proprietors with contact details and photo IDs.</li>
          <li>Name and list of equipment/machinery used in the premises.</li>
          <li>Analysis report of water to be used in food processing (from a recognized/NABL accredited lab).</li>
          <li>Proof of possession of premises (rent agreement, electricity bill, etc.).</li>
          <li>Partnership deed, memorandum of association (MoA), or articles of association (AoA).</li>
        </ol>
        <p>
          Navigating this process can be daunting, but with the support of professional compliance consultants like Desire Consultancy, you can secure your Central FSSAI License with minimal effort and zero delays.
        </p>
      </>
    ),
  },
  'bis-isi-mark-certification': {
    slug: 'bis-isi-mark-certification',
    title: 'A Complete Guide to BIS ISI Mark Certification in India',
    description: 'Understand the significance, process, application stages, factory audit parameters, and timelines for obtaining a BIS certification/ISI Mark.',
    date: 'June 15, 2026',
    category: 'BIS Certification',
    readTime: '8 min read',
    content: (
      <>
        <p>
          The Bureau of Indian Standards (BIS) operates a product certification scheme to ensure the quality, safety, and reliability of products sold in India. For items like packaged drinking water, cylinders, cement, and electronic devices, getting the ISI Mark is mandatory before public commercial distribution.
        </p>
        <h3>Benefits of BIS ISI Certification</h3>
        <p>
          Securing the ISI mark offers key market benefits for manufacturers:
        </p>
        <ul>
          <li><strong>Quality Assurance:</strong> Proves that the product meets specific Indian standards (IS).</li>
          <li><strong>Market Access:</strong> Needed by law to manufacture and sell regulated items.</li>
          <li><strong>Customer Trust:</strong> Provides a visual sign of safety and quality that customers look for.</li>
          <li><strong>Government Tenders:</strong> Preferred or required in municipal and central government supply tenders.</li>
        </ul>
        <h3>The BIS Certification Process</h3>
        <p>
          The certification procedure involves several critical stages:
        </p>
        <ol>
          <li><strong>Application Filing:</strong> Submitting Form V along with factory layout, details of test equipment, and raw material details.</li>
          <li><strong>Factory Audit:</strong> A BIS officer visits the manufacturing plant to inspect the assembly lines and verify quality-control testing equipment.</li>
          <li><strong>Sample Testing:</strong> Samples are drawn during the audit and sent to independent BIS-approved labs for testing.</li>
          <li><strong>Grant of License:</strong> Once tests confirm adherence to IS requirements, the BIS license is granted.</li>
        </ol>
        <p>
          Desire Consultancy acts as your compliance partner throughout the BIS audit pipeline, helping you set up internal labs, prepare audit documentation, and complete licensing smoothly.
        </p>
      </>
    ),
  },
  'packaged-drinking-water-plant-setup': {
    slug: 'packaged-drinking-water-plant-setup',
    title: 'How to Set Up a Packaged Drinking Water Plant in India: Compliance, Licenses & Cost',
    description: 'Complete guide to starting a commercial packaged drinking water bottling plant under IS 14543: CGWA NOC, civil hygiene layout, NABL lab setup, and BIS licensing.',
    date: 'June 25, 2026',
    category: 'Water Plant Setup',
    readTime: '9 min read',
    content: (
      <>
        <p>
          The packaged drinking water industry in India is expanding rapidly due to rising health consciousness and urbanization. However, establishing a commercial water packaging factory requires navigating one of India&apos;s most stringent regulatory environments, headed by the Bureau of Indian Standards (BIS) and the Food Safety and Standards Authority of India (FSSAI).
        </p>
        <h3>1. Mandatory Approvals & Licenses Required</h3>
        <p>
          Before commencing commercial bottling and distribution, every entrepreneur must secure:
        </p>
        <ul>
          <li><strong>BIS IS 14543 Certification:</strong> Mandatory ISI mark for packaged drinking water (other than natural mineral water).</li>
          <li><strong>Central FSSAI License:</strong> Under Category 14 (Beverages - Packaged Water).</li>
          <li><strong>CGWA Borewell NOC:</strong> Mandatory groundwater extraction clearance from Central Ground Water Authority.</li>
          <li><strong>State Pollution Control Board NOC:</strong> Consent to Establish (CTE) and Consent to Operate (CTO).</li>
          <li><strong>Local Municipal Trade License:</strong> Industrial trade authorization from municipal corporations.</li>
        </ul>
        <h3>2. Civil Architecture & Hygiene Zoning</h3>
        <p>
          BIS mandates strict physical separation between plant zones to prevent microbial contamination. The plant layout must incorporate:
        </p>
        <ol>
          <li>Raw material receiving and bottle blow-molding section.</li>
          <li>Multi-barrier water purification zone (sand filters, activated carbon, RO membranes, micron cartridges).</li>
          <li>Hygienic filling cubicle with positive pressure HEPA filtered air, UV sterilization, and epoxy-coated non-porous flooring.</li>
          <li>Finished goods storage and dispatch bay.</li>
        </ol>
        <h3>3. In-House Microbiology & Chemical Laboratory</h3>
        <p>
          Unlike ordinary food units, packaged water plants cannot outsource daily testing. An operational on-site laboratory with an autoclave, laminar airflow bench, incubator, and a full-time qualified microbiologist and chemist is mandatory prior to the official BIS inspection.
        </p>
        <h3>4. Setup Cost & Investment Breakdown (1000 LPH vs 2000 LPH vs 20L Jar)</h3>
        <p>
          Starting a commercial water packaging factory requires careful capital allocation across five core heads:
        </p>
        <ul>
          <li><strong>Small-Scale 20L Jar Plant (1000 LPH):</strong> ₹25 Lakhs – ₹35 Lakhs (Ideal for regional office/residential distribution).</li>
          <li><strong>Medium-Scale Automatic Bottling Line (2000 LPH):</strong> ₹45 Lakhs – ₹60 Lakhs (Produces 2,500+ bottles/hr of 250ml, 500ml, and 1-Litre bottles).</li>
          <li><strong>High-Speed Commercial Line (5000 LPH):</strong> ₹65 Lakhs – ₹85 Lakhs+ (Fully integrated blow moulding, rotary RFC monoblock, shrink tunnel packaging).</li>
          <li><strong>In-House Testing Laboratory Setup:</strong> ₹3.5 Lakhs – ₹6 Lakhs (Instruments, glassware, and microbial media under IS 14543).</li>
          <li><strong>Statutory Licences & BIS Audits:</strong> ₹2.5 Lakhs – ₹4.5 Lakhs (Application fees, marking fees, CGWA clearance, security deposits).</li>
        </ul>
        <h3>5. Preparing a Bankable Detailed Project Report (DPR) for Bank Finance</h3>
        <p>
          Banks and financial institutions (SBI, Bank of Baroda, PMEGP, CGTMSE, SIDBI) require an exhaustively audited Detailed Project Report before approving machinery loans or term finance. A bankable DPR must contain:
        </p>
        <ol>
          <li>Market demand-supply analysis in the target 50 km logistics radius.</li>
          <li>Process flowchart and technical machinery quotations from certified manufacturers.</li>
          <li>Water recovery ratios (ensuring minimum 50% permeate recovery under modern RO design).</li>
          <li>Projected Profit & Loss statement, Break-Even Point (BEP), and Debt Service Coverage Ratio (DSCR).</li>
        </ol>
        <p>
          Desire Consultancy acts as your complete turnkey partner: preparing bankable DPRs, designing cleanroom civil layouts, supervising machinery installation, and obtaining full BIS and FSSAI certifications.
        </p>
      </>
    ),
  },
  'trademark-registration-guide-india': {
    slug: 'trademark-registration-guide-india',
    title: 'Trademark Registration in India: The Complete Step-by-Step Guide',
    description: 'Protect your brand name, logo, and slogan. Learn about NICE classification, Form TM-A online filing, 50% MSME rebates, objection replies, and the journey from ™ to ®.',
    date: 'June 28, 2026',
    category: 'Trademark Registration',
    readTime: '7 min read',
    content: (
      <>
        <p>
          Your brand name, company logo, and distinctive packaging represent the core identity and goodwill of your enterprise. In an increasingly competitive digital marketplace, failing to register your trademark leaves your business vulnerable to brand theft, counterfeiting, and costly legal disputes.
        </p>
        <h3>1. Selecting Classes under the NICE Classification</h3>
        <p>
          Trademarks are registered under 45 distinct classes (Classes 1–34 for goods and Classes 35–45 for services). Choosing the appropriate class ensures comprehensive legal protection:
        </p>
        <ul>
          <li><strong>Class 32:</strong> Packaged drinking water, mineral waters, beers, and non-alcoholic drinks.</li>
          <li><strong>Class 29 & 30:</strong> Packaged food products, spices, bakery goods, and edible oils.</li>
          <li><strong>Class 35:</strong> Retail services, advertising, business management, and e-commerce trading.</li>
          <li><strong>Class 42:</strong> Scientific, technological, and quality testing consultancy services.</li>
        </ul>
        <h3>2. The Registration Timeline: From ™ to ®</h3>
        <p>
          Once Form TM-A is submitted with the Controller General of Patents, Designs and Trade Marks (CGPDTM), you can immediately begin displaying the ™ symbol. The legal journey progresses through:
        </p>
        <ol>
          <li><strong>Formalities Check Pass:</strong> Initial registry verification of applicant details and power of attorney.</li>
          <li><strong>Examination Report:</strong> The examiner reviews distinctiveness (Section 9) and similarity (Section 11). If objections arise, a comprehensive reply must be submitted within 30 days.</li>
          <li><strong>Journal Publication:</strong> The mark is published in the official Trademark Journal for 4 months to allow third-party review.</li>
          <li><strong>Registration Certificate:</strong> If unopposed, the registration certificate is issued, granting legal permission to use the prestigious ® symbol for 10 years.</li>
        </ol>
        <p>
          <strong>Tip for Startups & MSMEs:</strong> Recognized startups (DPIIT) and Udyam-registered enterprises are eligible for a 50% statutory government fee discount (₹4,500 instead of ₹9,000 per class).
        </p>
        <p>
          Desire Consultancy manages your trademark journey end-to-end: comprehensive phonetic search, TM-A filing, formal objection drafting, and hearing representation.
        </p>
      </>
    ),
  },
};

export function BlogPage() {
  const { slug } = useParams<{ slug: string }>();

  // If a slug is specified, render the blog detail view
  if (slug) {
    const blog = MOCK_BLOGS[slug];

    if (!blog) {
      return (
        <SubpageLayout>
          <div className="text-white flex flex-col items-center justify-center py-20 px-6">
            <h1 className="text-2xl font-bold uppercase tracking-wider mb-4">Blog Post Not Found</h1>
            <p className="text-white/50 mb-8">The article you are looking for does not exist or has been moved.</p>
            <Link to="/blog" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white hover:text-black font-mono text-xs uppercase transition-all duration-300">
              ← Back to Blogs
            </Link>
          </div>
        </SubpageLayout>
      );
    }

    return (
      <SubpageLayout>
        <Helmet>
          <title>{`${blog.title} | Desire Consultancy Blog`}</title>
          <meta name="description" content={blog.description} />
          <link rel="canonical" href={`https://desireconsultancy.in/blog/${blog.slug}`} />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={blog.title} />
          <meta property="og:description" content={blog.description} />
          <meta property="og:url" content={`https://desireconsultancy.in/blog/${blog.slug}`} />
        </Helmet>

        <div className="text-white">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Breadcrumb */}
            <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:text-[#16D9C5] transition-colors">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white/60 truncate max-w-[200px] inline-block align-bottom">{blog.title}</span>
            </nav>

            <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
              {blog.category} — {blog.date}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-[1.15] mb-6">
              {blog.title}
            </h1>
            <p className="text-white/40 text-xs font-mono mb-10">{blog.readTime}</p>

            <div className="prose prose-invert max-w-none text-white/70 text-sm leading-relaxed space-y-6 font-sans">
              {blog.content}
            </div>

            {/* Back to Blog List */}
            <div className="mt-16 pt-12 border-t border-white/5 flex gap-4">
              <Link
                to="/blog"
                className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300"
              >
                ← Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      </SubpageLayout>
    );
  }

  // Otherwise, render the Blog Listing page
  return (
    <SubpageLayout>
      <Helmet>
        <title>Compliance &amp; Licensing Blog | Desire Consultancy</title>
        <meta
          name="description"
          content="Desire Consultancy Blog. Read the latest guides, compliance alerts, and industry news on FSSAI licensing and BIS certification."
        />
        <link rel="canonical" href="https://desireconsultancy.in/blog" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Blog</span>
          </nav>

          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            RESOURCES &amp; INSIGHTS
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-12">
            Compliance
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              insights
            </span>
          </h1>

          {/* List of post previews */}
          <div className="space-y-6">
            {Object.values(MOCK_BLOGS).map((post) => (
              <div
                key={post.slug}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-[#16D9C5]/20 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] tracking-widest text-[#16D9C5] font-mono uppercase">{post.category}</span>
                  <span className="text-[9px] text-white/40 font-mono">{post.date}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white uppercase font-display mb-2 hover:text-[#16D9C5] transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-6">{post.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-[10px] font-mono">{post.readTime}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-[10px] tracking-widest font-mono uppercase text-[#16D9C5] hover:text-[#0E6EFF] transition-colors"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Home CTA */}
          <div className="mt-16 pt-12 border-t border-white/5">
            <Link
              to="/"
              className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
export default BlogPage;
export { MOCK_BLOGS }; // Export mock list to help sitemap generation
