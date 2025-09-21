import localFont from 'next/font/local';

const lexend = localFont({
    variable: '--font-lexend',
    display: 'swap',
    src: [
        {
            path: '../../public/fonts/lexend/lexend-v25-latin_latin-ext-100.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../public/fonts/lexend/lexend-v25-latin_latin-ext-200.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../public/fonts/lexend/lexend-v25-latin_latin-ext-300.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/lexend/lexend-v25-latin_latin-ext-regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/lexend/lexend-v25-latin_latin-ext-500.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/lexend/lexend-v25-latin_latin-ext-600.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/lexend/lexend-v25-latin_latin-ext-700.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/fonts/lexend/lexend-v25-latin_latin-ext-800.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../public/fonts/lexend/lexend-v25-latin_latin-ext-900.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    preload: true,
});

const montserrat = localFont({
    variable: '--font-montserrat',
    display: 'swap',
    src: [
        {
            path: '../../public/fonts/montserrat-v30-latin-900.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    preload: true,
});

export { lexend, montserrat };
