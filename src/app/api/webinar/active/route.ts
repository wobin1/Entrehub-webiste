import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/webinar/active - Get the currently active webinar
export async function GET() {
    try {
        const webinar = await prisma.webinar.findFirst({
            where: { isActive: true },
            orderBy: { scheduledAt: 'asc' },
        });

        if (!webinar) {
            return NextResponse.json({ message: 'No active webinar found' }, { status: 404 });
        }

        return NextResponse.json({ webinar });
    } catch (error) {
        console.error('Error fetching active webinar:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
