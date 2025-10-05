import {
    Home as IconHome,
    Info as IconInfo,
    CreditCard as IconCreditCard,
    MessageCircle as IconMessageCircle,
    HandPlatter as IconHandPlatter,
    LucideIcon
} from 'lucide-react';

interface NavLink {
    readonly name: string;
    readonly description: string;
    readonly path: string;
    readonly icon: LucideIcon;
}

const NAV_LINKS: readonly NavLink[] = [
    { name: 'app.navigation.home', description: '', path: '/', icon: IconHome },
    { name: 'app.navigation.about', description: '', path: '/about/', icon: IconInfo },
    { name: 'app.navigation.services', description: '', path: '/services/', icon: IconHandPlatter },
    { name: 'app.navigation.pricing', description: '', path: '/pricing/', icon: IconCreditCard },
    { name: 'app.navigation.contact', description: '', path: '/contact/', icon: IconMessageCircle }
] as const;

const FOOTER_LINKS = {
    SECTION1: [
        { name: 'app.navigation.features', href: '/features', noLocale: false },
        { name: 'app.navigation.pricing', href: '/pricing', noLocale: false },
        {
            name: 'app.navigation.docs',
            href: 'https://github.com/mustafagenc/nitrokit/wiki',
            noLocale: true
        },
        { name: 'app.navigation.storybook', href: 'https://storybook.nitrokit.tr', noLocale: true }
    ],
    SECTION2: [
        { name: 'app.navigation.getting_started', href: '/docs/getting-started', noLocale: false },
        { name: 'app.navigation.faq', href: '/faq', noLocale: false },
        {
            name: 'app.navigation.community',
            href: 'https://github.com/mustafagenc/nitrokit/discussions',
            noLocale: true
        },
        { name: 'app.navigation.contact', href: '/contact', noLocale: false }
    ]
};

const PUBLIC_ROUTES = [
    NAV_LINKS.map((link) => link.path),
    '/faq',
    '/privacy',
    '/login',
    '/error',
    '/verify-request',
    '/register'
];

const ROUTES = NAV_LINKS.map((link) => link.path.replace(/\//g, '')).filter(Boolean);

type RouteId = (typeof ROUTES)[number];

export { NAV_LINKS, FOOTER_LINKS, ROUTES, PUBLIC_ROUTES };
export type { NavLink, RouteId };
