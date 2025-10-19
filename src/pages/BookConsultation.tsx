import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Clock, Video, Phone, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number with country code"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  consultationType: z.enum(["video", "phone"]),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookConsultation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      consultationType: "video",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("book-consultation", {
        body: {
          ...data,
          datetime: `${data.preferredDate}T${data.preferredTime}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Consultation Booked!",
        description: "You'll receive a calendar invite and WhatsApp confirmation shortly.",
      });

      form.reset();
    } catch (error) {
      console.error("Error booking consultation:", error);
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Book Free Consultation - Resorts Offers</title>
        <meta name="description" content="Book a free 15-minute consultation with our CEO Nora El Khalifi to discuss your luxury travel needs." />
        <link rel="canonical" href="https://www.resortsoffers.com/book-consultation" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="section-padding mt-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Book Your Free Consultation
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            15 minutes with our CEO Nora El Khalifi to discuss your luxury travel plans
          </p>
        </div>
      </section>

      {/* CEO Info Section */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
                <div>
                  <CardTitle className="text-2xl">Nora El Khalifi</CardTitle>
                  <CardDescription className="text-lg">CEO & Managing Director</CardDescription>
                  <CardDescription className="text-sm mt-1">Member of Dubai Business Women Council</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                With over 20 years in luxury hospitality, Nora personally assists clients in finding their perfect resort experience. 
                During your consultation, she'll help you:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Discover the best luxury destinations for your preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Get exclusive access to special offers and packages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Receive personalized recommendations based on your travel style</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Learn about upcoming luxury resort openings and deals</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Schedule Your Consultation</CardTitle>
              <CardDescription>Fill in your details and we'll send you a calendar invite</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number (with country code)</FormLabel>
                        <FormControl>
                          <Input placeholder="+971567622484" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="consultationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consultation Type</FormLabel>
                        <FormControl>
                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant={field.value === "video" ? "default" : "outline"}
                              onClick={() => field.onChange("video")}
                              className="flex-1"
                            >
                              <Video className="mr-2 h-4 w-4" />
                              Video Call
                            </Button>
                            <Button
                              type="button"
                              variant={field.value === "phone" ? "default" : "outline"}
                              onClick={() => field.onChange("phone")}
                              className="flex-1"
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Phone Call
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your travel plans or specific requirements..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    <Calendar className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Booking..." : "Book Free Consultation"}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>You'll receive a WhatsApp confirmation and calendar invite</span>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookConsultation;
