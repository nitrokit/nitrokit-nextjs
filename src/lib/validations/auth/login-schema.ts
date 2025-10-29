import { SimpleTFunction } from '@/types/i18n';
import { z } from 'zod';

export const loginFormSchema = (t: SimpleTFunction) => {
    return z.object({
        email: z
            .email({ message: t('validations.invalid.email') })
            .min(1, { message: t('validations.required.email') }),
        password: z.string().min(8, { message: t('validations.required.password') }),
        twoFactorCode: z.string().optional()
    });
};

export type TLoginFormData = z.infer<ReturnType<typeof loginFormSchema>>;

export const DEFAULT_LOGIN_FORM_VALUES: TLoginFormData = {
    email: '',
    password: '',
    twoFactorCode: undefined
};
