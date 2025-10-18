'use client';

import { Button } from '@/components/ui/button';
import { FormCard } from '../../../components/form-card'; // Doğru yol
import { MoveRight as IconMoveRight } from 'lucide-react';
import * as React from 'react';

interface PasswordResetSentCardProps {
    userEmail: string;
    messages: {
        title: string;
        instruction: string;
        skipButton: string;
        noEmail: React.ReactNode;
        resend: string;
    };
}

export function PasswordResetSentCard({ userEmail, messages }: PasswordResetSentCardProps) {
    const handleResend = () => {
        console.log(`Tekrar gönderiliyor: ${userEmail}`);
    };

    return (
        <FormCard
            title={messages.title}
            footer={
                <>
                    <Button type="submit" className="w-full">
                        {messages.skipButton} <IconMoveRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="text-center text-xs">
                        {messages.noEmail}
                        <Button
                            variant="link"
                            size="sm"
                            onClick={handleResend}
                            className="ml-0.5 h-auto p-0 text-xs"
                        >
                            {messages.resend}
                        </Button>
                    </div>
                </>
            }
        >
            <div className="text-center text-sm">{messages.instruction}</div>
        </FormCard>
    );
}
