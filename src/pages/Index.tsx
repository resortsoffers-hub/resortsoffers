import { Helmet } from "react-helmet-async";
import { useEffect, useState, useRef } from "react";
import { MessageCircle, Check, Heart, Users, Waves, TreePine, ArrowRight, ChevronDown, Star, Shield, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale } from "@/hooks/useLocale";
import { BRAND } from "@/lib/brand";
import aboutImg from "@/assets/uploads/browse-dhawa-ihuru-twin-island.jpeg";
import browseAyana from "@/assets/uploads/browse-ayana-ocean-beach-pool.jpg";

import browseKuda from "@/assets/uploads/browse-kuda-villingili-pool-aerial.jpg";
import browsePatina from "@/assets/uploads/browse-patina-maldives-aerial.jpg";
import browseWaldorf from "@/assets/uploads/browse-waldorf-three-bedroom-villa.jpg";
import browseRitz from "@/assets/uploads/browse-ritz-carlton-beach-cove.jpg";

// Sharpest verified Maldives photos from your uploads — used as rotating hero
const HOME_HERO_IMAGES = [browseKuda, browsePatina, browseWaldorf];

const EXPERIENCES = [
  {
    icon: Waves,
    title: "Overwater Villas",
    titleAr: "فلل فوق الماء",
    desc: "Wake above turquoise lagoons. Direct reef access, private pools, and uninterrupted horizon views.",
    descAr: "استيقظ فوق البحيرات الفيروزية. وصول مباشر إلى الشعاب، مسبح خاص، وإطلالات بحرية لا تُحجب.",
    img: browseKuda,
    alt: "Aerial view of lagoon pool villas",
    altAr: "منظر جوي لفلل ومسابح على اللاجون",
  },
  {
    icon: Users,
    title: "Family Escapes",
    titleAr: "رحلات العائلة",
    desc: "Multi-bedroom villas, kids' clubs, and curated activities designed for every generation to enjoy together.",
    descAr: "فلل متعددة الغرف، نوادي للأطفال، وأنشطة منظمة مصممة لكي يستمتع بها كل جيل معاً.",
    img: browseWaldorf,
    alt: "Three bedroom beach villa for family stays",
    altAr: "فيلا شاطئية بثلاث غرف لإقامات العائلة",
  },
  {
    icon: Heart,
    title: "Honeymoon Hideaways",
    titleAr: "ملاذات شهر العسل",
    desc: "Secluded sanctuaries with romantic dining, sunset cruises, and butler service for two.",
    descAr: "ملاذات منعزلة مع عشاء رومانسي، جولات غروب الشمس، وخدمة خاصة لشخصين.",
    img: browseRitz,
    alt: "Private beach cove for honeymoon escapes",
    altAr: "خليج شاطئي خاص لرحلات شهر العسل",
  },
  {
    icon: TreePine,
    title: "Private Islands",
    titleAr: "جزر خاصة",
    desc: "Exclusive island buyouts where your party is the only guest. Total privacy, total control.",
    descAr: "حجز جزيرة كاملة حيث ضيوفك هم الضيوف الوحيدون. خصوصية تامة، تحكم كامل.",
    img: browsePatina,
    alt: "Private island resort aerial view",
    altAr: "منظر جوي لمنتجع جزيرة خاصة",
  },
];

const DESTINATIONS = [
  {
    name: "Maldives", nameAr: "المالديف",
    desc: "Overwater villas, private sandbanks and some of the world's clearest lagoons.",
    descAr: "فلل فوق الماء، جزر رملية خاصة، ومن أصفى البحيرات في العالم.",
    season: "Nov – Apr", seasonAr: "نوفمبر – أبريل",
    flight: "4 hrs", flightAr: "٤ ساعات",
    img: browseRitz as string | undefined,
  },
  {
    name: "Seychelles", nameAr: "سيشل",
    desc: "Granite-framed beaches, rainforest walks and quiet island-hopping.",
    descAr: "شواطئ بين صخور الجرانيت، غابات استوائية، وتنقل هادئ بين الجزر.",
    season: "Apr – May · Oct – Nov", seasonAr: "أبريل – مايو · أكتوبر – نوفمبر",
    flight: "4.5 hrs", flightAr: "٤٫٥ ساعات",
    img: undefined,
  },
  {
    name: "Bali", nameAr: "بالي",
    desc: "Clifftop resorts, rice-terrace retreats and a deeply spiritual culture.",
    descAr: "منتجعات على المنحدرات، ملاذات بين حقول الأرز، وثقافة روحانية عريقة.",
    season: "Apr – Oct", seasonAr: "أبريل – أكتوبر",
    flight: "9 hrs", flightAr: "٩ ساعات",
    img: browseAyana as string | undefined,
  },
  {
    name: "Thailand", nameAr: "تايلاند",
    desc: "Phuket and Koh Samui beach villas, wellness retreats and Thai hospitality.",
    descAr: "فلل شاطئية في بوكيت وكوه ساموي، منتجعات عافية، وضيافة تايلاندية.",
    season: "Nov – Apr", seasonAr: "نوفمبر – أبريل",
    flight: "6 hrs", flightAr: "٦ ساعات",
    img: undefined,
  },
  {
    name: "Mauritius", nameAr: "موريشيوس",
    desc: "Lagoon-front resorts, golf, and family-friendly luxury in the Indian Ocean.",
    descAr: "منتجعات على البحيرة، غولف، وفخامة مناسبة للعائلات في المحيط الهندي.",
    season: "May – Dec", seasonAr: "مايو – ديسمبر",
    flight: "6.5 hrs", flightAr: "٦٫٥ ساعات",
    img: undefined,
  },
  {
    name: "Caribbean", nameAr: "الكاريبي",
    desc: "St Barts, Turks & Caicos and the Bahamas — for a once-in-a-lifetime escape.",
    descAr: "سانت بارت، تركس وكايكوس، والباهاما — لرحلة العمر.",
    season: "Dec – Apr", seasonAr: "ديسمبر – أبريل",
    flight: "14+ hrs", flightAr: "+١٤ ساعة",
    img: undefined,
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

          <div className="container mx-auto px-6 pb-20 md:pb-28">
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#C9A961] border-b border-[#C9A961]/50 pb-1 hover:text-white hover:border-white transition-colors"
            >
              <Star className="h-3.5 w-3.5" />
              {ar ? "احصل على العروض عبر واتساب" : "Get Offers on WhatsApp"}
            </a>
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
              <p className="text-[11px] uppercase tracking-[0.35em] text-accent-strong mb-4">
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
                    className="group block relative min-h-[360px] overflow-hidden bg-[#111] border border-white/5 hover:border-[#C9A961]/30 transition-all duration-500 hover:-translate-y-1"
                  >
                    <img
                      src={exp.img}
                      alt={ar ? exp.altAr : exp.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                    <div className="relative flex min-h-[360px] flex-col justify-end p-8 md:p-10">
                      <div className="mb-6 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center border border-[#C9A961]/40 bg-black/30 backdrop-blur-sm">
                          <exp.icon className="h-5 w-5 text-[#C9A961]" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-[#C9A961] group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="font-serif text-2xl mb-3 text-white group-hover:text-[#C9A961] transition-colors">
                        {ar ? exp.titleAr : exp.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {ar ? exp.descAr : exp.desc}
                      </p>
                    </div>
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
                    src={aboutImg}
                    alt="Dhawa Ihuru island, Maldives"
                    loading="lazy"
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
                <h2 className="font-serif text-4xl md:text-5xl mb-8 text-white whitespace-pre-line">
                  {ar ? "خبرة شخصية،\nمصداقية مطلقة" : "Personal expertise.\nAbsolute integrity."}
                </h2>
                <p className="text-white/70 leading-relaxed">
                  {ar
                    ? "نراجع المنتجعات التي نمثلها بأنفسنا، وتدعمنا فرق محلية في الوجهات الرئيسية وعلاقات مباشرة مع إدارات المنتجعات."
                    : "We review the resorts we represent ourselves, supported by on-ground teams across key destinations and direct relationships with resort management."}
                </p>
              </RevealSection>

            </div>
          </div>
        </section>

        {/* BY INVITATION ONLY */}
        <section className="relative isolate py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[#0a0a0a]" />


          <div className="container mx-auto px-6 text-center max-w-3xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 border border-[#C9A961]/30 px-4 py-2 mb-8">
                <Star className="h-3 w-3 text-[#C9A961]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#C9A961]">
                  {ar ? "عضوية حصرية" : "Member-Only Access"}
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl mb-6 text-white">
                {ar ? "بطلب خاص فقط" : "By Invitation Only"}
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10">
                {ar
                  ? "عروضنا لا تُعرض علنياً. تُشارك سراً مع أعضائنا — بدون قوائم عامة، وبدون أسعار مُعاد نشرها."
                  : "Our offers are never publicly listed. They are shared privately with our members — no public directories, no republished rates."}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(ar ? "أرغب في الانضمام للوصول الحصري للعروض." : "I'd like to join for exclusive offer access.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-[#04291a] hover:bg-[#1ebe5d] rounded-none px-10 py-5 font-medium uppercase tracking-[0.2em] text-xs transition-colors shadow-lg shadow-[#25D366]/20"
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
              <h2 className="font-serif text-4xl md:text-5xl text-white">
                {ar ? "حيث نُنسّق" : "Where We Curate"}
              </h2>
            </RevealSection>

            {/* Destinations with an original photo get a wide card; the rest are text cards. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[...DESTINATIONS].sort((a, b) => Number(!a.img) - Number(!b.img)).map((dest) => (
                <a
                  key={dest.name}
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(ar ? `أرغب في تلقي عروض ${dest.nameAr}.` : `I'd like to receive your ${dest.name} offers.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col border border-white/10 bg-[#111] hover:border-[#C9A961]/50 transition-colors ${dest.img ? "lg:col-span-2" : ""}`}
                >
                  {dest.img && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={dest.img}
                        alt={ar ? dest.nameAr : dest.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <h3 className="absolute bottom-4 left-5 right-5 font-serif text-3xl text-white">
                        {ar ? dest.nameAr : dest.name}
                      </h3>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {!dest.img && (
                      <h3 className="flex items-center gap-2 font-serif text-2xl text-white mb-3">
                        <MapPin className="h-5 w-5 text-[#C9A961]" />
                        {ar ? dest.nameAr : dest.name}
                      </h3>
                    )}
                    <p className="text-white/70 text-sm leading-relaxed mb-6">{ar ? dest.descAr : dest.desc}</p>
                    <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mb-6 text-xs">
                      <div>
                        <dt className="uppercase tracking-[0.2em] text-[#C9A961] mb-1">{ar ? "أفضل وقت" : "Best time"}</dt>
                        <dd className="text-white/80">{ar ? dest.seasonAr : dest.season}</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.2em] text-[#C9A961] mb-1">{ar ? "من دبي" : "From Dubai"}</dt>
                        <dd className="text-white/80">{ar ? dest.flightAr : dest.flight}</dd>
                      </div>
                    </dl>
                    <span className="mt-auto inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white group-hover:text-[#C9A961] transition-colors">
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                      {ar ? `عروض ${dest.nameAr}` : `Get ${dest.name} offers`}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* WHATSAPP OFFERS BANNER */}
        <section className="bg-background py-24 md:py-32">
          <div className="container mx-auto px-6">
            <RevealSection>
              <div className="relative max-w-3xl mx-auto border border-[#C9A961]/20 bg-[#faf9f6]">
                <div className="p-10 md:p-16 flex flex-col justify-center text-center items-center">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-accent-strong mb-4">
                    {ar ? "خدمة مخصصة" : "Personalized Service"}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl mb-4">
                    {ar ? "احصل على عروضك عبر واتساب" : "Get Your Offers on WhatsApp"}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">
                    {ar
                      ? "أخبرنا بوجهتك وتواريخك، وسنرسل لك العروض المتاحة مباشرة عبر واتساب."
                      : "Tell us your destination and dates, and we'll send the available offers straight to you on WhatsApp."}
                  </p>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(ar ? "مرحباً، أرغب في تلقي العروض المتاحة." : "Hello, I'd like to receive your available offers.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-[#0a0a0a] hover:bg-[#25D366]/90 rounded-none px-8 py-4 font-medium uppercase tracking-[0.2em] text-xs transition-colors w-fit"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {ar ? "تحدث معنا الآن" : "Message Us Now"}
                  </a>
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
