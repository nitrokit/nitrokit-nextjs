'use client';

import { useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CheckIcon } from '@/components/icons/check';
import { PricingProps } from '@/types/pricing';
import { BillingCycleToggle } from './billging-cycle-toggle';
import { DEFAULT_CURRENCY } from '@/constants/app';

export default function PricingSection({ plans }: PricingProps) {
    const t = useTranslations('pricing');
    const [billingCycle, setBillingCycle] = useState('yearly');
    const format = useFormatter();
    return (
        <div>
            <div className="my-10 flex flex-col items-center justify-center">
                <BillingCycleToggle
                    billingCycle={billingCycle}
                    onBillingCycleChange={setBillingCycle}
                />
                <div className="mt-4 h-5 text-sm">
                    {billingCycle === 'yearly' && (
                        <p>
                            {t.rich('annual-payment', {
                                span: (children) => (
                                    <span className="font-bold text-fuchsia-700">{children}</span>
                                ),
                            })}
                        </p>
                    )}
                </div>
            </div>

            <div className={'mt-6 grid grid-cols-1 items-end gap-0 md:grid-cols-2 lg:grid-cols-3'}>
                {plans.map((plan) => {
                    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                    const priceSuffixKey =
                        billingCycle === 'monthly' ? 'pricePerMonth' : 'pricePerYear';

                    const heightClass = plan.isFeatured
                        ? 'min-h-[34rem] lg:scale-[1.05]'
                        : 'min-h-[28rem]';
                    const titleColor = plan.isFeatured
                        ? 'text-blue-500 dark:text-cyan-500'
                        : 'text-neutral-800 dark:text-neutral-200';
                    const titleSize = plan.isFeatured ? 'text-3xl' : 'text-2xl';

                    const cardWrapperClasses = 'flex flex-col mb-5 lg:mb-0';
                    const cardClasses =
                        'flex flex-col justify-between rounded-lg border-1 bg-white shadow-xs p-6 lg:shadow-lg dark:bg-black';

                    return (
                        <div key={plan.id} className={cardWrapperClasses}>
                            <div className={`${cardClasses} ${heightClass}`}>
                                <h3
                                    className={`${titleSize} font-semibold text-shadow-xs ${titleColor} text-center`}
                                >
                                    {t(`${plan.id}.title`)}
                                </h3>
                                <p className="mt-6 text-center text-base/7 text-neutral-600 dark:text-neutral-300">
                                    {t(`${plan.id}.description`)}
                                </p>
                                <p className="mt-4 flex items-end justify-center gap-0.5">
                                    <span className={'text-5xl font-semibold tracking-tight'}>
                                        {format.number(price, {
                                            style: 'currency',
                                            currency: DEFAULT_CURRENCY,
                                            maximumFractionDigits: 0,
                                        })}
                                    </span>
                                    <span className="text-base font-medium text-gray-500">
                                        /{t(`${priceSuffixKey}`)}
                                    </span>
                                </p>
                                <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
                                <ul className="mt-4 space-y-3 text-sm/6">
                                    {plan.features.map((feature, index) => {
                                        return (
                                            <li key={index} className="flex gap-x-3">
                                                <CheckIcon
                                                    aria-hidden="true"
                                                    className="h-6 w-5 flex-none text-blue-600"
                                                />
                                                {t(`features.${feature}`)}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <Button
                                    variant={plan.isFeatured ? 'default' : 'outline'}
                                    size={'xl'}
                                    className={`mt-10 w-full ${plan.isFeatured ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-l' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800/50'}`}
                                >
                                    {t('purchasePlan')}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
