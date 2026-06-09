import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { DESTINATIONS } from "@/lib/destinations";
import { supabase } from "@/integrations/supabase/client";
import { safeHotelImage } from "@/lib/safeImage";

/**
 * Destination index — the new entry point to the catalog.
 *
 * Each tile uses the hero image of the first published hotel in that
 * destination (verified CMS-uploaded photo). If none exists yet, a
 * typographic tile renders — never stock or AI imagery.
 */
const Destinations = () => {
  const lang = useLocale();
  const lp = useLocalePath();
  const ar = lang === "ar";
  const [heroByDest, setHeroByDest] = useState<Record<string, string>>({});
  const [countByDest, setCountByDest] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("hotels")
        .select("destination,hero_image_url")
        .eq("is_published", true);
      const heroes: Record<string, string> = {};
      const counts: Record<string, number> = {};
      for (const h of data || []) {
        const key = (h.destination || "").toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
        if (!heroes[key] && h.hero_image_url) heroes[key] = h.hero_image_url;
      }
      setHeroByDest(heroes);
      setCountByDest(counts);
    })();
  }, []);

  const title = ar ? "وجهاتنا الفاخرة" : "Our Luxury Destinations";
  const subtitle = ar
    ? "اختر وجهة لاستكشاف المنتجعات المختارة بعناية وفئات خاصة بكل وجهة."
    : "Pick a destination to explore hand-curated resorts and destination-specific filters.";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{title} · Resort Offers</title>
        <meta name="description" content={subtitle} />
      </Helmet>
      <Navbar />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h1 className="font-serif text-3xl md:text-5xl mb-4">{title}</h1>
            <p className="text-primary-foreground/80">{subtitle}</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-24">
          {(() => {
            const liveDests = DESTINATIONS.filter((d) => heroByDest[d.slug]);
            if (liveDests.length === 0) {
              return (
                <div className="max-w-xl mx-auto text-center py-20">
                  <p className="text-muted-foreground">
                    {ar
                      ? "وجهاتنا قيد التنسيق. يُسعد مستشارينا تقديم توصية شخصية."
                      : "Our destinations are being privately curated. Our advisors will gladly arrange a personal recommendation."}
                  </p>
                </div>
              );
            }
            return (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {liveDests.map((d) => {
                  const name = ar ? d.name_ar : d.name_en;
                  const blurb = ar ? d.blurb_ar : d.blurb_en;
                  const hero = heroByDest[d.slug];
                  const count = countByDest[d.slug] || 0;
                  return (
                    <Link
                      key={d.slug}
                      to={lp(`/destinations/${d.slug}`)}
                      className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all"
                    >
                      <img
                        src={safeHotelImage(hero)}
                        alt={name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider opacity-80 mb-2">
                          <MapPin className="h-3 w-3" />
                          {d.region}
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl mb-2">{name}</h2>
                        <p className="text-sm text-white/85 mb-4 line-clamp-2">{blurb}</p>
                        <div className="inline-flex items-center gap-2 text-sm font-medium">
                          {ar
                            ? `${count} منتجع موثق`
                            : `${count} verified ${count === 1 ? "resort" : "resorts"}`}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })()}
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Destinations;
