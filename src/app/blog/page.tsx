'use client';

import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Dummy blog data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Digital Marketing in 2024',
    excerpt: 'Explore the emerging trends and technologies that are reshaping the digital marketing landscape this year.',
    content: 'Full article content here...',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
    },
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    featured: true
  },
  {
    id: 2,
    title: 'SEO Best Practices for Small Businesses',
    excerpt: 'Learn how to optimize your website and improve your search engine rankings with these proven strategies.',
    content: 'Full article content here...',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    date: 'March 12, 2024',
    readTime: '7 min read',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 3,
    title: 'Social Media Marketing Strategies That Work',
    excerpt: 'Discover effective social media tactics to engage your audience and grow your brand presence online.',
    content: 'Full article content here...',
    author: {
      name: 'Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    date: 'March 10, 2024',
    readTime: '6 min read',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 4,
    title: 'Content Marketing: Creating Value for Your Audience',
    excerpt: 'Master the art of content creation that resonates with your target audience and drives meaningful engagement.',
    content: 'Full article content here...',
    author: {
      name: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    date: 'March 8, 2024',
    readTime: '8 min read',
    category: 'Content Marketing',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 5,
    title: 'Email Marketing Automation for Better ROI',
    excerpt: 'Streamline your email campaigns and maximize returns with smart automation strategies and tools.',
    content: 'Full article content here...',
    author: {
      name: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    date: 'March 5, 2024',
    readTime: '6 min read',
    category: 'Email Marketing',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 6,
    title: 'Analytics and Data-Driven Marketing Decisions',
    excerpt: 'Learn how to leverage data analytics to make informed marketing decisions and optimize your campaigns.',
    content: 'Full article content here...',
    author: {
      name: 'Robert Fox',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    date: 'March 3, 2024',
    readTime: '9 min read',
    category: 'Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    featured: false
  }
];

const categories = ['All', 'Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'Email Marketing', 'Analytics'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      {/* Back to Website Button */}
      <div className="pt-24 pb-4 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:border-slate-300 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Home className="w-4 h-4" />
            Back to Website
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="pt-8 pb-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-blue-700 text-sm font-semibold tracking-wide">● INSIGHTS & UPDATES</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            Our <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Blog</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, insights, and strategies in digital marketing.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
          <Link href={`/blog/${featuredPost.id}`}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-80 md:h-auto overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">{featuredPost.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-slate-900">{featuredPost.author.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all duration-300">
                      Read More
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-24">
        {regularPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{post.author.name}</span>
                      </div>
                      
                      <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
