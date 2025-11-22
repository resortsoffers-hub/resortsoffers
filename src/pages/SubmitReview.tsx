import { useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Star, Send, Loader2 } from "lucide-react";

const reviewSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  destination: z.string().min(2, "Please enter your destination"),
  hotelName: z.string().min(2, "Please enter the hotel name"),
  nationality: z.string().optional(),
  stayMonth: z.string().min(1, "Please select the month of your stay"),
  stayYear: z.string().min(4, "Please enter the year"),
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function SubmitReview() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
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
      
      <main className="flex-1 section-padding bg-gradient-to-b from-background to-muted">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Share Your Experience
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your wonderful travel experience
            </p>
          </div>

          <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-primary" />
                  Submit Your Review
                </CardTitle>
                <CardDescription>
                  Tell us about your wonderful experience at your destination
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
                      <Input
                        id="destination"
                        {...reviewForm.register("destination")}
                        placeholder="Maldives"
                      />
                      {reviewForm.formState.errors.destination && (
                        <p className="text-sm text-destructive">
                          {reviewForm.formState.errors.destination.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hotelName">Hotel/Resort Name *</Label>
                    <Input
                      id="hotelName"
                      {...reviewForm.register("hotelName")}
                      placeholder="Four Seasons Resort"
                    />
                    {reviewForm.formState.errors.hotelName && (
                      <p className="text-sm text-destructive">
                        {reviewForm.formState.errors.hotelName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality (Optional)</Label>
                    <Input
                      id="nationality"
                      {...reviewForm.register("nationality")}
                      placeholder="e.g., American, British, UAE"
                    />
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
                    <Label htmlFor="reviewText">Your Review *</Label>
                    <Textarea
                      id="reviewText"
                      {...reviewForm.register("reviewText")}
                      placeholder="Share your experience with us..."
                      rows={6}
                      className="resize-none"
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
                    className="w-full"
                    disabled={reviewForm.formState.isSubmitting}
                  >
                    {reviewForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Review
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
