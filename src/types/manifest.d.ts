import 'next/dist/lib/metadata/types/manifest-types';

declare module 'next/dist/lib/metadata/types/manifest-types' {
    /**
     * @see https://developer.chrome.com/docs/extensions/reference/gcm/
     */
    interface Manifest {
        gcm_sender_id?: string;
    }
}

export {};
