import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatWidget from "@/components/ChatWidget";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Consultancy from "./pages/Consultancy";
import Resorts from "./pages/Resorts";
import Offers from "./pages/Offers";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import BookConsultation from "./pages/BookConsultation";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Documents from "./pages/Documents";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/resorts" element={<Resorts />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/events" element={<Events />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
