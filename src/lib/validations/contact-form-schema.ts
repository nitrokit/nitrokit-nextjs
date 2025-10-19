import { SimpleTFunction } from '@/types/i18n';
import { z } from 'zod';

export const ContactFormSchema = (t: SimpleTFunction) => {
    return z.object({
        name: z.string().min(3, { message: t('validations.required.name') }),
        email: z
            .string()
            .min(1, { message: t('validations.required.email') })
            .email(t('validations.invalid.email')),
        message: z.string().min(1, { message: t('validations.required.message') })
    });
};

export const ContactActionResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    error: z.string().optional()
});

export type ContactActionResponse = z.infer<typeof ContactActionResponseSchema>;
export type ContactFormData = z.infer<ReturnType<typeof ContactFormSchema>>;
