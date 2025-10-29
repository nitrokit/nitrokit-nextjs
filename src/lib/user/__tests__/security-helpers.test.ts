import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = {
    session: {
        count: vi.fn()
    },
    account: {
        findMany: vi.fn()
    }
};

vi.mock('@/lib/prisma', () => ({
    prisma: prismaMock
}));

const MOCK_DATE = new Date('2025-10-22T10:00:00.000Z');
const MOCK_TIME = MOCK_DATE.getTime();

vi.useFakeTimers();
vi.setSystemTime(MOCK_DATE);

let analyzePasswordStrength: any;
let getActiveSessionCount: any;
let getRecentLoginAttempts: any;

beforeAll(async () => {
    const module = await import('../security-helpers');
    analyzePasswordStrength = module.analyzePasswordStrength;
    getActiveSessionCount = module.getActiveSessionCount;
    getRecentLoginAttempts = module.getRecentLoginAttempts;
});

describe('Security Helpers (Server Logic)', () => {
    const mockUserId = 'user_abc123';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('analyzePasswordStrength', () => {
        it('should return "none" for null password (e.g., OAuth users)', () => {
            expect(analyzePasswordStrength(null)).toBe('none');
        });

        it('should return "strong" for a typical bcrypt hash length/prefix', () => {
            const bcryptHash = '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789abcdefghij';
            expect(analyzePasswordStrength(bcryptHash)).toBe('strong');
        });

        it('should return "medium" for complex passwords (length >= 10, uppercase, number)', () => {
            expect(analyzePasswordStrength('SecurePassword1')).toBe('medium');
        });

        it('should return "weak" for short passwords', () => {
            expect(analyzePasswordStrength('short')).toBe('weak');
        });

        it('should return "weak" if it meets length but lacks complexity', () => {
            expect(analyzePasswordStrength('longpassword')).toBe('weak');
        });
    });

    describe('getActiveSessionCount', () => {
        it('should return 0 when no active sessions are found', async () => {
            prismaMock.session.count.mockResolvedValue(0);

            const result = await getActiveSessionCount(mockUserId);

            expect(result).toBe(0);
            expect(prismaMock.session.count).toHaveBeenCalledWith({
                where: {
                    userId: mockUserId,
                    expires: {
                        gt: MOCK_DATE
                    }
                }
            });
        });

        it('should return the correct count of active sessions', async () => {
            prismaMock.session.count.mockResolvedValue(3);

            const result = await getActiveSessionCount(mockUserId);

            expect(result).toBe(3);
        });

        it('should return 0 on database error', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            prismaMock.session.count.mockRejectedValue(new Error('DB connection failed'));
            const result = await getActiveSessionCount(mockUserId);
            expect(result).toBe(0);
            expect(consoleErrorSpy).toHaveBeenCalled();
            consoleErrorSpy.mockRestore();
        });
    });

    describe('getRecentLoginAttempts', () => {
        const DAY_IN_MS = 24 * 60 * 60 * 1000;
        const recentDate = new Date(MOCK_TIME - DAY_IN_MS / 2);
        const oldDate = new Date(MOCK_TIME - DAY_IN_MS * 2);

        it('should return the count of accounts created within the last 24 hours', async () => {
            const mockAccounts = [
                { provider: 'github', type: 'oauth', createdAt: recentDate },
                { provider: 'google', type: 'oauth', createdAt: recentDate },
                { provider: 'facebook', type: 'oauth', createdAt: oldDate } // Bu sayılmamalı
            ];

            prismaMock.account.findMany.mockResolvedValue(mockAccounts);

            const result = await getRecentLoginAttempts(mockUserId);

            expect(result).toBe(mockAccounts.length);

            expect(prismaMock.account.findMany).toHaveBeenCalledWith({
                where: {
                    userId: mockUserId,
                    createdAt: {
                        gt: new Date(MOCK_TIME - DAY_IN_MS)
                    }
                },
                select: { provider: true }
            });
        });

        it('should return 0 on database error', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            prismaMock.account.findMany.mockRejectedValue(new Error('DB error'));
            const result = await getRecentLoginAttempts(mockUserId);
            expect(result).toBe(0);
            expect(consoleErrorSpy).toHaveBeenCalled();
            consoleErrorSpy.mockRestore();
        });
    });
});
