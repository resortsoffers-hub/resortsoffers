import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MessageCircle, ArrowRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddedValuesSlider from "@/components/AddedValuesSlider";
import HomeInquiryForm from "@/components/HomeInquiryForm";
import { Button } from "@/components/ui/button";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { DESTINATIONS } from "@/lib/destinations";
import { HOTEL_CATEGORIES } from "@/lib/hotelCategories";
import { BRAND } from "@/lib/brand";
import { supabase } from "@/integrations/supabase/client";
import { fallbackHotelImage, safeHotelImage } from "@/lib/safeImage";
import heroImg1 from "@/assets/home-hero/IMG_0892.jpg.asset.json";
import heroImg2 from "@/assets/home-hero/IMG_9957.jpg.asset.json";
import heroImg3 from "@/assets/home-hero/IMG_9950.jpg.asset.json";
import heroImg4 from "@/assets/home-hero/IMG_8290.jpg.asset.json";

const HOME_HERO_IMAGES = [heroImg1.url, heroImg2.url, heroImg3.url, heroImg4.url];

/**
 * Homepage — destination-first, concierge-style.
 *
 * Section order (locked):
 *   1. Hero
 *   2. Trust strip
 *   3. Luxury destinations
 *   4. Curated collections
 *   5. Featured resorts (only if ≥1 verified resort exists)
 *   6. Why choose us (AddedValuesSlider)
 *   7. WhatsApp CTA band
 *   8. Inquiry form
 */
const Index = () => {
  const lang = useLocale();
  const lp = useLocalePath();
  const ar = lang === "ar";

  const [heroByDest, setHeroByDest] = useState<Record<string, string>>({});
  const [featured, setFeatured] = useState<
    { id: string; slug: string; name_en: string; name_ar: string | null; destination: string; hero_image_url: string | null }[]
  >([]);
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((s) => (s + 1) % HOME_HERO_IMAGES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("hotels")
        .select("id,slug,name_en,name_ar,destination,hero_image_url,display_order")
        .eq("is_published", true)
        .order("display_order", { ascending: false })
        .limit(50);
      const heroes: Record<string, string> = {};
      for (const h of data || []) {
        const k = (h.destination || "").toLowerCase();
        if (!heroes[k] && h.hero_image_url) heroes[k] = h.hero_image_url;
      }
      setHeroByDest(heroes);
      setFeatured(((data as typeof featured) || []).filter((h) => h.hero_image_url).slice(0, 3));
    })();
  }, []);

  const waMsg = encodeURIComponent(
    ar
      ? "مرحباً، أرغب في الحصول على توصيات شخصية لمنتجع فاخر."
      : "Hello, I'd like personal recommendations for a verified luxury resort."
  );

  // Luxury Collections — private members-club groupings
  const collections = [
    { slug: "honeymoon", label_en: "Romantic Escapes", label_ar: "رحلات رومانسية" },
    { slug: "adults-only", label_en: "Adults-Only Hideaways", label_ar: "ملاذات للبالغين فقط" },
    { slug: "family", label_en: "Family Luxury Collection", label_ar: "مجموعة العائلة الفاخرة" },
    { slug: "villas", label_en: "Private Villa Collection", label_ar: "مجموعة الفلل الخاصة" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{ar ? `${BRAND.name} · ${BRAND.taglineAr}` : `${BRAND.name} · ${BRAND.tagline}`}</title>
        <meta
          name="description"
          content={
            ar
              ? "استشارة سفر فاخرة خاصة. رحلات استثنائية مخصصة حسب ذوقك."
              : "Private luxury travel advisory. Exceptional journeys designed exclusively for you."
          }
        />
        <link rel="canonical" href={`https://${BRAND.domain}/`} />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* 1. Hero with photo slideshow */}
        <section className="relative isolate text-primary-foreground pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
          {/* Background slideshow */}
          <div className="absolute inset-0 -z-10 bg-black">
            {HOME_HERO_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
                  i === heroSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
          </div>
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-block uppercase tracking-[0.25em] text-[10px] md:text-xs text-white/70 mb-6">
              {ar ? "— استشارة فاخرة خاصة —" : "— Private Luxury Advisory —"}
            </div>
            <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-5">
              {ar
                ? "سفر فاخر مُصمّم حولك"
                : "Bespoke Luxury Travel, Designed Around You"}
            </h1>
            <p className="text-primary-foreground/85 text-base md:text-lg leading-relaxed mb-8">
              {ar
                ? "مستشارو السفر لدينا يصمّمون كل رحلة باهتمام استثنائي بالتفاصيل، لضمان تجربة فاخرة لا تُنسى."
                : "Our travel advisors curate every journey with exceptional attention to detail, ensuring a seamless and unforgettable luxury experience."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={lp("/destinations")}>
                <Button className="px-6 py-3 h-auto bg-white text-primary hover:bg-white/90">
                  {ar ? "استكشف الوجهات" : "Explore destinations"}
                  <ArrowRight className="h-4 w-4 ms-2" />
                </Button>
              </Link>
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-md px-6 py-3 font-medium transition-colors shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                {ar ? "تحدث مع مستشار" : "Speak to an advisor"}
              </a>
            </div>
          </div>
        </section>




        {/* 5. Featured resorts — only when verified data exists */}
        {featured.length > 0 && (
          <section className="py-20 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">
                  {ar ? "منتجعات مميزة" : "Featured resorts"}
                </h2>
                <p className="text-muted-foreground">
                  {ar ? "كل صورة هنا رسمية وموثقة." : "Every photo here is official and verified."}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((h) => {
                  const name = ar && h.name_ar ? h.name_ar : h.name_en;
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
                          onError={fallbackHotelImage}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                          {h.destination}
                        </div>
                        <h3 className="font-serif text-xl text-primary">{name}</h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 6. Why choose us */}
        <AddedValuesSlider />

        {/* 7. WhatsApp CTA band */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="font-serif text-2xl md:text-3xl mb-3">
              {ar ? "احصل على توصية شخصية" : "Get a personal recommendation"}
            </h2>
            <p className="text-primary-foreground/85 mb-6">
              {ar
                ? "أخبرنا عن رحلتك وسنرشّح لك المنتجعات المناسبة فقط."
                : "Tell us about your trip and we'll shortlist only what fits."}
            </p>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-md px-6 py-3 font-medium transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              {ar ? "تواصل عبر واتساب" : "Message us on WhatsApp"}
            </a>
          </div>
        </section>

        {/* 8. Inquiry form */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl text-primary mb-3">
                {ar ? "أو اترك لنا تفاصيلك" : "Or leave us your details"}
              </h2>
              <p className="text-muted-foreground">
                {ar ? "سيتواصل معك مستشار خلال 24 ساعة." : "An advisor will reach out within 24 hours."}
              </p>
            </div>
            <HomeInquiryForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
