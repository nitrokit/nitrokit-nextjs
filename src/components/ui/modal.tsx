'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

interface ModalProps {
    trigger?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    className?: string;
}

export function Modal({
    trigger,
    title,
    description,
    children,
    footer,
    className,
    onOpenChange,
    open
}: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className={cn('sm:max-w-lg', className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <div className="py-4">{children}</div>

                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
