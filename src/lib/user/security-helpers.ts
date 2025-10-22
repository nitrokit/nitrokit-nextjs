import { prisma } from '@/lib/prisma';
import { PasswordStrength } from './types';

export function analyzePasswordStrength(password: string | null): PasswordStrength {
    if (!password) {
        return 'none';
    }

    if (password.length >= 50 && password.startsWith('$2')) {
        return 'strong';
    }

    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        return 'medium';
    }

    return 'weak';
}

export async function getActiveSessionCount(userId: string): Promise<number> {
    try {
        const count = await prisma.session.count({
            where: {
                userId,
                expires: {
                    gt: new Date()
                }
            }
        });
        return count;
    } catch (error) {
        console.error('Error fetching active session count:', error);
        return 0;
    }
}
export async function getRecentLoginAttempts(userId: string): Promise<number> {
    try {
        const accounts = await prisma.account.findMany({
            where: {
                userId,
                createdAt: {
                    gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            },
            select: { provider: true }
        });

        return accounts.length;
    } catch (error) {
        console.error('Error fetching recent login attempts:', error);
        return 0;
    }
}
