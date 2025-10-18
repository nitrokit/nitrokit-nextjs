export const AUTH_ROUTES = {
    SIGN_IN: '/login',
    SIGN_OUT: '/logout',
    SIGN_UP: '/register',
    ERROR: '/error',
    VERIFY_REQUEST: '/verify-request',
    NEW_USER: '/register',
    APP: '/app',
    PASSWORD_RESET: '/password/reset',
    PASSWORD_RESET_SENT: '/password/reset-sent',
    PASSWORD_NEW: '/password/new',
    PASSWORD_CHECK_EMAIL: '/password/check-email',
    PASSWORD_CHANGED: '/password/changed'
} as const;
