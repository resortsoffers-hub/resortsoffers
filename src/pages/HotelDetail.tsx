import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { safeHotelImage } from "@/lib/safeImage";
import {
  MapPin, MessageCircle, Loader2, ArrowLeft,
  Home, UtensilsCrossed, Sparkles, Waves, Users, Heart,
  Plane, Camera, Video, Tag, Mail, Download, FileText,
} from "lucide-react";

const QUICK_LINKS: { id: string; en: string; ar: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "location",   en: "Location",            ar: "الموقع",            Icon: MapPin },
  { id: "villa",      en: "Villas & Suites",     ar: "الفلل والأجنحة",     Icon: Home },
  { id: "dining",     en: "Restaurants & Bars",  ar: "المطاعم والبارات",   Icon: UtensilsCrossed },
  { id: "spa",        en: "Spa & Wellness",      ar: "السبا والعافية",     Icon: Sparkles },
  { id: "experience", en: "Activities",          ar: "الأنشطة والرحلات",   Icon: Waves },
  { id: "kids",       en: "Family Facilities",   ar: "مرافق العائلة",      Icon: Users },
  { id: "honeymoon",  en: "Honeymoon Benefits",  ar: "مزايا شهر العسل",   Icon: Heart },
  { id: "transfers",  en: "Transfers",           ar: "خدمة النقل",         Icon: Plane },
  { id: "gallery",    en: "Photo Gallery",       ar: "معرض الصور",         Icon: Camera },
  { id: "videos",     en: "Videos",              ar: "الفيديوهات",         Icon: Video },
  { id: "offer",      en: "Current Offer",       ar: "العرض الحالي",       Icon: Tag },
  { id: "quote",      en: "Request a Quote",     ar: "اطلب عرض سعر",       Icon: Mail },
];

interface Hotel {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string | null;
  destination: string;
  country: string | null;
  short_desc_en: string | null;
  short_desc_ar: string | null;
  long_desc_en: string | null;
  long_desc_ar: string | null;
  hero_image_url: string | null;
  is_published: boolean;
}

interface Img {
  id: string;
  image_url: string;
  caption_en: string | null;
  caption_ar: string | null;
  category_kind: string | null;
  category_label: string | null;
}

interface Offer {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  nights: number | null;
  valid_until: string | null;
  features: any;
  file_url: string | null;
  file_type: string | null;
}

const WHATSAPP = "971567622484";

const CATEGORY_ORDER: { kind: string; en: string; ar: string }[] = [
  { kind: "aerial", en: "Aerial & Island Views", ar: "إطلالات جوية وجزيرة" },
  { kind: "villa", en: "Villas & Suites", ar: "الفلل والأجنحة" },
  { kind: "dining", en: "Restaurants & Bars", ar: "المطاعم والبارات" },
  { kind: "spa", en: "Spa & Wellness", ar: "السبا والعافية" },
  { kind: "experience", en: "Experiences", ar: "التجارب" },
  { kind: "beach", en: "Beach & Pool", ar: "الشاطئ والمسبح" },
  { kind: "kids", en: "Kids Club", ar: "نادي الأطفال" },
  { kind: "facility", en: "Facilities", ar: "المرافق" },
];

const HotelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const lang = useLocale();
  const localePath = useLocalePath();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [images, setImages] = useState<Img[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", check_in: "", check_out: "", guests: 2, message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: h } = await supabase.from("hotels").select("*").eq("slug", slug!).maybeSingle();
      if (h) {
        setHotel(h as Hotel);
        const [{ data: imgs }, { data: offers }] = await Promise.all([
          supabase.from("hotel_images")
            .select("id,image_url,caption_en,caption_ar,category_kind,category_label").eq("hotel_id", (h as Hotel).id)
            .order("display_order", { ascending: true }),
          supabase.from("offers")
            .select("id,title,description,price,currency,nights,valid_until,features,file_url,file_type")
            .eq("hotel_id", (h as Hotel).id).eq("is_active", true)
            .order("display_order", { ascending: true }).limit(1),
        ]);
        setImages((imgs as Img[]) || []);
        setOffer((offers?.[0] as Offer) || null);
        setActiveImg((h as Hotel).hero_image_url || (imgs?.[0]?.image_url ?? null));
      }
      setLoading(false);
    })();
  }, [slug]);


  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotel) return;
    if (!form.name.trim() || !form.email.trim()) return toast.error("Name and email are required");
    setSubmitting(true);
    const { error } = await supabase.from("hotel_inquiries").insert({
      hotel_id: hotel.id,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      check_in: form.check_in || null,
      check_out: form.check_out || null,
      guests: form.guests || null,
      message: form.message.trim() || null,
      source_locale: lang,
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success(lang === "ar" ? "تم إرسال طلبك. سنتواصل معك قريباً." : "Inquiry sent — our team will be in touch shortly.");
    setForm({ name: "", email: "", phone: "", check_in: "", check_out: "", guests: 2, message: "" });
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
    </div>
  );

  if (!hotel) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif mb-4">{lang === "ar" ? "المنتجع غير موجود" : "Resort not found"}</h1>
        <Link to={localePath("/hotels")} className="text-primary hover:underline">
          {lang === "ar" ? "العودة إلى المنتجعات" : "Back to resorts"}
        </Link>
      </main>
      <Footer />
    </div>
  );

  const name = lang === "ar" && hotel.name_ar ? hotel.name_ar : hotel.name_en;
  const shortDesc = lang === "ar" && hotel.short_desc_ar ? hotel.short_desc_ar : hotel.short_desc_en;
  const longDesc = lang === "ar" && hotel.long_desc_ar ? hotel.long_desc_ar : hotel.long_desc_en;

  const waMsg = encodeURIComponent(
    `Hello, I'd like more information about ${hotel.name_en} (${hotel.destination}).`
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{name} · Resort Offers</title>
        <meta name="description" content={shortDesc || `${name} in ${hotel.destination}`} />
        <meta property="og:title" content={name} />
        <meta property="og:image" content={safeHotelImage(hotel.hero_image_url)} />
      </Helmet>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section id="location" className="relative h-[60vh] min-h-[400px] bg-muted scroll-mt-24">
          <img src={safeHotelImage(activeImg)} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 text-white">
            <div className="container mx-auto">
              <Link to={localePath("/hotels")} className="inline-flex items-center text-sm text-white/80 hover:text-white mb-3">
                <ArrowLeft className="h-4 w-4 me-1" /> {lang === "ar" ? "كل المنتجعات" : "All resorts"}
              </Link>
              <Badge className="mb-3 bg-white/20 backdrop-blur border-white/30 text-white gap-1">
                <MapPin className="h-3 w-3" /> {hotel.destination}{hotel.country ? `, ${hotel.country}` : ""}
              </Badge>
              <h1 className="font-serif text-4xl md:text-6xl">{name}</h1>
              {shortDesc && <p className="mt-3 max-w-2xl text-white/90">{shortDesc}</p>}
            </div>
          </div>
        </section>

        {/* Quick Links — in-page navigation to keep visitors on site */}
        <nav
          aria-label={lang === "ar" ? "روابط سريعة" : "Quick links"}
          className="border-y bg-muted/30"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex gap-2 md:gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {QUICK_LINKS.filter(({ id }) => {
                // Always available targets
                if (["location", "offer", "quote"].includes(id)) return true;
                if (id === "gallery") return images.length > 0;
                // Category-backed targets: only show when at least one image exists in that category
                return images.some((img) => img.category_kind === id);
              }).map(({ id, en, ar, Icon }) => {
                const label = lang === "ar" ? ar : en;
                const href = id === "quote" ? `https://wa.me/${WHATSAPP}?text=${waMsg}` : `#${id}`;
                const isExternal = id === "quote";
                return (
                  <li key={id} className="flex-shrink-0">
                    <a
                      href={href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      title={label}
                      aria-label={label}
                      className="group flex flex-col items-center justify-center gap-1.5 min-w-[88px] px-3 py-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-medium text-foreground/80 text-center leading-tight">
                        {label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Gallery thumbs */}
        {images.length > 0 && (
          <section id="gallery" className="container mx-auto px-4 py-6 scroll-mt-24">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(img.image_url)}
                  className={`flex-shrink-0 w-24 h-20 rounded overflow-hidden border-2 transition-colors ${activeImg === img.image_url ? "border-primary" : "border-transparent"}`}
                >
                  <img
                    src={img.image_url}
                    alt={(lang === "ar" && img.caption_ar) ? img.caption_ar : (img.caption_en || `${hotel.name_en} photo`)}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Body */}
        <section className="container mx-auto px-4 py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
          <div>
            <h2 className="font-serif text-2xl text-primary mb-4">
              {lang === "ar" ? "عن المنتجع" : "About the resort"}
            </h2>
            {longDesc ? (
              <div className="prose prose-slate max-w-none whitespace-pre-line text-foreground/90">{longDesc}</div>
            ) : (
              <p className="text-muted-foreground">{lang === "ar" ? "محتوى مفصل قريباً." : "Detailed content coming soon."}</p>
            )}

            {/* Categorised galleries */}
            {CATEGORY_ORDER.map((cat) => {
              const items = images.filter((i) => i.category_kind === cat.kind);
              if (items.length === 0) return null;
              const title = lang === "ar" ? cat.ar : cat.en;
              return (
                <div key={cat.kind} id={cat.kind} className="mt-12 scroll-mt-24">
                  <h2 className="font-serif text-2xl text-primary mb-4">{title}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {items.map((img) => {
                      const caption = lang === "ar" && img.caption_ar ? img.caption_ar : img.caption_en;
                      return (
                        <button
                          key={img.id}
                          onClick={() => setActiveImg(img.image_url)}
                          className="group text-start"
                        >
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                            <img
                              src={img.image_url}
                              alt={caption || title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          {img.category_label && (
                            <div className="mt-1.5 text-xs text-muted-foreground line-clamp-1">{img.category_label}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Uncategorised fallback */}
            {(() => {
              const orphan = images.filter((i) => !CATEGORY_ORDER.some((c) => c.kind === i.category_kind));
              if (orphan.length === 0) return null;
              return (
                <div className="mt-12">
                  <h2 className="font-serif text-2xl text-primary mb-4">{lang === "ar" ? "المعرض" : "Gallery"}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {orphan.map((img) => (
                      <button key={img.id} onClick={() => setActiveImg(img.image_url)} className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                        <img src={img.image_url} alt={img.caption_en || ""} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Current Offer — single source of truth, easy to update from admin */}
            <section id="offer" className="mt-12 scroll-mt-24">
              <h2 className="font-serif text-2xl text-primary mb-4">
                {lang === "ar" ? "العرض الحالي" : "Current Offer"}
              </h2>
              {offer ? (
                <div className="bg-gradient-to-br from-primary/5 to-amber-50/40 border border-primary/20 rounded-xl p-6">
                  <h3 className="font-serif text-xl mb-2">{offer.title}</h3>
                  {offer.description && (
                    <p className="text-foreground/80 whitespace-pre-line mb-4">
                      {offer.description.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                        /^https?:\/\//.test(part) ? (
                          <a
                            key={i}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline underline-offset-2 break-all hover:text-primary/80"
                          >
                            {part}
                          </a>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    {offer.price != null && (
                      <div>
                        <div className="text-xs text-muted-foreground">{lang === "ar" ? "تبدأ من" : "From"}</div>
                        <div className="font-serif text-lg text-primary">
                          {offer.currency || "USD"} {Number(offer.price).toLocaleString()}
                        </div>
                      </div>
                    )}
                    {offer.nights && (
                      <div>
                        <div className="text-xs text-muted-foreground">{lang === "ar" ? "الليالي" : "Nights"}</div>
                        <div className="font-medium">{offer.nights}</div>
                      </div>
                    )}
                    {offer.valid_until && (
                      <div>
                        <div className="text-xs text-muted-foreground">{lang === "ar" ? "صالح حتى" : "Valid until"}</div>
                        <div className="font-medium">{new Date(offer.valid_until).toLocaleDateString(lang === "ar" ? "ar" : "en-GB")}</div>
                      </div>
                    )}
                  </div>
                  {Array.isArray(offer.features) && offer.features.length > 0 && (
                    <ul className="grid sm:grid-cols-2 gap-2 mb-4">
                      {offer.features.map((f: any, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{typeof f === "string" ? f : f?.label || f?.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hello, I'd like to book the current offer at ${hotel.name_en}: ${offer.title}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-md px-5 py-2.5 font-medium transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" /> {lang === "ar" ? "احجز هذا العرض" : "Book this offer"}
                  </a>
                </div>
              ) : (
                <div className="bg-muted/40 border border-dashed rounded-xl p-6 text-sm text-muted-foreground">
                  {lang === "ar"
                    ? "اطلب أحدث الأسعار وعروض الموسم من مستشارنا."
                    : "Request the latest rates and seasonal offers from our advisor."}
                </div>
              )}
            </section>

          </div>

          {/* Inquiry */}
          <aside id="quote" className="lg:sticky lg:top-24 h-fit scroll-mt-24">
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-primary mb-1">
                {lang === "ar" ? "استفسر عن هذا المنتجع" : "Enquire about this resort"}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                {lang === "ar" ? "سيتواصل معك مستشارنا خلال 24 ساعة." : "Our advisor will respond within 24 hours."}
              </p>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-md py-2.5 mb-4 font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> {lang === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
              </a>
              <div className="text-center text-xs text-muted-foreground mb-4">
                {lang === "ar" ? "أو املأ النموذج" : "or send a request"}
              </div>
              <form onSubmit={submitInquiry} className="space-y-3">
                <div>
                  <Label>{lang === "ar" ? "الاسم" : "Name"} *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <Label>{lang === "ar" ? "البريد الإلكتروني" : "Email"} *</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <Label>{lang === "ar" ? "الهاتف" : "Phone"}</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>{lang === "ar" ? "وصول" : "Check-in"}</Label>
                    <Input type="date" value={form.check_in} onChange={(e) => setForm({ ...form, check_in: e.target.value })} />
                  </div>
                  <div>
                    <Label>{lang === "ar" ? "مغادرة" : "Check-out"}</Label>
                    <Input type="date" value={form.check_out} onChange={(e) => setForm({ ...form, check_out: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>{lang === "ar" ? "عدد الضيوف" : "Guests"}</Label>
                  <Input type="number" min={1} max={20} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>{lang === "ar" ? "ملاحظات" : "Notes"}</Label>
                  <Textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
                  {lang === "ar" ? "إرسال الاستفسار" : "Send inquiry"}
                </Button>
              </form>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HotelDetail;
