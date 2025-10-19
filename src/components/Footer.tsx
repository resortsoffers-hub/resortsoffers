import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resorts Offers Tourism Consultancy</h3>
            <p className="text-sm opacity-90">
              Discover exclusive luxury resort packages and special offers worldwide. 
              Your gateway to unforgettable vacation experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/consultancy" className="hover:text-accent transition-colors">Consultancy</Link></li>
              <li><Link to="/resorts" className="hover:text-accent transition-colors">Partners</Link></li>
              <li><Link to="/offers" className="hover:text-accent transition-colors">Offers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle size={16} />
                <a href="https://wa.me/971567622484" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  +971 567 622 484 (UAE)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} />
                <a href="https://wa.me/966582360080" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  +966 582 360 080 (KSA)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} />
                <a href="https://wa.me/447500029091" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  +44 7500 029091 (UK)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Deira - Port Saeed, Dubai, UAE</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 flex-wrap">
              <a href="https://www.facebook.com/Resortsoffers/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/resortsoffers/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com/Resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://www.tiktok.com/@resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Resorts Offers Tourism Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
