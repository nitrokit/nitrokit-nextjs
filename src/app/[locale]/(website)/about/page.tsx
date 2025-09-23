import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('about');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description'),
        }),
    });
}

export default async function Page() {
    return <>About</>;
}
