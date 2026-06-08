import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLocale, useLocalePath } from "@/hooks/useLocale";

/**
 * Packages — verified-only mode.
 *
 * The previous hardcoded packagesData array tied real hotel brands to
 * generic/AI imagery and invented pricing. Removed entirely. Real packages
 * will return only when sourced from the CMS with verified hotel records.
 */
const WA = "971567622484";

const Packages = () => {
  const lang = useLocale();
  const lp = useLocalePath();
  const ar = lang === "ar";
  const waMsg = encodeURIComponent(
    ar
      ? "مرحباً، أرغب في الحصول على باقة سفر فاخرة موثقة."
      : "Hello, I'd like a tailored luxury holiday package."
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{ar ? "الباقات" : "Holiday Packages"} · Resort Offers</title>
        <meta
          name="description"
          content={
            ar
              ? "باقات سفر فاخرة مخصصة. تواصل مع مستشار للحصول على عرض موثق."
              : "Tailored luxury holiday packages. Speak to an advisor for a verified proposal."
          }
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <div className="inline-block uppercase tracking-[0.25em] text-[10px] md:text-xs text-primary/70 mb-6">
            {ar ? "— تحت التنسيق —" : "— Currently Being Curated —"}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-primary mb-5 leading-tight">
            {ar ? "الباقات قيد التحديث" : "Packages are being refreshed"}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-3">
            {ar
              ? "نُعيد بناء باقاتنا باستخدام منتجعات معتمدة فقط — بصور رسمية وأسعار محدّثة من شركائنا. خلال هذه المرحلة، يقدم مستشارونا توصيات شخصية لكل رحلة."
              : "We're rebuilding our packages around verified resorts only — with official photography and live partner pricing. In the meantime our advisors will tailor a proposal to your trip."}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-10">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            {ar ? "لا أسعار وهمية — لا صور عامة" : "No invented pricing — no generic photography"}
          </div>
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
              <Button variant="outline" className="px-6 py-3 h-auto">
                {ar ? "تصفح المنتجعات المعتمدة" : "Browse verified resorts"}
                <ArrowRight className="h-4 w-4 ms-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Packages;
