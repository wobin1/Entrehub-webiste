import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateBlogPostSchema } from '@/lib/validations/blog';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// GET /api/blog/[slug] - Get a single blog post by slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const post = await prisma.blogPost.findUnique({
            where: { slug },
            // ... (rest of search/replace is long, I'll be careful with chunks)
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

        if (!post) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        // Increment view count
        await prisma.blogPost.update({
            where: { slug },
            data: { views: { increment: 1 } },
        });

        return NextResponse.json({ post });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT /api/blog/[slug] - Update a blog post (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
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
        const validatedData = updateBlogPostSchema.parse(body);

        // First, get the current state of the post
        const currentPost = await prisma.blogPost.findUnique({
            where: { slug },
            select: { publishedAt: true }
        });

        if (!currentPost) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        // Determine publishedAt date
        let publishedAt = validatedData.publishedAt !== undefined
            ? (validatedData.publishedAt ? new Date(validatedData.publishedAt) : null)
            : undefined;

        // If toggling to published and no date exists, set to now
        if (validatedData.published === true && currentPost.publishedAt === null && publishedAt === undefined) {
            publishedAt = new Date();
        }

        // Update blog post
        const post = await prisma.blogPost.update({
            where: { slug },
            data: {
                ...(validatedData.title && { title: validatedData.title }),
                ...(validatedData.slug && { slug: validatedData.slug }),
                ...(validatedData.excerpt && { excerpt: validatedData.excerpt }),
                ...(validatedData.content && { content: validatedData.content }),
                ...(validatedData.coverImage && { coverImage: validatedData.coverImage }),
                ...(validatedData.featured !== undefined && { featured: validatedData.featured }),
                ...(validatedData.published !== undefined && { published: validatedData.published }),
                ...(publishedAt !== undefined && { publishedAt }),
                ...(validatedData.readTime && { readTime: validatedData.readTime }),
                ...(validatedData.authorId && { authorId: validatedData.authorId }),
                ...(validatedData.categoryId && { categoryId: validatedData.categoryId }),
                ...(validatedData.tagIds && {
                    tags: {
                        set: validatedData.tagIds.map((id) => ({ id })),
                    },
                }),
            },
            include: {
                author: true,
                category: true,
                tags: true,
            },
        });

        return NextResponse.json({ post });
    } catch (error: unknown) {
        console.error('Error updating blog post:', error);

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation error', details: (error as unknown as { errors: unknown }).errors },
                { status: 400 }
            );
        }

        if (error !== null && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE /api/blog/[slug] - Delete a blog post (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
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

        await prisma.blogPost.delete({
            where: { slug },
        });

        return NextResponse.json({ message: 'Blog post deleted successfully' });
    } catch (error: unknown) {
        console.error('Error deleting blog post:', error);

        if (error !== null && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
