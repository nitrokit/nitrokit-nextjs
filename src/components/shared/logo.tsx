import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ThemedImage } from '@/components/shared';
import { cn } from '@/lib';

export function Logo({
    size = 40,
    onlyIcon = false,
    forceText = false,
    className = ''
}: {
    size?: number;
    onlyIcon?: boolean;
    forceText?: boolean;
    className?: string;
}) {
    const t = useTranslations('common');
    return (
        <Link href={'/'} className={cn('flex items-center justify-start gap-4', className)}>
            <ThemedImage
                lightSrc={'/images/logos/nitrokit.png'}
                darkSrc={'/images/logos/nitrokit.png'}
                alt="Nitrokit"
                width={size}
                height={size}
                className={'drop-shadow-xs'}
            />
            {!onlyIcon && (
                <span
                    className={`${forceText ? '' : 'hidden lg:inline-block'} text-[oklch(21% 0% 90)] font-[family-name:var(--font-montserrat)] text-3xl font-extrabold tracking-wide text-shadow-2xs dark:text-shadow-xs`}
                >
                    {t('shortName').toLowerCase()}
                </span>
            )}
        </Link>
    );
}
