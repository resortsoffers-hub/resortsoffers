import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { safeHotelImage } from "@/lib/safeImage";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { findDestination } from "@/lib/destinations";
import { BRAND } from "@/lib/brand";

interface Hotel {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string | null;
  short_desc_en: string | null;
  short_desc_ar: string | null;
  hero_image_url: string | null;
}

/**
 * Collection page — editorial showcase of handpicked resorts.
 *
 * Strictly card-only: hero image, resort name, one editorial sentence,
 * "Explore Resort". No prices, no descriptions, no booking buttons,
 * no WhatsApp, no filters, no search. When the collection is empty,
 * a single editorial line is shown — never a "speak to advisor" CTA.
 */
const DestinationHub = () => {
  const { slug } = useParams<{ slug: string }>();
  const dest = findDestination(slug);
  const ar = useLocale() === "ar";
  const lp = useLocalePath();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dest) return;
    (async () => {
      setLoading(true);
      let q = supabase
        .from("hotels")
        .select("id,slug,name_en,name_ar,short_desc_en,short_desc_ar,hero_image_url")
        .eq("is_published", true)
        .order("display_order", { ascending: false });

      if (dest.kind === "place") {
        q = q.ilike("destination", dest.name_en);
      } else if (dest.tag) {
        q = q.contains("tags", [dest.tag]);
      }

      const { data } = await q;
      setHotels((data as Hotel[]) || []);
      setLoading(false);
    })();
  }, [dest?.slug]);

  if (!dest) return <Navigate to={lp("/destinations")} replace />;

  const destName = ar ? dest.name_ar : dest.name_en;
  const destBlurb = ar ? dest.blurb_ar : dest.blurb_en;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{`${destName} · ${BRAND.name}`}</title>
        <meta name="description" content={destBlurb} />
      </Helmet>
      <Navbar />
      <main className="flex-1">
        {/* Editorial header */}
        <section className="container mx-auto px-6 pt-24 md:pt-32 pb-12 md:pb-16 max-w-3xl text-center">
          <Link
            to={lp("/destinations")}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-3 w-3" />
            {ar ? "كل المجموعات" : "All collections"}
          </Link>
          <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-accent-strong mb-5">
            {dest.kind === "place"
              ? (ar ? "وجهة" : "Destination")
              : (ar ? "مجموعة" : "Collection")}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-primary leading-[1.05] mb-6">
            {destName}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {destBlurb}
          </p>
        </section>

        {/* Resorts */}
        <section className="container mx-auto px-6 pb-24 md:pb-32">
          {loading ? (
            <p className="text-center text-muted-foreground py-20 text-sm uppercase tracking-[0.25em]">
              {ar ? "جارٍ التحميل…" : "Loading…"}
            </p>
          ) : hotels.length === 0 ? (
            <div className="max-w-xl mx-auto text-center py-20">
              <p className="font-serif text-2xl md:text-3xl text-primary leading-snug mb-4">
                {ar
                  ? "هذه المجموعة قيد التنسيق."
                  : "This collection is currently being curated."}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                {ar
                  ? "متاحة بطلب خاص فقط. تواصل مع Resorts Offers للحصول على عرض مُصمَّم خصيصاً."
                  : "Available by private request. Contact Resorts Offers for a tailored proposal."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
              {hotels.map((h) => {
                const name = ar && h.name_ar ? h.name_ar : h.name_en;
                const blurb = ar && h.short_desc_ar ? h.short_desc_ar : h.short_desc_en;
                return (
                  <Link
                    key={h.id}
                    to={lp(`/hotels/${h.slug}`)}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-5">
                      <img
                        src={safeHotelImage(h.hero_image_url)}
                        alt={name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-primary leading-tight mb-2">
                      {name}
                    </h3>
                    {blurb && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                        {blurb}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 text-accent-strong uppercase tracking-[0.25em] text-[11px] font-medium">
                      {ar ? "اكتشف المنتجع" : "Explore Resort"}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DestinationHub;
