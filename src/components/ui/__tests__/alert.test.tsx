import { render, screen } from '@testing-library/react';
import { Alert } from '../alert';

describe('Alert', () => {
    it('renders alert with different variants', () => {
        const { rerender } = render(<Alert variant="default">Test Alert</Alert>);
        let alert = screen.getByText('Test Alert');
        expect(alert).toHaveClass('bg-background');

        rerender(<Alert variant="destructive">Test Alert</Alert>);
        alert = screen.getByText('Test Alert');
        expect(alert).toHaveClass('text-destructive');
    });

    it('renders alert with different text content', () => {
        render(<Alert>Test Alert</Alert>);
        expect(screen.getByText('Test Alert')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Alert className="custom-class">Test Alert</Alert>);
        const alert = screen.getByText('Test Alert');
        expect(alert).toHaveClass('custom-class');
    });
});
