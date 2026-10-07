import { MessageCircle, Mail, Facebook, Instagram, Youtube, MapPin } from "lucide-react";
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
          {/* Wordmark */}
          <div>
            <div className="font-serif text-2xl tracking-wide">{BRAND.name}</div>
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
              {BRAND.mobile}
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail size={16} />
              {BRAND.email}
            </a>
          </div>

          {/* Social: same accounts as the Google Business Profile */}
          <div className="flex items-center gap-5">
            {[
              { href: BRAND.social.facebook, label: "Facebook", icon: <Facebook size={18} /> },
              { href: BRAND.social.instagram, label: "Instagram", icon: <Instagram size={18} /> },
              { href: BRAND.social.tiktok, label: "TikTok", icon: <span className="text-xs font-semibold">TikTok</span> },
              { href: BRAND.social.youtube, label: "YouTube", icon: <Youtube size={18} /> },
              { href: BRAND.social.x, label: "X (Twitter)", icon: <span className="text-sm font-semibold">X</span> },
              { href: BRAND.social.google, label: "Google Business Profile", icon: <MapPin size={18} /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center hover:text-accent transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <a
            href={`/${ar ? "ar" : "en"}/engagement-policy`}
            className="text-[11px] uppercase tracking-[0.25em] text-primary-foreground/60 hover:text-accent transition-colors"
          >
            Engagement Policy
          </a>

          <p className="text-[11px] text-primary-foreground/50 tracking-wider">
            © {new Date().getFullYear()} {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
