'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { LOCALES_WITH_FLAG } from '@/lib';
import { Languages as LanguageIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export function Languages() {
    const t = useTranslations();
    const currentLocale = useLocale();

    const getCurrentLocale = () => {
        return (
            LOCALES_WITH_FLAG.find((LOCALE) => LOCALE.id === currentLocale) || LOCALES_WITH_FLAG[0]
        );
    };

    const currentLocaleData = getCurrentLocale();

    return (
        <div className="space-y-2">
            <Label className="flex items-center gap-2">
                <LanguageIcon className="h-4 w-4" />
                {t('profile.preferences.language.title')}
            </Label>
            <div className="w-fit">
                <Select defaultValue={currentLocaleData.id}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t('common.inputs.select')} />
                    </SelectTrigger>
                    <SelectContent>
                        {LOCALES_WITH_FLAG.map((locale) => (
                            <SelectItem key={locale.id} value={locale.id}>
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={locale.flag}
                                        alt={t('profile.preferences.language.flag', {
                                            language: locale.name
                                        })}
                                        width={16}
                                        height={12}
                                    />
                                    <span>{locale.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
