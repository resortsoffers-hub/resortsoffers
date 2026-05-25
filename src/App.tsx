import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatWidget from "@/components/ChatWidget";
import LocaleLayout from "@/components/LocaleLayout";
import Index from "./pages/Index";

import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Packages from "./pages/Packages";
import Offers from "./pages/Offers";
import OfferDetail from "./pages/OfferDetail";
import AdminOffers from "./pages/AdminOffers";
import AdminLogin from "./pages/AdminLogin";
import BookConsultation from "./pages/BookConsultation";
import PartnerHotels from "./pages/PartnerHotels";
import SubmitReview from "./pages/SubmitReview";
import Reviews from "./pages/Reviews";
import Cruises from "./pages/Cruises";
import AboutUs from "./pages/AboutUs";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import DhawaPackageSample from "./components/DhawaPackageSample";

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

const LocalizedRoutes = () => (
  <Route element={<LocaleLayout />}>
    <Route index element={<Index />} />
    <Route path="contact" element={<Contact />} />
    <Route path="faq" element={<FAQ />} />
    <Route path="terms" element={<Terms />} />
    <Route path="packages" element={<Packages />} />
    <Route path="offers" element={<Offers />} />
    <Route path="offers/:id" element={<OfferDetail />} />
    <Route path="book-consultation" element={<BookConsultation />} />
    <Route path="partner-hotels" element={<PartnerHotels />} />
    <Route path="submit-review" element={<SubmitReview />} />
    <Route path="reviews" element={<Reviews />} />
    <Route path="cruises" element={<Cruises />} />
    <Route path="about-us" element={<AboutUs />} />
    <Route path="events" element={<Events />} />
    <Route path="package-sample" element={<DhawaPackageSample />} />
  </Route>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Admin stays unlocalized */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/offers" element={<AdminOffers />} />

            {/* Localized trees */}
            <Route path="/en">{LocalizedRoutes().props.children}</Route>
            <Route path="/ar">{LocalizedRoutes().props.children}</Route>

            {/* Bare root + legacy URLs → redirect to detected locale */}
            <Route path="/" element={<RedirectToLocale />} />
            <Route path="/contact" element={<RedirectToLocale />} />
            <Route path="/faq" element={<RedirectToLocale />} />
            <Route path="/terms" element={<RedirectToLocale />} />
            <Route path="/packages" element={<RedirectToLocale />} />
            <Route path="/offers" element={<RedirectToLocale />} />
            <Route path="/offers/:id" element={<RedirectToLocale />} />
            <Route path="/book-consultation" element={<RedirectToLocale />} />
            <Route path="/partner-hotels" element={<RedirectToLocale />} />
            <Route path="/submit-review" element={<RedirectToLocale />} />
            <Route path="/reviews" element={<RedirectToLocale />} />
            <Route path="/cruises" element={<RedirectToLocale />} />
            <Route path="/about-us" element={<RedirectToLocale />} />
            <Route path="/events" element={<RedirectToLocale />} />
            <Route path="/package-sample" element={<RedirectToLocale />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
          <ChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
