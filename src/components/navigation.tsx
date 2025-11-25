'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import ContactModal from './contact-modal';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    // { name: 'Team', href: '#team' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center group">
              <div className="w-12 h-12 rounded-xl overflow-hidden mr-4 shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-slate-200 group-hover:border-blue-300">
                <Image 
                  src="/images/logo.jpeg" 
                  alt="ENTREHUB Logo" 
                  width={48} 
                  height={48} 
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">ENTREHUB</span>
            </a>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-medium transition-all duration-300 relative group rounded-lg hover:bg-slate-50"
                >
                  {item.name}
                  <span className="absolute inset-x-4 bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-3 rounded-lg hover:bg-slate-50 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-slate-600 hover:text-slate-900 px-4 py-3 text-base font-medium rounded-lg hover:bg-slate-50 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-6 py-4 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Let&apos;s Talk
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    
    {/* Contact Modal - Rendered outside nav for proper positioning */}
    <ContactModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
  </>
  );
}
