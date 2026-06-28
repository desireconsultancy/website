import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

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
};

export function BlogPage() {
  const { slug } = useParams<{ slug: string }>();

  // If a slug is specified, render the blog detail view
  if (slug) {
    const blog = MOCK_BLOGS[slug];

    if (!blog) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold uppercase tracking-wider mb-4">Blog Post Not Found</h1>
          <p className="text-white/50 mb-8">The article you are looking for does not exist or has been moved.</p>
          <Link to="/blog" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white hover:text-black font-mono text-xs uppercase transition-all duration-300">
            ← Back to Blogs
          </Link>
        </div>
      );
    }

    return (
      <>
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

        <div className="min-h-screen bg-black text-white">
          <div className="max-w-4xl mx-auto px-6 py-20">
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
      </>
    );
  }

  // Otherwise, render the Blog Listing page
  return (
    <>
      <Helmet>
        <title>Compliance &amp; Licensing Blog | Desire Consultancy</title>
        <meta
          name="description"
          content="Desire Consultancy Blog. Read the latest guides, compliance alerts, and industry news on FSSAI licensing and BIS certification."
        />
        <link rel="canonical" href="https://desireconsultancy.in/blog" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
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
    </>
  );
}
export default BlogPage;
export { MOCK_BLOGS }; // Export mock list to help sitemap generation
