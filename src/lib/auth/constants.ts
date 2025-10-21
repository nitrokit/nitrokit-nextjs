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
    HOME: '/app',
    SUPPORT: '/app/support',
    INVOICES: '/app/invoices',
    SECURITY: '/app/security',
    ACCOUNT: '/app/account',
    ACCOUNT_PROFILE: '/app/account/profile',
    ACCOUNT_NOTIFICATIONS: '/app/account/notifications',
    SECURITY_PASSWORD: '/app/security/password',
    SECURITY_2FA: '/app/security/two-factor',
    SECURITY_SESSIONS: '/app/security/sessions'
};

export const ADMIN_ROUTES = {
    HOME: '/admin'
};
