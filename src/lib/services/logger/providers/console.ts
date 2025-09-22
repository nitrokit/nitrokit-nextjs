import { LoggerProvider, LogMetadata, UserInfo } from '../types';

export class ConsoleProvider implements LoggerProvider {
    private formatMessage(level: string, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    }

    private formatMetadata(metadata?: LogMetadata): string {
        if (!metadata) return '';

        try {
            return JSON.stringify(metadata, null, 2);
        } catch {
            return '[Unable to serialize metadata]';
        }
    }

    info(message: string, metadata?: LogMetadata): void {
        const formattedMessage = `ℹ️ ${this.formatMessage('info', message)}`;

        if (metadata && Object.keys(metadata).length > 0) {
            console.info(formattedMessage);
            console.info('Metadata:', this.formatMetadata(metadata));
        } else {
            console.info(formattedMessage);
        }
    }

    warn(message: string, metadata?: LogMetadata): void {
        const formattedMessage = `⚠️ ${this.formatMessage('warn', message)}`;

        if (metadata && Object.keys(metadata).length > 0) {
            console.warn(formattedMessage);
            console.warn('Metadata:', this.formatMetadata(metadata));
        } else {
            console.warn(formattedMessage);
        }
    }

    error(message: string, error?: Error, metadata?: LogMetadata): void {
        const formattedMessage = `❌ ${this.formatMessage('error', message)}`;
        console.error(formattedMessage);

        if (error) {
            console.error('Error Details:', {
                name: error.name,
                message: error.message,
                stack: error.stack,
            });
        }

        if (metadata && Object.keys(metadata).length > 0) {
            console.error('Metadata:', this.formatMetadata(metadata));
        }
    }

    logUserAction(userId: string, action: string, resource?: string, metadata?: LogMetadata): void {
        const actionDescription = resource
            ? `User ${userId} performed ${action} on ${resource}`
            : `User ${userId} performed ${action}`;

        const formattedMessage = `👤 ${this.formatMessage('action', actionDescription)}`;
        console.info(formattedMessage);

        if (metadata && Object.keys(metadata).length > 0) {
            console.info('Action Metadata:', this.formatMetadata(metadata));
        }
    }

    setUser(userId: string, userInfo: UserInfo): void {
        const message = `User identified: ${userId}`;
        const formattedMessage = `👤 ${this.formatMessage('user', message)}`;
        console.info(formattedMessage);

        if (Object.keys(userInfo).length > 0) {
            console.info('User Info:', {
                email: userInfo.email,
                name: userInfo.name,
                role: userInfo.role,
                lastLoginAt: userInfo.lastLoginAt,
            });
        }
    }
}
