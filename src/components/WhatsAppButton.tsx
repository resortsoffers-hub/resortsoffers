import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/brand";

/**
 * Floating WhatsApp button — compact, single bottom-right, hides on scroll-down.
 */
const WhatsAppButton = () => {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 200);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    "Hello! I'd like a personal resort recommendation."
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <MessageCircle size={22} strokeWidth={2.25} />
    </a>
  );
};

export default WhatsAppButton;
