import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, category, description, image, metric, metricLabel, order } = body;

        const project = await prisma.portfolioProject.update({
            where: { id },
            data: {
                title,
                category,
                description,
                image,
                metric,
                metricLabel,
                order,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.portfolioProject.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Project deleted' });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
