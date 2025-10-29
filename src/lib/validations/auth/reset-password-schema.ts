import { z } from 'zod';
import { SimpleTFunction } from '@/types/i18n';

export const resetPasswordSchema = (t: SimpleTFunction) => {
    return z.object({
        email: z
            .email({ message: t('validations.invalid.email') })
            .min(1, { message: t('validations.required.email') })
    });
};

export type TResetPasswordData = z.infer<ReturnType<typeof resetPasswordSchema>>;

export const DEFAULT_RESET_PASSWORD_VALUES: TResetPasswordData = {
    email: ''
};
