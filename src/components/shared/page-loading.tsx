import { getTranslations } from 'next-intl/server';

import { Loading } from '@/comp/shared';
import { cn } from '@/lib';

interface Props {
    text?: string;
    className?: string;
}

export async function PageLoading({ text, className }: Props) {
    if (!text) {
        const t = await getTranslations('app');
        text = t('loading');
    }

    return <Loading text={text} className={cn(className, 'h-[400px]')} />;
}
