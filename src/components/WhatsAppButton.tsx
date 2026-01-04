import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "971567622484"; // UAE number
  const message = "Hello! I'm interested in learning more about your resort offers.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1DA851] text-white shadow-2xl transition-all duration-300 hover:scale-110 animate-fade-in group flex items-center gap-3 rounded-full px-5 py-4 border-2 border-white/30"
      aria-label="Chat on WhatsApp 24/7"
    >
      <MessageCircle size={32} className="text-white drop-shadow-lg" strokeWidth={2.5} />
      <div className="hidden group-hover:block text-sm font-bold whitespace-nowrap">
        <div>Chat 24/7</div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
