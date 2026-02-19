import { NextResponse } from 'next/server';

export async function GET() {
    const dbUrl = process.env.DATABASE_URL || '';
    let host = 'Not found';

    try {
        // Extract host from connection string for verification
        const url = new URL(dbUrl.replace('postgres://', 'http://').replace('postgresql://', 'http://'));
        host = url.hostname;
    } catch (e) {
        host = 'Invalid URL format';
    }

    return NextResponse.json({
        current_db_host: host,
        env_database_url_exists: !!process.env.DATABASE_URL,
        message: "If this host doesn't match your remote DB, try restarting the dev server. If it does match but you see old data, run 'npm run db:setup'."
    });
}
