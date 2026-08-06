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
import { MapPin, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [activeTags, setActiveTags] = useState<string[]>([]);

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
      if (activeTags.length > 0 && !activeTags.some((t) => (h.tags || []).includes(t))) return false;
      if (query) {
        const q = query.toLowerCase();
        return (h.name_en + " " + (h.name_ar ?? "") + " " + h.destination).toLowerCase().includes(q);
      }
      return true;
    });
  }, [hotels, query, destFilter, activeTags]);

  const isMaldivesScope =
    destFilter.toLowerCase() === "maldives" ||
    (destFilter === "all" && hotels.length > 0 && hotels.every((h) => h.destination?.toLowerCase() === "maldives"));

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
