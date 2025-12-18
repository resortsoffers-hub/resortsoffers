import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Star, Search, Filter, MapPin, Hotel, Globe, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import type { Database } from "@/integrations/supabase/types";
import { getAllDestinations } from "@/data/destinationsData";

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

type ReviewRow = Database["public"]["Tables"]["customer_reviews"]["Row"];

export default function ViewReviews() {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState("");

  const destinations = useMemo(() => getAllDestinations(), []);

  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewLanguage: "en",
    },
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error: any) {
      toast.error("Error loading reviews: " + error.message);
    } finally {
      setLoading(false);
    }
  };

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
      const startDate = `${data.stayYear}-${data.stayMonth}-01`;
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
      setSelectedDestination("");
    } catch (error: any) {
      toast.error("Error submitting review: " + error.message);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.hotel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.review_text.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDestination =
      destinationFilter === "all" ||
      review.destination === destinationFilter;

    const matchesRating =
      ratingFilter === "all" || 
      (ratingFilter === "5" && review.rating === 5) ||
      (ratingFilter === "4" && review.rating >= 4) ||
      (ratingFilter === "3" && review.rating >= 3);

    const matchesNationality =
      nationalityFilter === "all" ||
      (review.nationality && review.nationality === nationalityFilter);

    const matchesHotel =
      hotelFilter === "all" ||
      review.hotel_name === hotelFilter;

    return matchesSearch && matchesDestination && matchesRating && matchesNationality && matchesHotel;
  });

  const uniqueDestinations = Array.from(
    new Set(reviews.map((r) => r.destination))
  );

  const uniqueNationalities = Array.from(
    new Set(reviews.map((r) => r.nationality).filter((n): n is string => Boolean(n)))
  );

  const uniqueHotels = Array.from(
    new Set(reviews.map((r) => r.hotel_name))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80')] opacity-5 bg-cover bg-center" />
        
        <div className="container-custom max-w-7xl relative z-10">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Share Your Experience
            </h1>
            <p className="text-lg text-muted-foreground">
              Submit your review and see what others are saying
            </p>
          </div>

          {/* Review Submission Form */}
          <Card className="mb-12 border-2 shadow-2xl backdrop-blur-sm bg-background/95 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                Submit Your Review
              </CardTitle>
              <CardDescription className="text-base">
                Share your travel experience and help other travelers make informed decisions
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
                        reviewForm.setValue("hotelName", "");
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
                  <div className="relative">
                    <Input
                      id="hotelName"
                      {...reviewForm.register("hotelName")}
                      placeholder="Enter hotel/resort name"
                    />
                  </div>
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
                    <Select
                      value={reviewForm.watch("stayMonth")}
                      onValueChange={(value) => reviewForm.setValue("stayMonth", value)}
                    >
                      <SelectTrigger id="stayMonth">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01">January</SelectItem>
                        <SelectItem value="02">February</SelectItem>
                        <SelectItem value="03">March</SelectItem>
                        <SelectItem value="04">April</SelectItem>
                        <SelectItem value="05">May</SelectItem>
                        <SelectItem value="06">June</SelectItem>
                        <SelectItem value="07">July</SelectItem>
                        <SelectItem value="08">August</SelectItem>
                        <SelectItem value="09">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                    {reviewForm.formState.errors.stayMonth && (
                      <p className="text-sm text-destructive">
                        {reviewForm.formState.errors.stayMonth.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stayYear">Year of Stay *</Label>
                    <Select
                      value={reviewForm.watch("stayYear")}
                      onValueChange={(value) => reviewForm.setValue("stayYear", value)}
                    >
                      <SelectTrigger id="stayYear">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <Label htmlFor="media">Upload Photos/Videos (Optional)</Label>
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

          {/* Browse Reviews Section */}
          <div className="text-center mb-8 mt-16">
            <h2 className="text-3xl font-bold mb-2">Browse Customer Reviews</h2>
            <p className="text-muted-foreground">See what other travelers are saying about their experiences</p>
          </div>

          {/* Enhanced Search and Filter Bar */}
          <Card className="mb-8 border-2 shadow-lg backdrop-blur-sm bg-background/95 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Filter Reviews</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search" className="flex items-center gap-2 text-sm font-medium">
                    <Search className="h-4 w-4" />
                    Search
                  </Label>
                  <Input
                    id="search"
                    placeholder="Search by name, hotel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4" />
                    Destination
                  </Label>
                  <Select value={destinationFilter} onValueChange={setDestinationFilter}>
                    <SelectTrigger id="destination">
                      <SelectValue placeholder="All Destinations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Destinations</SelectItem>
                      {uniqueDestinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating" className="flex items-center gap-2 text-sm font-medium">
                    <Star className="h-4 w-4" />
                    Rating
                  </Label>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars Only</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Globe className="h-4 w-4" />
                    Results
                  </Label>
                  <div className="flex h-10 items-center px-3 rounded-md border border-input bg-muted/50">
                    <span className="text-sm font-semibold text-primary">
                      {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4" />
              <p className="text-muted-foreground">Loading reviews...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <Card className="text-center py-12 border-2 border-dashed">
              <CardContent>
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review, index) => (
                <Card 
                  key={review.id} 
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 backdrop-blur-sm bg-background/95 animate-in fade-in slide-in-from-bottom-8" 
                  style={{ animationDelay: `${index * 50}ms`, animationDuration: '700ms' }}
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Header with Customer Info and Rating */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {review.customer_name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{review.destination}</span>
                        </div>
                        {review.nationality && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="h-3 w-3" />
                            <span>{review.nationality}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-0.5 shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 transition-colors ${
                              i < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Hotel Name */}
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <Hotel className="h-4 w-4 text-primary shrink-0" />
                      <p className="text-sm font-semibold line-clamp-1">{review.hotel_name}</p>
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                      {review.review_text}
                    </p>
                    
                    {/* Travel Period */}
                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Travel Period:</p>
                      <p className="text-sm font-medium">
                        {format(new Date(review.travel_start_date), 'MMM yyyy')}
                      </p>
                    </div>

                    {/* Media indicator if available */}
                    {review.media_urls && Array.isArray(review.media_urls) && review.media_urls.length > 0 && (
                      <div className="flex items-center gap-2 text-xs text-primary">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span>Includes photos/videos</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
