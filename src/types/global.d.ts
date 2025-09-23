import type { Gtag, DataLayerItem } from './gtag';

export interface Messages {
    common: typeof import('../../messages/en/common.json');
    app: typeof import('../../messages/en/app.json');
    metadata: typeof import('../../messages/en/metadata.json');
    auth: typeof import('../../messages/en/auth.json');
    home: typeof import('../../messages/en/home.json');
    about: typeof import('../../messages/en/about.json');
    contact: typeof import('../../messages/en/contact.json');
    services: typeof import('../../messages/en/services.json');
    pricing: typeof import('../../messages/en/pricing.json');
    navigation: typeof import('../../messages/en/navigation.json');
    faq: typeof import('../../messages/en/faq.json');
}

declare global {
    interface Window {
        gtag: Gtag;
        dataLayer: DataLayerItem[];
    }
}

export {};
