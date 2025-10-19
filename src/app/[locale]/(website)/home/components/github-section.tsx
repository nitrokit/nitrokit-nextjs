import { useTranslations } from 'next-intl';
import { GITHUB_URL } from '@/constants';
import { Button } from '@/comp/ui';
import { Link } from '@/lib/i18n/navigation';
import { ExternalLink as IconExternalLink, Github as IconGithub } from 'lucide-react';

export function GitHubSection() {
    const t = useTranslations('home');

    return (
        <div className="my-10 rounded-2xl border-t border-gray-200/50 bg-gradient-to-r from-white/40 via-white/60 to-white/40 pt-12 text-center backdrop-blur-sm dark:border-gray-800/50 dark:from-gray-900/40 dark:via-gray-900/60 dark:to-gray-900/40">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                {t('cta.title')}
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">{t('cta.description')}</p>

            <div className="flex flex-col items-center justify-center gap-3 pb-8 sm:flex-row">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-white/70 backdrop-blur-sm hover:bg-white dark:bg-gray-900/70 dark:hover:bg-gray-900"
                >
                    <Link href={GITHUB_URL}>
                        <IconGithub className="mr-2 h-4 w-4" />
                        {t('cta.github')}
                    </Link>
                </Button>

                <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="hover:bg-white/50 dark:hover:bg-gray-900/50"
                >
                    <Link href={GITHUB_URL + '/wiki'}>
                        <IconExternalLink className="mr-2 h-4 w-4" />
                        {t('cta.docs')}
                    </Link>
                </Button>
            </div>
        </div>
    );
}
