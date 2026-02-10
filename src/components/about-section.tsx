'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Target, Eye, Heart, LucideIcon } from 'lucide-react';

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

  if (isLoading || accordionItems.length === 0) {
    return null; // Or a skeleton
  }

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-blue-50/30 via-white to-slate-50/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-blue-700 text-sm font-semibold tracking-wide">● ABOUT ENTREHUB</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Our <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Story</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming businesses through innovative digital marketing strategies
            that deliver measurable results and sustainable growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Our Story */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-xl text-gray-800 leading-relaxed font-medium">
                At <span className="font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">ENTREHUB</span>, we don&apos;t just create campaigns – we craft digital experiences that transform businesses and drive real, measurable results.
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              We bridge the gap between local businesses and global opportunities. Our mission is simple: to be your trusted partner in sustainable growth and digital excellence through data-driven strategies and creative innovation.
            </p>
          </div>

          {/* Right - Compact Accordion */}
          <div className="space-y-4">
            {accordionItems.map((item) => {
              const Icon = item.icon && ICON_MAP[item.icon] ? ICON_MAP[item.icon] : Target;
              const isOpen = openAccordion === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg font-bold text-gray-900">{item.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
