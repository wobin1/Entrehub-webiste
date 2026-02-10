import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, role, image, order } = body;

        const member = await prisma.teamMember.update({
            where: { id },
            data: {
                name,
                role,
                image,
                order,
            },
        });

        return NextResponse.json(member);
    } catch (error) {
        console.error('Error updating team member:', error);
        return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.teamMember.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Team member deleted' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
    }
}
