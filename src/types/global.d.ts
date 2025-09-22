import type { Gtag, DataLayerItem } from './gtag';

declare global {
    interface Window {
        gtag: Gtag;
        dataLayer: DataLayerItem[];
    }
}

export {};
