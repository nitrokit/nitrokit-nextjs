import type { Gtag, DataLayerItem } from './gtag';

export interface Messages {
    common: typeof import('../../messages/en/common.json');
    app: typeof import('../../messages/en/app.json');
    metadata: typeof import('../../messages/en/metadata.json');
}

declare global {
    interface Window {
        gtag: Gtag;
        dataLayer: DataLayerItem[];
    }
    interface IntlMessages extends Messages {}
}

export {};
