import { PushNotificationProvider, PushNotificationData, PushNotificationResult } from '../types';

export interface FCMProviderConfig {
    serviceAccount: string;
}

class FCMProvider implements PushNotificationProvider {
    constructor(config: FCMProviderConfig) {
        // Firebase Admin SDK'yı burada başlatırsın
        /*
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(config.serviceAccount))
            });
        }
        */
        console.log(config);
    }

    async sendNotification(data: PushNotificationData): Promise<PushNotificationResult> {
        // Bu kısım, firebase-admin SDK'sı ile gerçek gönderim mantığını içerir.
        try {
            // const response = await admin.messaging().send({ ... });
            // 'await' uyarısını önlemek için asenkron bir işlemi simüle ediyoruz.
            console.log(data);
            await new Promise((resolve) => setTimeout(resolve, 50));
            const messageId = `fcm-mock-${Date.now()}`;
            return { success: true, messageId };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown FCM error';
            return { success: false, error: errorMessage };
        }
    }
}

export function createFCMProvider(config: FCMProviderConfig): PushNotificationProvider {
    return new FCMProvider(config);
}
