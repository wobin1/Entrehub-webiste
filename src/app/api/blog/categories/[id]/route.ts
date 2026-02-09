import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { categorySchema } from '@/lib/validations/blog';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// PUT /api/blog/categories/[id] - Update a category (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token || !(await verifyToken(token))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = categorySchema.parse(body);

        const category = await prisma.category.update({
            where: { id: params.id },
            data: validatedData,
        });

        return NextResponse.json({ category });
    } catch (error: any) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/blog/categories/[id] - Delete a category (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token || !(await verifyToken(token))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.category.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
