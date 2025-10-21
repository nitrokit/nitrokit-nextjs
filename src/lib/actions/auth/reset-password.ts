'use server';

import { SimpleTFunction } from '@/types/i18n';
import { ResetPasswordActionState, resetPasswordSchema } from '@/lib';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { nanoid } from 'nanoid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AUTH_ROUTES } from '@/lib/auth/constants';

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
            return { success: true } as ResetPasswordActionState;
        }

        const tokenValue: string = nanoid(32);
        const expires = new Date(Date.now() + 3600000);

        await prisma.passwordResetToken.upsert({
            where: { email: user.email },
            update: {
                token: tokenValue,
                expires: expires
            },
            create: {
                email: email,
                token: tokenValue,
                expires: expires
            }
        });

        const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}${AUTH_ROUTES.PASSWORD_NEW}?token=${tokenValue}`;
        console.log(resetLink);
        // await sendResetPasswordEmail(email, resetLink);
        //ToDo: Reset email

        return { success: true };
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                console.error('Unique constraint failed on fields:', error.meta?.target);
            }
        } else {
            if (error && typeof error === 'object' && 'message' in error) {
                console.error(
                    'Unexpected error with message:',
                    (error as { message: string }).message
                );
            } else {
                console.error('Unexpected error:', String(error));
            }
        }
        return { errors: { email: [t('auth.reset-password.unexpectedError')] } };
    }
}
