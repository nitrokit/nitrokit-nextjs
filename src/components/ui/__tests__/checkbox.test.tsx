import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../checkbox';

describe('Checkbox', () => {
    it('renders checkbox', () => {
        render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    it('handles checked state', async () => {
        render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();

        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('handles disabled state', () => {
        render(<Checkbox disabled />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeDisabled();
    });

    it('applies custom className', () => {
        render(<Checkbox className="custom-class" />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveClass('custom-class');
    });

    it('handles onChange event', async () => {
        const handleChange = vi.fn();
        render(<Checkbox onCheckedChange={handleChange} />);
        const checkbox = screen.getByRole('checkbox');

        await userEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledWith(true);
    });
});
