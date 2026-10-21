import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SubpageLayout } from '../layouts/SubpageLayout';

export function NotFoundPage() {
  return (
    <SubpageLayout>
      <Helmet>
        <title>404 — Page Not Found | Desire Consultancy</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 py-28 text-center flex flex-col items-center justify-center">
        <span className="text-xs tracking-[0.3em] text-[#16D9C5] font-mono uppercase mb-4">
          ERROR 404
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white mb-6">
          Page Not Found
        </h1>
        <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md mb-10 font-sans">
          The page or regulatory document you are looking for does not exist or has been relocated.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3.5 rounded-full bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] text-black font-semibold text-xs tracking-widest uppercase hover:scale-[1.02] transition-all"
          >
            Back to Homepage
          </Link>
          <Link
            to="/fssai-certification"
            className="px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 text-white font-mono text-xs uppercase transition-all"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </SubpageLayout>
  );
}
