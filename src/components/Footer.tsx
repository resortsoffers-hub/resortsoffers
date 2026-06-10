import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, Mail } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useLocale } from "@/hooks/useLocale";

/**
 * Footer — editorial minimal.
 * Per brand direction: simple contact information and social links only.
 * No quick-links, no policies, no payment icons, no marketing banners.
 */
const Footer = () => {
  const ar = useLocale() === "ar";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Wordmark + tagline */}
          <div>
            <div className="font-serif text-2xl tracking-wide mb-2">{BRAND.name}</div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/60">
              {ar ? BRAND.taglineAr : BRAND.tagline}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <MessageCircle size={16} className="text-[#25D366]" />
              +971 56 762 2484
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail size={16} />
              {BRAND.email}
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-6">
            <a href="https://instagram.com/resortsoffers" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://www.facebook.com/Resortsoffers/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-accent transition-colors">
              <Facebook size={18} />
            </a>
            <a href="https://www.linkedin.com/in/noraelkhalifi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://www.youtube.com/@resortsoffers" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-accent transition-colors">
              <Youtube size={18} />
            </a>
          </div>

          <p className="text-[11px] text-primary-foreground/50 tracking-wider">
            © {new Date().getFullYear()} {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
