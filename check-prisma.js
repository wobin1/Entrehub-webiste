const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log('Available models in Prisma Client:');
console.log(Object.keys(prisma).filter(key => typeof prisma[key] === 'object' && prisma[key] !== null));

prisma.$disconnect();
