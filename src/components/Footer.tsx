import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, MessageCircle, Link as LinkIcon, Youtube, Linkedin } from "lucide-react";

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
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="font-semibold text-accent mb-2">Available 24/7 for Urgent Inquiries</li>
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
              <li className="flex items-center gap-2 mt-3 pt-2 border-t border-primary-foreground/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:vip@resortsoffers.com" className="hover:text-accent transition-colors">
                  vip@resortsoffers.com
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
              <a href="https://www.linkedin.com/in/noraelkhalifi/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com/Resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://www.youtube.com/@resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://www.tiktok.com/@resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.snapchat.com/add/Resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Snapchat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-0 .605-.15.855-.389.22-.195.445-.359.694-.497.213-.116.473-.195.748-.195.682 0 1.229.463 1.229 1.04 0 .425-.236.777-.534 1.03-.267.226-.567.401-.854.566l-.003.002c-.285.162-.569.326-.764.576-.168.214-.292.457-.391.701.124.042.283.064.459.064.534 0 1.080-.188 1.544-.357.465-.173.933-.345 1.385-.345.307 0 .591.135.798.36.211.229.316.517.316.809 0 .647-.71 1.146-1.413 1.146-.385 0-.782-.094-1.195-.229-.411-.134-.853-.277-1.295-.277-.248 0-.485.044-.709.127-.285.104-.557.252-.82.398l-.003.002c-.264.146-.529.295-.835.416-.32.125-.68.19-1.065.19-1.415 0-2.470-.585-2.970-1.644-.23-.482-.324-.979-.324-1.439 0-.139.01-.274.027-.405.02-.156.043-.314.043-.475 0-.265-.135-.521-.368-.704-.253-.199-.6-.314-.96-.314-.18 0-.361.028-.536.086-.162.051-.324.115-.486.178l-.003.002c-.162.063-.324.127-.507.17-.253.058-.53.087-.821.087-1.160 0-2.131-.579-2.707-1.596-.573-1.011-.752-2.370-.752-3.771 0-2.362.78-4.607 2.196-6.313C9.968 1.572 11.683.793 12.206.793z"/>
                </svg>
              </a>
              <a href="http://resortsoffers.bio.link/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Bio Link">
                <LinkIcon size={20} />
              </a>
            </div>
          </div>
        </div>

          {/* Customer Reviews */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <h4 className="font-semibold text-center mb-6">What Our Clients Say</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-sm mb-2">"Exceptional service! They found us the perfect honeymoon resort in Maldives."</p>
              <p className="text-xs opacity-75">- Sarah & Ahmed</p>
            </div>
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-sm mb-2">"Best travel consultancy in Dubai! Professional and responsive team."</p>
              <p className="text-xs opacity-75">- Mohammed Al-Rashid</p>
            </div>
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-sm mb-2">"Amazing deals and unforgettable experience. Highly recommended!"</p>
              <p className="text-xs opacity-75">- Fatima & Family</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <a 
              href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-6 py-3 rounded-lg transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Leave us a Google Review
            </a>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <h4 className="font-semibold text-center mb-6">Accepted Payment Methods</h4>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {/* Tabby */}
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <svg width="70" height="28" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="2" y="24" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#3CDBC0">tabby</text>
              </svg>
            </div>
            
            {/* Visa */}
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <svg width="70" height="28" viewBox="0 0 70 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.3 8.2l-7.5 17h-5.2L11.8 11c-0.5-1.4-0.9-1.9-2.4-2.4-1.4-0.5-3.8-0.9-6.1-1.4l-0.1-0.5h10.4c1.4 0 2.4 0.9 2.8 2.4l2.4 12.3 6.1-14.7h5.7l0.1 0.5zM52.8 17.5c0-4.3-6.1-4.3-6.1-6.1 0-0.5 0.5-1.4 1.9-1.4 1.4 0 2.4 0.5 3.3 0.9l0.5-2.8c-0.9-0.5-2.4-0.9-3.8-0.9-5.2 0-9 2.8-9 6.6 0 2.8 2.8 4.3 4.7 5.2 1.9 0.9 2.8 1.4 2.8 2.4 0 1.4-1.4 1.9-2.8 1.9-2.4 0-3.8-0.5-5.2-1.4l-0.5 2.8c0.9 0.5 2.8 1.4 5.2 1.4 5.7 0 9.4-2.8 9.4-6.6h0.6zM63.6 25.2h4.7l-4.3-17h-4.3c-1.4 0-2.4 0.5-2.8 1.9l-7.5 15.1h5.7l0.9-2.8h6.6l0.9 2.8h0.1zM57.9 16.1l2.8-7.5 1.4 7.5h-4.2zM35.8 8.2l-4.3 17h-5.2l4.3-17h5.2z" fill="#1434CB"/>
              </svg>
            </div>
            
            {/* Mastercard */}
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <svg width="50" height="28" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="16" r="12" fill="#EB001B"/>
                <circle cx="32" cy="16" r="12" fill="#F79E1B"/>
                <path d="M25 8c2.2 1.7 3.5 4.3 3.5 7s-1.3 5.3-3.5 7c-2.2-1.7-3.5-4.3-3.5-7s1.3-5.3 3.5-7z" fill="#FF5F00"/>
              </svg>
            </div>
            
            {/* American Express */}
            <div className="bg-[#006FCF] px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <svg width="50" height="28" viewBox="0 0 50 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="2" y="20" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">AMEX</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p className="mb-2">Member of Dubai Business Women Council</p>
          <p className="mb-2">Resorts Offers Tourism Consultancy</p>
          <p className="mb-2">Registered with Department of Economic Development - CN#5918684</p>
          <p>&copy; {new Date().getFullYear()} Resorts Offers Tourism Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
