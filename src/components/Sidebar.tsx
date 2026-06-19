import { Link, useLocation } from "react-router-dom";
import { Home, Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLocale, useLocalePath } from "@/hooks/useLocale";
import { BRAND } from "@/lib/brand";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { t } = useTranslation();
  const lang = useLocale();
  const lp = useLocalePath();

  // Editorial focus — only the essentials. About / Vision / Destinations /
  // Events / Reviews / FAQ / Terms intentionally hidden from the homepage
  // navigation per brand direction (luxury magazine, not booking portal).
  const menuItems = [
    { name: t('nav.home'), path: "/", icon: Home },
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
          <div className="p-6 bg-white/5 space-y-3">
            <div>
              <p className="text-white/60 text-xs mb-1">WhatsApp</p>
              <a 
                href={`https://wa.me/${BRAND.whatsapp}`} 
                className="text-white font-semibold hover:text-white/80 transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle size={14} className="text-[#25D366]" />
                {BRAND.mobile}
              </a>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">Email</p>
              <a 
                href={`mailto:${BRAND.email}`} 
                className="text-white font-semibold hover:text-white/80 transition-colors inline-flex items-center gap-2"
              >
                <Mail size={14} />
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
