interface NavLink {
    readonly name: string;
    readonly description: string;
    readonly path: string;
}

const NAV_LINKS: readonly NavLink[] = [
    { name: 'navigation.home', description: '', path: '/' },
    { name: 'navigation.about', description: '', path: '/about/' },
    { name: 'navigation.services', description: '', path: '/services/' },
    { name: 'navigation.pricing', description: '', path: '/pricing/' },
    { name: 'navigation.faq', description: '', path: '/faq/' },
    { name: 'navigation.contact', description: '', path: '/contact/' },
] as const;

const ROUTES = NAV_LINKS.map((link) => link.path.replace(/\//g, '')).filter(Boolean);

type RouteId = (typeof ROUTES)[number] | 'home';

export { NAV_LINKS, ROUTES };
export type { NavLink, RouteId };
