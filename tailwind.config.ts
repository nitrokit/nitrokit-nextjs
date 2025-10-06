import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
        './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
        './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
        './src/types/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {}
    },
    plugins: [require('@tailwindcss/typography')]
};

export default config;
