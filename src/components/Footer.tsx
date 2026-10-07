import { MessageCircle, Mail, Instagram } from "lucide-react";
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
            <a
              href={BRAND.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Instagram size={16} />
              Instagram
            </a>
          </div>

          <a
            href={`/${ar ? "ar" : "en"}/engagement-policy`}
            className="text-[11px] uppercase tracking-[0.25em] text-primary-foreground/60 hover:text-accent transition-colors"
          >
            Engagement Policy
          </a>

          {/* Trade licence — QR links to the official DET verification page */}
          <a
            href={BRAND.license.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center gap-4 text-[11px] leading-relaxed text-primary-foreground/60 hover:text-accent transition-colors"
          >
            <img
              src={BRAND.license.qrImage}
              alt={ar ? "رمز التحقق من الرخصة" : "Licence verification QR code"}
              width={72}
              height={72}
              className="rounded-sm bg-white p-1"
              loading="lazy"
            />
            <span className="sm:text-left" dir={ar ? "rtl" : "ltr"}>
              {ar ? (
                <>
                  مسجلة باسم {BRAND.license.businessName} لدى {BRAND.license.authorityAr}
                  <br />
                  رقم الرخصة {BRAND.license.number} · الرخصة الموحدة {BRAND.license.unifiedCode}
                  <br />
                  امسح الرمز أو اضغط للتحقق
                </>
              ) : (
                <>
                  Registered as {BRAND.license.businessName} ({BRAND.license.legalType}) with the{" "}
                  {BRAND.license.authority}
                  <br />
                  Licence No. {BRAND.license.number} · Dubai Unified License {BRAND.license.unifiedCode}
                  <br />
                  Scan or tap to verify
                </>
              )}
            </span>
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
