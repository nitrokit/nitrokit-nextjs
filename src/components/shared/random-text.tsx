'use client';

import React, { useState } from 'react';

interface RandomTextProps {
    texts: React.ReactNode[];
    className?: string;
}

export function RandomText({ texts }: RandomTextProps) {
    const [randomText] = useState(() => {
        if (!texts || texts.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    });

    if (!randomText) {
        return null;
    }

    return <>{randomText}</>;
}
