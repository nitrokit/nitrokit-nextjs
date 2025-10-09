import { z } from 'zod';

export const NewsletterFormSchema = (t: (key: string) => string) => {
    return z.object({
        email: z
            .string()
            .min(1, { message: t('validation.required.email') })
            .email(t('validation.invalid.email'))
    });
};

export const NewsletterConfirmResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    error: z.string().optional()
});

export const NewsletterSubscriptionResponseSchema = z.object({
    success: z.boolean(),
    error: z.string().optional()
});

export type TNewsletterFormSchema = z.infer<ReturnType<typeof NewsletterFormSchema>>;
export type NewsletterConfirmResponse = z.infer<typeof NewsletterConfirmResponseSchema>;
export type NewsletterSubscriptionResponse = z.infer<typeof NewsletterSubscriptionResponseSchema>;
