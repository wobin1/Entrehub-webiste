import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const items = await prisma.aboutSection.findMany({
            orderBy: { type: 'asc' },
        });
        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching about section:', error);
        return NextResponse.json({ error: 'Failed to fetch about section' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, content, title, icon } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updatedItem = await prisma.aboutSection.update({
            where: { id },
            data: { content, title, icon },
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error('Error updating about section:', error);
        return NextResponse.json({ error: 'Failed to update about section' }, { status: 500 });
    }
}
