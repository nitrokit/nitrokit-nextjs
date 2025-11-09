'use client';

import { Checkbox } from '@/components/ui';
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
            <p className="text-muted-foreground text-sm">
                {t('profile.preferences.notifications.description')}
            </p>
            <Label className="flex items-center gap-2">
                <Checkbox
                    id="receiveEmailUpdates"
                    defaultChecked
                    className="data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                />
                <div className="grid gap-1.5 font-normal">
                    <p className="text-muted-foreground text-sm">
                        {t('profile.preferences.notifications.emailUpdates')}
                    </p>
                </div>
            </Label>
            <Label className="flex items-center gap-2">
                <Checkbox
                    id="receiveSmsUpdates"
                    defaultChecked
                    className="data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                />
                <div className="grid gap-1.5 font-normal">
                    <p className="text-muted-foreground text-sm">
                        {t('profile.preferences.notifications.smsAlerts')}
                    </p>
                </div>
            </Label>
        </div>
    );
}
