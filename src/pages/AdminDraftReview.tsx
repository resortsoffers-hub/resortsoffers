import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Loader2, Upload, Trash2, ArrowLeft, ExternalLink, Eye, ImageIcon, Save, Copy,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { safeHotelImage } from "@/lib/safeImage";

/**
 * Resort Draft Review
 *
 * A focused editorial workspace to prepare a hotel before publishing:
 *  - Hero image
 *  - Editorial intro (EN / AR short_desc — 2-3 line magazine line)
 *  - Long description (EN / AR)
 *  - Gallery (upload, caption, reorder, delete)
 *  - Single curated offer (title, description, price, nights)
 *  - Preview link (uses /:locale/review/:slug/:previewId)
 *
 * Publishing is intentionally NOT available here — hotels stay drafts
 * until you explicitly approve them in chat (publish gate).
 */

interface Hotel {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string | null;
  destination: string;
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
  display_order: number;
}

interface Offer {
  id?: string;
  hotel_id?: string;
  title: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  nights: number | null;
  is_active: boolean;
}

const emptyOffer: Offer = {
  title: "", description: "", price: null, currency: "USD", nights: null, is_active: true,
};

const AdminDraftReview = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [drafts, setDrafts] = useState<Hotel[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [images, setImages] = useState<Img[]>([]);
  const [offer, setOffer] = useState<Offer>(emptyOffer);

  const [savingHotel, setSavingHotel] = useState(false);
  const [savingOffer, setSavingOffer] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  /* ---------- auth ---------- */
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }
      const { data: role } = await supabase
        .from("user_roles").select("role")
        .eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!role);
      setChecking(false);
      if (role) loadDrafts();
    })();
  }, [navigate]);

  const loadDrafts = async () => {
    const { data } = await supabase
      .from("hotels")
      .select("id,slug,name_en,name_ar,destination,short_desc_en,short_desc_ar,long_desc_en,long_desc_ar,hero_image_url,is_published")
      .order("updated_at", { ascending: false });
    setDrafts((data as Hotel[]) || []);
  };

  /* ---------- selection ---------- */
  useEffect(() => {
    if (!selectedId) { setHotel(null); setImages([]); setOffer(emptyOffer); return; }
    (async () => {
      const [{ data: h }, { data: imgs }, { data: offers }] = await Promise.all([
        supabase.from("hotels").select("*").eq("id", selectedId).maybeSingle(),
        supabase.from("hotel_images")
          .select("id,image_url,caption_en,caption_ar,display_order")
          .eq("hotel_id", selectedId).order("display_order", { ascending: true }),
        supabase.from("offers").select("*").eq("hotel_id", selectedId)
          .order("display_order", { ascending: true }).limit(1),
      ]);
      setHotel(h as Hotel);
      setImages((imgs as Img[]) || []);
      setOffer((offers?.[0] as Offer) || { ...emptyOffer });
    })();
  }, [selectedId]);

  /* ---------- hotel save ---------- */
  const saveHotel = async () => {
    if (!hotel) return;
    setSavingHotel(true);
    const { error } = await supabase.from("hotels").update({
      short_desc_en: hotel.short_desc_en,
      short_desc_ar: hotel.short_desc_ar,
      long_desc_en: hotel.long_desc_en,
      long_desc_ar: hotel.long_desc_ar,
      hero_image_url: hotel.hero_image_url,
      is_published: false, // enforce draft
    }).eq("id", hotel.id);
    setSavingHotel(false);
    if (error) toast.error(error.message);
    else { toast.success("Draft saved"); loadDrafts(); }
  };

  /* ---------- uploads ---------- */
  const uploadToBucket = async (file: File, prefix: string) => {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("hotel-images").upload(path, file, {
      cacheControl: "3600", upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("hotel-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const onHeroUpload = async (file: File) => {
    if (!hotel) return;
    setUploadingHero(true);
    try {
      const url = await uploadToBucket(file, `hero/${hotel.slug}`);
      setHotel({ ...hotel, hero_image_url: url });
      await supabase.from("hotels").update({ hero_image_url: url }).eq("id", hotel.id);
      toast.success("Hero updated");
    } catch (e: any) { toast.error(e.message); }
    setUploadingHero(false);
  };

  const onGalleryUpload = async (files: FileList) => {
    if (!hotel) return;
    setUploadingGallery(true);
    try {
      const start = images.length;
      const rows: any[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadToBucket(files[i], `gallery/${hotel.slug}`);
        rows.push({ hotel_id: hotel.id, image_url: url, display_order: start + i });
      }
      const { data, error } = await supabase.from("hotel_images").insert(rows).select();
      if (error) throw error;
      setImages([...images, ...((data as Img[]) || [])]);
      toast.success(`${rows.length} image(s) added`);
    } catch (e: any) { toast.error(e.message); }
    setUploadingGallery(false);
  };

  const updateImage = async (id: string, patch: Partial<Img>) => {
    setImages(images.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    await supabase.from("hotel_images").update(patch).eq("id", id);
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Remove this image?")) return;
    await supabase.from("hotel_images").delete().eq("id", id);
    setImages(images.filter((i) => i.id !== id));
  };

  const moveImage = async (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= images.length) return;
    const a = images[idx], b = images[j];
    const next = [...images];
    next[idx] = { ...b, display_order: a.display_order };
    next[j] = { ...a, display_order: b.display_order };
    setImages(next);
    await Promise.all([
      supabase.from("hotel_images").update({ display_order: b.display_order }).eq("id", a.id),
      supabase.from("hotel_images").update({ display_order: a.display_order }).eq("id", b.id),
    ]);
  };

  /* ---------- offer ---------- */
  const saveOffer = async () => {
    if (!hotel) return;
    setSavingOffer(true);
    const payload: any = {
      hotel_id: hotel.id,
      title: offer.title,
      description: offer.description,
      price: offer.price,
      currency: offer.currency || "USD",
      nights: offer.nights,
      is_active: false, // stays draft until publish approval
    };
    const { error, data } = offer.id
      ? await supabase.from("offers").update(payload).eq("id", offer.id).select().maybeSingle()
      : await supabase.from("offers").insert(payload).select().maybeSingle();
    setSavingOffer(false);
    if (error) toast.error(error.message);
    else { toast.success("Offer saved (draft)"); if (data) setOffer(data as Offer); }
  };

  /* ---------- preview link ---------- */
  const previewUrl = hotel ? `/en/review/${hotel.slug}/${hotel.id}` : "";
  const copyPreview = () => {
    if (!previewUrl) return;
    navigator.clipboard.writeText(window.location.origin + previewUrl);
    toast.success("Preview link copied");
  };

  /* ---------- render ---------- */
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-muted-foreground mb-4">Admin access required.</p>
          <Link to="/admin/login" className="underline">Sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Draft Review · Admin</title></Helmet>
      <Navbar />
      <main className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/admin/hotels" className="text-xs uppercase tracking-[0.25em] text-muted-foreground inline-flex items-center gap-1 mb-3">
              <ArrowLeft className="h-3 w-3" /> All hotels
            </Link>
            <h1 className="font-serif text-3xl text-primary">Resort Draft Review</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Prepare the editorial intro, gallery and offer. Publishing requires explicit approval in chat.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar — drafts list */}
          <aside className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Hotels
            </div>
            <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {drafts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedId(d.id)}
                  className={`w-full text-left px-3 py-2.5 border text-sm transition-colors ${
                    selectedId === d.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="font-medium text-primary truncate">{d.name_en}</div>
                  <div className="text-[11px] text-muted-foreground flex items-center justify-between mt-0.5">
                    <span className="truncate">{d.destination}</span>
                    <span className={d.is_published ? "text-emerald-600" : "text-amber-600"}>
                      {d.is_published ? "live" : "draft"}
                    </span>
                  </div>
                </button>
              ))}
              {drafts.length === 0 && (
                <p className="text-sm text-muted-foreground">No hotels yet. Create one in Hotels admin.</p>
              )}
            </div>
          </aside>

          {/* Editor */}
          <section className="col-span-12 md:col-span-8 lg:col-span-9 space-y-10">
            {!hotel ? (
              <div className="border border-dashed border-border p-12 text-center text-muted-foreground">
                Select a hotel to begin reviewing the draft.
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-accent-strong mb-1">
                      {hotel.destination}
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-primary">{hotel.name_en}</h2>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyPreview}>
                      <Copy className="h-4 w-4 mr-1" /> Copy preview link
                    </Button>
                    <a href={previewUrl} target="_blank" rel="noreferrer">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-1" /> Open preview
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Hero */}
                <div>
                  <Label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Hero image
                  </Label>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-5 items-start">
                    <div className="aspect-[4/3] bg-muted overflow-hidden border border-border">
                      {hotel.hero_image_url ? (
                        <img src={safeHotelImage(hotel.hero_image_url)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ImageIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        id="hero-file" type="file" accept="image/*" className="hidden"
                        onChange={(e) => e.target.files?.[0] && onHeroUpload(e.target.files[0])}
                      />
                      <label htmlFor="hero-file">
                        <Button asChild variant="outline" disabled={uploadingHero}>
                          <span className="cursor-pointer">
                            {uploadingHero ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                            Upload hero
                          </span>
                        </Button>
                      </label>
                      <p className="text-xs text-muted-foreground mt-2">
                        Official photography only. Landscape orientation, 2000px+ wide.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Editorial intro */}
                <div className="space-y-5">
                  <div>
                    <Label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Editorial intro · EN (2-3 lines)
                    </Label>
                    <Textarea
                      rows={3} className="mt-2"
                      value={hotel.short_desc_en || ""}
                      onChange={(e) => setHotel({ ...hotel, short_desc_en: e.target.value })}
                      placeholder="One emotional, magazine-style line that sets the mood."
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Editorial intro · AR
                    </Label>
                    <Textarea
                      rows={3} className="mt-2" dir="rtl"
                      value={hotel.short_desc_ar || ""}
                      onChange={(e) => setHotel({ ...hotel, short_desc_ar: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Long description · EN
                    </Label>
                    <Textarea
                      rows={5} className="mt-2"
                      value={hotel.long_desc_en || ""}
                      onChange={(e) => setHotel({ ...hotel, long_desc_en: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Long description · AR
                    </Label>
                    <Textarea
                      rows={5} className="mt-2" dir="rtl"
                      value={hotel.long_desc_ar || ""}
                      onChange={(e) => setHotel({ ...hotel, long_desc_ar: e.target.value })}
                    />
                  </div>
                  <Button onClick={saveHotel} disabled={savingHotel}>
                    {savingHotel ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save editorial draft
                  </Button>
                </div>

                {/* Gallery */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Gallery ({images.length})
                    </Label>
                    <div>
                      <input
                        id="gal-files" type="file" accept="image/*" multiple className="hidden"
                        onChange={(e) => e.target.files && onGalleryUpload(e.target.files)}
                      />
                      <label htmlFor="gal-files">
                        <Button asChild size="sm" variant="outline" disabled={uploadingGallery}>
                          <span className="cursor-pointer">
                            {uploadingGallery ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                            Add images
                          </span>
                        </Button>
                      </label>
                    </div>
                  </div>

                  {images.length === 0 ? (
                    <div className="border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                      No gallery images yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {images.map((img, idx) => (
                        <div key={img.id} className="border border-border p-3 flex gap-3">
                          <img src={safeHotelImage(img.image_url)} alt="" className="w-28 h-28 object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0 space-y-2">
                            <Input
                              placeholder="Caption EN"
                              value={img.caption_en || ""}
                              onChange={(e) => updateImage(img.id, { caption_en: e.target.value })}
                            />
                            <Input
                              placeholder="Caption AR" dir="rtl"
                              value={img.caption_ar || ""}
                              onChange={(e) => updateImage(img.id, { caption_ar: e.target.value })}
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline" onClick={() => moveImage(idx, -1)} disabled={idx === 0}>↑</Button>
                                <Button size="sm" variant="outline" onClick={() => moveImage(idx, 1)} disabled={idx === images.length - 1}>↓</Button>
                              </div>
                              <Button size="sm" variant="ghost" onClick={() => deleteImage(img.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Offer */}
                <div className="border-t border-border pt-8 space-y-5">
                  <Label className="text-xs uppercase tracking-[0.25em] text-muted-foreground block">
                    Curated offer
                  </Label>
                  <Input
                    placeholder="Offer title (e.g. Five Nights, Overwater Villa)"
                    value={offer.title}
                    onChange={(e) => setOffer({ ...offer, title: e.target.value })}
                  />
                  <Textarea
                    rows={4}
                    placeholder="Offer description — inclusions, dates, what makes it special."
                    value={offer.description || ""}
                    onChange={(e) => setOffer({ ...offer, description: e.target.value })}
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Price from</Label>
                      <Input
                        type="number"
                        value={offer.price ?? ""}
                        onChange={(e) => setOffer({ ...offer, price: e.target.value ? Number(e.target.value) : null })}
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Currency</Label>
                      <Input
                        value={offer.currency || "USD"}
                        onChange={(e) => setOffer({ ...offer, currency: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Nights</Label>
                      <Input
                        type="number"
                        value={offer.nights ?? ""}
                        onChange={(e) => setOffer({ ...offer, nights: e.target.value ? Number(e.target.value) : null })}
                      />
                    </div>
                  </div>
                  <Button onClick={saveOffer} disabled={savingOffer || !offer.title}>
                    {savingOffer ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save offer (draft)
                  </Button>
                </div>

                {/* Publish gate notice */}
                <div className="border border-amber-500/40 bg-amber-50/40 dark:bg-amber-950/10 p-5 text-sm">
                  <p className="font-medium text-primary mb-1">Publish gate</p>
                  <p className="text-muted-foreground">
                    This page never publishes a hotel. When the draft feels right, ask in chat:
                    {" "}<span className="font-mono text-primary">publish {hotel.name_en}</span>.
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDraftReview;
