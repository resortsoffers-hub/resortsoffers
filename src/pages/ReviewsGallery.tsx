import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Star, MapPin, Hotel, Calendar, User, Filter, Search } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  customer_name: string;
  nationality: string;
  destination: string;
  hotel_name: string;
  travel_start_date: string;
  rating: number;
  review_text: string;
  media_urls: string[];
  created_at: string;
}

export default function ReviewsGallery() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDestination, setFilterDestination] = useState<string>("all");
  const [filterNationality, setFilterNationality] = useState<string>("all");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

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
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesDestination = filterDestination === "all" || review.destination.toLowerCase().includes(filterDestination.toLowerCase());
    const matchesNationality = filterNationality === "all" || review.nationality?.toLowerCase().includes(filterNationality.toLowerCase());
    const matchesRating = filterRating === "all" || 
      (filterRating === "positive" && review.rating >= 4) ||
      (filterRating === "neutral" && review.rating === 3) ||
      (filterRating === "negative" && review.rating <= 2);
    const matchesSearch = searchTerm === "" || 
      review.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review_text.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDestination && matchesNationality && matchesRating && matchesSearch;
  });

  const uniqueDestinations = Array.from(new Set(reviews.map(r => r.destination)));
  const uniqueNationalities = Array.from(new Set(reviews.map(r => r.nationality).filter(Boolean)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 section-padding bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Guest Reviews & Experiences
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover authentic travel stories and experiences shared by our valued clients from around the world
            </p>
          </div>

          {/* Filter Section */}
          <Card className="mb-8 border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Filter Reviews</h3>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Destination Filter */}
                <Select value={filterDestination} onValueChange={setFilterDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Destinations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Destinations</SelectItem>
                    {uniqueDestinations.map((dest) => (
                      <SelectItem key={dest} value={dest.toLowerCase()}>
                        {dest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Nationality Filter */}
                <Select value={filterNationality} onValueChange={setFilterNationality}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Nationalities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Nationalities</SelectItem>
                    {uniqueNationalities.map((nat) => (
                      <SelectItem key={nat} value={nat.toLowerCase()}>
                        {nat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Rating Filter */}
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="positive">Positive (4-5 ⭐)</SelectItem>
                    <SelectItem value="neutral">Neutral (3 ⭐)</SelectItem>
                    <SelectItem value="negative">Needs Improvement (1-2 ⭐)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredReviews.length} of {reviews.length} reviews
              </div>
            </CardContent>
          </Card>

          {/* Reviews Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading reviews...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No reviews found matching your filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-xl transition-all duration-300 border-2 overflow-hidden group">
                  <CardContent className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold text-lg">{review.customer_name}</h3>
                        </div>
                        {review.nationality && (
                          <Badge variant="secondary" className="text-xs">
                            {review.nationality}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Rating */}
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Destination & Hotel */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">{review.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Hotel className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{review.hotel_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(review.travel_start_date), "MMMM yyyy")}</span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="border-t pt-4">
                      <p className="text-sm text-foreground line-clamp-4 leading-relaxed">
                        "{review.review_text}"
                      </p>
                    </div>

                    {/* Media Preview */}
                    {review.media_urls && review.media_urls.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {review.media_urls.slice(0, 3).map((url, idx) => (
                          <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                            <img
                              src={url}
                              alt={`Review media ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Posted Date */}
                    <div className="text-xs text-muted-foreground border-t pt-3">
                      Posted {format(new Date(review.created_at), "MMM dd, yyyy")}
                    </div>
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
