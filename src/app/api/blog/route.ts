import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { blogPostSchema } from '@/lib/validations/blog';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { getBlogPostsServer } from '@/lib/api/blog';

// GET /api/blog - Get all published blog posts (public) or all posts (admin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const category = searchParams.get('category') || undefined;
        const search = searchParams.get('search') || undefined;
        const featured = searchParams.get('featured') === 'true';

        // Check if user is admin
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);
        const isAdmin = token ? await verifyToken(token) : null;

        const result = await getBlogPostsServer({
            page,
            limit,
            category,
            search,
            featured,
            isAdmin: !!isAdmin
        });

        return NextResponse.json(result);
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
