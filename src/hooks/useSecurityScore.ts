'use client';

import { useTranslations } from 'next-intl';
import { Recommendation, SecurityStatus, UserWithRelations } from '@/lib/user/types';
import { SimpleTFunction } from '@/types/i18n';
import { useMemo } from 'react';
import { APP_ROUTES } from '@/lib/auth/constants';

interface SecurityScoreProps {
    user: UserWithRelations;
    securityStatus: SecurityStatus;
}

export const useSecurityScore = ({ user, securityStatus }: SecurityScoreProps) => {
    const t = useTranslations('security');

    const translate = t as unknown as SimpleTFunction;
    const scoreAndRecommendations = useMemo(() => {
        const calculateSecurityScore = (): number => {
            let score = 0;
            const maxScore = 100;
            if (user.emailVerified) score += 25;
            if (!user.password) {
                score += 0;
            } else if (securityStatus.passwordStrength === 'strong') {
                score += 30;
            } else if (securityStatus.passwordStrength === 'medium') {
                score += 20;
            } else if (securityStatus.passwordStrength === 'weak') {
                score += 10;
            }

            if (securityStatus.twoFactorEnabled) score += 25;
            if (user.phoneVerified) score += 10;
            if (securityStatus.activeSessions <= 3) score += 10;

            return Math.min(score, maxScore);
        };

        const getSecurityRecommendations = (): Recommendation[] => {
            const recommendations: Recommendation[] = [];

            if (!user.emailVerified) {
                recommendations.push({
                    type: 'warning',
                    title: translate('recommendations.verifyEmail.title'),
                    description: translate('recommendations.verifyEmail.description'),
                    action: translate('recommendations.verifyEmail.action'),
                    href: APP_ROUTES.EMAIL_VERIFY
                });
            }

            if (!user.password) {
                recommendations.push({
                    type: 'warning',
                    title: translate('recommendations.setPassword.title'),
                    description: translate('recommendations.setPassword.description'),
                    action: translate('recommendations.setPassword.action'),
                    href: APP_ROUTES.SECURITY_PASSWORD
                });
            } else if (securityStatus.passwordStrength === 'weak') {
                recommendations.push({
                    type: 'error',
                    title: translate('recommendations.weakPassword.title'),
                    description: translate('recommendations.weakPassword.description'),
                    action: translate('recommendations.weakPassword.action'),
                    href: APP_ROUTES.SECURITY_PASSWORD
                });
            }

            if (!securityStatus.twoFactorEnabled) {
                recommendations.push({
                    type: 'warning',
                    title: translate('recommendations.enableTwoFactor.title'),
                    description: translate('recommendations.enableTwoFactor.description'),
                    action: translate('recommendations.enableTwoFactor.action'),
                    href: APP_ROUTES.SECURITY_2FA
                });
            }

            if (!user.phoneVerified) {
                recommendations.push({
                    type: 'info',
                    title: translate('recommendations.addPhone.title'),
                    description: translate('recommendations.addPhone.description'),
                    action: translate('recommendations.addPhone.action'),
                    href: APP_ROUTES.PROFILE
                });
            }

            return recommendations;
        };

        return {
            score: calculateSecurityScore(),
            recommendations: getSecurityRecommendations()
        };
    }, [user, securityStatus, translate]);

    return scoreAndRecommendations;
};
