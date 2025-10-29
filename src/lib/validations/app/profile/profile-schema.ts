import { SimpleTFunction } from '@/types/i18n';
import z from 'zod';

export const updateProfileFormSchema = (t: SimpleTFunction) =>
    z.object({
        firstname: z.string().min(1, { message: t('validations.required.firstname') }),
        lastname: z.string().min(1, { message: t('validations.required.lastname') }),
        email: z
            .email({ message: t('validations.invalid.email') })
            .min(1, { message: t('validations.required.email') })
    });

export type TUpdateProfileFormData = z.infer<ReturnType<typeof updateProfileFormSchema>>;

export const DEFAULT_UPDATE_PROFILE_FORM_VALUES: TUpdateProfileFormData = {
    firstname: '',
    lastname: '',
    email: ''
};
