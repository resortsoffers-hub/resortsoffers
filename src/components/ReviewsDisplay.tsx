import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Globe, Calendar, User, Play, ChevronLeft, ChevronRight, X, Building2 } from "lucide-react";
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
  const [selectedHotel, setSelectedHotel] = useState("All Hotels");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMediaList, setLightboxMediaList] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Get unique hotel names filtered by selected destination
  const availableHotels = useMemo(() => {
    const filteredReviews = selectedDestination === "All Destinations"
      ? reviews
      : reviews.filter(r => r.destination === selectedDestination);
    
    const hotelSet = new Set(filteredReviews.map(r => r.hotel_name));
    return ["All Hotels", ...Array.from(hotelSet).sort()];
  }, [reviews, selectedDestination]);

  // Reset hotel filter when destination changes
  useEffect(() => {
    setSelectedHotel("All Hotels");
  }, [selectedDestination]);

  const openLightbox = (mediaUrls: string[], startIndex: number) => {
    setLightboxMediaList(mediaUrls);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxMediaList([]);
    setLightboxIndex(0);
  };

  const goToPrevious = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? lightboxMediaList.length - 1 : prev - 1));
  }, [lightboxMediaList.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === lightboxMediaList.length - 1 ? 0 : prev + 1));
  }, [lightboxMediaList.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);
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
      const matchesHotel =
        selectedHotel === "All Hotels" ||
        review.hotel_name === selectedHotel;
      const matchesRating =
        selectedRating === "All Ratings" ||
        review.rating === parseInt(selectedRating);
      return matchesNationality && matchesDestination && matchesHotel && matchesRating;
    });
  }, [reviews, selectedNationality, selectedDestination, selectedHotel, selectedRating]);

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
            <Building2 className="w-4 h-4" />
            Hotel
          </label>
          <Select value={selectedHotel} onValueChange={setSelectedHotel}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select hotel" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50 max-h-60">
              {availableHotels.map((hotel) => (
                <SelectItem key={hotel} value={hotel}>
                  {hotel}
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
                        onClick={() => openLightbox(review.media_urls!, index)}
                        className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border hover:opacity-80 transition-opacity group"
                      >
                        {isVideo(url) ? (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Play className="w-6 h-6 text-primary" />
                          </div>
                        ) : (
                          <img
                            src={url}
                            alt={`Review media ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
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

      {/* Media Lightbox with Carousel */}
      <Dialog open={lightboxOpen} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <div className="relative flex flex-col items-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-2 right-2 z-50 text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Main Media Display */}
            <div className="relative w-full flex items-center justify-center min-h-[60vh] max-h-[80vh] p-4">
              {lightboxMediaList[lightboxIndex] && (
                isVideo(lightboxMediaList[lightboxIndex]) ? (
                  <video
                    key={lightboxIndex}
                    src={lightboxMediaList[lightboxIndex]}
                    controls
                    autoPlay
                    className="max-w-full max-h-[70vh] rounded-lg"
                  />
                ) : (
                  <img
                    key={lightboxIndex}
                    src={lightboxMediaList[lightboxIndex]}
                    alt={`Media ${lightboxIndex + 1}`}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  />
                )
              )}

              {/* Navigation Arrows */}
              {lightboxMediaList.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}
            </div>

            {/* Counter */}
            <div className="text-white/80 text-sm mb-2">
              {lightboxIndex + 1} / {lightboxMediaList.length}
            </div>

            {/* Thumbnail Strip */}
            {lightboxMediaList.length > 1 && (
              <div className="flex gap-2 px-4 pb-4 overflow-x-auto max-w-full">
                {lightboxMediaList.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxIndex(index)}
                    className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                      index === lightboxIndex ? "border-primary ring-2 ring-primary/50" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {isVideo(url) ? (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Play className="w-4 h-4 text-primary" />
                      </div>
                    ) : (
                      <img
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsDisplay;
