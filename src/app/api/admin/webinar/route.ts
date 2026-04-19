import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { webinarSchema } from '@/lib/validations/webinar';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// GET /api/admin/webinar - Get all webinars
export async function GET(request: NextRequest) {
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

        const webinars = await prisma.webinar.findMany({
            orderBy: { scheduledAt: 'desc' },
            include: {
                _count: {
                    select: { registrations: true }
                }
            }
        });

        return NextResponse.json({ webinars });
    } catch (error) {
        console.error('Error fetching webinars:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/admin/webinar - Create a new webinar
export async function POST(request: NextRequest) {
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

        // If this webinar is set to active, deactivate others
        if (validatedData.isActive) {
            await prisma.webinar.updateMany({
                where: { isActive: true },
                data: { isActive: false }
            });
        }

        const webinar = await prisma.webinar.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                scheduledAt: validatedData.scheduledAt,
                meetingLink: validatedData.meetingLink,
                isActive: validatedData.isActive,
            }
        });

        return NextResponse.json({ webinar }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating webinar:', error);
        if (error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
