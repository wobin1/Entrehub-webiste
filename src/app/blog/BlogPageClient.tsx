'use client';

import { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import type { BlogPost } from '@/lib/api/client';
import PostCard from '@/components/blog/post-card';

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

    const filters = ['All', ...categories.map((category) => category.name)];

    return (
        <section aria-labelledby="all-posts-heading">
            <h2 id="all-posts-heading" className="sr-only">
                All articles
            </h2>

            {/* Filters */}
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
                    {filters.map((name) => {
                        const isActive = selectedCategory === name;
                        return (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setSelectedCategory(name)}
                                aria-pressed={isActive}
                                className={`min-h-11 rounded-full px-5 text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-navy text-white shadow-sm'
                                        : 'border border-slate-300 bg-white text-slate-700 hover:border-navy/40 hover:text-navy'
                                }`}
                            >
                                {name === 'All' ? 'All posts' : name}
                            </button>
                        );
                    })}
                </div>

                <div className="relative w-full lg:w-80">
                    <label htmlFor="blog-search" className="sr-only">
                        Search articles
                    </label>
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                    <input
                        id="blog-search"
                        type="search"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="min-h-11 w-full rounded-full border border-slate-300 bg-white py-2.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/30"
                    />
                </div>
            </div>

            <p role="status" className="sr-only">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </p>

            {filteredPosts.length > 0 ? (
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <li key={post.id}>
                            <PostCard post={post} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                    <FileText className="mx-auto mb-4 h-10 w-10 text-slate-400" aria-hidden="true" />
                    <h3 className="mb-2 text-xl font-semibold text-slate-900">No articles found</h3>
                    <p className="text-slate-600">Try another category or search term.</p>
                </div>
            )}
        </section>
    );
}
