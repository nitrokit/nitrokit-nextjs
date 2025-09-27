import { z } from 'zod';

export const contactFormSchema = (t: (key: string) => string) => {
    return z.object({
        name: z.string().min(3, { message: t('validations.required.name') }),
        email: z
            .string()
            .min(1, { message: t('validations.required.email') })
            .email(t('validations.invalid.email')),
        message: z.string().min(1, { message: t('validations.required.message') }),
        turnstileToken: z.string().min(1, { message: t('validations.required.captcha') }),
    });
};

export type ContactFormData = z.infer<ReturnType<typeof contactFormSchema>>;
