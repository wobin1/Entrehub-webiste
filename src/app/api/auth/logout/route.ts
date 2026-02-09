import { NextResponse } from 'next/server';

export async function POST() {
    // For JWT-based auth, logout is handled client-side by removing the token
    // This endpoint exists for consistency and future enhancements (e.g., token blacklisting)

    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear cookie
    response.cookies.delete('auth-token');

    return response;
}
