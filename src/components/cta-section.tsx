'use client';

import { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import ContactModal from './contact-modal';

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section aria-labelledby="cta-heading" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="on-dark relative overflow-hidden rounded-3xl bg-navy-deep px-6 py-14 text-center shadow-xl sm:px-12 sm:py-20">
          <div className="relative">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">Get started today</p>

            <h2 id="cta-heading" className="mx-auto mb-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to transform your <span className="text-orange-400">digital presence?</span>
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-300">
              Let&apos;s collaborate to create digital marketing strategies that drive measurable results,
              boost your online presence, and accelerate your business growth.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                aria-haspopup="dialog"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg transition-colors hover:bg-orange-50 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Let&apos;s talk
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>

              <a
                href="#work"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/40 px-8 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto"
              >
                View portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
