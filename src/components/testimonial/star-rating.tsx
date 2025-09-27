// components/StarRating.tsx
import React from 'react';

interface StarRatingProps {
    rating: number;
}

const StarIcon = () => (
    <svg
        className="h-5 w-5 text-yellow-500 opacity-60 transition-transform"
        viewBox="0 -0.5 33 33"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <polygon points="27.865 31.83 17.615 26.209 7.462 32.009 9.553 20.362 0.99 12.335 12.532 10.758 17.394 0 22.436 10.672 34 12.047 25.574 20.22" />
    </svg>
);

export function StarRating({ rating }: StarRatingProps) {
    const stars = Array.from({ length: rating }, (_, index) => <StarIcon key={index} />);
    return <div className="flex items-center gap-1">{stars}</div>;
}
