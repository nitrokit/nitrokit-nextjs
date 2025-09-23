'use client';

import { Globe } from 'lucide-react';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';

import { SmallLoading } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Locale } from '@/constants/locale';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { LOCALES_WITH_FLAG } from '@/lib/utils/locale-utils';

export const LocaleSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (value: Locale) => {
        router.push(pathname, { locale: value });
        router.refresh();
    };

    if (!mounted) {
        return <SmallLoading />;
    }

    return (
        <Suspense fallback={<SmallLoading />}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer rounded-full text-gray-500 hover:text-gray-700"
                    >
                        <Globe className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-35 p-1 shadow-xs" side="bottom">
                    {LOCALES_WITH_FLAG.map((LOCALE) => (
                        <div
                            key={LOCALE.id}
                            className="flex cursor-pointer flex-row items-center gap-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                                handleChange(LOCALE.id);
                                setOpen(false);
                            }}
                        >
                            <div className="flex">
                                <Image
                                    src={LOCALE.flag}
                                    width={16}
                                    height={16}
                                    alt={LOCALE.name}
                                    className="w-4"
                                />
                            </div>
                            <div className="text-sm">{LOCALE.name}</div>
                        </div>
                    ))}
                </PopoverContent>
            </Popover>
        </Suspense>
    );
};
