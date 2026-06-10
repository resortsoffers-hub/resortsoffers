import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, BedDouble, Calendar, MessageCircle, FileText, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WHATSAPP_NUMBER = "971547474404";

interface OfferRow {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
  features: any;
  category: string | null;
  destination: string | null;
  hotel_name: string | null;
  nights: number | null;
  valid_until: string | null;
  file_url: string | null;
  file_type: string | null;
}

const OfferDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [offer, setOffer] = useState<OfferRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const { data } = await supabase
        .from("offers")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .maybeSingle();
      setOffer(data as OfferRow | null);
      setLoading(false);
    };
    load();
  }, [id]);

  const whatsappLink = () => {
    const msg = `Hi! I'm interested in the offer: ${offer?.title}${offer?.price ? ` (${offer.currency || "USD"} ${offer.price})` : ""}. Please share availability.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-serif mb-4">Offer not found</h1>
          <Link to="/offers" className="text-primary underline">Back to all offers</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const features: string[] = Array.isArray(offer.features) ? offer.features : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{offer.title} | Resorts Offers</title>
        <meta name="description" content={offer.description?.slice(0, 155) || offer.title} />
      </Helmet>
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/offers"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> All offers
          </Link>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
              {offer.image_url ? (
                <img
                  src={offer.image_url}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            <div className="space-y-5">
              {offer.category && (
                <Badge variant="secondary" className="uppercase tracking-wide">
                  {offer.category}
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-serif text-primary">{offer.title}</h1>
              {(offer.destination || offer.hotel_name) && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {[offer.hotel_name, offer.destination].filter(Boolean).join(" · ")}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm">
                {offer.nights != null && (
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4 text-primary" />
                    {offer.nights} nights
                  </span>
                )}
                {offer.valid_until && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    Valid until {new Date(offer.valid_until).toLocaleDateString()}
                  </span>
                )}
              </div>

              {offer.price != null && (
                <div className="py-3 border-y">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">From</div>
                  <div className="text-3xl font-bold text-primary">
                    {offer.currency || "USD"} {Number(offer.price).toLocaleString()}
                  </div>
                </div>
              )}

              {offer.description && (
                <p className="text-base leading-relaxed text-foreground/80 whitespace-pre-line">
                  {offer.description}
                </p>
              )}

              {features.length > 0 && (
                <div>
                  <h2 className="font-semibold mb-2">Included</h2>
                  <ul className="space-y-1.5">
                    {features.map((f, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="text-primary">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#1ebd5a] text-white shadow-md"
                >
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Enquire on WhatsApp
                  </a>
                </Button>
                {offer.file_url && (
                  <Button asChild variant="outline" size="lg">
                    <a href={offer.file_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-5 w-5 mr-2" />
                      View Original {offer.file_type === "application/pdf" ? "PDF" : "File"}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfferDetail;
