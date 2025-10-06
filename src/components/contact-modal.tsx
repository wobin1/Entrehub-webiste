'use client';

import { useState } from 'react';
import { X, Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';
import MessageFormModal from './message-form-modal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [showMessageForm, setShowMessageForm] = useState(false);

  if (!isOpen) return null;

  const whatsappNumber = "+2348123456789"; // Random Nigerian WhatsApp number
  const whatsappMessage = "Hello ENTREHUB! I'm interested in your digital marketing services. Can we discuss my project?";
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        {/* Header */}
        <div className="p-8 pb-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-xl overflow-hidden mr-4 shadow-lg border-2 border-blue-300/30">
              <Image 
                src="/images/logo.jpeg" 
                alt="ENTREHUB Logo" 
                width={40} 
                height={40} 
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xl font-bold">ENTREHUB</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Ready to transform your digital presence? Get in touch with us today and let&apos;s discuss your project.
          </p>
        </div>

        {/* Contact Information */}
        <div className="px-8 pb-6 space-y-4">
          <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/50 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-lg">Phone</p>
              <p className="text-slate-600 font-medium">+234 812 972 1560</p>
            </div>
          </div>

          <button
            onClick={() => setShowMessageForm(true)}
            className="w-full flex items-center space-x-4 p-5 bg-gradient-to-r from-green-50 to-green-100/50 rounded-2xl border border-green-200/50 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02] transform"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-900 text-lg">Email</p>
              <p className="text-slate-600 font-medium">info@entrehubng.com</p>
            </div>
          </button>

          <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200/50 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-lg">Location</p>
              <p className="text-slate-600 font-medium">Kaduna, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-8 pt-4 space-y-3">
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center space-x-3"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Chat on WhatsApp</span>
          </button>

          <button
            onClick={() => setShowMessageForm(true)}
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center space-x-3"
          >
            <Send className="w-6 h-6" />
            <span>Send us a Message</span>
          </button>
          
          <p className="text-center text-slate-500 mt-4 font-medium">
            ⚡ We typically respond within 30 minutes during business hours
          </p>
        </div>
      </div>

      {/* Message Form Modal */}
      <MessageFormModal 
        isOpen={showMessageForm} 
        onClose={() => setShowMessageForm(false)} 
      />
    </div>
  );
}
