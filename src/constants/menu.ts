import {
    Home as IconHome,
    Info as IconInfo,
    CreditCard as IconCreditCard,
    MessageCircle as IconMessageCircle,
    LucideIcon
} from 'lucide-react';

interface NavLink {
    readonly name: string;
    readonly description: string;
    readonly path: string;
    readonly icon: LucideIcon;
}

const NAV_LINKS: readonly NavLink[] = [
    { name: 'common.navigation.home', description: '', path: '/', icon: IconHome },
    { name: 'common.navigation.about', description: '', path: '/about/', icon: IconInfo },
    { name: 'common.navigation.pricing', description: '', path: '/pricing/', icon: IconCreditCard },
    {
        name: 'common.navigation.contact',
        description: '',
        path: '/contact/',
        icon: IconMessageCircle
    }
] as const;

const FOOTER_LINKS = {
    SECTION1: [
        { name: 'common.navigation.features', href: '#', noLocale: false },
        { name: 'common.navigation.pricing', href: '#', noLocale: false },
        {
            name: 'common.navigation.docs',
            href: '#',
            noLocale: true
        },
        { name: 'common.navigation.storybook', href: '#', noLocale: true }
    ],
    SECTION2: [
        { name: 'common.navigation.getting_started', href: '#', noLocale: false },
        { name: 'common.navigation.faq', href: '#', noLocale: false },
        {
            name: 'common.navigation.community',
            href: 'https://github.com/mustafagenc/nitrokit/discussions',
            noLocale: true
        },
        { name: 'common.navigation.contact', href: '/contact', noLocale: false }
    ]
};

const PUBLIC_ROUTES = [
    NAV_LINKS.map((link) => link.path),
    '/faq',
    '/privacy',
    '/terms',
    '/login',
    '/error',
    '/verify-request',
    '/register'
];

const ROUTES = NAV_LINKS.map((link) => link.path.replace(/\//g, '')).filter(Boolean);

type RouteId = (typeof ROUTES)[number];

export { NAV_LINKS, FOOTER_LINKS, ROUTES, PUBLIC_ROUTES };
export type { NavLink, RouteId };
