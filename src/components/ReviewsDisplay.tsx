import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Globe, Calendar, User, Play, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Review {
  id: string;
  customer_name: string;
  nationality: string | null;
  destination: string;
  hotel_name: string;
  travel_start_date: string;
  travel_end_date: string;
  rating: number;
  review_text: string;
  media_urls: string[] | null;
  created_at: string;
}

const nationalities = [
  "All Nationalities",
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
  "All Destinations",
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

const ReviewsDisplay = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNationality, setSelectedNationality] = useState("All Nationalities");
  const [selectedDestination, setSelectedDestination] = useState("All Destinations");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [lightboxMedia, setLightboxMedia] = useState<string | null>(null);

  const isVideo = (url: string) => {
    return /\.(mp4|mov|avi|webm)$/i.test(url);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (data && !error) {
        const formattedReviews: Review[] = data.map((review) => ({
          ...review,
          media_urls: Array.isArray(review.media_urls) ? review.media_urls as string[] : null,
        }));
        setReviews(formattedReviews);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesNationality = 
        selectedNationality === "All Nationalities" || 
        review.nationality === selectedNationality;
      const matchesDestination = 
        selectedDestination === "All Destinations" || 
        review.destination === selectedDestination;
      const matchesRating =
        selectedRating === "All Ratings" ||
        review.rating === parseInt(selectedRating);
      return matchesNationality && matchesDestination && matchesRating;
    });
  }, [reviews, selectedNationality, selectedDestination, selectedRating]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-muted animate-pulse rounded-lg" />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-xl">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Nationality
          </label>
          <Select value={selectedNationality} onValueChange={setSelectedNationality}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {nationalities.map((nat) => (
                <SelectItem key={nat} value={nat}>
                  {nat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Destination
          </label>
          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {destinations.map((dest) => (
                <SelectItem key={dest} value={dest}>
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Star className="w-4 h-4" />
            Rating
          </label>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="All Ratings">All Ratings</SelectItem>
              <SelectItem value="5">⭐⭐⭐⭐⭐ 5 Stars</SelectItem>
              <SelectItem value="4">⭐⭐⭐⭐ 4 Stars</SelectItem>
              <SelectItem value="3">⭐⭐⭐ 3 Stars</SelectItem>
              <SelectItem value="2">⭐⭐ 2 Stars</SelectItem>
              <SelectItem value="1">⭐ 1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredReviews.length} review{filteredReviews.length !== 1 ? "s" : ""}
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.customer_name}</h4>
                      {review.nationality && (
                        <p className="text-sm text-muted-foreground">{review.nationality}</p>
                      )}
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {review.destination}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {review.hotel_name}
                  </Badge>
                </div>

                {/* Media Gallery */}
                {review.media_urls && review.media_urls.length > 0 && (
                  <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                    {review.media_urls.slice(0, 4).map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setLightboxMedia(url)}
                        className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border hover:opacity-80 transition-opacity"
                      >
                        {isVideo(url) ? (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Play className="w-6 h-6 text-primary" />
                          </div>
                        ) : (
                          <img
                            src={url}
                            alt={`Review media ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {index === 3 && review.media_urls && review.media_urls.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              +{review.media_urls.length - 4}
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Review Text */}
                <p className="text-sm text-foreground mb-3 line-clamp-4">
                  {review.review_text}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t">
                  <Calendar className="w-3 h-3" />
                  <span>
                    Traveled: {format(new Date(review.travel_start_date), "MMM yyyy")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No reviews found matching your filters. Try adjusting your search criteria.
          </p>
        </Card>
      )}

      {/* Media Lightbox */}
      <Dialog open={!!lightboxMedia} onOpenChange={() => setLightboxMedia(null)}>
        <DialogContent className="max-w-4xl p-2">
          {lightboxMedia && (
            isVideo(lightboxMedia) ? (
              <video
                src={lightboxMedia}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-lg"
              />
            ) : (
              <img
                src={lightboxMedia}
                alt="Review media"
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsDisplay;
