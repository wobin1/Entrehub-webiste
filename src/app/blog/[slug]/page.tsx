import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostServer, getBlogPostsServer } from '@/lib/api/blog';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/lib/api/client';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    // Fetch the blog post directly from Prisma
    const data = await getBlogPostServer(slug);
    const post = data.post;

    if (!post) {
        notFound();
    }

    // Fetch related posts from the same category directly from Prisma
    const { posts: allPosts } = await getBlogPostsServer({ limit: 100 });
    const relatedPosts = allPosts
        ?.filter((p: BlogPost) => p.category.id === post.category.id && p.id !== post.id)
        .slice(0, 3) || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blog"
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Blog</span>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            <span className="font-medium">Home</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Article Header */}
                <article>
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-sm font-semibold rounded-full">
                                {post.category.name}
                            </span>
                            {post.featured && (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                    ⭐ Featured
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

                        {/* Author & Meta */}
                        <div className="flex items-center gap-6 pb-8 border-b border-gray-200">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={post.author.avatar || '/default-avatar.png'}
                                    alt={post.author.name}
                                    width={56}
                                    height={56}
                                    className="rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                                    <p className="text-sm text-gray-600">{post.author.bio}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-500 ml-auto">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {post.publishedAt
                                        ? format(new Date(post.publishedAt), 'MMMM dd, yyyy')
                                        : 'Draft'}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Article Content */}
                    <div
                        className="prose prose-lg max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Share Buttons */}
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-gray-700 font-semibold">Share this article:</span>
                        <div className="flex gap-3">
                            <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                                    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                                        <div className="relative h-40 overflow-hidden">
                                            <Image
                                                src={relatedPost.coverImage}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                {relatedPost.readTime}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
