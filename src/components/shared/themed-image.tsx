'use client';

import Image from 'next/image';
import { cn } from '@nitrokit/core/lib';
import { ImageProps } from 'next/image';

export interface ThemedImageProps extends Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> {
    lightSrc: string;
    darkSrc: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    href?: string;
}

export const ThemedImage = ({
    lightSrc,
    darkSrc,
    alt,
    width,
    height,
    className,
    href,
    style,
    ...rest
}: ThemedImageProps) => {
    return (
        <>
            <Image
                src={lightSrc}
                alt={alt}
                width={width}
                height={height}
                style={style}
                className={cn(`dark:hidden ${href ? 'cursor-pointer' : ''}`, className)}
                {...rest}
                onClick={() => {
                    if (href) {
                        window.open(href, '_blank');
                    }
                }}
            />
            <Image
                src={darkSrc}
                alt={alt}
                width={width}
                height={height}
                style={style}
                className={cn(`hidden dark:block ${href ? 'cursor-pointer' : ''}`, className)}
                {...rest}
                onClick={() => {
                    if (href) {
                        window.open(href, '_blank');
                    }
                }}
            />
        </>
    );
};
