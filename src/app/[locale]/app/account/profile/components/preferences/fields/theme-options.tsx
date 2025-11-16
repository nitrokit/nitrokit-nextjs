'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@nitrokit/core/lib';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { CheckCircle, PaletteIcon } from 'lucide-react';

export function ThemeOptions() {
    const t = useTranslations('profile.preferences.theme');
    const { setTheme, theme } = useTheme();

    const themes = [
        {
            name: 'light',
            label: t('light'),
            previewBg: 'bg-blue-100 text-gray-800',
            mainBg: 'bg-white',
            sidebarBg: 'bg-slate-100',
            logoBg: 'bg-blue-500',
            labelColor: 'text-slate-900',
            barColor: 'bg-slate-300'
        },
        {
            name: 'dark',
            label: t('dark'),
            previewBg: 'bg-gray-900 text-gray-100',
            mainBg: 'bg-slate-950',
            sidebarBg: 'bg-slate-800',
            logoBg: 'bg-blue-500',
            labelColor: 'text-slate-50',
            barColor: 'bg-slate-700'
        },
        {
            name: 'system',
            label: t('system'),
            previewBg: 'bg-linear-to-r from-gray-100 to-gray-900 text-gray-800',
            mainBg: 'bg-transparent',
            sidebarBg: 'bg-slate-100',
            logoBg: 'bg-blue-500',
            labelColor: 'text-slate-900',
            barColor: 'bg-slate-300'
        },
        {
            name: 'theme-zinc',
            label: t('zinc'),
            previewBg: 'bg-zinc-100 text-zinc-800',
            mainBg: 'bg-white',
            sidebarBg: 'bg-zinc-100',
            logoBg: 'bg-zinc-800',
            labelColor: 'text-zinc-900',
            barColor: 'bg-zinc-300'
        },
        {
            name: 'theme-rose',
            label: t('rose'),
            previewBg: 'bg-rose-100 text-rose-800',
            mainBg: 'bg-white',
            sidebarBg: 'bg-rose-100',
            logoBg: 'bg-rose-800',
            labelColor: 'text-rose-900',
            barColor: 'bg-rose-300'
        }
    ];

    return (
        <div className="space-y-2">
            <Label className="flex items-center gap-2">
                <PaletteIcon className="h-4 w-4" />
                {t('title')}
            </Label>
            <RadioGroup
                onValueChange={setTheme}
                defaultValue={theme}
                className="grid w-full grid-cols-5 gap-4"
            >
                {themes.map((item) => {
                    const isSelected = theme === item.name;
                    return (
                        <Label
                            key={item.name}
                            className={cn(
                                'bg-popover hover:text-accent-foreground relative flex cursor-pointer flex-col items-center justify-between overflow-hidden rounded-md border-2 hover:border-green-300',
                                isSelected
                                    ? 'border-green-500 ring-2 ring-green-500/20'
                                    : 'border-border hover:border-green-300'
                            )}
                        >
                            <RadioGroupItem value={item.name} id={item.name} className="sr-only" />
                            <div className={cn('relative block h-20 w-full p-2', item.previewBg)}>
                                <div
                                    className={cn(
                                        'absolute bottom-2 left-2 transition-all duration-200',
                                        isSelected ? 'opacity-100' : 'opacity-0'
                                    )}
                                >
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                                        <CheckCircle className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className={cn(
                                        'flex h-full w-full gap-1 rounded-md p-1',
                                        item.mainBg
                                    )}
                                >
                                    <div className={cn('w-1/4 rounded-sm', item.sidebarBg)}>
                                        <div
                                            className={cn('m-1 h-3 w-3 rounded-full', item.logoBg)}
                                        ></div>
                                    </div>
                                    <div
                                        className={cn(
                                            'flex-1 space-y-1 overflow-hidden rounded-sm p-1',
                                            item.sidebarBg
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'text-[11px] font-medium',
                                                item.labelColor
                                            )}
                                        >
                                            {item.label}
                                        </div>
                                        <div
                                            className={cn('mt-2 h-2 w-8 rounded-sm', item.barColor)}
                                        ></div>
                                        <div
                                            className={cn('h-2 w-12 rounded-sm', item.barColor)}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </Label>
                    );
                })}
            </RadioGroup>
        </div>
    );
}
