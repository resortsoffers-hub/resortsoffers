import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  const blogPosts = [
    {
      id: "maldives-luxury-guide-2025",
      title: "Ultimate Guide to Maldives Luxury Resorts in 2025",
      excerpt: "Discover the most exclusive overwater villas and pristine island escapes in the Maldives with our comprehensive guide.",
      category: "Destination Guides",
      author: "Nora El Khalifi",
      date: "2025-01-15",
      readTime: "8 min",
      image: "/placeholder.svg"
    },
    {
      id: "booking-luxury-resorts-tips",
      title: "10 Expert Tips for Booking Luxury Resorts at the Best Prices",
      excerpt: "Learn insider secrets to secure amazing deals on five-star accommodations without compromising on quality.",
      category: "Travel Tips",
      author: "Travel Team",
      date: "2025-01-10",
      readTime: "6 min",
      image: "/placeholder.svg"
    },
    {
      id: "seychelles-vs-mauritius",
      title: "Seychelles vs Mauritius: Which Paradise Island Should You Choose?",
      excerpt: "A detailed comparison of two Indian Ocean gems to help you decide your next luxury island getaway.",
      category: "Destination Guides",
      author: "Nora El Khalifi",
      date: "2025-01-05",
      readTime: "10 min",
      image: "/placeholder.svg"
    },
    {
      id: "sustainable-luxury-travel",
      title: "The Rise of Sustainable Luxury Travel in 2025",
      excerpt: "How eco-conscious resorts are redefining luxury without compromising on comfort and elegance.",
      category: "Industry Trends",
      author: "Travel Team",
      date: "2024-12-28",
      readTime: "7 min",
      image: "/placeholder.svg"
    },
    {
      id: "honeymoon-destinations-2025",
      title: "Top 10 Honeymoon Destinations for 2025",
      excerpt: "Romantic escapes perfect for celebrating your new life together in style and luxury.",
      category: "Special Occasions",
      author: "Nora El Khalifi",
      date: "2024-12-20",
      readTime: "9 min",
      image: "/placeholder.svg"
    },
    {
      id: "all-inclusive-vs-a-la-carte",
      title: "All-Inclusive vs À La Carte: Which Resort Style Suits You?",
      excerpt: "Understanding the pros and cons of different resort packages to maximize your vacation value.",
      category: "Travel Tips",
      author: "Travel Team",
      date: "2024-12-15",
      readTime: "5 min",
      image: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Destination Guides", "Travel Tips", "Industry Trends", "Special Occasions"];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Luxury Travel Blog - Resorts Offers</title>
        <meta name="description" content="Expert insights, destination guides, and travel tips for luxury resort experiences worldwide." />
        <link rel="canonical" href="https://www.resortsoffers.com/blog" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="section-padding mt-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Travel Insights & Guides
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Expert advice and inspiration for your next luxury escape
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="flex gap-2 flex-wrap justify-center mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-105 transition-transform duration-300" />
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {post.category}
                    </Badge>
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Never Miss a Travel Tip</CardTitle>
              <CardDescription className="text-lg">
                Subscribe to our newsletter for exclusive insights, deals, and destination guides.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                />
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
