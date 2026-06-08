import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { useLocale, useLocalePath } from "@/hooks/useLocale";

/**
 * Partner Hotels — TEMPORARILY OFFLINE
 *
 * The previous catalog has been taken down because it used duplicated /
 * generic visuals across different resorts, which damaged brand trust.
 *
 * Per the project's Authentic Imagery Quality Gate, no hotel will appear
 * here again until it has:
 *   - one verified original hero image unique to that property
 *   - unique EN + AR copy written in our brand voice
 *
 * The curated collection is being rebuilt gradually through the CMS at
 * /admin/hotels and surfaced publicly at /en/hotels and /ar/hotels once
 * the first verified entries are published.
 */
const WA = "971567622484";

const PartnerHotels = () => {
  const lang = useLocale();
  const lp = useLocalePath();
  const ar = lang === "ar";

  const waMsg = encodeURIComponent(
    ar
      ? "مرحباً، أرغب في الحصول على توصيات لمنتجعات فاخرة موثقة."
      : "Hello, I'd like personal recommendations for verified luxury resorts."
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{ar ? "المنتجعات الشريكة" : "Partner Resorts"} · Resort Offers</title>
        <meta
          name="description"
          content={
            ar
              ? "مجموعتنا المنتقاة من المنتجعات الفاخرة قيد التحديث. تواصل معنا للحصول على توصيات شخصية."
              : "Our curated luxury collection is being refreshed. Speak to an advisor for personal recommendations."
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
            {ar
              ? "مجموعتنا الفاخرة قيد التحديث"
              : "Our curated luxury collection is being refreshed"}
          </h1>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
            {ar
              ? "تُعدّ مجموعتنا من المنتجعات الشريكة بعناية، منزلاً واحداً في كل مرة. يُسعد مستشارينا تنسيق إقامتك القادمة بشكل خاص."
              : "Our partner-resort collection is being composed with care, one property at a time. In the meantime, our advisors will privately arrange your next stay."}
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
            <Link to={lp("/packages")}>
              <Button variant="outline" className="px-6 py-3 h-auto">
                {ar ? "تصفح الباقات" : "Browse holiday packages"}
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

export default PartnerHotels;
