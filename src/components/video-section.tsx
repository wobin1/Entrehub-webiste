'use client';

import { useState } from 'react';
import { Play, Pause, Volume2, Maximize, RotateCcw } from 'lucide-react';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/30 via-white to-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-blue-700 text-sm font-semibold tracking-wide">● WATCH OUR STORY</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            See Our <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Impact</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover how we transform brands through strategic digital marketing and innovative solutions 
            that drive real, measurable results.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 hover:shadow-3xl transition-all duration-500">
          {/* Video Area */}
          <div 
            className="relative aspect-[16/9] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 cursor-pointer group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onClick={togglePlay}
          >
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-slate-900/80 to-blue-800/90"></div>
            
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-orange-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            
            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)`,
                backgroundSize: '60px 60px'
              }}></div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className={`w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl group/play ${
                  isPlaying ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Play className="w-8 h-8 text-white ml-1 group-hover/play:scale-110 transition-transform duration-300" />
              </button>
            </div>

            {/* Video Controls */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    )}
                  </button>
                  
                  <div className="text-white text-sm font-medium">
                    {isPlaying ? '01:23' : '00:00'} / 03:45
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-3">
                  <button className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-300 rounded-full transition-all duration-300"
                    style={{ width: isPlaying ? '35%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Playing Indicator */}
            {isPlaying && (
              <div className="absolute top-6 left-6">
                <div className="flex items-center space-x-2 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-xs font-medium">LIVE</span>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="p-8 bg-gradient-to-r from-white via-blue-50/20 to-orange-50/20">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Digital Marketing Excellence
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                  See how our strategic approach and creative solutions have helped brands 
                  achieve remarkable growth in the digital landscape through data-driven insights.
                </p>
              </div>
              <div className="ml-8 flex-shrink-0">
                <div className="text-center bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-6 border border-slate-200">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">3:45</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Duration</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <span className="text-lg text-slate-600">Ready to transform your brand?</span>
            <button className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
