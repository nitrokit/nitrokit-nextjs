import { render, screen } from '@testing-library/react';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
    it('renders skeleton', () => {
        render(<Skeleton data-testid="skeleton" />);
        const skeleton = screen.getByTestId('skeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Skeleton className="custom-class" data-testid="skeleton" />);
        expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
    });
});
