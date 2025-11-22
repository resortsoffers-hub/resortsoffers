import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Star, Send, Loader2 } from "lucide-react";
import { getAllDestinations } from "@/data/destinationsData";
import { getAllResorts } from "@/data/resortsData";

// Main nationalities list
const NATIONALITIES = [
  "Emirati", "Saudi Arabian", "Kuwaiti", "Qatari", "Bahraini", "Omani",
  "American", "British", "Canadian", "Australian", "French", "German",
  "Italian", "Spanish", "Russian", "Chinese", "Indian", "Japanese",
  "Korean", "Malaysian", "Singaporean", "Egyptian", "Jordanian", "Lebanese"
];

const reviewSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  destination: z.string().min(1, "Please select your destination"),
  hotelName: z.string().min(2, "Please select or enter the hotel name"),
  nationality: z.string().min(1, "Please select your nationality"),
  stayMonth: z.string().min(1, "Please select the month of your stay"),
  stayYear: z.string().min(4, "Please enter the year"),
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
  reviewLanguage: z.enum(["en", "ar"]),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function SubmitReview() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState("");

  const destinations = useMemo(() => getAllDestinations(), []);
  const allResorts = useMemo(() => getAllResorts(), []);
  
  const filteredHotels = useMemo(() => {
    if (!selectedDestination) return allResorts;
    return allResorts.filter(resort => resort.region === selectedDestination);
  }, [selectedDestination, allResorts]);

  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewLanguage: "en",
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("review-media")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("review-media")
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      setUploadedFiles([...uploadedFiles, ...uploadedUrls]);
      toast.success(`${files.length} file(s) uploaded successfully!`);
    } catch (error: any) {
      toast.error("Error uploading files: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const onReviewSubmit = async (data: ReviewFormData) => {
    try {
      // Create date from month and year (first day of the month)
      const startDate = `${data.stayYear}-${data.stayMonth}-01`;
      // Create end date (last day of the month)
      const daysInMonth = new Date(parseInt(data.stayYear), parseInt(data.stayMonth), 0).getDate();
      const endDate = `${data.stayYear}-${data.stayMonth}-${daysInMonth}`;

      const { error } = await supabase.from("customer_reviews").insert({
        customer_name: data.customerName,
        destination: data.destination,
        hotel_name: data.hotelName,
        nationality: data.nationality || null,
        travel_start_date: startDate,
        travel_end_date: endDate,
        rating: data.rating,
        review_text: data.reviewText,
        media_urls: uploadedFiles,
        is_approved: false,
      });

      if (error) throw error;

      toast.success("Thank you! Your review has been submitted for approval.");
      reviewForm.reset();
      setRating(0);
      setUploadedFiles([]);
    } catch (error: any) {
      toast.error("Error submitting review: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')] opacity-5 bg-cover bg-center" />
        <div className="container-custom max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
              Share Your Experience
            </h1>
            <p className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              We'd love to hear about your wonderful travel experience
            </p>
          </div>

          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-background/95 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <CardHeader className="space-y-1 pb-8">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  Submit Your Review
                </CardTitle>
                <CardDescription className="text-base">
                  Share your experience and help other travelers make informed decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={reviewForm.handleSubmit(onReviewSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Your Name *</Label>
                      <Input
                        id="customerName"
                        {...reviewForm.register("customerName")}
                        placeholder="John Doe"
                      />
                      {reviewForm.formState.errors.customerName && (
                        <p className="text-sm text-destructive">
                          {reviewForm.formState.errors.customerName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination *</Label>
                      <Select
                        value={reviewForm.watch("destination")}
                        onValueChange={(value) => {
                          reviewForm.setValue("destination", value);
                          setSelectedDestination(value);
                          reviewForm.setValue("hotelName", ""); // Reset hotel when destination changes
                        }}
                      >
                        <SelectTrigger id="destination">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {destinations.map((dest) => (
                            <SelectItem key={dest.slug} value={dest.name}>
                              {dest.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {reviewForm.formState.errors.destination && (
                        <p className="text-sm text-destructive">
                          {reviewForm.formState.errors.destination.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hotelName">Hotel/Resort Name *</Label>
                    <Select
                      value={reviewForm.watch("hotelName")}
                      onValueChange={(value) => reviewForm.setValue("hotelName", value)}
                      disabled={!selectedDestination}
                    >
                      <SelectTrigger id="hotelName">
                        <SelectValue placeholder={selectedDestination ? "Select hotel/resort" : "Select destination first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredHotels.map((hotel) => (
                          <SelectItem key={hotel.slug} value={hotel.name}>
                            {hotel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {reviewForm.formState.errors.hotelName && (
                      <p className="text-sm text-destructive">
                        {reviewForm.formState.errors.hotelName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Select
                      value={reviewForm.watch("nationality")}
                      onValueChange={(value) => reviewForm.setValue("nationality", value)}
                    >
                      <SelectTrigger id="nationality">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        {NATIONALITIES.map((nationality) => (
                          <SelectItem key={nationality} value={nationality}>
                            {nationality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {reviewForm.formState.errors.nationality && (
                      <p className="text-sm text-destructive">
                        {reviewForm.formState.errors.nationality.message}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="stayMonth">Month of Stay *</Label>
                      <select
                        id="stayMonth"
                        {...reviewForm.register("stayMonth")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                      {reviewForm.formState.errors.stayMonth && (
                        <p className="text-sm text-destructive">
                          {reviewForm.formState.errors.stayMonth.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stayYear">Year *</Label>
                      <Input
                        id="stayYear"
                        type="number"
                        min="2020"
                        max="2025"
                        {...reviewForm.register("stayYear")}
                        placeholder="2024"
                      />
                      {reviewForm.formState.errors.stayYear && (
                        <p className="text-sm text-destructive">
                          {reviewForm.formState.errors.stayYear.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Your Rating *</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-10 w-10 cursor-pointer transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => {
                            setRating(star);
                            reviewForm.setValue("rating", star);
                          }}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reviewLanguage">Review Language *</Label>
                    <Select
                      value={reviewForm.watch("reviewLanguage")}
                      onValueChange={(value: "en" | "ar") => reviewForm.setValue("reviewLanguage", value)}
                    >
                      <SelectTrigger id="reviewLanguage">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">Arabic - العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reviewText">Your Review *</Label>
                    <Textarea
                      id="reviewText"
                      {...reviewForm.register("reviewText")}
                      placeholder={reviewForm.watch("reviewLanguage") === "ar" ? "شارك تجربتك معنا..." : "Share your experience with us..."}
                      rows={6}
                      className="resize-none"
                      dir={reviewForm.watch("reviewLanguage") === "ar" ? "rtl" : "ltr"}
                    />
                    {reviewForm.formState.errors.reviewText && (
                      <p className="text-sm text-destructive">
                        {reviewForm.formState.errors.reviewText.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="media">Upload Photos/Videos</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="media"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="flex-1"
                      />
                      {uploading && <Loader2 className="h-5 w-5 animate-spin" />}
                    </div>
                    {uploadedFiles.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {uploadedFiles.length} file(s) uploaded
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold"
                    disabled={reviewForm.formState.isSubmitting}
                  >
                    {reviewForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Your Review...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Review
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Your review will be published after approval
                  </p>
                </form>
              </CardContent>
            </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
