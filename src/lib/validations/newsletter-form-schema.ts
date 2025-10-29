import { SimpleTFunction } from '@/types/i18n';
import { z } from 'zod';

export const newsletterFormSchema = (t: SimpleTFunction) => {
    return z.object({
        email: z
            .email(t('validations.invalid.email'))
            .min(1, { message: t('validations.required.email') })
    });
};

export const newsletterConfirmResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    error: z.string().optional()
});

export const newsletterSubscriptionResponseSchema = z.object({
    success: z.boolean(),
    error: z.string().optional()
});

export type TnewsletterFormSchema = z.infer<ReturnType<typeof newsletterFormSchema>>;
export type NewsletterConfirmResponse = z.infer<typeof newsletterConfirmResponseSchema>;
export type NewsletterSubscriptionResponse = z.infer<typeof newsletterSubscriptionResponseSchema>;
