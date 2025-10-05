import { ROUTES } from '@/constants';
import { getBaseUrl } from '@/lib';

import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseUrl();
    const lastModified = new Date('2025-05-18T00:00:00Z').toISOString();

    const staticRoutes = ROUTES.map((route) => {
        const normalizedRoute = `${route.replace(/^(?:\/)|(?:\/)$/g, '')}`;
        return {
            url: new URL(normalizedRoute.replace(/^\/|\/$/g, ''), baseUrl).toString(),
            lastModified: lastModified
        };
    });

    //ToDo:
    await Promise.all(staticRoutes.map(async () => {}));

    return [...staticRoutes];
}
