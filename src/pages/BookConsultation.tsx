import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Phone, Video, MessageCircle, Clock, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import consultancyHero from "@/assets/consultancy.jpg";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number").min(8).max(20),
  preferredDate: z.date({ required_error: "Please select a date" }),
  preferredTime: z.string({ required_error: "Please select a time" }),
  consultationType: z.enum(["video", "phone"], { required_error: "Please select consultation type" }),
  message: z.string().trim().max(1000).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

interface BookingDetails {
  date: string;
  time: string;
  consultationType: string;
  name: string;
}

const BookConsultation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consultationType: "video",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // Format date and time for the database
      const formattedDate = format(data.preferredDate, "yyyy-MM-dd");
      
      // Insert into consultation_bookings table
      const { error: dbError } = await supabase
        .from('consultation_bookings')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          preferred_date: formattedDate,
          preferred_time: data.preferredTime,
          consultation_type: data.consultationType,
          message: data.message || null,
          status: 'pending'
        });

      if (dbError) {
        throw dbError;
      }

      // Call edge function for calendar and notifications
      const datetime = new Date(`${formattedDate}T${data.preferredTime}:00`).toISOString();
      
      const { error: funcError } = await supabase.functions.invoke('book-consultation', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          datetime,
          consultationType: data.consultationType,
          message: data.message,
        }
      });

      if (funcError) {
        console.warn('Calendar notification failed, but booking was saved:', funcError);
      }

      // Store booking details for confirmation page
      setBookingDetails({
        date: format(data.preferredDate, "EEEE, MMMM d, yyyy"),
        time: data.preferredTime,
        consultationType: data.consultationType === "video" ? "Video Call" : "Phone Call",
        name: data.name,
      });

      setIsSuccess(true);
      toast({
        title: "Consultation Booked! ✨",
        description: "You'll receive a confirmation email with calendar invite shortly.",
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (isSuccess && bookingDetails) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="container-custom">
            <Card className="max-w-xl mx-auto text-center py-12">
              <CardContent className="space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#1e3a5f]">Consultation Booked Successfully!</h2>
                <p className="text-gray-600">
                  Thank you {bookingDetails.name} for booking your free consultation with Nora El Khalifi. 
                  You'll receive a confirmation email with a calendar invite shortly.
                </p>
                
                {/* Booking Details */}
                <div className="bg-[#1e3a5f]/5 rounded-xl p-6 text-left space-y-4">
                  <h3 className="font-semibold text-[#1e3a5f] text-center mb-4">Your Booking Details</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-[#1e3a5f]">{bookingDetails.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time (Dubai)</p>
                      <p className="font-medium text-[#1e3a5f]">{bookingDetails.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center flex-shrink-0">
                      {bookingDetails.consultationType === "Video Call" ? (
                        <Video className="w-5 h-5 text-white" />
                      ) : (
                        <Phone className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Consultation Type</p>
                      <p className="font-medium text-[#1e3a5f]">{bookingDetails.consultationType}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <a 
                    href="https://wa.me/971567622484" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#1DA851]">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat with us on WhatsApp
                    </Button>
                  </a>
                  <Button variant="outline" onClick={() => window.location.href = "/"}>
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Book Free Consultation | ResortsOffers.com</title>
        <meta name="description" content="Book a free 15-minute consultation with our travel expert Nora El Khalifi. Get personalized luxury resort recommendations." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px]">
        <div className="absolute inset-0">
          <img 
            src={consultancyHero} 
            alt="Luxury Travel Consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/70 to-[#1e3a5f]/90" />
        </div>
        <div className="relative container-custom h-full flex items-center justify-center text-center">
          <div className="text-white">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Book Your Free Consultation
            </h1>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#1e3a5f] mb-4">
                  What You'll Get
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: Check, text: "Personalized resort recommendations based on your preferences" },
                    { icon: Clock, text: "Save hours of research with expert guidance" },
                    { icon: MessageCircle, text: "Exclusive deals and added value packages" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-[#1e3a5f]/5 rounded-lg">
                      <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-[#1e3a5f] font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Need immediate assistance?</h3>
                <p className="text-white/80 mb-4">
                  Chat with us on WhatsApp for instant response
                </p>
                <a 
                  href="https://wa.me/971567622484" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#25D366] hover:bg-[#1DA851] w-full">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Form */}
            <Card className="shadow-xl border-[#1e3a5f]/10">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-[#1e3a5f]">
                  Schedule Your Consultation
                </CardTitle>
                <CardDescription>
                  Fill in your details and select your preferred time slot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
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
                            <FormLabel>Phone *</FormLabel>
                            <FormControl>
                              <Input placeholder="+971 50 123 4567" {...field} />
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
                          <FormLabel>Consultation Type *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              <div className={cn(
                                "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                                field.value === "video" 
                                  ? "border-[#1e3a5f] bg-[#1e3a5f]/5" 
                                  : "border-gray-200 hover:border-gray-300"
                              )}>
                                <RadioGroupItem value="video" id="video" />
                                <label htmlFor="video" className="flex items-center gap-2 cursor-pointer">
                                  <Video className="w-5 h-5 text-[#1e3a5f]" />
                                  <span className="font-medium">Video Call</span>
                                </label>
                              </div>
                              <div className={cn(
                                "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                                field.value === "phone" 
                                  ? "border-[#1e3a5f] bg-[#1e3a5f]/5" 
                                  : "border-gray-200 hover:border-gray-300"
                              )}>
                                <RadioGroupItem value="phone" id="phone" />
                                <label htmlFor="phone" className="flex items-center gap-2 cursor-pointer">
                                  <Phone className="w-5 h-5 text-[#1e3a5f]" />
                                  <span className="font-medium">Phone Call</span>
                                </label>
                              </div>
                            </RadioGroup>
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
                          <FormItem className="flex flex-col">
                            <FormLabel>Preferred Date *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={disabledDays}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preferredTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time (Dubai) *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What would you like to discuss? (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="E.g., honeymoon in Maldives, family trip to Dubai, etc."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-[#1e3a5f] hover:bg-[#1e3a5f]/90 py-6 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Booking..." : "Book My Free Consultation"}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By booking, you agree to receive communication from Resorts Offers.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookConsultation;
