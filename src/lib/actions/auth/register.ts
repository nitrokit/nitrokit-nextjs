'use server';

import { registerFormSchema, RegisterActionState } from '@/lib/validations/auth/register-schema';
import { prisma } from '@/lib/prisma';
import { signIn } from '@/lib/auth/auth';
import { hash } from 'bcryptjs';
import { AuthError } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { SimpleTFunction } from '@/types/i18n';

export async function registerAction(
    prevState: RegisterActionState,
    formData: FormData
): Promise<RegisterActionState> {
    const data = Object.fromEntries(formData.entries());
    const t = await getTranslations();
    const validatedFields = registerFormSchema(t as SimpleTFunction).safeParse({
        ...data,
        terms: formData.get('terms') === 'on'
    });

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;

        return {
            errors: {
                ...fieldErrors,
                terms:
                    fieldErrors.terms ||
                    (data.terms !== 'on' ? [t('auth.signup.mustAcceptTerms')] : undefined)
            },
            form: data as RegisterActionState['form']
        } as RegisterActionState;
    }

    const { email, password, firstname, lastname } = validatedFields.data;

    try {
        const hashedPassword = await hash(password, 10);

        await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name: `${firstname} ${lastname}`
            }
        });

        await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        //ToDo: Welcome Email

        return {};
    } catch (error) {
        if (error instanceof AuthError && error.type === 'CredentialsSignin') {
            return { errors: { email: [t('auth.signup.emailAlreadyInUse')] } };
        }
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return { errors: { email: [t('auth.signup.emailAlreadyRegistered')] } };
        }

        return { errors: { email: [t('auth.signup.unexpectedRegistrationError')] } };
    }
}
