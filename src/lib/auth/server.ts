import { redirect } from 'next/navigation';
import { auth } from './auth';
import { APP_ROUTES, AUTH_ROUTES } from './constants';

export async function requireAuth() {
    const session = await auth();

    if (!session) {
        redirect(`${AUTH_ROUTES.SIGN_IN}?callbackUrl=${APP_ROUTES.HOME}`);
    }

    return session;
}
