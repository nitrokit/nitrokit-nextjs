import { Link } from '@/lib/i18n/navigation';
import { UrlObject } from 'url';

interface CustomLinkProps {
    href: string | UrlObject;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const isInternalLink = (href: string | UrlObject): boolean => {
    if (typeof href !== 'string') return true;

    try {
        const url = new URL(href, window.location.origin);
        return url.hostname === window.location.hostname;
    } catch {
        return true;
    }
};

export function CustomLink({ href, children, className, ...props }: CustomLinkProps) {
    const hrefString = typeof href === 'string' ? href : href.pathname || '';
    const internal = isInternalLink(href);

    if (!internal) {
        return (
            <a href={hrefString} className={className} {...props}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={className} {...props}>
            {children}
        </Link>
    );
}
