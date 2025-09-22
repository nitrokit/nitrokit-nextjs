import { render, screen } from '@testing-library/react';
import { Select, SelectTrigger, SelectValue } from '../select';

describe('Select', () => {
    it('renders select', () => {
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
            </Select>
        );

        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(
            <Select>
                <SelectTrigger className="custom-class">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
            </Select>
        );

        const select = screen.getByRole('combobox');
        expect(select).toHaveClass('custom-class');
    });

    it('handles disabled state', () => {
        render(
            <Select disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
            </Select>
        );

        const select = screen.getByRole('combobox');
        expect(select).toBeDisabled();
    });
});
