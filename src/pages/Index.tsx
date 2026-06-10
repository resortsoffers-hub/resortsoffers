import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { BRAND } from "@/lib/brand";
import { supabase } from "@/integrations/supabase/client";
import { safeHotelImage, PLACEHOLDER } from "@/lib/safeImage";
import heroImg1 from "@/assets/home-hero/IMG_0892.jpg.asset.json";
import heroImg2 from "@/assets/home-hero/IMG_9957.jpg.asset.json";
import heroImg3 from "@/assets/home-hero/IMG_9950.jpg.asset.json";
import heroImg4 from "@/assets/home-hero/IMG_8290.jpg.asset.json";

const HOME_HERO_IMAGES = [heroImg1.url, heroImg2.url, heroImg3.url, heroImg4.url];

type FeaturedHotel = {
  slug: string;
  name_en: string;
  name_ar: string | null;
  short_desc_en: string | null;
  short_desc_ar: string | null;
  hero_image_url: string | null;
};

/**
 * Homepage — luxury editorial magazine.
 *
 * Strict sections only:
 *   1. Cinematic hero + single CTA
 *   2. Handpicked Featured Resorts (CMS-approved only — empty editorial state otherwise)
 *   3. Curated Offers (editorial card; offers are shared privately via WhatsApp)
 *   4. Private Collection note ("Available by private request only.")
 *
 * No grids of destinations, no booking forms, no corporate text.
 */
const Index = () => {
  const lang = useLocale();
  const lp = useLocalePath();
  const ar = lang === "ar";
  const [slide, setSlide] = useState(0);
  const [resorts, setResorts] = useState<FeaturedHotel[]>([]);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HOME_HERO_IMAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const { data } = await supabase
        .from("hotels")
        .select("slug,name_en,name_ar,short_desc_en,short_desc_ar,hero_image_url")
        .eq("is_published", true)
        .order("display_order", { ascending: true, nullsFirst: false })
        .limit(6);
      if (!cancel && data) setResorts(data as FeaturedHotel[]);
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const waMsg = encodeURIComponent(
    ar
      ? "مرحباً، أرغب في ترتيب جلسة تنسيق سفر خاصة."
      : "Hello, I'd like to arrange a private travel curation session."
  );
  const waOffers = encodeURIComponent(
    ar
      ? "مرحباً، أرغب في الاطلاع على العروض المنسّقة الحالية."
      : "Hello, I'd like to receive the current curated offers."
  );
  const waPrivate = encodeURIComponent(
    ar
      ? "مرحباً، أرغب في الاستفسار عن منتجعات المجموعة الخاصة."
      : "Hello, I'd like to enquire about the Private Collection resorts."
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{ar ? `${BRAND.name} · ${BRAND.taglineAr}` : `${BRAND.name} · ${BRAND.tagline}`}</title>
        <meta
          name="description"
          content={
            ar
              ? "دار سفر فاخرة خاصة. رحلات استثنائية مُنسّقة بعناية."
              : "A private luxury travel house. Exceptional journeys, quietly curated."
          }
        />
        <link rel="canonical" href={`https://${BRAND.domain}/`} />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* 1 — Cinematic hero */}
        <section className="relative isolate text-primary-foreground min-h-[calc(100vh-3.5rem)] flex items-end overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-black">
            {HOME_HERO_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
                  i === slide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
          </div>

          <div className="container mx-auto px-6 pb-16 md:pb-24">
            <div className="max-w-2xl">
              <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-white/75 mb-5">
                {ar ? "دار سفر فاخرة خاصة" : "A Private Luxury Travel House"}
              </div>
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-8">
                {ar ? "رحلات تُروى، لا تُباع." : "Journeys, quietly curated."}
              </h1>
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 rounded-none px-8 py-4 font-medium uppercase tracking-[0.2em] text-xs transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {ar ? "ابدأ رحلتك" : "Begin your journey"}
              </a>
            </div>
          </div>
        </section>

        {/* 2 — Handpicked Featured Resorts */}
        <section className="bg-background py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 md:mb-20">
              <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-accent mb-4">
                {ar ? "منتجعات مختارة بعناية" : "Handpicked Featured Resorts"}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight">
                {ar ? "بيوت نثق بها، ونوصي بها بهدوء." : "Houses we trust, quietly recommended."}
              </h2>
            </div>

            {resorts.length === 0 ? (
              <div className="max-w-xl mx-auto text-center text-muted-foreground">
                <p className="text-base md:text-lg leading-relaxed mb-8">
                  {ar
                    ? "نختار كل منتجع شخصياً. سنكشف الستار عن المجموعة الافتتاحية فور اكتمال صورها الرسمية وعروضها المعتمدة."
                    : "Every resort is chosen personally. Our opening collection is unveiled only once official photography and approved offers are complete."}
                </p>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 uppercase tracking-[0.25em] text-xs font-medium"
                >
                  {ar ? "تحدّث مع منسّق خاص" : "Speak with a curator"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
                {resorts.map((r) => {
                  const name = ar ? r.name_ar || r.name_en : r.name_en;
                  const blurb = ar ? r.short_desc_ar : r.short_desc_en;
                  const img = safeHotelImage(r.hero_image_url);
                  return (
                    <Link
                      key={r.slug}
                      to={lp(`/hotels/${r.slug}`)}
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-5">
                        <img
                          src={img}
                          alt={name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-primary mb-2 leading-tight">
                        {name}
                      </h3>
                      {blurb && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                          {blurb}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-2 text-accent uppercase tracking-[0.25em] text-[11px] font-medium">
                        {ar ? "اطّلع على العرض" : "View Offer"}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 3 — Curated Offers (editorial card) */}
        <section className="relative isolate text-primary-foreground py-28 md:py-40 overflow-hidden">
          <img
            src={HOME_HERO_IMAGES[1]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 w-full h-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-black/55" />
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-white/70 mb-5">
              {ar ? "العروض المُنسّقة" : "Curated Offers"}
            </div>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
              {ar
                ? "تُكتب العروض كقصص، وتُشارك كأسرار."
                : "Written like a story. Shared like a secret."}
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10">
              {ar
                ? "كل عرض مُصاغ بعناية، يُقدَّم بشكل خاص لأعضائنا — لا قوائم عامة، ولا أسعار مكررة."
                : "Each offer is shaped by hand and shared privately with our members — no public lists, no recycled rates."}
            </p>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${waOffers}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-8 py-4 uppercase tracking-[0.2em] text-xs font-medium transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              {ar ? "اطلب العروض الحالية" : "Request current offers"}
            </a>
          </div>
        </section>

        {/* 4 — Private Collection */}
        <section className="bg-background py-24 md:py-32">
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <div className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-accent mb-5">
              {ar ? "المجموعة الخاصة" : "The Private Collection"}
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight mb-6">
              {ar ? "بعض المنتجعات لا تُعرض علناً." : "Some resorts are never shown publicly."}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              {ar
                ? "متاحة بطلب خاص فقط."
                : "Available by private request only."}
            </p>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${waPrivate}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 uppercase tracking-[0.2em] text-xs font-medium transition-colors"
            >
              {ar ? "اطلب الوصول الخاص" : "Request private access"}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
