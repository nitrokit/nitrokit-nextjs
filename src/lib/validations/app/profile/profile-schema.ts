import { SimpleTFunction } from '@/types/i18n';
import z from 'zod';

export const updateProfileFormSchema = (t: SimpleTFunction) => {
    return z.object({
        firstName: z.string().min(1, { message: t('validations.required.firstname') }),
        lastName: z.string().min(1, { message: t('validations.required.lastname') }),
        phone: z.string().optional()
    });
};

export type TUpdateProfileFormData = z.infer<ReturnType<typeof updateProfileFormSchema>>;

export const DEFAULT_UPDATE_PROFILE_FORM_VALUES: TUpdateProfileFormData = {
    firstName: '',
    lastName: '',
    phone: ''
};
