import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not defined');
}

// Fix for self-signed certificates in some cloud databases (like Aiven)
if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// Prepare the connection URL with compatibility flags
const rawUrl = process.env.DATABASE_URL;
let connectionUrl = rawUrl;

// Add libpq compatibility and sslmode if missing, to satisfy pg and Prisma 7 stricter checks
if (!connectionUrl.includes('uselibpqcompat=')) {
    const separator = connectionUrl.includes('?') ? '&' : '?';
    connectionUrl += `${separator}uselibpqcompat=true`;
}
if (!connectionUrl.includes('sslmode=')) {
    connectionUrl += '&sslmode=require';
}

const pool = new Pool({
    connectionString: connectionUrl,
    ssl: {
        rejectUnauthorized: false // Required for Aiven's self-signed certificates
    }
});

// Mask sensitive info in connection string for logging
try {
    const urlForLogging = new URL(connectionUrl);
    console.log(`[Prisma] Connecting to database: ${urlForLogging.host}${urlForLogging.pathname}?${urlForLogging.searchParams.toString().replace(/api_key=[^&]+/, 'api_key=***')}`);
} catch (e) {
    console.log('[Prisma] Connecting to database');
}

const adapter = new PrismaPg(pool);

const createPrismaClient = () => {
    const client = new PrismaClient({ adapter });

    return client.$extends({
        query: {
            async $allOperations({ model, operation, args, query }) {
                const startTime = Date.now();
                console.log(`\n[Prisma Query] Model: ${model}, Operation: ${operation}`);
                console.log(`[Prisma Args] ${JSON.stringify(args, null, 2)}`);

                const result = await query(args);

                const duration = Date.now() - startTime;
                console.log(`[Prisma Result] Duration: ${duration}ms`);
                console.log(`[Prisma Data Fetched] ${JSON.stringify(result, null, 2)}\n`);
                return result;
            },
        },
    });
};

const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
