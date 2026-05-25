import { Link } from "react-router-dom";
import { Facebook, Twitter, MapPin, MessageCircle, Link as LinkIcon, Youtube, Linkedin, Calendar, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/hooks/useLocale";

const Footer = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();
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
              <li className="pt-2 mt-2 border-t border-primary-foreground/20">
                <a
                  href="https://noel.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors font-semibold"
                >
                  Sister Agency: Noel.ae
                  <LinkIcon size={12} />
                </a>
              </li>
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
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
                </svg>
              </a>
              <a href="http://resortsoffers.bio.link/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Bio Link">
                <LinkIcon size={20} />
              </a>
            </div>
            
            <div className="mt-4">
              <a 
                href="https://resortsoffers.bio.link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>Fact Sheet Brochures</span>
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
              href="https://maps.app.goo.gl/yrTrMqHRhTEuwXmDA?g_st=ic" 
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

            <div className="h-7 w-[56px] bg-white rounded flex items-center justify-center">
              <span className="text-[#3CDBC0] font-bold text-[11px] leading-none">tabby</span>
            </div>

            <div className="h-7 w-[56px] bg-white rounded flex items-center justify-center">
              <span className="text-[#1434CB] font-bold text-[12px] leading-none tracking-wide">VISA</span>
            </div>

            <div className="h-7 w-[56px] bg-white rounded flex items-center justify-center">
              <div className="flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] -ml-1.5"></span>
              </div>
            </div>

            <div className="h-7 w-[56px] bg-[#006FCF] rounded flex items-center justify-center">
              <span className="text-white font-bold text-[11px] leading-none">AMEX</span>
            </div>

            <div className="h-7 w-[56px] bg-emerald-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-[11px] leading-none">Bank</span>
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
