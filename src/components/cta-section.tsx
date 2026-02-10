'use client';

import { useState } from 'react';
import ContactModal from './contact-modal';

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* CTA Card */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-3xl p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-500/20 to-blue-500/20 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <span className="text-orange-400 text-sm font-semibold tracking-wide">● GET STARTED TODAY</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Ready To Transform Your<br />
              <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">Digital Presence?</span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let&apos;s collaborate to create digital marketing strategies that drive measurable results,
              boost your online presence, and accelerate your business growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm">💬</span>
                  </span>
                  <span>Let&apos;s Talk</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>

              <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-1">
                <span className="flex items-center space-x-2">
                  <span>View Portfolio</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Decorative Elements */}
          <div className="absolute top-8 left-8 w-3 h-3 bg-orange-400/40 rounded-full animate-pulse"></div>
          <div className="absolute top-16 right-16 w-2 h-2 bg-blue-400/30 rounded-full"></div>
          <div className="absolute bottom-8 left-16 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-16 right-8 w-2 h-2 bg-orange-400/40 rounded-full"></div>
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
