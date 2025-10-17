import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/comp/ui';
import React from 'react';

interface FormCardProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    footer?: React.ReactNode;
}

export function FormCard({ children, title, description, footer }: FormCardProps) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter className="flex-col gap-2">{footer}</CardFooter>
        </Card>
    );
}
