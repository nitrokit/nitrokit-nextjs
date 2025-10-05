import { LogLevel, LoggerProvider, LogMetadata, UserInfo } from './types';
import { createLoggerProvider } from './providers';

interface DeviceInfo {
    deviceType: 'desktop' | 'mobile' | 'tablet';
    browser: string;
    os: string;
}

interface SecurityEventDetails {
    ip?: string;
    userAgent?: string;
    location?: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    [key: string]: string | number | boolean | undefined;
}

interface LoggerContext {
    userId?: string;
    sessionId?: string;
    ip?: string;
    userAgent?: string;
    requestId?: string;
}

class Logger {
    private provider: LoggerProvider;
    private level: LogLevel;
    private context: LoggerContext = {};

    constructor() {
        const providerName = process.env.NEXT_PUBLIC_LOG_PROVIDER || 'console';
        this.level = (process.env.LOG_LEVEL as LogLevel) || 'info';
        this.provider = createLoggerProvider(providerName);
    }

    setContext(context: Partial<LoggerContext>): void {
        this.context = { ...this.context, ...context };
    }

    setUserId(userId: string): void {
        this.context.userId = userId;
    }

    setSessionId(sessionId: string): void {
        this.context.sessionId = sessionId;
    }

    setRequestContext(ip?: string, userAgent?: string, requestId?: string): void {
        this.context = {
            ...this.context,
            ip,
            userAgent,
            requestId
        };
    }

    clearContext(): void {
        this.context = {};
    }

    clearUserId(): void {
        delete this.context.userId;
    }

    getContext(): LoggerContext {
        return { ...this.context };
    }

    private enrichMetadata(metadata?: LogMetadata): LogMetadata {
        const enriched: LogMetadata = {
            ...metadata,
            timestamp: new Date().toISOString()
        };

        // Add context data
        if (this.context.userId) enriched.userId = this.context.userId;
        if (this.context.sessionId) enriched.sessionId = this.context.sessionId;
        if (this.context.ip) enriched.ip = this.context.ip;
        if (this.context.userAgent) enriched.userAgent = this.context.userAgent;
        if (this.context.requestId) enriched.requestId = this.context.requestId;

        return enriched;
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: Record<LogLevel, number> = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
            critical: 4
        };
        return levels[level] >= levels[this.level];
    }

    debug(message: string, metadata?: LogMetadata): void {
        if (this.shouldLog('debug')) {
            const enrichedMetadata = this.enrichMetadata(metadata);
            console.debug(`🐛 [DEBUG] ${message}`, enrichedMetadata);
        }
    }

    info(message: string, metadata?: LogMetadata): void {
        if (this.shouldLog('info')) {
            this.provider.info(message, this.enrichMetadata(metadata));
        }
    }

    warn(message: string, metadata?: LogMetadata): void {
        if (this.shouldLog('warn')) {
            this.provider.warn(message, this.enrichMetadata(metadata));
        }
    }

    error(message: string, error?: Error, metadata?: LogMetadata): void {
        this.provider.error(message, error, this.enrichMetadata(metadata));
    }

    critical(message: string, error?: Error, metadata?: LogMetadata): void {
        const enrichedMetadata = this.enrichMetadata(metadata);
        console.error(`🚨 CRITICAL: ${message}`, error, enrichedMetadata);
        this.provider.error(`CRITICAL: ${message}`, error, enrichedMetadata);
    }

    // Simplified methods that use context
    logUserAction(action: string, resource?: string, metadata?: LogMetadata): void {
        if (!this.context.userId) {
            this.warn('logUserAction called without userId in context', { action, resource });
            return;
        }

        this.provider.logUserAction(
            this.context.userId,
            action,
            resource,
            this.enrichMetadata(metadata)
        );
    }

    // Legacy method for backward compatibility
    logUserActionWithId(
        userId: string,
        action: string,
        resource?: string,
        metadata?: LogMetadata
    ): void {
        this.provider.logUserAction(userId, action, resource, this.enrichMetadata(metadata));
    }

    setUser(userInfo: UserInfo): void {
        if (!this.context.userId) {
            this.warn('setUser called without userId in context');
            return;
        }

        this.provider.setUser(this.context.userId, userInfo);
    }

    // Legacy method for backward compatibility
    setUserWithId(userId: string, userInfo: UserInfo): void {
        this.provider.setUser(userId, userInfo);
    }

    // Simplified session methods
    logSessionCreate(sessionId: string, deviceInfo: DeviceInfo): void {
        if (!this.context.userId) {
            this.warn('logSessionCreate called without userId in context', { sessionId });
            return;
        }

        this.logUserAction('session_create', sessionId, {
            deviceType: deviceInfo.deviceType,
            browser: deviceInfo.browser,
            os: deviceInfo.os
        });
    }

    logSessionTerminate(sessionId: string, terminatedBy: string): void {
        if (!this.context.userId) {
            this.warn('logSessionTerminate called without userId in context', { sessionId });
            return;
        }

        this.logUserAction('session_terminate', sessionId, {
            terminatedBy
        });
    }

    logSecurityEvent(event: string, details: SecurityEventDetails): void {
        if (!this.context.userId) {
            this.warn('logSecurityEvent called without userId in context', { event });
            return;
        }

        this.warn(`Security Event: ${event}`, {
            event,
            ...details
        });
    }

    // Convenience methods for common actions
    logLogin(method: 'email' | 'google' | 'github' = 'email'): void {
        this.logUserAction('user_login', 'auth', { method });
    }

    logLogout(): void {
        this.logUserAction('user_logout', 'auth');
    }

    logPageView(page: string): void {
        this.logUserAction('page_view', page);
    }

    logFeatureUsage(feature: string, details?: LogMetadata): void {
        this.logUserAction('feature_usage', feature, details);
    }

    logApiCall(endpoint: string, method: string, statusCode?: number): void {
        this.info(`API Call: ${method} ${endpoint}`, {
            endpoint,
            method,
            statusCode
        });
    }
}

export const logger = new Logger();
