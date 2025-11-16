import { AuthErrorComponent } from './components/auth-error-component';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@nitrokit/core/lib';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('auth.error');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description')
        })
    });
}

export default function ErrorPage() {
    return <AuthErrorComponent />;
}
