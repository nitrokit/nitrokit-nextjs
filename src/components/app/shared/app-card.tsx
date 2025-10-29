'use client';

import * as React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib';
import { cva, type VariantProps } from 'class-variance-authority';

const appCardVariants = cva('p-0', {
    variants: {
        variant: {
            default: 'border-border',
            warning: 'border-yellow-500/50 dark:border-yellow-400/50',
            danger: 'border-red-500/50 dark:border-red-400/50',
            success: 'border-green-500/50 dark:border-green-400/50'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});

interface AppCardContextProps {
    variant?: 'default' | 'warning' | 'danger' | 'success' | null;
}

const AppCardContext = React.createContext<AppCardContextProps>({
    variant: 'default'
});

export interface AppCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof appCardVariants> {}

const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
    ({ className, variant, children, ...props }, ref) => (
        <AppCardContext.Provider value={{ variant }}>
            <Card ref={ref} className={cn(appCardVariants({ variant, className }))} {...props}>
                {children}
            </Card>
        </AppCardContext.Provider>
    )
);
AppCard.displayName = 'AppCard';

const AppCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <CardHeader ref={ref} className={cn('p-4', className)} {...props} />
    )
);
AppCardHeader.displayName = 'AppCardHeader';

interface AppCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    icon?: React.ElementType;
}

const appCardTitleVariants = cva('flex items-center gap-2', {
    variants: {
        variant: {
            default: '',
            warning: 'text-yellow-500 dark:text-yellow-400',
            danger: 'text-red-500 dark:text-red-400',
            success: 'text-green-500 dark:text-green-400'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});

const AppCardTitle = React.forwardRef<HTMLParagraphElement, AppCardTitleProps>(
    ({ className, children, icon: Icon, ...props }, ref) => {
        const { variant } = React.useContext(AppCardContext);
        return (
            <CardTitle
                ref={ref}
                className={cn(appCardTitleVariants({ variant, className }))}
                {...props}
            >
                {Icon && <Icon className="h-5 w-5" />}
                {children}
            </CardTitle>
        );
    }
);
AppCardTitle.displayName = 'AppCardTitle';

const AppCardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <CardDescription ref={ref} className={cn(className)} {...props} />
));
AppCardDescription.displayName = 'AppCardDescription';

interface AppCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    loading?: boolean;
}

const AppCardContent = React.forwardRef<HTMLDivElement, AppCardContentProps>(
    ({ className, children, loading = false, ...props }, ref) => (
        <CardContent ref={ref} className={cn('px-4', className)} {...props}>
            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                children
            )}
        </CardContent>
    )
);
AppCardContent.displayName = 'AppCardContent';

const AppCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <CardFooter ref={ref} className={cn('p-0 pr-4 pb-4 pl-4', className)} {...props} />
    )
);
AppCardFooter.displayName = 'AppCardFooter';

export { AppCard, AppCardHeader, AppCardContent, AppCardFooter, AppCardTitle, AppCardDescription };
