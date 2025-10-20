'use client';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    PasswordInput
} from '@/components/ui';
import { Link, useRouter } from '@/lib/i18n/navigation';
import { APP_ROUTES, AUTH_ROUTES } from '@/lib/auth/constants';
import { useTranslations } from 'next-intl';
import {
    DEFAULT_LOGIN_FORM_VALUES,
    LoginActionState,
    loginFormSchema,
    TLoginFormData,
    loginAction
} from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useActionState } from 'react';
import { SimpleTFunction } from '@/types/i18n';
import { SubmitButton } from '@/components/shared';
import React from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { MoveRight as IconMoveRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface LoginFormProps {
    onFlowChange?: (is2FA: boolean) => void;
}

function renderOTPSlots(count: number) {
    const slots = [];
    for (let i = 0; i < count; i++) {
        slots.push(<InputOTPSlot key={i} index={i} />);
    }
    return slots;
}

export function LoginForm({ onFlowChange }: LoginFormProps) {
    const t = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { update: updateSession } = useSession();

    const initialFormState: LoginActionState = {};
    const [state, formAction] = useActionState(loginAction, initialFormState);
    const schema = loginFormSchema(t as SimpleTFunction);
    const isTwoFactorRequired = state?.twoFactorRequired;
    const callbackUrl = searchParams.get('callbackUrl') || APP_ROUTES.HOME;

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
                        message: state.errors[errorKey]?.[0] || t('common.errors.general')
                    });
                }
            });
        }
        if (onFlowChange) {
            onFlowChange(!!isTwoFactorRequired);
        }
        if (state?.success) {
            void updateSession();
            form.reset(DEFAULT_LOGIN_FORM_VALUES);
            router.push(callbackUrl);
        }
    }, [state, form, t, onFlowChange, isTwoFactorRequired, router, callbackUrl, updateSession]);

    return (
        <Form {...form}>
            <form action={formAction} className="space-y-6">
                {!isTwoFactorRequired && (
                    <>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('common.buttons.email')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t('common.placeholders.email')}
                                            type="email"
                                            {...field}
                                        />
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
                                        <FormLabel>{t('common.buttons.password')}</FormLabel>
                                        <Link
                                            href={AUTH_ROUTES.PASSWORD_RESET}
                                            className="ml-auto inline-block text-xs underline-offset-2 hover:text-blue-600 hover:underline"
                                        >
                                            {t('auth.signin.forgotPassword')}
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder={t('common.placeholders.password')}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}
                {isTwoFactorRequired && (
                    <FormField
                        control={form.control}
                        name="twoFactorCode"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <FormLabel className="py-4 text-center">
                                    {t('auth.2fa.enterCode')}
                                </FormLabel>
                                <FormControl>
                                    <InputOTP
                                        maxLength={6}
                                        id="otp"
                                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                        required
                                        {...field}
                                    >
                                        <InputOTPGroup>{renderOTPSlots(6)}</InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription className="py-4 text-center">
                                    {t('auth.2fa.checkApp')}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {state?.errors && !state.errors.email && !state.errors.password && (
                    <div className="text-sm font-medium text-red-500">
                        {t('common.errors.general')}
                    </div>
                )}
                <SubmitButton
                    textKey={
                        isTwoFactorRequired ? 'auth.2fa.verifyAndSignIn' : 'common.buttons.submit'
                    }
                    endIcon={<IconMoveRight />}
                />
            </form>
        </Form>
    );
}
