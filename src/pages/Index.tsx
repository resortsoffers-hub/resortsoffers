import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { MessageCircle, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale } from "@/hooks/useLocale";
import { BRAND } from "@/lib/brand";
import heroImg1 from "@/assets/home-hero/hero-seaplane.jpeg.asset.json";
import heroImg2 from "@/assets/home-hero/hero-villa.jpeg.asset.json";

const HOME_HERO_IMAGES = [heroImg1.url, heroImg2.url];

/**
 * Homepage — luxury editorial magazine.
 * Cinematic hero with a single WhatsApp CTA. Nothing else.
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
                className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5d] rounded-none px-8 py-4 font-medium uppercase tracking-[0.2em] text-xs transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {ar ? "ابدأ رحلتك" : "Begin your journey"}
              </a>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
              {ar ? "من نحن" : "About Us"}
            </h2>
            <ul className="space-y-6">
              {[
                ar
                  ? "تدعم عملياتنا شبكة من الفرق المحلية في الوجهات الرئيسية، مما يضمن تنسيقاً سلساً للوصول وتجارب محلية منظمة بعناية."
                  : "Our operations are supported by a network of on-ground teams across key destinations, ensuring seamless arrival coordination and well-managed local experiences.",
                ar
                  ? "نحن نراجع ونقّيم المنتجعات التي نمثلها بشكل شخصي، مستفيدين من فهمنا العميق لصناعة السفر، ونقوم بتوثيق رؤى ومحتوى بصري خاص بنا للحفاظ على الدقة والأصالة."
                  : "With a strong understanding of the travel industry, we personally review and assess the resorts we represent, capturing our own insights and visual content to maintain accuracy and authenticity.",
                ar
                  ? "نراقب ونحدّث باستمرار مستوى الخدمات المقدمة، مما يتيح لنا تقديم توصيات بثقة ووضوح."
                  : "We continuously monitor and update the level of services provided, allowing us to recommend options with confidence and clarity.",
                ar
                  ? "تمكّننا علاقاتنا الراسخة مع فرق إدارة المنتجعات من التواصل بكفاءة وإدارة متطلبات عملائنا بسلاسة في كل مرحلة."
                  : "Our established relationships with resort management teams enable efficient communication and smooth handling of our clients' requirements at every stage.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <Check className="h-5 w-5 mt-1 text-[#C9A961] shrink-0" />
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
