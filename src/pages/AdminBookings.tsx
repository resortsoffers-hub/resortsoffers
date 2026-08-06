import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Download, ArrowLeft, LogOut, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";

interface BookingRow {
  id: string;
  reference_code: string;
  name: string;
  email: string;
  phone: string;
  destination: string | null;
  preferred_date: string;
  preferred_time: string;
  consultation_type: string;
  travel_start_date: string | null;
  travel_end_date: string | null;
  adults: number | null;
  children: number | null;
  children_ages: string | null;
  first_time_visit: boolean | null;
  previous_visit_notes: string | null;
  preferred_language: string | null;
  budget_range: string | null;
  message: string | null;
  status: string;
  payment_status: string;
  created_at: string;
}

const ALL = "all";

/** Days between the request being submitted and the requested consultation slot. */
const leadTimeDays = (createdAt: string, preferredDate: string) => {
  const created = new Date(createdAt);
  const target = new Date(`${preferredDate}T00:00:00`);
  const days = Math.round(
    (target.getTime() - new Date(created.toDateString()).getTime()) / 86400000
  );
  return days;
};

const fmtDate = (d?: string | null) =>
  d ? new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const csvCell = (value: unknown) => {
  const s = value === null || value === undefined ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
};

const AdminBookings = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<BookingRow[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(ALL);
  const [payment, setPayment] = useState(ALL);
  const [destination, setDestination] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!roleRow);
      setChecking(false);
      if (roleRow) loadBookings();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("consultation_bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Could not load bookings");
    setBookings((data as BookingRow[]) || []);
    setLoading(false);
  };

  const destinations = useMemo(
    () => Array.from(new Set(bookings.map((b) => b.destination).filter(Boolean))) as string[],
    [bookings]
  );
  const types = useMemo(
    () => Array.from(new Set(bookings.map((b) => b.consultation_type).filter(Boolean))),
    [bookings]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bookings.filter((b) => {
      if (status !== ALL && b.status !== status) return false;
      if (payment !== ALL && b.payment_status !== payment) return false;
      if (destination !== ALL && b.destination !== destination) return false;
      if (type !== ALL && b.consultation_type !== type) return false;
      if (fromDate && b.preferred_date < fromDate) return false;
      if (toDate && b.preferred_date > toDate) return false;
      if (q) {
        const haystack = [
          b.reference_code, b.name, b.email, b.phone, b.destination, b.message,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [bookings, search, status, payment, destination, type, fromDate, toDate]);

  const updateStatus = async (id: string, next: string) => {
    const { error } = await supabase
      .from("consultation_bookings")
      .update({ status: next as BookingRow["status"] })
      .eq("id", id);
    if (error) {
      toast.error("Could not update status");
      return;
    }
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: next } : b)));
    toast.success("Status updated");
  };

  const exportCsv = () => {
    if (!filtered.length) {
      toast.error("Nothing to export");
      return;
    }
    const headers = [
      "Reference", "Submitted", "Lead time (days)", "Agenda date", "Agenda time",
      "Consultation type", "Status", "Payment", "Name", "Email", "Phone",
      "Destination", "Travel start", "Travel end", "Adults", "Children",
      "Children ages", "First time visit", "Previous visit notes",
      "Preferred language", "Budget range", "Message",
    ];
    const rows = filtered.map((b) => [
      b.reference_code,
      new Date(b.created_at).toISOString(),
      leadTimeDays(b.created_at, b.preferred_date),
      b.preferred_date,
      b.preferred_time,
      b.consultation_type,
      b.status,
      b.payment_status,
      b.name,
      b.email,
      b.phone,
      b.destination,
      b.travel_start_date,
      b.travel_end_date,
      b.adults,
      b.children,
      b.children_ages,
      b.first_time_visit === null ? "" : b.first_time_visit ? "Yes" : "No",
      b.previous_visit_notes,
      b.preferred_language,
      b.budget_range,
      b.message,
    ]);
    const csv = [headers, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `consultation-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">You do not have admin access.</p>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Consultation Bookings | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/admin/offers" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="h-4 w-4 me-1" /> Admin
            </Link>
            <h1 className="text-3xl font-serif">Consultation Bookings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} of {bookings.length} requests
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadBookings} disabled={loading}>
              <RefreshCw className={`h-4 w-4 me-2 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button onClick={exportCsv}>
              <Download className="h-4 w-4 me-2" /> Export CSV
            </Button>
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-8 p-4 rounded-lg border bg-card">
          <div className="lg:col-span-2">
            <Label className="text-xs">Search</Label>
            <Input
              placeholder="Reference, name, email, phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value={ALL}>All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Payment</Label>
            <Select value={payment} onValueChange={setPayment}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value={ALL}>All payments</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Destination</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value={ALL}>All destinations</SelectItem>
                {destinations.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Consultation type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value={ALL}>All types</SelectItem>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Agenda from</Label>
            <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Agenda to</Label>
            <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No consultation requests match these filters.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => {
              const lead = leadTimeDays(b.created_at, b.preferred_date);
              return (
                <article key={b.id} className="rounded-lg border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm text-primary">{b.reference_code}</span>
                        <Badge variant="secondary">{b.consultation_type}</Badge>
                        <Badge variant={b.payment_status === "paid" ? "default" : "outline"}>
                          {b.payment_status}
                        </Badge>
                        <Badge variant={lead < 3 ? "destructive" : "outline"}>
                          Lead time: {lead} day{Math.abs(lead) === 1 ? "" : "s"}
                        </Badge>
                      </div>
                      <h2 className="text-lg mt-2">{b.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {b.email} · {b.phone}
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="text-sm font-medium">
                        {fmtDate(b.preferred_date)} · {b.preferred_time?.slice(0, 5)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted {new Date(b.created_at).toLocaleString("en-GB")}
                      </p>
                      <div className="mt-2 w-40 ms-auto">
                        <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-popover z-50">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 text-sm border-t pt-4">
                    <div><dt className="text-xs text-muted-foreground">Destination</dt><dd>{b.destination || "—"}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">Travel dates</dt><dd>{fmtDate(b.travel_start_date)} → {fmtDate(b.travel_end_date)}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">Guests</dt><dd>{b.adults ?? 0} adults{b.children ? `, ${b.children} children` : ""}{b.children_ages ? ` (${b.children_ages})` : ""}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">Budget</dt><dd>{b.budget_range || "—"}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">First visit</dt><dd>{b.first_time_visit === null ? "—" : b.first_time_visit ? "Yes" : "No"}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">Previous visits</dt><dd>{b.previous_visit_notes || "—"}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">Language</dt><dd>{b.preferred_language || "—"}</dd></div>
                    <div className="sm:col-span-2 lg:col-span-4"><dt className="text-xs text-muted-foreground">Message</dt><dd className="whitespace-pre-wrap">{b.message || "—"}</dd></div>
                  </dl>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBookings;
