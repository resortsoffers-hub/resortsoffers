import { Helmet } from "react-helmet-async";
import { useEffect, useState, useRef } from "react";
import { MessageCircle, Check, Heart, Users, Waves, TreePine, ArrowRight, ChevronDown, Star, Shield, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale } from "@/hooks/useLocale";
import { BRAND } from "@/lib/brand";
import heroImg1 from "@/assets/home-hero/hero-seaplane.jpeg.asset.json";
import heroImg2 from "@/assets/home-hero/hero-villa.jpeg.asset.json";
import poolVilla from "@/assets/uploads/consultation-pool-villa.jpeg.asset.json";
import noraMaldives from "@/assets/uploads/resorts-offers-nora-maldives.jpeg.asset.json";

const HOME_HERO_IMAGES = [heroImg1.url, heroImg2.url];

const EXPERIENCES = [
  {
    icon: Waves,
    title: "Overwater Villas",
    titleAr: "فلل فوق الماء",
    desc: "Wake above turquoise lagoons. Direct reef access, private pools, and uninterrupted horizon views.",
    descAr: "استيقظ فوق البحيرات الفيروزية. وصول مباشر إلى الشعاب، مسبح خاص، وإطلالات بحرية لا تُحجب.",
  },
  {
    icon: Users,
    title: "Family Escapes",
    titleAr: "رحلات العائلة",
    desc: "Multi-bedroom villas, kids' clubs, and curated activities designed for every generation to enjoy together.",
    descAr: "فلل متعددة الغرف، نوادي للأطفال، وأنشطة منظمة مصممة لكي يستمتع بها كل جيل معاً.",
  },
  {
    icon: Heart,
    title: "Honeymoon Hideaways",
    titleAr: "ملاذات شهر العسل",
    desc: "Secluded sanctuaries with romantic dining, sunset cruises, and butler service for two.",
    descAr: "ملاذات منعزلة مع عشاء رومانسي، جولات غروب الشمس، وخدمة خاصة لشخصين.",
  },
  {
    icon: TreePine,
    title: "Private Islands",
    titleAr: "جزر خاصة",
    desc: "Exclusive island buyouts where your party is the only guest. Total privacy, total control.",
    descAr: "حجز جزيرة كاملة حيث ضيوفك هم الضيوف الوحيدون. خصوصية تامة، تحكم كامل.",
  },
];

const DESTINATIONS = [
  { name: "Maldives", nameAr: "المالديف" },
  { name: "Seychelles", nameAr: "سيشل" },
  { name: "Bali", nameAr: "بالي" },
  { name: "Thailand", nameAr: "تايلاند" },
  { name: "Mauritius", nameAr: "موريشيوس" },
  { name: "Caribbean", nameAr: "الكاريبي" },
];

const ABOUT_POINTS = [
  {
    en: "Our operations are supported by a network of on-ground teams across key destinations, ensuring seamless arrival coordination and well-managed local experiences.",
    ar: "تدعم عملياتنا شبكة من الفرق المحلية في الوجهات الرئيسية، مما يضمن تنسيقاً سلساً للوصول وتجارب محلية منظمة بعناية.",
  },
  {
    en: "With a strong understanding of the travel industry, we personally review and assess the resorts we represent, capturing our own insights and visual content to maintain accuracy and authenticity.",
    ar: "نحن نراجع ونقّيم المنتجعات التي نمثلها بشكل شخصي، مستفيدين من فهمنا العميق لصناعة السفر، ونقوم بتوثيق رؤى ومحتوى بصري خاص بنا للحفاظ على الدقة والأصالة.",
  },
  {
    en: "We continuously monitor and update the level of services provided, allowing us to recommend options with confidence and clarity.",
    ar: "نراقب ونحدّث باستمرار مستوى الخدمات المقدمة، مما يتيح لنا تقديم توصيات بثقة ووضوح.",
  },
  {
    en: "Our established relationships with resort management teams enable efficient communication and smooth handling of our clients' requirements at every stage.",
    ar: "تمكّننا علاقاتنا الراسخة مع فرق إدارة المنتجعات من التواصل بكفاءة وإدارة متطلبات عملائنا بسلاسة في كل مرحلة.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const RevealSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};

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

  const waExperience = (exp: string) =>
    encodeURIComponent(ar ? `مرحباً، أنا مهتم بـ ${exp}.` : `Hello, I'm interested in ${exp}.`);

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
        {/* HERO */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
          </div>

          <div className="container mx-auto px-6 pb-16 md:pb-28">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#C9A961] mb-6">
                {ar ? "دار سفر فاخرة خاصة" : "A Private Luxury Travel House"}
              </p>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.02] mb-8">
                {ar ? "رحلات تُروى،\nلا تُباع." : "Journeys,\nquietly curated."}
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed">
                {ar
                  ? "نحن لا نبيع الرحلات. نحن نصيغها — بعناية، سرية، وخبرة شخصية."
                  : "We don't sell trips. We craft them — with care, discretion, and personal expertise."}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white hover:bg-[#1ebe5d] rounded-none px-10 py-5 font-medium uppercase tracking-[0.2em] text-xs transition-colors shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  {ar ? "ابدأ رحلتك" : "Begin your journey"}
                </a>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(ar ? "أريد حجز استشارة مدفوعة بقيمة 200 دولار." : "I'd like to book a $200 paid consultation.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 rounded-none px-8 py-5 font-medium uppercase tracking-[0.15em] text-[11px] transition-colors"
                >
                  <Star className="h-4 w-4 text-[#C9A961]" />
                  {ar ? "استشارة بـ 200$" : "$200 Consultation"}
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-white/40" />
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="bg-[#0a0a0a] border-b border-white/5">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { icon: Shield, label: ar ? "استشارية خاصة" : "Private Advisory" },
                { icon: Star, label: ar ? "منتجعات مُدققة" : "Verified Resorts" },
                { icon: MapPin, label: ar ? "علاقات مباشرة" : "Direct Relationships" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-white/60">
                  <item.icon className="h-4 w-4 text-[#C9A961]" />
                  <span className="text-[11px] uppercase tracking-[0.25em]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIGNATURE EXPERIENCES */}
        <section className="bg-background py-24 md:py-32">
          <div className="container mx-auto px-6">
            <RevealSection className="text-center mb-16">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#C9A961] mb-4">
                {ar ? "ما نقدمه" : "What We Curate"}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                {ar ? "تجارب مميزة" : "Signature Experiences"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                {ar
                  ? "كل رحلة تُصمم حول ما تريده أنت — لا حزم جاهزة، لا قوائم عامة."
                  : "Every journey is designed around what you want — no pre-packaged bundles, no public lists."}
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {EXPERIENCES.map((exp, i) => (
                <RevealSection key={exp.title} className={`${i % 2 === 1 ? "md:mt-12" : ""}`}>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${waExperience(ar ? exp.titleAr : exp.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative bg-[#111] border border-white/5 hover:border-[#C9A961]/30 p-8 md:p-10 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center border border-[#C9A961]/20">
                        <exp.icon className="h-5 w-5 text-[#C9A961]" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-[#C9A961] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-serif text-2xl mb-3 group-hover:text-[#C9A961] transition-colors">
                      {ar ? exp.titleAr : exp.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {ar ? exp.descAr : exp.desc}
                    </p>
                  </a>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT — EDITORIAL SPLIT */}
        <section className="bg-[#0a0a0a] py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <RevealSection>
                <div className="relative">
                  <img
                    src={poolVilla.url}
                    alt="Luxury pool villa"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9A961] mb-2">
                      {ar ? "خبرة ميدانية" : "On-Ground Expertise"}
                    </p>
                    <p className="text-white/80 text-sm">
                      {ar
                        ? "نزور المنتجعات بشكل شخصي قبل أن نوصي بها."
                        : "We visit resorts personally before we recommend them."}
                    </p>
                  </div>
                </div>
              </RevealSection>

              <RevealSection>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#C9A961] mb-4">
                  {ar ? "من نحن" : "About Us"}
                </p>
                <h2 className="font-serif text-4xl md:text-5xl mb-10">
                  {ar ? "خبرة شخصية،\nمصداقية مطلقة" : "Personal expertise.\nAbsolute integrity."}
                </h2>
                <div className="space-y-8">
                  {ABOUT_POINTS.map((pt, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="text-[#C9A961] font-serif text-2xl shrink-0 w-8">0{i + 1}</span>
                      <p className="text-white/70 leading-relaxed pt-1">
                        {ar ? pt.ar : pt.en}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* BY INVITATION ONLY */}
        <section className="relative isolate py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img src={noraMaldives.url} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          </div>
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 border border-[#C9A961]/30 px-4 py-2 mb-8">
                <Star className="h-3 w-3 text-[#C9A961]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#C9A961]">
                  {ar ? "عضوية حصرية" : "Member-Only Access"}
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl mb-6">
                {ar ? "بطلب خاص فقط" : "By Invitation Only"}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                {ar
                  ? "عروضنا لا تُعرض علنياً. تُشارك سراً مع أعضائنا — بدون قوائم عامة، وبدون أسعار مُعاد نشرها."
                  : "Our offers are never publicly listed. They are shared privately with our members — no public directories, no republished rates."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(ar ? "أرغب في الانضمام للوصول الحصري للعروض." : "I'd like to join for exclusive offer access.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white hover:bg-[#1ebe5d] rounded-none px-10 py-5 font-medium uppercase tracking-[0.2em] text-xs transition-colors shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  {ar ? "اطلب العضوية" : "Request Membership"}
                </a>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* DESTINATIONS */}
        <section className="bg-[#0a0a0a] py-24 md:py-32">
          <div className="container mx-auto px-6">
            <RevealSection className="text-center mb-16">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#C9A961] mb-4">
                {ar ? "الوجهات" : "Destinations"}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl">
                {ar ? "حيث نُنسّق" : "Where We Curate"}
              </h2>
            </RevealSection>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10 max-w-5xl mx-auto">
              {DESTINATIONS.map((dest) => (
                <a
                  key={dest.name}
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(ar ? `أرغب في معرفة المزيد عن ${dest.nameAr}.` : `I'd like to know more about ${dest.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#0a0a0a] p-8 text-center hover:bg-[#141414] transition-colors"
                >
                  <MapPin className="h-5 w-5 text-[#C9A961] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {ar ? dest.nameAr : dest.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PAID CONSULTATION BANNER */}
        <section className="bg-background py-24 md:py-32">
          <div className="container mx-auto px-6">
            <RevealSection>
              <div className="relative max-w-5xl mx-auto border border-[#C9A961]/20 bg-[#faf9f6]">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-10 md:p-16 flex flex-col justify-center">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-[#C9A961] mb-4">
                      {ar ? "خدمة مخصصة" : "Personalized Service"}
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl mb-4">
                      {ar ? "استشارة سفر مدفوعة" : "Paid Travel Consultation"}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {ar
                        ? "جلسة شخصية مع نورة الخليفي لتحديد الخيارات المثالية لرحلتك. $200 تُسترد عند تأكيد الحجز."
                        : "A private session with Nora El Khalifi to identify the perfect options for your trip. $200 is credited back upon booking confirmation."}
                    </p>
                    <div className="flex items-baseline gap-3 mb-8">
                      <span className="font-serif text-5xl text-[#C9A961]">$200</span>
                      <span className="text-muted-foreground text-sm">{ar ? "لكل استشارة" : "per consultation"}</span>
                    </div>
                    <a
                      href="/book-consultation"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-4 font-medium uppercase tracking-[0.2em] text-xs transition-colors w-fit"
                    >
                      {ar ? "احجز استشارتك" : "Book Your Consultation"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="relative hidden lg:block">
                    <img
                      src={noraMaldives.url}
                      alt="Nora in Maldives"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
