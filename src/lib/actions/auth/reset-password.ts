'use server';

import { SimpleTFunction } from '@/types/i18n';
import {
    ResetPasswordActionState,
    resetPasswordSchema
} from '@/lib/validations/auth/reset-password-schema';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';

export async function resetPasswordAction(
    prevState: ResetPasswordActionState,
    formData: FormData
): Promise<ResetPasswordActionState & { success?: boolean }> {
    const data = Object.fromEntries(formData.entries());

    const t = await getTranslations();
    const validatedFields = resetPasswordSchema(t as SimpleTFunction).safeParse(data);

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return { errors: fieldErrors, form: data } as ResetPasswordActionState;
    }

    const { email } = validatedFields.data;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return { success: true };
        }

        //ToDo: Reset Password Email

        return { success: true };
    } catch {
        return {
            errors: { email: [t('auth.reset-password.unexpectedError')] }
        };
    }
}
