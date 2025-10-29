'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
    Button,
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    Checkbox,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui';
import { Cookie, Settings, Shield, BarChart3, Target } from 'lucide-react';
import type { GtagConsentParams } from '@/types/gtag';
import {
    CookiePreferences,
    cookiePreferencesSchema
} from '@/lib/validations/cookie-preferences-schema';

const COOKIE_CONSENT_KEY = 'nitrokit-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'nitrokit-cookie-preferences';

const defaultPreferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
};

export function CookieConsent() {
    const t = useTranslations('common');
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

        if (!consent) {
            setIsVisible(true);
            document.body.classList.add('cookie-banner-visible');
        }

        if (savedPreferences) {
            try {
                const result = cookiePreferencesSchema.safeParse(JSON.parse(savedPreferences));

                if (result.success) {
                    setPreferences(result.data);
                } else {
                    setPreferences(defaultPreferences);
                }
            } catch {
                setPreferences(defaultPreferences);
            }
        }

        return () => {
            document.body.classList.remove('cookie-banner-visible');
        };
    }, []);

    const saveCookiePreferences = (prefs: CookiePreferences) => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
        localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
        setPreferences(prefs);
        setIsVisible(false);
        setShowSettings(false);
        document.body.classList.remove('cookie-banner-visible');
        applyCookiePreferences(prefs);
    };

    const applyCookiePreferences = (prefs: CookiePreferences) => {
        if (prefs.analytics) {
            enableAnalytics();
        } else {
            disableAnalytics();
        }

        if (prefs.marketing) {
            enableMarketing();
        } else {
            disableMarketing();
        }

        if (prefs.functional) {
            enableFunctional();
        } else {
            disableFunctional();
        }
    };

    const enableAnalytics = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            const consentParams: GtagConsentParams = {
                analytics_storage: 'granted'
            };
            window.gtag('consent', 'update', consentParams);
        }
    };

    const disableAnalytics = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                analytics_storage: 'denied'
            });
        }
    };

    const enableMarketing = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            const consentParams: GtagConsentParams = {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
            };
            window.gtag('consent', 'update', consentParams);
        }
    };

    const disableMarketing = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
            });
        }
    };

    const enableFunctional = () => {};

    const disableFunctional = () => {};

    const acceptAll = () => {
        const allAccepted: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        saveCookiePreferences(allAccepted);
    };

    const acceptNecessary = () => {
        const necessaryOnly: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        saveCookiePreferences(necessaryOnly);
    };

    const saveCustomPreferences = () => {
        saveCookiePreferences(preferences);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed right-0 bottom-0 left-0 z-50 border-t bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/95">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-1 items-start gap-3">
                            <Cookie className="mt-0.5 h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {t('cookies.banner.title')}
                                </p>
                                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                                    {t('cookies.banner.description')}
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className="ml-1 text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        {t('cookies.banner.learnMore')}
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <Sheet open={showSettings} onOpenChange={setShowSettings}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full sm:w-auto"
                                    >
                                        <Settings className="mr-2 h-4 w-4" />
                                        {t('cookies.banner.settings')}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="w-full overflow-y-auto p-6 sm:max-w-lg"
                                >
                                    <SheetHeader>
                                        <SheetTitle className="flex items-center gap-2">
                                            <Shield className="h-5 w-5" />
                                            {t('cookies.settings.title')}
                                        </SheetTitle>
                                        <SheetDescription>
                                            {t('cookies.settings.description')}
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="mt-6 space-y-6">
                                        <Card>
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Shield className="h-4 w-4 text-green-600" />
                                                        <CardTitle className="text-sm">
                                                            {t(
                                                                'cookies.categories.necessary.title'
                                                            )}
                                                        </CardTitle>
                                                    </div>
                                                    <Checkbox checked={true} disabled />
                                                </div>
                                                <CardDescription className="text-xs">
                                                    {t('cookies.categories.necessary.description')}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <BarChart3 className="h-4 w-4 text-blue-600" />
                                                        <CardTitle className="text-sm">
                                                            {t(
                                                                'cookies.categories.analytics.title'
                                                            )}
                                                        </CardTitle>
                                                    </div>
                                                    <Checkbox
                                                        checked={preferences.analytics}
                                                        onCheckedChange={(checked) =>
                                                            setPreferences((prev) => ({
                                                                ...prev,
                                                                analytics: !!checked
                                                            }))
                                                        }
                                                    />
                                                </div>
                                                <CardDescription className="text-xs">
                                                    {t('cookies.categories.analytics.description')}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Target className="h-4 w-4 text-purple-600" />
                                                        <CardTitle className="text-sm">
                                                            {t(
                                                                'cookies.categories.marketing.title'
                                                            )}
                                                        </CardTitle>
                                                    </div>
                                                    <Checkbox
                                                        checked={preferences.marketing}
                                                        onCheckedChange={(checked) =>
                                                            setPreferences((prev) => ({
                                                                ...prev,
                                                                marketing: !!checked
                                                            }))
                                                        }
                                                    />
                                                </div>
                                                <CardDescription className="text-xs">
                                                    {t('cookies.categories.marketing.description')}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Settings className="h-4 w-4 text-orange-600" />
                                                        <CardTitle className="text-sm">
                                                            {t(
                                                                'cookies.categories.functional.title'
                                                            )}
                                                        </CardTitle>
                                                    </div>
                                                    <Checkbox
                                                        checked={preferences.functional}
                                                        onCheckedChange={(checked) =>
                                                            setPreferences((prev) => ({
                                                                ...prev,
                                                                functional: !!checked
                                                            }))
                                                        }
                                                    />
                                                </div>
                                                <CardDescription className="text-xs">
                                                    {t('cookies.categories.functional.description')}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </div>
                                    <div className="mt-6 flex gap-2 border-t pt-6">
                                        <Button onClick={saveCustomPreferences} className="flex-1">
                                            {t('cookies.settings.save')}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={acceptNecessary}
                                            className="flex-1"
                                        >
                                            {t('cookies.settings.rejectAll')}
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={acceptNecessary} size="sm">
                                    {t('cookies.banner.reject')}
                                </Button>
                                <Button onClick={acceptAll} size="sm">
                                    {t('cookies.banner.accept')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
