import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, MapPin, MessageCircle, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { safeHotelImage } from "@/lib/safeImage";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { HOTEL_CATEGORIES } from "@/lib/hotelCategories";
import { findDestination } from "@/lib/destinations";
import { BRAND } from "@/lib/brand";

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

/**
 * Single-destination hub.
 *
 * Resorts and category chips are scoped to this destination only. Categories
 * that have zero resorts within this destination are hidden — chips never
 * lie about availability.
 */
const DestinationHub = () => {
  const { slug } = useParams<{ slug: string }>();
  const dest = findDestination(slug);
  const lang = useLocale();
  const lp = useLocalePath();
  const ar = lang === "ar";

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!dest) return;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("hotels")
        .select("id,slug,name_en,name_ar,destination,short_desc_en,short_desc_ar,hero_image_url,tags")
        .eq("is_published", true)
        .ilike("destination", dest.name_en)
        .order("display_order", { ascending: false });
      setHotels((data as Hotel[]) || []);
      setLoading(false);
    })();
  }, [dest?.slug]);

  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const h of hotels) for (const t of h.tags || []) m.set(t, (m.get(t) || 0) + 1);
    return m;
  }, [hotels]);

  const visibleCategories = HOTEL_CATEGORIES.filter((c) => (tagCounts.get(c.slug) || 0) > 0);

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (activeTag && !(h.tags || []).includes(activeTag)) return false;
      if (query) {
        const q = query.toLowerCase();
        return ((h.name_en ?? "") + " " + (h.name_ar ?? "")).toLowerCase().includes(q);
      }
      return true;
    });
  }, [hotels, query, activeTag]);

  if (!dest) return <Navigate to={lp("/destinations")} replace />;

  const destName = ar ? dest.name_ar : dest.name_en;
  const destBlurb = ar ? dest.blurb_ar : dest.blurb_en;

  const waMsg = encodeURIComponent(
    ar
      ? `مرحباً، أرغب في الحصول على توصيات منتجع في ${dest.name_ar}.`
      : `Hello, I'd like resort recommendations in ${dest.name_en}.`
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{`${destName} — ${ar ? "منتجعات فاخرة" : "Luxury Resorts"} · Resort Offers`}</title>
        <meta
          name="description"
          content={ar ? `منتجعات فاخرة موثقة في ${dest.name_ar}. ${dest.blurb_ar}` : `Verified luxury resorts in ${dest.name_en}. ${dest.blurb_en}`}
        />
      </Helmet>
      <Navbar />
      <main className="flex-1">
        {/* Destination hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Link
              to={lp("/destinations")}
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {ar ? "كل الوجهات" : "All destinations"}
            </Link>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/70 mb-3">
              <MapPin className="h-3 w-3" />
              {dest.region}
            </div>
            <h1 className="font-serif text-3xl md:text-5xl mb-4">{destName}</h1>
            <p className="text-primary-foreground/85 text-base md:text-lg">{destBlurb}</p>
          </div>
        </section>

        {/* Scoped filters */}
        {(visibleCategories.length > 0 || hotels.length > 0) && (
          <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b">
            <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
                  activeTag === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card hover:border-primary"
                }`}
              >
                {ar ? "كل المنتجعات" : "All"}
                <span className="ms-1.5 text-xs opacity-70">{hotels.length}</span>
              </button>
              {visibleCategories.map((c) => {
                const active = activeTag === c.slug;
                const count = tagCounts.get(c.slug) || 0;
                return (
                  <button
                    key={c.slug}
                    onClick={() => setActiveTag(active ? null : c.slug)}
                    className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card hover:border-primary"
                    }`}
                  >
                    {ar ? c.label_ar : c.label_en}
                    <span className="ms-1.5 text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
              <div className="relative ms-auto w-full sm:w-64">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="ps-9 h-9"
                  placeholder={ar ? "ابحث عن منتجع..." : "Search resort..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          {loading ? (
            <p className="text-center text-muted-foreground py-16">{ar ? "جاري التحميل…" : "Loading…"}</p>
          ) : filtered.length === 0 ? (
            <div className="max-w-xl mx-auto text-center py-12">
              <h2 className="font-serif text-2xl text-primary mb-3">
                {ar ? `${dest.name_ar} قيد التنسيق` : `${dest.name_en} is being curated`}
              </h2>
              <p className="text-muted-foreground mb-6">
                {ar
                  ? "نحن ننتقي عددًا محدودًا من المنتجعات في هذه الوجهة بصور رسمية كاملة. تواصل معنا للحصول على توصيات شخصية الآن."
                  : "We're hand-picking a small number of resorts here with complete official photography. Speak to an advisor for tailored recommendations now."}
              </p>
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-md px-6 py-3 font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {ar ? "تحدث مع مستشار" : "Speak to an advisor"}
              </a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((h) => {
                const name = ar && h.name_ar ? h.name_ar : h.name_en;
                const desc = ar && h.short_desc_ar ? h.short_desc_ar : h.short_desc_en;
                return (
                  <Link
                    key={h.id}
                    to={lp(`/hotels/${h.slug}`)}
                    className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={safeHotelImage(h.hero_image_url)}
                        alt={name}
                        loading="lazy"
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

export default DestinationHub;
