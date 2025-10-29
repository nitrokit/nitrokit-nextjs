'use server';

import { prisma } from '@/lib/prisma';
import { revokeVerificationToken, verifyToken } from '@/lib/auth/token-service';
import { getLocale, getTranslations } from 'next-intl/server';
import { APP_ROUTES } from '@/lib/auth/constants';
import { getEmailService } from '@/lib/services/email';
import { WelcomeEmail } from '@/components/emails';
import { render } from '@react-email/render';
import { getBaseUrl } from '@/lib/config';

export interface VerificationActionState {
    success: boolean;
    redirectUrl?: string;
    error?: string;
}

export async function verifyEmailAction(token: string): Promise<VerificationActionState> {
    const locale = await getLocale();
    const t = await getTranslations();

    debugger;
    const verificationResult = await verifyToken(token);

    if (!verificationResult.valid || verificationResult.type !== 'EMAIL_VERIFICATION') {
        const error = verificationResult.error || t('auth.verification.messages.generalError');

        return {
            success: false,
            error: error
        };
    }

    const { email } = verificationResult;

    try {
        const user = await prisma.user.update({
            where: { email: email },
            data: {
                emailVerified: new Date()
            }
        });

        await revokeVerificationToken(token);

        const emailService = getEmailService();

        const emailHtml = await render(
            WelcomeEmail({
                name: user.name!,
                appUrl: getBaseUrl(),
                locale: locale
            })
        );

        await emailService.sendEmail({
            to: user.email,
            subject: t('email.welcome.subject'),
            html: emailHtml,
            text: t('email.welcome.textVersion')
        });
        return {
            success: true,
            redirectUrl: APP_ROUTES.HOME
        };
    } catch {
        const errorMsg = t('auth.verification.errors.userNotFound');
        return {
            success: false,
            error: errorMsg
        };
    }
}
