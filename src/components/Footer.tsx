import { Link } from "react-router-dom";
import { Facebook, Twitter, MapPin, MessageCircle, Link as LinkIcon, Youtube, Linkedin, Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resorts Offers Tourism Consultancy</h3>
            <p className="text-sm opacity-90">
              Your trusted travel partner for life — from honeymoon to family holidays.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/resorts" className="hover:text-accent transition-colors">Partners</Link></li>
              <li><Link to="/offers" className="hover:text-accent transition-colors">Offers</Link></li>
              <li><Link to="/submit-review" className="hover:text-accent transition-colors">Submit Review</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="text-[#25D366]" />
                <a href="https://wa.me/971567622484" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                  🇦🇪 +971 567 622 484 (UAE & Worldwide)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="text-[#25D366]" />
                <a href="https://wa.me/971547474404" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                  🇸🇦 +971 547 474 404 (Saudi Arabia)
                </a>
              </li>
              <li className="flex items-center gap-2 mt-3 pt-2 border-t border-primary-foreground/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:vip@resortsoffers.com" className="hover:text-accent transition-colors">
                  vip@resortsoffers.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 flex-wrap mb-4">
              <a href="https://www.facebook.com/Resortsoffers/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
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
              <a href="https://www.snapchat.com/add/Resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFFC00] transition-colors" aria-label="Snapchat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.166 0c.833 0 3.533.253 4.832 3.495.432.972.328 2.62.243 3.945l-.003.049c-.01.146-.018.28-.024.415.061.037.165.073.326.073.243 0 .492-.122.695-.317.179-.159.362-.292.564-.405.173-.094.385-.159.608-.159.554 0 .999.378.999.847 0 .346-.192.633-.434.84-.217.184-.461.327-.694.461l-.003.001c-.232.132-.463.266-.621.469-.137.175-.238.373-.318.571.101.034.23.052.373.052.434 0 .878-.153 1.255-.291.378-.141.758-.281 1.127-.281.249 0 .481.11.649.293.171.187.257.421.257.659 0 .527-.577.934-1.149.934-.313 0-.636-.077-.972-.186-.334-.109-.693-.225-1.053-.225-.202 0-.394.036-.576.104-.232.085-.453.205-.667.324l-.002.001c-.215.119-.43.24-.679.339-.26.102-.553.155-.866.155-1.150 0-2.009-.477-2.415-1.339-.187-.393-.263-.797-.263-1.172 0-.113.008-.223.022-.33.016-.127.035-.256.035-.387 0-.216-.110-.424-.299-.573-.206-.162-.488-.256-.781-.256-.146 0-.293.023-.436.07-.132.041-.263.094-.395.145l-.002.001c-.132.051-.263.103-.412.139-.206.047-.431.071-.667.071-.943 0-1.733-.472-2.202-1.300-.466-.823-.612-1.931-.612-3.072 0-1.923.634-3.751 1.786-5.141C9.347 1.281 10.742.635 11.167.568l.082-.011c.229-.033.458-.052.687-.052z"/>
                </svg>
              </a>
              <a href="http://resortsoffers.bio.link/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Bio Link">
                <LinkIcon size={20} />
              </a>
            </div>
            
            <div className="mt-6 pt-4 border-t border-primary-foreground/20">
              <Link 
                to="/book-consultation"
                className="flex items-center gap-2 text-sm hover:text-accent transition-colors font-semibold"
              >
                <Calendar size={16} className="text-accent" />
                <span>Book Free Consultation</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Google Review Link */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="text-center">
            <a 
              href="https://g.page/r/Cf7HhHgF8dCpEBM/review" 
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
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 overflow-x-auto">
          <div className="flex justify-center items-center gap-2 min-w-max">
            <span className="text-[10px] opacity-75 whitespace-nowrap">Payments:</span>
            <div className="bg-white px-2 py-1 rounded">
              <span className="text-[#3CDBC0] font-bold text-[10px]">tabby</span>
            </div>
            <div className="bg-white px-2 py-1 rounded">
              <span className="text-[#1434CB] font-bold text-[10px]">VISA</span>
            </div>
            <div className="bg-white px-2 py-1 rounded flex items-center gap-0.5">
              <span className="w-2 h-2 rounded-full bg-[#EB001B]"></span>
              <span className="w-2 h-2 rounded-full bg-[#F79E1B] -ml-1"></span>
            </div>
            <div className="bg-[#006FCF] px-2 py-1 rounded">
              <span className="text-white font-bold text-[10px]">AMEX</span>
            </div>
            <div className="bg-emerald-600 px-2 py-1 rounded">
              <span className="text-white font-bold text-[10px]">Bank</span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p className="mb-2">Member of Abu Dhabi Business Women Council</p>
          <p className="mb-2">Resorts Offers Tourism Consultancy</p>
          <p className="mb-2">Abu Dhabi Economic Licence - CN#5918684</p>
          <p>&copy; {new Date().getFullYear()} Resorts Offers Tourism Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
