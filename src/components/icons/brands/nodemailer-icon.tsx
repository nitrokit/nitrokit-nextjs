import { SVGProps } from 'react';

export function NodemailerIcon(props: SVGProps<SVGSVGElement> & { color?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            imageRendering="optimizeQuality"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            viewBox="0 0 200 136"
            {...props}
        >
            <path fill={props.color || '#22b572'} d="M-.5-.5h1l80 93v2h-81v-95Z" />
            <path
                fill={props.color || '#28aae1'}
                d="M80.5-.5h1l59 68c.2 1.4.7 2.8 1.5 4 7.1 7.3 13.6 15 19.5 23h-81v-95Z"
            />
            <path
                fill={props.color || '#0e9ccd'}
                d="M198.5-.5h1v95h-38c-5.9-8-12.4-15.7-19.5-23a9.7 9.7 0 0 1-1.5-4c19.7-22.4 39-45 58-68Z"
            />
        </svg>
    );
}
