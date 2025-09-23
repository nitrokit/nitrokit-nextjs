import {
    Home as IconHome,
    Info as IconInfo,
    CreditCard as IconCreditCard,
    MessageCircle as IconMessageCircle,
    HandPlatter as IconHandPlatter,
    TableOfContents as IconTableOfContents,
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
    { name: 'navigation.faq', description: '', path: '/faq/', icon: IconTableOfContents },
    { name: 'navigation.contact', description: '', path: '/contact/', icon: IconMessageCircle },
] as const;

const ROUTES = NAV_LINKS.map((link) => link.path.replace(/\//g, '')).filter(Boolean);

type RouteId = (typeof ROUTES)[number] | 'home';

export { NAV_LINKS, ROUTES };
export type { NavLink, RouteId };
