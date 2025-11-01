'use client';

import {
    AppCard,
    AppCardContent,
    AppCardDescription,
    AppCardHeader,
    AppCardTitle
} from '@/components/app';
import { useUser } from '@/contexts/user-context';
import { Palette as PaletteIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ThemeOptions } from './theme-options';

export function PreferencesWrapper() {
    const t = useTranslations('profile.preferences');
    const { isLoading } = useUser();

    return (
        <AppCard className="min-h-96" loading={isLoading}>
            <AppCardHeader>
                <AppCardTitle icon={PaletteIcon}>{t('title')}</AppCardTitle>
                <AppCardDescription>{t('description')}</AppCardDescription>
            </AppCardHeader>
            <AppCardContent>
                <div className="grid gap-6">
                    <ThemeOptions />
                </div>
            </AppCardContent>
        </AppCard>
    );
}
