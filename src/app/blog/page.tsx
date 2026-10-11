import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogPostsServer, getCategoriesServer } from '@/lib/api/blog';
import { format } from 'date-fns';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import AuthorAvatar from '@/components/blog/author-avatar';
import BlogPageClient from './BlogPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | ENTREHUB',
  description: 'Insights, tips, and strategies to help your business grow in the digital age.',
};

export default async function BlogPage() {
  // Fetch blog posts and categories directly from Prisma
  const [{ posts }, { categories }] = await Promise.all([
    getBlogPostsServer({ limit: 100 }), // Fetch all posts for client-side filtering
    getCategoriesServer(),
  ]);

  // Find featured post
  const featuredPost = posts?.find((post) => post.featured);

  return (
    <>
      <Navigation />

      <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-50 pt-20 focus:outline-none">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-navy">ENTREHUB Blog</p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Insights for growing <span className="text-navy">brands</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Insights, tips, and strategies to help your business grow in the digital age.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          {featuredPost && (
            <section aria-labelledby="featured-heading" className="mb-16">
              <h2 id="featured-heading" className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-600">
                Featured article
              </h2>

              <article className="group relative grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg md:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 md:aspect-auto md:min-h-[360px]">
                  <Image
                    src={featuredPost.coverImage}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                    <span className="text-orange-700">{featuredPost.category.name}</span>
                    <span className="rounded-full bg-navy-tint px-2.5 py-1 text-navy">Featured</span>
                  </p>

                  <h3 className="mb-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="after:absolute after:inset-0 after:content-[''] group-hover:text-navy"
                    >
                      {featuredPost.title}
                    </Link>
                  </h3>

                  <p className="mb-6 line-clamp-3 text-lg leading-relaxed text-slate-600">{featuredPost.excerpt}</p>

                  <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-900">
                      <AuthorAvatar name={featuredPost.author.name} avatar={featuredPost.author.avatar} size={36} />
                      {featuredPost.author.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {featuredPost.publishedAt ? (
                        <time dateTime={featuredPost.publishedAt}>
                          {format(new Date(featuredPost.publishedAt), 'MMM d, yyyy')}
                        </time>
                      ) : (
                        'Draft'
                      )}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-2 font-semibold text-navy" aria-hidden="true">
                    Read article
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            </section>
          )}

          <BlogPageClient posts={posts || []} categories={categories || []} />
        </div>
      </main>

      <Footer />
    </>
  );
}
