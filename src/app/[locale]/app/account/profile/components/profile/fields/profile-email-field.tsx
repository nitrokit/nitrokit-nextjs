'use client';

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    Label
} from '@/components/ui';
import { Mail as MailIcon, Pencil as PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ProfileEmailFieldProps = {
    email: string | null | undefined;
};

export function ProfileEmailField({ email }: ProfileEmailFieldProps) {
    const t = useTranslations();

    return (
        <div className="space-y-2">
            <Label>{t('common.inputs.email')}</Label>
            <InputGroup>
                <InputGroupInput
                    disabled
                    value={email ?? ''}
                    type="email"
                    placeholder={t('common.placeholders.email')}
                />
                <InputGroupAddon>
                    <MailIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton variant="default" className="hidden text-xs">
                        <PencilIcon />
                        {t('common.buttons.edit')}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
