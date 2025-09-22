export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';
export type LogProvider = 'sentry' | 'mixpanel' | 'posthog' | 'console';

// Generic metadata type
export interface LogMetadata {
    [key: string]: string | number | boolean | null | undefined | LogMetadata;
}

// User info type
export interface UserInfo {
    email?: string;
    name?: string;
    role?: string;
    lastLoginAt?: Date | string;
    [key: string]: string | number | boolean | Date | null | undefined;
}

// Error info type
export interface ErrorInfo {
    name: string;
    message: string;
    stack?: string;
    code?: string | number;
}

export interface LogEntry {
    level: LogLevel;
    message: string;
    metadata?: LogMetadata;
    timestamp: Date;
    userId?: string;
    action?: string;
    resource?: string;
    error?: ErrorInfo;
}

export interface LoggerProvider {
    info(message: string, metadata?: LogMetadata): void;
    warn(message: string, metadata?: LogMetadata): void;
    error(message: string, error?: Error, metadata?: LogMetadata): void;
    logUserAction(userId: string, action: string, resource?: string, metadata?: LogMetadata): void;
    setUser(userId: string, userInfo: UserInfo): void;
}
