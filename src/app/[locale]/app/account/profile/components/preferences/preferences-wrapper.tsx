'use client';

import {
    AppCard,
    AppCardContent,
    AppCardDescription,
    AppCardHeader,
    AppCardTitle
} from '@/components/app';
import { useUser } from '@/contexts/user-context';
import { Cog as CogIcon, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Languages, ThemeOptions, Notifications } from './fields';
import { SubmitButton } from '@/components/shared';

export function PreferencesWrapper() {
    const t = useTranslations('profile.preferences');
    const { isLoading } = useUser();

    return (
        <AppCard className="min-h-96" loading={isLoading}>
            <AppCardHeader>
                <AppCardTitle icon={CogIcon}>{t('title')}</AppCardTitle>
                <AppCardDescription>{t('description')}</AppCardDescription>
            </AppCardHeader>
            <AppCardContent className="grid gap-6">
                <ThemeOptions />
                <Languages />
                <Notifications />
                <SubmitButton
                    textKey="common.buttons.saveChanges"
                    startIcon={<Save />}
                    className="w-fit"
                    disabled={isLoading}
                />
            </AppCardContent>
        </AppCard>
    );
}
