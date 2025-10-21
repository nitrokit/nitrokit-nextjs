'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/lib/auth/auth';
import { loginFormSchema, LoginActionState } from '@/lib';
import { SimpleTFunction } from '@/types/i18n';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';

interface UpdatedLoginActionState extends LoginActionState {
    twoFactorRequired?: boolean;
    errors?: LoginActionState['errors'] & { twoFactorCode?: string[] };
    form?: LoginActionState['form'] & { twoFactorCode?: string };
}

export async function loginAction(
    prevState: UpdatedLoginActionState,
    formData: FormData
): Promise<UpdatedLoginActionState> {
    const data = Object.fromEntries(formData.entries());
    const t = await getTranslations();
    const validatedFields = loginFormSchema(t as SimpleTFunction).safeParse(data);

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            errors: {
                email: fieldErrors.email,
                password: fieldErrors.password
            },
            form: {
                email: data.email as string,
                password: data.password as string
            }
        } as UpdatedLoginActionState;
    }

    const { email, password, twoFactorCode } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: { id: true, twoFactorEnabled: true, twoFactorSecret: true }
        });

        if (existingUser?.twoFactorEnabled && !twoFactorCode) {
            return {
                twoFactorRequired: true,
                form: { email: email, password: password }
            } as UpdatedLoginActionState;
        }

        if (existingUser?.twoFactorEnabled && twoFactorCode) {
            const isCodeValid = true;

            if (!isCodeValid) {
                return {
                    errors: { twoFactorCode: [t('auth.2fa.invalidVerificationCode')] },
                    twoFactorRequired: true
                } as UpdatedLoginActionState;
            }
        }

        await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        errors: {
                            email: [t('auth.signin.invalidCredentials')],
                            password: [t('auth.signin.invalidCredentials')]
                        }
                    };
                default:
                    return { errors: { email: [t('common.errors.general')] } };
            }
        }
        if (error && (error as Error).message?.includes('NEXT_REDIRECT')) {
            throw error;
        }
        throw error;
    }
}
