import messages from '../../messages/declarations.d.json';

type Messages = typeof messages;

export enum PricingPlanId {
    FREELANCER = 'freelancer',
    STARTUP = 'startup',
    PRO = 'pro',
    ENTERPRISE = 'enterprise'
}

export interface PricingPlan {
    id: PricingPlanId;
    monthlyPrice: number;
    yearlyPrice: number;
    features: Array<keyof Messages['pricing']['features']>;
    isFeatured: boolean;
}

export interface PricingProps {
    plans: PricingPlan[];
}
