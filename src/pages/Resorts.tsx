import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { fallbackHotelImage, safeHotelImage } from "@/lib/safeImage";
import { HOTEL_CATEGORIES, categoryLabel } from "@/lib/hotelCategories";
import { MapPin, Tag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type SortMode = "offers-first" | "offers-only" | "name";

const Resorts = () => {
  const lang = useLocale();
  const localePath = useLocalePath();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [offerCounts, setOfferCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("all");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState<SortMode>("offers-first");

  useEffect(() => {
    (async () => {
      const [{ data: hotelRows }, { data: offerRows }] = await Promise.all([
        supabase
          .from("hotels")
          .select(
            "id,slug,name_en,name_ar,destination,short_desc_en,short_desc_ar,hero_image_url,tags"
          )
          .eq("is_published", true)
          .order("display_order", { ascending: false }),
        supabase.from("offers").select("hotel_id").eq("is_active", true),
      ]);

      const counts: Record<string, number> = {};
      for (const o of (offerRows as { hotel_id: string | null }[]) || []) {
        if (o.hotel_id) counts[o.hotel_id] = (counts[o.hotel_id] || 0) + 1;
      }
      setOfferCounts(counts);
      setHotels((hotelRows as Hotel[]) || []);
      setLoading(false);
    })();
  }, []);

  const countries = useMemo(
    () => Array.from(new Set(hotels.map((h) => h.destination).filter(Boolean))).sort(),
    [hotels]
  );

  const types = useMemo(() => {
    const used = new Set<string>();
    for (const h of hotels) for (const t of h.tags || []) used.add(t);
    return HOTEL_CATEGORIES.filter((c) => used.has(c.slug));
  }, [hotels]);

  const visible = useMemo(() => {
    const list = hotels.filter((h) => {
      if (country !== "all" && h.destination !== country) return false;
      if (type !== "all" && !(h.tags || []).includes(type)) return false;
      if (sort === "offers-only" && !offerCounts[h.id]) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sort === "name") return a.name_en.localeCompare(b.name_en);
      const diff = (offerCounts[b.id] || 0) - (offerCounts[a.id] || 0);
      return diff !== 0 ? diff : a.name_en.localeCompare(b.name_en);
    });
  }, [hotels, country, type, sort, offerCounts]);

  const title = lang === "ar" ? "دليل المنتجعات" : "Resorts Directory";
  const subtitle =
    lang === "ar"
      ? "تصفح المنتجعات حسب الوجهة ونوع الإقامة، مع إبراز العروض المتاحة."
      : "Browse our partner resorts by country and resort type, with live offers surfaced first.";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{`${title} · Resorts Offers`}</title>
        <meta name="description" content={subtitle} />
      </Helmet>
      <Navbar />
      <main className="flex-1 pt-14">
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl md:text-5xl mb-3">{title}</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="sm:w-56">
                <SelectValue placeholder={lang === "ar" ? "الوجهة" : "Country"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {lang === "ar" ? "كل الوجهات" : "All countries"}
                </SelectItem>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="sm:w-56">
                <SelectValue placeholder={lang === "ar" ? "نوع المنتجع" : "Resort type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {lang === "ar" ? "كل الأنواع" : "All resort types"}
                </SelectItem>
                {types.map((t) => (
                  <SelectItem key={t.slug} value={t.slug}>
                    {categoryLabel(t.slug, lang === "ar" ? "ar" : "en")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={(v) => setSort(v as SortMode)}>
              <SelectTrigger className="sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="offers-first">
                  {lang === "ar" ? "العروض أولاً" : "Offers available first"}
                </SelectItem>
                <SelectItem value="offers-only">
                  {lang === "ar" ? "المنتجعات ذات العروض فقط" : "Only resorts with offers"}
                </SelectItem>
                <SelectItem value="name">
                  {lang === "ar" ? "الاسم (أ–ي)" : "Name (A–Z)"}
                </SelectItem>
              </SelectContent>
            </Select>

            {(country !== "all" || type !== "all" || sort !== "offers-first") && (
              <Button
                variant="ghost"
                onClick={() => {
                  setCountry("all");
                  setType("all");
                  setSort("offers-first");
                }}
              >
                {lang === "ar" ? "إعادة ضبط" : "Reset"}
              </Button>
            )}
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground py-20">
              {lang === "ar" ? "جارٍ التحميل…" : "Loading…"}
            </p>
          ) : visible.length === 0 ? (
            <div className="text-center py-24 max-w-xl mx-auto">
              <div className="uppercase tracking-[0.3em] text-[10px] text-accent-strong mb-4">
                {lang === "ar" ? "قريباً" : "Coming Soon"}
              </div>
              <p className="font-serif text-2xl md:text-3xl text-primary leading-snug">
                {lang === "ar"
                  ? "لا توجد منتجعات مطابقة حالياً."
                  : "No resorts match this selection yet."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((h) => {
                const name = lang === "ar" && h.name_ar ? h.name_ar : h.name_en;
                const desc = lang === "ar" && h.short_desc_ar ? h.short_desc_ar : h.short_desc_en;
                const count = offerCounts[h.id] || 0;
                return (
                  <Link
                    key={h.id}
                    to={localePath(`/hotels/${h.slug}`)}
                    className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                      <img
                        src={safeHotelImage(h.hero_image_url)}
                        alt={name}
                        loading="lazy"
                        onError={fallbackHotelImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {count > 0 && (
                        <span className="absolute top-3 start-3 rounded-full bg-accent-strong text-primary-foreground text-[11px] tracking-wide px-3 py-1 flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {lang === "ar" ? "عرض متاح" : "Offer available"}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <Badge variant="secondary" className="mb-2 gap-1">
                        <MapPin className="h-3 w-3" /> {h.destination}
                      </Badge>
                      <h2 className="font-serif text-xl text-primary mb-2 line-clamp-2">{name}</h2>
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

export default Resorts;
