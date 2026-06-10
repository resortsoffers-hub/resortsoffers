import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { fallbackHotelImage, safeHotelImage } from "@/lib/safeImage";
import { HOTEL_CATEGORIES } from "@/lib/hotelCategories";
import { MapPin, Search, X } from "lucide-react";

interface Hotel {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string | null;
  destination: string;
  short_desc_en: string | null;
  short_desc_ar: string | null;
  hero_image_url: string | null;
  tags: string[] | null;
}

const Hotels = () => {
  const lang = useLocale();
  const localePath = useLocalePath();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [destFilter, setDestFilter] = useState<string>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("hotels")
        .select("id,slug,name_en,name_ar,destination,short_desc_en,short_desc_ar,hero_image_url,tags")
        .eq("is_published", true)
        .order("display_order", { ascending: false });
      setHotels((data as Hotel[]) || []);
      setLoading(false);
    })();
  }, []);

  const destinations = useMemo(() => {
    const set = new Set(hotels.map((h) => h.destination));
    return ["all", ...Array.from(set).sort()];
  }, [hotels]);

  // Count how many published hotels match each category so we can hide empty chips later if needed
  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const h of hotels) for (const t of h.tags || []) m.set(t, (m.get(t) || 0) + 1);
    return m;
  }, [hotels]);

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (destFilter !== "all" && h.destination !== destFilter) return false;
      if (activeTag && !(h.tags || []).includes(activeTag)) return false;
      if (query) {
        const q = query.toLowerCase();
        return (h.name_en + " " + (h.name_ar ?? "") + " " + h.destination).toLowerCase().includes(q);
      }
      return true;
    });
  }, [hotels, query, destFilter, activeTag]);

  const title = lang === "ar" ? "المنتجعات الفاخرة" : "Luxury Resorts";
  const subtitle = lang === "ar"
    ? "مجموعة منتقاة من المنتجعات الفاخرة بصور رسمية موثقة فقط."
    : "A curated collection of luxury resorts — verified official photography only.";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{title} · Resort Offers</title>
        <meta name="description" content={subtitle} />
      </Helmet>
      <Navbar />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl md:text-5xl mb-3">{title}</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </section>

        {/* Sticky filter rail — visible chips, one-tap, mobile-first */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-3">
            {/* Category chips (horizontal scroll on mobile) */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-thin">
              <button
                onClick={() => setActiveTag(null)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                  activeTag === null
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card hover:border-primary text-foreground/80"
                }`}
              >
                {lang === "ar" ? "كل المنتجعات" : "All resorts"}
              </button>
              {HOTEL_CATEGORIES.map((c) => {
                const count = tagCounts.get(c.slug) || 0;
                const active = activeTag === c.slug;
                return (
                  <button
                    key={c.slug}
                    onClick={() => setActiveTag(active ? null : c.slug)}
                    className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                      active
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card hover:border-primary text-foreground/80"
                    } ${count === 0 && !active ? "opacity-50" : ""}`}
                    aria-pressed={active}
                  >
                    {lang === "ar" ? c.label_ar : c.label_en}
                    {count > 0 && (
                      <span className={`ms-1.5 text-xs ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <section className="container mx-auto px-4 py-6">
          {/* Secondary: search + destination */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="ps-9"
                placeholder={lang === "ar" ? "ابحث عن منتجع..." : "Search resort or destination..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {destinations.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {destinations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDestFilter(d)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      destFilter === d ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:border-primary"
                    }`}
                  >
                    {d === "all" ? (lang === "ar" ? "كل الوجهات" : "All destinations") : d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active-filter summary */}
          {(activeTag || destFilter !== "all" || query) && (
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <span>{filtered.length} {lang === "ar" ? "نتيجة" : "results"}</span>
              <button
                onClick={() => { setActiveTag(null); setDestFilter("all"); setQuery(""); }}
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <X className="h-3 w-3" /> {lang === "ar" ? "مسح الفلاتر" : "Clear filters"}
              </button>
            </div>
          )}

          {loading ? (
            <p className="text-center text-muted-foreground py-20">Loading…</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 max-w-xl mx-auto">
              <div className="uppercase tracking-[0.3em] text-[10px] text-accent mb-4">
                {lang === "ar" ? "قريباً" : "Coming Soon"}
              </div>
              <p className="font-serif text-2xl md:text-3xl text-primary leading-snug">
                {lang === "ar"
                  ? "مجموعتنا الافتتاحية تُكشف قريباً."
                  : "Our opening collection is being prepared."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((h) => {
                const name = lang === "ar" && h.name_ar ? h.name_ar : h.name_en;
                const desc = lang === "ar" && h.short_desc_ar ? h.short_desc_ar : h.short_desc_en;
                return (
                  <Link
                    key={h.id}
                    to={localePath(`/hotels/${h.slug}`)}
                    className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={safeHotelImage(h.hero_image_url)}
                        alt={name}
                        loading="lazy"
                        onError={fallbackHotelImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <Badge variant="secondary" className="mb-2 gap-1">
                        <MapPin className="h-3 w-3" /> {h.destination}
                      </Badge>
                      <h3 className="font-serif text-xl text-primary mb-2 line-clamp-2">{name}</h3>
                      {desc && <p className="text-sm text-muted-foreground line-clamp-3">{desc}</p>}
                    </div>
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

export default Hotels;
