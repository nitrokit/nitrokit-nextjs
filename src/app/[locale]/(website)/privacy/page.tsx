import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib';
import { PrivacyComponent } from './components/privacy-content';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('common.privacyPolicy');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description')
        })
    });
}

export default async function Page() {
    const t = await getTranslations('common.privacyPolicy');
    return (
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">
                {t('title')}
            </h1>

            <p className="mb-10 text-gray-700 dark:text-gray-300">{t('description')}</p>

            <div className="space-y-10">
                <PrivacyComponent />
            </div>
        </div>
    );
}
