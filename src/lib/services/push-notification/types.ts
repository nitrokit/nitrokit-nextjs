export interface PushNotificationData {
    to: string | string[];
    title: string;
    body: string;
    data?: Record<string, string>;
    templateData?: Record<string, string | number | boolean>;
}

export interface PushNotificationResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

export interface BulkPushNotificationResult {
    total: number;
    successful: number;
    failed: number;
    results: PushNotificationResult[];
}

export interface PushNotificationProvider {
    sendNotification(data: PushNotificationData): Promise<PushNotificationResult>;
}
