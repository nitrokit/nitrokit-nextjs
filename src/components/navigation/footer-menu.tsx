import { ArrowRight, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CustomLink } from '.';

interface FooterMenuProps {
    title: string;
    icon: LucideIcon;
    iconBgColor: string;
    iconTextColor: string;
    links: Array<{ name: string; href: string }>;
}

export function FooterMenu({
    title,
    icon: Icon,
    iconBgColor,
    iconTextColor,
    links
}: FooterMenuProps) {
    const t = useTranslations();

    return (
        <div>
            <h3 className="text-foreground mb-4 flex items-center gap-2 font-semibold">
                <div className={`flex h-6 w-6 items-center justify-center rounded ${iconBgColor}`}>
                    <Icon className={`h-3 w-3 ${iconTextColor}`} />
                </div>
                {title}
            </h3>
            <nav className="space-y-3">
                {links.map((item, index) => (
                    <CustomLink
                        key={index}
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground group flex items-center text-sm transition-colors"
                    >
                        <span>{t(item.name as any)}</span>
                        <ArrowRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    </CustomLink>
                ))}
            </nav>
        </div>
    );
}
