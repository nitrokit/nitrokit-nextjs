import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../switch';

describe('Switch', () => {
    it('renders switch', () => {
        render(<Switch />);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toBeInTheDocument();
    });

    it('handles checked state', async () => {
        render(<Switch />);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).not.toBeChecked();

        await userEvent.click(switchEl);
        expect(switchEl).toBeChecked();
    });

    it('handles disabled state', () => {
        render(<Switch disabled />);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toBeDisabled();
    });

    it('applies custom className', () => {
        render(<Switch className="custom-class" />);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toHaveClass('custom-class');
    });

    it('handles onChange event', async () => {
        const handleChange = vi.fn();
        render(<Switch onCheckedChange={handleChange} />);
        const switchEl = screen.getByRole('switch');

        await userEvent.click(switchEl);
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('handles default checked state', () => {
        render(<Switch defaultChecked />);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toBeChecked();
    });

    // it('handles required prop', () => {
    //     render(<Switch required />);
    //     const switchEl = screen.getByRole('switch');
    //     expect(switchEl).toHaveAttribute('required');
    // });
});
