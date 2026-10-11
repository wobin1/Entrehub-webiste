import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/api/client';
import AuthorAvatar from './author-avatar';

interface PostCardProps {
  post: BlogPost;
  headingLevel?: 'h2' | 'h3';
}

export default function PostCard({ post, headingLevel: Heading = 'h3' }: PostCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange-700">{post.category.name}</p>

        <Heading className="mb-3 line-clamp-2 text-xl font-semibold leading-snug text-slate-900">
          {/* Stretched link makes the whole card clickable with one tab stop */}
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-navy"
          >
            {post.title}
          </Link>
        </Heading>

        <p className="mb-6 line-clamp-3 flex-1 leading-relaxed text-slate-600">{post.excerpt}</p>

        <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
          <AuthorAvatar name={post.author.name} avatar={post.author.avatar} size={36} />
          <div className="min-w-0 text-sm">
            <p className="truncate font-medium text-slate-900">{post.author.name}</p>
            <p className="flex items-center gap-3 text-slate-600">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {post.publishedAt ? (
                  <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
                ) : (
                  'Draft'
                )}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime}
              </span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
