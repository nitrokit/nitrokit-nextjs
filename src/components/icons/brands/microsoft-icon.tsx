import { SVGProps } from 'react';

export function MicrosoftIcon(props: SVGProps<SVGSVGElement> & { color?: string }) {
    const { color, ...rest } = props;
    const fillColor = color || '#000000';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" {...rest}>
            <path fill={fillColor} d="M0 0h11v11H0z" />
            <path fill={fillColor} d="M12 0h11v11H12z" />
            <path fill={fillColor} d="M0 12h11v11H0z" />
            <path fill={fillColor} d="M12 12h11v11H12z" />
        </svg>
    );
}
