import { getTranslations } from 'next-intl/server';

import { Loading } from '@/components/shared';

export default async function PageLoading() {
    const t = await getTranslations('common');
    return <Loading text={t('loading')} className="h-[400px]" />;
}
