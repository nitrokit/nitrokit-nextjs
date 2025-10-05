import { z } from 'zod';

export const NewsletterFormSchema = (t: (key: string) => string) => {
    return z.object({
        email: z
            .string()
            .min(1, { message: t('validation.required.email') })
            .email(t('validation.invalid.email'))
    });
};

export type TNewsletterFormSchema = z.infer<ReturnType<typeof NewsletterFormSchema>>;
