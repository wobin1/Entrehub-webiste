import { prisma } from '@/lib/prisma';
import { BlogPost, PaginatedResponse } from './client';

export interface BlogPostParams {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    featured?: boolean;
    isAdmin?: boolean;
}

/**
 * Fetch blog posts directly from Prisma (Server-side)
 */
export async function getBlogPostsServer(params: BlogPostParams = {}): Promise<PaginatedResponse<BlogPost>> {
    const {
        page = 1,
        limit = 10,
        category,
        search,
        featured,
        isAdmin = false
    } = params;

    const skip = (page - 1) * limit;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Only show published posts to non-admin users
    if (!isAdmin) {
        where.published = true;
    }

    if (category) {
        where.category = { slug: category };
    }

    if (featured === true) {
        where.featured = true;
    }

    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { excerpt: { contains: search, mode: 'insensitive' } },
        ];
    }

    const [posts, total] = await Promise.all([
        prisma.blogPost.findMany({
            where,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        bio: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                tags: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy: { publishedAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.blogPost.count({ where }),
    ]);

    return {
        posts: JSON.parse(JSON.stringify(posts)), // Ensure objects are serializable
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}

/**
 * Fetch a single blog post by slug directly from Prisma (Server-side)
 */
export async function getBlogPostServer(slug: string): Promise<{ post: BlogPost | null }> {
    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                    bio: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            tags: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    if (post) {
        // Increment view count asynchronously
        prisma.blogPost.update({
            where: { slug },
            data: { views: { increment: 1 } },
        }).catch(err => console.error('Error updating views:', err));
    }

    return {
        post: post ? JSON.parse(JSON.stringify(post)) : null
    };
}

/**
 * Fetch all categories directly from Prisma (Server-side)
 */
export async function getCategoriesServer() {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { posts: true },
            },
        },
        orderBy: { name: 'asc' },
    });

    return {
        categories: JSON.parse(JSON.stringify(categories))
    };
}

/**
 * Fetch all tags directly from Prisma (Server-side)
 */
export async function getTagsServer() {
    const tags = await prisma.tag.findMany({
        include: {
            _count: {
                select: { posts: true },
            },
        },
        orderBy: { name: 'asc' },
    });

    return {
        tags: JSON.parse(JSON.stringify(tags))
    };
}

/**
 * Fetch all authors directly from Prisma (Server-side)
 */
export async function getAuthorsServer() {
    const authors = await prisma.author.findMany({
        include: {
            _count: {
                select: { posts: true },
            },
        },
        orderBy: { name: 'asc' },
    });

    return {
        authors: JSON.parse(JSON.stringify(authors))
    };
}
