import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('app.privacyPolicy');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description')
        })
    });
}

export default async function Page() {
    const t = await getTranslations('app.privacyPolicy');
    return (
        <div className="w-full py-10 lg:mx-auto lg:w-7xl">
            <h1 className="py-6 text-3xl font-bold">{t('title')}</h1>

            <p className="py-4">{t('description')}</p>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">{t('whatData.title')}</h2>
                <p>{t('whatData.text')}</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">{t('howWeUse.title')}</h2>
                <div className="whitespace-pre-line">{t('howWeUse.text')}</div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">{t('dataSharing.title')}</h2>
                <p>{t('dataSharing.text')}</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">{t('contactInfo.title')}</h2>
                <p>{t('contactInfo.text')}</p>
            </div>
        </div>
    );
}
