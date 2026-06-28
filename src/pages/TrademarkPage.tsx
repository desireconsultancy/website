import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Trademark Registration Consultancy',
  description:
    'Protect your brand name, logo, and slogans with expert Trademark Registration consultancy. Brand search, filing, opposition handling, and renewals across India.',
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
  url: 'https://desireconsultancy.in/trademark-registration',
};

export function TrademarkPage() {
  return (
    <>
      <Helmet>
        <title>Trademark Registration Consultancy | Desire Consultancy — Nagpur</title>
        <meta
          name="description"
          content="Expert Trademark Registration consultancy in Nagpur. Safeguard your brand identity, logo, and trademark filings with complete compliance support across India."
        />
        <meta
          name="keywords"
          content="Trademark registration Nagpur, brand name protection India, logo trademark Maharashtra, trademark filing consultancy, intellectual property support"
        />
        <link rel="canonical" href="https://desireconsultancy.in/trademark-registration" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://desireconsultancy.in/trademark-registration" />
        <meta property="og:title" content="Trademark Registration Consultancy | Desire Consultancy" />
        <meta property="og:description" content="Safeguard your brand identity and secure trademark filings across India." />
        <meta property="og:image" content="https://desireconsultancy.in/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Breadcrumb */}
          <nav className="text-[10px] font-mono text-white/30 tracking-wider mb-12" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#16D9C5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Trademark Registration</span>
          </nav>

          <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 block">
            INTELLECTUAL PROPERTY
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            Trademark
            <br />
            <span className="bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] bg-clip-text text-transparent">
              Registration
            </span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-12">
            Your brand name, logo, and slogans are valuable business assets. Securing a registered trademark
            prevents unauthorized copying and establishes exclusive brand ownership. Desire Consultancy
            assists you throughout the research, filing, and compliance phases of trademark registration.
          </p>

          {/* Trademark flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { title: 'Brand Search & Feasibility', desc: 'Comprehensive search across classification databases to check trademark availability.' },
              { title: 'Trademark Filing & Application', desc: 'Preparing and submitting your trademark applications in the correct classes.' },
              { title: 'Hearing & Reply to Examination', desc: 'Drafting professional replies to government examination reports and handling hearings.' },
              { title: 'Trademark Renewal', desc: 'Securing continued brand protection with timely 10-year renewal filings.' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#16D9C5]/20 transition-all duration-300"
              >
                <h2 className="font-semibold text-white text-sm mb-1">{item.title}</h2>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="border-t border-white/5 pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              to="/#contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] text-black font-semibold text-xs tracking-widest uppercase hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(14,110,255,0.35)] transition-all duration-300"
            >
              Book Free Consultation
            </Link>
            <div className="text-white/40 text-xs font-mono space-y-1">
              <div>📞 <a href="tel:+918421504028" className="hover:text-[#16D9C5] transition-colors">+91 84215 04028</a></div>
              <div>📧 <a href="mailto:desireconsultancy37@gmail.com" className="hover:text-[#16D9C5] transition-colors">desireconsultancy37@gmail.com</a></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TrademarkPage;
