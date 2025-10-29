import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib';

interface LogoProps {
    className?: string;
}

export function Logo(props: LogoProps) {
    const { className } = props;
    const t = useTranslations();
    return (
        <Link href="/" className={cn(`group flex items-center space-x-3`, className)}>
            <div className="relative flex h-9 w-9 items-center justify-center">
                <Image alt="nitrokit" src="/images/logos/nitrokit.png" width={40} height={40} />
            </div>
            <div className="block">
                <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-xl font-bold tracking-tight text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 dark:group-hover:from-blue-400 dark:group-hover:via-purple-400 dark:group-hover:to-pink-400">
                    {t('common.shortName')}
                </span>
                <div className="h-0.5 w-0 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
        </Link>
    );
}
