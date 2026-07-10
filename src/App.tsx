import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatWidget from "@/components/ChatWidget";
import LocaleLayout from "@/components/LocaleLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";

import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Packages from "./pages/Packages";
import AdminOffers from "./pages/AdminOffers";
import AdminHotels from "./pages/AdminHotels";
import AdminDraftReview from "./pages/AdminDraftReview";
import AdminLogin from "./pages/AdminLogin";
import HotelDetail from "./pages/HotelDetail";
import Destinations from "./pages/Destinations";
import DestinationHub from "./pages/DestinationHub";
import BookConsultation from "./pages/BookConsultation";
import PartnerHotels from "./pages/PartnerHotels";
import SubmitReview from "./pages/SubmitReview";
import Reviews from "./pages/Reviews";
import Cruises from "./pages/Cruises";
import AboutUs from "./pages/AboutUs";
import Events from "./pages/Events";
import EngagementPolicy from "./pages/EngagementPolicy";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

/**
 * Redirects any non-localized request (e.g. /contact) to its English equivalent (/en/contact).
 * Preserves search + hash so deep links stay intact.
 */
const RedirectToLocale = () => {
  const location = useLocation();
  const detected = typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
  const path = location.pathname === "/" ? "" : location.pathname;
  return <Navigate to={`/${detected}${path}${location.search}${location.hash}`} replace />;
};

const localizedChildren = (
  <>
    <Route index element={<Index />} />
    <Route path="faq" element={<FAQ />} />
    <Route path="terms" element={<Terms />} />
    <Route path="packages" element={<Packages />} />
    <Route path="book-consultation" element={<BookConsultation />} />
    <Route path="partner-hotels" element={<PartnerHotels />} />
    <Route path="hotels/:slug" element={<HotelDetail />} />
    <Route path="review/:slug/:previewId" element={<HotelDetail />} />
    <Route path="destinations" element={<Destinations />} />
    <Route path="destinations/:slug" element={<DestinationHub />} />
    <Route path="submit-review" element={<SubmitReview />} />
    <Route path="reviews" element={<Reviews />} />
    <Route path="cruises" element={<Cruises />} />
    <Route path="about-us" element={<AboutUs />} />
    <Route path="events" element={<Events />} />
    <Route path="engagement-policy" element={<EngagementPolicy />} />
    {/* /hotels, /offers, /contact intentionally removed until launch */}
  </>
);


const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ErrorBoundary>
            <Routes>
              {/* Admin stays unlocalized */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/offers" element={<AdminOffers />} />
              <Route path="/admin/hotels" element={<AdminHotels />} />
              <Route path="/admin/draft-review" element={<AdminDraftReview />} />

              {/* Localized trees — both prefixes share the same nested routes */}
              <Route path="/en" element={<LocaleLayout />}>{localizedChildren}</Route>
              <Route path="/ar" element={<LocaleLayout />}>{localizedChildren}</Route>

              {/* Bare root + legacy URLs → redirect to detected locale */}
              <Route path="/" element={<RedirectToLocale />} />
              <Route path="/faq" element={<RedirectToLocale />} />
              <Route path="/terms" element={<RedirectToLocale />} />
              <Route path="/packages" element={<RedirectToLocale />} />
              <Route path="/book-consultation" element={<RedirectToLocale />} />
              <Route path="/partner-hotels" element={<RedirectToLocale />} />
              <Route path="/hotels/:slug" element={<RedirectToLocale />} />
              <Route path="/review/:slug/:previewId" element={<RedirectToLocale />} />
              <Route path="/destinations" element={<RedirectToLocale />} />
              <Route path="/destinations/:slug" element={<RedirectToLocale />} />
              <Route path="/submit-review" element={<RedirectToLocale />} />
              <Route path="/reviews" element={<RedirectToLocale />} />
              <Route path="/cruises" element={<RedirectToLocale />} />
              <Route path="/about-us" element={<RedirectToLocale />} />
              <Route path="/events" element={<RedirectToLocale />} />
              <Route path="/engagement-policy" element={<RedirectToLocale />} />

              {/* Removed pages → send to home */}
              <Route path="/contact" element={<Navigate to="/" replace />} />
              <Route path="/offers" element={<Navigate to="/" replace />} />
              <Route path="/offers/:id" element={<Navigate to="/" replace />} />
              <Route path="/hotels" element={<Navigate to="/" replace />} />
              <Route path="/en/contact" element={<Navigate to="/en" replace />} />
              <Route path="/ar/contact" element={<Navigate to="/ar" replace />} />
              <Route path="/en/offers" element={<Navigate to="/en" replace />} />
              <Route path="/ar/offers" element={<Navigate to="/ar" replace />} />
              <Route path="/en/offers/:id" element={<Navigate to="/en" replace />} />
              <Route path="/ar/offers/:id" element={<Navigate to="/ar" replace />} />
              <Route path="/en/hotels" element={<Navigate to="/en" replace />} />
              <Route path="/ar/hotels" element={<Navigate to="/ar" replace />} />

              {/* /package-sample legacy redirect removed */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
          <WhatsAppButton />
          <ChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
