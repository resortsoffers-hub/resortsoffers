import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import { Badge } from "@/components/ui/badge";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { fallbackHotelImage, safeHotelImage } from "@/lib/safeImage";
import {
  MapPin, MessageCircle, Loader2, ArrowLeft, ChevronLeft, ChevronRight,
  Home, UtensilsCrossed, Sparkles, Waves, Users, Heart,
  Plane, Ship, Download, FileText, CalendarRange, CalendarCheck,
  CalendarClock, BedDouble, Tag,
} from "lucide-react";

interface Hotel {
  id: string; slug: string;
  name_en: string; name_ar: string | null;
  destination: string; country: string | null;
  short_desc_en: string | null; short_desc_ar: string | null;
  long_desc_en: string | null; long_desc_ar: string | null;
  hero_image_url: string | null;
  is_published: boolean;
  tags?: string[] | null;
}

interface Img {
  id: string; image_url: string;
  caption_en: string | null; caption_ar: string | null;
  category_kind: string | null; category_label: string | null;
}

interface Offer {
  id: string; title: string; description: string | null;
  price: number | null; currency: string | null; nights: number | null;
  valid_until: string | null; features: any;
  file_url: string | null; file_type: string | null;
}

const WHATSAPP = "971567622484";

const CATEGORY_ORDER: { kind: string; en: string; ar: string }[] = [
  { kind: "villa",      en: "Villas & Suites",     ar: "الفلل والأجنحة" },
  { kind: "dining",     en: "Restaurants & Bars",  ar: "المطاعم والبارات" },
  { kind: "spa",        en: "Spa & Wellness",      ar: "السبا والعافية" },
  { kind: "experience", en: "Experiences",         ar: "التجارب" },
  { kind: "beach",      en: "Beach & Pool",        ar: "الشاطئ والمسبح" },
  { kind: "kids",       en: "Kids Club",           ar: "نادي الأطفال" },
  { kind: "aerial",     en: "Aerial Views",        ar: "إطلالات جوية" },
];

// Map tag slug → icon + bilingual label
const TAG_ICONS: Record<string, { Icon: any; en: string; ar: string }> = {
  "seaplane":       { Icon: Plane,      en: "Seaplane",       ar: "طائرة مائية" },
  "speedboat":      { Icon: Ship,       en: "Speedboat",      ar: "قارب سريع" },
  "all-inclusive":  { Icon: UtensilsCrossed, en: "All Inclusive", ar: "شامل كلياً" },
  "family":         { Icon: Users,      en: "Family Friendly", ar: "مناسب للعائلات" },
  "honeymoon":      { Icon: Heart,      en: "Honeymoon",      ar: "شهر العسل" },
  "adults-only":    { Icon: Sparkles,   en: "Adults Only",    ar: "للبالغين فقط" },
  "wellness":       { Icon: Sparkles,   en: "Wellness",       ar: "العافية" },
  "diving":         { Icon: Waves,      en: "Diving",         ar: "الغوص" },
  "private-island": { Icon: Home,       en: "Private Island", ar: "جزيرة خاصة" },
};

const HotelDetail = () => {
  const { slug, previewId } = useParams<{ slug: string; previewId?: string }>();
  const lang = useLocale();
  const localePath = useLocalePath();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [images, setImages] = useState<Img[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setHotel(null); setImages([]); setOffer(null); setHeroIdx(0);

      const privatePreviewId = previewId || new URLSearchParams(window.location.search).get("preview");

      if (privatePreviewId) {
        const { data: preview } = await (supabase as any).rpc("get_hotel_preview", {
          _slug: slug, _preview_id: privatePreviewId,
        });
        const payload = preview as { hotel?: Hotel; images?: Img[]; offer?: Offer | null } | null;
        if (payload?.hotel) {
          setHotel(payload.hotel);
          setImages(payload.images || []);
          setOffer(payload.offer || null);
          setLoading(false);
          return;
        }
      }

      const { data: h } = await supabase.from("hotels").select("*").eq("slug", slug!).eq("is_published", true).maybeSingle();
      if (h) {
        setHotel(h as Hotel);
        const [{ data: imgs }, { data: offers }] = await Promise.all([
          supabase.from("hotel_images")
            .select("id,image_url,caption_en,caption_ar,category_kind,category_label").eq("hotel_id", (h as Hotel).id)
            .order("display_order", { ascending: true }),
          supabase.from("offers")
            .select("id,title,description,price,currency,nights,valid_until,features,file_url,file_type")
            .eq("hotel_id", (h as Hotel).id).eq("is_active", true)
            .order("display_order", { ascending: true }).limit(1),
        ]);
        setImages((imgs as Img[]) || []);
        setOffer((offers?.[0] as Offer) || null);
      }
      setLoading(false);
    })();
  }, [slug, previewId]);

  // Hero slideshow images: hero + all gallery photos
  const heroSlides = useMemo(() => {
    if (!hotel) return [] as string[];
    const list: string[] = [];
    if (hotel.hero_image_url) list.push(hotel.hero_image_url);
    images.forEach(i => { if (i.image_url && !list.includes(i.image_url)) list.push(i.image_url); });
    return list.map(safeHotelImage);
  }, [hotel, images]);

  // Auto-advance
  useEffect(() => {
    if (heroSlides.length < 2) return;
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  if (loading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
    </div>
  );

  if (!hotel) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif mb-4">{lang === "ar" ? "المنتجع غير موجود" : "Resort not found"}</h1>
        <Link to={localePath("/hotels")} className="text-primary hover:underline">
          {lang === "ar" ? "العودة إلى المنتجعات" : "Back to resorts"}
        </Link>
      </main>
      <Footer />
    </div>
  );

  const name = lang === "ar" && hotel.name_ar ? hotel.name_ar : hotel.name_en;
  const shortDesc = lang === "ar" && hotel.short_desc_ar ? hotel.short_desc_ar : hotel.short_desc_en;
  const longDesc = lang === "ar" && hotel.long_desc_ar ? hotel.long_desc_ar : hotel.long_desc_en;

  // Split long description into short bullet points (one per non-empty line/paragraph)
  const bullets = (longDesc || "")
    .split(/\n+/)
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 8);

  const toGalleryImages = (items: Img[], fallbackTitle: string) => items.map((img) => ({
    src: safeHotelImage(img.image_url),
    alt: (lang === "ar" && img.caption_ar) ? img.caption_ar : (img.caption_en || `${hotel.name_en} photo`),
    title: (lang === "ar" && img.caption_ar) ? img.caption_ar : (img.caption_en || fallbackTitle),
    description: img.category_label || undefined,
  }));

  const waMsg = encodeURIComponent(`Hello, I'd like more information about ${hotel.name_en} (${hotel.destination}).`);

  // Pull structured offer fields from features (object or array of {key,value})
  const f = offer?.features;
  const featObj: Record<string, any> = Array.isArray(f)
    ? f.reduce((acc: any, item: any) => {
        if (item && typeof item === "object" && item.key) acc[item.key] = item.value ?? item.label;
        return acc;
      }, {})
    : (f && typeof f === "object" ? f : {});
  const featList: string[] = Array.isArray(f)
    ? f.filter((x: any) => typeof x === "string" || (x && typeof x === "object" && !x.key))
       .map((x: any) => typeof x === "string" ? x : (x?.label || x?.text)).filter(Boolean)
    : [];

  const get = (...keys: string[]) => {
    for (const k of keys) if (featObj[k]) return String(featObj[k]);
    return null;
  };

  const stayDuration = offer?.nights ? `${offer.nights} ${lang === "ar" ? "ليالٍ" : "nights"}` : get("stay_duration", "duration");
  const mealPlan      = get("meal_plan", "board", "meal");
  const transfer      = get("transfer", "transfers");
  const bookingWindow = get("booking_window", "book_by", "booking_period");
  const travelPeriod  = get("travel_period", "stay_period", "travel_dates");
  const validity      = offer?.valid_until
    ? new Date(offer.valid_until).toLocaleDateString(lang === "ar" ? "ar" : "en-GB")
    : get("validity");
  const villaType     = get("villa_type", "room_type", "room");

  const activeTags = (hotel.tags || []).filter(t => TAG_ICONS[t]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{name} · Resort Offers</title>
        <meta name="description" content={shortDesc || `${name} in ${hotel.destination}`} />
        <meta property="og:title" content={name} />
        <meta property="og:image" content={safeHotelImage(hotel.hero_image_url)} />
      </Helmet>
      <Navbar />
      <main className="flex-1">
        {/* ===== HERO — large image slideshow (≈70vh) ===== */}
        <section className="relative h-[78vh] min-h-[520px] bg-muted overflow-hidden">
          {heroSlides.length === 0 ? (
            <img src={safeHotelImage(null)} alt={name} className="w-full h-full object-cover" />
          ) : (
            heroSlides.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt={name}
                onError={fallbackHotelImage}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ${i === heroIdx ? "opacity-100" : "opacity-0"}`}
              />
            ))
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30" />

          {/* Top bar */}
          <div className="absolute top-0 inset-x-0 p-4 md:p-6">
            <div className="container mx-auto">
              <Link to={localePath("/hotels")} className="inline-flex items-center text-sm text-white/90 hover:text-white bg-black/30 backdrop-blur rounded-full px-3 py-1.5">
                <ArrowLeft className="h-4 w-4 me-1" /> {lang === "ar" ? "كل المنتجعات" : "All resorts"}
              </Link>
            </div>
          </div>

          {/* Arrows */}
          {heroSlides.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={() => setHeroIdx(i => (i - 1 + heroSlides.length) % heroSlides.length)}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur text-white flex items-center justify-center"
              ><ChevronLeft className="h-6 w-6" /></button>
              <button
                aria-label="Next"
                onClick={() => setHeroIdx(i => (i + 1) % heroSlides.length)}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur text-white flex items-center justify-center"
              ><ChevronRight className="h-6 w-6" /></button>
              <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroIdx(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === heroIdx ? "w-8 bg-white" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Bottom title */}
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 text-white">
            <div className="container mx-auto">
              <Badge className="mb-3 bg-white/15 backdrop-blur border-white/30 text-white gap-1">
                <MapPin className="h-3 w-3" /> {hotel.destination}{hotel.country ? `, ${hotel.country}` : ""}
              </Badge>
              <h1 className="font-serif text-4xl md:text-6xl tracking-tight drop-shadow-lg">{name}</h1>
              {shortDesc && <p className="mt-3 max-w-2xl text-white/90 text-base md:text-lg">{shortDesc}</p>}
            </div>
          </div>
        </section>

        {/* ===== Swipeable thumbnail strip ===== */}
        {heroSlides.length > 1 && (
          <section className="bg-background border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1 scrollbar-thin">
                {heroSlides.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => { setHeroIdx(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    aria-label={`Show photo ${i + 1}`}
                    className={`flex-shrink-0 h-20 w-28 md:h-24 md:w-36 rounded-lg overflow-hidden border-2 transition-all ${i === heroIdx ? "border-primary scale-[1.02]" : "border-transparent opacity-75 hover:opacity-100"}`}
                  >
                    <img src={src} alt="" onError={fallbackHotelImage} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== Feature icon row (Speedboat, All Inclusive, etc.) ===== */}
        {activeTags.length > 0 && (
          <section className="border-b bg-muted/30">
            <div className="container mx-auto px-4 py-5">
              <div className="flex flex-wrap gap-3 md:gap-5 justify-center md:justify-start">
                {activeTags.map((slug) => {
                  const t = TAG_ICONS[slug];
                  const label = lang === "ar" ? t.ar : t.en;
                  return (
                    <div key={slug} className="flex items-center gap-2 bg-card border rounded-full px-3.5 py-2 shadow-sm">
                      <t.Icon className="h-4 w-4 text-primary" />
                      <span className="text-xs md:text-sm font-medium text-foreground/80">{label}</span>
                    </div>
                  );
                })}
                {villaType && (
                  <div className="flex items-center gap-2 bg-card border rounded-full px-3.5 py-2 shadow-sm">
                    <BedDouble className="h-4 w-4 text-primary" />
                    <span className="text-xs md:text-sm font-medium text-foreground/80">{villaType}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-card border rounded-full px-3.5 py-2 shadow-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-xs md:text-sm font-medium text-foreground/80">{hotel.destination}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== LUXURY OFFER CARD ===== */}
        {offer && (
          <section id="offer" className="container mx-auto px-4 py-10 md:py-14 scroll-mt-24">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary mb-2">
                  <Tag className="h-3.5 w-3.5" /> {lang === "ar" ? "العرض الحصري" : "Exclusive Offer"}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl">{offer.title}</h2>
              </div>

              <div className="bg-card border border-primary/20 rounded-2xl shadow-xl overflow-hidden">
                {/* Price band */}
                {offer.price != null && (
                  <div className="bg-gradient-to-r from-primary/10 via-amber-50/60 to-primary/10 text-center py-6 px-6 border-b">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{lang === "ar" ? "تبدأ من" : "Starting from"}</div>
                    <div className="font-serif text-4xl md:text-5xl text-primary">
                      {offer.currency || "USD"} {Number(offer.price).toLocaleString()}
                    </div>
                    {stayDuration && <div className="text-sm text-muted-foreground mt-1">{lang === "ar" ? "لإقامة" : "per stay"} · {stayDuration}</div>}
                  </div>
                )}

                {/* Details grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
                  {[
                    { Icon: CalendarRange, label: lang === "ar" ? "مدة الإقامة" : "Stay Duration", value: stayDuration },
                    { Icon: UtensilsCrossed, label: lang === "ar" ? "نظام الوجبات" : "Meal Plan", value: mealPlan },
                    { Icon: Plane, label: lang === "ar" ? "النقل" : "Transfer", value: transfer },
                    { Icon: CalendarCheck, label: lang === "ar" ? "فترة الحجز" : "Booking Window", value: bookingWindow },
                    { Icon: CalendarClock, label: lang === "ar" ? "فترة السفر" : "Travel Period", value: travelPeriod },
                    { Icon: Tag, label: lang === "ar" ? "صالح حتى" : "Validity", value: validity },
                  ].filter(x => x.value).map((row, i) => (
                    <div key={i} className="bg-card p-4 flex items-start gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <row.Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{row.label}</div>
                        <div className="text-sm font-medium text-foreground/90 leading-snug mt-0.5 break-words">{row.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inclusions bullets */}
                {featList.length > 0 && (
                  <div className="px-6 py-5 border-t">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{lang === "ar" ? "يشمل العرض" : "Inclusions"}</div>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {featList.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">✦</span>
                          <span className="text-foreground/85">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTAs immediately below summary */}
                <div className="px-6 py-5 border-t bg-muted/20 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hello, I'd like to book the current offer at ${hotel.name_en}: ${offer.title}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-md px-5 py-3 font-medium transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" /> {lang === "ar" ? "استفسر عبر واتساب" : "Enquire on WhatsApp"}
                  </a>
                  {offer.file_url && (
                    <a
                      href={offer.file_url}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-5 py-3 font-medium transition-colors shadow-sm"
                    >
                      <Download className="h-4 w-4" /> {lang === "ar" ? "تحميل العرض PDF" : "Download Offer PDF"}
                    </a>
                  )}
                </div>
              </div>

              {/* Short offer description (if present) */}
              {offer.description && (
                <p className="mt-6 text-center text-foreground/75 max-w-2xl mx-auto whitespace-pre-line text-sm md:text-base leading-relaxed">
                  {offer.description}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ===== Short bullet highlights (replaces long paragraphs) ===== */}
        {bullets.length > 0 && (
          <section className="container mx-auto px-4 pb-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl text-center mb-6">
                {lang === "ar" ? "أبرز ما يميز المنتجع" : "Resort Highlights"}
              </h2>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1.5 text-lg leading-none">✦</span>
                    <span className="text-foreground/85 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ===== Categorised photo galleries (photos dominate the page) ===== */}
        <section className="container mx-auto px-4 pb-16">
          {CATEGORY_ORDER.map((cat) => {
            const items = images.filter((i) => i.category_kind === cat.kind);
            if (items.length === 0) return null;
            const title = lang === "ar" ? cat.ar : cat.en;
            return (
              <div key={cat.kind} id={cat.kind} className="mt-12 scroll-mt-24">
                <h2 className="font-serif text-2xl md:text-3xl text-center mb-6">{title}</h2>
                <PhotoGallery images={toGalleryImages(items, title)} columns={3} />
              </div>
            );
          })}
          {(() => {
            const orphan = images.filter((i) => !CATEGORY_ORDER.some((c) => c.kind === i.category_kind));
            if (orphan.length === 0) return null;
            return (
              <div className="mt-12">
                <h2 className="font-serif text-2xl md:text-3xl text-center mb-6">{lang === "ar" ? "المعرض" : "Gallery"}</h2>
                <PhotoGallery images={toGalleryImages(orphan, lang === "ar" ? "المعرض" : "Gallery")} columns={3} />
              </div>
            );
          })()}
        </section>
      </main>

      {/* Sticky mobile CTA bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur px-3 py-2 flex gap-2 shadow-lg">
        <a
          href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
          target="_blank" rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-md py-2.5 text-sm font-medium"
        >
          <MessageCircle className="h-4 w-4" /> {lang === "ar" ? "واتساب" : "Enquire"}
        </a>
        {offer?.file_url && (
          <a
            href={offer.file_url}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-4 py-2.5 text-sm font-medium"
          >
            <FileText className="h-4 w-4" /> PDF
          </a>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetail;
