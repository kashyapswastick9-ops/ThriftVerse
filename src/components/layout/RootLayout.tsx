import { Outlet, Link } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import ToastContainer from '@/components/ui/ToastContainer';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ink halftone">
      {/* Skip to main content — visually hidden until focused */}
      <Link to="#main" className="skip-link">
        Skip to content
      </Link>

      <AnnouncementBar />
      <Header />

      <main id="main" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}
