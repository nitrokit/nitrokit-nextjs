import { render, screen } from '@testing-library/react';
import { Input } from '../input';

describe('Input', () => {
    it('renders input', () => {
        render(<Input type="text" placeholder="Adınız" />);
        const input = screen.getByPlaceholderText('Adınız');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
    });

    it('applies custom className', () => {
        render(<Input className="custom-class" />);
        expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('handles disabled prop', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });
});
