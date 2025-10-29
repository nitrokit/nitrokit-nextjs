'use client';
import {
    AppCard,
    AppCardContent,
    AppCardDescription,
    AppCardFooter,
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
    Input
} from '@/components/ui';
import { useUser } from '@/contexts/user-context';
import {
    DEFAULT_UPDATE_PROFILE_FORM_VALUES,
    TUpdateProfileFormData,
    updateProfileFormSchema
} from '@/lib';
import {
    UpdateProfileActionState,
    updateProfileAction
} from '@/lib/actions/app/profile/update-profile';
import { SimpleTFunction } from '@/types/i18n';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserIcon, Save as IconSave, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ProfileInformation() {
    const t = useTranslations();
    const { user, updateUser: updateUser } = useUser();

    const initialFormState: UpdateProfileActionState = {};
    const [state, formAction] = useActionState(updateProfileAction, initialFormState);
    const schema = updateProfileFormSchema(t as SimpleTFunction);

    const form = useForm<TUpdateProfileFormData>({
        resolver: zodResolver(schema),
        defaultValues: user
            ? {
                  firstname: user.firstName || '',
                  lastname: user.lastName || '',
                  email: user.email || ''
              }
            : DEFAULT_UPDATE_PROFILE_FORM_VALUES
    });

    useEffect(() => {
        if (state?.success) {
            toast.success('Test profile updated successfully!');
        }
    }, [state, t, updateUser]);

    return (
        <AppCard variant={'danger'}>
            <AppCardHeader>
                <AppCardTitle icon={UserIcon}>{t('profile.title')}</AppCardTitle>
                <AppCardDescription>{t('profile.description')}</AppCardDescription>
            </AppCardHeader>
            <AppCardContent>
                <div className="grid gap-6">
                    <Form {...form}>
                        <form action={formAction} className="space-y-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="firstname"
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
                                    name="lastname"
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('common.inputs.email')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder={t('common.placeholders.email')}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
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
                        </form>
                    </Form>
                </div>
            </AppCardContent>
            <AppCardFooter>
                <SubmitButton
                    textKey="common.buttons.save"
                    startIcon={<IconSave />}
                    className="w-fit"
                />
            </AppCardFooter>
        </AppCard>
    );
}
