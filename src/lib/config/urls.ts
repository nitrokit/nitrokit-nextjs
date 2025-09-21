/**
 * Retrieves the base URL for the application.
 * It checks for the following environment variables in order:
 * 1. NEXT_PUBLIC_APP_URL
 * 2. VERCEL_PROJECT_PRODUCTION_URL (if VERCEL_ENV is 'production')
 * 3. VERCEL_URL
 * If none of these are set, it defaults to 'http://localhost:3000'.
 * @returns {string} The base URL.
 */
export function getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL;
    }

    if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    return 'http://localhost:3000';
}
