import nextPlugin from '@next/eslint-plugin-next';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const flattenNextRules = (config) => {
    return {
        rules: config.rules || {}
    };
};

const eslintConfig = [
    {
        plugins: {
            '@next/next': nextPlugin
        },
        rules: {
            ...flattenNextRules(nextPlugin.configs.recommended).rules,
            ...flattenNextRules(nextPlugin.configs['core-web-vitals']).rules
        }
    },

    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'coverage/**',
            'dist/**',
            'playwright-report/',
            'stories/**',
            'src/generated/**',
            '**/*.stories.{ts,tsx}',
            '**/*.json',
            '.vercel',
            '**/__tests__/**'
        ]
    },
    {
        files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: true
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'react-hooks': reactHooksPlugin,
            prettier: prettierPlugin
        },
        rules: {
            ...tsPlugin.configs['recommended-type-checked'].rules,
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
            ],
            '@typescript-eslint/require-await': 'error',
            '@typescript-eslint/no-misused-promises': process.env.CI ? 'error' : 'off',
            'prefer-const': 'error',
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    semi: true,
                    tabWidth: 4,
                    trailingComma: 'none',
                    printWidth: 100,
                    bracketSpacing: true,
                    arrowParens: 'always',
                    endOfLine: 'lf'
                }
            ]
        }
    },
    {
        files: ['**/sanitization.ts'],
        rules: {
            quotes: 'off',
            'prettier/prettier': 'off'
        }
    },
    prettierConfig
];

export default eslintConfig;
