import React from 'react';
import { Phone as WhatsApp } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppChat() {
  const whatsappNumber = "+919217807801"; // Updated number
  const message = "Hi Travel & Tours! I'm interested in booking a trip.";

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
    >
      <WhatsApp className="w-6 h-6" />
      <span className="absolute right-full mr-4 bg-white text-primary px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap hidden lg:block shadow-lg border border-gray-100">
        Chat with us
      </span>
    </motion.a>
  );
}
