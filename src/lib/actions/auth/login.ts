'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/lib/auth/auth';
import { loginFormSchema, LoginActionState } from '@/lib/validations/auth/login-schema';

export async function loginAction(
    prevState: LoginActionState,
    formData: FormData
): Promise<LoginActionState> {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = loginFormSchema(() => '').safeParse(data);

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
        } as LoginActionState;
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false
        });
        return {};
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        errors: {
                            email: ['Geçersiz kimlik bilgileri.'],
                            password: ['Geçersiz kimlik bilgileri.']
                        }
                    };
                default:
                    return { errors: { email: ['Bilinmeyen bir hata oluştu.'] } };
            }
        }
        throw error;
    }
}
