import { SVGProps } from 'react';

export function OktaIcon(props: SVGProps<SVGSVGElement> & { color?: string }) {
    const { color, ...rest } = props;
    const fillColor = color || '#000000';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
            <path
                fill={fillColor}
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.224 2.792-6.224 6.224S8.568 18.22 12 18.22s6.224-2.792 6.224-6.224S15.432 5.772 12 5.772z"
            />
        </svg>
    );
}
