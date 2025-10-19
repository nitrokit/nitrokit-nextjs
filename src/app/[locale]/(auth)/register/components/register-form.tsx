'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';

import {
    Checkbox,
    Input,
    PasswordInput,
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage
} from '@/components/ui';

import {
    registerFormSchema,
    TRegisterFormData,
    DEFAULT_REGISTER_FORM_VALUES,
    RegisterActionState,
    registerAction
} from '@/lib';
import { SimpleTFunction } from '@/types/i18n';
import { Link } from '@/lib/i18n/navigation';
import { SubmitButton } from '@/comp/shared';

export function RegisterForm() {
    const t = useTranslations();

    const initialFormState: RegisterActionState = {};
    const [state, formAction] = useActionState(registerAction, initialFormState);

    const schema = registerFormSchema(t as SimpleTFunction);

    const form = useForm<TRegisterFormData>({
        resolver: zodResolver(schema),
        defaultValues: DEFAULT_REGISTER_FORM_VALUES
    });

    React.useEffect(() => {
        if (state?.errors) {
            Object.keys(state.errors).forEach((key) => {
                const errorKey = key as keyof TRegisterFormData;
                if (state.errors?.[errorKey]) {
                    form.setError(errorKey, {
                        type: 'server',
                        message: state.errors[errorKey]?.[0] || t('app.errors.general')
                    });
                }
            });
        }
    }, [state, form, t]);

    return (
        <>
            <Form {...form}>
                <form action={formAction} className="space-y-6">
                    {' '}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('app.common.firstname')}</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('app.common.lastname')}</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="m@example.com" {...field} />
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
                                <FormLabel>{t('app.common.password')}</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('app.common.confirmPassword')}</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                <input
                                    type="hidden"
                                    name={field.name}
                                    value={field.value ? 'on' : 'false'}
                                />
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="font-normal">
                                        {t.rich('auth.signup.acceptTerms', {
                                            button: (chunks) => (
                                                <Link
                                                    href="/terms"
                                                    target="_blank"
                                                    className="h-auto p-0 text-sm underline underline-offset-2 hover:text-blue-600"
                                                >
                                                    {chunks}
                                                </Link>
                                            )
                                        })}
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <SubmitButton textKey="auth.signup.createAccount" />
                </form>
            </Form>
        </>
    );
}
