import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogPostServer, getBlogPostsServer } from '@/lib/api/blog';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/lib/api/client';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import AuthorAvatar from '@/components/blog/author-avatar';
import PostCard from '@/components/blog/post-card';
import ShareButtons from '@/components/blog/share-buttons';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { post } = await getBlogPostServer(slug);
    if (!post) return { title: 'Article not found | ENTREHUB' };
    return {
        title: `${post.title} | ENTREHUB Blog`,
        description: post.excerpt,
        openGraph: { title: post.title, description: post.excerpt, images: [post.coverImage] },
    };
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
        <>
            <Navigation />

            <main id="main-content" tabIndex={-1} className="min-h-screen bg-white pt-20 focus:outline-none">
                <article>
                    <header className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:pt-14">
                        <nav aria-label="Breadcrumb" className="mb-8">
                            <Link
                                href="/blog"
                                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-navy"
                            >
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                Back to blog
                            </Link>
                        </nav>

                        <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                            <span className="text-orange-700">{post.category.name}</span>
                            {post.featured && <span className="rounded-full bg-navy-tint px-2.5 py-1 text-navy">Featured</span>}
                        </p>

                        <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            {post.title}
                        </h1>

                        <p className="mb-8 text-xl leading-relaxed text-slate-600">{post.excerpt}</p>

                        <div className="flex flex-col gap-4 border-y border-slate-200 py-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <AuthorAvatar name={post.author.name} avatar={post.author.avatar} size={48} />
                                <div>
                                    <p className="font-semibold text-slate-900">{post.author.name}</p>
                                    {post.author.bio && <p className="text-sm text-slate-600">{post.author.bio}</p>}
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-5 text-sm text-slate-600">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" aria-hidden="true" />
                                    {post.publishedAt ? (
                                        <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</time>
                                    ) : (
                                        'Draft'
                                    )}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" aria-hidden="true" />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>
                    </header>

                    <div className="mx-auto my-10 max-w-5xl px-4 sm:px-6">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                            <Image
                                src={post.coverImage}
                                alt=""
                                fill
                                priority
                                sizes="(min-width: 1024px) 1024px, 100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="mx-auto max-w-3xl px-4 sm:px-6">
                        <div
                            className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-navy prose-a:underline-offset-4 prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {post.tags.length > 0 && (
                            <ul aria-label="Tags" className="mt-12 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <li key={tag.id} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                                        #{tag.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-10 border-t border-slate-200 pt-8">
                            <ShareButtons title={post.title} />
                        </div>
                    </div>
                </article>

                {relatedPosts.length > 0 && (
                    <section aria-labelledby="related-heading" className="mt-20 border-t border-slate-200 bg-slate-50 py-16">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                            <h2 id="related-heading" className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Related articles
                            </h2>
                            <ul className="grid gap-6 md:grid-cols-3">
                                {relatedPosts.map((relatedPost) => (
                                    <li key={relatedPost.id}>
                                        <PostCard post={relatedPost} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}
