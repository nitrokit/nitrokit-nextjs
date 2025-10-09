'use client';

import React, { useState, useEffect } from 'react';

interface TextRotatorProps {
    texts: React.ReactNode[];
    interval?: number;
    className?: string;
}

export function TextRotator({ texts, interval = 5000, className }: TextRotatorProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!texts || texts.length <= 1 || !isMounted) {
            return;
        }

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, interval);

        return () => clearInterval(timer);
    }, [texts, interval, isMounted]);

    if (!texts || texts.length === 0 || !isMounted) {
        return null;
    }

    return (
        <span
            className={`transition-opacity duration-1000 ease-in-out ${className || ''}`}
            key={currentIndex}
        >
            {texts[currentIndex]}
        </span>
    );
}
