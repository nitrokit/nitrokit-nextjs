'use client';

import { ToggleGroup, ToggleGroupItem } from '@/comp/ui';
import { useTranslations } from 'next-intl';

interface BillingCycleToggleProps {
    billingCycle: string;
    onBillingCycleChange: (value: string) => void;
}

export function BillingCycleToggle({
    billingCycle,
    onBillingCycleChange
}: BillingCycleToggleProps) {
    const t = useTranslations('pricing');

    return (
        <ToggleGroup
            type="single"
            defaultValue="yearly"
            value={billingCycle}
            onValueChange={(value: string) => {
                if (value) onBillingCycleChange(value);
            }}
            className="inline-flex rounded-full border border-neutral-200 bg-neutral-100 p-0.5 duration-1000 ease-out dark:border-neutral-700 dark:bg-neutral-800"
        >
            <ToggleGroupItem
                value="monthly"
                className="cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 focus-visible:outline-none data-[state=off]:rounded-full data-[state=off]:text-neutral-600 data-[state=on]:rounded-full data-[state=on]:bg-white data-[state=on]:text-cyan-600 data-[state=on]:shadow-md dark:focus-visible:ring-offset-neutral-800 dark:data-[state=off]:text-neutral-400 data-[state=on]:dark:bg-black dark:data-[state=on]:text-cyan-400"
                aria-label={t('monthly')}
            >
                {t('monthly')}
            </ToggleGroupItem>
            <ToggleGroupItem
                value="yearly"
                className="cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 focus-visible:outline-none data-[state=off]:rounded-full data-[state=off]:text-neutral-600 data-[state=on]:rounded-full data-[state=on]:bg-white data-[state=on]:text-cyan-600 data-[state=on]:shadow-md dark:focus-visible:ring-offset-neutral-800 dark:data-[state=off]:text-neutral-400 data-[state=on]:dark:bg-black dark:data-[state=on]:text-cyan-400"
                aria-label={t('yearly')}
            >
                {t('yearly')}
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
