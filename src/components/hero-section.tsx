'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Pause, Play } from 'lucide-react';
import ContactModal from './contact-modal';

const stats = [
  { value: '50+', label: 'Projects delivered' },
  { value: '98%', label: 'Client success rate' },
  { value: '24/7', label: 'Support' },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Don't autoplay background motion for users who prefer reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="on-dark relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy-deep pt-20"
    >
      {/* Background video (decorative) */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          <source src="/videos/digi-3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-navy-deep/80" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden="true" />
          Digital Creative Agency
        </p>

        <h1
          id="hero-heading"
          className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Grow your brand with <span className="text-orange-400">measurable</span> digital marketing
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
          ENTREHUB transforms businesses through strategic digital marketing, innovative design
          and data-driven solutions that deliver real results.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-slate-900 shadow-lg transition-colors hover:bg-orange-50 sm:w-auto"
          >
            Get in touch
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
          <a
            href="#work"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/40 px-8 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto"
          >
            View our work
          </a>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-8 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-300 sm:text-sm">
                {stat.label}
              </dt>
              <dd className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Video pause control (WCAG 2.2.2) */}
      <button
        type="button"
        onClick={toggleVideo}
        aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        className="absolute bottom-6 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-navy-deep/50 text-white backdrop-blur-sm transition-colors hover:bg-navy-deep/80 sm:right-6"
      >
        {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
      </button>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-white/70 transition-colors hover:text-white sm:block"
      >
        <ChevronDown className="h-6 w-6 motion-safe:animate-bounce" aria-hidden="true" />
      </a>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
