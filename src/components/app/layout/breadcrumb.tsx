'use client';

import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { translateSafely } from '@/lib/utils';

function filterLocaleSegments(segments: string[]) {
    const localePatterns = [/^[a-z]{2}$/, /^[a-z]{2}-[A-Z]{2}$/, /^[a-z]{3}$/];
    return segments.filter((segment) => !localePatterns.some((pattern) => pattern.test(segment)));
}

type BreadcrumbItemType = {
    name: string;
    href: string;
};

export function AppBreadcrumb() {
    const pathname = usePathname();
    const t = useTranslations('app.navigation');

    const segments = pathname.split('/').filter(Boolean);
    const pathSegments = filterLocaleSegments(segments);

    const breadcrumbs: BreadcrumbItemType[] = [
        { name: translateSafely(t, 'dashboard'), href: '/' }
    ];

    pathSegments.forEach((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const translationKey = segment.replace(/-/g, '_');
        let name = translateSafely(t, translationKey);

        if (name === translationKey) {
            name = segment.replace(/-/g, ' ');
        }
        breadcrumbs.push({ name, href });
    });

    return (
        <Breadcrumb className="hidden lg:flex">
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <Fragment key={breadcrumb.href}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
