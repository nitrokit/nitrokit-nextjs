import { useTranslations } from 'next-intl';

export default function IndexPage() {
    const t = useTranslations('HomePage');
    return <>{t('title')}</>;
}
