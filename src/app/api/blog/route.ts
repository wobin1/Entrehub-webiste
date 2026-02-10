import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { blogPostSchema } from '@/lib/validations/blog';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// GET /api/blog - Get all published blog posts (public) or all posts (admin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const featured = searchParams.get('featured');

        // Check if user is admin
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);
        const isAdmin = token ? await verifyToken(token) : null;

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

        if (featured === 'true') {
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

        return NextResponse.json({
            posts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/blog - Create a new blog post (admin only)
export async function POST(request: NextRequest) {
    try {
        // Verify admin token
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const body = await request.json();

        // Validate input
        const validatedData = blogPostSchema.parse(body);

        // Create blog post
        const post = await prisma.blogPost.create({
            data: {
                title: validatedData.title,
                slug: validatedData.slug,
                excerpt: validatedData.excerpt,
                content: validatedData.content,
                coverImage: validatedData.coverImage,
                featured: validatedData.featured,
                published: validatedData.published,
                publishedAt: validatedData.publishedAt
                    ? new Date(validatedData.publishedAt)
                    : (validatedData.published ? new Date() : null),
                readTime: validatedData.readTime,
                authorId: validatedData.authorId,
                categoryId: validatedData.categoryId,
                tags: {
                    connect: validatedData.tagIds?.map((id) => ({ id })) || [],
                },
            },
            include: {
                author: true,
                category: true,
                tags: true,
            },
        });

        return NextResponse.json({ post }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating blog post:', error);

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation error', details: (error as unknown as { errors: unknown }).errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
