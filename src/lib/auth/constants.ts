export const AUTH_ROUTES = {
    SIGN_IN: '/login',
    SIGN_OUT: '/logout',
    ERROR: '/error',
    VERIFY_REQUEST: '/verify-request',
    NEW_USER: '/register',
    NEW_USER_VERIFY_EMAIL_SENT: '/verify/email-sent',
    NEW_USER_VERIFY_EMAIL: '/verify/email',
    PASSWORD_RESET: '/password/reset',
    PASSWORD_RESET_SENT: '/password/reset-sent',
    PASSWORD_NEW: '/password/new',
    PASSWORD_CHECK_EMAIL: '/password/check-email',
    PASSWORD_CHANGED: '/password/changed'
} as const;

export const APP_ROUTES = {
    HOME: '/app/',
    SUPPORT: '/app/support',
    INVOICES: '/app/invoices',
    ACCOUNT: '/app/account',
    PROFILE: '/app/account/profile',
    SECURITY: '/app/account/security',
    SECURITY_PASSWORD: '/app/account/security/password',
    SECURITY_2FA: '/app/account/security/2fa',
    SECURITY_SESSIONS: '/app/account/security/sessions',
    NOTIFICATIONS: '/app/account/notifications',
    EMAIL_VERIFY: '/app/account/email/verify'
};

export const ADMIN_ROUTES = {
    HOME: '/admin'
};
