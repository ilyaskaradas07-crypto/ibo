import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { TourProvider } from './context/TourContext';
import { BookingProvider } from './context/BookingContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingContactButtons } from './components/FloatingContactButtons';

// Pages
import { HomePage } from './pages/HomePage';
import { AllToursPage } from './pages/AllToursPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { TransfersPage } from './pages/TransfersPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching helper
  const renderCurrentPage = () => {
    // 1. Tour Detail: /tour/:id
    if (currentPath.startsWith('/tour/')) {
      const tourId = currentPath.replace('/tour/', '');
      return <TourDetailPage tourId={tourId} navigate={navigate} />;
    }

    // 2. Category: /category/:cat
    if (currentPath.startsWith('/category/')) {
      const cat = currentPath.replace('/category/', '');
      return <AllToursPage navigate={navigate} initialCategory={cat} />;
    }

    // 3. Exact routes
    switch (currentPath) {
      case '/tours':
        return <AllToursPage navigate={navigate} />;
      case '/transfers':
        return <TransfersPage navigate={navigate} />;
      case '/popular':
        return <AllToursPage navigate={navigate} initialCategory="all" />;
      case '/about':
        return <AboutUsPage navigate={navigate} />;
      case '/reviews':
        return <ReviewsPage />;
      case '/faq':
        return <FaqPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy':
        return <LegalPage type="privacy" />;
      case '/terms':
        return <LegalPage type="terms" />;
      case '/admin':
        return <AdminDashboard />;
      case '/':
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <LanguageProvider>
      <TourProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
            
            {/* Sticky Header with Navigation, Language Selector, and WhatsApp button */}
            <Header currentPath={currentPath} navigate={navigate} />

            {/* Page Content */}
            <main className="flex-1">
              {renderCurrentPage()}
            </main>

            {/* Footer with verified Alanya details and pickup policy */}
            <Footer navigate={navigate} />

            {/* Global Booking Modal */}
            <BookingModal />

            {/* Floating Contact Buttons: WhatsApp + Telegram (if configured) + AI Assistant */}
            <FloatingContactButtons />

          </div>
        </BookingProvider>
      </TourProvider>
    </LanguageProvider>
  );
}
