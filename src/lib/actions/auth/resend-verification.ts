'use server';

import { getTranslations, getLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { getEmailService } from '@nitrokit/core/services/email';
import { getBaseUrl } from '@nitrokit/core/urls';
import { render } from '@react-email/render';
import { VerificationEmail } from '@/components/emails/verification-email';
import { AUTH_ROUTES } from '@/lib/auth/constants';

export async function resendVerificationEmailAction(
    email: string
): Promise<{ success: boolean; message?: string }> {
    const t = await getTranslations();
    const locale = await getLocale();

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.emailVerified) {
            return { success: true };
        }

        const verificationTokenValue = nanoid(32);
        const expires = new Date(Date.now() + 3600000 * 24);

        await prisma.verificationToken.deleteMany({ where: { identifier: user.email } });

        await prisma.verificationToken.create({
            data: { identifier: user.email, token: verificationTokenValue, expires: expires }
        });

        const emailService = getEmailService();
        const verificationUrl = `${getBaseUrl()}/${AUTH_ROUTES.NEW_USER_VERIFY_EMAIL}?token=${verificationTokenValue}`;

        const emailHtml = await render(
            VerificationEmail({
                name: user.name!,
                verificationUrl: verificationUrl,
                locale: locale
            })
        );

        await emailService.sendEmail({
            to: user.email,
            subject: t('email.verification.subject'),
            html: emailHtml,
            text: t('email.verification.textVersion', { verificationUrl })
        });

        return { success: true };
    } catch (error) {
        console.error('RESEND EMAIL HATA:', error);
        return { success: false, message: t('common.errors.general') };
    }
}
