'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@/components/ui/button';
import { Spinner } from '../ui';
import { translateSafely } from '@/lib';

type IconType = React.ReactNode;

interface SubmitButtonProps extends ButtonProps {
    textKey: string;
    loadingContent?: React.ReactNode;
    startIcon?: IconType;
    endIcon?: IconType;
}

export function SubmitButton({
    textKey,
    loadingContent,
    startIcon,
    endIcon,
    ...props
}: SubmitButtonProps) {
    const { pending } = useFormStatus();
    const t = useTranslations();

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDisabled = pending || !mounted;
    const defaultLoadingContent = <Spinner />;

    const buttonContent = isDisabled
        ? loadingContent || defaultLoadingContent
        : translateSafely(t, textKey);

    const content = isDisabled ? (
        buttonContent
    ) : (
        <>
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {buttonContent}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </>
    );

    return (
        <Button
            type="submit"
            className="w-full"
            disabled={isDisabled}
            aria-disabled={isDisabled}
            {...props}
        >
            {content}
        </Button>
    );
}
