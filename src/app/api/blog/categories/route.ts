import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { categorySchema } from '@/lib/validations/blog';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { getCategoriesServer } from '@/lib/api/blog';

// GET /api/blog/categories - Get all categories
export async function GET() {
    try {
        const result = await getCategoriesServer();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/blog/categories - Create a new category (admin only)
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
        const validatedData = categorySchema.parse(body);

        const category = await prisma.category.create({
            data: validatedData,
        });

        return NextResponse.json({ category }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating category:', error);

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
