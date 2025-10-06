import { describe, it, expect } from 'vitest';
import { cn } from '../cn';

describe('cn utility function', () => {
    describe('Basic functionality', () => {
        it('should merge single class string', () => {
            expect(cn('text-red-500')).toBe('text-red-500');
        });

        it('should merge multiple class strings', () => {
            expect(cn('text-red-500', 'bg-blue-100')).toBe('text-red-500 bg-blue-100');
        });

        it('should handle empty inputs', () => {
            expect(cn()).toBe('');
            expect(cn('')).toBe('');
            expect(cn('', '')).toBe('');
        });

        it('should handle undefined and null values', () => {
            expect(cn(undefined)).toBe('');
            expect(cn(null)).toBe('');
            expect(cn('text-red-500', undefined, 'bg-blue-100')).toBe('text-red-500 bg-blue-100');
        });
    });

    describe('Conditional classes', () => {
        it('should handle boolean conditions', () => {
            expect(cn('base-class', true && 'conditional-class')).toBe(
                'base-class conditional-class'
            );
            expect(cn('base-class', false && 'conditional-class')).toBe('base-class');
        });

        it('should handle object notation', () => {
            expect(
                cn({
                    'text-red-500': true,
                    'bg-blue-100': false,
                    'p-4': true
                })
            ).toBe('text-red-500 p-4');
        });

        it('should handle mixed input types', () => {
            expect(
                cn(
                    'base-class',
                    ['array-class-1', 'array-class-2'],
                    {
                        'object-class': true,
                        'hidden-class': false
                    },
                    undefined,
                    'final-class'
                )
            ).toBe('base-class array-class-1 array-class-2 object-class final-class');
        });
    });

    describe('Tailwind CSS class merging', () => {
        it('should merge conflicting Tailwind classes correctly', () => {
            // Later class should override earlier one
            expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
            expect(cn('p-4', 'p-8')).toBe('p-8');
            expect(cn('bg-red-100', 'bg-blue-200')).toBe('bg-blue-200');
        });

        it('should handle responsive variants', () => {
            expect(cn('text-sm', 'md:text-lg', 'lg:text-xl')).toBe('text-sm md:text-lg lg:text-xl');
            expect(cn('hidden', 'md:block')).toBe('hidden md:block');
        });

        it('should handle state variants', () => {
            expect(cn('bg-blue-500', 'hover:bg-blue-600', 'focus:bg-blue-700')).toBe(
                'bg-blue-500 hover:bg-blue-600 focus:bg-blue-700'
            );
        });

        it('should merge complex conflicting classes', () => {
            expect(
                cn(
                    'px-4 py-2',
                    'px-6', // Should override px-4
                    'py-3' // Should override py-2
                )
            ).toBe('px-6 py-3');
        });
    });

    describe('Edge cases', () => {
        it('should handle very long class strings', () => {
            const longClassString = Array.from({ length: 100 }, (_, i) => `class-${i}`).join(' ');
            const result = cn(longClassString);
            expect(result).toBe(longClassString);
        });

        it('should handle special characters in class names', () => {
            expect(cn('w-1/2', 'h-1/3', 'top-1/4')).toBe('w-1/2 h-1/3 top-1/4');
        });

        it('should handle custom class names mixed with Tailwind', () => {
            expect(
                cn('custom-component-class', 'text-red-500', 'another-custom-class', 'bg-blue-100')
            ).toBe('custom-component-class text-red-500 another-custom-class bg-blue-100');
        });

        it('should deduplicate identical classes', () => {
            expect(cn('text-red-500', 'bg-blue-100', 'text-red-500')).toBe(
                'bg-blue-100 text-red-500'
            );
        });

        it('should handle whitespace normalization', () => {
            expect(cn('  text-red-500  ', '  bg-blue-100  ')).toBe('text-red-500 bg-blue-100');
        });
    });

    describe('Real-world usage scenarios', () => {
        it('should handle button variant combinations', () => {
            const buttonBase = 'px-4 py-2 rounded font-medium transition-colors';
            const buttonPrimary = 'bg-blue-500 text-white hover:bg-blue-600';

            expect(cn(buttonBase, buttonPrimary)).toBe(
                'px-4 py-2 rounded font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600'
            );
        });

        it('should handle component size variations', () => {
            const baseClasses = 'border rounded';
            const smallSize = 'px-2 py-1 text-sm';
            const largeSize = 'px-6 py-3 text-lg';

            expect(cn(baseClasses, smallSize)).toBe('border rounded px-2 py-1 text-sm');
            expect(cn(baseClasses, largeSize)).toBe('border rounded px-6 py-3 text-lg');
        });

        it('should handle conditional disabled state', () => {
            const isDisabled = true;
            const isLoading = false;

            expect(
                cn('btn-primary', {
                    'opacity-50 cursor-not-allowed': isDisabled,
                    'opacity-75 pointer-events-none': isLoading
                })
            ).toBe('btn-primary opacity-50 cursor-not-allowed');
        });

        it('should handle form input states', () => {
            const hasError = true;
            const isFocused = false;

            expect(
                cn('border rounded px-3 py-2', {
                    'border-red-500 text-red-900': hasError,
                    'border-blue-500 ring-2 ring-blue-200': isFocused && !hasError,
                    'border-gray-300': !hasError && !isFocused
                })
            ).toBe('border rounded px-3 py-2 border-red-500 text-red-900');
        });
    });

    describe('Performance considerations', () => {
        it('should handle many class combinations efficiently', () => {
            const startTime = performance.now();

            for (let i = 0; i < 1000; i++) {
                cn(
                    'base-class',
                    `dynamic-class-${i}`,
                    { conditional: i % 2 === 0 },
                    i % 3 === 0 && 'another-conditional'
                );
            }

            const endTime = performance.now();
            expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
        });

        it('should return consistent results for same inputs', () => {
            const input1 = ['text-red-500', 'bg-blue-100', { hidden: false }];
            const input2 = ['text-red-500', 'bg-blue-100', { hidden: false }];

            expect(cn(...input1)).toBe(cn(...input2));
        });
    });

    describe('Type safety', () => {
        it('should accept various ClassValue types', () => {
            // These should all compile and work without TypeScript errors
            expect(() => cn('string')).not.toThrow();
            expect(() => cn(['array', 'of', 'strings'])).not.toThrow();
            expect(() => cn({ object: true, notation: false })).not.toThrow();
            expect(() => cn(undefined)).not.toThrow();
            expect(() => cn(null)).not.toThrow();
            expect(() => cn(false)).not.toThrow();
            expect(() => cn(true && 'conditional')).not.toThrow();
        });
    });
});
