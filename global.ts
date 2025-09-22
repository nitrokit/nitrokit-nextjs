import { routing } from '@/lib/i18n/routing';
import { Messages } from './src/types/global';

declare module 'next-intl' {
    interface AppConfig {
        Locale: (typeof routing.locales)[number];
        Messages: Messages;
    }
}
