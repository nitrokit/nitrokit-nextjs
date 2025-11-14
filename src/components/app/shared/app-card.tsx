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
import { Loader } from 'lucide-react';
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
        VariantProps<typeof appCardVariants> {
    loading?: boolean;
}

const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
    ({ className, variant, children, loading = false, ...props }, ref) => (
        <AppCardContext.Provider value={{ variant }}>
            <Card
                ref={ref}
                className={cn('relative', 'min-h-80', appCardVariants({ variant, className }))}
                {...props}
            >
                {loading && (
                    <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center">
                        <Loader className="ml-4 size-10 h-6 w-6 animate-spin" />
                    </div>
                )}
                <div className={cn({ 'pointer-events-none blur-xs': loading })}>{children}</div>
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
    ({ className, children, ...props }, ref) => (
        <CardContent ref={ref} className={cn('px-4', className)} {...props}>
            {children}
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
