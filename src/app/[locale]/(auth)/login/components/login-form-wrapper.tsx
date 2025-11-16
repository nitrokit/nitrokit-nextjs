'use client';

import * as React from 'react';
import { useState } from 'react';
import { LoginForm } from './login-form';
import { FormCard } from '../../components/form-card';
import { useTranslations } from 'next-intl';
import { translateSafely } from '@nitrokit/core/lib';

interface LoginCardWrapperProps {
    serverFooter: React.ReactNode;
    serverSignupText: React.ReactNode;
}

export function LoginFormWrapper({ serverFooter, serverSignupText }: LoginCardWrapperProps) {
    const t = useTranslations();
    const [isTwoFactorFlow, setIsTwoFactorFlow] = useState(false);

    const handleFlowChange = (is2FA: boolean) => {
        setIsTwoFactorFlow(is2FA);
    };

    const titleKey = isTwoFactorFlow ? 'auth.2fa.title' : 'auth.signin.title';

    return (
        <FormCard
            title={translateSafely(t, titleKey)}
            footer={!isTwoFactorFlow ? serverFooter : undefined}
        >
            {!isTwoFactorFlow && (
                <div className="mb-5 w-full text-center text-sm">{serverSignupText}</div>
            )}
            <LoginForm onFlowChange={handleFlowChange} />
        </FormCard>
    );
}
