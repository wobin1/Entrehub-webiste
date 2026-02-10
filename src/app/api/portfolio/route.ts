import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const projects = await prisma.portfolioProject.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, category, description, image, metric, metricLabel, order } = body;

        const project = await prisma.portfolioProject.create({
            data: {
                title,
                category,
                description,
                image,
                metric,
                metricLabel,
                order: order || 0,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
