import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../card';

describe('Card', () => {
    it('renders card with all subcomponents', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Test Title</CardTitle>
                    <CardDescription>Test Description</CardDescription>
                </CardHeader>
                <CardContent>Test Content</CardContent>
                <CardFooter>Test Footer</CardFooter>
            </Card>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
        expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });

    it('applies custom className to card', () => {
        render(
            <Card className="custom-class">
                <CardContent>Test Content</CardContent>
            </Card>
        );

        const card = screen.getByText('Test Content').closest('.rounded-xl');
        expect(card).toHaveClass('custom-class');
    });

    it('renders card with only required components', () => {
        render(
            <Card>
                <CardContent>Test Content</CardContent>
            </Card>
        );

        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
