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
 * Homepage — luxury magazine cover.
 * Full-bleed photography, minimal copy, ONE call to action.
 * No sections. No grids. No forms. The page is the photograph.
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
        {/* Magazine cover — full-viewport photograph + one CTA */}
        <section className="relative isolate text-primary-foreground min-h-[calc(100vh-4rem)] flex items-end overflow-hidden">
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
      </main>

      <Footer />
    </div>
  );
};

export default Index;
