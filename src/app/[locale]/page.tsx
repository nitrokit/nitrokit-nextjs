'use client';

import { Version } from '@/components/shared/version';
import { useUser } from '@/contexts/user-context';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function RootPage() {
    const t = useTranslations('app');
    const { user, isLoading } = useUser();
    console.log('User', user, isLoading);

    return (
        <div>
            {t('title')}
            <br />
            {t('description')}
            <br />
            <Version />
        </div>
    );
}
