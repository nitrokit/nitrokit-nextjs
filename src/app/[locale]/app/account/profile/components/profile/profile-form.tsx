'use client';

import { SubmitButton } from '@/components/shared';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from '@/components/ui';
import { useUser } from '@/contexts/user-context';
import {
    DEFAULT_UPDATE_PROFILE_FORM_VALUES,
    TUpdateProfileFormData,
    updateProfileFormSchema
} from '@/lib';
import { UpdateProfileActionState, updateProfileAction } from '@/lib/actions/app';
import { SimpleTFunction } from '@/types/i18n';
import { useActionState, useEffect, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { ProfilePhoneField } from './fields';

type UserFormValues = Pick<TUpdateProfileFormData, 'firstName' | 'lastName' | 'phone'>;

const getUserFormValues = (user: {
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
}): UserFormValues => ({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || ''
});

const serializeFormValues = (values: UserFormValues): string => {
    return JSON.stringify(values);
};

export function ProfileForm() {
    const t = useTranslations();
    const { user, updateUser } = useUser();

    const initialFormState: UpdateProfileActionState = { success: false };
    const [state, formAction, pending] = useActionState(updateProfileAction, initialFormState);
    const previousSuccessRef = useRef<boolean>(false);

    const schema = useMemo(() => updateProfileFormSchema(t as SimpleTFunction), [t]);

    const form = useForm<TUpdateProfileFormData>({
        resolver: zodResolver(schema),
        defaultValues: DEFAULT_UPDATE_PROFILE_FORM_VALUES,
        mode: 'onSubmit'
    });

    const { isDirty } = form.formState;
    const previousUserValuesRef = useRef<string | null>(null);

    useEffect(() => {
        if (!user) return;

        const userFormValues = getUserFormValues(user);
        const currentUserValues = serializeFormValues(userFormValues);
        const previousValues = previousUserValuesRef.current;
        const shouldReset = (previousValues !== currentUserValues && !isDirty) || !previousValues;

        if (shouldReset) {
            form.reset(userFormValues);
            previousUserValuesRef.current = currentUserValues;
        }
    }, [user, form, isDirty]);

    useEffect(() => {
        if (!state?.errors) return;

        Object.entries(state.errors).forEach(([key, messages]) => {
            const fieldName = key as keyof TUpdateProfileFormData;
            const errorMessage = messages?.[0];
            if (errorMessage) {
                form.setError(fieldName, {
                    type: 'server',
                    message: errorMessage
                });
            }
        });
    }, [state?.errors, form]);

    useEffect(() => {
        const isSuccess = state?.success === true;
        const wasHandled = previousSuccessRef.current;
        const shouldHandle = isSuccess && !wasHandled && !pending;

        if (shouldHandle) {
            toast.success(t('profile.profileInformation.messages.updateSuccess'));

            const formValues = form.getValues();
            const userFormValues = getUserFormValues(formValues);

            updateUser(userFormValues);
            form.reset(formValues, { keepValues: true });
            previousUserValuesRef.current = serializeFormValues(userFormValues);
            previousSuccessRef.current = true;
        }

        if (pending) {
            previousSuccessRef.current = false;
        }
    }, [state?.success, pending, form, updateUser, t]);

    return (
        <Form {...form}>
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
                <ProfilePhoneField control={form.control} />
                <SubmitButton
                    textKey="common.buttons.saveChanges"
                    startIcon={<Save />}
                    className="w-fit"
                    disabled={!isDirty || pending}
                />
            </form>
        </Form>
    );
}
