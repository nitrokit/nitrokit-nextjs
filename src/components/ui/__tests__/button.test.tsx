import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Link from 'next/link';
import { Button } from '../button';

describe('Button', () => {
    it('renders button with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-primary');
    });

    it('renders button with different variants', () => {
        const { rerender } = render(<Button variant="destructive">Destructive</Button>);
        let button = screen.getByRole('button');
        expect(button).toHaveClass('bg-destructive');

        rerender(<Button variant="outline">Outline</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('border');

        rerender(<Button variant="secondary">Secondary</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('bg-secondary');

        rerender(<Button variant="ghost">Ghost</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('hover:bg-accent');

        rerender(<Button variant="link">Link</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('text-primary');
    });

    it('renders button with different sizes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        let button = screen.getByRole('button');
        expect(button).toHaveClass('h-8');

        rerender(<Button size="default">Default</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('h-9');

        rerender(<Button size="lg">Large</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('h-10');

        rerender(<Button size="icon">Icon</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('h-9');
        expect(button).toHaveClass('w-9');
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Custom</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });

    it('handles disabled state', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveClass('disabled:opacity-50');
    });

    it('handles click events', async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles asChild prop', () => {
        render(
            <Button asChild>
                <Link href="/test">Link Button</Link>
            </Button>
        );
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test');
    });
});
