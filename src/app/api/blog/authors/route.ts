import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorSchema } from '@/lib/validations/blog';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// GET /api/blog/authors - Get all authors
export async function GET() {
    try {
        const authors = await prisma.author.findMany({
            include: {
                _count: {
                    select: { posts: true },
                },
            },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json({ authors });
    } catch (error) {
        console.error('Error fetching authors:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/blog/authors - Create a new author (admin only)
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
        const validatedData = authorSchema.parse(body);

        const author = await prisma.author.create({
            data: validatedData,
        });

        return NextResponse.json({ author }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating author:', error);

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
