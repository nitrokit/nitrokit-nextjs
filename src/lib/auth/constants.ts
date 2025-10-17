/**
 * NextAuth.js tarafından kullanılan varsayılan yönlendirme rotalarını tanımlar.
 * Bu sabitleri projenin herhangi bir yerinde kullanmak, tek bir kaynak (Source of Truth) sağlar.
 */
export const AUTH_ROUTES = {
    SIGN_IN: '/login',
    SIGN_OUT: '/logout',
    SIGN_UP: '/register',
    ERROR: '/error',
    VERIFY_REQUEST: '/verify-request',
    NEW_USER: '/register',
    APP: '/app',
    PASSWORD_RESET: '/password/reset',
    PASSWORD_NEW: '/password/new',
    PASSWORD_CHECK_EMAIL: '/password/check-email',
    PASSWORD_CHANGED: '/password/changed'
} as const;
