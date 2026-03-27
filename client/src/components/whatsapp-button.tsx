import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "529841234567"; // Placeholder Tulum number
  const message = encodeURIComponent("Hola! Me interesa información sobre tours en Tulum");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 flex items-center justify-center transition-all hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute left-full ml-3 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        WhatsApp
      </span>
    </a>
  );
}
