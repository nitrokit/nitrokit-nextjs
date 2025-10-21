import * as crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sign } from 'jsonwebtoken';
import { User, VerificationToken } from '@/generated/prisma';

interface TokenVerificationResult {
    valid: boolean;
    error?: string;
    email?: string;
    type?: 'EMAIL_VERIFICATION' | 'PASSWORD_RESET';
    identifier?: string;
}

export async function generateVerificationToken(email: string): Promise<VerificationToken> {
    try {
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const identifier = email;

        await prisma.verificationToken.deleteMany({
            where: { identifier: identifier }
        });

        const verificationToken = await prisma.verificationToken.create({
            data: {
                identifier: identifier,
                token,
                expires
            }
        });

        return verificationToken;
    } catch (error) {
        throw error;
    }
}

export async function generatePasswordResetToken(email: string): Promise<VerificationToken> {
    try {
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        const identifier = `reset_${email}`;

        await prisma.verificationToken.deleteMany({
            where: { identifier }
        });

        const passwordResetToken = await prisma.verificationToken.create({
            data: {
                identifier,
                token,
                expires
            }
        });

        return passwordResetToken;
    } catch (error) {
        throw error;
    }
}

export async function verifyToken(token: string): Promise<TokenVerificationResult> {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token }
        });

        if (!verificationToken) {
            return { valid: false, error: 'Invalid token' };
        }

        if (verificationToken.expires < new Date()) {
            await prisma.verificationToken.delete({
                where: { token }
            });
            return { valid: false, error: 'Token expired' };
        }

        const isPasswordReset = verificationToken.identifier.startsWith('reset_');
        const email = isPasswordReset
            ? verificationToken.identifier.replace('reset_', '')
            : verificationToken.identifier;

        return {
            valid: true,
            email,
            type: isPasswordReset ? 'PASSWORD_RESET' : 'EMAIL_VERIFICATION',
            identifier: verificationToken.identifier
        };
    } catch {
        return { valid: false, error: 'Token verification failed' };
    }
}

export async function generateRefreshToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(40).toString('hex');
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 gün

    await prisma.refreshToken.create({
        data: {
            token,
            userId,
            expires
        }
    });

    return token;
}

export async function refreshAccessToken(refreshToken: string) {
    try {
        const token = await prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true }
        });

        if (!token || token.expires < new Date()) {
            throw new Error('Invalid or expired refresh token');
        }

        const userIdSafe: string = token.userId;
        const userSafe: User = token.user;

        const newRefreshToken = await generateRefreshToken(userIdSafe);
        const newAccessToken = generateAccessToken(userSafe);

        await prisma.refreshToken.delete({
            where: { id: token.id }
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
        };
    } catch (error) {
        throw error;
    }
}

export async function revokeRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.delete({
        where: { token }
    });
}

export async function revokeVerificationToken(token: string): Promise<void> {
    await prisma.verificationToken.delete({
        where: { token }
    });
}

export function generateAccessToken(user: User): string {
    const payload = {
        sub: user.id,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
        locale: user.locale,
        theme: user.theme
    };

    const token: string = sign(payload, process.env.AUTH_SECRET!, {
        expiresIn: '30d'
    });

    return token;
}
