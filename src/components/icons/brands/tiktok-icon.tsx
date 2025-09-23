import { SVGProps } from 'react';

export function TiktokIcon(props: SVGProps<SVGSVGElement> & { color?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            stroke="#000000"
            strokeWidth="0"
            aria-label="TikTok"
            viewBox="0 0 512 512"
            {...props}
        >
            <rect width="512" height="512" fill="#ffffff" stroke="none" rx="15%" />
            <defs>
                <path
                    id="tiktok-path"
                    d="M219 200a117 117 0 1 0 101 115V187a150 150 0 0 0 88 28v-63a88 88 0 0 1-88-88h-64v252a54 54 0 1 1-37-51z"
                    style={{ mixBlendMode: 'multiply' }}
                />
            </defs>
            <use x="18" y="15" fill="#f05" href="#tiktok-path" />
            <use fill="#0ee" href="#tiktok-path" />
        </svg>
    );
}
