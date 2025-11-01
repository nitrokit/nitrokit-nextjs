import { useTranslations } from 'next-intl';
import { PreferencesWrapper, ProfileFormWrapper } from './components';

export default function Page() {
    const t = useTranslations();
    return (
        <div className="mx-auto w-full space-y-6 px-4 sm:px-6 lg:max-w-4xl lg:px-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">{t('profile.title')}</h2>
                <p className="text-muted-foreground">{t('profile.description')}</p>
            </div>
            <ProfileFormWrapper />
            <PreferencesWrapper />
        </div>
    );
}
