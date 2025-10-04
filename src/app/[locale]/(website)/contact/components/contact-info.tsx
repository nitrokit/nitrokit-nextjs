'use client';

import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui';

const contactDetails = [
    {
        icon: MapPin,
        label: 'Address',
        value: 'Maslak Mahallesi, Büyükdere Cd. No:123',
        subValue: '34398 Şişli/İstanbul, Turkey',
        action: () => {
            const url = 'https://www.google.com/maps/search/?api=1&query=41.1064,29.0236';
            window.open(url, '_blank');
        },
        actionLabel: 'Get Directions',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+90 216 123 4567',
        action: () => window.open('tel:+902161234567'),
        actionLabel: 'Call Now',
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'hello@nitrokit.tr',
        action: () => window.open('mailto:hello@nitrokit.tr'),
        actionLabel: 'Send Email',
    },
    {
        icon: Clock,
        label: 'Business Hours',
        value: 'Monday - Friday',
        subValue: '9:00 AM - 6:00 PM (GMT+3)',
    },
];

export const ContactInfo = () => {
    return (
        <div className="space-y-8">
            <div className="space-y-6">
                {contactDetails.map((detail, index) => {
                    const Icon = detail.icon;

                    return (
                        <div key={index} className="group">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                        <Icon className="text-primary h-5 w-5" />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        {detail.label}
                                    </p>
                                    <p className="text-lg font-semibold">{detail.value}</p>
                                    {detail.subValue && (
                                        <p className="text-muted-foreground text-sm">
                                            {detail.subValue}
                                        </p>
                                    )}
                                    {detail.action && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={detail.action}
                                            className="text-primary hover:text-primary/80 h-auto p-0 font-normal transition-colors"
                                        >
                                            {detail.actionLabel}
                                            <ExternalLink className="ml-2 h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
