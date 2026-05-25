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
import { MapPin, MessageCircle, Loader2, ArrowLeft } from "lucide-react";

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
}

interface Img { id: string; image_url: string; caption_en: string | null; }

const WHATSAPP = "971567622484";

const HotelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const lang = useLocale();
  const localePath = useLocalePath();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", check_in: "", check_out: "", guests: 2, message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: h } = await supabase.from("hotels").select("*").eq("slug", slug!).eq("is_published", true).maybeSingle();
      if (h) {
        setHotel(h as Hotel);
        const { data: imgs } = await supabase.from("hotel_images")
          .select("id,image_url,caption_en").eq("hotel_id", (h as Hotel).id)
          .order("display_order", { ascending: true });
        setImages((imgs as Img[]) || []);
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
        <section className="relative h-[60vh] min-h-[400px] bg-muted">
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

        {/* Gallery thumbs */}
        {images.length > 0 && (
          <section className="container mx-auto px-4 py-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(img.image_url)}
                  className={`flex-shrink-0 w-24 h-20 rounded overflow-hidden border-2 transition-colors ${activeImg === img.image_url ? "border-primary" : "border-transparent"}`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
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

            {images.length > 0 && (
              <div className="mt-10">
                <h2 className="font-serif text-2xl text-primary mb-4">{lang === "ar" ? "المعرض" : "Gallery"}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {images.map((img) => (
                    <button key={img.id} onClick={() => setActiveImg(img.image_url)} className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                      <img src={img.image_url} alt={img.caption_en || ""} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Inquiry */}
          <aside className="lg:sticky lg:top-24 h-fit">
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
