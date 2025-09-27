'use client';

import React, { useState } from 'react';

// Props'lar için tip güvenliği
interface RandomTextProps {
    texts: React.ReactNode[];
    className?: string;
}

export function RandomText({ texts, className }: RandomTextProps) {
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

    return <span className={`${className || ''}`}>{randomText}</span>;
}
