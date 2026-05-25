import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, LogOut, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

interface OfferRow {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  category: string | null;
  destination: string | null;
  hotel_name: string | null;
  nights: number | null;
  image_url: string | null;
  file_url: string | null;
  display_order: number | null;
  created_at: string | null;
}

const AdminOffers = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [offers, setOffers] = useState<OfferRow[]>([]);
  const [uploading, setUploading] = useState(false);

  // form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [destination, setDestination] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [nights, setNights] = useState("");
  const [category, setCategory] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      setUserId(session.user.id);
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!roleRow);
      setChecking(false);
      if (roleRow) loadOffers();
    };
    init();
  }, [navigate]);

  const loadOffers = async () => {
    const { data } = await supabase
      .from("offers")
      .select("*")
      .order("display_order", { ascending: false })
      .order("created_at", { ascending: false });
    setOffers((data as OfferRow[]) || []);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a PDF or image file");
      return;
    }
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("offer-files")
        .upload(path, file, { contentType: file.type });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("offer-files").getPublicUrl(path);
      const isImage = file.type.startsWith("image/");
      const { error: insErr } = await supabase.from("offers").insert({
        title: title.trim(),
        description: description.trim() || null,
        price: price ? Number(price) : null,
        category: category.trim() || null,
        destination: destination.trim() || null,
        hotel_name: hotelName.trim() || null,
        nights: nights ? Number(nights) : null,
        display_order: Number(displayOrder) || 0,
        file_url: pub.publicUrl,
        file_type: file.type,
        image_url: isImage ? pub.publicUrl : null,
      });
      if (insErr) throw insErr;
      toast.success("Offer uploaded");
      setTitle(""); setDescription(""); setPrice(""); setDestination("");
      setHotelName(""); setNights(""); setCategory(""); setFile(null);
      (document.getElementById("offer-file") as HTMLInputElement).value = "";
      loadOffers();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this offer?")) return;
    const { error } = await supabase.from("offers").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    loadOffers();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-serif mb-4">Access denied</h1>
          <p className="text-muted-foreground mb-6">
            Your account does not have admin privileges.
          </p>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Admin · Offers</title></Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/admin/hotels" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Manage hotels (CMS)
            </Link>
            <h1 className="text-3xl font-serif text-primary">Manage Offers</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>

        <form onSubmit={handleUpload} className="bg-card border rounded-xl p-6 space-y-4 mb-10">
          <h2 className="font-serif text-xl">Upload new offer</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Honeymoon, Family..." maxLength={50} />
            </div>
            <div>
              <Label htmlFor="hotel">Hotel name</Label>
              <Input id="hotel" value={hotelName} onChange={(e) => setHotelName(e.target.value)} maxLength={150} />
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} maxLength={100} />
            </div>
            <div>
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" />
            </div>
            <div>
              <Label htmlFor="nights">Nights</Label>
              <Input id="nights" type="number" value={nights} onChange={(e) => setNights(e.target.value)} min="0" />
            </div>
            <div>
              <Label htmlFor="order">Display order (higher = first)</Label>
              <Input id="order" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="offer-file">File (PDF or image) *</Label>
              <Input
                id="offer-file"
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} rows={4} />
          </div>
          <Button type="submit" disabled={uploading} className="bg-primary">
            {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Upload offer
          </Button>
        </form>

        <h2 className="font-serif text-xl mb-4">Existing offers ({offers.length})</h2>
        <div className="space-y-3">
          {offers.map((o) => (
            <div key={o.id} className="bg-card border rounded-lg p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                {o.image_url ? (
                  <img src={o.image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">PDF</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{o.title}</div>
                <div className="text-xs text-muted-foreground">
                  Order: {o.display_order} · {o.destination || "—"} · {o.price ? `$${o.price}` : "no price"}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(o.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          {offers.length === 0 && (
            <p className="text-sm text-muted-foreground">No offers uploaded yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminOffers;
