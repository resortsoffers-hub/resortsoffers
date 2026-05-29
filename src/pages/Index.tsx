import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MessageCircle, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddedValuesSlider from "@/components/AddedValuesSlider";
import { Button } from "@/components/ui/button";
import { useLocale, useLocalePath } from "@/hooks/useLocale";

/**
 * Homepage — verified-only mode.
 *
 * All previous hardcoded resort cards, destination tiles with AI imagery,
 * and "featured offers" with invented prices have been removed. They were
 * pairing real luxury hotel names (Soneva, Atlantis, Raffles, Four Seasons…)
 * with generic stock / AI visuals — unacceptable for our audience.
 *
 * Real listings only return once a property has been entered through the
 * CMS at /admin/hotels with official photography and approved publish.
 */
const WA = "971567622484";

const Index = () => {
  const lang = useLocale();
  const lp = useLocalePath();
  const ar = lang === "ar";

  const waMsg = encodeURIComponent(
    ar
      ? "مرحباً، أرغب في الحصول على توصيات شخصية لمنتجع فاخر."
      : "Hello, I'd like personal recommendations for a verified luxury resort."
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{ar ? "ريزورتس أوفرز · استشارة فاخرة خاصة" : "Resort Offers · Private Luxury Advisory"}</title>
        <meta
          name="description"
          content={
            ar
              ? "استشارة سفر فاخرة خاصة. توصيات شخصية لمنتجعات موثقة فقط."
              : "Private luxury travel advisory. Personal recommendations for verified resorts only."
          }
        />
        <link rel="canonical" href="https://resortsoffers.com/" />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* Hero — text only, no fake hotel photo */}
        <section className="bg-primary text-primary-foreground pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              {ar ? "استشارة فاخرة خاصة" : "Private luxury advisory"}
            </div>
            <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-5">
              {ar
                ? "منتجعات موثقة. مختارة بعناية. لا صور عامة."
                : "Verified resorts. Hand-picked. No generic photography."}
            </h1>
            <p className="text-primary-foreground/85 text-base md:text-lg leading-relaxed mb-8">
              {ar
                ? "نحن نُعيد بناء كتالوج المنتجعات الشريكة باستخدام صور رسمية فقط من المنتجع ومحتوى أصلي لكل عقار. تواصل مباشرة مع مستشار للحصول على توصية شخصية."
                : "We're rebuilding our partner catalogue using only official property photography and original content per resort. Speak directly with an advisor for a personal recommendation."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${WA}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-md px-6 py-3 font-medium transition-colors shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                {ar ? "تحدث مع مستشار" : "Speak to an advisor"}
              </a>
              <Link to={lp("/hotels")}>
                <Button
                  variant="outline"
                  className="px-6 py-3 h-auto border-white/40 bg-transparent text-white hover:bg-white hover:text-primary"
                >
                  {ar ? "تصفح المنتجعات المعتمدة" : "Browse verified resorts"}
                  <ArrowRight className="h-4 w-4 ms-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-sm text-muted-foreground text-center">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {ar ? "صور رسمية فقط من المنتجع" : "Only official property photography"}
            </span>
            <span className="hidden md:inline text-border">|</span>
            <span>{ar ? "محتوى أصلي لكل منتجع" : "Original content per resort"}</span>
            <span className="hidden md:inline text-border">|</span>
            <span>{ar ? "لا منصة حجز — استشارة شخصية" : "Not a booking engine — personal advisory"}</span>
          </div>
        </section>

        {/* Added values slider — generic luxury perks, no hotel-specific imagery */}
        <AddedValuesSlider />

        {/* Curation notice — replaces previous fake destination grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">
              {ar ? "الكتالوج قيد التحديث" : "Our catalogue is being curated"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {ar
                ? "نُفضّل عرض عدد قليل من المنتجعات بصور موثقة وكاملة بدلاً من قائمة طويلة من العقارات بصور غير دقيقة. تواصل معنا للحصول على توصيات مخصصة لرحلتك."
                : "We'd rather present a small number of resorts with complete, verified photography than a long directory of properties with inaccurate visuals. Reach out for tailored recommendations for your trip."}
            </p>
            <a
              href={`https://wa.me/${WA}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-md px-6 py-3 font-medium transition-colors shadow-sm"
            >
              <MessageCircle className="h-4 w-4" />
              {ar ? "تواصل عبر واتساب" : "Contact us on WhatsApp"}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
