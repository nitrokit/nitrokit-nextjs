import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { codecovVitePlugin } from '@codecov/vite-plugin';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        codecovVitePlugin({
            enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
            bundleName: 'nitrokit',
            uploadToken: process.env.CODECOV_TOKEN,
        }),
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/**',
                '.next/**',
                'coverage/**',
                'dist/**',
                'build/**',
                'stories/**',
                '**/*.stories.{ts,tsx}',
                'messages/**',
                '**/*.json',
                'src/test/**',
            ],
        },
        include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
        exclude: [
            'node_modules/**',
            '.next/**',
            'coverage/**',
            'dist/**',
            'build/**',
            'stories/**',
            '**/*.stories.{ts,tsx}',
            'messages/**',
            '**/*.json',
        ],
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
