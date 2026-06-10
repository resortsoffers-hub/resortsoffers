import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale } from "@/hooks/useLocale";
import { BRAND } from "@/lib/brand";
import heroImg1 from "@/assets/home-hero/IMG_0892.jpg.asset.json";
import heroImg2 from "@/assets/home-hero/IMG_9957.jpg.asset.json";
import heroImg3 from "@/assets/home-hero/IMG_9950.jpg.asset.json";
import heroImg4 from "@/assets/home-hero/IMG_8290.jpg.asset.json";

const HOME_HERO_IMAGES = [heroImg1.url, heroImg2.url, heroImg3.url, heroImg4.url];

/**
 * Homepage — luxury editorial magazine.
 *
 * Strict sections only:
 *   1. Cinematic hero + single CTA
 *   2. Curated Offers (editorial card; offers are shared privately via WhatsApp)
 *
 * No grids of destinations, no booking forms, no corporate text.
 */
const Index = () => {
  const lang = useLocale();
  const ar = lang === "ar";
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HOME_HERO_IMAGES.length), 6000);
    return () => clearInterval(t);
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{BRAND.name}</title>
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

        {/* 2 — Curated Offers (editorial card) */}
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
      </main>

      <Footer />
    </div>
  );
};

export default Index;
