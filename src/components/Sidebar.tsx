import { Link, useLocation } from "react-router-dom";
import { X, Home, Phone, HelpCircle, FileText, Package, Building2, Tag, Star, MessageSquare, Ship, Users, CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLocale, useLocalePath } from "@/hooks/useLocale";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { t } = useTranslation();
  const lang = useLocale();
  const lp = useLocalePath();

  const menuItems = [
    { name: t('nav.home'), path: "/", icon: Home },
    { name: t('nav.aboutUs'), path: "/about-us", icon: Users },
    { name: t('nav.packages'), path: "/packages", icon: Package },
    // Partner Hotels nav hidden — catalog being rebuilt with verified imagery
    { name: t('nav.cruises'), path: "/cruises", icon: Ship },
    { name: t('nav.events'), path: "/events", icon: CalendarDays },
    { name: t('nav.offers'), path: "/offers", icon: Tag },
    { name: t('nav.reviews'), path: "/reviews", icon: MessageSquare },
    { name: t('nav.contact'), path: "/contact", icon: Phone },
    { name: t('nav.faq'), path: "/faq", icon: HelpCircle },
    { name: t('nav.terms'), path: "/terms", icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === lp(path);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side={lang === 'ar' ? 'right' : 'left'} className="w-80 p-0 bg-[#003B95] border-none">
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-white text-start">
            <span className="text-2xl font-black">ResortsOffers</span>
            <span className="text-white/80">.com</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100%-80px)]">
          {/* Main Navigation */}
          <nav className="flex-1 py-4">
            <div className="px-4 mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                {t('nav.menu')}
              </span>
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const to = lp(item.path);
              return (
                <Link
                  key={item.path}
                  to={to}
                  onClick={onClose}
                  className={`flex items-center gap-4 px-6 py-3 text-white/90 hover:bg-white/10 transition-colors ${
                    isActive(item.path) ? `bg-white/20 ${lang === 'ar' ? 'border-r-4' : 'border-l-4'} border-white` : ""
                  }`}
                >
                  <Icon size={20} className="text-white/70" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Contact Info */}
          <div className="p-6 bg-white/5">
            <p className="text-white/60 text-xs mb-2">{t('common.bookNowWhatsApp')}</p>
            <a 
              href="https://wa.me/971567622484" 
              className="text-white font-semibold hover:text-white/80 transition-colors"
            >
              +971 56 762 2484
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
