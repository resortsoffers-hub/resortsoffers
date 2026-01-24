import { Link, useLocation } from "react-router-dom";
import { X, Home, Phone, HelpCircle, FileText, Package, Building2, Tag, Star } from "lucide-react";
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
    { name: "Packages", path: "/packages", icon: Package },
    { name: "Partner Hotels", path: "/partner-hotels", icon: Building2 },
    { name: "Offers", path: "/offers", icon: Tag },
    { name: "Reviews", path: "/submit-review", icon: Star },
    { name: t('nav.contact'), path: "/contact", icon: Phone },
    { name: "FAQ", path: "/faq", icon: HelpCircle },
    { name: "Terms", path: "/terms", icon: FileText },
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

          {/* Contact Info */}
          <div className="p-6 bg-white/5">
            <p className="text-white/60 text-xs mb-2">Book Now via WhatsApp</p>
            <a 
              href="https://wa.me/971547474404" 
              className="text-white font-semibold hover:text-white/80 transition-colors"
            >
              +971 547 474 404
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;