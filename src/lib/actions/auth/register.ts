'use server';

import { registerFormSchema, RegisterActionState } from '@/lib/validations';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { AuthError } from 'next-auth';
import { getLocale, getTranslations } from 'next-intl/server';
import { SimpleTFunction } from '@/types/i18n';
import { User } from '@/generated/prisma';
import { nanoid } from 'nanoid';
import { getEmailService } from '@/lib/services/email';
import { getBaseUrl } from '@/lib';
import { render } from '@react-email/render';
import { VerificationEmail } from '@/comp/emails/verification-email';
import { AUTH_ROUTES } from '@/lib/auth/constants';

export async function registerAction(
    prevState: RegisterActionState,
    formData: FormData
): Promise<RegisterActionState> {
    const data = Object.fromEntries(formData.entries());
    const locale = await getLocale();
    const t = await getTranslations();

    const validatedFields = registerFormSchema(t as SimpleTFunction).safeParse(data);

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;

        return {
            errors: fieldErrors,
            form: data as RegisterActionState['form']
        } as RegisterActionState;
    }

    const { email, password, firstname, lastname } = validatedFields.data;

    try {
        const hashedPassword = await hash(password, 10);

        const user: User = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name: `${firstname} ${lastname}`,
                twoFactorEnabled: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        const verificationTokenValue = nanoid(32);
        const expires = new Date(Date.now() + 3600000 * 24);

        await prisma.verificationToken.deleteMany({
            where: { identifier: user.email }
        });

        await prisma.verificationToken.create({
            data: {
                identifier: user.email,
                token: verificationTokenValue,
                expires: expires
            }
        });

        const emailService = getEmailService();
        const verificationUrl = `${getBaseUrl()}/${AUTH_ROUTES.NEW_USER_VERIFY_EMAIL}?token=${verificationTokenValue}`;

        const emailHtml = await render(
            VerificationEmail({
                name: user.name!,
                verificationUrl: verificationUrl,
                locale: locale
            })
        );

        await emailService.sendEmail({
            to: user.email,
            subject: t('email.verification.subject'),
            html: emailHtml,
            text: t('email.verification.textVersion', { verificationUrl: verificationUrl })
        });

        // await signIn('credentials', {
        //     email,
        //     password,
        //     redirect: false
        // });

        return { success: true };
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
