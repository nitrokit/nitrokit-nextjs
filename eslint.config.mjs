import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import eslintParserTypescript from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'coverage/**',
            'dist/**',
            'build/**',
            'stories/**',
            '**/*.stories.{ts,tsx}',
            'messages/**',
            '**/*.json'
        ],
    },
    ...compat.extends('next/core-web-vitals'),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: eslintParserTypescript,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': eslintPluginTypescript,
            'prettier': eslintPluginPrettier,
        },
        rules: {
            'quotes': ['error', 'single', { 'avoidEscape': true }],
            'semi': ['error', 'always'],
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    'argsIgnorePattern': '^_',
                    'varsIgnorePattern': '^_',
                },
            ],
            'prefer-const': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'prettier/prettier': ['error', {
                'singleQuote': true,
                'semi': true,
                'tabWidth': 4,
                'trailingComma': 'es5',
                'printWidth': 100,
                'bracketSpacing': true,
                'arrowParens': 'always',
                'endOfLine': 'lf'
            }],
        },
    },
    {
        files: ['**/sanitization.ts'],
        rules: {
            'quotes': 'off',
            'prettier/prettier': 'off'
        }
    }
];

export default eslintConfig;
