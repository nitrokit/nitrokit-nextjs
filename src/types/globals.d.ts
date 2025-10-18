import type { Gtag, DataLayerItem } from './gtag';

export interface Messages {
    common: typeof import('../../messages/en/validations.json');
    app: typeof import('../../messages/en/app.json');
    auth: typeof import('../../messages/en/auth.json');
    home: typeof import('../../messages/en/home.json');
    about: typeof import('../../messages/en/about.json');
    contact: typeof import('../../messages/en/contact.json');
    pricing: typeof import('../../messages/en/pricing.json');
    faq: typeof import('../../messages/en/faq.json');
    email: typeof import('../../messages/en/email.json');
}

declare global {
    interface Window {
        gtag: Gtag;
        dataLayer: DataLayerItem[];
    }
}

export {};
