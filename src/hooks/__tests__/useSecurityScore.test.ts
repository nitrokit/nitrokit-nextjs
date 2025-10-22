import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSecurityScore } from '../useSecurityScore';

import { SecurityStatus, UserWithRelations, Recommendation } from '@/lib/user/types';

const mockT = vi.fn((key: string) => `T_${key}`);
const mockUseTranslations = vi.fn(() => mockT);
const mockUseMemo = vi.fn((fn) => fn());

vi.mock('next-intl', () => ({
    useTranslations: vi.fn(() => mockT)
}));

vi.mock('react', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react')>();
    return {
        ...actual,
        useMemo: vi.fn((fn) => fn())
    };
});

vi.mock('@/lib/auth/constants', () => ({
    APP_ROUTES: {
        EMAIL_VERIFY: '/email/verify',
        SECURITY_PASSWORD: '/security/password',
        SECURITY_2FA: '/security/two-factor',
        PROFILE: '/account/profile'
    }
}));

describe('useSecurityScore', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockT.mockClear();
    });

    const baseUser: UserWithRelations = {
        id: '123',
        email: 'test@nitrokit.com',
        name: 'Test User',
        emailVerified: null,
        password: null,
        phoneVerified: false,
        twoFactorEnabled: false,
        activeSessions: 5,
        accounts: [],
        sessions: []
    } as any;

    const baseStatus: SecurityStatus = {
        passwordStrength: 'none',
        twoFactorEnabled: false,
        activeSessions: 5,
        recentLoginAttempts: 0
    } as SecurityStatus;

    describe('Security Score Calculation', () => {
        it('should calculate base score correctly (0/100) when all security features are disabled', () => {
            const { result } = renderHook(() =>
                useSecurityScore({ user: baseUser, securityStatus: baseStatus })
            );

            expect(result.current.score).toBe(0);
        });

        it('should return max score (100) when all features are active and safe', () => {
            const secureUser: UserWithRelations = {
                ...baseUser,
                emailVerified: new Date(), // +25
                password: '$hashedpassword',
                phoneVerified: true, // +10
                activeSessions: 2 // +10
            } as UserWithRelations;
            const secureStatus: SecurityStatus = {
                ...baseStatus,
                passwordStrength: 'strong', // +30
                twoFactorEnabled: true, // +25
                activeSessions: 2
            };

            const { result } = renderHook(() =>
                useSecurityScore({ user: secureUser, securityStatus: secureStatus })
            );

            expect(result.current.score).toBe(100);
        });

        it('should calculate score for medium password strength', () => {
            const userWithMediumPwd = {
                ...baseUser,
                password: 'long_password'
            } as UserWithRelations;
            const mediumStatus: SecurityStatus = { ...baseStatus, passwordStrength: 'medium' };

            const { result } = renderHook(() =>
                useSecurityScore({ user: userWithMediumPwd, securityStatus: mediumStatus })
            );

            expect(result.current.score).toBe(20);
        });
    });

    describe('Security Recommendations', () => {
        it('should generate all recommendation types when necessary features are missing', () => {
            const { result } = renderHook(() =>
                useSecurityScore({ user: baseUser, securityStatus: baseStatus })
            );

            const recommendations = result.current.recommendations;

            expect(recommendations).toHaveLength(4);

            expect(recommendations[0].title).toBe('T_recommendations.verifyEmail.title');
            expect(recommendations[0].type).toBe('warning');
            expect(recommendations[0].href).toBe('/email/verify');
        });

        it('should generate "Weak Password" error instead of "Set Password" warning', () => {
            const weakUser: UserWithRelations = {
                ...baseUser,
                emailVerified: new Date(),
                password: 'short'
            } as UserWithRelations;
            const weakStatus: SecurityStatus = {
                ...baseStatus,
                passwordStrength: 'weak'
            };

            const { result } = renderHook(() =>
                useSecurityScore({ user: weakUser, securityStatus: weakStatus })
            );

            const recommendations = result.current.recommendations;

            expect(recommendations).toHaveLength(3);

            const weakPwdRec = recommendations.find((r) => r.type === 'error');
            expect(weakPwdRec?.title).toBe('T_recommendations.weakPassword.title');
            expect(weakPwdRec?.href).toBe('/security/password');
        });

        it('should return an empty list when all security features are enabled', () => {
            const secureUser: UserWithRelations = {
                ...baseUser,
                emailVerified: new Date(),
                password: '$hashedpassword',
                phoneVerified: true
            } as UserWithRelations;
            const secureStatus: SecurityStatus = {
                ...baseStatus,
                passwordStrength: 'strong',
                twoFactorEnabled: true
            };

            const { result } = renderHook(() =>
                useSecurityScore({ user: secureUser, securityStatus: secureStatus })
            );

            expect(result.current.recommendations).toHaveLength(0);
        });
    });
});
