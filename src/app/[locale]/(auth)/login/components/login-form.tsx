'use client';

import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    PasswordInput,
    Spinner
} from '@/comp/ui';
import { Link } from '@/lib/i18n/navigation';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import { useTranslations } from 'next-intl';
import {
    DEFAULT_LOGIN_FORM_VALUES,
    LoginActionState,
    loginFormSchema,
    TLoginFormData
} from '@/lib/validations/auth/login-schema';
import { loginAction } from '@/lib/actions/auth/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useActionState } from 'react';
import { SimpleTFunction } from '@/types/i18n';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>
            {pending ? <Spinner /> : null}
            Submit
        </Button>
    );
}

export function LoginForm() {
    const t = useTranslations();

    const initialFormState: LoginActionState = {};
    const [state, formAction] = useActionState(loginAction, initialFormState);
    const schema = loginFormSchema(t as SimpleTFunction);

    const form = useForm<TLoginFormData>({
        resolver: zodResolver(schema),
        defaultValues: DEFAULT_LOGIN_FORM_VALUES
    });

    useEffect(() => {
        if (state?.errors) {
            Object.keys(state.errors).forEach((key) => {
                const errorKey = key as keyof TLoginFormData;
                if (state.errors?.[errorKey]) {
                    form.setError(errorKey, {
                        type: 'server',
                        message: state.errors[errorKey]?.[0] || 'Sunucu Hatası'
                    });
                }
            });
        }
    }, [state, form]);

    return (
        <Form {...form}>
            <form action={formAction} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder={'m@example.com'} type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center">
                                <FormLabel>Password</FormLabel>
                                <Link
                                    href={AUTH_ROUTES.PASSWORD_RESET}
                                    className="ml-auto inline-block text-xs underline-offset-2 hover:text-blue-600 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <FormControl>
                                <PasswordInput placeholder={'*****'} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {state?.errors && !state.errors.email && !state.errors.password && (
                    <div className="text-sm font-medium text-red-500">Genel hata</div>
                )}
                <SubmitButton />
            </form>
        </Form>
    );
}
