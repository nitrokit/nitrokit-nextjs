import {
    Home as IconHome,
    Info as IconInfo,
    CreditCard as IconCreditCard,
    MessageCircle as IconMessageCircle,
    HandPlatter as IconHandPlatter,
    LucideIcon,
} from 'lucide-react';

interface NavLink {
    readonly name: string;
    readonly description: string;
    readonly path: string;
    readonly icon: LucideIcon;
}

const NAV_LINKS: readonly NavLink[] = [
    { name: 'navigation.home', description: '', path: '/', icon: IconHome },
    { name: 'navigation.about', description: '', path: '/about/', icon: IconInfo },
    { name: 'navigation.services', description: '', path: '/services/', icon: IconHandPlatter },
    { name: 'navigation.pricing', description: '', path: '/pricing/', icon: IconCreditCard },
    { name: 'navigation.contact', description: '', path: '/contact/', icon: IconMessageCircle },
] as const;

const PUBLIC_ROUTES = [
    NAV_LINKS.map((link) => link.path),
    '/faq',
    '/login',
    '/error',
    '/verify-request',
    '/register',
];

const ROUTES = NAV_LINKS.map((link) => link.path.replace(/\//g, '')).filter(Boolean);

type RouteId = (typeof ROUTES)[number] | 'home';

export { NAV_LINKS, ROUTES, PUBLIC_ROUTES };
export type { NavLink, RouteId };
