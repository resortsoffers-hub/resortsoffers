import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const nationalities = [
  "United Arab Emirates",
  "Saudi Arabia", 
  "Kuwait",
  "Qatar",
  "Bahrain",
  "Oman",
  "Egypt",
  "Jordan",
  "Lebanon",
  "Morocco",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Russia",
  "China",
  "India",
  "Australia",
  "Canada",
  "Japan",
  "South Korea",
  "Brazil",
  "South Africa",
  "Other"
];

const destinations = [
  "Maldives",
  "Dubai",
  "Thailand",
  "Bali",
  "Seychelles",
  "Mauritius",
  "Phuket",
  "Greece",
  "Italy",
  "Switzerland",
  "France",
  "Spain",
  "Morocco",
  "Turkey",
  "Japan",
  "Vietnam",
  "Other"
];

const reviewSchema = z.object({
  customer_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  nationality: z.string().min(1, "Please select your nationality"),
  destination: z.string().min(1, "Please select a destination"),
  hotel_name: z.string().trim().min(2, "Hotel name must be at least 2 characters").max(200),
  travel_start_date: z.string().min(1, "Please select travel start date"),
  travel_end_date: z.string().min(1, "Please select travel end date"),
  rating: z.number().min(1, "Please select a rating").max(5),
  review_text: z.string().trim().min(20, "Review must be at least 20 characters").max(2000),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ReviewSubmissionForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const selectedDestination = watch("destination");

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("customer_reviews").insert({
        customer_name: data.customer_name,
        nationality: data.nationality,
        destination: data.destination,
        hotel_name: data.hotel_name,
        travel_start_date: data.travel_start_date,
        travel_end_date: data.travel_end_date,
        rating: data.rating,
        review_text: data.review_text,
      });

      if (error) throw error;

      toast.success("Thank you for your review!", {
        description: "Your review has been submitted and will be published after approval.",
      });
      
      reset();
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
    setValue("rating", value, { shouldValidate: true });
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">Share Your Experience</CardTitle>
        <CardDescription className="text-base">
          Tell us about your luxury resort vacation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customer_name">Your Name *</Label>
              <Input
                id="customer_name"
                placeholder="Enter your name"
                {...register("customer_name")}
              />
              {errors.customer_name && (
                <p className="text-sm text-destructive">{errors.customer_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality *</Label>
              <Select onValueChange={(value) => setValue("nationality", value, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nat) => (
                    <SelectItem key={nat} value={nat}>
                      {nat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.nationality && (
                <p className="text-sm text-destructive">{errors.nationality.message}</p>
              )}
            </div>
          </div>

          {/* Trip Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <Select onValueChange={(value) => setValue("destination", value, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.destination && (
                <p className="text-sm text-destructive">{errors.destination.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hotel_name">Hotel/Resort Name *</Label>
              <Input
                id="hotel_name"
                placeholder="Enter hotel or resort name"
                {...register("hotel_name")}
              />
              {errors.hotel_name && (
                <p className="text-sm text-destructive">{errors.hotel_name.message}</p>
              )}
            </div>
          </div>

          {/* Travel Dates */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="travel_start_date">Travel Start Date *</Label>
              <Input
                id="travel_start_date"
                type="date"
                {...register("travel_start_date")}
              />
              {errors.travel_start_date && (
                <p className="text-sm text-destructive">{errors.travel_start_date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="travel_end_date">Travel End Date *</Label>
              <Input
                id="travel_end_date"
                type="date"
                {...register("travel_end_date")}
              />
              {errors.travel_end_date && (
                <p className="text-sm text-destructive">{errors.travel_end_date.message}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-sm text-destructive">{errors.rating.message}</p>
            )}
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="review_text">Your Review *</Label>
            <Textarea
              id="review_text"
              placeholder="Share your experience... What did you love about your stay? Any highlights or recommendations?"
              rows={5}
              {...register("review_text")}
            />
            {errors.review_text && (
              <p className="text-sm text-destructive">{errors.review_text.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            Your review will be published after approval
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewSubmissionForm;
