import { BackgroundPatterns } from '@/components/website/layout';
import { Link } from '@/lib/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function NotFound() {
    const t = await getTranslations('common');
    return (
        <div className="grid min-h-screen place-content-center text-center select-none">
            <BackgroundPatterns variant="stars" animated={true} />
            <div className="z-50 grid gap-1">
                <Image
                    src={'/images/404.svg'}
                    alt="404"
                    width={404}
                    height={404}
                    className="mb-10"
                />
                <h1 className="text-4xl font-bold">{t('notFound.title')}</h1>
                <p className="mt-4 text-lg">{t('notFound.description')}</p>
                <Link href="/" className="mt-8 text-blue-500 hover:underline">
                    {t('notFound.returnHome')}
                </Link>
            </div>
        </div>
    );
}
