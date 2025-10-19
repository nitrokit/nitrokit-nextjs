import QRCode from 'qrcode';
import { prisma } from '@/lib/prisma';

export interface TwoFactorSetup {
    secret: string;
    qrCodeUrl: string;
    manualEntryKey: string;
    backupCodes: string[];
}

export interface TwoFactorVerification {
    success: boolean;
    error?: string;
    backupCodeUsed?: boolean;
}

export class TwoFactorService {
    private static base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    private static base32Encode(buffer: Uint8Array): string {
        let bits = 0;
        let value = 0;
        let output = '';

        for (let i = 0; i < buffer.length; i++) {
            value = (value << 8) | buffer[i];
            bits += 8;

            while (bits >= 5) {
                output += this.base32Chars[(value >>> (bits - 5)) & 31];
                bits -= 5;
            }
        }

        if (bits > 0) {
            output += this.base32Chars[(value << (5 - bits)) & 31];
        }

        return output;
    }

    private static base32Decode(encoded: string): Uint8Array {
        let bits = 0;
        let value = 0;
        let index = 0;
        const output = new Uint8Array(Math.ceil((encoded.length * 5) / 8));

        for (let i = 0; i < encoded.length; i++) {
            const char = encoded[i].toUpperCase();
            const charIndex = this.base32Chars.indexOf(char);

            if (charIndex === -1) continue;

            value = (value << 5) | charIndex;
            bits += 5;

            if (bits >= 8) {
                output[index++] = (value >>> (bits - 8)) & 255;
                bits -= 8;
            }
        }

        return output.slice(0, index);
    }

    private static async computeHMAC(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
        const keyBuffer = new ArrayBuffer(key.length);
        const keyView = new Uint8Array(keyBuffer);
        keyView.set(key);

        const dataBuffer = new ArrayBuffer(data.length);
        const dataView = new Uint8Array(dataBuffer);
        dataView.set(data);

        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'HMAC', hash: 'SHA-1' },
            false,
            ['sign']
        );

        const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
        return new Uint8Array(signature);
    }

    private static async generateTOTP(secret: string, timeStep = 30, digits = 6): Promise<string> {
        let time = Math.floor(Date.now() / 1000 / timeStep);
        const timeBuffer = new Uint8Array(8);

        for (let i = 7; i >= 0; i--) {
            timeBuffer[i] = time & 0xff;
            time = time >>> 8;
        }

        const secretBuffer = this.base32Decode(secret);
        const hash = await this.computeHMAC(secretBuffer, timeBuffer);

        const offset = hash[hash.length - 1] & 0x0f;
        const code =
            ((hash[offset] & 0x7f) << 24) |
            ((hash[offset + 1] & 0xff) << 16) |
            ((hash[offset + 2] & 0xff) << 8) |
            (hash[offset + 3] & 0xff);

        return (code % Math.pow(10, digits)).toString().padStart(digits, '0');
    }

    private static async verifyTOTP(secret: string, token: string, window = 2): Promise<boolean> {
        const timeStep = 30;
        const currentTime = Math.floor(Date.now() / 1000 / timeStep);

        for (let i = -window; i <= window; i++) {
            let testTime = currentTime + i;
            const testTimeBuffer = new Uint8Array(8);

            for (let j = 7; j >= 0; j--) {
                testTimeBuffer[j] = testTime & 0xff;
                testTime = testTime >>> 8;
            }

            const secretBuffer = this.base32Decode(secret);
            const hash = await this.computeHMAC(secretBuffer, testTimeBuffer);

            const offset = hash[hash.length - 1] & 0x0f;
            const code =
                ((hash[offset] & 0x7f) << 24) |
                ((hash[offset + 1] & 0xff) << 16) |
                ((hash[offset + 2] & 0xff) << 8) |
                (hash[offset + 3] & 0xff);

            const expectedToken = (code % 1000000).toString().padStart(6, '0');

            if (expectedToken === token) {
                return true;
            }
        }

        return false;
    }

    static async generateSetup(userId: string, userEmail: string): Promise<TwoFactorSetup> {
        try {
            const secretBuffer = crypto.getRandomValues(new Uint8Array(20));
            const secret = this.base32Encode(secretBuffer);

            const backupCodes = this.generateBackupCodes();

            const issuer = 'Nitrokit';
            const accountName = `${issuer}:${userEmail}`;
            const totpUrl = `otpauth://totp/${encodeURIComponent(accountName)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;

            const qrCodeUrl = await QRCode.toDataURL(totpUrl);

            return {
                secret,
                qrCodeUrl,
                manualEntryKey: secret,
                backupCodes
            };
        } catch (error) {
            console.error('❌ Failed to generate 2FA setup:', error);
            throw new Error('Failed to generate 2FA setup');
        }
    }

    static async enable(
        userId: string,
        secret: string,
        token: string,
        backupCodes: string[]
    ): Promise<boolean> {
        try {
            const verified = await this.verifyTOTP(secret, token);

            if (!verified) {
                return false;
            }

            await prisma.user.update({
                where: { id: userId },
                data: {
                    twoFactorEnabled: true,
                    twoFactorSecret: secret,
                    twoFactorBackupCodes: backupCodes,
                    twoFactorVerifiedAt: new Date()
                }
            });
            return true;
        } catch (error) {
            console.error('❌ Failed to enable 2FA:', error);
            throw error;
        }
    }

    static async disable(userId: string, token: string): Promise<boolean> {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { twoFactorSecret: true, twoFactorEnabled: true }
            });

            if (!user?.twoFactorEnabled || !user.twoFactorSecret) {
                throw new Error('2FA is not enabled');
            }

            const twoFactorSecret: string = user.twoFactorSecret;
            const verified = await this.verifyTOTP(twoFactorSecret, token);

            if (!verified) {
                return false;
            }

            await prisma.user.update({
                where: { id: userId },
                data: {
                    twoFactorEnabled: false,
                    twoFactorSecret: null,
                    twoFactorBackupCodes: [],
                    twoFactorVerifiedAt: null
                }
            });

            return true;
        } catch (error) {
            console.error('❌ Failed to disable 2FA:', error);
            throw error;
        }
    }

    static async verifyToken(userId: string, token: string): Promise<TwoFactorVerification> {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    twoFactorSecret: true,
                    twoFactorEnabled: true,
                    twoFactorBackupCodes: true
                }
            });

            if (!user?.twoFactorEnabled || !user.twoFactorSecret) {
                return { success: false, error: '2FA is not enabled' };
            }

            const twoFactorSecret: string = user.twoFactorSecret;

            const totpVerified = await this.verifyTOTP(twoFactorSecret, token);

            if (totpVerified) {
                return { success: true };
            }

            if (user.twoFactorBackupCodes && user.twoFactorBackupCodes.includes(token)) {
                const updatedBackupCodes = user.twoFactorBackupCodes.filter(
                    (code) => code !== token
                );

                await prisma.user.update({
                    where: { id: userId },
                    data: { twoFactorBackupCodes: updatedBackupCodes }
                });

                return { success: true, backupCodeUsed: true };
            }

            return { success: false, error: 'Invalid token' };
        } catch (error) {
            console.error('❌ Failed to verify 2FA token:', error);
            return { success: false, error: 'Verification failed' };
        }
    }

    static async regenerateBackupCodes(userId: string, token: string): Promise<string[] | null> {
        try {
            const verification = await this.verifyToken(userId, token);
            if (!verification.success) {
                return null;
            }

            const newBackupCodes = this.generateBackupCodes();

            await prisma.user.update({
                where: { id: userId },
                data: { twoFactorBackupCodes: newBackupCodes }
            });

            return newBackupCodes;
        } catch (error) {
            console.error('❌ Failed to regenerate backup codes:', error);
            throw error;
        }
    }

    private static generateBackupCodes(): string[] {
        const codes: string[] = [];
        for (let i = 0; i < 10; i++) {
            const buffer = crypto.getRandomValues(new Uint8Array(4));
            const code = Array.from(buffer)
                .map((b) => b.toString(16).padStart(2, '0'))
                .join('')
                .toUpperCase();
            codes.push(`${code.slice(0, 4)}-${code.slice(4, 8)}`);
        }
        return codes;
    }

    static async getStatus(userId: string): Promise<{
        enabled: boolean;
        verifiedAt: Date | null;
        backupCodesCount: number;
    }> {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    twoFactorEnabled: true,
                    twoFactorVerifiedAt: true,
                    twoFactorBackupCodes: true
                }
            });

            return {
                enabled: user?.twoFactorEnabled ?? false,
                verifiedAt: user?.twoFactorVerifiedAt ?? null,
                backupCodesCount: user?.twoFactorBackupCodes?.length ?? 0
            };
        } catch (error) {
            console.error('❌ Failed to get 2FA status:', error);
            return {
                enabled: false,
                verifiedAt: null,
                backupCodesCount: 0
            };
        }
    }
}
