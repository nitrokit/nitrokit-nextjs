'use client';

import { Input, Label } from '@/components/ui';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ProfileEmailFieldProps = {
    email: string | null | undefined;
};

export function ProfileEmailField({ email }: ProfileEmailFieldProps) {
    const t = useTranslations();

    return (
        <div className="space-y-2">
            <Label>{t('common.inputs.email')}</Label>
            <div className="relative">
                <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                    type="email"
                    className="bg-muted w-full pl-10"
                    value={email ?? ''}
                    disabled
                    placeholder={t('common.placeholders.email')}
                />
            </div>
        </div>
    );
}
