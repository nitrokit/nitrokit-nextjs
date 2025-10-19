'use client';

import { ArrowLeft } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui';
import { useRouter } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils/cn';

interface BackButtonProps extends ButtonProps {
    text?: string;
    className?: string;
}

export function BackButton({ text, className, ...props }: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    const hasText = !!text;

    return (
        <Button
            onClick={handleClick}
            variant="ghost"
            size={hasText ? 'default' : 'icon'}
            className={cn(
                'absolute top-8 left-8 z-10 rounded-full lg:top-10 lg:left-10',
                hasText && 'px-4',
                className
            )}
            aria-label={hasText ? text : 'Geri Dön'}
            {...props}
        >
            <ArrowLeft className={cn('h-4 w-4', hasText && 'mr-2')} />
            {text}
        </Button>
    );
}
