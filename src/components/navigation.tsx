'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ContactModal from './contact-modal';

const navItems = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#work' },
  // { name: 'Team', href: '/#team' },
  { name: 'Blog', href: '/blog' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu with Escape and return focus to the toggle
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b transition-shadow duration-300 ${
          isScrolled ? 'border-slate-200 shadow-sm' : 'border-transparent'
        }`}
      >
        <nav aria-label="Main" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/#home" className="flex items-center gap-3 rounded-lg" aria-label="ENTREHUB home">
              <span className="w-11 h-11 rounded-xl overflow-hidden ring-1 ring-slate-200">
                <Image
                  src="/images/logo.jpeg"
                  alt=""
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                  priority
                />
              </span>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                ENTRE<span className="text-orange-600">HUB</span>
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center min-h-11 px-4 text-sm font-medium text-slate-700 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                aria-haspopup="dialog"
                className="inline-flex items-center min-h-11 px-6 rounded-xl bg-navy text-white text-sm font-semibold shadow-sm hover:bg-navy-hover transition-colors"
              >
                Let&apos;s Talk
              </button>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {isMenuOpen && (
            <div id="mobile-menu" className="md:hidden border-t border-slate-200 pb-6 pt-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center min-h-12 px-4 text-base font-medium text-slate-700 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                aria-haspopup="dialog"
                className="mt-4 w-full min-h-12 rounded-xl bg-navy text-white text-base font-semibold shadow-sm hover:bg-navy-hover transition-colors"
              >
                Let&apos;s Talk
              </button>
            </div>
          )}
        </nav>
      </header>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
