import { z } from 'zod';
import { SimpleTFunction } from '@/types/i18n';

export const registerFormSchema = (t: SimpleTFunction) => {
    return z
        .object({
            firstname: z.string().min(1, { message: t('validations.required.firstname') }),
            lastname: z.string().min(1, { message: t('validations.required.lastname') }),
            email: z
                .email({ message: t('validations.invalid.email') })
                .min(1, { message: t('validations.required.email') }),
            password: z.string().min(8, { message: t('validations.min.password', { min: 8 }) }),
            confirmPassword: z
                .string()
                .min(8, { message: t('validations.min.confirmPassword', { min: 8 }) }),
            terms: z
                .any()
                .transform((val) => val === 'on' || val === true)
                .refine((val) => val === true, {
                    message: t('validations.required.terms')
                })
        })
        .superRefine(({ password, confirmPassword }, ctx) => {
            if (password !== confirmPassword) {
                ctx.addIssue({
                    code: 'custom',
                    message: t('validations.mismatch.passwords'),
                    path: ['confirmPassword']
                });
            }
        });
};

export type TRegisterFormData = z.infer<ReturnType<typeof registerFormSchema>>;

export const DEFAULT_REGISTER_FORM_VALUES: TRegisterFormData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
};

export type RegisterActionState = {
    success?: boolean;
    email?: string;
    form?: {
        firstname?: string;
        lastname?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        terms?: boolean;
    };
    errors?: {
        firstname?: string[];
        lastname?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        terms?: string[];
    };
};
