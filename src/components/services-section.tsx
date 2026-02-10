'use client';

import { useState, useEffect } from 'react';
import { Globe, Share2, Mail, Search, Palette, Megaphone, LucideIcon } from 'lucide-react';
import ContactModal from './contact-modal';

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  Share2,
  Mail,
  Search,
  Palette,
  Megaphone,
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  included: string;
  order: number;
}

export default function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-blue-700 text-sm font-semibold tracking-wide">● OUR SERVICES</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            What We <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Offer</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Comprehensive digital marketing solutions designed to elevate your brand,
            engage your audience, and drive sustainable business growth.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="flex items-center space-x-2">
              <span>Schedule Consultation</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon && ICON_MAP[service.icon] ? ICON_MAP[service.icon] : Globe;
            return (
              <div
                key={service.id}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="group/btn w-full bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-200 hover:border-blue-300"
                    >
                      <span>Get Started</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
