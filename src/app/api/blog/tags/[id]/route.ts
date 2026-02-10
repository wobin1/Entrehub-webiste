import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { tagSchema } from '@/lib/validations/blog';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// PUT /api/blog/tags/[id] - Update a tag (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token || !(await verifyToken(token))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = tagSchema.parse(body);

        const tag = await prisma.tag.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json({ tag });
    } catch (error: any) {
        console.error('Error updating tag:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/blog/tags/[id] - Delete a tag (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token || !(await verifyToken(token))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.tag.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Tag deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting tag:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
