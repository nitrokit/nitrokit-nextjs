import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}', 'src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
        exclude: ['node_modules/**', '.next/**', 'dist/**', 'build/**', '.vercel/**'],
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
                'src/generated/**',
                '**/prisma/**',
                'tests/**'
            ]
        },
        onConsoleLog(log) {
            if (log.includes('Failed to load source map')) {
                return false;
            }
            return true;
        }
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test')
    },
    build: {
        sourcemap: false // Test için source map kapalı
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
