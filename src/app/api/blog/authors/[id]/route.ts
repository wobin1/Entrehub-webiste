import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorSchema } from '@/lib/validations/blog';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// PUT /api/blog/authors/[id] - Update an author (admin only)
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
        const validatedData = authorSchema.parse(body);

        const author = await prisma.author.update({
            where: { id: params.id },
            data: validatedData,
        });

        return NextResponse.json({ author });
    } catch (error: any) {
        console.error('Error updating author:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/blog/authors/[id] - Delete an author (admin only)
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

        await prisma.author.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Author deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting author:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
