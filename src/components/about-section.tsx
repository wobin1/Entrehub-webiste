'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Target, Eye, Heart, LucideIcon } from 'lucide-react';
import SectionHeader from './section-header';

const ICON_MAP: Record<string, LucideIcon> = {
  Target,
  Eye,
  Heart,
};

interface AboutItem {
  id: string;
  type: string;
  title: string;
  content: string;
  icon: string | null;
}

export default function AboutSection() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [accordionItems, setAccordionItems] = useState<AboutItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch('/api/about');
        if (res.ok) {
          const data = await res.json();
          setAccordionItems(data);
        }
      } catch (error) {
        console.error('Error fetching about section:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  if (!isLoading && accordionItems.length === 0) {
    return null;
  }

  return (
    <section id="about" aria-labelledby="about-heading" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="about-heading"
          eyebrow="About ENTREHUB"
          title={<>Our <span className="text-navy">story</span></>}
          description="Transforming businesses through innovative digital marketing strategies that deliver measurable results and sustainable growth."
        />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <p className="border-l-4 border-orange-500 pl-6 text-xl font-medium leading-relaxed text-slate-800">
              At ENTREHUB, we don&apos;t just create campaigns – we craft digital experiences that transform businesses and drive real, measurable results.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              We bridge the gap between local businesses and global opportunities. Our mission is simple: to be your trusted partner in sustainable growth and digital excellence through data-driven strategies and creative innovation.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-slate-200/70" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {accordionItems.map((item) => {
                const Icon = item.icon && ICON_MAP[item.icon] ? ICON_MAP[item.icon] : Target;
                const isOpen = openAccordion === item.id;
                const panelId = `about-panel-${item.id}`;
                const buttonId = `about-button-${item.id}`;

                return (
                  <div
                    key={item.id}
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                      isOpen ? 'border-navy/25 shadow-md' : 'border-slate-200 shadow-sm'
                    }`}
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => toggleAccordion(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50 sm:p-6"
                      >
                        <span className="flex items-center gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-tint text-navy" aria-hidden="true">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="text-lg font-semibold text-slate-900">{item.title}</span>
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="px-5 pb-6 sm:px-6"
                    >
                      <p className="leading-relaxed text-slate-600 sm:pl-[60px]">{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
