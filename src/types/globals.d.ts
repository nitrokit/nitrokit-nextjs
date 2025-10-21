import type { Gtag, DataLayerItem } from './gtag';

export interface Messages {
    validations: typeof import('../../messages/en/validations.json');
    app: typeof import('../../messages/en/app/app.json');
    auth: typeof import('../../messages/en/auth.json');
    home: typeof import('../../messages/en/website/home.json');
    about: typeof import('../../messages/en/website/about.json');
    contact: typeof import('../../messages/en/website/contact.json');
    pricing: typeof import('../../messages/en/website/pricing.json');
    faq: typeof import('../../messages/en/website/faq.json');
    email: typeof import('../../messages/en/email.json');
    common: typeof import('../../messages/en/common.json');
}

declare global {
    interface Window {
        gtag: Gtag;
        dataLayer: DataLayerItem[];
    }
}

export {};
