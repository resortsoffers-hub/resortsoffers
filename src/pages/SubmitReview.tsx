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
import { Star, Upload, Send, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const reviewSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  destination: z.string().min(2, "Please enter your destination"),
  hotelName: z.string().min(2, "Please enter the hotel name"),
  travelStartDate: z.string(),
  travelEndDate: z.string(),
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
});

const surveySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  interestedDestination: z.string().min(2, "Please select a destination"),
  travelType: z.string().min(2, "Please select travel type"),
  budget: z.string().min(1, "Please select your budget range"),
  message: z.string().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;
type SurveyFormData = z.infer<typeof surveySchema>;

export default function SubmitReview() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [submitTab, setSubmitTab] = useState<"review" | "survey">("review");

  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const surveyForm = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
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
      const { error } = await supabase.from("customer_reviews").insert({
        customer_name: data.customerName,
        destination: data.destination,
        hotel_name: data.hotelName,
        travel_start_date: data.travelStartDate,
        travel_end_date: data.travelEndDate,
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

  const onSurveySubmit = async (data: SurveyFormData) => {
    try {
      // For now, we'll just show a success message
      // You can later create a survey responses table if needed
      console.log("Survey data:", data);
      toast.success("Thank you! We'll send you personalized offers soon.");
      surveyForm.reset();
    } catch (error: any) {
      toast.error("Error submitting survey: " + error.message);
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
              We'd love to hear about your journey and help you plan your next adventure
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex gap-4 mb-8 justify-center">
            <Button
              variant={submitTab === "review" ? "default" : "outline"}
              onClick={() => setSubmitTab("review")}
              className="min-w-[150px]"
            >
              Submit Review
            </Button>
            <Button
              variant={submitTab === "survey" ? "default" : "outline"}
              onClick={() => setSubmitTab("survey")}
              className="min-w-[150px]"
            >
              Travel Survey
            </Button>
          </div>

          {/* Review Form */}
          {submitTab === "review" && (
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="travelStartDate">Check-in Date *</Label>
                      <Input
                        id="travelStartDate"
                        type="date"
                        {...reviewForm.register("travelStartDate")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="travelEndDate">Check-out Date *</Label>
                      <Input
                        id="travelEndDate"
                        type="date"
                        {...reviewForm.register("travelEndDate")}
                      />
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
          )}

          {/* Survey Form */}
          {submitTab === "survey" && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-6 w-6 text-primary" />
                  Travel Preferences Survey
                </CardTitle>
                <CardDescription>
                  Help us create your perfect travel package
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={surveyForm.handleSubmit(onSurveySubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="surveyName">Your Name *</Label>
                      <Input
                        id="surveyName"
                        {...surveyForm.register("name")}
                        placeholder="John Doe"
                      />
                      {surveyForm.formState.errors.name && (
                        <p className="text-sm text-destructive">
                          {surveyForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="surveyEmail">Email *</Label>
                      <Input
                        id="surveyEmail"
                        type="email"
                        {...surveyForm.register("email")}
                        placeholder="john@example.com"
                      />
                      {surveyForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {surveyForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestedDestination">Destination of Interest *</Label>
                    <Select onValueChange={(value) => surveyForm.setValue("interestedDestination", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maldives">Maldives</SelectItem>
                        <SelectItem value="seychelles">Seychelles</SelectItem>
                        <SelectItem value="mauritius">Mauritius</SelectItem>
                        <SelectItem value="greece">Greece</SelectItem>
                        <SelectItem value="italy">Italy</SelectItem>
                        <SelectItem value="switzerland">Switzerland</SelectItem>
                        <SelectItem value="norway">Norway</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelType">Travel Type *</Label>
                    <Select onValueChange={(value) => surveyForm.setValue("travelType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select travel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="honeymoon">Honeymoon</SelectItem>
                        <SelectItem value="family">Family Vacation</SelectItem>
                        <SelectItem value="group">Group Travel</SelectItem>
                        <SelectItem value="solo">Solo Adventure</SelectItem>
                        <SelectItem value="business">Business & Leisure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range *</Label>
                    <Select onValueChange={(value) => surveyForm.setValue("budget", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget ($1,000 - $3,000)</SelectItem>
                        <SelectItem value="moderate">Moderate ($3,000 - $7,000)</SelectItem>
                        <SelectItem value="luxury">Luxury ($7,000 - $15,000)</SelectItem>
                        <SelectItem value="ultra-luxury">Ultra Luxury ($15,000+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surveyMessage">Additional Information</Label>
                    <Textarea
                      id="surveyMessage"
                      {...surveyForm.register("message")}
                      placeholder="Tell us about your travel preferences, special requests, or any questions..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={surveyForm.formState.isSubmitting}
                  >
                    {surveyForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Survey
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
