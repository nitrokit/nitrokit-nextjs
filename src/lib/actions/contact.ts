'use server';

import { z } from 'zod';
import { getLocale, getTranslations } from 'next-intl/server';
import { SimpleTFunction } from '@/types/i18n';

import { getEmailService } from '@/lib/services/email';

import { render } from '@react-email/render';
import { ContactEmail } from '@/components/emails';
import { ContactActionResponse, contactFormSchema } from '@/lib/validations';
import { PUBLIC_EMAIL } from '@/constants';

type ContactActionState = ContactActionResponse & {
    errors?: { [key in keyof z.infer<typeof contactFormSchema>]: string[] };
    message?: string;
};

export async function contactAction(
    prevState: ContactActionState,
    formData: FormData
): Promise<ContactActionState> {
    const data = Object.fromEntries(formData.entries());
    const locale = await getLocale();
    const t = await getTranslations();

    const schema = contactFormSchema(t as SimpleTFunction);
    const validatedFields = schema.safeParse(data);

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return { success: false, errors: fieldErrors };
    }

    const { name, email, message } = validatedFields.data;

    try {
        const emailService = getEmailService();

        const emailHtml = await render(
            ContactEmail({
                name,
                email,
                message,
                locale: locale
            })
        );

        await emailService.sendEmail({
            to: PUBLIC_EMAIL,
            subject: `💬 New Contact: ${name}`,
            html: emailHtml,
            metadata: {
                type: 'contact_form',
                fromName: name,
                fromEmail: email,
                userId: 'anonymous'
            }
        });

        return { success: true, message: t('contact.message_sent') };
    } catch {
        return { success: false, error: t('common.errors.general') };
    }
}
