import { SVGProps } from 'react';

export function RobloxIcon(props: SVGProps<SVGSVGElement> & { color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" {...props}>
            <path
                stroke={props.color || '#000000'}
                strokeLinejoin="round"
                strokeWidth="12"
                d="M29.88 57.549 133.845 29.69l27.857 103.967-103.966 27.857z"
            />
            <path
                stroke={props.color || '#000000'}
                strokeLinejoin="round"
                strokeWidth="12"
                d="m80 87 25.114-6.73 6.73 25.115-25.115 6.73z"
            />
        </svg>
    );
}
