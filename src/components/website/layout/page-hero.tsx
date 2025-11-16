import { ReactNode } from 'react';
import { cn } from '@nitrokit/core/lib';

type HeroVariant = 'default' | 'minimal' | 'large' | 'center';
type GradientVariant = 'blue' | 'purple' | 'green' | 'orange' | 'pink';

interface PageHeroProps {
    h1?: string;
    h2?: string;
    p?: string;
    variant?: HeroVariant;
    gradientVariant?: GradientVariant;
    className?: string;
    children?: ReactNode;
    showBreadcrumb?: boolean;
    breadcrumbItems?: { label: string; href?: string }[];
}

const variantStyles = {
    default: {
        container: 'mx-auto mb-10 max-w-3xl text-center leading-22',
        h2: 'font-semibold text-cyan-500 dark:text-shadow-2xs',
        h1: 'text-5xl leading-18 font-bold',
        p: 'mt-10 text-xl'
    },
    minimal: {
        container: 'mx-auto mb-8 max-w-2xl text-center',
        h2: 'text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400',
        h1: 'text-3xl font-bold',
        p: 'mt-4 text-lg text-gray-600 dark:text-gray-300'
    },
    large: {
        container: 'mx-auto mb-16 max-w-4xl text-center',
        h2: 'text-lg font-semibold text-cyan-500 dark:text-shadow-2xs',
        h1: 'text-6xl lg:text-7xl font-extrabold',
        p: 'mt-12 text-2xl'
    },
    center: {
        container: 'mx-auto mb-12 max-w-3xl text-center py-12',
        h2: 'font-semibold text-cyan-500 dark:text-shadow-2xs',
        h1: 'text-4xl md:text-5xl font-bold',
        p: 'mt-8 text-xl'
    }
};

const gradientStyles = {
    blue: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    purple: 'bg-gradient-to-r from-purple-500 to-pink-500',
    green: 'bg-gradient-to-r from-green-500 to-emerald-500',
    orange: 'bg-gradient-to-r from-orange-500 to-red-500',
    pink: 'bg-gradient-to-r from-pink-500 to-rose-500'
};

export function PageHero({
    h1 = '',
    h2 = '',
    p = '',
    variant = 'default',
    gradientVariant = 'blue',
    className,
    children,
    showBreadcrumb = false,
    breadcrumbItems = []
}: PageHeroProps) {
    const styles = variantStyles[variant];
    const gradientClass = gradientStyles[gradientVariant];

    return (
        <div className={cn(styles.container, className)}>
            {showBreadcrumb && breadcrumbItems.length > 0 && (
                <nav className="mb-6 flex justify-center" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm">
                        {breadcrumbItems.map((item, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && (
                                    <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
                                )}
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            )}

            {h2 && <h2 className={styles.h2}>{h2}</h2>}

            {h1 && (
                <h1
                    className={cn(
                        gradientClass,
                        'bg-clip-text text-transparent dark:text-shadow-2xs',
                        styles.h1
                    )}
                >
                    {h1}
                </h1>
            )}

            {children && <div className="mt-6">{children}</div>}

            {p && <p className={styles.p}>{p}</p>}
        </div>
    );
}
