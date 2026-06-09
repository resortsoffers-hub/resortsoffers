import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, LogOut, ArrowLeft, Image as ImageIcon, Plus, Eye, ExternalLink, Link2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { HOTEL_CATEGORIES } from "@/lib/hotelCategories";

// Standard short-label resource kinds the CMS supports per hotel.
// These keep the public-facing buttons short and clean even when the
// underlying official URL is long / ugly.
const RESOURCE_KINDS: { value: string; label: string }[] = [
  { value: "website",       label: "Official Website" },
  { value: "media_library", label: "Media Library" },
  { value: "fact_sheet",    label: "Fact Sheet" },
  { value: "presentation",  label: "Resort Presentation" },
  { value: "villas",        label: "Villas" },
  { value: "videos",        label: "Videos" },
  { value: "tour_360",      label: "360 Tour" },
  { value: "floorplan",     label: "Floorplan / Map" },
  { value: "sales_kit",     label: "Sales Kit" },
  { value: "brochure",      label: "Brochure / PDF" },
  { value: "custom",        label: "Custom Link" },
];


interface HotelRow {
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
  display_order: number;
  tags: string[] | null;
}

interface HotelImage {
  id: string;
  hotel_id: string;
  image_url: string;
  caption_en: string | null;
  display_order: number;
  category_label: string | null;
  category_kind: string | null;
  seo_filename: string | null;
  alt_en: string | null;
  title_en: string | null;
  description_en: string | null;
}

interface HotelResource {
  id: string;
  hotel_id: string;
  kind: string;
  label: string;
  url: string;
  notes: string | null;
  display_order: number;
  is_internal: boolean;
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

const empty: Partial<HotelRow> = {
  slug: "", name_en: "", name_ar: "", destination: "", country: "",
  short_desc_en: "", short_desc_ar: "", long_desc_en: "", long_desc_ar: "",
  hero_image_url: "", is_published: false, display_order: 0, tags: [],
};

const AdminHotels = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hotels, setHotels] = useState<HotelRow[]>([]);
  const [editing, setEditing] = useState<Partial<HotelRow> | null>(null);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<HotelImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [resources, setResources] = useState<HotelResource[]>([]);
  const [newResource, setNewResource] = useState<Partial<HotelResource>>({
    kind: "media_library", label: "", url: "", is_internal: true, display_order: 0,
  });

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }
      setUserId(session.user.id);
      const { data: roleRow } = await supabase
        .from("user_roles").select("role")
        .eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!roleRow);
      setChecking(false);
      if (roleRow) loadHotels();
    })();
  }, [navigate]);

  const loadHotels = async () => {
    const { data } = await supabase.from("hotels").select("*")
      .order("display_order", { ascending: false })
      .order("created_at", { ascending: false });
    setHotels((data as HotelRow[]) || []);
  };

  const loadImages = async (hotelId: string) => {
    const { data } = await supabase.from("hotel_images")
      .select("*").eq("hotel_id", hotelId)
      .order("display_order", { ascending: true });
    setImages((data as HotelImage[]) || []);
  };

  const loadResources = async (hotelId: string) => {
    const { data } = await supabase.from("hotel_resources")
      .select("*").eq("hotel_id", hotelId)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });
    setResources((data as HotelResource[]) || []);
  };

  const startEdit = async (h?: HotelRow) => {
    if (h) {
      setEditing(h);
      await Promise.all([loadImages(h.id), loadResources(h.id)]);
    } else {
      setEditing({ ...empty });
      setImages([]);
      setResources([]);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.name_en?.trim() || !editing.destination?.trim()) {
      toast.error("Name (English) and destination are required"); return;
    }
    setSaving(true);
    try {
      const slug = editing.slug?.trim() || slugify(editing.name_en);
      const payload = {
        slug,
        name_en: editing.name_en!.trim(),
        name_ar: editing.name_ar?.trim() || null,
        destination: editing.destination!.trim(),
        country: editing.country?.trim() || null,
        short_desc_en: editing.short_desc_en?.trim() || null,
        short_desc_ar: editing.short_desc_ar?.trim() || null,
        long_desc_en: editing.long_desc_en?.trim() || null,
        long_desc_ar: editing.long_desc_ar?.trim() || null,
        hero_image_url: editing.hero_image_url?.trim() || null,
        is_published: !!editing.is_published,
        display_order: Number(editing.display_order) || 0,
        tags: editing.tags || [],
      };
      if (editing.id) {
        const { error } = await supabase.from("hotels").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Hotel updated");
      } else {
        const { data, error } = await supabase.from("hotels").insert(payload).select().single();
        if (error) throw error;
        setEditing(data as HotelRow);
        toast.success("Hotel created — you can now upload gallery images");
      }
      await loadHotels();
    } catch (e: any) {
      toast.error(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this hotel and its gallery records?")) return;
    await supabase.from("hotel_images").delete().eq("hotel_id", id);
    const { error } = await supabase.from("hotels").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    if (editing?.id === id) setEditing(null);
    loadHotels();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files?.length || !editing?.id) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const path = `${editing.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("hotel-images").upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("hotel-images").getPublicUrl(path);
        const { error: insErr } = await supabase.from("hotel_images").insert({
          hotel_id: editing.id,
          image_url: pub.publicUrl,
          display_order: images.length,
        });
        if (insErr) throw insErr;
      }
      toast.success("Image(s) uploaded");
      await loadImages(editing.id);
      e.target.value = "";
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const setHero = async (url: string) => {
    if (!editing?.id) return;
    const { error } = await supabase.from("hotels").update({ hero_image_url: url }).eq("id", editing.id);
    if (error) return toast.error(error.message);
    setEditing({ ...editing, hero_image_url: url });
    toast.success("Hero image set");
    loadHotels();
  };

  const deleteImage = async (img: HotelImage) => {
    if (!confirm("Remove this image?")) return;
    const { error } = await supabase.from("hotel_images").delete().eq("id", img.id);
    if (error) return toast.error(error.message);
    // best-effort storage cleanup
    const match = img.image_url.match(/hotel-images\/(.+)$/);
    if (match) await supabase.storage.from("hotel-images").remove([match[1]]);
    if (editing?.id) loadImages(editing.id);
  };

  const updateImageCategory = async (img: HotelImage, patch: Partial<Pick<HotelImage, "category_label" | "category_kind">>) => {
    const { error } = await supabase.from("hotel_images").update(patch).eq("id", img.id);
    if (error) return toast.error(error.message);
    setImages((prev) => prev.map((i) => (i.id === img.id ? { ...i, ...patch } : i)));
  };

  // Patch SEO fields (filename, alt, title, description) on a single image.
  // Debounce-free: we update local state instantly and persist on blur.
  const updateImageSeo = async (
    img: HotelImage,
    patch: Partial<Pick<HotelImage, "seo_filename" | "alt_en" | "title_en" | "description_en" | "caption_en">>
  ) => {
    const { error } = await supabase.from("hotel_images").update(patch).eq("id", img.id);
    if (error) return toast.error(error.message);
    setImages((prev) => prev.map((i) => (i.id === img.id ? { ...i, ...patch } : i)));
  };


  const addResource = async () => {
    if (!editing?.id) return;
    if (!newResource.label?.trim() || !newResource.url?.trim()) {
      toast.error("Label and URL are required");
      return;
    }
    const payload = {
      hotel_id: editing.id,
      kind: newResource.kind || "custom",
      label: newResource.label!.trim(),
      url: newResource.url!.trim(),
      notes: newResource.notes?.trim() || null,
      is_internal: newResource.is_internal !== false,
      display_order: resources.length,
    };
    const { error } = await supabase.from("hotel_resources").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Resource added");
    setNewResource({ kind: "media_library", label: "", url: "", is_internal: true, display_order: 0 });
    await loadResources(editing.id);
  };

  const updateResource = async (id: string, patch: Partial<HotelResource>) => {
    const { error } = await supabase.from("hotel_resources").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const deleteResource = async (id: string) => {
    if (!confirm("Remove this resource link?")) return;
    const { error } = await supabase.from("hotel_resources").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/admin/login"); };


  if (checking) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif mb-4">Access denied</h1>
        <Button onClick={handleLogout} variant="outline"><LogOut className="h-4 w-4 mr-2" /> Sign out</Button>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Admin · Hotels</title></Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/admin/offers" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Manage offers
            </Link>
            <h1 className="text-3xl font-serif text-primary">Hotel CMS</h1>
            <p className="text-sm text-muted-foreground">Each hotel has an isolated gallery. Only photos uploaded here appear on the public site.</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
          {/* List */}
          <div className="space-y-3">
            <Button onClick={() => startEdit()} className="w-full"><Plus className="h-4 w-4 mr-2" /> New hotel</Button>
            <div className="space-y-2">
              {hotels.map((h) => (
                <button
                  key={h.id}
                  onClick={() => startEdit(h)}
                  className={`w-full text-left bg-card border rounded-lg p-3 hover:border-primary transition-colors ${editing?.id === h.id ? "border-primary" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                      {h.hero_image_url
                        ? <img src={h.hero_image_url} alt="" className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="h-4 w-4 text-muted-foreground" /></div>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{h.name_en}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {h.destination} · {h.is_published ? "Published" : "Draft"}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {hotels.length === 0 && <p className="text-sm text-muted-foreground">No hotels yet.</p>}
            </div>
          </div>

          {/* Editor */}
          <div>
            {!editing ? (
              <div className="bg-card border rounded-xl p-10 text-center text-muted-foreground">
                Select a hotel or create a new one.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-card border rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-xl">{editing.id ? "Edit hotel" : "New hotel"}</h2>
                    {editing.id && (
                      <Link to={`/en/review/${editing.slug}/${editing.id}`} target="_blank" className="text-sm inline-flex items-center text-primary hover:underline">
                        <Eye className="h-4 w-4 mr-1" /> Preview
                      </Link>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name (English) *</Label>
                      <Input value={editing.name_en || ""} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} />
                    </div>
                    <div>
                      <Label>Name (Arabic)</Label>
                      <Input dir="rtl" value={editing.name_ar || ""} onChange={(e) => setEditing({ ...editing, name_ar: e.target.value })} />
                    </div>
                    <div>
                      <Label>Slug (URL)</Label>
                      <Input value={editing.slug || ""} placeholder="auto-generated from name" onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
                    </div>
                    <div>
                      <Label>Destination *</Label>
                      <Input value={editing.destination || ""} placeholder="Maldives, Seychelles..." onChange={(e) => setEditing({ ...editing, destination: e.target.value })} />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Input value={editing.country || ""} onChange={(e) => setEditing({ ...editing, country: e.target.value })} />
                    </div>
                    <div>
                      <Label>Display order (higher = first)</Label>
                      <Input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} />
                    </div>
                  </div>
                  <div>
                    <Label>Short description (English)</Label>
                    <Textarea rows={2} maxLength={300} value={editing.short_desc_en || ""} onChange={(e) => setEditing({ ...editing, short_desc_en: e.target.value })} />
                  </div>
                  <div>
                    <Label>Short description (Arabic)</Label>
                    <Textarea dir="rtl" rows={2} maxLength={300} value={editing.short_desc_ar || ""} onChange={(e) => setEditing({ ...editing, short_desc_ar: e.target.value })} />
                  </div>
                  <div>
                    <Label>Long description (English)</Label>
                    <Textarea rows={5} value={editing.long_desc_en || ""} onChange={(e) => setEditing({ ...editing, long_desc_en: e.target.value })} />
                  </div>
                  <div>
                    <Label>Long description (Arabic)</Label>
                    <Textarea dir="rtl" rows={5} value={editing.long_desc_ar || ""} onChange={(e) => setEditing({ ...editing, long_desc_ar: e.target.value })} />
                  </div>
                  {/* Category tags — drive the visible filter chips on /hotels */}
                  <div>
                    <Label>Categories</Label>
                    <p className="text-xs text-muted-foreground mb-2">Tap to toggle. These power the filter chips above the public resort grid.</p>
                    <div className="flex flex-wrap gap-2">
                      {HOTEL_CATEGORIES.map((c) => {
                        const active = (editing.tags || []).includes(c.slug);
                        return (
                          <button
                            type="button"
                            key={c.slug}
                            onClick={() => {
                              const current = editing.tags || [];
                              const next = active ? current.filter((t) => t !== c.slug) : [...current, c.slug];
                              setEditing({ ...editing, tags: next });
                            }}
                            className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                              active
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background hover:border-primary text-foreground/80"
                            }`}
                          >
                            {c.label_en}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={!!editing.is_published} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} />
                    <Label>Published (visible on public site)</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={saving}>
                      {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Save hotel
                    </Button>
                    {editing.id && (
                      <Button variant="outline" onClick={() => handleDelete(editing.id!)}>
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    )}
                    <Button variant="ghost" onClick={() => setEditing(null)}>Close</Button>
                  </div>
                </div>

                {editing.id && (
                  <div className="bg-card border rounded-xl p-6 space-y-4">
                    <div>
                      <h2 className="font-serif text-xl flex items-center gap-2">
                        <Link2 className="h-5 w-5" /> Official Resources ({resources.length})
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Internal CMS library of the hotel's official links — Media Library, Fact Sheet, Resort Presentation, Villas, Videos, 360 Tour, Floorplan, Sales Kit, Brochures.
                        Stored once, always traceable, and updateable when the hotel refreshes its assets. Internal by default; flip to "Public" only for links you want visible on the hotel page as short-label buttons.
                      </p>
                    </div>

                    {/* Existing resources */}
                    <div className="space-y-2">
                      {resources.map((r) => (
                        <div key={r.id} className="border rounded-lg p-3 bg-background space-y-2">
                          <div className="grid sm:grid-cols-[140px_1fr_auto] gap-2 items-start">
                            <select
                              value={r.kind}
                              onChange={(e) => updateResource(r.id, { kind: e.target.value })}
                              className="text-xs border rounded px-2 py-1.5 bg-background"
                            >
                              {RESOURCE_KINDS.map((k) => (
                                <option key={k.value} value={k.value}>{k.label}</option>
                              ))}
                            </select>
                            <div className="space-y-1.5">
                              <Input
                                value={r.label}
                                onChange={(e) => updateResource(r.id, { label: e.target.value })}
                                placeholder="Short button label (e.g. Media Library)"
                                className="h-8 text-sm"
                              />
                              <Input
                                value={r.url}
                                onChange={(e) => updateResource(r.id, { url: e.target.value })}
                                placeholder="https://..."
                                className="h-8 text-xs font-mono"
                              />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <a href={r.url} target="_blank" rel="noreferrer"
                                 className="text-muted-foreground hover:text-primary p-1" title="Open link">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                              <button onClick={() => deleteResource(r.id)} className="text-destructive hover:opacity-70 p-1" title="Remove">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Switch
                              checked={!r.is_internal}
                              onCheckedChange={(v) => updateResource(r.id, { is_internal: !v })}
                            />
                            <span className="text-muted-foreground">
                              {r.is_internal ? "Internal (CMS only)" : "Public (shown on hotel page)"}
                            </span>
                          </div>
                        </div>
                      ))}
                      {resources.length === 0 && (
                        <p className="text-sm text-muted-foreground">No resources yet — add the first one below.</p>
                      )}
                    </div>

                    {/* Add new resource */}
                    <div className="border-t pt-4 space-y-2">
                      <Label className="text-sm">Add resource</Label>
                      <div className="grid sm:grid-cols-[140px_1fr_1fr_auto] gap-2">
                        <select
                          value={newResource.kind}
                          onChange={(e) => {
                            const kind = e.target.value;
                            const preset = RESOURCE_KINDS.find((k) => k.value === kind);
                            setNewResource({ ...newResource, kind, label: newResource.label || preset?.label || "" });
                          }}
                          className="text-xs border rounded px-2 py-1.5 bg-background"
                        >
                          {RESOURCE_KINDS.map((k) => (
                            <option key={k.value} value={k.value}>{k.label}</option>
                          ))}
                        </select>
                        <Input
                          value={newResource.label || ""}
                          onChange={(e) => setNewResource({ ...newResource, label: e.target.value })}
                          placeholder="Short label"
                          className="h-9"
                        />
                        <Input
                          value={newResource.url || ""}
                          onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                          placeholder="https://..."
                          className="h-9 text-xs font-mono"
                        />
                        <Button onClick={addResource} size="sm"><Plus className="h-4 w-4" /></Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Switch
                          checked={!newResource.is_internal}
                          onCheckedChange={(v) => setNewResource({ ...newResource, is_internal: !v })}
                        />
                        <span className="text-muted-foreground">
                          {newResource.is_internal !== false ? "Internal (CMS only)" : "Public (shown on hotel page)"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {editing.id && (
                  <div className="bg-card border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-serif text-xl">Gallery ({images.length})</h2>
                      <Label htmlFor="img-upload" className="cursor-pointer inline-flex items-center text-sm bg-primary text-primary-foreground rounded-md px-3 py-2">
                        {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                        Upload photos
                      </Label>
                      <input id="img-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload official photography only. Every photo MUST be tagged to the exact villa, restaurant, or spa it shows — no mixing across categories.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {images.map((img) => (
                        <div key={img.id} className="rounded-lg overflow-hidden border bg-muted">
                          <div className="relative group aspect-[4/3]">
                            <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                              <Button size="sm" variant="secondary" onClick={() => setHero(img.image_url)}>Set as hero</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteImage(img)}><Trash2 className="h-3 w-3" /></Button>
                            </div>
                            {editing.hero_image_url === img.image_url && (
                              <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded">HERO</div>
                            )}
                          </div>
                          <div className="p-2 grid grid-cols-[110px_1fr] gap-2 bg-card">
                            <select
                              value={img.category_kind || ""}
                              onChange={(e) => updateImageCategory(img, { category_kind: e.target.value || null })}
                              className="text-xs border rounded px-2 py-1 bg-background"
                            >
                              <option value="">— Type —</option>
                              <option value="villa">Villa</option>
                              <option value="restaurant">Restaurant</option>
                              <option value="spa">Spa</option>
                              <option value="pool">Pool / Beach</option>
                              <option value="exterior">Aerial / Exterior</option>
                              <option value="experience">Experience</option>
                              <option value="other">Other</option>
                            </select>
                            <Input
                              value={img.category_label || ""}
                              onChange={(e) => updateImageCategory(img, { category_label: e.target.value || null })}
                              placeholder="Exact name (e.g. Sunset Water Villa)"
                              className="h-8 text-xs"
                            />
                          </div>
                          {/* SEO fields — feed Google Image search and screen readers.
                              Persisted on blur so typing stays smooth. */}
                          <div className="p-2 pt-0 grid gap-1.5 bg-card border-t">
                            <Input
                              defaultValue={img.seo_filename || ""}
                              onBlur={(e) => updateImageSeo(img, { seo_filename: e.target.value.trim() || null })}
                              placeholder="SEO filename (e.g. soneva-jani-water-villa-lagoon)"
                              className="h-8 text-xs"
                            />
                            <Input
                              defaultValue={img.alt_en || ""}
                              onBlur={(e) => updateImageSeo(img, { alt_en: e.target.value.trim() || null })}
                              placeholder="Alt text — describe what's shown for accessibility"
                              className="h-8 text-xs"
                            />
                            <Input
                              defaultValue={img.title_en || ""}
                              onBlur={(e) => updateImageSeo(img, { title_en: e.target.value.trim() || null })}
                              placeholder="Title (hover tooltip)"
                              className="h-8 text-xs"
                            />
                            <Input
                              defaultValue={img.caption_en || ""}
                              onBlur={(e) => updateImageSeo(img, { caption_en: e.target.value.trim() || null })}
                              placeholder="Caption (shown under image in gallery)"
                              className="h-8 text-xs"
                            />
                            <Textarea
                              defaultValue={img.description_en || ""}
                              onBlur={(e) => updateImageSeo(img, { description_en: e.target.value.trim() || null })}
                              placeholder="Long description for SEO / schema.org ImageObject"
                              className="text-xs min-h-[60px]"
                            />
                          </div>
                        </div>
                      ))}
                      {images.length === 0 && <p className="col-span-full text-sm text-muted-foreground">No images yet.</p>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHotels;
