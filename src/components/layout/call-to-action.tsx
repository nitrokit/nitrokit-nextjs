import { ReactNode } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

type CallToActionVariant = 'gradient' | 'solid' | 'outline' | 'minimal';

interface CallToActionButton {
    href: string;
    label: string;
    variant?: 'primary' | 'secondary';
}

interface CallToActionSectionProps {
    title: string;
    description: string;
    buttons: CallToActionButton[];
    variant?: CallToActionVariant;
    className?: string;
    children?: ReactNode;
}

const variantStyles = {
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
    solid: 'bg-blue-600',
    outline: 'bg-transparent border-2 border-blue-600',
    minimal: 'bg-gray-50 dark:bg-gray-900'
};

const textStyles = {
    gradient: {
        title: 'text-white',
        description: 'text-blue-100'
    },
    solid: {
        title: 'text-white',
        description: 'text-blue-100'
    },
    outline: {
        title: 'text-blue-600 dark:text-blue-400',
        description: 'text-gray-600 dark:text-gray-300'
    },
    minimal: {
        title: 'text-gray-900 dark:text-white',
        description: 'text-gray-600 dark:text-gray-300'
    }
};

const buttonStyles = {
    gradient: {
        primary: 'bg-white text-blue-600 hover:bg-gray-100',
        secondary: 'border-2 border-white text-white hover:bg-white hover:text-blue-600'
    },
    solid: {
        primary: 'bg-white text-blue-600 hover:bg-gray-100',
        secondary: 'border-2 border-white text-white hover:bg-white hover:text-blue-600'
    },
    outline: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary:
            'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900'
    },
    minimal: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary:
            'border-2 border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
    }
};

export function CallToActionSection({
    title,
    description,
    buttons,
    variant = 'gradient',
    className,
    children
}: CallToActionSectionProps) {
    return (
        <section className={cn(variantStyles[variant], 'py-16', className)}>
            <div className="container mx-auto px-4 text-center">
                <h2
                    className={cn('mb-4 text-3xl font-bold sm:text-4xl', textStyles[variant].title)}
                >
                    {title}
                </h2>
                <p className={cn('mb-8 text-xl', textStyles[variant].description)}>{description}</p>

                {children && <div className="mb-8">{children}</div>}

                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    {buttons.map((button, index) => (
                        <Link
                            key={index}
                            href={button.href}
                            className={cn(
                                'inline-flex items-center rounded-lg px-6 py-3 text-lg font-medium transition-all duration-200',
                                buttonStyles[variant][button.variant || 'primary']
                            )}
                        >
                            {button.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
