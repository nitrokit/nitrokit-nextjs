import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { codecovVitePlugin } from '@codecov/vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        codecovVitePlugin({
            enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
            bundleName: 'nitrokit-nextjs',
            uploadToken: process.env.CODECOV_TOKEN,
        }),
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}', 'src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
        exclude: ['node_modules/**', '.next/**', 'dist/**', 'build/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            exclude: [
                'node_modules/**',
                '.next/**',
                'coverage/**',
                'dist/**',
                'build/**',
                '**/*.config.{js,ts,mjs}',
                'middleware.ts',
                'instrumentation.ts',
                'messages/**',
                'public/**',
                '**/*.d.ts',
                '**/next.config.{js,ts,mjs}',
                '**/tailwind.config.{js,ts}',
                '**/prisma.config.{js,ts}',
                '**/postcss.config.{js,ts}',
                '**/*.config.{js,ts,mjs}',
                'vitest.setup.ts',
                'src/test/setup.ts',
                'stories/**',
                '**/*.stories.{ts,tsx}',
            ],
        },
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
