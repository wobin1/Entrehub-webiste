'use client';

import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import type { BlogPost } from '@/lib/api/client';

interface BlogPageClientProps {
    posts: BlogPost[];
    categories: Array<{ id: string; name: string; slug: string; _count: { posts: number } }>;
}

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter posts based on category and search
    const filteredPosts = posts.filter((post) => {
        const matchesCategory =
            selectedCategory === 'All' || post.category.name === selectedCategory;
        const matchesSearch =
            searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            {/* Filters */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all ${selectedCategory === 'All'
                                    ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            All Posts
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all ${selectedCategory === category.name
                                        ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-80 pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        />
                    </div>
                </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                        <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold rounded-full">
                                        {post.category.name}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>

                                {/* Meta */}
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={post.author.avatar || '/default-avatar.png'}
                                            alt={post.author.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            {post.author.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.publishedAt
                                            ? format(new Date(post.publishedAt), 'MMM dd, yyyy')
                                            : 'Draft'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-blue-600 font-semibold mt-4 group-hover:gap-4 transition-all">
                                    Read More
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600">
                        Try adjusting your filters or search query
                    </p>
                </div>
            )}
        </>
    );
}
