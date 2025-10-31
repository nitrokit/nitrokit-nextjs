'use client';

import {
    AppCard,
    AppCardContent,
    AppCardDescription,
    AppCardHeader,
    AppCardTitle
} from '@/components/app';
import { useUser } from '@/contexts/user-context';
import { UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ProfileEmailField } from './fields';
import { ProfileForm } from './profile-form';

export function ProfileFormWrapper() {
    const t = useTranslations('profile.profileInformation');
    const { user, isLoading } = useUser();

    return (
        <AppCard className="min-h-96" loading={isLoading}>
            <AppCardHeader>
                <AppCardTitle icon={UserIcon}>{t('title')}</AppCardTitle>
                <AppCardDescription>{t('description')}</AppCardDescription>
            </AppCardHeader>
            <AppCardContent>
                <div className="grid gap-6">
                    <ProfileEmailField email={user?.email} />
                    <ProfileForm />
                </div>
            </AppCardContent>
        </AppCard>
    );
}
