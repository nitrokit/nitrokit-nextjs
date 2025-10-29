'use client';

import { Check, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { SmallLoading } from '@/components/shared';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { cn, LOCALES_WITH_FLAG } from '@/lib';
import { Locale } from '@/constants';

export const CompactLocaleSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const [desktopOpen, setDesktopOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLocaleChange = (locale: Locale) => {
        router.push(pathname, { locale });
        setDesktopOpen(false);
        setMobileOpen(false);
    };

    const getCurrentLocale = () => {
        return (
            LOCALES_WITH_FLAG.find((LOCALE) => LOCALE.id === currentLocale) || LOCALES_WITH_FLAG[0]
        );
    };

    if (!mounted) {
        return <SmallLoading />;
    }

    const currentLocaleData = getCurrentLocale();

    return (
        <Suspense fallback={<SmallLoading />}>
            <div className="hidden sm:block">
                <Popover open={desktopOpen} onOpenChange={setDesktopOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="border-border/0 hover:bg-accent/30 h-8 gap-2 rounded-lg border bg-transparent px-1 pl-2 transition-all duration-200"
                        >
                            <Image
                                src={currentLocaleData.flag}
                                width={14}
                                height={14}
                                alt={currentLocaleData.name}
                            />
                            <span className="text-xs font-medium">
                                {currentLocaleData.id.toUpperCase()}
                            </span>
                            <ChevronDown size={10} className="opacity-60" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-30 p-1">
                        <div className="space-y-0.5">
                            {LOCALES_WITH_FLAG.map((LOCALE) => (
                                <Button
                                    key={LOCALE.id}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleLocaleChange(LOCALE.id)}
                                    className={cn(
                                        'h-auto w-full justify-start gap-2 px-2 py-1 transition-colors',
                                        currentLocale === LOCALE.id
                                            ? 'bg-accent text-accent-foreground'
                                            : 'hover:bg-accent hover:text-accent-foreground'
                                    )}
                                >
                                    <Image
                                        src={LOCALE.flag}
                                        width={16}
                                        height={16}
                                        alt={LOCALE.name}
                                    />
                                    <span className="flex-1 text-left text-sm">{LOCALE.name}</span>
                                    {currentLocale === LOCALE.id && (
                                        <Check size={14} className="text-primary ml-auto" />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="sm:hidden">
                <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 rounded-lg p-0 transition-all duration-200"
                        >
                            <div className="relative">
                                <Image
                                    src={currentLocaleData.flag}
                                    width={16}
                                    height={16}
                                    alt={currentLocaleData.name}
                                />
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-sm border-2 border-blue-200 p-1">
                        <div className="space-y-0.5">
                            {LOCALES_WITH_FLAG.map((LOCALE) => (
                                <Button
                                    key={LOCALE.id}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleLocaleChange(LOCALE.id)}
                                    className={cn(
                                        'h-auto w-full justify-start gap-1 p-1 transition-colors',
                                        currentLocale === LOCALE.id
                                            ? 'bg-accent text-accent-foreground'
                                            : 'hover:bg-accent hover:text-accent-foreground'
                                    )}
                                >
                                    <Image
                                        src={LOCALE.flag}
                                        width={14}
                                        height={14}
                                        alt={LOCALE.name}
                                    />
                                    <span className="flex-1 text-left text-xs">{LOCALE.name}</span>
                                    {currentLocale === LOCALE.id && (
                                        <Check size={12} className="text-primary ml-auto" />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </Suspense>
    );
};
