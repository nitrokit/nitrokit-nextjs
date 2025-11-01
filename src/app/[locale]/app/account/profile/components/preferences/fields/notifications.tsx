'use client';

import { Label } from '@/components/ui/label';
import { BellRing as BellRingIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Notifications() {
    const t = useTranslations();

    return (
        <div className="space-y-2">
            <Label className="flex items-center gap-2">
                <BellRingIcon className="h-4 w-4" />
                {t('profile.preferences.notifications.title')}
            </Label>
        </div>
    );
}
