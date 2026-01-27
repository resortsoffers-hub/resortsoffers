import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatWidget from "@/components/ChatWidget";
import Index from "./pages/Index";

import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Packages from "./pages/Packages";
import Offers from "./pages/Offers";
import BookConsultation from "./pages/BookConsultation";
import PartnerHotels from "./pages/PartnerHotels";
import SubmitReview from "./pages/SubmitReview";
import Reviews from "./pages/Reviews";
import Cruises from "./pages/Cruises";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import DhawaPackageSample from "./components/DhawaPackageSample";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Index />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/partner-hotels" element={<PartnerHotels />} />
            <Route path="/submit-review" element={<SubmitReview />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/cruises" element={<Cruises />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/package-sample" element={<DhawaPackageSample />} />
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