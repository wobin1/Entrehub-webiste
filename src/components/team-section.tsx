'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function TeamSection() {
  const [teamCurrentIndex, setTeamCurrentIndex] = useState(0);
  const [testimonialCurrentIndex, setTestimonialCurrentIndex] = useState(0);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);

  const teamMembers = [
    {
      name: 'GABRIEL ADINGA',
      role: 'Manager',
      image: '/team/team-1.jpeg',
      fallback: 'bg-gradient-to-br from-blue-300 to-blue-400'
    },
    {
      name: 'GENESIS THOMAS',
      role: 'Creative Designer',
      image: '/team/team-2.jpeg',
      fallback: 'bg-gradient-to-br from-blue-400 to-blue-500'
    },
    {
      name: 'OBI EMMANUELLA OGOCHUKWU',
      role: 'Finance Officer & Administrator',
      image: '/team/team-3.jpeg',
      fallback: 'bg-gradient-to-br from-blue-300 to-blue-500'
    },
    {
      name: 'Finance Officer & Administrator',
      role: 'Content Manager',
      image: '/team/team-4.jpeg',
      fallback: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
      name: 'CHUKWUDI OKAFOR',
      role: 'Business Development Officer',
      image: '/team/team-5.jpeg',
      fallback: 'bg-gradient-to-br from-blue-300 to-blue-400'
    }
  ];

  const testimonials = [
    {
      name: 'Robert Fox',
      role: 'CEO Of UrbanNest&apos;s',
      content: 'The digital marketing team transformed our online presence, delivering exceptional results with their SEO and targeted ads. Highly recommend their professional approach.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Leslie Alexander',
      role: 'Manager FashionWave&apos;s',
      content: 'We&apos;ve seen incredible growth thanks to their tailored digital marketing strategies. The team&apos;s expertise in SEO and social media has been invaluable.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Founder of TechStart',
      content: 'ENTREHUB delivered beyond our expectations. Their strategic approach to digital marketing helped us achieve 300% growth in just 6 months.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director at GrowthCo',
      content: 'Professional, reliable, and results-driven. The team at ENTREHUB understands our business needs and consistently delivers outstanding campaigns.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'David Rodriguez',
      role: 'CEO of InnovateLab',
      content: 'Their creative approach to content marketing and social media management has significantly boosted our brand awareness and customer engagement.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emily Watson',
      role: 'E-commerce Manager',
      content: 'The ROI from working with ENTREHUB has been exceptional. Their data-driven strategies have transformed our online sales performance.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const scrollTeam = (direction: 'left' | 'right') => {
    if (teamScrollRef.current) {
      const scrollAmount = 280; // Width of one team member card + gap
      const currentScroll = teamScrollRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      teamScrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      
      // Update current index for pagination display
      const newIndex = Math.round(newScroll / scrollAmount);
      setTeamCurrentIndex(Math.max(0, Math.min(newIndex, teamMembers.length - 3)));
    }
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialScrollRef.current) {
      const scrollAmount = 400; // Width of one testimonial card + gap
      const currentScroll = testimonialScrollRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      testimonialScrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      
      // Update current index for pagination display
      const newIndex = Math.round(newScroll / scrollAmount);
      setTestimonialCurrentIndex(Math.max(0, Math.min(newIndex, testimonials.length - 2)));
    }
  };


  return (
    <section id="team" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/20 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Meet Our Team */}
        <div className="mb-20">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full mb-6">
              <span className="text-slate-700 text-sm font-semibold tracking-wide">● OUR EXPERTS</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Team</span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Passionate digital marketing experts dedicated to crafting innovative solutions 
              that drive your business success.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => scrollTeam('left')}
                className="w-12 h-12 border-2 border-slate-300 rounded-full flex items-center justify-center hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <span className="text-slate-500 text-sm font-medium">{String(teamCurrentIndex + 1).padStart(2, '0')}/{String(Math.max(1, teamMembers.length - 2)).padStart(2, '0')}</span>
              <button 
                onClick={() => scrollTeam('right')}
                className="w-12 h-12 border-2 border-slate-300 rounded-full flex items-center justify-center hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Team Grid */}
          <div 
            ref={teamScrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group flex-shrink-0 w-64">
                {/* Avatar */}
                <div className="aspect-[3/4] rounded-3xl mb-6 relative overflow-hidden group-hover:scale-105 transition-all duration-300 shadow-xl bg-slate-100 border-4 border-white">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="256px"
                  />
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Professional Overlay Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-orange-500/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  {/* Enhanced Name Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 text-center shadow-xl border border-white/20">
                      <h3 className="font-bold text-slate-900 text-base mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">
                        {member.role}
                      </p>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto mt-3 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-900 mb-2 text-lg">
                  {member.name}
                </h3>
                <p className="text-slate-600 font-medium">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What Client Says */}
        <div>
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
              <span className="text-orange-700 text-sm font-semibold tracking-wide">● CLIENT TESTIMONIALS</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              What Clients <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Say</span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Real stories from satisfied clients who&apos;ve experienced transformative results 
              through our digital marketing expertise.
            </p>
          </div>

          {/* Testimonials */}
          <div 
            ref={testimonialScrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 mb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 flex-shrink-0 w-96 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden bg-slate-100 border-4 border-white shadow-lg relative group/avatar">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                    {/* Avatar Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-orange-500/30 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <p className="text-slate-700 leading-relaxed text-lg">
                  &quot;{testimonial.content}&quot;
                </p>
                
                {/* Rating Stars */}
                <div className="flex items-center mt-6 pt-6 border-t border-slate-100">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-slate-500 font-medium">5.0 Rating</span>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center items-center space-x-4">
            <button 
              onClick={() => scrollTestimonials('left')}
              className="w-12 h-12 border-2 border-slate-300 rounded-full flex items-center justify-center hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <span className="text-slate-500 text-sm font-medium">{String(testimonialCurrentIndex + 1).padStart(2, '0')}/{String(Math.max(1, testimonials.length - 1)).padStart(2, '0')}</span>
            <button 
              onClick={() => scrollTestimonials('right')}
              className="w-12 h-12 border-2 border-slate-300 rounded-full flex items-center justify-center hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
