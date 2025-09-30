'use client';

import { useState } from 'react';
import { Globe, Share2, Mail, Search, Palette, Megaphone } from 'lucide-react';
import ContactModal from './contact-modal';

export default function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const services = [
    {
      icon: Globe,
      title: 'Web & App Development',
      description: 'We develop digital assets, such as websites, microsite and mobile apps, for your business needs.',
      included: "What's included in service?",
    },
    {
      icon: Share2,
      title: 'Social Media Marketing',
      description: 'We help you to promote your brand on Facebook, Twitter, Instagram with best social strategies.',
      included: "What's included in service?",
    },
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'We help you to build your lists and send them newsletter regularly or simply an email blast.',
      included: "What's included in service?",
    },
    {
      icon: Search,
      title: 'Search Engine Marketing',
      description: 'We can effectively communicate with Google to help your website appears on top within minutes.',
      included: "What's included in service?",
    },
    {
      icon: Palette,
      title: 'Creative & Content',
      description: 'We bring out of the box creative contents that matter to your audience & business growth.',
      included: "What's included in service?",
    },
    {
      icon: Megaphone,
      title: 'Digital Advertising & PPC',
      description: 'We create effective advertising buying strategy for partnering with a lot of major publishers.',
      included: "What's included in service?",
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-blue-700 text-sm font-semibold tracking-wide">● OUR SERVICES</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            What We <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Offer</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
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
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group/btn w-full bg-gradient-to-r from-slate-50 to-blue-50 hover:from-blue-50 hover:to-blue-100 text-slate-700 hover:text-blue-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-200 hover:border-blue-300"
                  >
                    <span>Get Started</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
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
