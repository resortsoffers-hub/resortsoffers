import { Crown, Sparkles, Compass, Gem } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

/**
 * Exclusive Member Privileges
 *
 * Replaces the previous "Complimentary Benefits" image slider, which relied on
 * AI-generated photography. Per the Resorts Offers Image & Media Policy, no
 * AI imagery is permitted anywhere on the site. This section is intentionally
 * text-first and conveys the private members-club tone: exclusivity, privacy,
 * bespoke service. When verified official lifestyle imagery is available from
 * hotel media centres, a future revision may reintroduce a curated visual layer.
 */
const AddedValuesSlider = () => {
  const lang = useLocale();
  const ar = lang === "ar";

  const pillars = [
    {
      icon: Crown,
      title_en: "Private Member Access",
      title_ar: "وصول حصري للأعضاء",
      desc_en: "Curated rates, suite upgrades and amenities reserved for our members.",
      desc_ar: "أسعار مختارة، ترقيات أجنحة ومزايا حصرية لأعضائنا.",
    },
    {
      icon: Gem,
      title_en: "Bespoke Travel Planning",
      title_ar: "تخطيط سفر مخصص",
      desc_en: "Every itinerary is hand-crafted by your personal luxury advisor.",
      desc_ar: "كل برنامج رحلة يُصمَّم بعناية من قِبَل مستشارك الشخصي.",
    },
    {
      icon: Sparkles,
      title_en: "Exceptional Added Values",
      title_ar: "مزايا استثنائية مضافة",
      desc_en: "Complimentary privileges thoughtfully arranged for every stay.",
      desc_ar: "امتيازات مجانية مرتبة بعناية لكل إقامة.",
    },
    {
      icon: Compass,
      title_en: "Discreet Concierge",
      title_ar: "كونسيرج خاص",
      desc_en: "A single trusted point of contact — before, during and after your trip.",
      desc_ar: "نقطة تواصل واحدة موثوقة قبل وأثناء وبعد رحلتك.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#0f2440] via-[#1e3a5f] to-[#0f2440] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/85 text-xs font-medium tracking-wider uppercase mb-5">
            <Crown className="h-3.5 w-3.5" />
            {ar ? "امتيازات الأعضاء الحصرية" : "Exclusive Member Privileges"}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
            {ar
              ? "تجارب فاخرة منسقة، تخطيط سفر مخصص"
              : "Curated luxury experiences, bespoke travel planning"}
          </h2>
          <p className="text-white/75 text-base md:text-lg leading-relaxed">
            {ar
              ? "ومزايا استثنائية مضافة لكل إقامة."
              : "and exceptional added values for every stay."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title_en}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-7 hover:bg-white/[0.07] hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/15 transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif text-xl mb-2">
                  {ar ? p.title_ar : p.title_en}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {ar ? p.desc_ar : p.desc_en}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AddedValuesSlider;
