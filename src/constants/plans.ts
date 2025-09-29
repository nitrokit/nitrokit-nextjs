import { PricingPlan, PricingPlanId } from '@/types/pricing';

export const PLANS: PricingPlan[] = [
    {
        id: PricingPlanId.FREELANCER,
        monthlyPrice: 19,
        yearlyPrice: 190,
        features: ['5products', 'upto1000subscribers', 'basicanalytics', '48hoursupport'],
        isFeatured: false,
    },
    {
        id: PricingPlanId.STARTUP,
        monthlyPrice: 49,
        yearlyPrice: 490,
        features: [
            '25products',
            'upto10000subscribers',
            'advancedanalytics',
            '24hoursupport',
            'marketingautomations',
        ],
        isFeatured: true,
    },
    {
        id: PricingPlanId.PRO,
        monthlyPrice: 99,
        yearlyPrice: 990,
        features: [
            'unlimitedproducts', // Removed 'features.' prefix
            'unlimitedsubscribers',
            'advancedanalytics',
            '1hoursupport',
            'marketingautomations',
        ],
        isFeatured: false,
    },
];
