import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DESTINATIONS } from "@/lib/destinations";
import { useLocale } from "@/hooks/useLocale";

/**
 * Lightweight inquiry form for the homepage.
 * Writes to `hotel_inquiries` with `hotel_id = null` (general advisory request).
 */
const HomeInquiryForm = () => {
  const ar = useLocale() === "ar";
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    const { error } = await supabase.from("hotel_inquiries").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.destination
        ? `[${form.destination}] ${form.message}`
        : form.message || null,
      source_locale: ar ? "ar" : "en",
      hotel_id: null as unknown as string, // nullable in schema; general inquiry
    } as never);
    setSubmitting(false);
    if (!error) {
      setDone(true);
      setForm({ name: "", email: "", phone: "", destination: "", message: "" });
    }
  };

  if (done) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="font-serif text-2xl text-primary mb-2">
          {ar ? "تم استلام طلبك" : "We've got your request"}
        </h3>
        <p className="text-muted-foreground">
          {ar ? "سيتواصل معك مستشار خلال 24 ساعة." : "An advisor will be in touch within 24 hours."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">{ar ? "الاسم" : "Name"}</Label>
        <Input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">{ar ? "البريد الإلكتروني" : "Email"}</Label>
        <Input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone">{ar ? "واتساب / هاتف" : "WhatsApp / Phone"}</Label>
        <Input
          id="phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="destination">{ar ? "الوجهة" : "Destination"}</Label>
        <Select
          value={form.destination}
          onValueChange={(v) => setForm({ ...form, destination: v })}
        >
          <SelectTrigger id="destination">
            <SelectValue placeholder={ar ? "اختر وجهة" : "Select destination"} />
          </SelectTrigger>
          <SelectContent>
            {DESTINATIONS.map((d) => (
              <SelectItem key={d.slug} value={d.name_en}>
                {ar ? d.name_ar : d.name_en}
              </SelectItem>
            ))}
            <SelectItem value="Other">{ar ? "أخرى" : "Other / Surprise me"}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="message">{ar ? "نبذة عن رحلتك" : "Tell us about your trip"}</Label>
        <Textarea
          id="message"
          rows={4}
          placeholder={
            ar
              ? "تواريخ، عدد الضيوف، الميزانية التقريبية، نوع التجربة..."
              : "Dates, party size, rough budget, type of experience…"
          }
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <div className="sm:col-span-2 flex justify-end">
        <Button type="submit" disabled={submitting} className="gap-2">
          <Send className="h-4 w-4" />
          {submitting ? (ar ? "جاري الإرسال..." : "Sending…") : ar ? "إرسال الطلب" : "Send inquiry"}
        </Button>
      </div>
    </form>
  );
};

export default HomeInquiryForm;
