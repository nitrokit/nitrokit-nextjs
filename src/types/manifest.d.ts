declare module 'next/dist/lib/metadata/types/manifest-types' {
    /**
     * Augments the Manifest interface to include the GCM Sender ID required for Web Push.
     * @see https://developer.chrome.com/docs/extensions/reference/gcm/
     */
    interface Manifest {
        gcm_sender_id?: string;
    }
}
