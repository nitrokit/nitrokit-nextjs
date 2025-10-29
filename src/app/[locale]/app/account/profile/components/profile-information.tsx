'use client';

import {
    AppCard,
    AppCardContent,
    AppCardDescription,
    AppCardHeader,
    AppCardTitle
} from '@/components/app';
import { SubmitButton } from '@/components/shared';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Label
} from '@/components/ui';
import { useUser } from '@/contexts/user-context';
import {
    DEFAULT_UPDATE_PROFILE_FORM_VALUES,
    TUpdateProfileFormData,
    updateProfileFormSchema
} from '@/lib';
import { UpdateProfileActionState, updateProfileAction } from '@/lib/actions/app';
import { SimpleTFunction } from '@/types/i18n';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserIcon, Phone, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ProfileInformation() {
    const t = useTranslations();
    const { user, isLoading } = useUser();

    return (
        <AppCard className="min-h-96" loading={isLoading}>
            <AppCardHeader>
                <AppCardTitle icon={UserIcon}>{t('profile.title')}</AppCardTitle>
                <AppCardDescription>{t('profile.description')}</AppCardDescription>
            </AppCardHeader>
            <AppCardContent>
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label>{t('common.inputs.email')}</Label>
                        <div className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full cursor-default items-center rounded-md border bg-transparent px-2 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                            {user?.email || ''}
                        </div>
                    </div>
                    <ProfileInformationForm />
                </div>
            </AppCardContent>
        </AppCard>
    );
}

function ProfileInformationForm() {
    const t = useTranslations();

    const [resetKey, setResetKey] = useState(0);
    const { user, updateUser } = useUser();

    const initialFormState: UpdateProfileActionState = {};
    const [state, formAction] = useActionState(updateProfileAction, initialFormState);

    const schema = updateProfileFormSchema(t as SimpleTFunction);
    const form = useForm<TUpdateProfileFormData>({
        resolver: zodResolver(schema),
        defaultValues: DEFAULT_UPDATE_PROFILE_FORM_VALUES
    });
    const {
        formState: { isDirty }
    } = form;

    useEffect(() => {
        if (user) {
            form.reset({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || ''
            });
        }
    }, [user, form]);

    useEffect(() => {
        if (state?.errors) {
            Object.keys(state.errors).forEach((key) => {
                const errorKey = key as keyof TUpdateProfileFormData;
                if (state.errors?.[errorKey]) {
                    form.setError(errorKey, {
                        type: 'server',
                        message: state.errors[errorKey]?.[0] || t('common.errors.general')
                    });
                }
            });
        }
    }, [t, state, form]);

    useEffect(() => {
        if (state?.success) {
            toast.success(t('profile.messages.updateSuccess'));

            const updatedUserData = {
                firstName: form.getValues('firstName'),
                lastName: form.getValues('lastName'),
                phone: form.getValues('phone')
            };
            void updateUser(updatedUserData);
            setResetKey((prevKey) => prevKey + 1);
        }
    }, [t, state, updateUser, form]);

    return (
        <Form {...form} key={resetKey}>
            <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('common.inputs.firstname')}</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('common.inputs.lastname')}</FormLabel>
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
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('common.inputs.phone')}</FormLabel>
                            <FormControl className="relative">
                                <div>
                                    <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                    <Input
                                        type="tel"
                                        className="pl-10"
                                        placeholder={t('common.placeholders.phone')}
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton
                    textKey="common.buttons.saveChanges"
                    startIcon={<Save />}
                    className="w-fit"
                    disabled={!isDirty}
                />
            </form>
        </Form>
    );
}
