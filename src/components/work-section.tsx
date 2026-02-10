'use client';

import Image from 'next/image';

export default function WorkSection() {
  const projects = [
    {
      category: 'SEO Optimization',
      title: "TechCorp's Traffic Soars With SEO Optimization",
      description: 'Boosted organic traffic by 50% for TechCorp through carefully targeted keyword strategies and comprehensive on-page optimization, driving significant growth in search engine visibility.',
      metric: '+50%',
      metricLabel: 'Organic traffic',
      image: '/images/img-1.jpg'
    },
    {
      category: 'Social Media Management',
      title: "FashionWave's Engagement Soars With Creative Campaigns",
      description: 'Increased follower engagement for FashionWave by 75% through the implementation of creative content strategies and interactive social media campaigns, significantly enhancing brand interaction and customer connection across all platforms.',
      metric: '+75%',
      metricLabel: 'Follower engagement',
      image: '/images/img-2.jpg'
    },
    {
      category: 'Brand Strategy',
      title: "UrbanNest's Brand Revamp Boosts Recognition",
      description: 'Revamped UrbanNest\'s brand identity, leading to a 50% increase in customer recognition and trust. The refreshed image strengthened market presence and deepened connections with the target audience.',
      metric: '+50%',
      image: '/images/img-3.jpg'
    }
  ];

  return (
    <section id="work" className="py-24 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
            <span className="text-orange-700 text-sm font-semibold tracking-wide">● SUCCESS STORIES</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Our <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Portfolio</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Discover how we&apos;ve transformed businesses through strategic digital marketing,
            delivering measurable results and sustainable growth.
          </p>

          <button className="group bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:from-slate-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span className="flex items-center space-x-2">
              <span>View All Projects</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-blue-100 rounded-full mb-8">
                  <span className="text-gray-700 text-sm font-semibold tracking-wide">{project.category}</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {project.title}
                </h3>

                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                      {project.metric}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">
                      {project.metricLabel}
                    </div>
                  </div>
                  <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="flex items-center space-x-2">
                      <span>View Case Study</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Image with Metric */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                  {/* Floating Metric Card */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {project.metric}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {project.metricLabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
