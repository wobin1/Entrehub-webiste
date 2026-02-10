import { Calendar, Clock, ArrowRight, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts, getCategories } from '@/lib/api/client';
import { format } from 'date-fns';
import BlogPageClient from './BlogPageClient';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  // Fetch blog posts and categories from API
  const [{ posts }, { categories }] = await Promise.all([
    getBlogPosts({ limit: 100 }), // Fetch all posts for client-side filtering
    getCategories(),
  ]);

  // Find featured post
  const featuredPost = posts?.find((post) => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              EntreHub Blog
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and strategies to help your business grow in the digital age
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full" />
              <h3 className="text-2xl font-bold text-gray-900">Featured Article</h3>
            </div>

            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-sm font-semibold rounded-full">
                        {featuredPost.category.name}
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                        ⭐ Featured
                      </span>
                    </div>

                    <h4 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {featuredPost.title}
                    </h4>

                    <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>

                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Image
                          src={featuredPost.author.avatar || '/default-avatar.png'}
                          alt={featuredPost.author.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {featuredPost.author.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.publishedAt
                            ? format(new Date(featuredPost.publishedAt), 'MMM dd, yyyy')
                            : 'Draft'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                      Read Article
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Client-side filtering and display */}
        <BlogPageClient posts={posts || []} categories={categories || []} />
      </main>
    </div>
  );
}
