import { useTranslations } from 'next-intl';
import { GithubButtonWithStats } from '@/components/shared';
import VercelDeployButton from '@/components/shared/vercel-deploy-button';

export function DeploySection() {
    const t = useTranslations('home');

    return (
        <div className="mx-auto my-36 max-w-7xl rounded-2xl border-t border-gray-200/50 bg-linear-to-r from-white/40 via-white/60 to-white/40 py-10 text-center shadow-2xl shadow-black/5 backdrop-blur-sm dark:border-gray-800/50 dark:from-gray-900/40 dark:via-gray-900/60 dark:to-gray-900/40">
            <h3 className="mb-4 text-4xl font-semibold text-gray-900 dark:text-white">
                {t('cta.title')}
            </h3>
            <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">{t('cta.description')}</p>

            <div className="flex flex-col items-center justify-center gap-3 pb-8 sm:flex-row">
                <GithubButtonWithStats />
                <VercelDeployButton />
            </div>
        </div>
    );
}
