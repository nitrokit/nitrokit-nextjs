'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useEffect } from 'react';
import { MoveRight as IconMoveRight } from 'lucide-react';
import { useRouter } from '@/lib/i18n/navigation';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from '@/components/ui';
import { SubmitButton } from '@/components/shared';
import {
    resetPasswordSchema,
    TResetPasswordData,
    DEFAULT_RESET_PASSWORD_VALUES,
    ResetPasswordActionState,
    resetPasswordAction
} from '@/lib';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import { SimpleTFunction } from '@/types/i18n';

export function ResetPasswordForm() {
    const t = useTranslations();
    const router = useRouter();

    const initialFormState: ResetPasswordActionState = {};
    const [state, formAction] = useActionState(resetPasswordAction, initialFormState);

    const schema = resetPasswordSchema(t as SimpleTFunction);

    const form = useForm<TResetPasswordData>({
        resolver: zodResolver(schema),
        defaultValues: DEFAULT_RESET_PASSWORD_VALUES
    });

    useEffect(() => {
        if (state?.errors) {
            Object.keys(state.errors).forEach((key) => {
                const errorKey = key as keyof TResetPasswordData;
                if (state.errors?.[errorKey]) {
                    form.setError(errorKey, {
                        type: 'server',
                        message: state.errors[errorKey]?.[0] || t('common.errors.general')
                    });
                }
            });
        }

        if (state?.success) {
            router.push(AUTH_ROUTES.PASSWORD_RESET_SENT);
        }
    }, [state, form, t, router]);

    return (
        <Form {...form}>
            <form action={formAction} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">{t('common.buttons.email')}</FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t('common.placeholders.email')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SubmitButton textKey="common.buttons.continue" endIcon={<IconMoveRight />} />
            </form>
        </Form>
    );
}
