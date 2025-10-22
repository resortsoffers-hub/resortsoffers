import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import maldivesImage from "@/assets/blog/maldives-luxury-2025.jpg";
import bookingTipsImage from "@/assets/blog/booking-tips.jpg";
import seychellesMauritiusImage from "@/assets/blog/seychelles-mauritius.jpg";
import sustainableLuxuryImage from "@/assets/blog/sustainable-luxury.jpg";
import honeymoonImage from "@/assets/blog/honeymoon-2025.jpg";
import resortDiningImage from "@/assets/blog/resort-dining.jpg";

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
      image: maldivesImage,
      alt: "Luxury overwater villas in Maldives at sunset with crystal clear turquoise water"
    },
    {
      id: "booking-luxury-resorts-tips",
      title: "10 Expert Tips for Booking Luxury Resorts at the Best Prices",
      excerpt: "Learn insider secrets to secure amazing deals on five-star accommodations without compromising on quality.",
      category: "Travel Tips",
      author: "Travel Team",
      date: "2025-01-10",
      readTime: "6 min",
      image: bookingTipsImage,
      alt: "Elegant luxury hotel lobby with premium concierge service desk"
    },
    {
      id: "seychelles-vs-mauritius",
      title: "Seychelles vs Mauritius: Which Paradise Island Should You Choose?",
      excerpt: "A detailed comparison of two Indian Ocean gems to help you decide your next luxury island getaway.",
      category: "Destination Guides",
      author: "Nora El Khalifi",
      date: "2025-01-05",
      readTime: "10 min",
      image: seychellesMauritiusImage,
      alt: "Tropical paradise islands Seychelles and Mauritius aerial view comparison"
    },
    {
      id: "sustainable-luxury-travel",
      title: "The Rise of Sustainable Luxury Travel in 2025",
      excerpt: "How eco-conscious resorts are redefining luxury without compromising on comfort and elegance.",
      category: "Industry Trends",
      author: "Travel Team",
      date: "2024-12-28",
      readTime: "7 min",
      image: sustainableLuxuryImage,
      alt: "Eco-luxury sustainable resort with natural architecture and tropical environment"
    },
    {
      id: "honeymoon-destinations-2025",
      title: "Top 10 Honeymoon Destinations for 2025",
      excerpt: "Romantic escapes perfect for celebrating your new life together in style and luxury.",
      category: "Special Occasions",
      author: "Nora El Khalifi",
      date: "2024-12-20",
      readTime: "9 min",
      image: honeymoonImage,
      alt: "Romantic beach dinner setup at sunset for honeymoon couples at luxury resort"
    },
    {
      id: "all-inclusive-vs-a-la-carte",
      title: "All-Inclusive vs À La Carte: Which Resort Style Suits You?",
      excerpt: "Understanding the pros and cons of different resort packages to maximize your vacation value.",
      category: "Travel Tips",
      author: "Travel Team",
      date: "2024-12-15",
      readTime: "5 min",
      image: resortDiningImage,
      alt: "Luxury resort fine dining experience with gourmet food presentation"
    }
  ];

  const categories = ["All", "Destination Guides", "Travel Tips", "Industry Trends", "Special Occasions"];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Luxury Travel Blog - Resort Guides, Tips & Destination Insights | ResortsOffers.com</title>
        <meta name="description" content="Expert travel blog with luxury resort reviews, destination guides, booking tips, honeymoon ideas, and insider travel advice. Updated weekly with fresh content." />
        <meta name="keywords" content="travel blog, resort reviews, destination guides, travel tips, luxury travel advice, honeymoon destinations, vacation planning tips" />
        <link rel="canonical" href="https://www.resortsoffers.com/blog" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://www.resortsoffers.com/blog" />
        <meta property="og:site_name" content="ResortsOffers.com" />
        <meta property="og:title" content="Luxury Travel Blog - Resort Guides & Tips" />
        <meta property="og:description" content="Expert travel insights, destination guides, and luxury resort reviews." />
        <meta property="og:image" content="https://www.resortsoffers.com/blog-og.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Travel Blog" />
        <meta name="twitter:description" content="Resort guides, tips & destination insights." />
        
        {/* Structured Data - Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.resortsoffers.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://www.resortsoffers.com/blog"
              }
            ]
          })}
        </script>
        {/* Structured Data - Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "ResortsOffers Travel Blog",
            "description": "Luxury travel insights and resort guides",
            "url": "https://www.resortsoffers.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "ResortsOffers.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.resortsoffers.com/logo.png"
              }
            },
            "blogPost": [
              {
                "@type": "BlogPosting",
                "headline": "Ultimate Guide to Maldives Luxury Resorts in 2025",
                "datePublished": "2025-01-15",
                "author": {
                  "@type": "Person",
                  "name": "Nora El Khalifi"
                }
              }
            ]
          })}
        </script>
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
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
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
