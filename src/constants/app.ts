import { APP_ROUTES } from '@/lib/auth/constants';
import {
    HeartHandshake as IconHeartHandshake,
    Home as IconHome,
    ReceiptText as IconReceiptText
} from 'lucide-react';

export const AppNavigationItems = [
    { key: 'app.navigation.dashboard', href: APP_ROUTES.HOME, icon: IconHome },
    { key: 'app.navigation.invoices', href: APP_ROUTES.INVOICES, icon: IconReceiptText },
    { key: 'app.navigation.support', href: APP_ROUTES.SUPPORT, icon: IconHeartHandshake }
];
