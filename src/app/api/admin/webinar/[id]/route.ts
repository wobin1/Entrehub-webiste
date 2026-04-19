import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { webinarSchema } from '@/lib/validations/webinar';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// GET /api/admin/webinar/[id] - Get specific webinar details
export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const webinar = await prisma.webinar.findUnique({
            where: { id: params.id },
            include: {
                registrations: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!webinar) {
            return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
        }

        return NextResponse.json({ webinar });
    } catch (error) {
        console.error('Error fetching webinar:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/admin/webinar/[id] - Update webinar details
export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
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
        const validatedData = webinarSchema.parse(body);

        // If this webinar is being set to active, deactivate others
        if (validatedData.isActive) {
            await prisma.webinar.updateMany({
                where: { 
                    isActive: true,
                    NOT: { id: params.id }
                },
                data: { isActive: false }
            });
        }

        const webinar = await prisma.webinar.update({
            where: { id: params.id },
            data: {
                title: validatedData.title,
                description: validatedData.description,
                scheduledAt: validatedData.scheduledAt,
                meetingLink: validatedData.meetingLink,
                isActive: validatedData.isActive,
            }
        });

        return NextResponse.json({ webinar });
    } catch (error: unknown) {
        console.error('Error updating webinar:', error);
        if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validation error', details: 'errors' in error ? error.errors : [] }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/admin/webinar/[id] - Delete webinar
export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        await prisma.webinar.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Webinar deleted successfully' });
    } catch (error) {
        console.error('Error deleting webinar:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
