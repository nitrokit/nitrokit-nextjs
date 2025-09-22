import { useTranslations } from 'next-intl';

export default function IndexPage() {
    const t = useTranslations('common');
    return <>{t('welcome')}</>;
}
