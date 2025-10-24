import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DOMPurify from "dompurify";

const BlogPost = () => {
  const { slug } = useParams();

  // This would typically come from a CMS or database
  const post = {
    id: slug,
    title: "Ultimate Guide to Maldives Luxury Resorts in 2025",
    excerpt: "Discover the most exclusive overwater villas and pristine island escapes in the Maldives with our comprehensive guide.",
    category: "Destination Guides",
    author: "Nora El Khalifi",
    date: "2025-01-15",
    readTime: "8 min",
    content: `
      <p>The Maldives remains one of the world's most sought-after luxury destinations, and 2025 brings even more spectacular resort openings and renovations to this island paradise.</p>

      <h2>Why the Maldives?</h2>
      <p>With its crystal-clear turquoise waters, pristine white-sand beaches, and world-class diving, the Maldives offers an unparalleled tropical escape. The archipelago consists of 26 atolls and over 1,000 islands, with each luxury resort typically occupying its own private island.</p>

      <h2>Top Luxury Resorts for 2025</h2>
      <h3>1. The Ritz-Carlton Maldives, Fari Islands</h3>
      <p>This ultra-luxury resort features overwater and beach villas with private pools, multiple gourmet restaurants, and a stunning spa. The resort's commitment to sustainability makes it a favorite among eco-conscious travelers.</p>

      <h3>2. Patina Maldives, Fari Islands</h3>
      <p>A 42-hectare island haven offering a unique blend of art, wellness, and gastronomy. Patina features contemporary design and world-class dining experiences.</p>

      <h3>3. One&Only Reethi Rah</h3>
      <p>Known for its spacious villas and exceptional service, this resort offers eight restaurants, five bars, and some of the largest villas in the Maldives.</p>

      <h2>Best Time to Visit</h2>
      <p>The dry season from November to April offers the best weather, with December to March being peak season. However, the shoulder months of November and April can offer excellent deals with still-favorable weather conditions.</p>

      <h2>Transportation Tips</h2>
      <p>Many luxury resorts offer seaplane transfers, which provide breathtaking aerial views of the atolls. Some resorts are accessible by speedboat, while the most exclusive properties may offer private yacht transfers.</p>

      <h2>Booking Advice</h2>
      <p>Book well in advance for peak season travel. Consider all-inclusive packages which often provide better value. Always check what's included – some resorts include water sports and excursions, while others charge separately.</p>

      <h2>Sustainable Luxury</h2>
      <p>Many Maldivian resorts are leading the way in sustainable tourism, with coral restoration programs, plastic-free initiatives, and solar power. Choose resorts that prioritize environmental protection to ensure this paradise remains pristine for future generations.</p>

      <h2>Conclusion</h2>
      <p>The Maldives continues to set the standard for luxury island escapes. Whether you're seeking a romantic honeymoon, a family adventure, or a solo wellness retreat, there's a perfect Maldivian resort waiting for you.</p>
    `
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{post.title} - Resorts Offers Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://www.resortsoffers.com/blog/${slug}`} />
      </Helmet>
      <Navbar />

      <article className="section-padding mt-20">
        <div className="container-custom max-w-4xl">
          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center justify-between text-muted-foreground mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime} read</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Featured Image */}
            <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-8" />
          </header>

          {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              />

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                <p className="text-muted-foreground">
                  {post.author === "Nora El Khalifi" 
                    ? "CEO & Managing Director with over 20 years in luxury hospitality. Nora personally curates exceptional resort experiences for discerning travelers."
                    : "Our expert travel team brings years of combined experience in luxury resort consultancy and destination expertise."}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-primary text-primary-foreground rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Plan Your Luxury Escape?</h3>
            <p className="mb-6 opacity-90">Book a free consultation with our team to create your perfect resort experience.</p>
            <Link to="/book-consultation">
              <Button size="lg" variant="secondary">
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
