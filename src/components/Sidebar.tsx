import { Link, useLocation } from "react-router-dom";
import { X, Home, Info, Briefcase, Calendar, BookOpen, Phone, Star, HelpCircle, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { name: t('nav.home'), path: "/", icon: Home },
    { name: t('nav.aboutUs'), path: "/about-us", icon: Info },
    { name: t('nav.services'), path: "/services", icon: Briefcase },
    { name: t('nav.events'), path: "/events", icon: Calendar },
    { name: t('nav.blog'), path: "/blog", icon: BookOpen },
    { name: t('nav.contact'), path: "/contact", icon: Phone },
    { name: t('nav.reviews'), path: "/reviews", icon: Star },
  ];

  const quickLinks = [
    { name: "FAQ", path: "/faq", icon: HelpCircle },
    { name: "Terms & Conditions", path: "/terms", icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0 bg-[#003B95] border-none">
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-white text-left">
            <span className="text-2xl font-black">ResortsOffers</span>
            <span className="text-white/80">.com</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100%-80px)]">
          {/* Main Navigation */}
          <nav className="flex-1 py-4">
            <div className="px-4 mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Menu
              </span>
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-4 px-6 py-3 text-white/90 hover:bg-white/10 transition-colors ${
                    isActive(item.path) ? "bg-white/20 border-l-4 border-white" : ""
                  }`}
                >
                  <Icon size={20} className="text-white/70" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Links */}
          <div className="border-t border-white/10 py-4">
            <div className="px-4 mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Quick Links
              </span>
            </div>
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-4 px-6 py-3 text-white/70 hover:bg-white/10 hover:text-white transition-colors ${
                    isActive(item.path) ? "bg-white/20 text-white" : ""
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className="p-6 bg-white/5">
            <p className="text-white/60 text-xs mb-2">Need Help?</p>
            <a 
              href="https://wa.me/971505620286" 
              className="text-white font-semibold hover:text-white/80 transition-colors"
            >
              WhatsApp: +971 50 562 0286
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;