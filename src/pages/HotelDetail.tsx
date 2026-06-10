import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, MessageCircle, Loader2, Heart, Sparkles, Users, Waves, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { safeHotelImage } from "@/lib/safeImage";
import { BRAND } from "@/lib/brand";

interface Hotel {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string | null;
  destination: string;
  short_desc_en: string | null;
  short_desc_ar: string | null;
  long_desc_en: string | null;
  long_desc_ar: string | null;
  hero_image_url: string | null;
  is_published: boolean;
  tags?: string[] | null;
}

interface Img {
  id: string;
  image_url: string;
  caption_en: string | null;
  caption_ar: string | null;
  category_kind: string | null;
  category_label: string | null;
}

interface Offer {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  nights: number | null;
  valid_until: string | null;
  features: any;
}

/**
 * Editorial personality lines for "Why we selected this resort".
 * Each tag maps to a short, magazine-style line (EN/AR).
 */
const PERSONALITY: Record<string, { en: string; ar: string; Icon: any }> = {
  honeymoon:       { Icon: Heart,    en: "Composed for two — overwater quiet and shoreline candlelight.", ar: "مُصمَّم للاثنين — هدوء فوق الماء وأضواء شموع على الشاطئ." },
  "adults-only":   { Icon: Sparkles, en: "Reserved for adults — a hushed island where time slows down.", ar: "محجوز للبالغين — جزيرة هادئة يبطئ فيها الزمن." },
  family:          { Icon: Users,    en: "Ideal for families — spacious villas, gentle waters, attentive care.", ar: "مثالي للعائلات — فيلات واسعة، مياه هادئة، رعاية بأدق التفاصيل." },
  wellness:        { Icon: Sparkles, en: "Designed for wellness seekers — long days of stillness and ritual.", ar: "صُمم لطالبي العافية — أيام طويلة من السكون والطقوس." },
  "private-island":{ Icon: Home,     en: "Barefoot island living — your own quiet stretch of sand.", ar: "حياة جزيرة بأقدام حافية — شريط رمل خاص بك." },
  "private-villa": { Icon: Home,     en: "A private residence — your own house, your own staff, your own pace.", ar: "إقامة خاصة — بيتك، طاقمك، إيقاعك الخاص." },
  diving:          { Icon: Waves,    en: "Chosen for the water — reefs, currents, and the silence between dives.", ar: "اختير من أجل الماء — شعاب وتيارات وصمت بين الغوصات." },
};

const HotelDetail = () => {
  const { slug, previewId } = useParams<{ slug: string; previewId?: string }>();
  const ar = useLocale() === "ar";
  const lp = useLocalePath();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [images, setImages] = useState<Img[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setHotel(null);
      setImages([]);
      setOffer(null);

      const privatePreviewId =
        previewId || new URLSearchParams(window.location.search).get("preview");

      if (privatePreviewId) {
        const { data: preview } = await (supabase as any).rpc("get_hotel_preview", {
          _slug: slug,
          _preview_id: privatePreviewId,
        });
        const payload = preview as
          | { hotel?: Hotel; images?: Img[]; offer?: Offer | null }
          | null;
        if (payload?.hotel) {
          setHotel(payload.hotel);
          setImages(payload.images || []);
          setOffer(payload.offer || null);
          setLoading(false);
          return;
        }
      }

      const { data: h } = await supabase
        .from("hotels")
        .select("*")
        .eq("slug", slug!)
        .eq("is_published", true)
        .maybeSingle();

      if (h) {
        setHotel(h as Hotel);
        const [{ data: imgs }, { data: offers }] = await Promise.all([
          supabase
            .from("hotel_images")
            .select("id,image_url,caption_en,caption_ar,category_kind,category_label")
            .eq("hotel_id", (h as Hotel).id)
            .order("display_order", { ascending: true }),
          supabase
            .from("offers")
            .select("id,title,description,price,currency,nights,valid_until,features")
            .eq("hotel_id", (h as Hotel).id)
            .eq("is_active", true)
            .order("display_order", { ascending: true })
            .limit(1),
        ]);
        setImages((imgs as Img[]) || []);
        setOffer((offers?.[0] as Offer) || null);
      }
      setLoading(false);
    })();
  }, [slug, previewId]);

  const personality = useMemo(() => {
    if (!hotel?.tags) return [];
    return hotel.tags
      .map((t) => PERSONALITY[t])
      .filter(Boolean)
      .slice(0, 4);
  }, [hotel]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="font-serif text-3xl text-primary mb-4">
              {ar ? "هذا المنتجع غير متاح للعرض العلني" : "This resort is not publicly listed"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {ar
                ? "متاح بطلب خاص فقط. تواصل مع Resorts Offers للحصول على عرض مُصمَّم خصيصاً."
                : "Available by private request. Contact Resorts Offers for a tailored proposal."}
            </p>
            <Link
              to={lp("/destinations")}
              className="inline-flex items-center gap-2 text-accent uppercase tracking-[0.25em] text-xs font-medium"
            >
              <ArrowLeft className="h-3 w-3" />
              {ar ? "كل المجموعات" : "All collections"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const name = ar && hotel.name_ar ? hotel.name_ar : hotel.name_en;
  const intro = ar && hotel.short_desc_ar ? hotel.short_desc_ar : hotel.short_desc_en;
  const long = ar && hotel.long_desc_ar ? hotel.long_desc_ar : hotel.long_desc_en;
  const heroSrc = safeHotelImage(hotel.hero_image_url);

  const waMsg = encodeURIComponent(
    ar
      ? `مرحباً، أرغب في طلب عرض ${hotel.name_en}.`
      : `Hello, I'd like to request the ${hotel.name_en} experience.`
  );
  const waHref = `https://wa.me/${BRAND.whatsapp}?text=${waMsg}`;

  const galleryImages = images.map((i) => ({
    url: safeHotelImage(i.image_url),
    caption: ar && i.caption_ar ? i.caption_ar : i.caption_en || "",
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{`${name} · ${BRAND.name}`}</title>
        {intro && <meta name="description" content={intro} />}
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* 1 — Full-width hero */}
        <section className="relative isolate min-h-[80vh] md:min-h-[92vh] flex items-end overflow-hidden bg-black">
          <img
            src={heroSrc}
            alt={name}
            className="absolute inset-0 -z-10 w-full h-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
          <div className="container mx-auto px-6 pb-16 md:pb-24 text-primary-foreground">
            <Link
              to={lp(`/destinations`)}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-white/75 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-3 w-3" />
              {ar ? "كل المجموعات" : "All collections"}
            </Link>
            <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-white/75 mb-4">
              {hotel.destination}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl">
              {name}
            </h1>
          </div>
        </section>

        {/* 2 — Editorial introduction (max 3-4 lines) */}
        {intro && (
          <section className="container mx-auto px-6 py-20 md:py-28 max-w-3xl text-center">
            <p className="font-serif text-2xl md:text-3xl text-primary leading-snug">
              {intro}
            </p>
          </section>
        )}

        {/* 3 — Why we selected this resort */}
        {(personality.length > 0 || long) && (
          <section className="bg-secondary/40 py-20 md:py-28">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-12 md:mb-16">
                <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-accent mb-4">
                  {ar ? "لماذا اخترناه" : "Why we selected this resort"}
                </div>
              </div>

              {personality.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 mb-12">
                  {personality.map(({ Icon, en, ar: arLine }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <Icon className="h-5 w-5 text-accent shrink-0 mt-1" />
                      <p className="font-serif text-lg text-primary leading-snug">
                        {ar ? arLine : en}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {long && (
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto">
                  {long}
                </p>
              )}
            </div>
          </section>
        )}

        {/* 4 — Curated offer OR private-request fallback */}
        <section className="container mx-auto px-6 py-20 md:py-28 max-w-3xl">
          <div className="text-center mb-10">
            <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-accent mb-4">
              {ar ? "العرض المُنسَّق" : "The Curated Offer"}
            </div>
          </div>

          {offer ? (
            <div className="border border-border bg-card p-10 md:p-14">
              <h3 className="font-serif text-2xl md:text-3xl text-primary leading-snug mb-6 text-center">
                {offer.title}
              </h3>
              {offer.description && (
                <p className="text-muted-foreground text-base leading-relaxed mb-8 text-center">
                  {offer.description}
                </p>
              )}

              {Array.isArray(offer.features) && offer.features.length > 0 && (
                <ul className="space-y-3 mb-8 max-w-md mx-auto">
                  {offer.features.map((f: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-primary"
                    >
                      <span className="text-accent mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                      <span>{typeof f === "string" ? f : f?.en || f?.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="border-t border-border pt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div className="text-center sm:text-start">
                  {offer.nights && (
                    <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                      {ar ? `${offer.nights} ليالٍ` : `${offer.nights} nights`}
                    </div>
                  )}
                  {offer.price && (
                    <div className="font-serif text-3xl text-primary">
                      {ar ? "من " : "From "}
                      <span className="text-accent">
                        {offer.currency || "USD"} {Number(offer.price).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 uppercase tracking-[0.2em] text-xs font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  {ar ? "اطلب هذه التجربة" : "Request this experience"}
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center border-t border-b border-border py-14 px-6">
              <p className="font-serif text-2xl md:text-3xl text-primary leading-snug mb-4">
                {ar
                  ? "متاح بطلب خاص فقط."
                  : "Available by private request."}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl mx-auto">
                {ar
                  ? "تواصل مع Resorts Offers للحصول على عرض مُصمَّم خصيصاً."
                  : "Contact Resorts Offers for a tailored proposal."}
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 uppercase tracking-[0.2em] text-xs font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {ar ? "اطلب عرضاً خاصاً" : "Request a private proposal"}
              </a>
            </div>
          )}
        </section>

        {/* 5 — Gallery */}
        {galleryImages.length > 0 && (
          <section className="bg-secondary/40 py-20 md:py-28">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-accent mb-4">
                  {ar ? "المعرض" : "The Gallery"}
                </div>
              </div>
              <PhotoGallery images={galleryImages} />
            </div>
          </section>
        )}

        {/* 6 — Request this experience (final CTA) */}
        <section className="container mx-auto px-6 py-24 md:py-32 max-w-2xl text-center">
          <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-accent mb-5">
            {ar ? "ابدأ المحادثة" : "Begin the conversation"}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight mb-8">
            {ar
              ? "نُنسِّق هذه التجربة لكم شخصياً."
              : "We will curate this experience, personally."}
          </h2>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 uppercase tracking-[0.2em] text-xs font-medium transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            {ar ? "اطلب هذه التجربة" : "Request this experience"}
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HotelDetail;
