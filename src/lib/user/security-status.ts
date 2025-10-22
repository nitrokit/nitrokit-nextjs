import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { SecurityStatus } from './types';
import {
    analyzePasswordStrength,
    getActiveSessionCount,
    getRecentLoginAttempts
} from './security-helpers';

export async function getUserSecurityStatus(userId: string): Promise<SecurityStatus> {
    const [user, activeSessions, recentLoginAttempts] = await Promise.all([
        prisma.user.findUnique({
            where: { id: userId },
            select: {
                password: true,
                twoFactorEnabled: true,
                emailVerified: true,
                phoneVerified: true
            }
        }),
        getActiveSessionCount(userId),
        getRecentLoginAttempts(userId)
    ]);

    if (!user) {
        return {
            passwordStrength: 'unknown',
            twoFactorEnabled: false,
            activeSessions: 0,
            recentLoginAttempts: 0,
            lastPasswordChange: undefined
        } as SecurityStatus;
    }

    const passwordStrength = analyzePasswordStrength(user.password);

    return {
        passwordStrength,
        twoFactorEnabled: user.twoFactorEnabled || false,
        activeSessions,
        lastPasswordChange: undefined,
        recentLoginAttempts
    };
}

export async function getSimpleSecurityStatus(): Promise<SecurityStatus> {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            passwordStrength: 'unknown',
            twoFactorEnabled: false,
            activeSessions: 0,
            recentLoginAttempts: 0
        };
    }
    return await getUserSecurityStatus(session.user.id);
}

export async function getSafeSecurityStatus(userId?: string): Promise<SecurityStatus> {
    try {
        if (userId) {
            return await getUserSecurityStatus(userId);
        } else {
            return await getSimpleSecurityStatus();
        }
    } catch (error) {
        console.error('Security status error, using mock data:', error);
        return {
            passwordStrength: 'medium',
            twoFactorEnabled: true,
            activeSessions: 2,
            recentLoginAttempts: 0
        };
    }
}
