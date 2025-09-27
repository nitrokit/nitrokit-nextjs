'use client';

import React, { useState, useEffect } from 'react';

interface TextRotatorProps {
    texts: React.ReactNode[];
    interval?: number;
    className?: string;
}

export function TextRotator({ texts, interval = 5000, className }: TextRotatorProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!texts || texts.length <= 1) return;

        const timer = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
                setIsVisible(true);
            }, 1000); // Geçiş süresi
        }, interval);

        return () => clearInterval(timer);
    }, [texts, interval]);

    if (!texts || texts.length === 0) {
        return null;
    }

    return (
        <span
            className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${className || ''} `}
        >
            {texts[currentIndex]}
        </span>
    );
}
