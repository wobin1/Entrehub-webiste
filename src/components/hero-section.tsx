'use client';

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/digi-3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Professional Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-800/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-blue-800/40"></div>
      </div>

      {/* Fallback Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-white z-[-1]"></div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="text-orange-400 text-sm font-semibold tracking-wide">● DIGITAL EXCELLENCE</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              ENTREHUB
            </span>
          </h1>

          <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-300 mb-8 tracking-[0.2em] uppercase">
            Digital Creative Agency
          </h2>
        </div>

        {/* Description */}
        <p className="text-xl sm:text-2xl text-gray-200 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
          We transform businesses through strategic digital marketing, innovative design,
          and data-driven solutions that deliver <span className="text-orange-400 font-medium">measurable results</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-10 py-4 rounded-xl text-lg font-semibold min-w-[200px] shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
            <span className="flex items-center justify-center space-x-2">
              <span>Get In Touch</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
          <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-xl text-lg font-semibold min-w-[200px] hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-1">
            <span className="flex items-center justify-center space-x-2">
              <span>View Our Work</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-sm text-slate-400 uppercase tracking-wide">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-sm text-slate-400 uppercase tracking-wide">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm text-slate-400 uppercase tracking-wide">Support</div>
          </div>
        </div>
      </div>

      {/* Professional decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-orange-400/40 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400/30 rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
          <span className="text-xs uppercase tracking-wide">Scroll</span>
        </div>
      </div>
    </section>
  );
}
