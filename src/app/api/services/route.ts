import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, icon, included, order } = body;

        const service = await prisma.service.create({
            data: {
                title,
                description,
                icon,
                included,
                order: order || 0,
            },
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
