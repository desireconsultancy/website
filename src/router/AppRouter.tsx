import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { trackPageView } from '../lib/analytics/ga4';
import { useLocation } from 'react-router-dom';
import App from '../App';

const LeadsDashboard = lazy(() =>
  import('../pages/admin/LeadsDashboard').then((m) => ({ default: m.LeadsDashboard })),
);
const FSSAIPage = lazy(() =>
  import('../pages/services/FSSAIPage').then((m) => ({ default: m.FSSAIPage })),
);
const BISPage = lazy(() =>
  import('../pages/services/BISPage').then((m) => ({ default: m.BISPage })),
);
const PackagedWaterPage = lazy(() =>
  import('../pages/services/PackagedWaterPage').then((m) => ({ default: m.PackagedWaterPage })),
);
const ROSolutionsPage = lazy(() =>
  import('../pages/services/ROSolutionsPage').then((m) => ({ default: m.ROSolutionsPage })),
);

/** Track SPA page views on each route change */
function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);
  return null;
}

const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#16D9C5] border-t-transparent animate-spin" />
  </div>
);

export function AppRouter() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PageTracker />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/admin/leads" element={<LeadsDashboard />} />
            <Route path="/services/fssai" element={<FSSAIPage />} />
            <Route path="/services/bis-certification" element={<BISPage />} />
            <Route path="/services/packaged-drinking-water" element={<PackagedWaterPage />} />
            <Route path="/services/ro-solutions" element={<ROSolutionsPage />} />
            {/* 404 fallback */}
            <Route path="*" element={<App />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
