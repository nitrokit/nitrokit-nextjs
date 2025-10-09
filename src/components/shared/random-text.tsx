'use client';

import React, { useState, useEffect } from 'react';

interface RandomTextProps {
    texts: React.ReactNode[];
    className?: string;
}

export function RandomText({ texts, className }: RandomTextProps) {
    const [randomText, setRandomText] = useState<React.ReactNode>(null);

    useEffect(() => {
        if (!texts || texts.length === 0) {
            return;
        }
        const randomIndex = Math.floor(Math.random() * texts.length);
        setRandomText(texts[randomIndex]);
    }, [texts]);

    if (!randomText) {
        return null;
    }

    return <span className={className}>{randomText}</span>;
}
