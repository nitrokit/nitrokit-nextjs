import { PrismaClient } from '@/generated/prisma';

declare global {
    var prisma: PrismaClient | undefined;
}

const global = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
    global.prisma ||
    new PrismaClient({
        // log: ['query', 'error', 'warn']
    });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
