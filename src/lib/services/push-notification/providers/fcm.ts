/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PushNotificationProvider, PushNotificationData, PushNotificationResult } from '../types';
import * as admin from 'firebase-admin';

export interface FCMProviderConfig {
    serviceAccount: string;
}

class FCMProvider implements PushNotificationProvider {
    private app: admin.app.App;

    constructor(config: FCMProviderConfig) {
        const appName = 'nitrokit-fcm';
        const alreadyInitializedApp = admin.apps.find((app) => app?.name === appName);

        if (alreadyInitializedApp) {
            this.app = alreadyInitializedApp;
        } else {
            this.app = admin.initializeApp(
                {
                    credential: admin.credential.cert(JSON.parse(config.serviceAccount))
                },
                appName
            );
        }
    }

    async sendNotification(data: PushNotificationData): Promise<PushNotificationResult> {
        try {
            const payload: any = {
                notification: {
                    title: data.title,
                    body: data.body
                },
                data: data.data
            };

            if (Array.isArray(data.to)) {
                const multicastMessage: admin.messaging.MulticastMessage = {
                    ...payload,
                    tokens: data.to
                };
                const response = await this.app.messaging().sendEachForMulticast(multicastMessage);
                if (response.successCount > 0) {
                    return { success: true, messageId: 'multicast-batch' };
                }
                throw new Error(`FCM multicast failed: ${response.failureCount} failures.`);
            } else if (data.to.startsWith('/topics/')) {
                payload.topic = data.to;
                const response = await this.app.messaging().send(payload);
                return { success: true, messageId: response };
            } else {
                payload.token = data.to;
                const response = await this.app.messaging().send(payload);
                return { success: true, messageId: response };
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown FCM error';
            return { success: false, error: errorMessage };
        }
    }
}
export function createFCMProvider(config: FCMProviderConfig): PushNotificationProvider {
    return new FCMProvider(config);
}
