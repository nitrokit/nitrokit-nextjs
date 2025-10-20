'use server';

import { z } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getLocale, getTranslations } from 'next-intl/server';
import { nanoid } from 'nanoid';
import { prisma } from '@/lib/prisma';
import { SimpleTFunction } from '@/types/i18n';
import { NewsletterFormSchema, NewsletterSubscriptionResponse } from '@/lib/validations';
import { getEmailService } from '@/lib/services/email';
import { getBaseUrl } from '@/lib/config';
import { render } from '@react-email/render';
import { NewsletterConfirmationEmail } from '@/components/emails';

type NewsletterActionState = NewsletterSubscriptionResponse & {
    errors?: { [key in keyof z.infer<typeof NewsletterFormSchema>]: string[] };
    message?: string;
};

export async function newsletterSubscriptionAction(
    prevState: NewsletterActionState,
    formData: FormData
): Promise<NewsletterActionState> {
    const data = Object.fromEntries(formData.entries());
    const locale = await getLocale();
    const t = await getTranslations();

    const schema = NewsletterFormSchema(t as SimpleTFunction);

    const validatedFields = schema.safeParse({ ...data, locale: locale });

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return { success: false, errors: fieldErrors };
    }

    const { email } = validatedFields.data;

    try {
        const confirmationToken = nanoid(32);

        const subscriber = await prisma.newsletterSubscriber.upsert({
            where: { email: email },
            update: {
                token: confirmationToken,
                verified: false,
                verifiedAt: null
            },
            create: {
                email: email,
                locale: locale,
                token: confirmationToken,
                verified: false
            }
        });

        const emailService = getEmailService();
        const confirmUrl = `${getBaseUrl()}?newsletter_confirm=${confirmationToken}`;
        const emailHtml = await render(NewsletterConfirmationEmail({ confirmUrl, locale: locale }));

        await emailService.sendEmail({
            to: subscriber.email,
            subject: t('common.newsletter.subscriptionConfirmation'),
            html: emailHtml,
            text: t('common.newsletter.confirmationLink', { confirmUrl })
        });

        return { success: true, message: t('common.newsletter.success') };
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            return { success: false, message: t('common.newsletter.alreadySubscribed') };
        }
        return { success: false, error: t('common.errors.general') };
    }
}
