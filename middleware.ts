export { auth as middleware } from './src/lib/auth';

export const config = {
    matcher: ['/api/(.*)', '/((?!api|trpc|_next|_vercel|sitemap|robots|issues|.*\\..*).*)'],
};
