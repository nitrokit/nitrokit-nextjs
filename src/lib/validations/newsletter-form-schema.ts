import { SimpleTFunction } from '@/types/i18n';
import { z } from 'zod';

export const NewsletterFormSchema = (t: SimpleTFunction) => {
    return z.object({
        email: z
            .email(t('validations.invalid.email'))
            .min(1, { message: t('validations.required.email') })
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
