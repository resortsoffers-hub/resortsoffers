import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { DESTINATIONS, COLLECTIONS, type Destination } from "@/lib/destinations";
import { supabase } from "@/integrations/supabase/client";
import { safeHotelImage, PLACEHOLDER } from "@/lib/safeImage";
import { BRAND } from "@/lib/brand";

/**
 * Curated Destinations — editorial index.
 *
 * Two groups: places + themed collections. Each tile shows one
 * editorial sentence and "Explore". No prices, no counts, no
 * booking, no WhatsApp. The hero comes from the first published
 * resort in that collection (CMS only); otherwise a typographic
 * card renders — never stock or AI imagery.
 */
const Destinations = () => {
  const ar = useLocale() === "ar";
  const lp = useLocalePath();

  const [heroByDest, setHeroByDest] = useState<Record<string, string>>({});
  const [heroByTag, setHeroByTag] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("hotels")
        .select("destination,hero_image_url,tags")
        .eq("is_published", true)
        .order("display_order", { ascending: false });
      const places: Record<string, string> = {};
      const tags: Record<string, string> = {};
      for (const h of data || []) {
        const img = h.hero_image_url || "";
        const key = (h.destination || "").toLowerCase();
        if (!places[key] && img) places[key] = img;
        for (const t of h.tags || []) {
          if (!tags[t] && img) tags[t] = img;
        }
      }
      setHeroByDest(places);
      setHeroByTag(tags);
    })();
  }, []);

  const heroFor = (d: Destination) => {
    if (d.kind === "place") return heroByDest[d.name_en.toLowerCase()];
    if (d.tag) return heroByTag[d.tag];
    return undefined;
  };

  const renderTile = (d: Destination) => {
    const name = ar ? d.name_ar : d.name_en;
    const blurb = ar ? d.blurb_ar : d.blurb_en;
    const hero = heroFor(d);
    const img = hero ? safeHotelImage(hero) : null;

    return (
      <Link
        key={d.slug}
        to={lp(`/destinations/${d.slug}`)}
        className="group block"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-5">
          {img ? (
            <img
              src={img}
              alt={name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/95 text-primary-foreground">
              <span className="font-serif text-3xl md:text-4xl tracking-wide">{name}</span>
            </div>
          )}
        </div>
        <h3 className="font-serif text-xl md:text-2xl text-primary leading-tight mb-2">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {blurb}
        </p>
        <span className="inline-flex items-center gap-2 text-accent uppercase tracking-[0.25em] text-[11px] font-medium">
          {ar ? "اكتشف المجموعة" : "Explore"}
          <ArrowRight className="h-3 w-3" />
        </span>
      </Link>
    );
  };

  const title = ar ? "وجهاتنا المنتقاة" : "Curated Destinations";
  const subtitle = ar
    ? "مجموعات صغيرة من المنتجعات، اختيرت يداً بيد."
    : "Small, handpicked collections of resorts — chosen one by one.";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{`${title} · ${BRAND.name}`}</title>
        <meta name="description" content={subtitle} />
      </Helmet>
      <Navbar />
      <main className="flex-1">
        {/* Editorial header */}
        <section className="container mx-auto px-6 pt-24 md:pt-32 pb-12 md:pb-16 max-w-3xl text-center">
          <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-accent mb-5">
            {ar ? "المجموعات" : "The Collections"}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-primary leading-[1.05] mb-6">
            {title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {subtitle}
          </p>
        </section>

        {/* Places */}
        <section className="container mx-auto px-6 py-12 md:py-16">
          <div className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-primary/60 mb-10 text-center">
            {ar ? "حسب الوجهة" : "By Destination"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {DESTINATIONS.map(renderTile)}
          </div>
        </section>

        {/* Themes */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-primary/60 mb-10 text-center">
            {ar ? "حسب الأسلوب" : "By Style of Travel"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {COLLECTIONS.map(renderTile)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;
