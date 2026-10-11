'use client';

import { useState, useEffect } from 'react';
import { Globe, Share2, Mail, Search, Palette, Megaphone, ArrowRight, LucideIcon } from 'lucide-react';
import ContactModal from './contact-modal';
import SectionHeader from './section-header';

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

  if (!isLoading && services.length === 0) {
    return null;
  }

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="services-heading"
          eyebrow="Our services"
          title={<>What we <span className="text-navy">offer</span></>}
          description="Comprehensive digital marketing solutions designed to elevate your brand, engage your audience, and drive sustainable business growth."
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-navy px-8 font-semibold text-white shadow-sm transition-colors hover:bg-navy-hover"
          >
            Schedule a consultation
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </SectionHeader>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading services">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon && ICON_MAP[service.icon] ? ICON_MAP[service.icon] : Globe;
              return (
                <li
                  key={service.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:border-navy/25 hover:shadow-lg"
                >
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-tint text-navy" aria-hidden="true">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mb-3 text-xl font-semibold leading-snug text-slate-900">{service.title}</h3>
                  <p className="mb-6 flex-1 leading-relaxed text-slate-600">{service.description}</p>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    aria-haspopup="dialog"
                    className="group inline-flex min-h-11 items-center gap-2 self-start font-semibold text-navy transition-colors hover:text-navy-hover"
                  >
                    Get started<span className="sr-only"> with {service.title}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
