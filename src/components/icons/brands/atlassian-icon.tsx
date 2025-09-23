import { SVGProps } from 'react';

export function AtlassianIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0.3 -41.1 145.2 186.7" {...props}>
            <defs>
                <linearGradient
                    id="atlassian-gradient"
                    x1="62.6"
                    x2="25"
                    y1="150.1"
                    y2="85.1"
                    gradientTransform="matrix(1 0 0 -1 0 228)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#0052cc" />
                    <stop offset=".9" stopColor="#2684ff" />
                </linearGradient>
            </defs>
            <path
                fill={props.color || 'url(#atlassian-gradient)'}
                d="M43 67a4.1 4.1 0 0 0-5.8-.8 4.3 4.3 0 0 0-1.2 1.5L.5 138.8a4.3 4.3 0 0 0 1.9 5.7 4.2 4.2 0 0 0 1.9.5h49.5a4 4 0 0 0 3.8-2.4C68.3 120.6 61.8 87 43 67z"
            />
            <path
                fill={props.color || '#2684ff'}
                d="M69.1 2.3a93.8 93.8 0 0 0-5.4 92.6l23.8 47.7a4.3 4.3 0 0 0 3.8 2.4h49.5a4.2 4.2 0 0 0 4.3-4.2 4.3 4.3 0 0 0-.4-2L76.4 2.3a4 4 0 0 0-7.3 0z"
            />
        </svg>
    );
}
