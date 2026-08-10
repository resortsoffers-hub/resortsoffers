import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, Clock, Video, Phone, MessageCircle, Check, Hash, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useLocalePath } from "@/hooks/useLocale";

interface Confirmation {
  reference_code: string;
  name: string;
  destination: string | null;
  preferred_date: string;
  preferred_time: string;
  consultation_type: string;
  status: string;
  payment_status: string;
  created_at: string;
}

const statusTone: Record<string, string> = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  unpaid: "bg-amber-100 text-amber-800",
  refunded: "bg-gray-100 text-gray-700",
};

const Row = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1e3a5f]">
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <div className="font-medium text-[#1e3a5f]">{children}</div>
    </div>
  </div>
);

const BookingConfirmation = () => {
  const { reference } = useParams<{ reference: string }>();
  const [params] = useSearchParams();
  const lp = useLocalePath();
  const code = reference || params.get("ref") || "";

  const [booking, setBooking] = useState<Confirmation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!code) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.rpc("get_booking_confirmation", {
        _reference_code: code,
      });
      if (error) console.error("Confirmation lookup failed:", error);
      setBooking(((data as Confirmation[]) || [])[0] || null);
      setLoading(false);
    })();
  }, [code]);

  const prettyDate = booking ? format(parseISO(booking.preferred_date), "EEEE, MMMM d, yyyy") : "";
  const isVideo = booking?.consultation_type === "video";

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Booking Confirmation | ResortsOffers.com</title>
        <meta name="description" content="View your consultation reference code, payment status and scheduled agenda time." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />

      <main className="pb-16 pt-20">
        <div className="container-custom">
          <Card className="mx-auto max-w-xl py-10">
            <CardContent className="space-y-6">
              {loading ? (
                <p className="py-10 text-center text-gray-500">Loading your booking…</p>
              ) : !booking ? (
                <div className="space-y-4 py-8 text-center">
                  <h1 className="text-2xl font-bold text-[#1e3a5f]">Booking not found</h1>
                  <p className="text-gray-600">
                    We couldn&apos;t find a booking for reference{" "}
                    <span className="font-mono">{code || "—"}</span>. Please check the code from your
                    confirmation email, or message us and we&apos;ll locate it.
                  </p>
                  <a href="https://wa.me/971547474404" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#25D366] hover:bg-[#1DA851] text-[#04291a]">
                      <MessageCircle className="mr-2 h-5 w-5" /> Chat with us on WhatsApp
                    </Button>
                  </a>
                </div>
              ) : (
                <>
                  <div className="space-y-4 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1e3a5f]">Booking Confirmation</h1>
                    <p className="text-gray-600">
                      Thank you {booking.name}. Keep your reference code — it identifies your file with us.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#1e3a5f]/15 bg-[#1e3a5f]/5 p-5 text-center">
                    <div className="text-xs uppercase tracking-[0.25em] text-[#1e3a5f]/70">
                      Reference / Lead Code
                    </div>
                    <div className="mt-2 font-mono text-2xl tracking-[0.2em] text-[#1e3a5f]">
                      {booking.reference_code}
                    </div>
                  </div>

                  <div className="space-y-4 rounded-xl bg-[#1e3a5f]/5 p-6">
                    <Row icon={CalendarIcon} label="Agenda Date">
                      {prettyDate}
                    </Row>
                    <Row icon={Clock} label="Agenda Time (Dubai)">
                      {booking.preferred_time?.slice(0, 5)}
                    </Row>
                    <Row icon={isVideo ? Video : Phone} label="Consultation Type">
                      {isVideo ? "Video Call" : "Phone Call"}
                    </Row>
                    <Row icon={Hash} label="Booking Status">
                      <Badge className={statusTone[booking.status] || "bg-gray-100 text-gray-700"}>
                        {booking.status}
                      </Badge>
                    </Row>
                    <Row icon={CreditCard} label="Payment Status">
                      <span className="flex items-center gap-2">
                        <Badge className={statusTone[booking.payment_status] || "bg-gray-100 text-gray-700"}>
                          {booking.payment_status}
                        </Badge>
                        <span className="text-sm text-gray-500">$200 consultation</span>
                      </span>
                    </Row>
                    {booking.destination && (
                      <Row icon={MessageCircle} label="Destination">
                        {booking.destination}
                      </Row>
                    )}
                  </div>

                  <div className="space-y-3 pt-2">
                    <a
                      href={`https://wa.me/971547474404?text=${encodeURIComponent(
                        `Hello, this is ${booking.name}. My consultation reference is ${booking.reference_code}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-[#04291a]">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Chat with us on WhatsApp
                      </Button>
                    </a>
                    <Link to={lp("/")}>
                      <Button variant="outline" className="w-full">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
