'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { TUpdateProfileFormData } from '@/lib';
import { Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Control } from 'react-hook-form';

type ProfilePhoneFieldProps = {
    control: Control<TUpdateProfileFormData>;
};

export function ProfilePhoneField({ control }: ProfilePhoneFieldProps) {
    const t = useTranslations();

    return (
        <FormField
            control={control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{t('common.inputs.phone')}</FormLabel>
                    <FormControl className="relative">
                        <div>
                            <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <Input
                                type="tel"
                                className="w-full pl-10 lg:w-fit"
                                placeholder={t('common.placeholders.phone')}
                                {...field}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
