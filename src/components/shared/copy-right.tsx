import { cn, getBaseUrl } from '@/lib';
import { useTranslations } from 'next-intl';

interface CopyRightProps {
    className?: string;
}

export function CopyRight(props: CopyRightProps) {
    const { className } = props;
    const siteUrl = getBaseUrl();
    const t = useTranslations();
    return (
        <div className={cn('truncate', className)}>
            © {new Date().getFullYear()}{' '}
            <a
                href={siteUrl}
                className="transition-colors hover:text-blue-500 hover:underline hover:underline-offset-2"
            >
                {t('common.shortName')}
            </a>{' '}
            • {t('common.allRightsReserved')}
        </div>
    );
}
