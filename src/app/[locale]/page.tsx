'use client';

import { Version } from '@/components/shared/version';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function RootPage() {
    const t = useTranslations('app');

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
