export interface EmailResult {
    success: boolean;
    messageId?: string;
    error?: string;
    retryAfter?: number;
}

export interface EmailAttachment {
    filename: string;
    content: Buffer | string;
    contentType: string;
    disposition?: 'attachment' | 'inline';
    cid?: string;
}

export interface EmailData {
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: EmailAttachment[];
    replyTo?: string;
    priority?: 'high' | 'normal' | 'low';
    metadata?: Record<string, string | number | boolean>;
    templateId?: string;
    templateData?: Record<string, string | number | boolean>;
}

export interface EmailProvider {
    sendEmail(data: EmailData): Promise<EmailResult>;
    validateConfig(): void;
    getProviderName(): string;
}

export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    html: string;
    text?: string;
    variables?: string[];
}

export interface BulkEmailResult {
    total: number;
    successful: number;
    failed: number;
    results: EmailResult[];
}
