import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import { PageSkeleton } from '@/components/ui/Skeleton';

// ─── Lazy Loaded Pages ────────────────────────────────────────────────────────

const HomePage = lazy(() => import('@/pages/HomePage'));
const ShopPage = lazy(() => import('@/pages/ShopPage'));
const CuratorsPage = lazy(() => import('@/pages/CuratorsPage'));
const CuratorDossierPage = lazy(() => import('@/pages/CuratorDossierPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const KitchenSinkPage = lazy(() => import('@/pages/KitchenSinkPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// ─── Scroll to Top ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ─── App Router ───────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RootLayoutWrapper><PageSkeleton /></RootLayoutWrapper>}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />}>
              <Route path=":gender" element={<ShopPage />}>
                <Route path=":category" element={<ShopPage />} />
              </Route>
            </Route>
            <Route path="/curators" element={<CuratorsPage />} />
            <Route path="/curators/:slug" element={<CuratorDossierPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/kitchen-sink" element={<KitchenSinkPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Helper to wrap the suspense fallback inside the layout
function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-ink halftone">
      <main className="flex-1">{children}</main>
    </div>
  );
}
