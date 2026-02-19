import { prisma } from '../src/lib/prisma';

async function main() {
    console.log('--- Database Logging Test Start ---');
    try {
        const posts = await prisma.blogPost.findMany({
            take: 1,
            select: { id: true, title: true }
        });
        console.log('--- Database Logging Test End ---');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Since we are using an adapter with a pool, we should probably close it 
        // to avoid the script hanging, but for a one-off test it's fine.
        process.exit(0);
    }
}

main();
