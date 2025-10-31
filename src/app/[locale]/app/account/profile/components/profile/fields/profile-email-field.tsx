'use client';

import { Label } from '@/components/ui';
import { useTranslations } from 'next-intl';

type ProfileEmailFieldProps = {
    email: string | null | undefined;
};

export function ProfileEmailField({ email }: ProfileEmailFieldProps) {
    const t = useTranslations();

    return (
        <div className="space-y-2">
            <Label>{t('common.inputs.email')}</Label>
            <div className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full cursor-default items-center rounded-md border bg-transparent px-2 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                {email || ''}
            </div>
        </div>
    );
}
