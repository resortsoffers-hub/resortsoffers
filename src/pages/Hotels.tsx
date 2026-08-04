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

        <section className="container mx-auto px-4 py-6">
          {/* Search + destination dropdown + category tick-list */}
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

            <Select value={destFilter} onValueChange={(v) => { setDestFilter(v); setActiveTags([]); }}>
              <SelectTrigger className="md:w-56">
                <SelectValue placeholder={lang === "ar" ? "الوجهة" : "Destination"} />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d === "all" ? (lang === "ar" ? "كل الوجهات" : "All destinations") : d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isMaldivesScope && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="md:w-56 justify-between">
                    <span>
                      {lang === "ar" ? "نوع المنتجع" : "Resort type"}
                      {activeTags.length > 0 && ` (${activeTags.length})`}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover z-50">
                  {HOTEL_CATEGORIES.map((c) => (
                    <DropdownMenuCheckboxItem
                      key={c.slug}
                      checked={activeTags.includes(c.slug)}
                      onCheckedChange={(checked) =>
                        setActiveTags((prev) =>
                          checked ? [...prev, c.slug] : prev.filter((t) => t !== c.slug)
                        )
                      }
                      onSelect={(e) => e.preventDefault()}
                    >
                      {lang === "ar" ? c.label_ar : c.label_en}
                      {(tagCounts.get(c.slug) || 0) > 0 && (
                        <span className="ms-auto text-xs text-muted-foreground">
                          {tagCounts.get(c.slug)}
                        </span>
                      )}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Active-filter summary */}
          {(activeTags.length > 0 || destFilter !== "all" || query) && (
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <span>{filtered.length} {lang === "ar" ? "نتيجة" : "results"}</span>
              <button
                onClick={() => { setActiveTags([]); setDestFilter("all"); setQuery(""); }}
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
