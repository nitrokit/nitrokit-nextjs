export const AUTH_ROUTES = {
    SIGN_IN: '/login',
    SIGN_OUT: '/logout',
    ERROR: '/error',
    VERIFY_REQUEST: '/verify-request',
    NEW_USER: '/register',
    NEW_USER_VERIFY_EMAIL_SENT: '/verify/email-sent',
    NEW_USER_VERIFY_EMAIL: '/verify/email',
    APP: '/app',
    PASSWORD_RESET: '/password/reset',
    PASSWORD_RESET_SENT: '/password/reset-sent',
    PASSWORD_NEW: '/password/new',
    PASSWORD_CHECK_EMAIL: '/password/check-email',
    PASSWORD_CHANGED: '/password/changed'
} as const;
