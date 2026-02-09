import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateContactMessageSchema } from '@/lib/validations/contact';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// GET /api/contact/[id] - Get a single contact message (admin only)
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify admin token
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const { id } = params;

        const message = await prisma.contactMessage.findUnique({
            where: { id },
        });

        if (!message) {
            return NextResponse.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message });
    } catch (error) {
        console.error('Error fetching contact message:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT /api/contact/[id] - Update contact message status/notes (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify admin token
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const { id } = params;
        const body = await request.json();

        // Validate input
        const validatedData = updateContactMessageSchema.parse(body);

        const message = await prisma.contactMessage.update({
            where: { id },
            data: {
                ...(validatedData.status && { status: validatedData.status }),
                ...(validatedData.notes !== undefined && { notes: validatedData.notes }),
            },
        });

        return NextResponse.json({ message });
    } catch (error: any) {
        console.error('Error updating contact message:', error);

        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation error', details: error.errors },
                { status: 400 }
            );
        }

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE /api/contact/[id] - Delete a contact message (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify admin token
        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const { id } = params;

        await prisma.contactMessage.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Contact message deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting contact message:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
