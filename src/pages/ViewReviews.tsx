import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Star, Search, Filter, MapPin, Hotel, Globe } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import type { Database } from "@/integrations/supabase/types";

type ReviewRow = Database["public"]["Tables"]["customer_reviews"]["Row"];

export default function ViewReviews() {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

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

    return matchesSearch && matchesDestination && matchesRating;
  });

  const uniqueDestinations = Array.from(
    new Set(reviews.map((r) => r.destination))
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
              Customer Reviews
            </h1>
            <p className="text-lg text-muted-foreground">
              Authentic experiences from travelers who explored the world with us
            </p>
          </div>

          {/* Enhanced Search and Filter Bar */}
          <Card className="mb-8 border-2 shadow-lg backdrop-blur-sm bg-background/95 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
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
