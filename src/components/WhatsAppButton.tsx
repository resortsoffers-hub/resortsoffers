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
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in group flex items-center gap-3 rounded-full pr-4 pl-4 py-4"
      aria-label="Chat on WhatsApp 24/7"
    >
      <MessageCircle size={28} />
      <div className="hidden group-hover:block text-sm font-semibold whitespace-nowrap">
        <div>Chat Support 24/7</div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
