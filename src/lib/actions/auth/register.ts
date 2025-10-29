'use server';

import { registerFormSchema, RegisterActionState } from '@/lib/validations';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { AuthError } from 'next-auth';
import { getLocale, getTranslations } from 'next-intl/server';
import { SimpleTFunction } from '@/types/i18n';
import { User } from '@/generated/prisma';
import { getEmailService } from '@/lib/services/email';
import { getBaseUrl } from '@/lib';
import { render } from '@react-email/render';
import { VerificationEmail } from '@/components/emails/verification-email';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import { generateVerificationToken } from '@/lib/auth/token-service';

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

    const { firstname, lastname, email, password } = validatedFields.data;

    let user: User | null = null;
    try {
        const hashedPassword = await hash(password, 10);

        user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name: `${firstname} ${lastname}`,
                firstName: firstname,
                lastName: lastname,
                twoFactorEnabled: false,
                locale: locale,
                receiveUpdates: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        const verificationToken = await generateVerificationToken(user.email);

        try {
            const emailService = getEmailService();
            const verificationUrl = `${getBaseUrl()}${AUTH_ROUTES.NEW_USER_VERIFY_EMAIL}?token=${verificationToken.token}`;

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
        } catch {
            await Promise.all([
                prisma.user.delete({
                    where: { id: user.id }
                }),
                prisma.verificationToken.delete({
                    where: { identifier: user.email }
                })
            ]);
        }

        // await signIn('credentials', {
        //     email,
        //     password,
        //     redirect: false
        // });

        return { success: true, email: email.toLowerCase() };
    } catch (error: unknown) {
        function isPrismaClientKnownRequestErrorWithCode(err: unknown, code: string): boolean {
            return err instanceof Error && 'code' in err && (err as any).code === code;
        }

        if (user && !isPrismaClientKnownRequestErrorWithCode(error, 'P2002')) {
            try {
                await prisma.user.delete({ where: { id: user.id } });
            } catch (deleteError) {
                console.error('Kullanıcı geri alma hatası:', deleteError);
            }

            return { errors: { email: [t('auth.signup.unexpectedRegistrationError')] } };
        }

        if (isPrismaClientKnownRequestErrorWithCode(error, 'P2002')) {
            return { errors: { email: [t('auth.signup.emailAlreadyRegistered')] } };
        }

        if (error instanceof AuthError && error.type === 'CredentialsSignin') {
            return { errors: { email: [t('auth.signup.emailAlreadyInUse')] } };
        }

        return { errors: { email: [t('auth.signup.unexpectedRegistrationError')] } };
    }

    return {};
}
