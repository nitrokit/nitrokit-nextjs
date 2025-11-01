'use client';

import { InputGroup, InputGroupAddon, InputGroupInput, Label } from '@/components/ui';
import { BadgeCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ProfileUserField() {
    const t = useTranslations();

    return (
        <div className="hidden space-y-2">
            <Label>{t('common.inputs.username')}</Label>
            <InputGroup className="w-fit">
                <InputGroupAddon>
                    <Label htmlFor="username">@</Label>
                </InputGroupAddon>
                <InputGroupInput id="username" placeholder="nitrokit" />
                <InputGroupAddon align="inline-end">
                    <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
                        <BadgeCheck className="size-3" />
                    </div>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
