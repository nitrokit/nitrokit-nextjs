import { render, screen } from '@testing-library/react';
import { ScrollArea } from '../scroll-area';

describe('ScrollArea', () => {
    it('renders scroll area', () => {
        render(<ScrollArea>Test Content</ScrollArea>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<ScrollArea className="custom-class">Test Content</ScrollArea>);
        const scrollArea = screen.getByText('Test Content').closest('.relative.overflow-hidden');
        expect(scrollArea).toHaveClass('custom-class');
    });

    it('renders scroll area with different orientations', () => {
        const { rerender } = render(
            <ScrollArea aria-orientation="vertical">Test Content</ScrollArea>
        );

        let scrollArea = screen.getByText('Test Content').closest('.relative.overflow-hidden');
        expect(scrollArea).toHaveClass('relative');

        rerender(<ScrollArea aria-orientation="horizontal">Test Content</ScrollArea>);

        scrollArea = screen.getByText('Test Content').closest('.relative.overflow-hidden');
        expect(scrollArea).toHaveClass('relative');
    });

    it('renders scroll area with different types', () => {
        const { rerender } = render(<ScrollArea type="always">Test Content</ScrollArea>);

        let scrollArea = screen.getByText('Test Content').closest('.relative.overflow-hidden');
        expect(scrollArea).toHaveClass('relative');

        rerender(<ScrollArea type="hover">Test Content</ScrollArea>);

        scrollArea = screen.getByText('Test Content').closest('.relative.overflow-hidden');
        expect(scrollArea).toHaveClass('relative');
    });
});
