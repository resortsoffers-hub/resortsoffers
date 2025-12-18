import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { name: t('nav.destinations'), path: "/destinations" },
    { name: t('nav.offers'), path: "/offers" },
    { name: t('nav.aboutUs'), path: "/about-us" },
    { name: t('nav.services'), path: "/services" },
    { name: t('nav.events'), path: "/events" },
    { name: t('nav.blog'), path: "/blog" },
    { name: t('nav.contact'), path: "/contact" },
    { name: t('nav.reviews'), path: "/reviews" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-[#003B95] shadow-lg z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
              ResortsOffers<span className="text-white">.com</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={`text-white hover:bg-white/10 ${
                    isActive(item.path) ? "bg-white/20" : ""
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start mb-1 text-white hover:bg-white/10 ${
                    isActive(item.path) ? "bg-white/20" : ""
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <div className="px-2 mt-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
